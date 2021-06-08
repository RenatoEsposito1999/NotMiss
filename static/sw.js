let cacheName = 'NotMiss_cache';
let filesToCache = [
    'templates/index.html',
    'templates/accedi.html',
    'templates/contatti.html',
    'templates/info.html',
    'templates/noscript.html',
    'templates/base.html',
    'templates/base2.html',
    'templates/crea-evento.html',
    'templates/profilo.html',
    'templates/registred.html',
    'static/Javascript/Global.js',
    'static/Javascript/accedi.js',
    'static/Javascript/index.js',
    'static/Javascript/contatti.js',
    'static/Javascript/info.js',
    'static/Javascript/registred.js',
    'static/Javascript/jquery-3.6.0.min.js',
    'static/proposal_NotMiss_Esposito_Rubino.mp4',
    'static/main.js',
    'static/Style/animation.css',
    'static/Style/bootstrap.css',
    'static/Style/mediaq.css',
    'static/Style/style.css',
    'static/IMG/Icons/bandierainglese.png',
    'static/IMG/Icons/bandieraitalia.png',
    'static/IMG/Icons/buttonMenu.png',
    'static/IMG/Icons/closeButton.png',
    'static/IMG/Icons/freccia.png',
    'static/IMG/Icons/threebar32.jpg',
    'static/IMG/Icons/threebar64.jpg',
    'static/IMG/Icons/successo.png',
    'static/IMG/logo/logo.png',
    'static/IMG/logo/logo32.ico',
    'static/IMG/logo/logo64.ico',
    'static/IMG/logo/logo128.ico',
    'static/IMG/logo/logo144x144.png',
    'static/IMG/logo/logo128.png',
    'static/IMG/logo/logo256.ico',
    'static/IMG/logo/logo512.png',
    'static/IMG/logo/logoNotMiss.png',
    'static/IMG/logo/logoNotMiss128.png',
    'static/IMG/logo/logoNotMiss256.png',
    'static/IMG/bg.png'
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
