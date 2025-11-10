const CACHE_NAME = "setrep-v1";
const APP_SHELL = ["/", "/app", "/dashboard", "/favicon.ico", "/app/globals.css"];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).catch(() => null)
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => (key !== CACHE_NAME && key.startsWith("setrep-") ? caches.delete(key) : null)))
    ).then(() => self.clients.claim())
  );
});

function isNavigationRequest(request) {
  return request.mode === "navigate";
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (isNavigationRequest(request)) {
    event.respondWith(
      fetch(request).then((res) => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        return res;
      }).catch(() => caches.match(request))
    );
    return;
  }

  const dest = request.destination;
  if (["style", "script", "image", "font"].includes(dest)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        const network = fetch(request).then((res) => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return res;
        }).catch(() => cached);
        return cached || network;
      })
    );
  }
});