let cacheName = 'NotMiss_cache';
let filesToCache = [
    'Pages/index.html',
    'Pages/accedi.html',
    'Pages/contatti.html',
    'Pages/info.html',
    'Pages/noscript.html',
    'Javascript/Global.js',
    'Javascript/accedi.js',
    'Javascript/index.js',
    'Javascript/contatti.js',
    'Javascript/info.js',
    'Javascript/jquery-3.6.0.min.js',
    'Proposal/proposal_NotMiss_Esposito_Rubino.mp4',
    'PWA/main.js',
    'Style/animation.css',
    'Style/bootstrap.css',
    'Style/mediaq.css',
    'Style/style.css',
    'IMG/Icons/bandierainglese.png',
    'IMG/Icons/bandieraitalia.png',
    'IMG/Icons/buttonMenu.png',
    'IMG/Icons/closeButton.png',
    'IMG/Icons/freccia.png',
    'IMG/Icons/threebar32.jpg',
    'IMG/Icons/threebar64.jpg',
    'IMG/logo/logo.png',
    'IMG/logo/logo32.ico',
    'IMG/logo/logo64.ico',
    'IMG/logo/logo128.ico',
    'IMG/logo/logo144x144.png',
    'IMG/logo/logo128.png',
    'IMG/logo/logo256.ico',
    'IMG/logo/logo512.png',
    'IMG/logo/logoNotMiss.png',
    'IMG/logo/logoNotMiss128.png',
    'IMG/logo/logoNotMiss256.png',
    'IMG/bg.png'
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
