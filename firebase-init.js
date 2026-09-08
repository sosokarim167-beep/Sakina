// firebase-init.js
// وحدة تهيئة Firebase (ES Modules عبر CDN — Firebase v10 المعياري).
// يُحمَّل بـ <script type="module"> في index.html، وهو منفصل عن app.js
// (سكربت عادي) لأن import/export لا تعمل إلا داخل type="module".
// يعرض هذا الملف واجهة window.SakinaCloud التي يستدعيها app.js مباشرة
// دون أن يحتاج app.js نفسه إلى معرفة تفاصيل Firebase الداخلية.

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  runTransaction,
  serverTimestamp,
  enableIndexedDbPersistence
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

// ⚠️ استبدل هذه القيم بإعدادات مشروعك الفعلي من Firebase Console
// (Project settings → General → Your apps → SDK setup and configuration).
// هذه قيم توضيحية فقط ولن تعمل كما هي.
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

var firebaseApp = null;
var auth = null;
var db = null;
var currentUser = null;
var isOnline = navigator.onLine;
var authReadyResolvers = [];

function whenAuthReady(){
  return new Promise(function(resolve){
    if(currentUser){ resolve(currentUser); return; }
    authReadyResolvers.push(resolve);
  });
}

try{
  firebaseApp = initializeApp(firebaseConfig);
  auth = getAuth(firebaseApp);
  db = getFirestore(firebaseApp);

  // يسمح لـ Firestore بالعمل والقراءة من كاش محلي عندما يكون الجهاز أوفلاين —
  // طبقة إضافية إلى جانب localStorage الخاص بالتطبيق نفسه
  enableIndexedDbPersistence(db).catch(function(){
    // يفشل بصمت إن كانت هناك عدة تبويبات مفتوحة أو المتصفح لا يدعمها؛
    // localStorage يبقى خط الدفاع الأساسي في هذه الحالة
  });

  onAuthStateChanged(auth, function(user){
    currentUser = user;
    if(user){
      authReadyResolvers.forEach(function(resolve){ resolve(user); });
      authReadyResolvers = [];
    }
    window.dispatchEvent(new CustomEvent("sakina-auth-changed", { detail: { uid: user ? user.uid : null } }));
  });

  // تسجيل دخول مجهول تلقائي عند أول تحميل — يكفي لربط بيانات المستخدم
  // بمعرّف ثابت دون الحاجة لإنشاء حساب
  signInAnonymously(auth).catch(function(err){
    console.warn("Sakina: تعذر تسجيل الدخول المجهول إلى Firebase", err);
  });
}catch(err){
  console.warn("Sakina: تعذرت تهيئة Firebase — سيعمل التطبيق بوضع أوفلاين فقط (localStorage)", err);
}

window.addEventListener("online", function(){ isOnline = true; });
window.addEventListener("offline", function(){ isOnline = false; });

/* ============ تسجيل الدخول بحساب Google (اختياري، لربط بيانات المستخدم عبر أجهزته) ============ */

function signInWithGoogle(){
  if(!auth) return Promise.reject(new Error("Firebase غير مهيأ"));
  var provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}

/* ============ مزامنة العادات (Habits) ============ */

function syncHabitsToCloud(habitsArray){
  if(!db || !isOnline) return Promise.resolve(false);
  return whenAuthReady().then(function(user){
    var ref = doc(db, "users", user.uid, "sakina_data", "habits");
    return setDoc(ref, {
      habits: habitsArray,
      updatedAt: serverTimestamp()
    }).then(function(){ return true; }).catch(function(err){
      console.warn("Sakina: فشلت مزامنة العادات مع السحابة", err);
      return false;
    });
  });
}

function fetchHabitsFromCloud(){
  if(!db) return Promise.resolve(null);
  return whenAuthReady().then(function(user){
    var ref = doc(db, "users", user.uid, "sakina_data", "habits");
    return getDoc(ref).then(function(snap){
      if(snap.exists() && Array.isArray(snap.data().habits)){
        return snap.data().habits;
      }
      return null;
    }).catch(function(err){
      console.warn("Sakina: فشل جلب العادات من السحابة", err);
      return null;
    });
  });
}

/* ============ مزامنة تقدّم قراءة القرآن (سورة + آية + صفحة) ============ */

function syncQuranProgressToCloud(progress){
  if(!db || !isOnline) return Promise.resolve(false);
  return whenAuthReady().then(function(user){
    var ref = doc(db, "users", user.uid, "sakina_data", "quran_progress");
    return setDoc(ref, {
      surah: progress.surah,
      ayah: progress.ayah,
      page: progress.page,
      scrollTop: progress.scrollTop || 0,
      updatedAt: serverTimestamp()
    }).then(function(){ return true; }).catch(function(err){
      console.warn("Sakina: فشلت مزامنة تقدّم القراءة مع السحابة", err);
      return false;
    });
  });
}

function fetchQuranProgressFromCloud(){
  if(!db) return Promise.resolve(null);
  return whenAuthReady().then(function(user){
    var ref = doc(db, "users", user.uid, "sakina_data", "quran_progress");
    return getDoc(ref).then(function(snap){
      if(snap.exists()){
        var data = snap.data();
        if(typeof data.surah === "number"){
          return { surah: data.surah, ayah: data.ayah || 1, page: data.page || 1, scrollTop: data.scrollTop || 0 };
        }
      }
      return null;
    }).catch(function(err){
      console.warn("Sakina: فشل جلب تقدّم القراءة من السحابة", err);
      return null;
    });
  });
}

/* ============ عدّاد العمرة المجانية العالمي (Real-time، عبر جميع المستخدمين) ============ */
//
// ⚠️ ملاحظة أمنية مهمة: هذا عدّاد كتابة عام على وثيقة مشتركة واحدة.
// أي عدّاد كهذا يمكن أن يُستغل بسكربتات آلية ترفع الرقم بشكل مزيف ما لم
// تُقيَّد الكتابة بقواعد أمان صارمة على مستوى Firestore Security Rules:
//   - اشترط request.auth != null (يمنع الكتابة من مستخدمين غير مسجّلين حتى ولو بشكل مجهول)
//   - قيّد الزيادة بحد أقصى +1 لكل عملية كتابة عبر request.resource.data.count == resource.data.count + 1
//   - فعّل App Check لمنع الطلبات من خارج تطبيقك الفعلي
// الكود هنا يفترض تسجيل دخول مجهول ناجح فقط، وهذا غير كافٍ وحده للحماية —
// راجع قواعد الأمان في Firebase Console قبل النشر الفعلي.

var UMRAH_COUNTER_DOC = "global_stats/free_umrah_counter";

function incrementGlobalUmrahCounter(){
  if(!db) return Promise.resolve(false);
  return whenAuthReady().then(function(){
    var ref = doc(db, "global_stats", "free_umrah_counter");
    return runTransaction(db, function(transaction){
      return transaction.get(ref).then(function(snap){
        var current = snap.exists() ? (snap.data().count || 0) : 0;
        transaction.set(ref, { count: current + 1, updatedAt: serverTimestamp() });
        return current + 1;
      });
    }).catch(function(err){
      console.warn("Sakina: فشلت زيادة عدّاد العمرة العالمي", err);
      return false;
    });
  });
}

function listenToGlobalUmrahCounter(onUpdate){
  if(!db){ onUpdate(null); return function(){}; }
  var ref = doc(db, "global_stats", "free_umrah_counter");
  var unsubscribe = onSnapshot(ref, function(snap){
    var count = snap.exists() ? (snap.data().count || 0) : 0;
    onUpdate(count);
  }, function(err){
    console.warn("Sakina: تعذر الاستماع لعدّاد العمرة العالمي", err);
    onUpdate(null);
  });
  return unsubscribe;
}

/* ============ الواجهة المُصدَّرة إلى app.js ============ */

window.SakinaCloud = {
  signInWithGoogle: signInWithGoogle,
  isReady: function(){ return !!db; },
  isOnline: function(){ return isOnline; },
  getCurrentUser: function(){ return currentUser; },
  syncHabits: syncHabitsToCloud,
  fetchHabits: fetchHabitsFromCloud,
  syncQuranProgress: syncQuranProgressToCloud,
  fetchQuranProgress: fetchQuranProgressFromCloud,
  incrementUmrahCounter: incrementGlobalUmrahCounter,
  listenToUmrahCounter: listenToGlobalUmrahCounter
};
