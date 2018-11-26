// https://gist.github.com/esphen/485aa7242abab95050734ad672e563f6
// This is a worker that can be deployed in a desperate situation in order
// to disable all service worker caching by overwriting the running worker
// with a no-op worker.
//
// Keep it close for when you need it.

self.addEventListener('install', () => {
  // Activate immediately, taking control from any broken service workers
  self.skipWaiting()
});

self.addEventListener('activate', () => {
  // Get a list of all the current open windows/tabs under
  // our service worker's control, and force them to reload.
  // This can "unbreak" any open windows/tabs as soon as the new
  // service worker activates, rather than users having to manually reload.
  self.clients.matchAll({ type: 'window' }).then(clients => {
    clients.forEach(windowClient => windowClient.navigate(windowClient.url))
  })
})
