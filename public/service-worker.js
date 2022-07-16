const APP_PREFIX = 'BudgetTracker-';
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION;
const DATA_CACHE_NAME = "data-cache-" + VERSION;

const cacheAssets = [
    "/",
    "index.html",
    "/css/styles.css",
    "/js/index.js",
    "/js/idb.js",
    "service-worker.js",
    "/icons/icon-72x72.png",
    "/icons/icon-96x96.png",
    "/icons/icon-128x128.png",
    "/icons/icon-144x144.png",
    "/icons/icon-152x152.png",
    "/icons/icon-192x192.png",
    "/icons/icon-384x384.png",
    "/icons/icon-512x512.png"
];

// cache resources
self.addEventListener('install', e => {
    console.log('Service Worker: Installed');

    e.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(cache => {
                console.log('Service Worker: Caching Files');
                return cache.addAll(cacheAssets);
            })
            .then(() => self.skipWaiting())
    )
});

// call activate event
self.addEventListener('activate', e => {
    console.log('Service Worker: Activated');

    // delete any unwanted caches
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('Service Worker: Clearing Old Cache');
                        return caches.delete(cache);
                    }
                })
            )
        })
    )
});

// respond with cached resources
// self.addEventListener('fetch', e => {
//     console.log('Service Worker Fetching : ' + e.request.url);

//     e.respondWith(
//         fetch(e.request).catch(() => caches.match(e.request))
//     )
// });

// something is wrong here
// the console.log is not appearing and we are hitting the else statement every time even though
// there are files stored in the cache
self.addEventListener('fetch', e => {
    console.log('Service Worker Fetching : ' + e.request.url);
    
    e.respondWith(
        caches.match(e.request).then(function (request) {
            if (request) { // if cache is available, respond with cache
                console.log('responding with cache : ' + e.request.url)
                return request
            } else {  // if there are no cache, try fetching request
                console.log('file is not cached, fetching : ' + e.request.url)
                return fetch(e.request)
            }

             // You can omit if/else for console.log & put one line below like this too.
             // return request || fetch(e.request)
        })
    )

    // if (e.request.url.includes("/api/")) {
    //     console.log()
    //     e.respondWith(
    //         caches
    //             .open(DATA_CACHE_NAME)
    //             .then(cache => { 
    //                 return fetch(e.request).then(response => {
    //                     if (response.status === 200) {
    //                         cache.put(e.request.url, response.clone())
    //                     }

    //                     return response;
    //                 }).catch(err => {
    //                     return cache.match(e.request)
    //                 })
    //             })
    //             .catch(err => console.log(err))
    //     )
    //     return
    // }
});
