// JavaQuest — animations.js

/* ── Helpers ─────────────────────────────────────── */
function escHtml(s) {
  return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

/* ── Java Syntax Highlighter ─────────────────────── */
const KW = new Set(['abstract','assert','boolean','break','byte','case','catch','char','class',
  'const','continue','default','do','double','else','enum','extends','final','finally',
  'float','for','goto','if','implements','import','instanceof','int','interface','long',
  'native','new','package','private','protected','public','return','short','static',
  'strictfp','super','switch','synchronized','this','throw','throws','transient','try',
  'var','void','volatile','while','record','sealed','permits','yield']);
const TYPES = new Set(['String','Integer','Double','Boolean','Character','Long','Float','Short',
  'Byte','Object','System','Math','Scanner','ArrayList','LinkedList','HashMap','HashSet',
  'List','Map','Set','Queue','Stack','Arrays','Collections','Optional','StringBuilder',
  'StringBuffer','Exception','RuntimeException','Thread','Runnable','Iterable','Stream',
  'Collectors','Predicate','Function','Consumer','Supplier']);

function highlightSyntax(code) {
  let r = '', i = 0, n = code.length;
  while (i < n) {
    // line comment
    if (code[i]==='/' && code[i+1]==='/') {
      let j=i; while(j<n && code[j]!=='\n') j++;
      r+=`<span class="syn-cmt">${escHtml(code.slice(i,j))}</span>`; i=j; continue;
    }
    // block comment
    if (code[i]==='/' && code[i+1]==='*') {
      let j=i+2; while(j<n-1&&!(code[j]==='*'&&code[j+1]==='/')) j++; j+=2;
      r+=`<span class="syn-cmt">${escHtml(code.slice(i,j))}</span>`; i=j; continue;
    }
    // string
    if (code[i]==='"') {
      let j=i+1; while(j<n&&code[j]!=='"'){if(code[j]==='\\')j++;j++;}j++;
      r+=`<span class="syn-str">${escHtml(code.slice(i,j))}</span>`; i=j; continue;
    }
    // char
    if (code[i]==="'") {
      let j=i+1; while(j<n&&code[j]!=="'"){if(code[j]==='\\')j++;j++;}j++;
      r+=`<span class="syn-str">${escHtml(code.slice(i,j))}</span>`; i=j; continue;
    }
    // annotation
    if (code[i]==='@') {
      let j=i+1; while(j<n&&/[A-Za-z0-9_]/.test(code[j]))j++;
      r+=`<span class="syn-ann">${escHtml(code.slice(i,j))}</span>`; i=j; continue;
    }
    // number
    if (/[0-9]/.test(code[i]) && (i===0||!/[A-Za-z_]/.test(code[i-1]))) {
      let j=i; while(j<n&&/[0-9._xXbBfFlL]/.test(code[j]))j++;
      r+=`<span class="syn-num">${escHtml(code.slice(i,j))}</span>`; i=j; continue;
    }
    // identifier
    if (/[A-Za-z_$]/.test(code[i])) {
      let j=i; while(j<n&&/[A-Za-z0-9_$]/.test(code[j]))j++;
      const w=code.slice(i,j);
      const after=code.slice(j).trimStart();
      if (after.startsWith('(')&&!KW.has(w)) r+=`<span class="syn-fn">${escHtml(w)}</span>`;
      else if (KW.has(w))    r+=`<span class="syn-kw">${escHtml(w)}</span>`;
      else if (TYPES.has(w)) r+=`<span class="syn-type">${escHtml(w)}</span>`;
      else r+=escHtml(w);
      i=j; continue;
    }
    // operators
    if (/[+\-*/%=<>!&|^~?:;,.]/.test(code[i])) {
      r+=`<span class="syn-op">${escHtml(code[i])}</span>`; i++; continue;
    }
    r+=escHtml(code[i]); i++;
  }
  return r;
}

/* ── Code Block ──────────────────────────────────── */
function buildCodeBlock(code, lang) {
  lang = lang || 'Java';
  return `<div class="code-block">
    <div class="code-block-header">
      <span class="code-lang-tag">${lang}</span>
      <button class="code-copy-btn" onclick="copyCode(this)">Copy</button>
    </div>
    <pre>${highlightSyntax(code)}</pre>
  </div>`;
}

function copyCode(btn) {
  const pre = btn.closest('.code-block').querySelector('pre');
  navigator.clipboard.writeText(pre.innerText).then(function() {
    btn.textContent = 'Copied!';
    setTimeout(function(){ btn.textContent = 'Copy'; }, 1800);
  }).catch(function() {});
}

/* ── Memory Diagram ──────────────────────────────── */
function renderMemoryDiagram(container, vars) {
  if (!container || !vars) return;
  container.innerHTML = '';
  const box = document.createElement('div');
  box.style.cssText = 'display:flex;gap:1.5rem;justify-content:center;flex-wrap:wrap';

  const stack = document.createElement('div');
  stack.style.cssText = 'border:1px solid rgba(108,99,255,.35);border-radius:12px;padding:12px 16px;min-width:180px;background:rgba(108,99,255,.07);font-family:monospace;font-size:.82rem';
  stack.innerHTML = '<div style="color:#94A3B8;font-size:.7rem;font-weight:700;text-transform:uppercase;margin-bottom:8px">Stack</div>';
  vars.forEach(function(v, i) {
    const row = document.createElement('div');
    row.style.cssText = 'display:flex;justify-content:space-between;gap:.75rem;padding:5px 8px;border-radius:6px;background:rgba(255,255,255,.05);margin-bottom:4px';
    row.innerHTML = `<span style="color:#C084FC">${escHtml(v.type)}</span><span style="color:#60A5FA">${escHtml(v.name)}</span><span style="color:#86EFAC">${escHtml(String(v.value))}</span>`;
    stack.appendChild(row);
  });
  box.appendChild(stack);
  container.appendChild(box);
}

/* ── Loop Tracer ──────────────────────────────────── */
function renderLoopTracer(container, config) {
  if (!container) return;
  config = config || {};
  const start = config.start||0, end = config.end||5, varName = config.varName||'i';
  container.innerHTML = '';
  const track = document.createElement('div');
  track.style.cssText = 'display:flex;gap:8px;flex-wrap:wrap;justify-content:center;font-family:monospace';
  const count = Math.min(end - start, 8);
  for (let i = 0; i < count; i++) {
    const cell = document.createElement('div');
    cell.style.cssText = 'width:56px;height:56px;border-radius:10px;border:1.5px solid rgba(108,99,255,.3);background:rgba(108,99,255,.08);display:flex;flex-direction:column;align-items:center;justify-content:center;';
    cell.innerHTML = `<div style="color:#94A3B8;font-size:.6rem">${varName}=${start+i}</div><div style="color:#C084FC;font-size:.9rem;font-weight:700">step ${i+1}</div>`;
    track.appendChild(cell);
  }
  container.appendChild(track);
}

/* ── Flowchart ────────────────────────────────────── */
function renderFlowchart(container, config) {
  if (!container) return;
  config = config || {};
  const cond = (config.condition||'x > 0').slice(0,14);
  const yes  = (config.trueBranch||'true path').slice(0,12);
  const no   = (config.falseBranch||'false path').slice(0,12);
  container.innerHTML = `<svg width="100%" height="200" viewBox="0 0 320 200" style="max-width:320px;margin:0 auto;display:block">
    <rect x="110" y="6" width="100" height="28" rx="14" fill="rgba(108,99,255,.3)" stroke="#6C63FF" stroke-width="1.5"/>
    <text x="160" y="25" text-anchor="middle" fill="#C084FC" font-size="11" font-family="monospace">START</text>
    <line x1="160" y1="34" x2="160" y2="60" stroke="#6B7280" stroke-width="1.5" marker-end="url(#ar)"/>
    <polygon points="160,60 216,90 160,120 104,90" fill="rgba(255,209,102,.15)" stroke="#FFD166" stroke-width="1.5"/>
    <text x="160" y="87" text-anchor="middle" fill="#FFD166" font-size="9" font-family="monospace">${escHtml(cond)}</text>
    <text x="160" y="100" text-anchor="middle" fill="#94A3B8" font-size="8">?</text>
    <line x1="104" y1="90" x2="55" y2="90" stroke="#06D6A0" stroke-width="1.5" marker-end="url(#arg)"/>
    <text x="78" y="84" text-anchor="middle" fill="#06D6A0" font-size="8">true</text>
    <line x1="55" y1="90" x2="55" y2="142" stroke="#06D6A0" stroke-width="1.5" marker-end="url(#arg)"/>
    <rect x="8" y="142" width="94" height="28" rx="6" fill="rgba(6,214,160,.15)" stroke="#06D6A0" stroke-width="1.5"/>
    <text x="55" y="161" text-anchor="middle" fill="#06D6A0" font-size="9" font-family="monospace">${escHtml(yes)}</text>
    <line x1="216" y1="90" x2="262" y2="90" stroke="#F72585" stroke-width="1.5" marker-end="url(#arr)"/>
    <text x="240" y="84" text-anchor="middle" fill="#F72585" font-size="8">false</text>
    <line x1="262" y1="90" x2="262" y2="142" stroke="#F72585" stroke-width="1.5" marker-end="url(#arr)"/>
    <rect x="218" y="142" width="94" height="28" rx="6" fill="rgba(247,37,133,.15)" stroke="#F72585" stroke-width="1.5"/>
    <text x="265" y="161" text-anchor="middle" fill="#F72585" font-size="9" font-family="monospace">${escHtml(no)}</text>
    <defs>
      <marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="none" stroke="#6B7280" stroke-width="1.2"/></marker>
      <marker id="arg" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="none" stroke="#06D6A0" stroke-width="1.2"/></marker>
      <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="none" stroke="#F72585" stroke-width="1.2"/></marker>
    </defs>
  </svg>`;
}

/* ── Class Diagram ───────────────────────────────── */
function renderClassDiagram(container, config) {
  if (!container || !config || !config.classes) return;
  container.innerHTML = '';
  container.style.cssText = 'display:flex;gap:1rem;flex-wrap:wrap;justify-content:center;font-family:monospace;font-size:.78rem';
  config.classes.forEach(function(cls) {
    const card = document.createElement('div');
    card.style.cssText = 'border:1.5px solid rgba(108,99,255,.4);border-radius:10px;overflow:hidden;min-width:150px;max-width:200px;background:rgba(108,99,255,.06)';
    const title = document.createElement('div');
    title.style.cssText = 'padding:6px 10px;background:rgba(108,99,255,.25);color:#C084FC;font-weight:700;text-align:center';
    title.textContent = cls.name;
    card.appendChild(title);
    if (cls.fields && cls.fields.length) {
      const sec = document.createElement('div');
      sec.style.cssText = 'padding:6px 10px;border-top:1px solid rgba(255,255,255,.06)';
      cls.fields.forEach(function(f){ const d=document.createElement('div');d.style.color='#60A5FA';d.textContent=f;sec.appendChild(d); });
      card.appendChild(sec);
    }
    if (cls.methods && cls.methods.length) {
      const sec = document.createElement('div');
      sec.style.padding = '6px 10px';
      cls.methods.forEach(function(m){ const d=document.createElement('div');d.style.color='#FCD34D';d.textContent=m+'()';sec.appendChild(d); });
      card.appendChild(sec);
    }
    container.appendChild(card);
  });
}

/* ── XP Float ────────────────────────────────────── */
function showXpFloat(amount, sourceEl) {
  const el = document.createElement('div');
  el.className = 'xp-float';
  el.textContent = '+' + amount + ' XP';
  let left = window.innerWidth / 2 - 25, top = 120;
  if (sourceEl) {
    try {
      const r = sourceEl.getBoundingClientRect();
      left = r.left + r.width/2 - 25;
      top  = r.top + window.scrollY - 10;
    } catch(e) {}
  }
  el.style.left = left + 'px';
  el.style.top  = top  + 'px';
  document.body.appendChild(el);
  el.addEventListener('animationend', function(){ el.remove(); });
}

/* ── Particle Burst ──────────────────────────────── */
function burstParticles(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const colors = ['#FFD166','#6C63FF','#43D8C9','#F72585','#06D6A0','#FF6584'];
  for (let i = 0; i < 24; i++) {
    const p = document.createElement('div');
    p.className = 'lv-particle';
    const size  = 5 + Math.random() * 8;
    const angle = Math.random() * Math.PI * 2;
    const dist  = 50 + Math.random() * 80;
    p.style.cssText = `width:${size}px;height:${size}px;background:${colors[Math.floor(Math.random()*colors.length)]};left:50%;top:50%;--dx:${Math.cos(angle)*dist}px;--dy:${Math.sin(angle)*dist}px;animation-duration:${0.6+Math.random()*0.4}s;`;
    container.appendChild(p);
    setTimeout(function(){ p.remove(); }, 1200);
  }
}

/* ── Drag & Drop for Arrange Challenge ───────────── */
var _dragSrc = null;

function initDragAndDrop(container) {
  var items = container.querySelectorAll('.arrange-block');
  items.forEach(function(item) {
    item.addEventListener('dragstart', function(e) {
      _dragSrc = item;
      item.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
    });
    item.addEventListener('dragend', function() {
      item.classList.remove('dragging');
      container.querySelectorAll('.arrange-block').forEach(function(b){ b.classList.remove('drag-over'); });
    });
    item.addEventListener('dragover', function(e) {
      e.preventDefault();
      if (item !== _dragSrc) item.classList.add('drag-over');
    });
    item.addEventListener('dragleave', function() { item.classList.remove('drag-over'); });
    item.addEventListener('drop', function(e) {
      e.preventDefault();
      if (_dragSrc && _dragSrc !== item) {
        const all = Array.from(container.children);
        const fi = all.indexOf(_dragSrc);
        const ti = all.indexOf(item);
        if (fi < ti) container.insertBefore(_dragSrc, item.nextSibling);
        else         container.insertBefore(_dragSrc, item);
      }
      item.classList.remove('drag-over');
    });
  });
}
