// translations.js
// نظام الترجمة (i18n) لتطبيق سَكينة — عربي (افتراضي)، إنجليزي، فرنسي، إسباني.
// سكربت عادي (ليس module) يُحمَّل قبل app.js ويعرض واجهة window.SakinaI18n.
//
// طريقة الاستخدام في HTML: أضف data-i18n="KEY" على أي عنصر نصي،
// و data-i18n-placeholder="KEY" على أي input يحتاج ترجمة الـ placeholder.
// عند تبديل اللغة، applyTranslations() تمسح الصفحة كاملة وتُحدّث كل عنصر
// يحمل هذه الخصائص تلقائياً، وتُبدّل اتجاه الصفحة (RTL/LTR) والـ lang.

(function(){
  "use strict";

  var LANG_STORAGE_KEY = "sakina_lang_v1";

  var SUPPORTED_LANGS = ["ar", "en", "fr", "es"];

  var LANG_META = {
    ar: { dir: "rtl", label: "العربية", flag: "🇸🇦" },
    en: { dir: "ltr", label: "English", flag: "🇬🇧" },
    fr: { dir: "ltr", label: "Français", flag: "🇫🇷" },
    es: { dir: "ltr", label: "Español", flag: "🇪🇸" }
  };

  // قاموس الترجمة — يغطي عناصر الواجهة الأساسية والمشتركة عبر التطبيق.
  // أي مفتاح غير موجود في اللغة الحالية يرجع تلقائياً إلى النص العربي
  // كحل احتياطي آمن بدل ترك العنصر فارغاً.
  var DICTIONARY = {
    // ===== Navigation =====
    nav_home:        { ar: "الرئيسية",      en: "Home",        fr: "Accueil",        es: "Inicio" },
    nav_azkar:        { ar: "الأذكار",       en: "Adhkar",      fr: "Adhkar",         es: "Adhkar" },
    nav_quran:        { ar: "القرآن",        en: "Quran",       fr: "Coran",          es: "Corán" },
    nav_prayer:        { ar: "الصلاة",        en: "Prayer",      fr: "Prière",         es: "Oración" },
    nav_more:        { ar: "المزيد",        en: "More",        fr: "Plus",           es: "Más" },

    // ===== Habits / Home =====
    app_title:        { ar: "سَكينة",         en: "Sakina",      fr: "Sakina",         es: "Sakina" },
    habits_title:        { ar: "عاداتي اليومية",  en: "My Daily Habits", fr: "Mes habitudes quotidiennes", es: "Mis hábitos diarios" },
    add_habit:        { ar: "إضافة عادة",      en: "Add Habit",   fr: "Ajouter une habitude", es: "Añadir hábito" },
    streak_days:        { ar: "يوم متتالي",      en: "day streak",  fr: "jours consécutifs", es: "días seguidos" },

    // ===== Azkar =====
    morning_azkar:        { ar: "أذكار الصباح",   en: "Morning Adhkar", fr: "Adhkar du matin", es: "Adhkar de la mañana" },
    evening_azkar:        { ar: "أذكار المساء",    en: "Evening Adhkar", fr: "Adhkar du soir",  es: "Adhkar de la tarde" },
    sleep_azkar:        { ar: "أذكار النوم",     en: "Sleep Adhkar",  fr: "Adhkar du coucher", es: "Adhkar antes de dormir" },
    tasbih:        { ar: "المسبحة",        en: "Tasbih Counter", fr: "Compteur Tasbih", es: "Contador Tasbih" },
    reset:        { ar: "إعادة ضبط",      en: "Reset",       fr: "Réinitialiser",  es: "Reiniciar" },

    // ===== Prayer =====
    prayer_times:        { ar: "مواقيت الصلاة",   en: "Prayer Times",  fr: "Heures de prière", es: "Horarios de oración" },
    qibla_compass:        { ar: "بوصلة القبلة",    en: "Qibla Compass", fr: "Boussole Qibla",  es: "Brújula Qibla" },
    fajr:        { ar: "الفجر",         en: "Fajr",        fr: "Fajr",           es: "Fajr" },
    dhuhr:        { ar: "الظهر",         en: "Dhuhr",       fr: "Dhuhr",          es: "Dhuhr" },
    asr:        { ar: "العصر",         en: "Asr",         fr: "Asr",            es: "Asr" },
    maghrib:        { ar: "المغرب",        en: "Maghrib",     fr: "Maghrib",        es: "Magrib" },
    isha:        { ar: "العشاء",        en: "Isha",        fr: "Isha",           es: "Isha" },

    // ===== Quran Reader =====
    quran_reading:        { ar: "قراءة القرآن",    en: "Quran Reading", fr: "Lecture du Coran", es: "Lectura del Corán" },
    prev_page:        { ar: "السابقة",        en: "Previous",    fr: "Précédent",      es: "Anterior" },
    next_page:        { ar: "التالية",        en: "Next",        fr: "Suivant",        es: "Siguiente" },
    page_of:        { ar: "صفحة",         en: "Page",        fr: "Page",           es: "Página" },
    goto_page:        { ar: "الذهاب إلى صفحة",  en: "Go to page",  fr: "Aller à la page", es: "Ir a la página" },

    // ===== Settings =====
    settings:        { ar: "الإعدادات",      en: "Settings",    fr: "Paramètres",     es: "Ajustes" },
    language:        { ar: "اللغة",         en: "Language",    fr: "Langue",         es: "Idioma" },
    notifications:        { ar: "الإشعارات",      en: "Notifications", fr: "Notifications", es: "Notificaciones" },
    enable_azan:        { ar: "تفعيل الأذان",    en: "Enable Athan", fr: "Activer l'Adhan", es: "Activar el Adhan" },
    unlock_audio:        { ar: "تفعيل الصوت",     en: "Enable Audio", fr: "Activer l'audio", es: "Activar el audio" }
  };

  var currentLang = "ar";

  function loadSavedLang(){
    try{
      var saved = localStorage.getItem(LANG_STORAGE_KEY);
      if(saved && SUPPORTED_LANGS.indexOf(saved) !== -1) return saved;
    }catch(e){}
    // إن لم توجد لغة محفوظة، نحاول استنتاجها من لغة المتصفح كنقطة بداية معقولة
    var browserLang = (navigator.language || "ar").slice(0, 2).toLowerCase();
    return SUPPORTED_LANGS.indexOf(browserLang) !== -1 ? browserLang : "ar";
  }

  function saveLang(lang){
    try{ localStorage.setItem(LANG_STORAGE_KEY, lang); }catch(e){}
  }

  function t(key){
    var entry = DICTIONARY[key];
    if(!entry) return key; // مفتاح غير معروف: نعرضه كما هو بدل كسر الواجهة
    return entry[currentLang] || entry.ar || key;
  }

  function applyTranslations(){
    document.documentElement.setAttribute("lang", currentLang);
    document.documentElement.setAttribute("dir", LANG_META[currentLang].dir);
    document.body.classList.toggle("lang-rtl", LANG_META[currentLang].dir === "rtl");
    document.body.classList.toggle("lang-ltr", LANG_META[currentLang].dir === "ltr");

    document.querySelectorAll("[data-i18n]").forEach(function(el){
      var key = el.getAttribute("data-i18n");
      el.textContent = t(key);
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(function(el){
      var key = el.getAttribute("data-i18n-placeholder");
      el.setAttribute("placeholder", t(key));
    });

    document.querySelectorAll("[data-i18n-aria-label]").forEach(function(el){
      var key = el.getAttribute("data-i18n-aria-label");
      el.setAttribute("aria-label", t(key));
    });

    window.dispatchEvent(new CustomEvent("sakina-lang-changed", { detail: { lang: currentLang } }));
  }

  function setLanguage(lang){
    if(SUPPORTED_LANGS.indexOf(lang) === -1) return;
    currentLang = lang;
    saveLang(lang);
    applyTranslations();
  }

  currentLang = loadSavedLang();

  // يُطبَّق فوراً عند تحميل هذا الملف (قبل رسم أي محتوى ديناميكي من app.js)
  // لتفادي "وميض" اللغة أو الاتجاه الافتراضي قبل التبديل
  document.addEventListener("DOMContentLoaded", applyTranslations);

  window.SakinaI18n = {
    t: t,
    setLanguage: setLanguage,
    getLanguage: function(){ return currentLang; },
    getSupportedLanguages: function(){ return SUPPORTED_LANGS.slice(); },
    getLangMeta: function(lang){ return LANG_META[lang]; },
    applyTranslations: applyTranslations
  };
})();
