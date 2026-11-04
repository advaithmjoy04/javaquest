// JavaQuest — supabase.js
// Supabase client + all DB operations
// SAFE: anon key is designed to be public — RLS protects all data

var SUPABASE_URL  = 'https://rwlkjuiqseifjzsuitfo.supabase.co';
var SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3bGtqdWlxc2VpZmp6c3VpdGZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM3NjQ4MTksImV4cCI6MjEwOTM0MDgxOX0.rJ_CMn4Zd8RscMLfrDVRqTPUiO6B6P12oBSfmi-yYS4';

// --- Low-level fetch wrapper ---
function sbFetch(path, opts) {
  opts = opts || {};
  var url = SUPABASE_URL + path;
  var headers = {
    'apikey':        SUPABASE_ANON,
    'Authorization': 'Bearer ' + (window._sbSession ? window._sbSession.access_token : SUPABASE_ANON),
    'Content-Type':  'application/json',
    'Prefer':        'return=representation'
  };
  if (opts.headers) {
    Object.keys(opts.headers).forEach(function(k) { headers[k] = opts.headers[k]; });
  }
  // Guarantee apikey is ALWAYS present
  headers['apikey'] = SUPABASE_ANON;

  var fetchOpts = Object.assign({}, opts, { headers: headers });
  return fetch(url, fetchOpts).then(function(r) {
    if (!r.ok) {
      return r.text().then(function(txt) {
        var errObj = {};
        try { errObj = JSON.parse(txt); } catch(e) {}
        var msg = errObj.msg || errObj.message || errObj.error_description || errObj.error || txt || 'Request failed';
        throw new Error(msg);
      });
    }
    var ct = r.headers.get('content-type') || '';
    if (ct.includes('application/json')) return r.json();
    return r.text();
  });
}

// ═══════════════════════════════════════════════════════
//  AUTH
// ═══════════════════════════════════════════════════════
window._sbSession = null;

function sbSignUp(email, password, metadata) {
  var body = { email: email, password: password };
  if (metadata) body.data = metadata;
  return sbFetch('/auth/v1/signup', {
    method: 'POST',
    body: JSON.stringify(body)
  }).then(function(data) {
    var session = (data && data.session) || (data && data.access_token ? data : null);
    if (session) { window._sbSession = session; sbPersistSession(session); }
    return data;
  });
}

function sbSignIn(email, password) {
  return sbFetch('/auth/v1/token?grant_type=password', {
    method: 'POST',
    body: JSON.stringify({ email: email, password: password })
  }).then(function(data) {
    if (data.access_token) {
      if (!data.user) {
        var jwt = decodeJwt(data.access_token);
        if (jwt && jwt.sub) {
          data.user = { id: jwt.sub, email: jwt.email, user_metadata: jwt.user_metadata || {} };
        }
      }
      window._sbSession = data;
      sbPersistSession(data);
    }
    return data;
  });
}

function sbSignOut() {
  var token = window._sbSession ? window._sbSession.access_token : null;
  window._sbSession = null;
  localStorage.removeItem('javaquest_session');
  if (!token) return Promise.resolve();
  return fetch(SUPABASE_URL + '/auth/v1/logout', {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_ANON,
      'Authorization': 'Bearer ' + token
    }
  }).catch(function() {}); // ignore errors on logout
}

function decodeJwt(token) {
  try {
    var parts = token.split('.');
    if (parts.length >= 2) {
      var base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    }
  } catch(e) {}
  return null;
}

window._sbHashError = null;

function sbPersistSession(session) {
  try { localStorage.setItem('javaquest_session', JSON.stringify(session)); } catch(e) {}
}

function sbRestoreSession() {
  try {
    // 1. Check URL hash for Supabase Auth redirect (confirmation or magic link)
    if (typeof window !== 'undefined' && window.location && window.location.hash) {
      var hash = window.location.hash.substring(1);
      if (hash) {
        var params = new URLSearchParams(hash);
        var errDesc = params.get('error_description') || params.get('error');
        if (errDesc) {
          window._sbHashError = decodeURIComponent(errDesc.replace(/\+/g, ' '));
          // Clean URL hash so it doesn't linger or confuse reload
          if (window.history && window.history.replaceState) {
            window.history.replaceState(null, '', window.location.pathname + window.location.search);
          }
        }

        var accessToken = params.get('access_token');
        var refreshToken = params.get('refresh_token');
        var expiresIn = params.get('expires_in');
        var tokenType = params.get('token_type') || 'bearer';

        if (accessToken) {
          var jwt = decodeJwt(accessToken);
          var hashSession = {
            access_token: accessToken,
            refresh_token: refreshToken,
            expires_at: expiresIn ? Math.floor(Date.now() / 1000) + parseInt(expiresIn, 10) : null,
            token_type: tokenType,
            user: jwt ? {
              id: jwt.sub,
              email: jwt.email,
              user_metadata: jwt.user_metadata || {}
            } : null
          };
          if (window.history && window.history.replaceState) {
            window.history.replaceState(null, '', window.location.pathname + window.location.search);
          }
          window._sbSession = hashSession;
          sbPersistSession(hashSession);
          return hashSession;
        }
      }
    }

    // 2. Check localStorage
    var raw = localStorage.getItem('javaquest_session');
    if (!raw) return null;
    var session = JSON.parse(raw);
    // Check expiry (exp is in seconds)
    if (session.expires_at && Date.now() / 1000 > session.expires_at) {
      localStorage.removeItem('javaquest_session');
      return null;
    }
    window._sbSession = session;
    return session;
  } catch(e) { return null; }
}

function sbRefreshSession() {
  if (!window._sbSession || !window._sbSession.refresh_token) return Promise.resolve(null);
  return sbFetch('/auth/v1/token?grant_type=refresh_token', {
    method: 'POST',
    headers: { 'Authorization': 'Bearer ' + SUPABASE_ANON },
    body: JSON.stringify({ refresh_token: window._sbSession.refresh_token })
  }).then(function(data) {
    if (data.access_token) { window._sbSession = data; sbPersistSession(data); }
    return data;
  }).catch(function() { return null; });
}

function sbCurrentUser() {
  if (!window._sbSession) return null;
  if (window._sbSession.user) return window._sbSession.user;
  if (window._sbSession.access_token) {
    var jwt = decodeJwt(window._sbSession.access_token);
    if (jwt && jwt.sub) {
      window._sbSession.user = { id: jwt.sub, email: jwt.email, user_metadata: jwt.user_metadata || {} };
      return window._sbSession.user;
    }
  }
  return null;
}

// ═══════════════════════════════════════════════════════
//  PROFILE
// ═══════════════════════════════════════════════════════
function sbGetProfile() {
  var uid = sbCurrentUser() && sbCurrentUser().id;
  if (!uid) return Promise.reject(new Error('Not logged in'));
  return sbFetch('/rest/v1/profiles?id=eq.' + encodeURIComponent(uid) + '&select=*').then(function(rows) {
    return rows && rows[0] ? rows[0] : null;
  });
}

function sbUpsertProfile(data) {
  var uid = sbCurrentUser() && sbCurrentUser().id;
  if (!uid) return Promise.reject(new Error('Not logged in'));
  var payload = Object.assign({ id: uid }, data);
  return sbFetch('/rest/v1/profiles', {
    method: 'POST',
    headers: { 'Prefer': 'resolution=merge-duplicates,return=representation' },
    body: JSON.stringify(payload)
  });
}

// ═══════════════════════════════════════════════════════
//  PROGRESS
// ═══════════════════════════════════════════════════════
function sbGetProgress() {
  var uid = sbCurrentUser() && sbCurrentUser().id;
  if (!uid) return Promise.reject(new Error('Not logged in'));
  return sbFetch('/rest/v1/progress?user_id=eq.' + encodeURIComponent(uid) + '&select=*').then(function(rows) {
    return rows && rows[0] ? rows[0] : { completed_lessons: [], completed_challenges: [], completed_modules: [], completed_coding: [], coding_attempts: {}, capstone_projects: {} };
  });
}

function sbUpsertProgress(data) {
  var uid = sbCurrentUser() && sbCurrentUser().id;
  if (!uid) return Promise.reject(new Error('Not logged in'));
  var payload = Object.assign({ user_id: uid }, data);
  return sbFetch('/rest/v1/progress', {
    method: 'POST',
    headers: { 'Prefer': 'resolution=merge-duplicates,return=representation' },
    body: JSON.stringify(payload)
  });
}

// ═══════════════════════════════════════════════════════
//  BADGES
// ═══════════════════════════════════════════════════════
function sbGetBadges() {
  var uid = sbCurrentUser() && sbCurrentUser().id;
  if (!uid) return Promise.reject(new Error('Not logged in'));
  return sbFetch('/rest/v1/earned_badges?user_id=eq.' + encodeURIComponent(uid) + '&select=badge_id').then(function(rows) {
    return (rows || []).map(function(r) { return r.badge_id; });
  });
}

function sbInsertBadge(badgeId) {
  var uid = sbCurrentUser() && sbCurrentUser().id;
  if (!uid) return Promise.resolve();
  return sbFetch('/rest/v1/earned_badges', {
    method: 'POST',
    headers: { 'Prefer': 'resolution=ignore-duplicates,return=minimal' },
    body: JSON.stringify({ user_id: uid, badge_id: badgeId })
  }).catch(function() {}); // ignore duplicate constraint
}

// ═══════════════════════════════════════════════════════
//  SAVE DEBOUNCE — batches rapid saves into one write
// ═══════════════════════════════════════════════════════
var _saveTimer = null;
var _pendingBadges = [];

function sbSaveAll(STATE) {
  if (!sbCurrentUser()) return; // offline / not logged in
  clearTimeout(_saveTimer);
  _saveTimer = setTimeout(function() { _doSaveAll(STATE); }, 1200);
}

function _doSaveAll(STATE) {
  var p = STATE.player;
  // Profile
  sbUpsertProfile({
    username:          p.name,
    difficulty:        p.difficulty || 'beginner',
    avatar_skin:       p.avatar.skin,
    avatar_hair:       p.avatar.hair,
    avatar_hair_color: p.avatar.hairColor,
    avatar_outfit:     p.avatar.outfit,
    avatar_accessory:  p.avatar.accessory,
    xp:                p.xp,
    level:             p.level,
    streak:            p.streak,
    last_visit:        p.lastVisit,
    hearts:            p.hearts,
    heart_refill_at:   p.heartRefillTime ? new Date(p.heartRefillTime).toISOString() : null
  }).catch(function(e) { console.warn('Profile save failed:', e.message); });

  // Progress
  sbUpsertProgress({
    completed_lessons:    p.completedLessons,
    completed_challenges: p.completedChallenges,
    completed_modules:    p.completedModules,
    completed_coding:     p.completedCoding || [],
    coding_attempts:      p.codingAttempts || {},
    capstone_projects:    p.capstoneProjects || {}
  }).catch(function(e) { console.warn('Progress save failed:', e.message); });

  // Pending badges
  if (_pendingBadges.length) {
    var toInsert = _pendingBadges.slice();
    _pendingBadges = [];
    toInsert.forEach(function(bid) { sbInsertBadge(bid); });
  }
}

function sbQueueBadge(badgeId) {
  if (_pendingBadges.indexOf(badgeId) === -1) _pendingBadges.push(badgeId);
}
