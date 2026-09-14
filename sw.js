// ============================================================
// Service Worker لتطبيق سَكينة
// هذا الملف يجب أن يكون بجانب ملف index.html (sakina-habits-5.html)
// في نفس المجلد تماماً على الاستضافة، ويجب أن تكون الاستضافة HTTPS
// (أو localhost أثناء التطوير)، وإلا فلن يُسجَّل ولن يظهر خيار
// "تثبيت التطبيق" في متصفح Chrome.
// ============================================================

var CACHE_NAME = "sakina-cache-v5";

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

// ============================================================
// Web Push Notifications
// ============================================================
//
// ملاحظة صادقة عن حدود هذا التنفيذ: حدث "push" أدناه يُطلَق فقط عند
// وصول رسالة Push فعلية من خادم Push Service (عبر بروتوكول Web Push
// الحقيقي المرتبط بمفتاح VAPID وGoogle FCM/Mozilla Push). هذا المشروع
// لا يتضمن خادماً خلفياً يرسل هذه الرسائل، لذا حدث "push" لن يُستدعى
// تلقائياً من تلقاء نفسه لتنبيهات الصلاة/الأذكار المجدولة محلياً —
// تلك تُعرض عبر self.registration.showNotification() المُستدعاة مباشرة
// من app.js (رسالة "show-notification" بالأسفل)، وهو ما يعمل بالفعل
// من داخل الصفحة/الخلفية طالما المتصفح يبقي الصفحة أو الـ Service
// Worker حياً. حدث "push" مُنفَّذ هنا بشكل كامل وصحيح تقنياً بحيث
// يعمل فوراً إن أُضيف خادم Push حقيقي لاحقاً (باستخدام web-push
// و مفاتيح VAPID)، دون أي تعديل إضافي مطلوب على هذا الملف.

self.addEventListener("push", function(event){
  var payload = { title: "سَكينة", body: "لديك تنبيه جديد", tag: "sakina-push" };
  if(event.data){
    try{
      var parsed = event.data.json();
      payload = Object.assign(payload, parsed);
    }catch(e){
      payload.body = event.data.text() || payload.body;
    }
  }

  var options = {
    body: payload.body,
    tag: payload.tag,
    icon: "icons/icon-192.jpg",
    badge: "icons/icon-192.jpg",
    vibrate: payload.vibrate || [200, 100, 200],
    data: { url: payload.url || self.registration.scope },
    renotify: true,
    requireInteraction: false
  };

  event.waitUntil(self.registration.showNotification(payload.title, options));
});

self.addEventListener("notificationclick", function(event){
  event.notification.close();
  var targetUrl = (event.notification.data && event.notification.data.url) || self.registration.scope;

  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(function(clientList){
      for(var i = 0; i < clientList.length; i++){
        var client = clientList[i];
        if(client.url.indexOf(self.registration.scope) === 0 && "focus" in client){
          return client.focus();
        }
      }
      if(self.clients.openWindow){
        return self.clients.openWindow(targetUrl);
      }
    })
  );
});

// يستقبل أوامر إظهار إشعار محلي فوري من app.js (وليس من خادم Push خارجي) —
// هذا هو المسار الفعلي المستخدم لتنبيهات الصلاة والأذكار المجدولة محلياً،
// لأنه يعمل عبر Service Worker حتى عندما تكون الصفحة نفسها مُصغّرة أو في الخلفية
self.addEventListener("message", function(event){
  if(!event.data || event.data.type !== "show-notification") return;

  var detail = event.data.payload || {};
  var options = {
    body: detail.body || "",
    tag: detail.tag || "sakina-local",
    icon: "icons/icon-192.jpg",
    badge: "icons/icon-192.jpg",
    vibrate: detail.vibrate || [200, 100, 200],
    data: { url: detail.url || self.registration.scope },
    renotify: true,
    requireInteraction: false
  };

  event.waitUntil(self.registration.showNotification(detail.title || "سَكينة", options));
});
