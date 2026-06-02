/**
 * public/sw.js
 *
 * Intercepts requests for .glb/.gltf/.bin files and serves them
 * from Cache Storage on repeat visits — essentially instant load.
 *
 * Bump CACHE_NAME (e.g. "models-v2") whenever you replace a model file
 * so the old cached version is evicted.
 */
const CACHE_NAME = "models-v1";
const MODEL_EXTS = [".glb", ".gltf", ".bin"];

// Activate immediately — don't wait for old SW to expire
self.addEventListener("install", () => self.skipWaiting());

// Clean up old caches on activate
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k !== CACHE_NAME)
          .map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Cache-first strategy for model files only
self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  const isModel = MODEL_EXTS.some((ext) => url.pathname.endsWith(ext));
  if (!isModel) return; // let everything else pass through normally

  e.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cached = await cache.match(e.request);
      if (cached) {
        // Return from cache instantly, then refresh in background
        // so models stay up to date if you push new versions
        fetch(e.request)
          .then((fresh) => {
            if (fresh.ok) cache.put(e.request, fresh.clone());
          })
          .catch(() => {}); // offline — fine, we already returned cached
        return cached;
      }

      // First visit — fetch, cache, and return
      const response = await fetch(e.request);
      if (response.ok) {
        cache.put(e.request, response.clone());
      }
      return response;
    })
  );
});