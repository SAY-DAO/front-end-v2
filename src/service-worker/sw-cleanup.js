/* ================================================================
1) sw-cleanup.js
One-time cleanup: unregisters service workers and deletes caches that match
known prefixes. Runs once per client (localStorage guard).
================================================================ */
// Run early on app load. It sets CLEANUP_KEY immediately so it won't run twice.
(async function swCleanupOnce() {
  if (!('serviceWorker' in navigator) || !('caches' in window)) return;

  const CLEANUP_KEY = 'sw_cleanup_done_v0.0.1'; // bump when running a new cleanup
  if (localStorage.getItem(CLEANUP_KEY)) return;

  // Immediately mark cleanup started so we won't run twice during a reload
  try {
    localStorage.setItem(CLEANUP_KEY, 'in-progress');
  } catch (e) {
    console.warn('[sw-cleanup] Could not set cleanup flag', e);
  }

  try {
    // Optionally narrow the cache deletion to known prefixes
    const KNOWN_CACHE_PREFIXES = ['SAY-DAPP-'];

    // Inspect current registrations and caches
    const regs = await navigator.serviceWorker.getRegistrations();
    const keys = await caches.keys();

    const hasKnownCache = keys.some((k) => KNOWN_CACHE_PREFIXES.some((pref) => k.startsWith(pref)));
    const hasOurSw = regs.some((r) => {
      const script =
        (r.active && r.active.scriptURL) ||
        (r.waiting && r.waiting.scriptURL) ||
        (r.installing && r.installing.scriptURL);
      return (
        !!script &&
        (script.includes('service-worker.js') ||
          script.includes('sw.js') ||
          script.includes('serviceworker'))
      );
    });

    if (!hasKnownCache && !hasOurSw) {
      localStorage.setItem(CLEANUP_KEY, '1');
      return;
    }

    // Unregister SWs
    if (regs && regs.length) {
      await Promise.all(regs.map((r) => r.unregister()));
    }

    // Delete matching caches only
    await Promise.all(
      keys.map((k) => {
        if (KNOWN_CACHE_PREFIXES.some((pref) => k.startsWith(pref))) {
          return caches.delete(k);
        }
        return Promise.resolve(null);
      }),
    );

    // Mark finished
    localStorage.setItem(CLEANUP_KEY, '1');

    // Reload once so subsequent loads are not controlled by old SWs.
    // We won't reload again because CLEANUP_KEY is now set.
    window.location.reload();
  } catch (err) {
    console.error('[sw-cleanup] Failed to cleanup service workers/caches', err);
    // ensure we mark done to avoid repeat attempts
    localStorage.setItem(CLEANUP_KEY, '1');
  }
})();
