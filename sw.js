/**
 * Service Worker for Take Care Of My Cats PWA
 * Cache-first strategy for offline functionality
 */

const CACHE_NAME = 'takecareofmycats-v1.2.0';

const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/css/styles.min.css',
    '/js/main.min.js',
    '/manifest.json',
    // Cat photos
    '/images/leona.jpg',
    '/images/lenny.jpg',
    '/images/willie.jpg',
    // Food images
    '/images/calmingchews.jpg',
    '/images/dryfood.jpg',
    '/images/wetfood.jpg',
    // PWA icons
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png'
];

// Install event - precache assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Caching app assets');
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .then(() => {
                // Skip waiting to activate immediately
                return self.skipWaiting();
            })
    );
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((name) => name !== CACHE_NAME)
                        .map((name) => {
                            console.log('Deleting old cache:', name);
                            return caches.delete(name);
                        })
                );
            })
            .then(() => {
                // Claim all clients immediately
                return self.clients.claim();
            })
    );
});

// Fetch event - cache-first strategy
self.addEventListener('fetch', (event) => {
    // Only handle GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    // Return cached version
                    return cachedResponse;
                }

                // Not in cache, fetch from network
                return fetch(event.request)
                    .then((networkResponse) => {
                        // Don't cache non-successful responses
                        if (!networkResponse || networkResponse.status !== 200) {
                            return networkResponse;
                        }

                        // Clone response for caching
                        const responseToCache = networkResponse.clone();

                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });

                        return networkResponse;
                    })
                    .catch(() => {
                        // Network failed and not in cache
                        // Return offline fallback for HTML requests
                        if (event.request.headers.get('accept').includes('text/html')) {
                            return caches.match('/index.html');
                        }
                    });
            })
    );
});
