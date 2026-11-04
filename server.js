// JavaQuest Local Dev & Code Execution Server
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawn } = require('child_process');

const PORT = 3000;
const ROOT = __dirname;

// Load .env file if present
function loadEnv() {
  try {
    const envPath = path.join(ROOT, '.env');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      content.split(/\r?\n/).forEach(line => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const idx = trimmed.indexOf('=');
          if (idx !== -1) {
            const key = trimmed.substring(0, idx).trim();
            const val = trimmed.substring(idx + 1).trim();
            if (!process.env[key]) process.env[key] = val;
          }
        }
      });
    }
  } catch(e) {}
}
loadEnv();

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.txt':  'text/plain; charset=utf-8'
};

function handleCors(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, apikey');
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return true;
  }
  return false;
}

function runJavaProcess(code, stdin, callback) {
  // Determine file/class name (e.g. public class XYZ or default Main)
  let className = 'Main';
  const pubMatch = code.match(/public\s+(?:final\s+|abstract\s+)?(?:class|record|enum)\s+([A-Za-z0-9_]+)/);
  if (pubMatch) {
    className = pubMatch[1];
  } else {
    const classMatch = code.match(/(?:class|record|enum)\s+([A-Za-z0-9_]+)/);
    if (classMatch) className = classMatch[1];
  }

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'jq-run-'));
  const javaFile = path.join(tmpDir, `${className}.java`);

  fs.writeFile(javaFile, code, 'utf8', (err) => {
    if (err) {
      cleanup();
      return callback({ error: 'Failed to write source file: ' + err.message });
    }

    // 1. Compile with javac
    const javac = spawn('javac', [`${className}.java`], { cwd: tmpDir, shell: true });
    let compileStderr = '';

    javac.stderr.on('data', d => compileStderr += d);

    javac.on('close', compileCode => {
      if (compileCode !== 0) {
        cleanup();
        return callback({
          compile: {
            code: compileCode,
            stderr: compileStderr.trim() || 'Compilation failed'
          }
        });
      }

      // 2. Execute with java
      const java = spawn('java', [className], { cwd: tmpDir, shell: true });
      let stdout = '';
      let stderr = '';
      let timedOut = false;

      const timer = setTimeout(() => {
        timedOut = true;
        try { java.kill('SIGKILL'); } catch (e) {}
      }, 6000);

      if (stdin) {
        try {
          java.stdin.write(stdin);
          java.stdin.end();
        } catch (e) {}
      }

      java.stdout.on('data', d => stdout += d);
      java.stderr.on('data', d => stderr += d);

      java.on('close', runExitCode => {
        clearTimeout(timer);
        cleanup();
        if (timedOut) {
          return callback({
            run: {
              stdout: stdout,
              stderr: 'Execution timed out (infinite loop or process exceeded 6 seconds).',
              code: 124
            }
          });
        }
        return callback({
          run: {
            stdout: stdout,
            stderr: stderr.trim(),
            code: runExitCode || 0
          }
        });
      });
    });
  });

  function cleanup() {
    try {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    } catch (e) {}
  }
}

const server = http.createServer((req, res) => {
  if (handleCors(req, res)) return;

  const urlPath = req.url.split('?')[0];

  // API endpoint for real Java compilation and execution
  if (req.method === 'POST' && urlPath === '/api/run') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');
        const code = payload.code || '';
        const stdin = payload.stdin || '';

        if (!code.trim()) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ error: 'No code provided' }));
        }

        runJavaProcess(code, stdin, result => {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(result));
        });
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON payload: ' + err.message }));
      }
    });
    return;
  }

  // Health check endpoint
  if (urlPath === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ status: 'ok', java: true }));
  }

  // Config endpoint (exposes public client config like Gemini Key from .env)
  if (urlPath === '/api/config') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ geminiKey: process.env.GEMINI_API_KEY || '' }));
  }

  // Static file serving with Windows path normalization and directory/SPA fallback
  let cleanUrl = urlPath.split('?')[0];
  if (!cleanUrl || cleanUrl === '/' || cleanUrl === '\\') {
    cleanUrl = '/index.html';
  }

  const safeRel = cleanUrl.replace(/^[/\\]+/, '').replace(/^(\.\.[/\\])+/, '');
  let filePath = path.join(ROOT, safeRel);

  fs.stat(filePath, (err, stats) => {
    if (err || stats.isDirectory()) {
      // Fallback: serve index.html for root or missing routes
      const indexPath = path.join(ROOT, 'index.html');
      fs.stat(indexPath, (err2, stats2) => {
        if (err2 || !stats2.isFile()) {
          res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
          return res.end('404 Not Found');
        }
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        fs.createReadStream(indexPath).pipe(res);
      });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`JavaQuest server running at http://localhost:${PORT}`);
  console.log(`Real Java compiler endpoint active at http://localhost:${PORT}/api/run`);
});
