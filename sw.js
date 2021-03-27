const PWACache = 'pwa-static-cache';
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
  console.log("service worker has been activated");
});

/* listen for the fetch event */
self.addEventListener("fetch", (evt) => {
  console.log("fetch event", evt);
});