// JavaQuest — ai-tutor.js
// Ultra-low token Gemini Flash-Lite AI Tutor for JavaQuest

// Pre-configured Gemini API Key (hardcoded in file)
var _k1 = 'QVEuQWI4Uk42Snd6Y3d4OTYy';
var _k2 = 'Q05yeXN6aGRMcktYN3FOWFBY';
var _k3 = 'dm92aE5qZHBZbWZvOVpWWkE=';
var GEMINI_API_KEY = atob(_k1 + _k2 + _k3);

function getGeminiKey() {
  return GEMINI_API_KEY;
}

// Low-token Flash-Lite models with automatic fallback
var PRIMARY_MODEL = 'gemini-flash-lite-latest';
var FALLBACK_MODEL = 'gemini-3.5-flash-lite';

var AI_SYSTEM = 'You are JavaBot, an ultra-concise Java tutor inside JavaQuest. '
  + 'Greet warmly if greeted. Answer ONLY Java, object-oriented programming, and computer science questions in 2-3 short, clear sentences. '
  + 'Include 1 tiny code snippet only when helpful. '
  + 'Keep responses under 70 words to minimize token consumption. '
  + 'If asked about non-programming topics, politely reply: "I only teach Java! Ask me any Java question ☕"';

var chatHistory = [];

function getCurrentUserCodeContext() {
  var code = '';
  var contextTitle = '';

  var compilerScreen = document.getElementById('screen-compiler');
  var codingScreen = document.getElementById('screen-coding');

  if (compilerScreen && compilerScreen.classList.contains('active')) {
    var ed = document.getElementById('code-editor');
    if (ed && ed.value && ed.value.trim()) {
      code = ed.value.trim();
      var banner = document.getElementById('capstone-banner-title');
      var bannerEl = document.getElementById('capstone-editor-banner');
      contextTitle = (banner && bannerEl && !bannerEl.classList.contains('hidden'))
        ? 'Capstone: ' + banner.textContent.trim()
        : 'Java Playground';
    }
  } else if (codingScreen && codingScreen.classList.contains('active')) {
    var cdEd = document.getElementById('coding-editor');
    if (cdEd && cdEd.value && cdEd.value.trim()) {
      code = cdEd.value.trim();
      var titleEl = document.getElementById('coding-task-title');
      contextTitle = 'Coding Challenge' + (titleEl ? ': ' + titleEl.textContent.trim() : '');
    }
  } else {
    var ed2 = document.getElementById('code-editor');
    if (ed2 && ed2.value && ed2.value.trim()) {
      code = ed2.value.trim();
      contextTitle = 'Playground Code';
    } else {
      var cdEd2 = document.getElementById('coding-editor');
      if (cdEd2 && cdEd2.value && cdEd2.value.trim()) {
        code = cdEd2.value.trim();
        contextTitle = 'Challenge Code';
      }
    }
  }

  var recentErr = '';
  var outEl = document.getElementById('output-area');
  if (outEl && outEl.textContent && !outEl.textContent.includes('Click ▶ Run Code')) {
    var t = outEl.textContent.trim();
    if (t) recentErr = t.substring(0, 350);
  }

  if (code) {
    var snippet = code.length > 1400 ? code.substring(0, 1400) + '\n// ... [remaining code omitted]' : code;
    return {
      title: contextTitle || 'Code Editor',
      code: snippet,
      error: recentErr
    };
  }
  return null;
}

function updateChatContextPill() {
  var pill = document.getElementById('chat-context-pill');
  var label = document.getElementById('chat-context-label');
  if (!pill || !label) return;
  var ctx = getCurrentUserCodeContext();
  if (ctx && ctx.code) {
    pill.classList.remove('hidden');
    label.textContent = 'Watching ' + ctx.title;
  } else {
    pill.classList.add('hidden');
  }
}

function toggleChat() {
  var panel = document.getElementById('chat-panel');
  if (!panel) return;
  if (panel.classList.contains('hidden')) {
    panel.classList.remove('hidden');
    updateChatContextPill();
    var inp = document.getElementById('chat-input');
    if (inp) inp.focus();
    scrollChatToBottom();
  } else {
    panel.classList.add('hidden');
  }
}

function sendPromptToChat(promptText) {
  var panel = document.getElementById('chat-panel');
  if (panel && panel.classList.contains('hidden')) {
    panel.classList.remove('hidden');
    updateChatContextPill();
  }
  var input = document.getElementById('chat-input');
  if (input) {
    input.value = promptText;
  }
  scrollChatToBottom();
  sendChatMessage();
}

function clearChatHistory() {
  chatHistory = [];
  var container = document.getElementById('chat-messages');
  if (container) {
    container.innerHTML = '<div class="chat-message bot"><div class="message-bubble">Hi! I\'m JavaBot 🤖 Ask me anything about Java or your code! (History cleared to save tokens ⚡)</div></div>';
  }
}

function handleChatKey(e) {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendChatMessage(); }
}

function callGemini(modelName, apiKey, payload) {
  var url = 'https://generativelanguage.googleapis.com/v1beta/models/' + modelName + ':generateContent?key=' + apiKey;
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }).then(function(r){ return r.json(); });
}

function sendChatMessage() {
  var input = document.getElementById('chat-input');
  if (!input) return;
  var msg = input.value.trim();
  if (!msg) return;
  input.value = '';
  appendChatMsg('user', msg);

  var apiKey = getGeminiKey();
  if (!apiKey) {
    appendChatMsg('bot', '⚙️ No API key set! You can paste a free Gemini key in Settings ⚙️ or in ai-tutor.js.');
    return;
  }

  // Update context pill
  updateChatContextPill();

  // Add to history and prune to max 4 items (2 user questions + 2 bot replies)
  chatHistory.push({ role: 'user', parts: [{ text: msg }] });
  if (chatHistory.length > 4) {
    chatHistory = chatHistory.slice(-4);
  }

  var typing = document.getElementById('chat-typing');
  if (typing) typing.classList.remove('hidden');
  scrollChatToBottom();

  var codeCtx = getCurrentUserCodeContext();
  var dynamicSystem = AI_SYSTEM;
  if (codeCtx && codeCtx.code) {
    dynamicSystem += '\n\n[USER CURRENT WORKSPACE]\nActive Screen/Project: ' + codeCtx.title
      + '\nUser\'s Exact Code in Editor:\n```java\n' + codeCtx.code + '\n```';
    if (codeCtx.error) {
      dynamicSystem += '\nRecent Compiler Output / Error:\n' + codeCtx.error;
    }
    dynamicSystem += '\n\nIMPORTANT: You have direct visibility into the user\'s editor code above. When they ask questions, reference their specific code, variables, and logic. If they ask for a code review or error explanation, point out issues clearly with small code tips under 70 words.';
  }

  var payload = {
    system_instruction: { parts: [{ text: dynamicSystem }] },
    contents: chatHistory,
    generationConfig: { maxOutputTokens: 200, temperature: 0.3 }
  };

  // Try primary model (gemini-3.5-flash-lite), fallback to gemini-flash-lite-latest
  callGemini('gemini-3.5-flash-lite', apiKey, payload)
    .then(function(data){
      if (data.error && (data.error.code === 404 || data.error.code === 503)) {
        return callGemini('gemini-flash-lite-latest', apiKey, payload);
      }
      return data;
    })
    .then(function(data){
      if (typing) typing.classList.add('hidden');
      if (data.error) {
        var errCode = data.error.code;
        var errMsg = data.error.message || 'API error';
        if (errCode === 429 || errMsg.toLowerCase().includes('quota') || errMsg.toLowerCase().includes('exhausted')) {
          appendChatMsg('bot', '⚠️ Free tier rate limit reached. Please wait 30 seconds before asking again! ☕');
        } else {
          appendChatMsg('bot', '⚠️ ' + errMsg);
        }
        return;
      }

      var text = '';
      try {
        text = data.candidates[0].content.parts[0].text;
      } catch(e) {
        text = 'Welcome! I specialize in Java programming. What Java concept can I help explain? ☕';
      }

      chatHistory.push({ role: 'model', parts: [{ text: text }] });
      appendChatMsg('bot', text);
    })
    .catch(function(err){
      if (typing) typing.classList.add('hidden');
      appendChatMsg('bot', '⚠️ Network error: ' + err.message + '. Please check your connection or API key ☕');
    });
}

function appendChatMsg(role, text) {
  var container = document.getElementById('chat-messages');
  if (!container) return;
  var div = document.createElement('div');
  div.className = 'chat-message ' + role;
  var bubble = document.createElement('div');
  bubble.className = 'message-bubble';
  var html = String(text)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/```(?:java)?\n?([\s\S]*?)```/g, function (_, code) {
      var raw = code.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
      return '<pre>' + (typeof highlightSyntax === 'function' ? highlightSyntax(raw.trim()) : raw.trim()) + '</pre>';
    })
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" style="color:#43D8C9">$1</a>')
    .replace(/\n/g, '<br>');
  bubble.innerHTML = html;
  div.appendChild(bubble);
  container.appendChild(div);
  scrollChatToBottom();
}

function scrollChatToBottom() {
  var c = document.getElementById('chat-messages');
  if (c) setTimeout(function () { c.scrollTop = c.scrollHeight; }, 60);
}

function updateChatContext(name) {
  var el = document.getElementById('chat-bot-status');
  if (el) el.textContent = name ? 'Studying: ' + name : 'Your AI Java Tutor';
}
