importScripts('/workbox-sw.js');

if (workbox) {
    console.log(`WB IS OK`);

    workbox.setConfig({ debug: true });

    workbox.core.setCacheNameDetails({
        prefix: 'TEST-SW',
        suffix: 'v1'
    });


    self.addEventListener('install', (event) => {
        const offlinePage = '/offline.html';
        event.waitUntil(
            caches.open('offline-cache').then((cache) => cache.add(offlinePage))
        );
    });

    workbox.precaching.precacheAndRoute([]);

    self.addEventListener("message", event => {
        if (event.data && event.data.type === "SKIP_WAITING") {
            skipWaiting();
        }
    });

    workbox.routing.registerRoute(
        /\.(?:png|jpg|jpeg|svg|gif)$/,
        new workbox.strategies.CacheFirst({
            cacheName: 'image-cache',
            plugins: [
                new workbox.expiration.Plugin({
                    maxEntries: 25,
                    maxAgeSeconds: 7 * 24 * 60 * 60,
                })
            ],
        })
    );


    self.addEventListener('fetch', event => {
        if (event.request.mode === 'navigate') {
            event.respondWith(
                fetch(event.request).catch(() => caches.match('/offline.html'))
            );
        }
    });
} else {
    console.log("WB ERROR");
}
