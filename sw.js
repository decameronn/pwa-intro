const PWACache = 'pwa-static-cache-v2';
const dynamicPWACache = 'pwa-dynamic-cache-v1';
const assets = [
  '/',
  '/index.html',
  '/js/app.js',
  '/js/ui.js',
  '/js/materialize.min.js',
  '/css/styles.css',
  '/css/materialize.min.css',
  '/img/dish.png',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  '/pages/fallback.html'
];

self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(PWACache).then(cache => {
      console.log("assets caching started...");
      return cache.addAll(assets);
    })
  );
});

self.addEventListener("activate", (evt) => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== PWACache && key !== dynamicPWACache) 
        .map(key => caches.delete(key))
      )
    })
  );
});

self.addEventListener("fetch", (evt) => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
        return cacheRes || fetch(evt.request).then(fetchRes => {
            return caches.open(dynamicPWACache).then(cache => {
              cache.put(evt.request.url, fetchRes.clone());
              return fetchRes;
            })
          });
      }).catch(() => caches.match("/pages/fallback.html"))
  );
});