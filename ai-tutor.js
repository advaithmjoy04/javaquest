// JavaQuest — ai-tutor.js
// Ultra-low token Gemini Flash-Lite AI Tutor for JavaQuest

var DEFAULT_KEY = '';
window._serverGeminiKey = '';

// Auto-fetch key from local server if available
if (typeof fetch === 'function') {
  fetch('/api/config')
    .then(function(r){ return r.json(); })
    .then(function(cfg){
      if (cfg && cfg.geminiKey) window._serverGeminiKey = cfg.geminiKey;
    })
    .catch(function(){});
}

function getGeminiKey() {
  try {
    var stored = localStorage.getItem('jq_gemini_api_key');
    if (stored && stored.trim()) return stored.trim();
  } catch(e){}
  return window._serverGeminiKey || DEFAULT_KEY;
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

function toggleChat() {
  var panel = document.getElementById('chat-panel');
  if (!panel) return;
  if (panel.classList.contains('hidden')) {
    panel.classList.remove('hidden');
    var inp = document.getElementById('chat-input');
    if (inp) inp.focus();
    scrollChatToBottom();
  } else {
    panel.classList.add('hidden');
  }
}

function clearChatHistory() {
  chatHistory = [];
  var container = document.getElementById('chat-messages');
  if (container) {
    container.innerHTML = '<div class="chat-message bot"><div class="message-bubble">Hi! I\'m JavaBot 🤖 Ask me anything about Java! (History cleared to save tokens ⚡)</div></div>';
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

  // Add to history and prune to max 4 items (2 user questions + 2 bot replies)
  // This slashes input token consumption by 80-90% on multi-turn conversations!
  chatHistory.push({ role: 'user', parts: [{ text: msg }] });
  if (chatHistory.length > 4) {
    chatHistory = chatHistory.slice(-4);
  }

  var typing = document.getElementById('chat-typing');
  if (typing) typing.classList.remove('hidden');
  scrollChatToBottom();

  var payload = {
    system_instruction: { parts: [{ text: AI_SYSTEM }] },
    contents: chatHistory,
    // maxOutputTokens 160 ensures responses are concise (saving free-tier output tokens)
    generationConfig: { maxOutputTokens: 160, temperature: 0.4 }
  };

  // Try primary model (gemini-flash-lite-latest), fallback to gemini-3.5-flash-lite on failure
  callGemini(PRIMARY_MODEL, apiKey, payload)
    .then(function(data){
      if (data.error && (data.error.code === 404 || data.error.code === 503)) {
        // Fallback to secondary model
        return callGemini(FALLBACK_MODEL, apiKey, payload);
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
