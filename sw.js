// sw.js - Service Worker المطور لتطبيق سَكينة (الكاش + إشعارات FCM الذكية)
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

var CACHE_NAME = "sakina-cache-v4";

// --- 1. تهيئة الفايربيس بمفاتيح مشروعك الرسمية ---
firebase.initializeApp({
  apiKey: "AIzaSy...",
  authDomain: "sakina-app-995bd.firebaseapp.com",
  projectId: "sakina-app-995bd",
  storageBucket: "sakina-app-995bd.appspot.com",
  messagingSenderId: "305141234237",
  appId: "1:305141234237:web:8c439fa349d4becc98b2c6"
});

const messaging = firebase.messaging();

// --- 2. إدارة الكاش والتثبيت ---
self.addEventListener("install", function (event) {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.add(self.registration.scope).catch(function () {});
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (key) {
          return key !== CACHE_NAME;
        }).map(function (key) {
          return caches.delete(key);
        })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener("fetch", function (event) {
  var reqUrl = event.request.url;

  if (event.request.method !== "GET") return;
  if (reqUrl.indexOf("mp3quran.net") !== -1 || reqUrl.indexOf(".mp3") !== -1) return;

  event.respondWith(
    caches.match(event.request).then(function (cachedResponse) {
      var networkFetch = fetch(event.request)
        .then(function (networkResponse) {
          if (networkResponse && networkResponse.status === 200) {
            var cloned = networkResponse.clone();
            caches.open(CACHE_NAME).then(function (cache) {
              cache.put(event.request, cloned).catch(function () {});
            });
          }
          return networkResponse;
        })
        .catch(function () {
          return cachedResponse;
        });

      return cachedResponse || networkFetch;
    })
  );
});

// --- 3. استقبال إشعارات FCM التفاعلية بالخلفية ---
messaging.onBackgroundMessage(function(payload) {
  console.log('[sw.js] FCM Payload:', payload);

  const title = payload.notification?.title || 'سَكينة 🕌';
  const options = {
    body: payload.notification?.body || 'لديك تنبيه جديد من تطبيق سكينة',
    icon: '/assets/icons/icon-192.png',
    badge: '/assets/icons/icon-192.png',
    vibrate: [200, 100, 200, 100, 200],
    data: {
      url: payload.data?.url || '/'
    },
    actions: [
      { action: 'open_app', title: 'فتح التطبيق 📖' },
      { action: 'close', title: 'تجاهل ✖' }
    ]
  };

  self.registration.showNotification(title, options);
});

// --- 4. التحكم والتوجيه عند الضغط على الإشعار ---
self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  if (event.action === 'close') return;

  const targetUrl = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(windowClients) {
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        if (client.url.indexOf(targetUrl) !== -1 && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
