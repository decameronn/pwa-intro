/**
 * add an event listener to the service worker to listen
 * to the Install Event (as part of Lifecycle events)
 * 
 * note: in browser console, we can see "service worker has been installed".
 * if we never change the content of the SW, we'll never see this 
 * message again (if we refresh the browser), because its content
 * is not changed.
 * if we change it, it then gets re-installed
 * 
 * also, SW remains "in waiting", until we close all of the tabs related 
 * to our application and reopen then. (this can be changed from 
 * browser console)
 */
self.addEventListener('install', (evt) => {
  console.log("service worker has been installed");
});

/**
 * listen for the activate event (and therefore activate SW)
 */
self.addEventListener("activate", (evt) => {
  console.log("service worker has been activated");
});

/**
 * listen for the fetch event
 */
self.addEventListener("fetch", (evt) => {
  console.log("fetch event", evt);
});