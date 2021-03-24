/* This file handles the registration of the service worker */

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then((reg) => console.log('service worker registered', reg))
    .catch((err) => console.log('service worker failed to register', err));
}