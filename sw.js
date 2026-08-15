// ============================================================
// Service Worker لتطبيق سَكينة
// هذا الملف يجب أن يكون بجانب ملف index.html (sakina-habits-5.html)
// في نفس المجلد تماماً على الاستضافة، ويجب أن تكون الاستضافة HTTPS
// (أو localhost أثناء التطوير)، وإلا فلن يُسجَّل ولن يظهر خيار
// "تثبيت التطبيق" في متصفح Chrome.
// ============================================================

var CACHE_NAME = "sakina-cache-v2";

// عند التثبيت: تفعيل فوري بدون انتظار إغلاق كل التبويبات القديمة
self.addEventListener("install", function (event) {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      // تخزين الصفحة الرئيسية مبدئياً في الكاش لدعم العمل دون اتصال
      return cache.add(self.registration.scope).catch(function () {});
    })
  );
});

// عند التفعيل: التحكم بجميع الصفحات المفتوحة فوراً، وحذف أي كاش قديم
self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches
      .keys()
      .then(function (keys) {
        return Promise.all(
          keys
            .filter(function (key) {
              return key !== CACHE_NAME;
            })
            .map(function (key) {
              return caches.delete(key);
            })
        );
      })
      .then(function () {
        return self.clients.claim();
      })
  );
});

// عند كل طلب: استراتيجية "الشبكة أولاً ثم الكاش" مع تحديث الكاش تلقائياً
// (باستثناء ملفات الصوت الخارجية وطلبات غير GET)
self.addEventListener("fetch", function (event) {
  var reqUrl = event.request.url;

  if (event.request.method !== "GET") {
    return;
  }
  if (reqUrl.indexOf("mp3quran.net") !== -1 || reqUrl.indexOf(".mp3") !== -1) {
    return;
  }

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
