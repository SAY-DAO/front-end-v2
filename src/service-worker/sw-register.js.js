/* ================================================================
2) sw-register.js
Registers the new service worker, posts SKIP_WAITING to waiting worker
and reloads when the new worker takes control.
================================================================ */

// src/service-worker/sw-register.js
export async function register() {
  if (!('serviceWorker' in navigator)) {
    console.info('[sw-register] Service workers not supported');
    return;
  }

  const isLocalhost =
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname === '[::1]';

  const isSecure = window.isSecureContext || window.location.protocol === 'https:' || isLocalhost;

  if (!isSecure) {
    console.warn('[sw-register] Skipping registration — insecure context', {
      protocol: window.location.protocol,
      hostname: window.location.hostname,
      isSecureContext: window.isSecureContext,
    });
    return;
  }

  // avoid running on extension pages / file: etc
  const forbidden = ['chrome-extension:', 'moz-extension:', 'file:', 'about:'];
  if (forbidden.some((s) => window.location.protocol.startsWith(s))) {
    console.warn(
      '[sw-register] Skipping registration — unsupported scheme:',
      window.location.protocol,
    );
    return;
  }

  try {
    const registration = await navigator.serviceWorker.register('/service-worker.js', {
      scope: '/',
    });
    console.log('[sw-register] Registered service worker:', registration);

    if (registration.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }

    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (!newWorker) return;
      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          newWorker.postMessage({ type: 'SKIP_WAITING' });
        }
      });
    });

    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('[sw-register] Controller changed — reloading once to activate new SW');
      window.location.reload();
    });
  } catch (err) {
    console.error('[sw-register] Registration failed (caught):', err);
  }
}

export default { register };
