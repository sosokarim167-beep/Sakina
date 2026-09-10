// notifications.js - نظام جدولة الإشعارات والربط مع FCM
const SakinaNotifications = {
  
  // 1. طلب الإذن وحفظ FCM Token للمستخدم
  async initFCM(vapidKey, userId = null) {
    if (!('Notification' in window)) {
      console.warn('المتصفح لا يدعم الإشعارات');
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('تم منح إذن الإشعارات');
        
        if (window.SakinaCloud) {
          const token = await window.SakinaCloud.requestNotificationPermission(vapidKey);
          if (token && userId) {
            await window.SakinaCloud.saveFcmToken(userId, token);
          }
        }
      }
    } catch (error) {
      console.error('خطأ إذن الإشعارات:', error);
    }
  },

  // 2. إشعارات محلية تلقائية (مثل مواقيت الأذان والأذكار)
  scheduleLocalNotification(title, body, delayInSeconds, targetUrl = '/') {
    if (Notification.permission !== 'granted') return;

    setTimeout(() => {
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.ready.then((registration) => {
          registration.showNotification(title, {
            body: body,
            icon: '/assets/icons/icon-192.png',
            badge: '/assets/icons/icon-192.png',
            vibrate: [200, 100, 200],
            data: { url: targetUrl }
          });
        });
      }
    }, delayInSeconds * 1000);
  },

  // 3. تذكير الورد اليومي التفاعلي
  scheduleDailyQuranReminder(targetHour = 20) {
    const now = new Date();
    let scheduledTime = new Date();
    scheduledTime.setHours(targetHour, 0, 0, 0);

    if (now > scheduledTime) {
      scheduledTime.setDate(scheduledTime.getDate() + 1);
    }

    const timeUntilReminder = (scheduledTime.getTime() - now.getTime()) / 1000;
    
    this.scheduleLocalNotification(
      'ورد القرآن اليومي 📖',
      'لم تقرأ وردك اليوم بعد، لا تجعل يومك يمر بدون آيات سكينة.',
      timeUntilReminder,
      '/#quran'
    );
  }
};

window.SakinaNotifications = SakinaNotifications;
