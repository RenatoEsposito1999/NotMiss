let cacheName = 'pwa_2021';
let filesToCache = [
    'Pages/index.html',
    'Pages/Accedi.html',
    'Pages/noscript.html',
    'Style/animation.css',
    'Style/bootstrap.css',
    'Style/mediaq.css',
    'Style/style.css',
    'Javascript/Global.js',
    'Javascript/jquery-3.6.0.min.js'
];
/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(filesToCache);
        })
    );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request).then(function(response) {
            return response || fetch(e.request);
        })
    );
});
