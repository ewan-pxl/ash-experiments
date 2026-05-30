// Cloudflare Pages Function — password gate for the internal Post-Click OS.
//
// Protects ONLY the OS: the /home* pages and the OS's own JS/CSS bundle
// (/assets/shell-*, which has the wiki + branding content inlined). Everything
// else — client deck pages and their assets — stays fully public, so shared
// deck links work with no password.
//
// One shared password, set as the `OS_PASSWORD` environment variable in the
// Cloudflare Pages project settings. No accounts, no login system. A correct
// password sets a 30-day cookie so people aren't re-prompted.

const COOKIE = 'pcos_auth'

// Which paths require the password. Deck pages live at other paths and stay open.
function isProtected(pathname) {
  return (
    pathname === '/home' ||
    pathname.startsWith('/home/') ||
    pathname.startsWith('/assets/shell-')
  )
}

// Cookie/verification token = SHA-256 of the password (so the plaintext password
// is never stored in the cookie). Good enough for a shared internal gate.
async function tokenFor(password) {
  const bytes = new TextEncoder().encode('pcos:' + password)
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

function getCookie(header, name) {
  for (const part of (header || '').split(';')) {
    const i = part.indexOf('=')
    if (i > 0 && part.slice(0, i).trim() === name) return part.slice(i + 1).trim()
  }
  return null
}

function loginPage({ error = false, action = '/home' } = {}) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="robots" content="noindex" />
<title>Post-Click OS</title>
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Funnel+Display:wght@600;700&family=Inter:wght@400;500&display=swap" />
<style>
  :root { --ink:#2c0f44; --bg:#f6f4ef; --accent:#9224e9; --border:rgba(44,15,68,0.12); --muted:rgba(44,15,68,0.55); }
  * { box-sizing:border-box; }
  body { margin:0; min-height:100vh; display:grid; place-items:center; background:var(--bg);
         color:var(--ink); font-family:'Inter',system-ui,sans-serif; -webkit-font-smoothing:antialiased; }
  .card { width:min(92vw,360px); background:#fff; border:1px solid var(--border); border-radius:16px;
          padding:2.25rem 2rem; box-shadow:0 6px 24px rgba(44,15,68,0.07); text-align:center; }
  h1 { font-family:'Funnel Display',sans-serif; font-weight:700; font-size:1.5rem; letter-spacing:-0.02em; margin:0.25rem 0 0.4rem; }
  p { color:var(--muted); font-size:0.9rem; margin:0 0 1.5rem; }
  input { width:100%; padding:0.7rem 0.9rem; font-size:1rem; font-family:inherit; color:var(--ink);
          background:var(--bg); border:1px solid var(--border); border-radius:10px; margin-bottom:0.75rem; }
  input:focus { outline:none; border-color:var(--accent); box-shadow:0 0 0 3px rgba(146,36,233,0.12); }
  button { width:100%; padding:0.7rem; font-size:0.95rem; font-weight:600; font-family:inherit; color:#fff;
           background:var(--accent); border:0; border-radius:10px; cursor:pointer; }
  button:hover { background:#7d18cd; }
  .err { color:#c0392b; font-size:0.85rem; margin:-0.25rem 0 0.85rem; min-height:1rem; }
  .logo { height:2.75rem; width:auto; margin-bottom:0.25rem; }
</style>
</head>
<body>
  <form class="card" method="POST" action="${action}">
    <img class="logo" src="/favicon.svg" alt="Pixel Theory" />
    <h1>Post-Click OS</h1>
    <p>Enter the password to continue.</p>
    <input type="password" name="password" placeholder="Password" autofocus autocomplete="current-password" required />
    <div class="err">${error ? 'Incorrect password — try again.' : ''}</div>
    <button type="submit">Unlock</button>
  </form>
</body>
</html>`
}

export async function onRequest(context) {
  const { request, env, next } = context
  const url = new URL(request.url)

  if (!isProtected(url.pathname)) return next()

  const password = env.OS_PASSWORD
  // Fail closed: if no password is configured, do NOT serve the OS (never expose
  // the internal content by accident). Show a clear setup notice instead.
  if (!password) {
    return new Response(
      '<!doctype html><meta charset="utf-8"><body style="font-family:system-ui;max-width:34rem;margin:4rem auto;padding:0 1rem;color:#2c0f44">' +
        '<h1>Post-Click OS — not yet configured</h1><p>Set the <code>OS_PASSWORD</code> environment variable in the Cloudflare Pages project settings to enable access.</p>',
      { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } },
    )
  }

  const expected = await tokenFor(password)

  // Login form submission.
  if (request.method === 'POST') {
    const form = await request.formData()
    const attempt = String(form.get('password') || '')
    if ((await tokenFor(attempt)) === expected) {
      const dest = url.pathname.startsWith('/assets/') ? '/home' : url.pathname + url.search
      return new Response(null, {
        status: 303,
        headers: {
          Location: dest,
          'Set-Cookie': `${COOKIE}=${expected}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000`,
        },
      })
    }
    return new Response(loginPage({ error: true, action: url.pathname + url.search }), {
      status: 401,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    })
  }

  // Already unlocked?
  if (getCookie(request.headers.get('Cookie'), COOKIE) === expected) return next()

  // Not unlocked: assets get a bare 401; pages get the branded password form.
  if (url.pathname.startsWith('/assets/')) {
    return new Response('Unauthorized', { status: 401 })
  }
  return new Response(loginPage({ action: url.pathname + url.search }), {
    status: 401,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  })
}
