window.onload = () => {
    "use strict";

    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("sw.js").then(
            function (registration) {
                // Service worker registered correctly.
                console.log("NotMiss: ServiceWorker registration successful with scope: ", registration.scope);
            },
            function (err) {
                // Troubles in registering the service worker. :(
                console.log("NotMiss: ServiceWorker registration failed: ", err);
            }
        );
    }
};
