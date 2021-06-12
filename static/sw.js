let cacheName = "NotMiss_cache";
let filesToCache = [
    "templates/index.html",
    "templates/accedi.html",
    "templates/contatti.html",
    "templates/info.html",
    "templates/noscript.html",
    "templates/base.html",
    "templates/base2.html",
    "templates/crea-evento.html",
    "templates/profilo.html",
    "templates/registred.html",
    "templates/400.html",
    "templates/403.html",
    "templates/500.html",
    "static/Javascript/Global.js",
    "static/Javascript/accedi.js",
    "static/Javascript/index.js",
    "static/Javascript/contatti.js",
    "static/Javascript/info.js",
    "static/Javascript/registred.js",
    "static/Javascript/jquery-3.6.0.min.js",
    "static/proposal_NotMiss_Esposito_Rubino.mp4",
    "static/main.js",
    "static/Style/animation.css",
    "static/Style/bootstrap.css",
    "static/Style/mediaq.css",
    "static/Style/style.css",
    "static/IMG/Icons/addButton.png",
    "static/IMG/Icons/buttonInfo.png",
    "static/IMG/Icons/bandierainglese.png",
    "static/IMG/Icons/bandieraitalia.png",
    "static/IMG/Icons/buttonMenu128x128.png",
    "static/IMG/Icons/buttonMenublue128x128.png",
    "static/IMG/Icons/closeButton128x128.png",
    "static/IMG/Icons/plusicon128x128.png",
    "static/IMG/Icons/freccia.png",
    "static/IMG/Icons/successo.png",
    "static/IMG/logo/logo64x64.png",
    "static/IMG/logo/logo82x82.png",
    "static/IMG/logo/logo128x128.png",
    "static/IMG/logo/logo256x256.png",
    "static/IMG/logo/logo512x512.png",
    "static/IMG/logo/logo1024x1024.png",
    "static/IMG/logo/logo2584x2584.png",
    "static/IMG/favicons/android-chrome-192x192.png",
    "static/IMG/favicons/android-chrome-512x512.png",
    "static/IMG/favicons/apple-touch-icon.png",
    "static/IMG/favicons/favicon.ico",
    "static/IMG/favicons/favicon-16x16.png",
    "static/IMG/favicons/favicon-32x32.png",
    "static/IMG/favicons/mstile-150x150.png",
    "static/IMG/favicons/safari-pinned-tab.svg",
    "static/IMG/bg.png",
];
/* Start the service worker and cache all of the app's content */
self.addEventListener("install", function (e) {
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(filesToCache);
        })
    );
});

/* Serve cached content when offline */
self.addEventListener("fetch", function (e) {
    e.respondWith(
        caches.match(e.request).then(function (response) {
            return response || fetch(e.request);
        })
    );
});
