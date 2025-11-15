/* ================================================================
1) sw-cleanup.js
One-time cleanup: unregisters service workers and deletes caches that match
known prefixes. Runs once per client (localStorage guard).
================================================================ */

// sw-cleanup.js
(async function swCleanupOnce() {
  if (!('serviceWorker' in navigator) || !('caches' in window)) return;

  // Bump this key if you ever want to run cleanup again in the future
  const CLEANUP_KEY = 'sw_cleanup_done_v2025-11-15';

  // Only run once per client
  if (localStorage.getItem(CLEANUP_KEY)) return;

  // Configure the cache-name prefixes that belong to your app
  const KNOWN_CACHE_PREFIXES = ['SAY-DAPP-']; // <-- adjust to your cache naming scheme

  try {
    // 1) Check registrations and caches to decide if cleanup is necessary
    const regs = await navigator.serviceWorker.getRegistrations();
    const cacheKeys = await caches.keys();

    const hasKnownCache = cacheKeys.some((k) =>
      KNOWN_CACHE_PREFIXES.some((pref) => k.startsWith(pref)),
    );

    const hasOurSw = regs.some((r) => {
      const script =
        (r.active && r.active.scriptURL) ||
        (r.waiting && r.waiting.scriptURL) ||
        (r.installing && r.installing.scriptURL);
      if (!script) return false;
      // Adjust this test if your old SW filename is different
      return (
        script.includes('service-worker.js') ||
        script.includes('sw.js') ||
        script.includes('serviceworker')
      );
    });

    // If no known caches and no SW registrations that look like ours, mark cleanup done and skip.
    if (!hasKnownCache && !hasOurSw) {
      localStorage.setItem(CLEANUP_KEY, '1');
      return;
    }

    // 2) Unregister all service workers for this origin
    if (regs && regs.length) {
      console.log(
        '[sw-cleanup] Unregistering service workers:',
        regs.map((r) => r.scope),
      );
      await Promise.all(regs.map((r) => r.unregister()));
    }

    // 3) Delete caches that match our prefixes (avoid touching unrelated caches)
    await Promise.all(
      cacheKeys.map(async (k) => {
        if (KNOWN_CACHE_PREFIXES.some((pref) => k.startsWith(pref))) {
          console.log('[sw-cleanup] Deleting cache:', k);
          return caches.delete(k);
        }
        return null;
      }),
    );

    // 4) Mark cleanup as done
    localStorage.setItem(CLEANUP_KEY, '1');

    console.log(
      '[sw-cleanup] Cleanup complete — reloading page to ensure no SW is controlling it.',
    );

    // Force a reload so subsequent loads are not controlled by old SWs.
    // Avoid cache for best effect.
    window.location.reload();
  } catch (err) {
    console.error('[sw-cleanup] Failed to cleanup service workers/caches', err);
  }
})();
