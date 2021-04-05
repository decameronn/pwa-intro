const PWACache = 'pwa-static-cache-v2';
const assets = [
  '/',
  '/index.html',
  '/js/app.js',
  '/js/ui.js',
  '/js/materialize.min.js',
  '/css/styles.css',
  '/css/materialize.min.css',
  '/img/dish.png',
  'https://fonts.googleapis.com/icon?family=Material+Icons'
];

/* listen to the install event (part of lifecycle events) */
self.addEventListener('install', (evt) => {
  /**
   * because we cache assets during install event, this event
   * might end really fast and the browser might attempt to stop it
   * before the actual process of caching finishes, therefore we 
   * wrap this in waitUntil() method
   */
  evt.waitUntil(
    caches.open(PWACache).then(cache => {
      console.log("assets caching started...");
      return cache.addAll(assets);
    })
  );
});

/* listen for the activate event (and therefore activate SW) */
self.addEventListener("activate", (evt) => {
  // console.log("service worker has been activated");
  evt.waitUntil(
    caches.keys().then(keys => {
      /**
       * cycle through any cahces we have in the broswer
       * if the name of the caches don't match the current name of 
       * our cache, we delete them from the browser, such that
       * SW knows which version to fetch from cache
       */
      /**
       * this expects only one Promise to return
       * so when we cycle the array of promises, we wait until they're all
       * but the correct one done (async)
       */
      return Promise.all(keys
        .filter(key => key !== PWACache) 
        /**
         * all the keys which aren't PWACache, remain in the array of promises
         * because they are the keys we want to delete
         * therefore we have a new array of caches we want to delete
         */
        .map(key => caches.delete(key)) /* caches.delete() returns a promise */
      )
    })
  );
});

/* listen for the fetch event */
self.addEventListener("fetch", (evt) => {

  /* pause fetch event and respond with our customer event */
  evt.respondWith(
    caches.match(evt.request)   /* async */
      .then(cacheRes => {
        return cacheRes || fetch(evt.request);
        /**
         * the response we store in the cache for evt.request
         * if we don't have it or it's empty, just return the fetch request 
         */
      })
  );
});