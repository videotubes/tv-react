const CACHE_NAME = 'tvideos-pwa-cache-v1';
const toCache = [
	'/',
	'/manifest.json',
];

self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(CACHE_NAME)
		.then(function(cache) {
			return cache.addAll(toCache)
		})
		.then(function () {
			return self.skipWaiting();
		})
	)
})

self.addEventListener('fetch', function (event) {
	if (event.request.url.startsWith('/api/')) {
		return; // Bypass API requests
	}
	else {
		return new Response('Offline content not available.', { status: 404, statusText: 'Not Found' });
	}
});

self.addEventListener('activate', function(event) {
	event.waitUntil(
		caches.keys()
		.then((keyList) => {
			return Promise.all(keyList.map((key) => {
				if (key !== CACHE_NAME) {
					console.log('[ServiceWorker] Delete old cache', key)
					return caches.delete(key)
				}
			}))
		})
		.then(() => self.clients.claim())
	)
})

/* self.addEventListener('fetch', function (event) {
	if(typeof window !== 'undefined') {
		if(window.matchMedia('(display-mode: standalone)').matches || navigator.standalone) {
			if(event.request.method !== 'GET') {
				event.respondWith(
					fetch(event.request)
					.catch(() => {
						return new Response('Non-GET request cannot be cached offline.');
					})
				);
			}
			else if(event.request.url.includes('/api/')) {
				return fetch(event.request);
			}
			else {
				event.respondWith(
					fetch(event.request)
					.catch(() => {
						return caches.open(CACHE_NAME)
						.then((cache) => {
							return cache.match(event.request) || new Response('Offline content not available.');
						});
					})
				);
			}
		}
		else {
			return;
		}
	}
});

self.addEventListener('activate', function(event) {
	event.waitUntil(
		caches.keys()
		.then((keyList) => {
			return Promise.all(keyList.map((key) => {
				if(key !== CACHE_NAME) {
					console.log('[ServiceWorker] Delete old cache', key)
					return caches.delete(key)
				}
			}))
		})
		.then(() => self.clients.claim())
	)
}) */
