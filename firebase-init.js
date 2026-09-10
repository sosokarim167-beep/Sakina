// firebase-init.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging.js";
import { getAnalytics, logEvent } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";

// إعدادات مشروع فايربيس المربوطة بحسابك مباشرة
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "sakina-app-995bd.firebaseapp.com",
  projectId: "sakina-app-995bd",
  storageBucket: "sakina-app-995bd.appspot.com",
  messagingSenderId: "305141234237",
  appId: "1:305141234237:web:8c439fa349d4becc98b2c6"
};

// تهيئة الخدمات
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const messaging = typeof window !== 'undefined' && 'serviceWorker' in navigator ? getMessaging(app) : null;
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

// واجهة التحكم SakinaCloud
window.SakinaCloud = {
  // --- 1. التحليلات (Analytics) ---
  logActivity(eventName, params = {}) {
    if (analytics) {
      logEvent(analytics, eventName, params);
      console.log(`[Analytics Event]: ${eventName}`, params);
    }
  },

  // --- 2. الإشعارات والتذكيرات (Messaging & FCM) ---
  async requestNotificationPermission(vapidKey) {
    if (!messaging) return null;
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        const token = await getToken(messaging, { vapidKey: vapidKey });
        console.log('[FCM Token]:', token);
        this.logActivity('notifications_enabled');
        return token;
      } else {
        console.warn('تم رفض صلاحية الإشعارات');
        return null;
      }
    } catch (error) {
      console.error('خطأ في جلب مفتاح FCM:', error);
      return null;
    }
  },

  async saveFcmToken(userId, token) {
    if (!userId || !token) return;
    const ref = doc(db, `users/${userId}/sakina_data/fcm_tokens`);
    await setDoc(ref, {
      fcmToken: token,
      lastUpdated: new Date().toISOString()
    }, { merge: true });
    console.log('[FCM Token Saved to Firestore]');
  },

  listenForForegroundMessages(callback) {
    if (!messaging) return;
    onMessage(messaging, (payload) => {
      console.log('إشعار واصل أثناء فتح التطبيق:', payload);
      if (callback) callback(payload);
    });
  },

  // --- 3. إدارة الحسابات (Auth) ---
  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      this.logActivity('login', { method: 'Google' });
      return result.user;
    } catch (error) {
      console.error('خطأ في تسجيل الدخول:', error);
      throw error;
    }
  },

  async logout() {
    await signOut(auth);
    this.logActivity('logout');
  },

  onUserChange(callback) {
    onAuthStateChanged(auth, callback);
  },

  // --- 4. مزامنة بيانات القرآن والعادات (Firestore) ---
  async saveQuranProgress(userId, pageNumber) {
    if (!userId) return;
    const ref = doc(db, `users/${userId}/sakina_data/quran_progress`);
    await setDoc(ref, {
      currentPage: pageNumber,
      updatedAt: new Date().toISOString()
    }, { merge: true });
    
    this.logActivity('quran_page_read', { page: pageNumber });
  },

  syncQuranProgress(userId, callback) {
    if (!userId) return null;
    const ref = doc(db, `users/${userId}/sakina_data/quran_progress`);
    return onSnapshot(ref, (docSnap) => {
      if (docSnap.exists()) {
        callback(docSnap.data());
      } else {
        callback(null);
      }
    });
  }
};
