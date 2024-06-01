importScripts('/workbox-sw.js');

if (workbox) {
    console.log(`WB IS OK`);

    workbox.setConfig({ debug: true });
    workbox.core.setCacheNameDetails({
        prefix: 'WB-SW',
        suffix: 'v1'
    });

    const cachelist = [
        'WB-SW-precache-v1',
        'WB-SW-image-cache',
        'offline-cache'
    ]; // لیستی از کش‌هایی که باید حفظ شوند

    self.addEventListener('install', (event) => {
        const offlinePage = '/offline.html';
        event.waitUntil(
            caches.open('offline-cache').then((cache) => cache.add(offlinePage))
        );
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

    self.addEventListener('activate', event => {
        event.waitUntil(
            caches.keys().then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (!cachelist.includes(cacheName)) {
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
        );
    });

    self.addEventListener('fetch', event => {
        if (event.request.mode === 'navigate') {
            let req = event.request
            event.respondWith(
                fetch(req).catch(() => caches.match('/offline.html'))
            );
        }
    });
} else {
    console.log("WB ERROR");
}
