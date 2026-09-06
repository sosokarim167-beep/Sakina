(function(){
  "use strict";

  var HABITS_KEY = "sakina_habits_v1";
  var AZKAR_KEY = "sakina_azkar_v1";
  var TASBIH_KEY = "sakina_tasbih_v1";
  var PRAYER_KEY = "sakina_prayer_settings_v1";
  var RECITER_KEY = "sakina_quran_reciter_v1";
  var VIBRATION_KEY = "sakina_vibration_v1";

  var ICONS = ["🕌","📖","🤲","💧","🌙","📿","🧎","✨","🚭","💪","🕋","☀️","🌿","🧘","🍽️","🛌","💬","📝"];
  var selectedIcon = ICONS[0];

  var TASBIH_LABELS = ["سُبْحَانَ اللَّه", "الْحَمْدُ لِلَّه", "اللَّهُ أَكْبَر", "أَسْتَغْفِرُ اللَّه", "لَا إِلَهَ إِلَّا اللَّه"];

  var AZKAR_DATA = {
    morning: {
      title: "أذكار الصباح",
      items: [
        { id: "m1", text: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ", target: 1 },
        { id: "m2", text: "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ", target: 1 },
        { id: "m3", text: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ", target: 1 },
        { id: "m4", text: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ", target: 100 },
        { id: "m5", text: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ", target: 10 },
        { id: "m6", text: "أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ", target: 100 },
        { id: "m7", text: "اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي وَبَصَرِي", target: 3 }
      ]
    },
    evening: {
      title: "أذكار المساء",
      items: [
        { id: "e1", text: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ", target: 1 },
        { id: "e2", text: "اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ", target: 1 },
        { id: "e3", text: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ", target: 100 },
        { id: "e4", text: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ", target: 10 },
        { id: "e5", text: "أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ", target: 100 },
        { id: "e6", text: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ", target: 3 }
      ]
    },
    sleep: {
      title: "أذكار النوم",
      items: [
        { id: "s1", text: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا", target: 1 },
        { id: "s2", text: "سُبْحَانَ اللَّه", target: 33 },
        { id: "s3", text: "الْحَمْدُ لِلَّه", target: 33 },
        { id: "s4", text: "اللَّهُ أَكْبَر", target: 34 },
        { id: "s5", text: "اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ", target: 3 },
        { id: "s6", text: "آيَةُ الْكُرْسِيِّ", target: 1 }
      ]
    }
  };

  var CITIES = [
    { key:"baghdad", name:"بغداد", country:"العراق", lat:33.3152, lng:44.3661, tz:3 },
    { key:"basra", name:"البصرة", country:"العراق", lat:30.5085, lng:47.7835, tz:3 },
    { key:"mosul", name:"الموصل", country:"العراق", lat:36.3489, lng:43.1189, tz:3 },
    { key:"erbil", name:"أربيل", country:"العراق", lat:36.1911, lng:44.0092, tz:3 },
    { key:"najaf", name:"النجف", country:"العراق", lat:31.9986, lng:44.3346, tz:3 },
    { key:"karbala", name:"كربلاء", country:"العراق", lat:32.6160, lng:44.0249, tz:3 },
    { key:"sulaymaniyah", name:"السليمانية", country:"العراق", lat:35.5647, lng:45.4164, tz:3 },
    { key:"kirkuk", name:"كركوك", country:"العراق", lat:35.4681, lng:44.3922, tz:3 },
    { key:"nasiriyah", name:"الناصرية", country:"العراق", lat:31.0587, lng:46.2591, tz:3 },
    { key:"ramadi", name:"الرمادي", country:"العراق", lat:33.4222, lng:43.3062, tz:3 },
    { key:"fallujah", name:"الفلوجة", country:"العراق", lat:33.3489, lng:43.7867, tz:3 },
    { key:"diwaniyah", name:"الديوانية", country:"العراق", lat:31.9890, lng:44.9250, tz:3 },
    { key:"amarah", name:"العمارة", country:"العراق", lat:31.8356, lng:47.1443, tz:3 },
    { key:"duhok", name:"دهوك", country:"العراق", lat:36.8617, lng:42.9989, tz:3 },
    { key:"tikrit", name:"تكريت", country:"العراق", lat:34.6089, lng:43.6776, tz:3 },
    { key:"kut", name:"الكوت", country:"العراق", lat:32.5122, lng:45.8188, tz:3 },
    { key:"mecca", name:"مكة المكرمة", country:"السعودية", lat:21.4225, lng:39.8262, tz:3 },
    { key:"medina", name:"المدينة المنورة", country:"السعودية", lat:24.5247, lng:39.5692, tz:3 },
    { key:"riyadh", name:"الرياض", country:"السعودية", lat:24.7136, lng:46.6753, tz:3 },
    { key:"jeddah", name:"جدة", country:"السعودية", lat:21.4858, lng:39.1925, tz:3 },
    { key:"cairo", name:"القاهرة", country:"مصر", lat:30.0444, lng:31.2357, tz:2 },
    { key:"alexandria", name:"الإسكندرية", country:"مصر", lat:31.2001, lng:29.9187, tz:2 },
    { key:"istanbul", name:"إسطنبول", country:"تركيا", lat:41.0082, lng:28.9784, tz:3 },
    { key:"amman", name:"عمّان", country:"الأردن", lat:31.9454, lng:35.9284, tz:3 },
    { key:"beirut", name:"بيروت", country:"لبنان", lat:33.8938, lng:35.5018, tz:2 },
    { key:"damascus", name:"دمشق", country:"سوريا", lat:33.5138, lng:36.2765, tz:3 },
    { key:"doha", name:"الدوحة", country:"قطر", lat:25.2854, lng:51.5310, tz:3 },
    { key:"dubai", name:"دبي", country:"الإمارات", lat:25.2048, lng:55.2708, tz:4 },
    { key:"abudhabi", name:"أبوظبي", country:"الإمارات", lat:24.4539, lng:54.3773, tz:4 },
    { key:"kuwait", name:"الكويت", country:"الكويت", lat:29.3759, lng:47.9774, tz:3 },
    { key:"manama", name:"المنامة", country:"البحرين", lat:26.2285, lng:50.5860, tz:3 },
    { key:"muscat", name:"مسقط", country:"عُمان", lat:23.5880, lng:58.3829, tz:4 },
    { key:"karachi", name:"كراتشي", country:"باكستان", lat:24.8607, lng:67.0011, tz:5 },
    { key:"jakarta", name:"جاكرتا", country:"إندونيسيا", lat:-6.2088, lng:106.8456, tz:7 },
    { key:"kualalumpur", name:"كوالالمبور", country:"ماليزيا", lat:3.1390, lng:101.6869, tz:8 },
    { key:"london", name:"لندن", country:"بريطانيا", lat:51.5074, lng:-0.1278, tz:0 },
    { key:"newyork", name:"نيويورك", country:"أمريكا", lat:40.7128, lng:-74.0060, tz:-5 }
  ];

  var CALC_METHODS = {
    mwl: { key:"mwl", name: "رابطة العالم الإسلامي", fajr: 18, isha: 17 },
    isna: { key:"isna", name: "أمريكا الشمالية", fajr: 15, isha: 15 },
    egypt: { key:"egypt", name: "الهيئة المصرية", fajr: 19.5, isha: 17.5 },
    makkah: { key:"makkah", name: "أم القرى", fajr: 18.5, ishaInterval: 90 },
    karachi: { key:"karachi", name: "جامعة كراتشي", fajr: 18, isha: 18 }
  };

  var SURAHS = [
    [1,"الفاتحة",7,"مكية"],[2,"البقرة",286,"مدنية"],[3,"آل عمران",200,"مدنية"],[4,"النساء",176,"مدنية"],
    [5,"المائدة",120,"مدنية"],[6,"الأنعام",165,"مكية"],[7,"الأعراف",206,"مكية"],[8,"الأنفال",75,"مدنية"],
    [9,"التوبة",129,"مدنية"],[10,"يونس",109,"مكية"],[11,"هود",123,"مكية"],[12,"يوسف",111,"مكية"],
    [13,"الرعد",43,"مدنية"],[14,"إبراهيم",52,"مكية"],[15,"الحجر",99,"مكية"],[16,"النحل",128,"مكية"],
    [17,"الإسراء",111,"مكية"],[18,"الكهف",110,"مكية"],[19,"مريم",98,"مكية"],[20,"طه",135,"مكية"],
    [21,"الأنبياء",112,"مكية"],[22,"الحج",78,"مدنية"],[23,"المؤمنون",118,"مكية"],[24,"النور",64,"مدنية"],
    [25,"الفرقان",77,"مكية"],[26,"الشعراء",227,"مكية"],[27,"النمل",93,"مكية"],[28,"القصص",88,"مكية"],
    [29,"العنكبوت",69,"مكية"],[30,"الروم",60,"مكية"],[31,"لقمان",34,"مكية"],[32,"السجدة",30,"مكية"],
    [33,"الأحزاب",73,"مدنية"],[34,"سبأ",54,"مكية"],[35,"فاطر",45,"مكية"],[36,"يس",83,"مكية"],
    [37,"الصافات",182,"مكية"],[38,"ص",88,"مكية"],[39,"الزمر",75,"مكية"],[40,"غافر",85,"مكية"],
    [41,"فصلت",54,"مكية"],[42,"الشورى",53,"مكية"],[43,"الزخرف",89,"مكية"],[44,"الدخان",59,"مكية"],
    [45,"الجاثية",37,"مكية"],[46,"الأحقاف",35,"مكية"],[47,"محمد",38,"مدنية"],[48,"الفتح",29,"مدنية"],
    [49,"الحجرات",18,"مدنية"],[50,"ق",45,"مكية"],[51,"الذاريات",60,"مكية"],[52,"الطور",49,"مكية"],
    [53,"النجم",62,"مكية"],[54,"القمر",55,"مكية"],[55,"الرحمن",78,"مدنية"],[56,"الواقعة",96,"مكية"],
    [57,"الحديد",29,"مدنية"],[58,"المجادلة",22,"مدنية"],[59,"الحشر",24,"مدنية"],[60,"الممتحنة",13,"مدنية"],
    [61,"الصف",14,"مدنية"],[62,"الجمعة",11,"مدنية"],[63,"المنافقون",11,"مدنية"],[64,"التغابن",18,"مدنية"],
    [65,"الطلاق",12,"مدنية"],[66,"التحريم",12,"مدنية"],[67,"الملك",30,"مكية"],[68,"القلم",52,"مكية"],
    [69,"الحاقة",52,"مكية"],[70,"المعارج",44,"مكية"],[71,"نوح",28,"مكية"],[72,"الجن",28,"مكية"],
    [73,"المزمل",20,"مكية"],[74,"المدثر",56,"مكية"],[75,"القيامة",40,"مكية"],[76,"الإنسان",31,"مدنية"],
    [77,"المرسلات",50,"مكية"],[78,"النبأ",40,"مكية"],[79,"النازعات",46,"مكية"],[80,"عبس",42,"مكية"],
    [81,"التكوير",29,"مكية"],[82,"الانفطار",19,"مكية"],[83,"المطففين",36,"مكية"],[84,"الانشقاق",25,"مكية"],
    [85,"البروج",22,"مكية"],[86,"الطارق",17,"مكية"],[87,"الأعلى",19,"مكية"],[88,"الغاشية",26,"مكية"],
    [89,"الفجر",30,"مكية"],[90,"البلد",20,"مكية"],[91,"الشمس",15,"مكية"],[92,"الليل",21,"مكية"],
    [93,"الضحى",11,"مكية"],[94,"الشرح",8,"مكية"],[95,"التين",8,"مكية"],[96,"العلق",19,"مكية"],
    [97,"القدر",5,"مكية"],[98,"البينة",8,"مدنية"],[99,"الزلزلة",8,"مدنية"],[100,"العاديات",11,"مكية"],
    [101,"القارعة",11,"مكية"],[102,"التكاثر",8,"مكية"],[103,"العصر",3,"مكية"],[104,"الهمزة",9,"مكية"],
    [105,"الفيل",5,"مكية"],[106,"قريش",4,"مكية"],[107,"الماعون",7,"مكية"],[108,"الكوثر",3,"مكية"],
    [109,"الكافرون",6,"مكية"],[110,"النصر",3,"مدنية"],[111,"المسد",5,"مكية"],[112,"الإخلاص",4,"مكية"],
    [113,"الفلق",5,"مكية"],[114,"الناس",6,"مكية"]
  ];

  var QURAN_TEXT_EMBEDDED = {
    1: ["بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ","الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ","الرَّحْمَٰنِ الرَّحِيمِ","مَالِكِ يَوْمِ الدِّينِ","إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ","اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ","صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ"],
    100: ["وَالْعَادِيَاتِ ضَبْحًا","فَالْمُورِيَاتِ قَدْحًا","فَالْمُغِيرَاتِ صُبْحًا","فَأَثَرْنَ بِهِ نَقْعًا","فَوَسَطْنَ بِهِ جَمْعًا","إِنَّ الْإِنْسَانَ لِرَبِّهِ لَكَنُودٌ","وَإِنَّهُ عَلَىٰ ذَٰلِكَ لَشَهِيدٌ","وَإِنَّهُ لِحُبِّ الْخَيْرِ لَشَدِيدٌ","أَفَلَا يَعْلَمُ إِذَا بُعْثِرَ مَا فِي الْقُبُورِ","وَحُصِّلَ مَا فِي الصُّدُورِ","إِنَّ رَبَّهُمْ بِهِمْ يَوْمَئِذٍ لَخَبِيرٌ"],
    101: ["الْقَارِعَةُ","مَا الْقَارِعَةُ","وَمَا أَدْرَاكَ مَا الْقَارِعَةُ","يَوْمَ يَكُونُ النَّاسُ كَالْفَرَاشِ الْمَبْثُوثِ","وَتَكُونُ الْجِبَالُ كَالْعِهْنِ الْمَنْفُوشِ","فَأَمَّا مَنْ ثَقُلَتْ مَوَازِينُهُ","فَهُوَ فِي عِيشَةٍ رَاضِيَةٍ","وَأَمَّا مَنْ خَفَّتْ مَوَازِينُهُ","فَأُمُّهُ هَاوِيَةٌ","وَمَا أَدْرَاكَ مَا هِيَهْ","نَارٌ حَامِيَةٌ"],
    102: ["أَلْهَاكُمُ التَّكَاثُرُ","حَتَّىٰ زُرْتُمُ الْمَقَابِرَ","كَلَّا سَوْفَ تَعْلَمُونَ","ثُمَّ كَلَّا سَوْفَ تَعْلَمُونَ","كَلَّا لَوْ تَعْلَمُونَ عِلْمَ الْيَقِينِ","لَتَرَوُنَّ الْجَحِيمَ","ثُمَّ لَتَرَوُنَّهَا عَيْنَ الْيَقِينِ","ثُمَّ لَتُسْأَلُنَّ يَوْمَئِذٍ عَنِ النَّعِيمِ"],
    103: ["وَالْعَصْرِ","إِنَّ الْإِنْسَانَ لَفِي خُسْرٍ","إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ"],
    104: ["وَيْلٌ لِكُلِّ هُمَزَةٍ لُمَزَةٍ","الَّذِي جَمَعَ مَالًا وَعَدَّدَهُ","يَحْسَبُ أَنَّ مَالَهُ أَخْلَدَهُ","كَلَّا لَيُنْبَذَنَّ فِي الْحُطَمَةِ","وَمَا أَدْرَاكَ مَا الْحُطَمَةُ","نَارُ اللَّهِ الْمُوقَدَةُ","الَّتِي تَطَّلِعُ عَلَى الْأَفْئِدَةِ","إِنَّهَا عَلَيْهِمْ مُؤْصَدَةٌ","فِي عَمَدٍ مُمَدَّدَةٍ"],
    105: ["أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِأَصْحَابِ الْفِيلِ","أَلَمْ يَجْعَلْ كَيْدَهُمْ فِي تَضْلِيلٍ","وَأَرْسَلَ عَلَيْهِمْ طَيْرًا أَبَابِيلَ","تَرْمِيهِمْ بِحِجَارَةٍ مِنْ سِجِّيلٍ","فَجَعَلَهُمْ كَعَصْفٍ مَأْكُولٍ"],
    106: ["لِإِيلَافِ قُرَيْشٍ","إِيلَافِهِمْ رِحْلَةَ الشِّتَاءِ وَالصَّيْفِ","فَلْيَعْبُدُوا رَبَّ هَٰذَا الْبَيْتِ","الَّذِي أَطْعَمَهُمْ مِنْ جُوعٍ وَآمَنَهُمْ مِنْ خَوْفٍ"],
    107: ["أَرَأَيْتَ الَّذِي يُكَذِّبُ بِالدِّينِ","فَذَٰلِكَ الَّذِي يَدُعُّ الْيَتِيمَ","وَلَا يَحُضُّ عَلَىٰ طَعَامِ الْمِسْكِينِ","فَوَيْلٌ لِلْمُصَلِّينَ","الَّذِينَ هُمْ عَنْ صَلَاتِهِمْ سَاهُونَ","الَّذِينَ هُمْ يُرَاءُونَ","وَيَمْنَعُونَ الْمَاعُونَ"],
    108: ["إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ","فَصَلِّ لِرَبِّكَ وَانْحَرْ","إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ"],
    109: ["قُلْ يَا أَيُّهَا الْكَافِرُونَ","لَا أَعْبُدُ مَا تَعْبُدُونَ","وَلَا أَنْتُمْ عَابِدُونَ مَا أَعْبُدُ","وَلَا أَنَا عَابِدٌ مَا عَبَدْتُمْ","وَلَا أَنْتُمْ عَابِدُونَ مَا أَعْبُدُ","لَكُمْ دِينُكُمْ وَلِيَ دِينِ"],
    110: ["إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ","وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا","فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ إِنَّهُ كَانَ تَوَّابًا"],
    111: ["تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ","مَا أَغْنَىٰ عَنْهُ مَالُهُ وَمَا كَسَبَ","سَيَصْلَىٰ نَارًا ذَاتَ لَهَبٍ","وَامْرَأَتُهُ حَمَّالَةَ الْحَطَبِ","فِي جِيدِهَا حَبْلٌ مِنْ مَسَدٍ"],
    112: ["قُلْ هُوَ اللَّهُ أَحَدٌ","اللَّهُ الصَّمَدُ","لَمْ يَلِدْ وَلَمْ يُولَدْ","وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ"],
    113: ["قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ","مِنْ شَرِّ مَا خَلَقَ","وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ","وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ","وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ"],
    114: ["قُلْ أَعُوذُ بِرَبِّ النَّاسِ","مَلِكِ النَّاسِ","إِلَٰهِ النَّاسِ","مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ","الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ","مِنَ الْجِنَّةِ وَالنَّاسِ"]
  };

  var BASMALA_TEXT = "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ";

  var RECITERS = [
    { key:"afs", name:"مشاري العفاسي", base:"https://server8.mp3quran.net/afs/" },
    { key:"husary", name:"محمود خليل الحصري", base:"https://server13.mp3quran.net/husr/" },
    { key:"shur", name:"سعود الشريم", base:"https://server7.mp3quran.net/shur/" },
    { key:"gmd", name:"سعد الغامدي", base:"https://server7.mp3quran.net/s_gmd/" },
    { key:"basit", name:"عبد الباسط عبد الصمد", base:"https://server7.mp3quran.net/basit/" },
    { key:"minshawi", name:"محمد صديق المنشاوي", base:"https://server10.mp3quran.net/minsh/" },
    { key:"raad", name:"مصطفى رعد العزاوي", base:"https://server8.mp3quran.net/ra3ad/" },
    { key:"tunaiji", name:"خليفة الطنيجي", base:"https://server12.mp3quran.net/tnjy/" }
  ];

  var pendingConfirm = null;
  var currentSub = "morning";

  var habitListEl = document.getElementById("habitList");
  var emptyStateEl = document.getElementById("emptyState");
  var statTotalEl = document.getElementById("statTotal");
  var statDoneTodayEl = document.getElementById("statDoneToday");
  var statBestStreakEl = document.getElementById("statBestStreak");
  var toastEl = document.getElementById("toast");

  var addOverlay = document.getElementById("addOverlay");
  var confirmOverlay = document.getElementById("confirmOverlay");
  var locationOverlay = document.getElementById("locationOverlay");
  var habitNameInput = document.getElementById("habitNameInput");
  var iconGrid = document.getElementById("iconGrid");

  function pad(n){ return n < 10 ? "0" + n : "" + n; }
  function dateKey(d){ return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function todayKey(){ return dateKey(new Date()); }
  function addDays(d, delta){ var nd = new Date(d); nd.setDate(nd.getDate() + delta); return nd; }
  function pad3(n){ var s = "" + n; while(s.length < 3) s = "0" + s; return s; }

  function loadVibrationSetting(){
    var raw = localStorage.getItem(VIBRATION_KEY);
    return raw === null ? true : raw === "1";
  }
  var vibrationEnabled = loadVibrationSetting();

  function vibrate(pattern){
    if(!vibrationEnabled) return;
    if(navigator.vibrate){
      try{ navigator.vibrate(pattern); }catch(e){}
    }
  }

  function showToast(msg){
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function(){ toastEl.classList.remove("show"); }, 2200);
  }

  function updateHeader(){
    var days = ["الأحد","الاثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"];
    var months = ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"];
    var now = new Date();
    document.getElementById("todayDate").textContent = days[now.getDay()] + "، " + now.getDate() + " " + months[now.getMonth()];

    var hour = now.getHours();
    var greeting = "أهلاً بك", sub = "استمر في التزامك اليوم";
    if(hour < 5){ greeting = "سهرة مباركة"; sub = "لا تنسَ أذكار النوم قبل الراحة"; }
    else if(hour < 12){ greeting = "صباح الخير"; sub = "ابدأ يومك بأذكار الصباح وعاداتك"; }
    else if(hour < 17){ greeting = "طاب يومك"; sub = "لا يزال أمامك وقت لإنجاز عاداتك"; }
    else if(hour < 21){ greeting = "مساء الخير"; sub = "حان وقت أذكار المساء"; }
    else{ greeting = "مساء النور"; sub = "لا تفوّت تتابعك قبل انتهاء اليوم"; }

    document.getElementById("greetingText").innerHTML = greeting + " <span>👋</span>";
    document.getElementById("subGreeting").textContent = sub;
  }

  /* ================= GENERIC CONFIRM SHEET ================= */

  function openConfirm(title, text, onConfirm){
    document.getElementById("confirmTitle").textContent = title;
    document.getElementById("confirmText").innerHTML = text;
    pendingConfirm = onConfirm;
    confirmOverlay.classList.add("show");
  }
  function closeConfirm(){
    confirmOverlay.classList.remove("show");
    pendingConfirm = null;
  }
  document.getElementById("confirmCancelBtn").addEventListener("click", closeConfirm);
  confirmOverlay.addEventListener("click", function(e){ if(e.target === confirmOverlay) closeConfirm(); });
  document.getElementById("confirmOkBtn").addEventListener("click", function(){
    if(typeof pendingConfirm === "function") pendingConfirm();
    closeConfirm();
  });

  /* ================= HABITS ================= */

  function loadHabits(){
    try{
      var raw = localStorage.getItem(HABITS_KEY);
      var parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    }catch(e){ return []; }
  }
  function saveHabits(){ localStorage.setItem(HABITS_KEY, JSON.stringify(habits)); }

  var habits = loadHabits();

  function calcStreak(completedSet){
    var streak = 0;
    var cursor = new Date();
    if(!completedSet[todayKey()]){
      cursor = addDays(cursor, -1);
      if(!completedSet[dateKey(cursor)]) return 0;
    }
    while(completedSet[dateKey(cursor)]){ streak++; cursor = addDays(cursor, -1); }
    return streak;
  }

  function toSet(arr){
    var set = {};
    for(var i = 0; i < arr.length; i++) set[arr[i]] = true;
    return set;
  }

  function renderStats(){
    var total = habits.length, doneToday = 0, best = 0;
    for(var i = 0; i < habits.length; i++){
      var set = toSet(habits[i].completedDates);
      if(set[todayKey()]) doneToday++;
      var s = calcStreak(set);
      if(s > best) best = s;
    }
    statTotalEl.textContent = total;
    statDoneTodayEl.textContent = doneToday + "/" + total;
    statBestStreakEl.textContent = best;
  }

  function buildMisbaha(completedSet){
    var wrap = document.createElement("div");
    wrap.className = "misbaha-row";
    var label = document.createElement("span");
    label.className = "misbaha-label";
    label.textContent = "آخر ٧ أيام";
    wrap.appendChild(label);
    for(var i = 6; i >= 0; i--){
      var d = addDays(new Date(), -i);
      var key = dateKey(d);
      var bead = document.createElement("span");
      bead.className = "bead" + (completedSet[key] ? " filled" : "") + (key === todayKey() ? " today" : "");
      wrap.appendChild(bead);
    }
    return wrap;
  }

  function renderHabits(){
    habitListEl.innerHTML = "";
    emptyStateEl.style.display = habits.length === 0 ? "block" : "none";

    for(var i = 0; i < habits.length; i++){
      (function(habit){
        var set = toSet(habit.completedDates);
        var streak = calcStreak(set);
        var doneToday = !!set[todayKey()];

        var card = document.createElement("div");
        card.className = "habit-card" + (doneToday ? " done-today" : "");

        var top = document.createElement("div");
        top.className = "habit-top";

        var iconEl = document.createElement("div");
        iconEl.className = "habit-icon";
        iconEl.textContent = habit.icon;

        var info = document.createElement("div");
        info.className = "habit-info";

        var nameEl = document.createElement("div");
        nameEl.className = "habit-name";
        nameEl.textContent = habit.name;

        var streakEl = document.createElement("div");
        streakEl.className = "habit-streak" + (streak === 0 ? " zero" : "");
        streakEl.innerHTML = (streak > 0 ? "🔥 " : "○ ") + streak + " يوم متتالي";

        info.appendChild(nameEl);
        info.appendChild(streakEl);

        var actions = document.createElement("div");
        actions.className = "habit-actions";

        var delBtn = document.createElement("button");
        delBtn.className = "delete-btn";
        delBtn.innerHTML = "✕";
        delBtn.addEventListener("click", function(){
          openConfirm("🗑️ حذف العادة", "هل أنت متأكد أنك تريد حذف عادة <b>\"" + habit.name + "\"</b>؟ سيتم فقدان سجل التتابع نهائياً.", function(){
            habits = habits.filter(function(h){ return h.id !== habit.id; });
            saveHabits();
            renderHabits();
            renderStats();
            showToast("🗑️ تم حذف \"" + habit.name + "\"");
          });
        });

        var checkBtn = document.createElement("button");
        checkBtn.className = "check-btn" + (doneToday ? " checked" : "");
        checkBtn.innerHTML = doneToday ? "✓" : "";
        checkBtn.addEventListener("click", function(){
          vibrate(15);
          toggleHabitToday(habit.id);
        });

        actions.appendChild(delBtn);
        actions.appendChild(checkBtn);

        top.appendChild(iconEl);
        top.appendChild(info);
        top.appendChild(actions);

        card.appendChild(top);
        card.appendChild(buildMisbaha(set));

        habitListEl.appendChild(card);
      })(habits[i]);
    }
  }

  function toggleHabitToday(id){
    var habit = null;
    for(var i = 0; i < habits.length; i++){ if(habits[i].id === id){ habit = habits[i]; break; } }
    if(!habit) return;

    var key = todayKey();
    var idx = habit.completedDates.indexOf(key);
    if(idx === -1){
      habit.completedDates.push(key);
      var set = toSet(habit.completedDates);
      var newStreak = calcStreak(set);
      showToast(newStreak > 1 ? ("🔥 أحسنت! تتابع " + newStreak + " أيام على \"" + habit.name + "\"") : ("✅ تم إنجاز \"" + habit.name + "\" اليوم"));
    }else{
      habit.completedDates.splice(idx, 1);
      showToast("↩️ تم إلغاء إنجاز \"" + habit.name + "\" لهذا اليوم");
    }
    saveHabits();
    renderHabits();
    renderStats();
  }

  function buildIconGridInto(gridEl, selected, onSelect){
    gridEl.innerHTML = "";
    ICONS.forEach(function(icon){
      var opt = document.createElement("div");
      opt.className = "icon-option" + (icon === selected() ? " selected" : "");
      opt.textContent = icon;
      opt.addEventListener("click", function(){
        onSelect(icon);
        gridEl.querySelectorAll(".icon-option").forEach(function(el){ el.classList.remove("selected"); });
        opt.classList.add("selected");
      });
      gridEl.appendChild(opt);
    });
  }

  function buildIconGrid(){
    buildIconGridInto(iconGrid, function(){ return selectedIcon; }, function(icon){ selectedIcon = icon; });
  }

  function openAddSheet(){
    habitNameInput.value = "";
    selectedIcon = ICONS[0];
    buildIconGrid();
    addOverlay.classList.add("show");
    setTimeout(function(){ habitNameInput.focus(); }, 250);
  }
  function closeAddSheet(){ addOverlay.classList.remove("show"); }

  document.getElementById("openAddBtn").addEventListener("click", openAddSheet);
  document.getElementById("cancelAddBtn").addEventListener("click", closeAddSheet);
  addOverlay.addEventListener("click", function(e){ if(e.target === addOverlay) closeAddSheet(); });

  document.getElementById("confirmAddBtn").addEventListener("click", function(){
    var name = habitNameInput.value.trim();
    if(name === ""){
      habitNameInput.focus();
      habitNameInput.style.borderColor = "#ef4444";
      setTimeout(function(){ habitNameInput.style.borderColor = ""; }, 1200);
      return;
    }
    habits.push({ id: "h_" + Date.now() + "_" + Math.floor(Math.random() * 10000), name: name, icon: selectedIcon, completedDates: [], createdAt: todayKey() });
    saveHabits();
    closeAddSheet();
    renderHabits();
    renderStats();
    showToast("🌟 تمت إضافة عادة \"" + name + "\"");
  });

  habitNameInput.addEventListener("keydown", function(e){ if(e.key === "Enter") document.getElementById("confirmAddBtn").click(); });

  /* ================= AZKAR ================= */

  function loadAzkarState(){
    var today = todayKey();
    try{
      var raw = localStorage.getItem(AZKAR_KEY);
      var parsed = raw ? JSON.parse(raw) : null;
      if(parsed && parsed.date === today && parsed.progress){
        return parsed;
      }
    }catch(e){}
    var fresh = { date: today, progress: {} };
    localStorage.setItem(AZKAR_KEY, JSON.stringify(fresh));
    return fresh;
  }
  function saveAzkarState(){ localStorage.setItem(AZKAR_KEY, JSON.stringify(azkarState)); }

  var azkarState = loadAzkarState();

  function renderDhikrList(){
    var cat = AZKAR_DATA[currentSub];
    document.getElementById("azkarSectionTitle").textContent = cat.title;
    var listEl = document.getElementById("dhikrList");
    listEl.innerHTML = "";

    cat.items.forEach(function(item){
      var count = azkarState.progress[item.id] || 0;
      var complete = count >= item.target;
      var pct = Math.min(100, Math.round((count / item.target) * 100));

      var card = document.createElement("div");
      card.className = "dhikr-card" + (complete ? " complete" : "");

      var body = document.createElement("div");
      body.className = "dhikr-body";

      var text = document.createElement("div");
      text.className = "dhikr-text";
      text.textContent = item.text;

      var meta = document.createElement("div");
      meta.className = "dhikr-meta";

      var target = document.createElement("span");
      target.className = "dhikr-target";
      target.textContent = count + " من " + item.target;

      var resetBtn = document.createElement("button");
      resetBtn.className = "dhikr-reset";
      resetBtn.textContent = "إعادة ضبط";
      resetBtn.addEventListener("click", function(){
        azkarState.progress[item.id] = 0;
        saveAzkarState();
        renderDhikrList();
      });

      meta.appendChild(target);
      meta.appendChild(resetBtn);
      body.appendChild(text);
      body.appendChild(meta);

      var counter = document.createElement("div");
      counter.className = "dhikr-counter" + (complete ? " complete" : "");
      counter.style.setProperty("--pct", pct);
      counter.style.background = "conic-gradient(var(--gold) calc(var(--pct) * 1%), var(--surface-3) 0)";

      var inner = document.createElement("div");
      inner.className = "dhikr-counter-inner";
      if(!complete){ inner.textContent = String(count); }

      counter.appendChild(inner);
      counter.addEventListener("click", function(){
        if(complete){
          vibrate(10);
          showToast("✅ هذا الذكر مكتمل بالفعل");
          return;
        }
        azkarState.progress[item.id] = count + 1;
        saveAzkarState();
        if(azkarState.progress[item.id] >= item.target){
          vibrate([40,30,40]);
          showToast("✅ أتممت: " + item.text.slice(0, 22) + "…");
        }else{
          vibrate(12);
        }
        renderDhikrList();
      });

      card.appendChild(body);
      card.appendChild(counter);
      listEl.appendChild(card);
    });
  }

  document.getElementById("resetCategoryBtn").addEventListener("click", function(){
    var cat = AZKAR_DATA[currentSub];
    openConfirm("↺ إعادة ضبط الأذكار", "سيتم إعادة عدّاد جميع أذكار <b>\"" + cat.title + "\"</b> إلى الصفر.", function(){
      cat.items.forEach(function(item){ azkarState.progress[item.id] = 0; });
      saveAzkarState();
      renderDhikrList();
      showToast("↺ تم إعادة ضبط " + cat.title);
    });
  });

  /* ================= TASBIH ================= */

  function loadTasbihState(){
    try{
      var raw = localStorage.getItem(TASBIH_KEY);
      var parsed = raw ? JSON.parse(raw) : null;
      if(parsed && typeof parsed.grandTotal === "number"){
        return parsed;
      }
    }catch(e){}
    return { current: 0, target: 33, label: TASBIH_LABELS[0], grandTotal: 0 };
  }
  function saveTasbihState(){ localStorage.setItem(TASBIH_KEY, JSON.stringify(tasbihState)); }

  var tasbihState = loadTasbihState();

  function buildTasbihChips(){
    var wrap = document.getElementById("tasbihChips");
    wrap.innerHTML = "";
    TASBIH_LABELS.forEach(function(label){
      var chip = document.createElement("button");
      chip.className = "chip" + (tasbihState.label === label ? " active" : "");
      chip.textContent = label;
      chip.addEventListener("click", function(){
        tasbihState.label = label;
        saveTasbihState();
        buildTasbihChips();
      });
      wrap.appendChild(chip);
    });
  }

  function renderTasbih(){
    var pct = Math.min(100, Math.round((tasbihState.current / tasbihState.target) * 100));
    document.getElementById("tasbihCircle").style.setProperty("--pct", pct);
    document.getElementById("tasbihCount").textContent = tasbihState.current;
    document.getElementById("tasbihOf").textContent = "من " + tasbihState.target;
    document.getElementById("tasbihGrandTotal").textContent = tasbihState.grandTotal;
  }

  document.getElementById("tasbihCircle").addEventListener("click", function(){
    tasbihState.current += 1;
    tasbihState.grandTotal += 1;

    if(tasbihState.current >= tasbihState.target){
      vibrate([45,35,45,35,45]);
      showToast("📿 أكملت " + tasbihState.target + " — أُعيد العدّاد");
      tasbihState.current = 0;
    }else if(tasbihState.current % 33 === 0){
      vibrate([35,25,35]);
    }else{
      vibrate(12);
    }

    saveTasbihState();
    renderTasbih();
  });

  document.getElementById("tasbihResetBtn").addEventListener("click", function(){
    openConfirm("↺ إعادة ضبط المسبحة", "سيتم إعادة العدّاد الحالي إلى الصفر. لن يتأثر إجمالي كل الأوقات.", function(){
      tasbihState.current = 0;
      saveTasbihState();
      renderTasbih();
      showToast("↺ تم إعادة ضبط العدّاد");
    });
  });

  /* ================= PRAYER TIMES — OFFLINE ASTRONOMICAL CALCULATION ================= */

  function degToRad(d){ return d * Math.PI / 180; }
  function radToDeg(r){ return r * 180 / Math.PI; }
  function fixAngle(a){ a = a - 360 * Math.floor(a / 360); return a < 0 ? a + 360 : a; }
  function fixHour(h){ h = h - 24 * Math.floor(h / 24); return h < 0 ? h + 24 : h; }

  function julianDate(year, month, day){
    if(month <= 2){ year -= 1; month += 12; }
    var A = Math.floor(year / 100);
    var B = 2 - A + Math.floor(A / 4);
    return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + B - 1524.5;
  }

  function sunPosition(D){
    var g = fixAngle(357.529 + 0.98560028 * D);
    var q = fixAngle(280.459 + 0.98564736 * D);
    var L = fixAngle(q + 1.915 * Math.sin(degToRad(g)) + 0.020 * Math.sin(degToRad(2 * g)));
    var e = 23.439 - 0.00000036 * D;
    var RA = radToDeg(Math.atan2(Math.cos(degToRad(e)) * Math.sin(degToRad(L)), Math.cos(degToRad(L)))) / 15;
    RA = fixHour(RA);
    var eqt = q / 15 - RA;
    var decl = radToDeg(Math.asin(Math.sin(degToRad(e)) * Math.sin(degToRad(L))));
    return { decl: decl, eqt: eqt };
  }

  function hourAngle(depressionDeg, lat, decl){
    var num = -Math.sin(degToRad(depressionDeg)) - Math.sin(degToRad(lat)) * Math.sin(degToRad(decl));
    var den = Math.cos(degToRad(lat)) * Math.cos(degToRad(decl));
    var val = num / den;
    val = Math.max(-1, Math.min(1, val));
    return radToDeg(Math.acos(val)) / 15;
  }

  function computeTimes(year, month, day, lat, lng, tz, method, madhab){
    var D = julianDate(year, month, day) - 2451545.0;
    var pos = sunPosition(D);
    var decl = pos.decl;
    var eqt = pos.eqt;

    var dhuhr = fixHour(12 + tz - lng / 15 - eqt);
    var fajr = fixHour(dhuhr - hourAngle(method.fajr, lat, decl));
    var sunrise = fixHour(dhuhr - hourAngle(0.833, lat, decl));
    var sunset = fixHour(dhuhr + hourAngle(0.833, lat, decl));
    var maghrib = sunset;

    var isha;
    if(method.ishaInterval){
      isha = fixHour(maghrib + method.ishaInterval / 60);
    }else{
      isha = fixHour(dhuhr + hourAngle(method.isha, lat, decl));
    }

    var factor = madhab === "hanafi" ? 2 : 1;
    var altitude = radToDeg(Math.atan(1 / (factor + Math.tan(degToRad(Math.abs(lat - decl))))));
    var asr = fixHour(dhuhr + hourAngle(-altitude, lat, decl));

    return { fajr: fajr, sunrise: sunrise, dhuhr: dhuhr, asr: asr, maghrib: maghrib, isha: isha };
  }

  function formatClock(decimalHours){
    var h24 = Math.floor(decimalHours);
    var m = Math.round((decimalHours - h24) * 60);
    if(m === 60){ m = 0; h24 += 1; }
    h24 = h24 % 24;
    var h12 = h24 % 12;
    if(h12 === 0) h12 = 12;
    var suffix = h24 < 12 ? "ص" : "م";
    return h12 + ":" + pad(m) + " " + suffix;
  }

  function loadPrayerSettings(){
    try{
      var raw = localStorage.getItem(PRAYER_KEY);
      var parsed = raw ? JSON.parse(raw) : null;
      if(parsed && typeof parsed.lat === "number" && typeof parsed.lng === "number"){
        return parsed;
      }
    }catch(e){}
    return null;
  }
  function savePrayerSettings(s){ localStorage.setItem(PRAYER_KEY, JSON.stringify(s)); }

  var prayerSettings = loadPrayerSettings();
  var tempPrayerSelection = null;

  var prayerEmptyState = document.getElementById("prayerEmptyState");
  var prayerContent = document.getElementById("prayerContent");
  var prayerGrid = document.getElementById("prayerGrid");

  var prayerCache = { nextMoment: 0, prevMoment: null, nextLabel: "" };
  var prayerTickHandle = null;

  var PRAYER_META = [
    { key:"fajr", label:"الفجر", icon:"🌌" },
    { key:"sunrise", label:"الشروق", icon:"🌅" },
    { key:"dhuhr", label:"الظهر", icon:"☀️" },
    { key:"asr", label:"العصر", icon:"🌤️" },
    { key:"maghrib", label:"المغرب", icon:"🌇" },
    { key:"isha", label:"العشاء", icon:"🌌" }
  ];

  function shiftedNow(tz){ return new Date(Date.now() + tz * 3600000); }

  function fullRenderPrayer(){
    if(!prayerSettings){
      prayerEmptyState.style.display = "block";
      prayerContent.style.display = "none";
      return;
    }
    prayerEmptyState.style.display = "none";
    prayerContent.style.display = "block";

    document.getElementById("prayerCityName").textContent = prayerSettings.cityName;

    var method = CALC_METHODS[prayerSettings.method] || CALC_METHODS.mwl;
    var madhabName = prayerSettings.madhab === "hanafi" ? "حنفي" : "شافعي";
    document.getElementById("prayerSettingsSummary").innerHTML = "<b>" + method.name + "</b> · " + madhabName;

    var tz = prayerSettings.tz;
    var cityDate = shiftedNow(tz);
    var y = cityDate.getUTCFullYear();
    var m = cityDate.getUTCMonth() + 1;
    var d = cityDate.getUTCDate();

    var times = computeTimes(y, m, d, prayerSettings.lat, prayerSettings.lng, tz, method, prayerSettings.madhab);

    var dayStartMs = Date.now() + tz * 3600000 - (cityDate.getUTCHours() * 3600000 + cityDate.getUTCMinutes() * 60000 + cityDate.getUTCSeconds() * 1000 + cityDate.getUTCMilliseconds());

    var list = PRAYER_META.map(function(meta){
      var decimal = times[meta.key];
      return { key: meta.key, label: meta.label, icon: meta.icon, decimal: decimal, moment: dayStartMs + decimal * 3600000 };
    });

    syncPrayerTimesToNative({
      fajr: list.filter(function(i){ return i.key === "fajr"; })[0].moment,
      dhuhr: list.filter(function(i){ return i.key === "dhuhr"; })[0].moment,
      asr: list.filter(function(i){ return i.key === "asr"; })[0].moment,
      maghrib: list.filter(function(i){ return i.key === "maghrib"; })[0].moment,
      isha: list.filter(function(i){ return i.key === "isha"; })[0].moment
    });

    var nowShiftedMs = Date.now() + tz * 3600000;

    var countdownTargets = list.filter(function(item){ return item.key !== "sunrise"; });
    var next = null;
    for(var i = 0; i < countdownTargets.length; i++){
      if(countdownTargets[i].moment > nowShiftedMs){ next = countdownTargets[i]; break; }
    }
    if(!next){
      var tomorrow = shiftedNow(tz);
      tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
      var ty = tomorrow.getUTCFullYear(), tm = tomorrow.getUTCMonth() + 1, td = tomorrow.getUTCDate();
      var tomorrowTimes = computeTimes(ty, tm, td, prayerSettings.lat, prayerSettings.lng, tz, method, prayerSettings.madhab);
      next = { key:"fajr", label:"الفجر", icon:"🌌", decimal: tomorrowTimes.fajr, moment: dayStartMs + 24 * 3600000 + tomorrowTimes.fajr * 3600000 };
    }

    var prev = null;
    for(var j = list.length - 1; j >= 0; j--){
      if(list[j].moment <= nowShiftedMs){ prev = list[j]; break; }
    }

    prayerCache.nextMoment = next.moment;
    prayerCache.prevMoment = prev ? prev.moment : (next.moment - 3 * 3600000);
    prayerCache.nextLabel = next.label;

    prayerGrid.innerHTML = "";
    list.forEach(function(item){
      var card = document.createElement("div");
      card.className = "prayer-card" + (item.key === next.key && item.moment === next.moment ? " next" : "");

      var icon = document.createElement("div");
      icon.className = "p-icon";
      icon.textContent = item.icon;

      var name = document.createElement("div");
      name.className = "p-name";
      name.textContent = item.label;

      var time = document.createElement("div");
      time.className = "p-time";
      time.textContent = formatClock(item.decimal);

      card.appendChild(icon);
      card.appendChild(name);
      card.appendChild(time);
      prayerGrid.appendChild(card);
    });

    document.getElementById("countdownNextName").textContent = "صلاة " + next.label;

    prayerTick();
  }

  function prayerTick(){
    if(!prayerSettings) return;
    var tz = prayerSettings.tz;
    var nowShiftedMs = Date.now() + tz * 3600000;
    var diff = prayerCache.nextMoment - nowShiftedMs;

    if(diff <= 0){
      fullRenderPrayer();
      return;
    }

    var totalSec = Math.floor(diff / 1000);
    var hh = Math.floor(totalSec / 3600);
    var mm = Math.floor((totalSec % 3600) / 60);
    var ss = totalSec % 60;
    document.getElementById("countdownTime").textContent = pad(hh) + ":" + pad(mm) + ":" + pad(ss);

    var span = prayerCache.nextMoment - prayerCache.prevMoment;
    var elapsed = nowShiftedMs - prayerCache.prevMoment;
    var pct = span > 0 ? Math.max(0, Math.min(100, (elapsed / span) * 100)) : 0;
    document.getElementById("countdownRing").style.setProperty("--pct", pct.toFixed(2));
  }

  function startPrayerTicker(){
    if(prayerTickHandle) clearInterval(prayerTickHandle);
    prayerTickHandle = setInterval(prayerTick, 1000);
  }

  function applyGeolocation(){
    if(!navigator.geolocation){
      showToast("⚠️ المتصفح لا يدعم تحديد الموقع");
      return;
    }
    showToast("📍 جارٍ تحديد موقعك...");
    navigator.geolocation.getCurrentPosition(function(pos){
      var deviceTz = -new Date().getTimezoneOffset() / 60;
      tempPrayerSelection = {
        mode: "geo",
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
        tz: deviceTz,
        cityName: "موقعي الحالي (GPS)",
        method: tempPrayerSelection ? tempPrayerSelection.method : (prayerSettings ? prayerSettings.method : "mwl"),
        madhab: tempPrayerSelection ? tempPrayerSelection.madhab : (prayerSettings ? prayerSettings.madhab : "shafii")
      };
      refreshLocationSheetSelectionUI();
      showToast("✅ تم تحديد موقعك، اضغط حفظ للتطبيق");
    }, function(){
      showToast("⚠️ تعذّر الوصول لموقعك، يمكنك اختيار مدينة يدوياً");
    }, { enableHighAccuracy: true, timeout: 10000 });
  }

  function buildCityList(filterText){
    var listEl = document.getElementById("cityList");
    listEl.innerHTML = "";
    var q = (filterText || "").trim();

    CITIES.filter(function(c){
      if(q === "") return true;
      return c.name.indexOf(q) !== -1 || c.country.indexOf(q) !== -1;
    }).forEach(function(c){
      var row = document.createElement("div");
      var isSelected = tempPrayerSelection && tempPrayerSelection.mode === "city" && tempPrayerSelection.cityKey === c.key;
      row.className = "city-row" + (isSelected ? " selected" : "");

      var nameSpan = document.createElement("span");
      nameSpan.textContent = c.name;

      var countrySpan = document.createElement("span");
      countrySpan.className = "country";
      countrySpan.textContent = c.country;

      row.appendChild(nameSpan);
      row.appendChild(countrySpan);

      row.addEventListener("click", function(){
        tempPrayerSelection = {
          mode: "city",
          cityKey: c.key,
          lat: c.lat,
          lng: c.lng,
          tz: c.tz,
          cityName: c.name,
          method: tempPrayerSelection ? tempPrayerSelection.method : (prayerSettings ? prayerSettings.method : "mwl"),
          madhab: tempPrayerSelection ? tempPrayerSelection.madhab : (prayerSettings ? prayerSettings.madhab : "shafii")
        };
        refreshLocationSheetSelectionUI();
      });

      listEl.appendChild(row);
    });
  }

  function buildMethodChips(){
    var wrap = document.getElementById("methodChips");
    wrap.innerHTML = "";
    Object.keys(CALC_METHODS).forEach(function(key){
      var method = CALC_METHODS[key];
      var chip = document.createElement("button");
      chip.className = "chip" + (tempPrayerSelection && tempPrayerSelection.method === key ? " active" : "");
      chip.textContent = method.name;
      chip.addEventListener("click", function(){
        tempPrayerSelection.method = key;
        buildMethodChips();
      });
      wrap.appendChild(chip);
    });
  }

  function buildMadhabChips(){
    var wrap = document.getElementById("madhabChips");
    wrap.innerHTML = "";
    [{ key:"shafii", name:"شافعي (الجمهور)" }, { key:"hanafi", name:"حنفي" }].forEach(function(o){
      var chip = document.createElement("button");
      chip.className = "chip" + (tempPrayerSelection && tempPrayerSelection.madhab === o.key ? " active" : "");
      chip.textContent = o.name;
      chip.addEventListener("click", function(){
        tempPrayerSelection.madhab = o.key;
        buildMadhabChips();
      });
      wrap.appendChild(chip);
    });
  }

  function refreshLocationSheetSelectionUI(){
    buildCityList(document.getElementById("citySearchInput").value);
    buildMethodChips();
    buildMadhabChips();
  }

  function openLocationSheet(){
    tempPrayerSelection = prayerSettings ? {
      mode: prayerSettings.mode,
      cityKey: prayerSettings.cityKey,
      lat: prayerSettings.lat,
      lng: prayerSettings.lng,
      tz: prayerSettings.tz,
      cityName: prayerSettings.cityName,
      method: prayerSettings.method,
      madhab: prayerSettings.madhab
    } : { mode: null, method: "mwl", madhab: "shafii" };

    document.getElementById("citySearchInput").value = "";
    refreshLocationSheetSelectionUI();
    locationOverlay.classList.add("show");
  }
  function closeLocationSheet(){ locationOverlay.classList.remove("show"); }

  document.getElementById("geoBtn").addEventListener("click", applyGeolocation);
  document.getElementById("emptyGeoBtn").addEventListener("click", function(){
    openLocationSheet();
    applyGeolocation();
  });
  document.getElementById("emptyCityBtn").addEventListener("click", openLocationSheet);
  document.getElementById("changeLocationBtn").addEventListener("click", openLocationSheet);
  document.getElementById("prayerSettingsLinkBtn").addEventListener("click", openLocationSheet);
  document.getElementById("cancelLocationBtn").addEventListener("click", closeLocationSheet);
  locationOverlay.addEventListener("click", function(e){ if(e.target === locationOverlay) closeLocationSheet(); });

  document.getElementById("citySearchInput").addEventListener("input", function(e){
    buildCityList(e.target.value);
  });

  document.getElementById("saveLocationBtn").addEventListener("click", function(){
    if(!tempPrayerSelection || typeof tempPrayerSelection.lat !== "number"){
      showToast("⚠️ يرجى تحديد موقعك أو اختيار مدينة أولاً");
      return;
    }
    prayerSettings = tempPrayerSelection;
    savePrayerSettings(prayerSettings);
    closeLocationSheet();
    fullRenderPrayer();
    startPrayerTicker();
    showToast("✅ تم تحديث مواقيت الصلاة");
  });

  /* ================= QURAN — ONLINE STREAMING PLAYER ================= */

  var quranAudio = document.getElementById("quranAudio");
  var miniPlayer = document.getElementById("miniPlayer");
  var surahListEl = document.getElementById("surahList");
  var currentReciterKey = localStorage.getItem(RECITER_KEY) || RECITERS[0].key;
  var currentPlayingSurah = null;
  var currentPlayingName = "";
  var isSeeking = false;

  function getReciter(key){
    for(var i = 0; i < RECITERS.length; i++){ if(RECITERS[i].key === key) return RECITERS[i]; }
    return RECITERS[0];
  }

  function formatDuration(sec){
    if(!isFinite(sec) || sec < 0) sec = 0;
    var m = Math.floor(sec / 60);
    var s = Math.floor(sec % 60);
    return m + ":" + pad(s);
  }

  function buildReciterChips(){
    var wrap = document.getElementById("reciterChips");
    wrap.innerHTML = "";
    RECITERS.forEach(function(r){
      var card = document.createElement("button");
      card.className = "reciter-card" + (currentReciterKey === r.key ? " active" : "");

      var icon = document.createElement("div");
      icon.className = "r-icon";
      icon.textContent = "🎙️";

      var name = document.createElement("div");
      name.className = "r-name";
      name.textContent = r.name;

      card.appendChild(icon);
      card.appendChild(name);

      card.addEventListener("click", function(){
        currentReciterKey = r.key;
        localStorage.setItem(RECITER_KEY, currentReciterKey);
        buildReciterChips();
        document.getElementById("miniPlayerReciter").textContent = getReciter(currentReciterKey).name;
        if(currentPlayingSurah !== null){
          var wasPlaying = !quranAudio.paused;
          loadAndPlaySurah(currentPlayingSurah, currentPlayingName, wasPlaying);
        }
      });
      wrap.appendChild(card);
    });
  }

  function renderSurahList(filterText){
    surahListEl.innerHTML = "";
    var q = (filterText || "").trim();

    SURAHS.filter(function(s){
      if(q === "") return true;
      return s[1].indexOf(q) !== -1 || String(s[0]) === q;
    }).forEach(function(s){
      var number = s[0], name = s[1], ayahCount = s[2], type = s[3];
      var isPlaying = currentPlayingSurah === number;

      var row = document.createElement("div");
      row.className = "surah-row" + (isPlaying ? " playing" : "");

      var num = document.createElement("div");
      num.className = "surah-number";
      num.textContent = number;

      var info = document.createElement("div");
      info.className = "surah-info";

      var nameEl = document.createElement("div");
      nameEl.className = "surah-name";
      nameEl.textContent = "سورة " + name;

      var meta = document.createElement("div");
      meta.className = "surah-meta";
      meta.textContent = ayahCount + " آية · " + type;

      info.appendChild(nameEl);
      info.appendChild(meta);

      var playBtn = document.createElement("button");
      playBtn.className = "surah-play-btn";
      playBtn.innerHTML = (isPlaying && !quranAudio.paused) ? "⏸" : "▶";
      playBtn.addEventListener("click", function(){
        if(currentPlayingSurah === number){
          if(quranAudio.paused){ quranAudio.play().catch(handlePlaybackError); }
          else{ quranAudio.pause(); }
          updatePlayIndicators();
        }else{
          loadAndPlaySurah(number, name, true);
        }
      });

      row.appendChild(num);
      row.appendChild(info);
      row.appendChild(playBtn);
      surahListEl.appendChild(row);
    });
  }

  function updatePlayIndicators(){
    surahListEl.querySelectorAll(".surah-row").forEach(function(row){
      var btn = row.querySelector(".surah-play-btn");
      var num = row.querySelector(".surah-number").textContent;
      var isThis = currentPlayingSurah !== null && String(currentPlayingSurah) === num;
      row.classList.toggle("playing", isThis);
      if(btn) btn.innerHTML = (isThis && !quranAudio.paused) ? "⏸" : "▶";
    });
    document.getElementById("miniPlayerToggle").innerHTML = (!quranAudio.paused && currentPlayingSurah !== null) ? "⏸" : "▶";
  }

  function handlePlaybackError(){
    showToast("⚠️ يتطلب الاستماع اتصالاً بالإنترنت");
  }

  function loadAndPlaySurah(number, name, autoplay){
    var reciter = getReciter(currentReciterKey);
    var url = reciter.base + pad3(number) + ".mp3";
    quranAudio.src = url;
    currentPlayingSurah = number;
    currentPlayingName = name;

    document.getElementById("miniPlayerName").textContent = "سورة " + name;
    document.getElementById("miniPlayerReciter").textContent = reciter.name;
    miniPlayer.classList.add("show");

    if(autoplay){
      quranAudio.play().catch(handlePlaybackError);
    }
    renderSurahList(document.getElementById("surahSearchInput").value);
    updatePlayIndicators();
  }

  quranAudio.addEventListener("play", updatePlayIndicators);
  quranAudio.addEventListener("pause", updatePlayIndicators);

  quranAudio.addEventListener("timeupdate", function(){
    if(isSeeking) return;
    var pct = quranAudio.duration ? (quranAudio.currentTime / quranAudio.duration) * 100 : 0;
    document.getElementById("miniPlayerRange").value = pct;
    document.getElementById("miniPlayerCurrent").textContent = formatDuration(quranAudio.currentTime);
    document.getElementById("miniPlayerDuration").textContent = formatDuration(quranAudio.duration);
  });

  quranAudio.addEventListener("ended", function(){
    var nextNumber = currentPlayingSurah + 1;
    if(nextNumber <= 114){
      var nextSurah = SURAHS[nextNumber - 1];
      loadAndPlaySurah(nextSurah[0], nextSurah[1], true);
      showToast("▶ التالي: سورة " + nextSurah[1]);
    }else{
      currentPlayingSurah = null;
      miniPlayer.classList.remove("show");
      renderSurahList(document.getElementById("surahSearchInput").value);
    }
  });

  quranAudio.addEventListener("error", function(){
    if(currentPlayingSurah !== null) handlePlaybackError();
  });

  document.getElementById("miniPlayerToggle").addEventListener("click", function(){
    if(currentPlayingSurah === null) return;
    if(quranAudio.paused){ quranAudio.play().catch(handlePlaybackError); }
    else{ quranAudio.pause(); }
  });

  document.getElementById("miniPlayerStop").addEventListener("click", function(){
    quranAudio.pause();
    quranAudio.removeAttribute("src");
    quranAudio.load();
    currentPlayingSurah = null;
    miniPlayer.classList.remove("show");
    renderSurahList(document.getElementById("surahSearchInput").value);
  });

  var miniRange = document.getElementById("miniPlayerRange");
  miniRange.addEventListener("input", function(){ isSeeking = true; });
  miniRange.addEventListener("change", function(){
    if(quranAudio.duration){
      quranAudio.currentTime = (miniRange.value / 100) * quranAudio.duration;
    }
    isSeeking = false;
  });

  document.getElementById("surahSearchInput").addEventListener("input", function(e){
    renderSurahList(e.target.value);
  });

  /* ================= QURAN TEXT — OFFLINE READING MODE ================= */

  var QURAN_TEXT_CACHE_KEY = "sakina_quran_text_cache_v1";
  var QURAN_READ_PREFS_KEY = "sakina_quran_read_prefs_v1";
  var QURAN_LAST_READ_KEY = "sakina_quran_last_read_v1"; // مُستبدل بـ sakina_quran_progress_v2 أدناه، أُبقي عليه فقط لقراءة أي بيانات قديمة عند الترقية

  var FONT_STYLES = [
    { key:"uthmani", name:"العثماني", cssClass:"font-uthmani" },
    { key:"naskh", name:"خط النسخ", cssClass:"font-naskh" },
    { key:"kufi", name:"الخط الكوفي", cssClass:"font-kufi" }
  ];

  function loadQuranTextCache(){
    try{
      var raw = localStorage.getItem(QURAN_TEXT_CACHE_KEY);
      var parsed = raw ? JSON.parse(raw) : {};
      return (parsed && typeof parsed === "object") ? parsed : {};
    }catch(e){ return {}; }
  }
  function saveQuranTextCache(){ localStorage.setItem(QURAN_TEXT_CACHE_KEY, JSON.stringify(quranTextCache)); }

  var quranTextCache = loadQuranTextCache();

  function loadReadPrefs(){
    try{
      var raw = localStorage.getItem(QURAN_READ_PREFS_KEY);
      var parsed = raw ? JSON.parse(raw) : null;
      if(parsed && parsed.fontStyle && parsed.fontSize){ return parsed; }
    }catch(e){}
    return { fontStyle: "uthmani", fontSize: 22 };
  }
  function saveReadPrefs(){ localStorage.setItem(QURAN_READ_PREFS_KEY, JSON.stringify(readPrefs)); }

  var readPrefs = loadReadPrefs();

  // رقم صفحة المصحف (طبعة المدينة، 604 صفحة) التي تبدأ عندها كل سورة —
  // جدول ثابت ومعروف يُستخدم لتقدير رقم الصفحة بما أن القارئ الحالي
  // يعرض السورة كاملة دون تقسيم فعلي لصفحات، وليس هناك بيانات صفحات
  // حقيقية لكل آية على حدة في هذا الإصدار
  var SURAH_START_PAGE = [
    1,2,50,77,106,128,151,177,187,208,221,235,249,255,262,267,282,293,305,312,
    322,332,342,350,359,367,377,385,396,404,411,415,418,428,434,440,446,453,458,467,
    477,483,489,496,499,502,507,511,515,518,520,523,526,528,531,534,537,542,545,549,
    551,553,554,554,556,558,560,562,564,566,568,570,572,574,575,577,578,580,583,585,
    587,587,589,590,591,591,592,593,594,595,596,597,597,598,599,600,600,601,601,602,
    602,602,603,603,603,604,604,604,604,604,604,604,604,604
  ];

  function getPageForAyah(surahNumber){
    return SURAH_START_PAGE[surahNumber - 1] || 1;
  }

  var QURAN_PROGRESS_KEY = "sakina_quran_progress_v2";

  function loadQuranProgress(){
    try{
      var raw = localStorage.getItem(QURAN_PROGRESS_KEY);
      var parsed = raw ? JSON.parse(raw) : null;
      if(parsed && typeof parsed.surah === "number"){ return parsed; }
    }catch(e){}
    // ترحيل تلقائي لمرة واحدة من المفتاح القديم (سورة فقط) إن وُجد ولم تتوفر بيانات جديدة بعد
    try{
      var oldRaw = localStorage.getItem(QURAN_LAST_READ_KEY);
      var oldParsed = oldRaw ? JSON.parse(oldRaw) : null;
      if(oldParsed && typeof oldParsed.surah === "number"){
        return {
          surah: oldParsed.surah,
          ayah: 1,
          page: getPageForAyah(oldParsed.surah),
          scrollTop: oldParsed.scrollTop || 0,
          updatedAt: Date.now()
        };
      }
    }catch(e){}
    return null;
  }

  function saveQuranProgress(surahNumber, ayahNumber, pageNumber, scrollTop){
    var existing = loadQuranProgress() || {};
    var data = {
      surah: surahNumber,
      ayah: (typeof ayahNumber === "number") ? ayahNumber : (existing.ayah || 1),
      page: (typeof pageNumber === "number") ? pageNumber : getPageForAyah(surahNumber),
      scrollTop: (typeof scrollTop === "number") ? scrollTop : (existing.scrollTop || 0),
      updatedAt: Date.now()
    };
    try{
      localStorage.setItem(QURAN_PROGRESS_KEY, JSON.stringify(data));
    }catch(e){}
    return data;
  }

  var lastRead = loadQuranProgress();
  var currentReadingSurah = (lastRead && lastRead.surah) ? lastRead.surah : 1;
  var mushafScrollSaveHandle = null;

  function getSurahMeta(number){
    var s = SURAHS[number - 1];
    return { number: s[0], name: s[1], ayahCount: s[2], type: s[3] };
  }

  function buildFontStyleChips(){
    var wrap = document.getElementById("fontStyleChips");
    wrap.innerHTML = "";
    FONT_STYLES.forEach(function(f){
      var chip = document.createElement("button");
      chip.className = "chip" + (readPrefs.fontStyle === f.key ? " active" : "");
      chip.textContent = f.name;
      chip.addEventListener("click", function(){
        readPrefs.fontStyle = f.key;
        saveReadPrefs();
        buildFontStyleChips();
        applyFontStyleToCard();
      });
      wrap.appendChild(chip);
    });
  }

  function applyFontStyleToCard(){
    var textEl = document.querySelector("#mushafCard .mushaf-text");
    if(!textEl) return;
    FONT_STYLES.forEach(function(f){ textEl.classList.remove(f.cssClass); });
    var active = FONT_STYLES.filter(function(f){ return f.key === readPrefs.fontStyle; })[0] || FONT_STYLES[0];
    textEl.classList.add(active.cssClass);
  }

  function applyFontSize(){
    document.getElementById("fontSizeLabel").textContent = readPrefs.fontSize;
    var textEl = document.querySelector("#mushafCard .mushaf-text");
    if(textEl){ textEl.style.setProperty("--quran-font-size", readPrefs.fontSize + "px"); }
  }

  document.getElementById("fontSizeDecreaseBtn").addEventListener("click", function(){
    if(readPrefs.fontSize > 16){ readPrefs.fontSize -= 2; saveReadPrefs(); applyFontSize(); }
  });
  document.getElementById("fontSizeIncreaseBtn").addEventListener("click", function(){
    if(readPrefs.fontSize < 40){ readPrefs.fontSize += 2; saveReadPrefs(); applyFontSize(); }
  });

  function buildReadingSurahSelect(){
    var sel = document.getElementById("readingSurahSelect");
    sel.innerHTML = "";
    SURAHS.forEach(function(s){
      var opt = document.createElement("option");
      opt.value = s[0];
      opt.textContent = s[0] + " — سورة " + s[1] + " (" + s[2] + " آية)";
      if(s[0] === currentReadingSurah){ opt.selected = true; }
      sel.appendChild(opt);
    });
  }

  document.getElementById("readingSurahSelect").addEventListener("change", function(e){
    loadSurahForReading(parseInt(e.target.value, 10), 0);
  });

  function renderMushafLoading(){
    var card = document.getElementById("mushafCard");
    card.innerHTML = "<div class=\"mushaf-loading\"><span class=\"spin-icon\">⏳</span>جارٍ تحميل نص السورة لأول مرة عبر الإنترنت لحفظها أوفلاين للأبد...</div>";
  }

  function renderMushafUnavailable(number){
    var meta = getSurahMeta(number);
    var card = document.getElementById("mushafCard");
    card.innerHTML = "<div class=\"mushaf-loading\">📡<br>سورة " + meta.name + " تحتاج اتصالاً بالإنترنت لمرة واحدة فقط لتحميلها، وستكون متاحة أوفلاين نهائياً بعدها.<br><br><button class=\"tasbih-btn\" id=\"retryFetchSurahBtn\" style=\"display:inline-block; width:auto; padding:10px 22px;\">إعادة المحاولة</button></div>";
    var retryBtn = document.getElementById("retryFetchSurahBtn");
    if(retryBtn){
      retryBtn.addEventListener("click", function(){ loadSurahForReading(number, 0); });
    }
  }

  function renderMushafContent(number, ayahs){
    var meta = getSurahMeta(number);
    var card = document.getElementById("mushafCard");
    card.innerHTML = "";

    var header = document.createElement("div");
    header.className = "mushaf-header";
    header.innerHTML = "<div class=\"m-name\">سورة " + meta.name + "</div><div class=\"m-meta\">" + meta.ayahCount + " آية · " + meta.type + "</div>";
    card.appendChild(header);

    if(number !== 1 && number !== 9){
      var basmala = document.createElement("div");
      basmala.className = "basmala-line";
      basmala.textContent = BASMALA_TEXT;
      card.appendChild(basmala);
    }

    var textWrap = document.createElement("div");
    textWrap.className = "mushaf-text";

    ayahs.forEach(function(ayahText, idx){
      var span = document.createElement("span");
      span.className = "ayah-span";
      span.textContent = ayahText;
      span.addEventListener("click", function(){
        openTafsirModal(number, idx + 1, ayahText);
        saveBookmark(number, idx + 1);
      });
      textWrap.appendChild(span);

      var numSpan = document.createElement("span");
      numSpan.className = "ayah-num";
      numSpan.textContent = idx + 1;
      numSpan.addEventListener("click", function(){
        openTafsirModal(number, idx + 1, ayahText);
        saveBookmark(number, idx + 1);
      });
      textWrap.appendChild(numSpan);

      textWrap.appendChild(document.createTextNode(" "));
    });

    card.appendChild(textWrap);

    var note = document.createElement("div");
    note.className = "mushaf-offline-note";
    note.textContent = "✅ هذه السورة محفوظة على جهازك وتعمل أوفلاين بالكامل من الآن فصاعداً";
    card.appendChild(note);

    applyFontStyleToCard();
    applyFontSize();
  }

  function fetchAndCacheSurah(number, onSuccess, onFailure){
    var url = "https://api.alquran.cloud/v1/surah/" + number + "/quran-uthmani";
    fetch(url).then(function(response){
      if(!response.ok) throw new Error("network response not ok");
      return response.json();
    }).then(function(data){
      if(!data || !data.data || !Array.isArray(data.data.ayahs)) throw new Error("unexpected response shape");
      var ayahs = data.data.ayahs.map(function(a){ return a.text; });
      quranTextCache[number] = ayahs;
      saveQuranTextCache();
      onSuccess(ayahs);
    }).catch(function(){
      onFailure();
    });
  }

  function loadSurahForReading(number, scrollToSaved){
    currentReadingSurah = number;
    document.getElementById("readingSurahSelect").value = number;

    if(QURAN_TEXT_EMBEDDED[number]){
      renderMushafContent(number, QURAN_TEXT_EMBEDDED[number]);
      restoreBookmark();
    }else if(quranTextCache[number]){
      renderMushafContent(number, quranTextCache[number]);
      restoreBookmark();
    }else{
      renderMushafLoading();
      fetchAndCacheSurah(number, function(ayahs){
        renderMushafContent(number, ayahs);
        restoreBookmark();
      }, function(){
        renderMushafUnavailable(number);
      });
    }

    // إن كانت هذه سورة جديدة مختلفة عن آخر تقدّم محفوظ، نبدأ تقدماً جديداً لها
    // (آية 1، صفحتها الأولى)؛ أما إعادة فتح نفس السورة المحفوظة فتُبقي على آيتها المحفوظة
    var existingProgress = loadQuranProgress();
    if(!existingProgress || existingProgress.surah !== number){
      lastRead = saveQuranProgress(number, 1, getPageForAyah(number), 0);
    }else{
      lastRead = existingProgress;
    }
    hideContinueReadingBanner();

    if(scrollToSaved){
      setTimeout(function(){ window.scrollTo({ top: scrollToSaved, behavior: "smooth" }); }, 300);
    }
  }

  function hideContinueReadingBanner(){
    document.getElementById("continueReadingBanner").classList.remove("show");
  }

  function checkContinueReadingBanner(){
    if(lastRead && lastRead.surah && lastRead.surah !== currentReadingSurah){
      var meta = getSurahMeta(lastRead.surah);
      document.getElementById("continueReadingSurahName").textContent = "سورة " + meta.name;
      document.getElementById("continueReadingBanner").classList.add("show");
    }
  }

  document.getElementById("continueReadingBtn").addEventListener("click", function(){
    var target = lastRead.surah;
    var scrollTop = lastRead.scrollTop || 0;
    hideContinueReadingBanner();
    loadSurahForReading(target, scrollTop);
  });

  function saveReadingScrollPosition(){
    if(!lastRead || lastRead.surah !== currentReadingSurah) return;
    lastRead = saveQuranProgress(currentReadingSurah, lastRead.ayah, lastRead.page, window.scrollY);
  }

  window.addEventListener("scroll", function(){
    var readSection = document.getElementById("quranReadSection");
    if(readSection.style.display === "none") return;
    var quranView = document.getElementById("view-quran");
    if(quranView.classList.contains("hidden")) return;
    clearTimeout(mushafScrollSaveHandle);
    mushafScrollSaveHandle = setTimeout(saveReadingScrollPosition, 400);
  });

  function switchQuranMode(mode){
    var readBtn = document.getElementById("quranModeReadBtn");
    var listenBtn = document.getElementById("quranModeListenBtn");
    var readSection = document.getElementById("quranReadSection");
    var listenSection = document.getElementById("quranListenSection");

    if(mode === "read"){
      readBtn.classList.add("active");
      listenBtn.classList.remove("active");
      readSection.style.display = "block";
      listenSection.style.display = "none";
    }else{
      readBtn.classList.remove("active");
      listenBtn.classList.add("active");
      readSection.style.display = "none";
      listenSection.style.display = "block";
    }
  }

  document.getElementById("quranModeReadBtn").addEventListener("click", function(){ switchQuranMode("read"); });
  document.getElementById("quranModeListenBtn").addEventListener("click", function(){ switchQuranMode("listen"); });

  function initReadingMode(){
    buildReadingSurahSelect();
    buildFontStyleChips();
    document.getElementById("fontSizeLabel").textContent = readPrefs.fontSize;
    loadSurahForReading(currentReadingSurah, 0);
    if(lastRead){ checkContinueReadingBanner(); }
  }

  /* ================= TAFSIR MODAL & PER-AYAH AUDIO ================= */

  var TAFSIR_CACHE_KEY = "sakina_tafsir_cache_v1";
  var tafsirOverlay = document.getElementById("tafsirOverlay");
  var ayahAudio = document.getElementById("ayahAudio");
  var currentTafsirSurah = null;
  var currentTafsirAyah = null;

  var EVERYAYAH_FOLDERS = {
    afs: "Alafasy_128kbps",
    husary: "Husary_128kbps",
    shur: "Saood_ash-Shuraym_128kbps",
    gmd: "Ghamadi_40kbps",
    basit: "Abdul_Basit_Murattal_192kbps",
    minshawi: "Minshawy_Murattal_128kbps"
  };

  function loadTafsirCache(){
    try{
      var raw = localStorage.getItem(TAFSIR_CACHE_KEY);
      var parsed = raw ? JSON.parse(raw) : {};
      return (parsed && typeof parsed === "object") ? parsed : {};
    }catch(e){ return {}; }
  }
  function saveTafsirCache(){ localStorage.setItem(TAFSIR_CACHE_KEY, JSON.stringify(tafsirCache)); }

  var tafsirCache = loadTafsirCache();

  function extractTafsirText(data){
    if(!data) return null;
    if(typeof data === "string" && data.trim() !== "") return data;
    if(typeof data.text === "string" && data.text.trim() !== "") return data.text;
    if(typeof data.tafsir === "string" && data.tafsir.trim() !== "") return data.tafsir;
    if(typeof data.content === "string" && data.content.trim() !== "") return data.content;
    if(data.data && typeof data.data.text === "string") return data.data.text;
    return null;
  }

  function fetchFromUrl(url){
    return fetch(url).then(function(response){
      if(!response.ok) throw new Error("network response not ok");
      return response.json();
    });
  }

  function fetchTafsir(surahNumber, ayahNumber, onSuccess, onFailure){
    var cacheKey = surahNumber + ":" + ayahNumber;
    if(tafsirCache[cacheKey]){
      onSuccess(tafsirCache[cacheKey]);
      return;
    }

    var primaryUrl = "https://cdn.jsdelivr.net/gh/spa5k/tafsir_api@main/tafsir/ar-tafsir-muyassar/" + surahNumber + "/" + ayahNumber + ".json";
    var fallbackUrl = "https://raw.githubusercontent.com/spa5k/tafsir_api/main/tafsir/ar-tafsir-muyassar/" + surahNumber + "/" + ayahNumber + ".json";

    fetchFromUrl(primaryUrl).then(function(data){
      var text = extractTafsirText(data);
      if(!text) throw new Error("unexpected response shape");
      tafsirCache[cacheKey] = text;
      saveTafsirCache();
      onSuccess(text);
    }).catch(function(){
      fetchFromUrl(fallbackUrl).then(function(data){
        var text = extractTafsirText(data);
        if(!text) throw new Error("unexpected response shape");
        tafsirCache[cacheKey] = text;
        saveTafsirCache();
        onSuccess(text);
      }).catch(function(){
        onFailure();
      });
    });
  }

  function openTafsirModal(surahNumber, ayahNumber, ayahText){
    currentTafsirSurah = surahNumber;
    currentTafsirAyah = ayahNumber;

    var meta = getSurahMeta(surahNumber);
    document.getElementById("tafsirTitle").textContent = "📖 تفسير الآية " + ayahNumber;

    var ayahBox = document.getElementById("tafsirAyahBox");
    ayahBox.innerHTML = "<div class=\"t-surah\">سورة " + meta.name + " — آية " + ayahNumber + "</div><div class=\"t-ayah\">" + ayahText + "</div>";

    var bodyEl = document.getElementById("tafsirBody");
    bodyEl.innerHTML = "<div class=\"mushaf-loading\"><span class=\"spin-icon\">⏳</span>جارٍ تحميل التفسير الميسر...</div>";

    tafsirOverlay.classList.add("show");

    fetchTafsir(surahNumber, ayahNumber, function(text){
      if(currentTafsirSurah === surahNumber && currentTafsirAyah === ayahNumber){
        bodyEl.textContent = text;
      }
    }, function(){
      if(currentTafsirSurah === surahNumber && currentTafsirAyah === ayahNumber){
        bodyEl.innerHTML = "<div class=\"mushaf-loading\">📡<br>يتطلب تحميل التفسير اتصالاً بالإنترنت لأول مرة، ثم يُحفظ أوفلاين للأبد. تحقق من اتصالك وأعد المحاولة.<br><br><button class=\"tasbih-btn\" id=\"retryTafsirBtn\" style=\"display:inline-block; width:auto; padding:10px 22px;\">إعادة المحاولة</button></div>";
        var retryBtn = document.getElementById("retryTafsirBtn");
        if(retryBtn){
          retryBtn.addEventListener("click", function(){ openTafsirModal(surahNumber, ayahNumber, ayahText); });
        }
      }
    });
  }

  function closeTafsirModal(){
    tafsirOverlay.classList.remove("show");
    ayahAudio.pause();
    currentTafsirSurah = null;
    currentTafsirAyah = null;
  }

  document.getElementById("tafsirCloseBtn").addEventListener("click", closeTafsirModal);
  tafsirOverlay.addEventListener("click", function(e){ if(e.target === tafsirOverlay) closeTafsirModal(); });

  document.getElementById("tafsirListenBtn").addEventListener("click", function(){
    if(currentTafsirSurah === null || currentTafsirAyah === null) return;

    var folder = EVERYAYAH_FOLDERS[currentReciterKey];
    var usedFallback = false;
    if(!folder){
      folder = EVERYAYAH_FOLDERS.afs;
      usedFallback = true;
    }

    var url = "https://everyayah.com/data/" + folder + "/" + pad3(currentTafsirSurah) + pad3(currentTafsirAyah) + ".mp3";
    ayahAudio.src = url;
    ayahAudio.play().then(function(){
      if(usedFallback){
        showToast("ℹ️ هذا القارئ لا يوفر تسجيل آيات مفردة، تم التشغيل بصوت مشاري العفاسي");
      }
    }).catch(function(){
      showToast("⚠️ تعذّر تشغيل صوت الآية، تحقق من اتصالك بالإنترنت");
    });
  });

  ayahAudio.addEventListener("error", function(){
    if(currentTafsirSurah !== null){
      showToast("⚠️ تعذّر تحميل صوت هذه الآية");
    }
  });

  /* ================= SETTINGS ================= */

  var THEME_KEY = "sakina_theme_v1";

  var THEMES = [
    { key:"default", name:"الداكن الملكي", swatch:"linear-gradient(135deg, #080d17, #14b8a6, #d4af37)" },
    { key:"emerald", name:"الأخضر الزمردي", swatch:"linear-gradient(135deg, #071510, #10b981, #34d399)" },
    { key:"oled", name:"الأسود الصافي", swatch:"linear-gradient(135deg, #000000, #1a1a1a, #d4af37)" },
    { key:"navy", name:"الأزرق الكحلي", swatch:"linear-gradient(135deg, #050b1a, #3b82f6, #d4af37)" },
    { key:"sand", name:"الصحراوي الدافئ", swatch:"linear-gradient(135deg, #1a120b, #d97706, #f5d68a)" }
  ];

  var VALID_THEME_KEYS = THEMES.map(function(t){ return t.key; });

  function loadTheme(){
    try{
      var saved = localStorage.getItem(THEME_KEY);
      if(VALID_THEME_KEYS.indexOf(saved) !== -1) return saved;
    }catch(e){}
    return "default";
  }
  var currentTheme = loadTheme();

  function applyTheme(themeKey){
    currentTheme = themeKey;
    document.body.className = themeKey === "default" ? "" : "theme-" + themeKey;
    localStorage.setItem(THEME_KEY, themeKey);
  }

  function buildThemeGrid(){
    var wrap = document.getElementById("themeGrid");
    wrap.innerHTML = "";
    THEMES.forEach(function(t){
      var card = document.createElement("div");
      card.className = "theme-card" + (currentTheme === t.key ? " active" : "");

      var swatch = document.createElement("div");
      swatch.className = "theme-swatch";
      swatch.style.background = t.swatch;

      var name = document.createElement("div");
      name.className = "t-name";
      name.textContent = t.name;

      card.appendChild(swatch);
      card.appendChild(name);

      card.addEventListener("click", function(){
        applyTheme(t.key);
        buildThemeGrid();
        showToast("🎨 تم تطبيق ثيم \"" + t.name + "\"");
      });

      wrap.appendChild(card);
    });
  }

  var vibrationToggleEl = document.getElementById("vibrationToggle");

  function renderVibrationToggle(){
    vibrationToggleEl.classList.toggle("on", vibrationEnabled);
  }

  vibrationToggleEl.addEventListener("click", function(){
    vibrationEnabled = !vibrationEnabled;
    localStorage.setItem(VIBRATION_KEY, vibrationEnabled ? "1" : "0");
    renderVibrationToggle();
    if(vibrationEnabled){ vibrate(15); }
    showToast(vibrationEnabled ? "🔔 تم تفعيل الاهتزاز" : "🔕 تم إيقاف الاهتزاز");
  });

  /* ================= PRAYER NOTIFICATIONS ================= */

  var PRAYER_NOTIF_KEY = "sakina_prayer_notif_v1";
  var PRAYER_FIRED_LOG_KEY = "sakina_prayer_fired_log_v1";
  var NOTIF_PRAYER_KEYS = ["fajr", "dhuhr", "asr", "maghrib", "isha"];
  var NOTIF_PRAYER_LABELS = { fajr:"الفجر", dhuhr:"الظهر", asr:"العصر", maghrib:"المغرب", isha:"العشاء" };

  function loadNotifPrefs(){
    try{
      var raw = localStorage.getItem(PRAYER_NOTIF_KEY);
      var parsed = raw ? JSON.parse(raw) : null;
      if(parsed && typeof parsed === "object") return parsed;
    }catch(e){}
    return { fajr:false, dhuhr:false, asr:false, maghrib:false, isha:false };
  }
  function saveNotifPrefs(){ localStorage.setItem(PRAYER_NOTIF_KEY, JSON.stringify(notifPrefs)); }

  function loadFiredLog(){
    try{
      var raw = localStorage.getItem(PRAYER_FIRED_LOG_KEY);
      var parsed = raw ? JSON.parse(raw) : null;
      if(parsed && typeof parsed === "object") return parsed;
    }catch(e){}
    return {};
  }
  function saveFiredLog(){ localStorage.setItem(PRAYER_FIRED_LOG_KEY, JSON.stringify(firedLog)); }

  var notifPrefs = loadNotifPrefs();
  var firedLog = loadFiredLog();
  var notifPermissionNote = document.getElementById("notifPermissionNote");
  var notifHttpsWarning = document.getElementById("notifHttpsWarning");
  var enableNotifBtn = document.getElementById("enableNotifBtn");

  function renderNotifToggles(){
    NOTIF_PRAYER_KEYS.forEach(function(key){
      var el = document.getElementById("notifToggle-" + key);
      if(el){ el.classList.toggle("on", !!notifPrefs[key]); }
    });
  }

  function anyNotifEnabled(){
    return NOTIF_PRAYER_KEYS.some(function(k){ return !!notifPrefs[k]; });
  }

  function updateEnableNotifBtnVisibility(){
    if(!("Notification" in window)){
      enableNotifBtn.style.display = "none";
      return;
    }
    if(Notification.permission === "denied"){
      enableNotifBtn.style.display = "none";
      return;
    }
    var shouldShow = (Notification.permission === "default") || !anyNotifEnabled();
    enableNotifBtn.style.display = shouldShow ? "block" : "none";
  }

  function updateHttpsWarning(){
    var isLocalFile = window.location.protocol === "file:";
    notifHttpsWarning.style.display = isLocalFile ? "block" : "none";
  }

  function updatePermissionNote(){
    if(!("Notification" in window)){
      notifPermissionNote.style.display = "block";
      notifPermissionNote.textContent = "⚠️ متصفحك الحالي لا يدعم الإشعارات، ستحتاج متصفحاً حديثاً لهذه الميزة.";
      return;
    }
    if(Notification.permission === "denied"){
      notifPermissionNote.style.display = "block";
      notifPermissionNote.textContent = "⚠️ الإشعارات مرفوضة من إعدادات المتصفح، فعّلها يدوياً من إعدادات الموقع لتصلك تنبيهات الأذان.";
    }else if(Notification.permission === "default"){
      notifPermissionNote.style.display = "block";
      notifPermissionNote.textContent = "ℹ️ اضغط على زر \"تفعيل الإشعارات\" أعلاه للسماح بتنبيهات الأذان.";
    }else{
      notifPermissionNote.style.display = "none";
    }
  }

  function requestNotificationPermissionIfNeeded(onGranted){
    if(!("Notification" in window)){
      showToast("⚠️ متصفحك لا يدعم الإشعارات");
      return;
    }
    if(Notification.permission === "granted"){
      onGranted();
      return;
    }
    if(Notification.permission === "denied"){
      showToast("⚠️ الإشعارات مرفوضة، فعّلها من إعدادات المتصفح للموقع");
      updatePermissionNote();
      updateEnableNotifBtnVisibility();
      return;
    }
    Notification.requestPermission().then(function(result){
      updatePermissionNote();
      updateEnableNotifBtnVisibility();
      if(result === "granted"){
        onGranted();
        showToast("✅ تم تفعيل إشعارات الأذان");
      }else{
        showToast("⚠️ لن تصلك تنبيهات الأذان بدون السماح بالإشعارات");
      }
    });
  }

  enableNotifBtn.addEventListener("click", function(){
    if(!("Notification" in window)){
      showToast("⚠️ متصفحك لا يدعم الإشعارات");
      return;
    }
    if(Notification.permission === "denied"){
      showToast("⚠️ الإشعارات مرفوضة، فعّلها يدوياً من إعدادات المتصفح للموقع");
      updatePermissionNote();
      updateEnableNotifBtnVisibility();
      return;
    }
    Notification.requestPermission().then(function(result){
      updatePermissionNote();
      if(result === "granted"){
        NOTIF_PRAYER_KEYS.forEach(function(key){ notifPrefs[key] = true; });
        saveNotifPrefs();
        renderNotifToggles();
        showToast("✅ تم تفعيل إشعارات الأذان لجميع الصلوات");
      }else{
        showToast("⚠️ لن تصلك تنبيهات الأذان بدون السماح بالإشعارات");
      }
      updateEnableNotifBtnVisibility();
    });
  });

  NOTIF_PRAYER_KEYS.forEach(function(key){
    var el = document.getElementById("notifToggle-" + key);
    el.addEventListener("click", function(){
      var turningOn = !notifPrefs[key];
      if(turningOn){
        requestNotificationPermissionIfNeeded(function(){
          notifPrefs[key] = true;
          saveNotifPrefs();
          renderNotifToggles();
          updateEnableNotifBtnVisibility();
        });
      }else{
        notifPrefs[key] = false;
        saveNotifPrefs();
        renderNotifToggles();
        updateEnableNotifBtnVisibility();
      }
    });
  });

  var adhanAudioCtx = null;

  function playAdhanTone(){
    try{
      if(!adhanAudioCtx){ adhanAudioCtx = new (window.AudioContext || window.webkitAudioContext)(); }
      var ctx = adhanAudioCtx;
      var now = ctx.currentTime;
      var notes = [660, 880, 990];
      notes.forEach(function(freq, idx){
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = freq;
        var startAt = now + idx * 0.42;
        gain.gain.setValueAtTime(0, startAt);
        gain.gain.linearRampToValueAtTime(0.22, startAt + 0.06);
        gain.gain.linearRampToValueAtTime(0, startAt + 0.38);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startAt);
        osc.stop(startAt + 0.4);
      });
    }catch(e){}
  }

  function fireAdhanNotification(prayerKey){
    var label = NOTIF_PRAYER_LABELS[prayerKey];
    playAdhanTone();
    vibrate([200, 100, 200, 100, 200]);
    if("Notification" in window && Notification.permission === "granted"){
      try{
        new Notification("حان الآن وقت صلاة " + label, {
          body: "سَكينة — حي على الصلاة، حي على الفلاح",
          tag: "sakina-prayer-" + prayerKey,
          silent: false
        });
      }catch(e){}
    }
    showToast("🕌 حان الآن وقت صلاة " + label);
  }

  function checkPrayerNotifications(){
    if(!prayerSettings) return;
    var anyEnabled = NOTIF_PRAYER_KEYS.some(function(k){ return notifPrefs[k]; });
    if(!anyEnabled) return;

    var method = CALC_METHODS[prayerSettings.method] || CALC_METHODS.mwl;
    var tz = prayerSettings.tz;
    var cityDate = shiftedNow(tz);
    var y = cityDate.getUTCFullYear(), m = cityDate.getUTCMonth() + 1, d = cityDate.getUTCDate();
    var times = computeTimes(y, m, d, prayerSettings.lat, prayerSettings.lng, tz, method, prayerSettings.madhab);

    var todayStamp = y + "-" + pad(m) + "-" + pad(d);
    var nowH = cityDate.getUTCHours();
    var nowM = cityDate.getUTCMinutes();

    NOTIF_PRAYER_KEYS.forEach(function(key){
      if(!notifPrefs[key]) return;
      var decimal = times[key];
      var prayerH = Math.floor(decimal);
      var prayerM = Math.round((decimal - prayerH) * 60);
      if(prayerM === 60){ prayerM = 0; prayerH = (prayerH + 1) % 24; }

      var logKey = todayStamp + "_" + key;
      if(nowH === prayerH && nowM === prayerM && !firedLog[logKey]){
        firedLog[logKey] = true;
        saveFiredLog();
        fireAdhanNotification(key);
      }
    });
  }

  setInterval(checkPrayerNotifications, 20000);

  renderNotifToggles();
  updatePermissionNote();
  updateEnableNotifBtnVisibility();
  updateHttpsWarning();

  /* ================= DAILY HADITH ================= */

  var HADITH_DATA = [
    {
      text: "إنما الأعمال بالنيات، وإنما لكل امرئ ما نوى",
      source: "متفق عليه، عن عمر بن الخطاب رضي الله عنه",
      explanation: "هذا الحديث أصل عظيم من أصول الدين، يبيّن أن قيمة العمل وقبوله عند الله مرتبطان بالنية الصادقة الكامنة في القلب، لا بصورته الظاهرة فقط. فالعمل الواحد قد يكون عبادة عظيمة أو عادة لا أجر فيها بحسب ما نواه صاحبه.",
      benefits: ["تصحيح النية شرط أساسي لقبول العمل عند الله", "العمل الواحد قد يكون عبادة أو عادة بحسب النية", "الإخلاص يرفع قيمة الأعمال الصغيرة ويضاعف أجرها"]
    },
    {
      text: "المسلم من سلم المسلمون من لسانه ويده، والمهاجر من هجر ما نهى الله عنه",
      source: "رواه البخاري، عن عبد الله بن عمرو رضي الله عنهما",
      explanation: "يرسم هذا الحديث معياراً عملياً للمسلم الحقيقي، وهو سلامة الناس من أذاه القولي والفعلي، فالإسلام دين سلام ورحمة قبل أن يكون مجرد شعارات تُقال.",
      benefits: ["ضبط اللسان من أعظم علامات كمال الإيمان", "الأذى الجسدي واللفظي كلاهما محرّم شرعاً", "الهجرة الحقيقية هي هجران المعاصي والذنوب"]
    },
    {
      text: "لا يؤمن أحدكم حتى يحب لأخيه ما يحب لنفسه",
      source: "متفق عليه، عن أنس بن مالك رضي الله عنه",
      explanation: "يربط هذا الحديث كمال الإيمان بمعاملة الآخرين بنفس ما نحب لأنفسنا من خير، وهو أساس عظيم من أسس التكافل والمحبة بين المسلمين.",
      benefits: ["حب الخير للناس علامة من علامات كمال الإيمان", "معيار عملي بسيط لمحاسبة النفس يومياً", "يقوّي الروابط الاجتماعية بين أفراد المجتمع المسلم"]
    },
    {
      text: "من حسن إسلام المرء تركه ما لا يعنيه",
      source: "رواه الترمذي وحسّنه الإمام النووي، عن أبي هريرة رضي الله عنه",
      explanation: "يدعو هذا الحديث إلى ضبط الوقت والجهد فيما ينفع، والابتعاد عن الفضول والانشغال بما لا فائدة منه دينياً ولا دنيوياً.",
      benefits: ["توجيه الطاقة والوقت نحو ما ينفع في الدنيا والآخرة", "تقليل الخلافات الناتجة عن التدخل فيما لا يعني المرء", "علامة من علامات نضج الشخصية المسلمة"]
    },
    {
      text: "الدين النصيحة، قلنا: لمن؟ قال: لله ولكتابه ولرسوله ولأئمة المسلمين وعامتهم",
      source: "رواه مسلم، عن تميم الداري رضي الله عنه",
      explanation: "يبيّن الحديث أن الدين قائم على النصح المتبادل بين الناس، لله ولكتابه ولرسوله وللمسؤولين وعامة المسلمين، فهو محور تماسك الأمة وصلاحها.",
      benefits: ["النصيحة حق متبادل بين جميع أفراد المجتمع", "تشمل النصيحة جميع مناحي الحياة الدينية والدنيوية", "أداء الأمانة في النصح دليل على صدق الإيمان"]
    },
    {
      text: "بُني الإسلام على خمس: شهادة أن لا إله إلا الله وأن محمداً رسول الله، وإقام الصلاة، وإيتاء الزكاة، وحج البيت، وصوم رمضان",
      source: "متفق عليه، عن عبد الله بن عمر رضي الله عنهما",
      explanation: "يجمع هذا الحديث أركان الإسلام العملية الخمسة في نسق واحد، وهي الأساس الذي يقوم عليه بنيان الدين كله.",
      benefits: ["فهم شامل ومنظّم لأركان الدين الأساسية", "الشهادتان أصل تقوم عليه بقية الأركان", "توازن بين العبادات البدنية والمالية والزمنية"]
    },
    {
      text: "الطهور شطر الإيمان، والحمد لله تملأ الميزان، وسبحان الله والحمد لله تملآن -أو تملأ- ما بين السماوات والأرض، والصلاة نور، والصدقة برهان، والصبر ضياء",
      source: "رواه مسلم، عن أبي مالك الأشعري رضي الله عنه",
      explanation: "يبيّن الحديث المكانة العظيمة لعدد من العبادات والأذكار، وأن كل واحدة منها لها أثر عظيم في ميزان العبد يوم القيامة.",
      benefits: ["الاهتمام بالطهارة الحسية والمعنوية جزء من الإيمان", "الحمد لله والتسبيح من أثقل الأعمال في الميزان", "الصبر نور يهدي صاحبه في الشدائد"]
    },
    {
      text: "من كان يؤمن بالله واليوم الآخر فليقل خيراً أو ليصمت، ومن كان يؤمن بالله واليوم الآخر فليكرم جاره، ومن كان يؤمن بالله واليوم الآخر فليكرم ضيفه",
      source: "متفق عليه، عن أبي هريرة رضي الله عنه",
      explanation: "يربط الحديث بين الإيمان الصادق وحسن الكلام وإكرام الجار والضيف، فهذه سلوكيات عملية تعكس حقيقة الإيمان المستقر في القلب.",
      benefits: ["الكلام الطيب أو الصمت خير من كثرة الكلام السيء", "إكرام الجار من علامات كمال الإيمان", "حسن الضيافة خلق نبوي أصيل ينبغي التمسك به"]
    },
    {
      text: "لا ضرر ولا ضرار",
      source: "رواه ابن ماجه، عن عبد الله بن عباس رضي الله عنهما",
      explanation: "قاعدة فقهية عظيمة تنظم العلاقات بين الناس، وتمنع الإنسان من إيذاء نفسه أو غيره ابتداءً، وتمنع مقابلة الضرر بضرر مثله.",
      benefits: ["أساس لكثير من الأحكام الفقهية في المعاملات", "يحمي حقوق الأفراد والمجتمع من التعدي", "يشجع على حل النزاعات بالعدل لا بالانتقام"]
    },
    {
      text: "تبسمك في وجه أخيك لك صدقة",
      source: "رواه الترمذي، عن أبي ذر رضي الله عنه",
      explanation: "يوسّع هذا الحديث مفهوم الصدقة ليشمل الأفعال البسيطة كالابتسامة، مما يشجع على نشر البِشر والألفة بين المسلمين.",
      benefits: ["الأعمال الصغيرة اليسيرة قد تكون عظيمة الأجر عند الله", "التبسم يقوي الروابط الاجتماعية بين الناس", "الصدقة ليست مالاً فقط بل تشمل كل معروف"]
    },
    {
      text: "قال الله تعالى: أنا عند ظن عبدي بي، وأنا معه إذا ذكرني",
      source: "متفق عليه، حديث قدسي عن أبي هريرة رضي الله عنه",
      explanation: "يبشّر هذا الحديث القدسي بأن الله تعالى عند حسن ظن عبده به، فكلما أحسن العبد الظن بربه وأكثر من ذكره، كان أقرب إلى رحمته وفرجه.",
      benefits: ["حسن الظن بالله سبب لجلب الرحمة والفرج", "الذكر سبب لقرب الله من عبده", "يبعث الأمل والطمأنينة في قلب المؤمن"]
    },
    {
      text: "من سلك طريقاً يلتمس فيه علماً سهّل الله له به طريقاً إلى الجنة",
      source: "رواه مسلم، عن أبي هريرة رضي الله عنه",
      explanation: "يبين هذا الحديث فضل طلب العلم الشرعي، وأن الله ييسر لطالبه أسباب الوصول إلى الجنة، تشجيعاً على العلم والتعلم والمثابرة عليه.",
      benefits: ["طلب العلم عبادة عظيمة يثاب عليها المسلم", "العلم طريق مباشر لتيسير أمور الآخرة", "يحث الحديث على الجد والمثابرة في طلب العلم"]
    },
    {
      text: "من أحب أن يبسط له في رزقه، ويُنسأ له في أثره، فليصل رحمه",
      source: "متفق عليه، عن أنس بن مالك رضي الله عنه",
      explanation: "يربط الحديث بين صلة الرحم وبركة الرزق وطول العمر، وهو حث عظيم على تقوية الروابط الأسرية والحرص على التواصل معها.",
      benefits: ["صلة الرحم سبب لبركة الرزق وطول العمر", "تقوية الروابط الأسرية والاجتماعية بين الأقارب", "قطيعة الرحم من كبائر الذنوب فينبغي اجتنابها"]
    },
    {
      text: "ما نقصت صدقة من مال، وما زاد الله عبداً بعفو إلا عزاً، وما تواضع أحد لله إلا رفعه الله",
      source: "رواه مسلم، عن أبي هريرة رضي الله عنه",
      explanation: "يطمئن هذا الحديث المتصدق بأن الصدقة سبب للبركة لا للنقصان، وأن العفو والتواضع سببان للعزة والرفعة عند الله لا للذلة.",
      benefits: ["الصدقة سبب للبركة في المال لا لنقصانه", "العفو عن الناس سبب لزيادة العزة", "التواضع سبب للرفعة عند الله سبحانه"]
    },
    {
      text: "من نفّس عن مؤمن كربة من كرب الدنيا، نفّس الله عنه كربة من كرب يوم القيامة",
      source: "رواه مسلم، عن أبي هريرة رضي الله عنه",
      explanation: "يحث الحديث على التعاون بين المسلمين وتفريج الكروب عن بعضهم البعض، مبيناً أن الجزاء عند الله من جنس العمل.",
      benefits: ["الجزاء من جنس العمل عند الله تعالى", "التيسير على الناس سبب للتيسير على العبد يوم القيامة", "التعاون الاجتماعي من أعظم القربات إلى الله"]
    },
    {
      text: "لا يستقيم إيمان عبد حتى يستقيم قلبه، ولا يستقيم قلبه حتى يستقيم لسانه",
      source: "رواه أحمد، عن أنس بن مالك رضي الله عنه",
      explanation: "يربط هذا الحديث بين استقامة القلب واستقامة اللسان، فصلاح الكلام انعكاس مباشر لصلاح الباطن وسلامته.",
      benefits: ["اللسان مرآة تعكس ما يستقر في القلب", "ضبط الكلام خطوة أولى نحو ضبط القلب", "الاستقامة منظومة متكاملة تبدأ من الداخل"]
    },
    {
      text: "إن الله يحب إذا عمل أحدكم عملاً أن يتقنه",
      source: "رواه الطبراني والبيهقي بأسانيد حسنة",
      explanation: "يحث الحديث على إتقان العمل مهما كان صغيراً، فالإتقان عبادة يحبها الله ويرضاها من عباده في كل شؤون حياتهم.",
      benefits: ["الإتقان في العمل عبادة يحبها الله سبحانه", "لا يقتصر الإتقان على العبادات بل يشمل كل عمل", "الجودة والإحسان في العمل من أخلاق المسلم"]
    },
    {
      text: "رضا الرب في رضا الوالد، وسخط الرب في سخط الوالد",
      source: "رواه الترمذي وابن حبان، عن عبد الله بن عمرو رضي الله عنهما",
      explanation: "يبين الحديث المكانة العظيمة لرضا الوالدين، وأنه مرتبط ارتباطاً وثيقاً برضا الله تعالى عن العبد وقبول عمله.",
      benefits: ["بر الوالدين سبب عظيم لرضا الله عن العبد", "عقوق الوالدين من أكبر الكبائر فينبغي الحذر منه", "طاعة الوالدين واجبة في غير معصية الله"]
    },
    {
      text: "أكثروا ذكر هاذم اللذات -يعني: الموت-",
      source: "رواه الترمذي والنسائي، عن أبي هريرة رضي الله عنه",
      explanation: "يوصي النبي صلى الله عليه وسلم بالإكثار من تذكر الموت، لأنه يزهّد في الدنيا الفانية، ويحث صاحبه على الاستعداد للآخرة الباقية.",
      benefits: ["تذكر الموت يزهد القلب في ملذات الدنيا الزائلة", "يدفع صاحبه للمبادرة بالأعمال الصالحة", "يهذب النفس ويقلل التعلق الزائد بالدنيا"]
    },
    {
      text: "أوصني، قال: لا تغضب، فردد مراراً، قال: لا تغضب",
      source: "رواه البخاري، عن أبي هريرة رضي الله عنه",
      explanation: "وصية نبوية جامعة، إذ اختصر النبي صلى الله عليه وسلم طريق النجاة في كلمة واحدة، لأن الغضب أصل كثير من الشرور والمشكلات بين الناس.",
      benefits: ["كظم الغضب من أعظم صفات المؤمن الصادق", "تجنب الغضب يقي من كثير من الذنوب والندم", "تكرار الوصية في الحديث يدل على شدة أهميتها"]
    }
  ];

  function getDayOfYear(date){
    var start = new Date(date.getFullYear(), 0, 0);
    var diff = date - start;
    var oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  }

  function getTodayHadith(){
    var dayIndex = getDayOfYear(new Date());
    var idx = dayIndex % HADITH_DATA.length;
    return HADITH_DATA[idx];
  }

  var dailyHadithCard = document.getElementById("dailyHadithCard");
  var hadithOverlay = document.getElementById("hadithOverlay");
  var currentHadith = null;

  function renderDailyHadith(){
    currentHadith = getTodayHadith();
    document.getElementById("dailyHadithText").textContent = "«" + currentHadith.text + "»";
    document.getElementById("dailyHadithSource").textContent = currentHadith.source;
  }

  function openHadithModal(){
    if(!currentHadith) return;
    document.getElementById("hadithModalText").textContent = "«" + currentHadith.text + "»";
    document.getElementById("hadithModalSource").textContent = currentHadith.source;

    var benefitsHtml = "";
    currentHadith.benefits.forEach(function(b){ benefitsHtml += "<li>" + b + "</li>"; });

    document.getElementById("hadithModalBody").innerHTML =
      "<span class=\"hadith-body-label\">📝 الشرح المبسط</span>" +
      "<p>" + currentHadith.explanation + "</p>" +
      "<span class=\"hadith-body-label\" style=\"margin-top:14px;\">✨ الفوائد المستفادة</span>" +
      "<ul class=\"hadith-benefits-list\">" + benefitsHtml + "</ul>";

    hadithOverlay.classList.add("show");
  }

  function closeHadithModal(){
    hadithOverlay.classList.remove("show");
  }

  dailyHadithCard.addEventListener("click", openHadithModal);
  document.getElementById("hadithCloseBtn").addEventListener("click", closeHadithModal);
  hadithOverlay.addEventListener("click", function(e){ if(e.target === hadithOverlay) closeHadithModal(); });

  /* ================= MOUNAJA WA SAKINA — PSYCHOLOGICAL STATES & DUAS ================= */

  var MOUNAJA_DATA = [
    {
      id: "anxiety", icon: "😟", title: "القلق والتوتر",
      ayahText: "الَّذِينَ آمَنُوا وَتَطْمَئِنُّ قُلُوبُهُم بِذِكْرِ اللَّهِ ۗ أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
      ayahRef: "سورة الرعد، الآية 28",
      duaText: "اللَّهُمَّ إِنِّي عَبْدُكَ ابْنُ عَبْدِكَ ابْنُ أَمَتِكَ، نَاصِيَتِي بِيَدِكَ، مَاضٍ فِيَّ حُكْمُكَ، عَدْلٌ فِيَّ قَضَاؤُكَ، أَسْأَلُكَ بِكُلِّ اسْمٍ هُوَ لَكَ سَمَّيْتَ بِهِ نَفْسَكَ، أَوْ أَنْزَلْتَهُ فِي كِتَابِكَ، أَوْ عَلَّمْتَهُ أَحَدًا مِنْ خَلْقِكَ، أَوِ اسْتَأْثَرْتَ بِهِ فِي عِلْمِ الْغَيْبِ عِنْدَكَ، أَنْ تَجْعَلَ الْقُرْآنَ رَبِيعَ قَلْبِي، وَنُورَ صَدْرِي، وَجَلَاءَ حُزْنِي، وَذَهَابَ هَمِّي",
      duaSource: "رواه الإمام أحمد، عن عبد الله بن مسعود رضي الله عنه",
      hadithText: "عَجَبًا لِأَمْرِ الْمُؤْمِنِ إِنَّ أَمْرَهُ كُلَّهُ خَيْرٌ، وَلَيْسَ ذَاكَ لِأَحَدٍ إِلَّا لِلْمُؤْمِنِ: إِنْ أَصَابَتْهُ سَرَّاءُ شَكَرَ فَكَانَ خَيْرًا لَهُ، وَإِنْ أَصَابَتْهُ ضَرَّاءُ صَبَرَ فَكَانَ خَيْرًا لَهُ",
      hadithSource: "رواه مسلم، عن صهيب رضي الله عنه"
    },
    {
      id: "sadness", icon: "😢", title: "الحزن والضيق",
      ayahText: "لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ",
      ayahRef: "سورة الأنبياء، الآية 87 (دعاء ذي النون)",
      duaText: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
      duaSource: "متفق عليه، عن أبي موسى الأشعري رضي الله عنه — كنز من كنوز الجنة",
      hadithText: "مَا يُصِيبُ الْمُسْلِمَ مِنْ نَصَبٍ وَلَا وَصَبٍ وَلَا هَمٍّ وَلَا حُزْنٍ وَلَا أَذًى وَلَا غَمٍّ، حَتَّى الشَّوْكَةِ يُشَاكُهَا، إِلَّا كَفَّرَ اللَّهُ بِهَا مِنْ خَطَايَاهُ",
      hadithSource: "متفق عليه، عن أبي سعيد وأبي هريرة رضي الله عنهما"
    },
    {
      id: "fear_future", icon: "🌫️", title: "الخوف من المستقبل",
      ayahText: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",
      ayahRef: "سورة آل عمران، الآية 173",
      duaText: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْجُبْنِ وَالْبُخْلِ، وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ",
      duaSource: "رواه البخاري، عن أنس بن مالك رضي الله عنه",
      hadithText: "الْمُؤْمِنُ الْقَوِيُّ خَيْرٌ وَأَحَبُّ إِلَى اللَّهِ مِنَ الْمُؤْمِنِ الضَّعِيفِ، وَفِي كُلٍّ خَيْرٌ، احْرِصْ عَلَى مَا يَنْفَعُكَ وَاسْتَعِنْ بِاللَّهِ وَلَا تَعْجَزْ",
      hadithSource: "رواه مسلم، عن أبي هريرة رضي الله عنه"
    },
    {
      id: "laziness", icon: "🥱", title: "ضعف الهمة والكسل",
      ayahText: "وَأَن لَّيْسَ لِلْإِنسَانِ إِلَّا مَا سَعَىٰ",
      ayahRef: "سورة النجم، الآية 39",
      duaText: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ",
      duaSource: "جزء من حديث رواه البخاري، عن أنس بن مالك رضي الله عنه",
      hadithText: "اغْتَنِمْ خَمْسًا قَبْلَ خَمْسٍ: شَبَابَكَ قَبْلَ هَرَمِكَ، وَصِحَّتَكَ قَبْلَ سَقَمِكَ، وَغِنَاكَ قَبْلَ فَقْرِكَ، وَفَرَاغَكَ قَبْلَ شُغْلِكَ، وَحَيَاتَكَ قَبْلَ مَوْتِكَ",
      hadithSource: "رواه الحاكم والبيهقي، عن ابن عباس رضي الله عنهما، حديث حسن"
    },
    {
      id: "loneliness", icon: "🌙", title: "الوحشة والشعور بالوحدة",
      ayahText: "وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ",
      ayahRef: "سورة الحديد، الآية 4",
      duaText: "حَسْبِيَ اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ",
      duaSource: "سورة التوبة، الآية 129 — كان النبي ﷺ يرددها عند الشدائد",
      hadithText: "الْمُؤْمِنُ لِلْمُؤْمِنِ كَالْبُنْيَانِ يَشُدُّ بَعْضُهُ بَعْضًا",
      hadithSource: "متفق عليه، عن أبي موسى الأشعري رضي الله عنه"
    },
    {
      id: "guilt", icon: "😔", title: "الشعور بالتقصير والذنب",
      ayahText: "قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ ۚ إِنَّ اللَّهَ يَغْفِرُ الذُّنُوبَ جَمِيعًا",
      ayahRef: "سورة الزمر، الآية 53",
      duaText: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
      duaSource: "سيد الاستغفار، رواه البخاري، عن شداد بن أوس رضي الله عنه",
      hadithText: "كُلُّ بَنِي آدَمَ خَطَّاءٌ، وَخَيْرُ الْخَطَّائِينَ التَّوَّابُونَ",
      hadithSource: "رواه الترمذي وابن ماجه، عن أنس بن مالك رضي الله عنه، حديث حسن"
    },
    {
      id: "loss", icon: "💔", title: "ألم الفقد والاشتياق",
      ayahText: "الَّذِينَ إِذَا أَصَابَتْهُم مُّصِيبَةٌ قَالُوا إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ",
      ayahRef: "سورة البقرة، الآية 156",
      duaText: "اللَّهُمَّ أْجُرْنِي فِي مُصِيبَتِي، وَأَخْلِفْ لِي خَيْرًا مِنْهَا",
      duaSource: "رواه مسلم، عن أم سلمة رضي الله عنها",
      hadithText: "مَا مِنْ مُسْلِمٍ تُصِيبُهُ مُصِيبَةٌ فَيَقُولُ مَا أَمَرَهُ اللَّهُ: إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ، اللَّهُمَّ أْجُرْنِي فِي مُصِيبَتِي وَاخْلُفْ لِي خَيْرًا مِنْهَا، إِلَّا أَجَرَهُ اللَّهُ فِي مُصِيبَتِهِ وَأَخْلَفَ لَهُ خَيْرًا مِنْهَا",
      hadithSource: "رواه مسلم، عن أم سلمة رضي الله عنها"
    },
    {
      id: "distraction", icon: "🌀", title: "الشتات وضعف التركيز",
      ayahText: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي",
      ayahRef: "سورة طه، الآيتان 25-26",
      duaText: "اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا، وَأَنْتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلًا",
      duaSource: "رواه ابن حبان، عن أنس بن مالك رضي الله عنه، وحسّنه الألباني",
      hadithText: "التَّأَنِّي مِنَ اللَّهِ، وَالْعَجَلَةُ مِنَ الشَّيْطَانِ",
      hadithSource: "رواه الترمذي والبيهقي، حديث حسن"
    },
    {
      id: "anger", icon: "😠", title: "الغضب وفقدان الأعصاب",
      ayahText: "وَالْكَاظِمِينَ الْغَيْظَ وَالْعَافِينَ عَنِ النَّاسِ ۗ وَاللَّهُ يُحِبُّ الْمُحْسِنِينَ",
      ayahRef: "سورة آل عمران، الآية 134",
      duaText: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
      duaSource: "وصية النبي ﷺ عند الغضب، متفق عليه، عن سليمان بن صرد رضي الله عنه",
      hadithText: "لَيْسَ الشَّدِيدُ بِالصُّرَعَةِ، إِنَّمَا الشَّدِيدُ الَّذِي يَمْلِكُ نَفْسَهُ عِنْدَ الْغَضَبِ",
      hadithSource: "متفق عليه، عن أبي هريرة رضي الله عنه"
    },
    {
      id: "despair", icon: "😞", title: "اليأس والانكسار",
      ayahText: "لَا تَيْأَسُوا مِن رَّوْحِ اللَّهِ ۖ إِنَّهُ لَا يَيْأَسُ مِن رَّوْحِ اللَّهِ إِلَّا الْقَوْمُ الْكَافِرُونَ",
      ayahRef: "سورة يوسف، الآية 87",
      duaText: "لَا إِلَٰهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ",
      duaSource: "دعاء نبي الله يونس عليه السلام، سورة الأنبياء، الآية 87",
      hadithText: "لَا يَمُوتَنَّ أَحَدُكُمْ إِلَّا وَهُوَ يُحْسِنُ الظَّنَّ بِاللَّهِ عَزَّ وَجَلَّ",
      hadithSource: "رواه مسلم، عن جابر بن عبد الله رضي الله عنهما"
    },
    {
      id: "injustice", icon: "⚖️", title: "الشعور بالظلم",
      ayahText: "وَلَا تَحْسَبَنَّ اللَّهَ غَافِلًا عَمَّا يَعْمَلُ الظَّالِمُونَ",
      ayahRef: "سورة إبراهيم، الآية 42",
      duaText: "حَسْبِيَ اللَّهُ وَنِعْمَ الْوَكِيلُ",
      duaSource: "سورة آل عمران، الآية 173 — دعاء عظيم عند الشعور بالظلم",
      hadithText: "اتَّقُوا دَعْوَةَ الْمَظْلُومِ فَإِنَّهُ لَيْسَ بَيْنَهَا وَبَيْنَ اللَّهِ حِجَابٌ",
      hadithSource: "متفق عليه، عن ابن عباس رضي الله عنهما"
    },
    {
      id: "debt", icon: "💰", title: "ضيق الرزق والديون",
      ayahText: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا * وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ",
      ayahRef: "سورة الطلاق، الآيتان 2-3",
      duaText: "اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ، وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ",
      duaSource: "رواه الترمذي، عن علي بن أبي طالب رضي الله عنه",
      hadithText: "أَيُّمَا رَجُلٍ ادَّانَ دَيْنًا وَهُوَ يُرِيدُ أَدَاءَهُ، أَدَّاهُ اللَّهُ عَنْهُ",
      hadithSource: "رواه البخاري، عن أبي هريرة رضي الله عنه"
    },
    {
      id: "illness", icon: "🤒", title: "المرض والتعب الجسدي",
      ayahText: "وَإِذَا مَرِضْتُ فَهُوَ يَشْفِينِ",
      ayahRef: "سورة الشعراء، الآية 80",
      duaText: "اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَاسَ، اشْفِ أَنْتَ الشَّافِي، لَا شِفَاءَ إِلَّا شِفَاؤُكَ، شِفَاءً لَا يُغَادِرُ سَقَمًا",
      duaSource: "متفق عليه، عن عائشة رضي الله عنها",
      hadithText: "مَا مِنْ مُسْلِمٍ يُصِيبُهُ أَذًى مِنْ مَرَضٍ فَمَا سِوَاهُ، إِلَّا حَطَّ اللَّهُ بِهِ سَيِّئَاتِهِ كَمَا تَحُطُّ الشَّجَرَةُ وَرَقَهَا",
      hadithSource: "متفق عليه، عن ابن مسعود رضي الله عنه"
    },
    {
      id: "indecision", icon: "🤔", title: "الحيرة وتردد القرار",
      ayahText: "وَشَاوِرْهُمْ فِي الْأَمْرِ ۖ فَإِذَا عَزَمْتَ فَتَوَكَّلْ عَلَى اللَّهِ",
      ayahRef: "سورة آل عمران، الآية 159",
      duaText: "اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ، وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ، وَأَسْأَلُكَ مِنْ فَضْلِكَ الْعَظِيمِ، فَإِنَّكَ تَقْدِرُ وَلَا أَقْدِرُ، وَتَعْلَمُ وَلَا أَعْلَمُ، وَأَنْتَ عَلَّامُ الْغُيُوبِ. اللَّهُمَّ إِنْ كُنْتَ تَعْلَمُ أَنَّ هَذَا الْأَمْرَ خَيْرٌ لِي فِي دِينِي وَمَعَاشِي وَعَاقِبَةِ أَمْرِي، فَاقْدُرْهُ لِي وَيَسِّرْهُ لِي، ثُمَّ بَارِكْ لِي فِيهِ، وَإِنْ كُنْتَ تَعْلَمُ أَنَّ هَذَا الْأَمْرَ شَرٌّ لِي فِي دِينِي وَمَعَاشِي وَعَاقِبَةِ أَمْرِي، فَاصْرِفْهُ عَنِّي وَاصْرِفْنِي عَنْهُ، وَاقْدُرْ لِيَ الْخَيْرَ حَيْثُ كَانَ، ثُمَّ أَرْضِنِي بِهِ",
      duaSource: "دعاء الاستخارة، رواه البخاري، عن جابر بن عبد الله رضي الله عنهما",
      hadithText: "إِذَا اسْتَشَارَ أَحَدُكُمْ أَخَاهُ فَلْيُشِرْ عَلَيْهِ",
      hadithSource: "رواه ابن ماجه، حديث حسن"
    },
    {
      id: "envy", icon: "🧿", title: "حسد أو ضيق صدر غير مبرر",
      ayahText: "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ",
      ayahRef: "سورة الفلق، الآية 5",
      duaText: "قراءة سورتي الفلق والناس (المعوذتين) بيقين وتدبر، فقد كان النبي ﷺ ينفث بهما على نفسه عند الشدة",
      duaSource: "متفق عليه، عن عائشة رضي الله عنها",
      hadithText: "إِيَّاكُمْ وَالْحَسَدَ، فَإِنَّ الْحَسَدَ يَأْكُلُ الْحَسَنَاتِ كَمَا تَأْكُلُ النَّارُ الْحَطَبَ",
      hadithSource: "رواه أبو داود، عن أبي هريرة رضي الله عنه، حديث حسن"
    },
    {
      id: "repentance", icon: "🤍", title: "الرغبة في التوبة والبداية الجديدة",
      ayahText: "وَتُوبُوا إِلَى اللَّهِ جَمِيعًا أَيُّهَ الْمُؤْمِنُونَ لَعَلَّكُمْ تُفْلِحُونَ",
      ayahRef: "سورة النور، الآية 31",
      duaText: "أَسْتَغْفِرُ اللَّهَ الَّذِي لَا إِلَٰهَ إِلَّا هُوَ الْحَيَّ الْقَيُّومَ وَأَتُوبُ إِلَيْهِ",
      duaSource: "رواه أبو داود والترمذي، عن أبي هريرة رضي الله عنه",
      hadithText: "التَّائِبُ مِنَ الذَّنْبِ كَمَنْ لَا ذَنْبَ لَهُ",
      hadithSource: "رواه ابن ماجه، عن ابن مسعود رضي الله عنه، حديث حسن"
    },
    {
      id: "study", icon: "📚", title: "صعوبة التعلم والاختبارات",
      ayahText: "رَبِّ زِدْنِي عِلْمًا",
      ayahRef: "سورة طه، الآية 114",
      duaText: "اللَّهُمَّ انْفَعْنِي بِمَا عَلَّمْتَنِي، وَعَلِّمْنِي مَا يَنْفَعُنِي، وَزِدْنِي عِلْمًا",
      duaSource: "رواه ابن ماجه والترمذي، حديث حسن",
      hadithText: "مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ",
      hadithSource: "رواه مسلم، عن أبي هريرة رضي الله عنه"
    },
    {
      id: "gratitude", icon: "😊", title: "الفرح والشكر (لحفظ النعمة)",
      ayahText: "لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ",
      ayahRef: "سورة إبراهيم، الآية 7",
      duaText: "الْحَمْدُ لِلَّهِ الَّذِي بِنِعْمَتِهِ تَتِمُّ الصَّالِحَاتُ",
      duaSource: "رواه ابن ماجه، عن أبي سعيد الخدري رضي الله عنه",
      hadithText: "إِذَا رَأَى أَحَدُكُمْ مَنْ فُضِّلَ عَلَيْهِ فِي الْمَالِ وَالْخَلْقِ، فَلْيَنْظُرْ إِلَى مَنْ هُوَ أَسْفَلَ مِنْهُ",
      hadithSource: "متفق عليه، عن أبي هريرة رضي الله عنه"
    },
    {
      id: "fear_failure", icon: "🎯", title: "الخوف من الفشل",
      ayahText: "وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ",
      ayahRef: "سورة الطلاق، الآية 3",
      duaText: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْجُبْنِ",
      duaSource: "جزء من حديث رواه البخاري، عن أنس بن مالك رضي الله عنه",
      hadithText: "احْرِصْ عَلَى مَا يَنْفَعُكَ وَاسْتَعِنْ بِاللَّهِ وَلَا تَعْجَزْ، وَإِنْ أَصَابَكَ شَيْءٌ فَلَا تَقُلْ لَوْ أَنِّي فَعَلْتُ كَذَا لَكَانَ كَذَا وَكَذَا، وَلَكِنْ قُلْ: قَدَرُ اللَّهِ وَمَا شَاءَ فَعَلَ",
      hadithSource: "رواه مسلم، عن أبي هريرة رضي الله عنه"
    },
    {
      id: "tranquility", icon: "🕊️", title: "الطمأنينة وتثبيت القلب",
      ayahText: "الَّذِينَ آمَنُوا وَتَطْمَئِنُّ قُلُوبُهُم بِذِكْرِ اللَّهِ ۗ أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
      ayahRef: "سورة الرعد، الآية 28",
      duaText: "يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَى دِينِكَ",
      duaSource: "رواه الترمذي، عن أنس بن مالك رضي الله عنه",
      hadithText: "مَنْ أَصْبَحَ مِنْكُمْ آمِنًا فِي سِرْبِهِ، مُعَافًى فِي بَدَنِهِ، عِنْدَهُ قُوتُ يَوْمِهِ، فَكَأَنَّمَا حِيزَتْ لَهُ الدُّنْيَا",
      hadithSource: "رواه الترمذي، عن عبيد الله بن محصن رضي الله عنه، حديث حسن"
    }
  ];

  var mounajaGrid = document.getElementById("mounajaGrid");
  var mounajaOverlay = document.getElementById("mounajaOverlay");
  var currentMounaja = null;

  function buildMounajaGrid(){
    var html = "";
    MOUNAJA_DATA.forEach(function(item){
      html += "<div class=\"mounaja-card\" data-id=\"" + item.id + "\">" +
                "<span class=\"m-icon\">" + item.icon + "</span>" +
                "<span class=\"m-name\">" + item.title + "</span>" +
              "</div>";
    });
    mounajaGrid.innerHTML = html;

    mounajaGrid.querySelectorAll(".mounaja-card").forEach(function(card){
      card.addEventListener("click", function(){
        openMounajaModal(card.getAttribute("data-id"));
      });
    });
  }

  function openMounajaModal(id){
    var item = null;
    for(var i = 0; i < MOUNAJA_DATA.length; i++){
      if(MOUNAJA_DATA[i].id === id){ item = MOUNAJA_DATA[i]; break; }
    }
    if(!item) return;
    currentMounaja = item;

    document.getElementById("mounajaModalTitle").textContent = item.icon + " " + item.title;

    var ayahBox = document.getElementById("mounajaAyahBox");
    if(item.ayahText){
      ayahBox.style.display = "block";
      document.getElementById("mounajaAyahText").textContent = item.ayahText;
      document.getElementById("mounajaAyahRef").textContent = item.ayahRef;
    }else{
      ayahBox.style.display = "none";
    }

    document.getElementById("mounajaDuaText").textContent = item.duaText;
    document.getElementById("mounajaDuaSource").textContent = item.duaSource;

    document.getElementById("mounajaHadithText").textContent = "«" + item.hadithText + "»";
    document.getElementById("mounajaHadithSource").textContent = item.hadithSource;

    mounajaOverlay.classList.add("show");
  }

  function closeMounajaModal(){
    mounajaOverlay.classList.remove("show");
  }

  function getMounajaShareText(){
    if(!currentMounaja) return "";
    var parts = [];
    parts.push(currentMounaja.duaText + " — " + currentMounaja.duaSource);
    if(currentMounaja.ayahText){
      parts.push(currentMounaja.ayahText + " — " + currentMounaja.ayahRef);
    }
    if(currentMounaja.hadithText){
      parts.push("«" + currentMounaja.hadithText + "» — " + currentMounaja.hadithSource);
    }
    parts.push("من تطبيق سكينة");
    return parts.join("\n\n");
  }

  document.getElementById("mounajaCloseBtn").addEventListener("click", closeMounajaModal);
  mounajaOverlay.addEventListener("click", function(e){ if(e.target === mounajaOverlay) closeMounajaModal(); });

  document.getElementById("mounajaCopyBtn").addEventListener("click", function(){
    var text = getMounajaShareText();
    if(!text) return;
    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(text).then(function(){
        showToast("📋 تم نسخ الدعاء");
      }).catch(function(){
        showToast("⚠️ تعذر نسخ الدعاء");
      });
    }else{
      try{
        var tempArea = document.createElement("textarea");
        tempArea.value = text;
        tempArea.style.position = "fixed";
        tempArea.style.opacity = "0";
        document.body.appendChild(tempArea);
        tempArea.focus();
        tempArea.select();
        document.execCommand("copy");
        document.body.removeChild(tempArea);
        showToast("📋 تم نسخ الدعاء");
      }catch(copyErr){
        showToast("⚠️ تعذر نسخ الدعاء");
      }
    }
  });

  document.getElementById("mounajaShareBtn").addEventListener("click", function(){
    var text = getMounajaShareText();
    if(!text) return;
    if(navigator.share){
      navigator.share({ title: "مناجاة وسكينة", text: text }).catch(function(){});
    }else if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(text).then(function(){
        showToast("📋 تمت مشاركة الدعاء عبر النسخ");
      }).catch(function(){
        showToast("⚠️ تعذرت المشاركة");
      });
    }else{
      showToast("⚠️ المشاركة غير مدعومة على متصفحك");
    }
  });

  /* ================= AZKAR AUDIO PLAYER ================= */

  /* تنبيه: رابطا الصباح والمساء تم التحقق منهما فعلياً وهما يعملان
     (مصدر: أرشيف الإنترنت archive.org). الروابط الثلاثة تم التحقق
     منها وهي مباشرة وفعّالة (ملفات mp3 مستضافة على archive.org). */

  var AZKAR_AUDIO_SOURCES = {
    morning: "https://archive.org/download/adhkar-alsabah-walmasa/%D8%A3%D8%B0%D9%83%D8%A7%D8%B1%20%D8%A7%D9%84%D8%B5%D8%A8%D8%A7%D8%AD%20%D9%88%D8%A7%D9%84%D9%85%D8%B3%D8%A7%D8%A1%20%D8%A8%D8%B5%D9%88%D8%AA%20%D8%A7%D9%84%D8%B4%D9%8A%D8%AE%20%D8%B3%D8%B9%D8%AF%20%D8%A7%D9%84%D8%BA%D8%A7%D9%85%D8%AF%D9%8A.mp3",
    evening: "https://archive.org/download/adhkar-alsabah-walmasa/%D8%A3%D8%B0%D9%83%D8%A7%D8%B1%20%D8%A7%D9%84%D8%B5%D8%A8%D8%A7%D8%AD%20%D9%88%D8%A7%D9%84%D9%85%D8%B3%D8%A7%D8%A1%20%D8%A8%D8%B5%D9%88%D8%AA%20%D8%A7%D9%84%D8%B4%D9%8A%D8%AE%20%D8%A5%D8%AF%D8%B1%D9%8A%D8%B3%20%D8%A3%D8%A8%D9%83%D8%B1.mp3",
    sleep: "https://archive.org/download/athkar33/AthkarAlnom.mp3"
  };

  var AZKAR_AUDIO_LABELS = {
    morning: "🎧 استماع لأذكار الصباح",
    evening: "🎧 استماع لأذكار المساء",
    sleep: "🎧 استماع لأذكار النوم"
  };

  var azkarAudioEl = document.getElementById("azkarAudioEl");
  var azkarAudioPlayerBar = document.getElementById("azkarAudioPlayer");
  var azkarPlayBtn = document.getElementById("azkarPlayBtn");
  var azkarStopBtn = document.getElementById("azkarStopBtn");
  var azkarAudioTitle = document.getElementById("azkarAudioTitle");
  var azkarAudioProgress = document.getElementById("azkarAudioProgress");
  var azkarAudioTime = document.getElementById("azkarAudioTime");

  var PLAY_LABEL = "▶ Play";
  var PAUSE_LABEL = "⏸ Pause";

  function formatAudioTime(sec){
    if(!isFinite(sec) || sec < 0) return "00:00";
    var m = Math.floor(sec / 60);
    var s = Math.floor(sec % 60);
    return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
  }

  function resetAzkarPlayerUI(){
    azkarPlayBtn.textContent = PLAY_LABEL;
    azkarPlayBtn.setAttribute("aria-label", "تشغيل");
    azkarAudioProgress.style.width = "0%";
    azkarAudioTime.textContent = "00:00";
  }

  // نُحدّث data-audio-src / data-category على الزر نفسه (كما هو مطلوب) في كل مرة يتغيّر القسم
  function updateAzkarAudioForSub(sub){
    var src = AZKAR_AUDIO_SOURCES[sub];
    azkarAudioEl.pause();
    resetAzkarPlayerUI();

    if(!src){
      azkarAudioPlayerBar.style.display = "none";
      return;
    }

    azkarAudioPlayerBar.style.display = "flex";
    azkarAudioTitle.textContent = AZKAR_AUDIO_LABELS[sub] || "🎧 استماع للأذكار";

    azkarPlayBtn.setAttribute("data-audio-src", src);
    azkarPlayBtn.setAttribute("data-category", sub);

    if(azkarAudioEl.getAttribute("data-current-sub") !== sub){
      azkarAudioEl.src = src;
      azkarAudioEl.setAttribute("data-current-sub", sub);
    }
  }

  // منطق تشغيل/إيقاف مؤقت قوي: يعتمد على data-audio-src في حال تغيّر المصدر خارجياً،
  // يبدّل نص الزر بين ▶ Play و⏸ Pause، ويتعامل مع الأخطاء بأمان دون كسر الواجهة
  function togglePlayAdhkarAudio(btn){
    var src = btn.getAttribute("data-audio-src");
    if(!src){
      showToast("⚠️ لا يوجد ملف صوتي مرتبط بهذا القسم");
      return;
    }

    if(azkarAudioEl.getAttribute("data-active-src") !== src){
      azkarAudioEl.src = src;
      azkarAudioEl.setAttribute("data-active-src", src);
    }

    if(azkarAudioEl.paused || azkarAudioEl.ended){
      var playPromise = azkarAudioEl.play();
      if(playPromise && typeof playPromise.then === "function"){
        playPromise.then(function(){
          btn.textContent = PAUSE_LABEL;
          btn.setAttribute("aria-label", "إيقاف مؤقت");
        }).catch(function(){
          showToast("⚠️ تعذر تشغيل الصوت، تحقق من اتصالك بالإنترنت");
          resetAzkarPlayerUI();
        });
      }else{
        btn.textContent = PAUSE_LABEL;
        btn.setAttribute("aria-label", "إيقاف مؤقت");
      }
    }else{
      azkarAudioEl.pause();
      btn.textContent = PLAY_LABEL;
      btn.setAttribute("aria-label", "تشغيل");
    }
  }

  // مندوب أحداث عام على المستند بأكمله لأي زر يحمل الكلاس play-adhkar-audio —
  // يعمل حتى لو أُضيفت أزرار أخرى بنفس الكلاس لاحقاً في أقسام أذكار مختلفة
  document.addEventListener("click", function(e){
    var btn = e.target.closest ? e.target.closest(".play-adhkar-audio") : null;
    if(!btn) return;
    togglePlayAdhkarAudio(btn);
  });

  azkarStopBtn.addEventListener("click", function(){
    azkarAudioEl.pause();
    azkarAudioEl.currentTime = 0;
    resetAzkarPlayerUI();
  });

  azkarAudioEl.addEventListener("timeupdate", function(){
    if(azkarAudioEl.duration){
      var pct = (azkarAudioEl.currentTime / azkarAudioEl.duration) * 100;
      azkarAudioProgress.style.width = pct + "%";
    }
    azkarAudioTime.textContent = formatAudioTime(azkarAudioEl.currentTime);
  });

  // عند انتهاء الصوت طبيعياً: إعادة ضبط حالة كل الأزرار (وليس فقط زر القسم الحالي)
  azkarAudioEl.addEventListener("ended", function(){
    resetAzkarPlayerUI();
    document.querySelectorAll(".play-adhkar-audio").forEach(function(b){
      b.textContent = PLAY_LABEL;
      b.setAttribute("aria-label", "تشغيل");
    });
  });

  // معالجة أخطاء شاملة: ملف مفقود، شبكة منقطعة، أو تنسيق غير مدعوم — كلها تُعيد الواجهة لحالة آمنة
  azkarAudioEl.addEventListener("error", function(){
    showToast("⚠️ تعذر تحميل ملف الصوت لهذا القسم، تحقق من الرابط أو اتصالك بالإنترنت");
    resetAzkarPlayerUI();
    document.querySelectorAll(".play-adhkar-audio").forEach(function(b){
      b.textContent = PLAY_LABEL;
      b.setAttribute("aria-label", "تشغيل");
    });
  });

  /* ================= QIBLA COMPASS (OFFLINE) ================= */

  var MECCA_LAT = 21.4225;
  var MECCA_LNG = 39.8262;

  function toRad(deg){ return deg * Math.PI / 180; }
  function toDeg(rad){ return rad * 180 / Math.PI; }

  function computeQiblaBearing(lat, lng){
    var phi1 = toRad(lat);
    var phi2 = toRad(MECCA_LAT);
    var deltaLambda = toRad(MECCA_LNG - lng);
    var y = Math.sin(deltaLambda) * Math.cos(phi2);
    var x = Math.cos(phi1) * Math.sin(phi2) - Math.sin(phi1) * Math.cos(phi2) * Math.cos(deltaLambda);
    var theta = Math.atan2(y, x);
    return (toDeg(theta) + 360) % 360;
  }

  var qiblaOverlay = document.getElementById("qiblaOverlay");
  var qiblaNeedle = document.getElementById("qiblaNeedle");
  var qiblaBearingText = document.getElementById("qiblaBearingText");
  var qiblaHeadingText = document.getElementById("qiblaHeadingText");
  var qiblaEnableBtn = document.getElementById("qiblaEnableBtn");
  var qiblaPermissionNote = document.getElementById("qiblaPermissionNote");

  var qiblaBearing = null;
  var qiblaDeviceHeading = 0;
  var qiblaListenerActive = false;
  var qiblaActiveEventName = null;

  function updateQiblaNeedle(){
    if(qiblaBearing === null) return;
    var relative = qiblaBearing - qiblaDeviceHeading;
    qiblaNeedle.style.transform = "translate(-50%,-50%) rotate(" + relative + "deg)";
  }

  function handleQiblaOrientation(event){
    var heading;
    if(typeof event.webkitCompassHeading === "number"){
      heading = event.webkitCompassHeading;
    }else if(event.alpha !== null && event.alpha !== undefined){
      heading = 360 - event.alpha;
    }else{
      return;
    }
    qiblaDeviceHeading = heading;
    qiblaHeadingText.textContent = "اتجاهك الحالي: " + Math.round(heading) + "°";
    updateQiblaNeedle();
  }

  function startQiblaCompass(){
    if(qiblaListenerActive) return;
    qiblaActiveEventName = ("ondeviceorientationabsolute" in window) ? "deviceorientationabsolute" : "deviceorientation";
    window.addEventListener(qiblaActiveEventName, handleQiblaOrientation, true);
    qiblaListenerActive = true;
  }

  function stopQiblaCompass(){
    if(!qiblaListenerActive) return;
    window.removeEventListener(qiblaActiveEventName, handleQiblaOrientation, true);
    qiblaListenerActive = false;
  }

  function initQiblaBearing(){
    if(prayerSettings && typeof prayerSettings.lat === "number" && typeof prayerSettings.lng === "number"){
      qiblaBearing = computeQiblaBearing(prayerSettings.lat, prayerSettings.lng);
      qiblaBearingText.textContent = "اتجاه القبلة من موقعك: " + Math.round(qiblaBearing) + "° من الشمال";
      updateQiblaNeedle();
      return true;
    }
    qiblaBearing = null;
    qiblaBearingText.textContent = "⚠️ حدّد موقعك أولاً من إعدادات المواقيت لحساب اتجاه القبلة";
    return false;
  }

  function requestQiblaPermissionIfNeeded(){
    if(typeof DeviceOrientationEvent !== "undefined" && typeof DeviceOrientationEvent.requestPermission === "function"){
      qiblaEnableBtn.style.display = "block";
      qiblaPermissionNote.style.display = "block";
      qiblaPermissionNote.textContent = "اضغط الزر أدناه للسماح لتطبيق سَكينة باستخدام مستشعر البوصلة في جهازك";
    }else if(window.DeviceOrientationEvent){
      qiblaEnableBtn.style.display = "none";
      qiblaPermissionNote.style.display = "none";
      startQiblaCompass();
    }else{
      qiblaEnableBtn.style.display = "none";
      qiblaPermissionNote.style.display = "block";
      qiblaPermissionNote.textContent = "⚠️ جهازك أو متصفحك لا يدعم مستشعر البوصلة (DeviceOrientation)";
    }
  }

  qiblaEnableBtn.addEventListener("click", function(){
    DeviceOrientationEvent.requestPermission().then(function(result){
      if(result === "granted"){
        qiblaPermissionNote.style.display = "none";
        qiblaEnableBtn.style.display = "none";
        startQiblaCompass();
      }else{
        qiblaPermissionNote.textContent = "⚠️ لم يتم منح إذن استخدام البوصلة";
      }
    }).catch(function(){
      qiblaPermissionNote.textContent = "⚠️ تعذر طلب إذن البوصلة";
    });
  });

  document.getElementById("openQiblaBtn").addEventListener("click", function(){
    qiblaOverlay.classList.add("show");
    var hasLocation = initQiblaBearing();
    if(hasLocation){
      requestQiblaPermissionIfNeeded();
    }
  });

  function closeQiblaOverlay(){
    qiblaOverlay.classList.remove("show");
    stopQiblaCompass();
  }

  document.getElementById("qiblaCloseBtn").addEventListener("click", closeQiblaOverlay);
  qiblaOverlay.addEventListener("click", function(e){ if(e.target === qiblaOverlay) closeQiblaOverlay(); });

  /* ================= QURAN READING PROGRESS (SURAH + AYAH + PAGE) ================= */

  // نُسمّيها saveBookmark/restoreBookmark للحفاظ على التوافق مع نقاط
  // الاستدعاء الحالية في الكود (نقر الآية، فتح السورة)، لكنها الآن
  // تحفظ السورة + الآية + الصفحة معاً بدل الآية فقط
  function saveBookmark(surahIndex, ayahNumber){
    lastRead = saveQuranProgress(surahIndex, ayahNumber, getPageForAyah(surahIndex), window.scrollY);
  }

  function loadBookmark(){
    return loadQuranProgress();
  }

  function restoreBookmark(){
    var progress = loadQuranProgress();
    if(!progress || typeof progress.surah !== "number" || typeof progress.ayah !== "number") return;
    if(progress.surah !== currentReadingSurah) return;

    var ayahNumEls = document.querySelectorAll("#mushafCard .ayah-num");
    var targetEl = null;
    ayahNumEls.forEach(function(el){
      if(parseInt(el.textContent, 10) === progress.ayah){
        targetEl = el;
      }
    });

    if(!targetEl) return;

    setTimeout(function(){
      targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
      targetEl.classList.add("ayah-highlight");
      setTimeout(function(){
        targetEl.classList.remove("ayah-highlight");
      }, 2200);
    }, 300);
  }

  /* ================= AZAN & NOTIFICATION SETTINGS ================= */

  var SAKINA_SETTINGS_KEY = "sakina_settings";

  var DEFAULT_AZAN_SETTINGS = {
    azanGlobalEnabled: true,
    azanFajrEnabled: true,
    muazzin: "saad_alghamdi"
  };

  function loadSakinaSettings(){
    try{
      var raw = localStorage.getItem(SAKINA_SETTINGS_KEY);
      if(!raw) return Object.assign({}, DEFAULT_AZAN_SETTINGS);
      var parsed = JSON.parse(raw);
      return Object.assign({}, DEFAULT_AZAN_SETTINGS, parsed);
    }catch(e){
      return Object.assign({}, DEFAULT_AZAN_SETTINGS);
    }
  }

  function saveSakinaSettings(settings){
    try{
      localStorage.setItem(SAKINA_SETTINGS_KEY, JSON.stringify(settings));
    }catch(e){}
    syncAzanPreferencesToNative(settings);
  }

  function syncAzanPreferencesToNative(settings){
    if(window.AndroidBridge && typeof window.AndroidBridge.updateAzanPreferences === "function"){
      try{
        window.AndroidBridge.updateAzanPreferences(JSON.stringify(settings));
      }catch(e){}
    }
  }

  function syncPrayerTimesToNative(prayerTimes){
    if(window.AndroidBridge && typeof window.AndroidBridge.schedulePrayerAlarms === "function"){
      try{
        window.AndroidBridge.schedulePrayerAlarms(JSON.stringify(prayerTimes));
      }catch(e){}
    }
  }

  var azanGlobalToggleEl = document.getElementById("azanGlobalToggle");
  var azanFajrToggleEl = document.getElementById("azanFajrToggle");
  var muazzinSelect = document.getElementById("muazzinSelect");

  function renderAzanSettingsUI(){
    var settings = loadSakinaSettings();
    azanGlobalToggleEl.classList.toggle("on", settings.azanGlobalEnabled);
    azanFajrToggleEl.classList.toggle("on", settings.azanFajrEnabled);
    muazzinSelect.value = settings.muazzin;
  }

  function updateAzanSetting(key, value){
    var settings = loadSakinaSettings();
    settings[key] = value;
    saveSakinaSettings(settings);
  }

  azanGlobalToggleEl.addEventListener("click", function(){
    var newState = !azanGlobalToggleEl.classList.contains("on");
    azanGlobalToggleEl.classList.toggle("on", newState);
    updateAzanSetting("azanGlobalEnabled", newState);
    showToast(newState ? "🔊 تم تفعيل الأذان لكل الصلوات" : "🔇 تم إيقاف الأذان لكل الصلوات");
  });

  azanFajrToggleEl.addEventListener("click", function(){
    var newState = !azanFajrToggleEl.classList.contains("on");
    azanFajrToggleEl.classList.toggle("on", newState);
    updateAzanSetting("azanFajrEnabled", newState);
    showToast(newState ? "🔊 تم تفعيل أذان الفجر" : "🔇 تم إيقاف أذان الفجر");
  });

  muazzinSelect.addEventListener("change", function(){
    updateAzanSetting("muazzin", muazzinSelect.value);
    showToast("✅ تم تحديث صوت المؤذن");
  });

  /* ================= NAVIGATION ================= */

  var navItems = document.querySelectorAll(".nav-item");
  var subtabPills = document.querySelectorAll(".subtab-pill");
  var azkarSection = document.getElementById("azkarSection");
  var tasbihSection = document.getElementById("tasbihSection");
  var mounajaSection = document.getElementById("mounajaSection");

  function switchView(target){
    document.getElementById("view-habits").classList.toggle("hidden", target !== "habits");
    document.getElementById("view-azkar").classList.toggle("hidden", target !== "azkar");
    document.getElementById("view-prayer").classList.toggle("hidden", target !== "prayer");
    document.getElementById("view-quran").classList.toggle("hidden", target !== "quran");
    document.getElementById("view-more").classList.toggle("hidden", target !== "more");
    navItems.forEach(function(el){ el.classList.toggle("active", el.getAttribute("data-nav") === target); });
    window.scrollTo({ top: 0, behavior: "smooth" });

    if(target === "prayer"){
      fullRenderPrayer();
      startPrayerTicker();
    }
    if(target === "more"){
      renderAzanSettingsUI();
    }
  }

  function switchSub(sub){
    currentSub = sub;
    subtabPills.forEach(function(el){ el.classList.toggle("active", el.getAttribute("data-sub") === sub); });

    if(sub === "tasbih"){
      azkarSection.style.display = "none";
      mounajaSection.style.display = "none";
      tasbihSection.style.display = "block";
      buildTasbihChips();
      renderTasbih();
    }else if(sub === "mounaja"){
      azkarSection.style.display = "none";
      tasbihSection.style.display = "none";
      mounajaSection.style.display = "block";
    }else{
      azkarSection.style.display = "block";
      tasbihSection.style.display = "none";
      mounajaSection.style.display = "none";
      renderDhikrList();
    }

    updateAzkarAudioForSub(sub);
  }

  navItems.forEach(function(item){
    item.addEventListener("click", function(){
      var target = item.getAttribute("data-nav");
      if(target === "habits" || target === "azkar" || target === "prayer" || target === "quran" || target === "more"){
        switchView(target);
      }else{
        showToast("✨ هذا القسم سيتوفر قريباً بإذن الله");
      }
    });
  });

  subtabPills.forEach(function(pill){
    pill.addEventListener("click", function(){ switchSub(pill.getAttribute("data-sub")); });
  });

  /* ================= PWA — INSTALL PROMPT ================= */

  var deferredInstallPrompt = null;
  var installBanner = document.getElementById("installBanner");
  var manualInstallCard = document.getElementById("manualInstallCard");
  var manualInstallBtn = document.getElementById("manualInstallBtn");
  var manualInstallSubtext = document.getElementById("manualInstallSubtext");

  function isRunningStandalone(){
    var mq = window.matchMedia && window.matchMedia("(display-mode: standalone)").matches;
    var iosStandalone = window.navigator.standalone === true;
    return !!(mq || iosStandalone);
  }

  var isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  function refreshManualInstallCard(){
    if(isRunningStandalone()){
      manualInstallCard.style.display = "none";
      return;
    }
    if(deferredInstallPrompt){
      manualInstallSubtext.textContent = "ثبّت سَكينة على شاشتك الرئيسية ليعمل كتطبيق مستقل بدون متصفح";
      manualInstallBtn.style.display = "block";
      manualInstallBtn.textContent = "📲 تثبيت التطبيق الآن";
      manualInstallCard.style.display = "block";
    }else if(isIOSDevice){
      manualInstallSubtext.textContent = "على آيفون: اضغط زر المشاركة ⬆️ في متصفح Safari، ثم اختر \"إضافة إلى الشاشة الرئيسية\"";
      manualInstallBtn.style.display = "none";
      manualInstallCard.style.display = "block";
    }else{
      manualInstallCard.style.display = "none";
    }
  }

  window.addEventListener("beforeinstallprompt", function(e){
    e.preventDefault();
    deferredInstallPrompt = e;
    if(!isRunningStandalone()){ installBanner.style.display = "flex"; }
    refreshManualInstallCard();
  });

  function triggerInstallPrompt(){
    if(!deferredInstallPrompt) return;
    deferredInstallPrompt.prompt();
    deferredInstallPrompt.userChoice.then(function(){
      deferredInstallPrompt = null;
      installBanner.style.display = "none";
      refreshManualInstallCard();
    });
  }

  document.getElementById("installBtn").addEventListener("click", triggerInstallPrompt);
  manualInstallBtn.addEventListener("click", triggerInstallPrompt);

  document.getElementById("installDismissBtn").addEventListener("click", function(){
    installBanner.style.display = "none";
  });

  window.addEventListener("appinstalled", function(){
    installBanner.style.display = "none";
    manualInstallCard.style.display = "none";
    showToast("✅ تم تثبيت تطبيق سَكينة بنجاح");
  });

  refreshManualInstallCard();

  /* ================= PWA — WEB APP MANIFEST (injected, no external file needed) ================= */

  var APP_ICON_ANY_512 = "data:image/jpeg;base64,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";
  var APP_ICON_ANY_192 = "data:image/jpeg;base64,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";
  var APP_ICON_MASKABLE_512 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAIAAgADASIAAhEBAxEB/8QAHQABAAEFAQEBAAAAAAAAAAAAAAECAwUGBwQICf/EAFkQAAEDAwIDBAQICAgIDgMBAAEAAgMEBREGIRIxQQcTUWEUInGBCBUyQlKRkqEjM2KCsbKz0RZDRJWiweHwFyQmRVRjctIlNDU2RlNVZGVzdYXCwyeU4nT/xAAZAQEAAwEBAAAAAAAAAAAAAAAAAQIDBAX/xAAxEQEAAgIBAwIEBQMFAQEAAAAAAQIDERIEITFBYRMiUXEFI0OBoRQzsTJTwdHwQpH/2gAMAwEAAhEDEQA/APrtERUBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERARFdaxpAyOiC0ivcDPopwN+igsor3A36P3pwN8ETpZRXuBueSksb4feiNLCK8WN8E4G+CJ0sor3A3wTgb4KNmllFd4W+H1pwt+iVHKDjK0iulrfBRwt8E5QnjK2iuFrU4Rj5KjnBxlbRXOFuU4R4Jzg4Stoq8N8EwM8k5wcJUIqw0ZTA8E5wcZUIrnC3wThap5QcZW0Vzhb4KeFvgnKEcZWkV3hb4KOEeA+tTs0torvAM4wo4W7Js0toq+EexCB4IaUIqiBnYKP75TZpCKQPeo9iGhEHLPRFKBERAREQEREBERAREQEREBERAREQEREBERAREQEREBXWfJHJWleZjhHRCEjOeeynZQFJ9ihJ70TA6qR4YwgckUdd0J3RIdkUZ+9RkKu06TuhKhQqzZOk5CgnwUHHvQnKpNltJA6qM46KMqnI9qrNk6V5UZJKpz4KM7c1HJOlefJRlUj2plRyNKslAVTlM56pyNKsqQfLCoyVOVPI0rz0TbOVRnzU5PirRZGlWVO6oB25qd1aLImFWfaSigckVolWYTtnCeHNPHxTbZWiUaOXPmqTjPmp59dkJ6lShT9ajpywqt9io96kRtzI+tQc8jyUkb8lHNQIzk8lKb5RTCJERFKBERAREQEREBERAREQEREBERAREQEREBERAREQFfYCWjlyVhXmYwM+CJhUNumcp+lPenTmoDfoihPYgHxTzJT3KPJVmVohPmVT1RUkjzWcytEJJwoJPRRzUEqk2WiFSpz4BRlRlUmVohOVBKpycoqTZaIVZUZKhFXknSclQiHKjZoymfPkoTJKbNKspxKlOqtyNKgfYpz/cKgfUpzhTyRpXnbdTnkqMqVeLKzDy226UVfLPBBKO/gkdHLE7Z7SDjl4HxXuWi690/iR9+opGQyAZna5/BxEfOafpeXX2qzpSuvN+raanlraltJSNLpZY3Frn+Ac7qf6srmjqrVv8ADtHf0a/Bia8ons6B1TzKhQSfYvQiXPpWTlQPJR1Qnn5q0SrpPj0UfN6ITgIVZVB55P6FHuU7YUdN85QOWyIT62N0UwiRERSgREQEREBERAREQEREBERAREQEREBERAREQEREBXmn1QM9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HFN9N/2lQ5srjl2T71eROKOTzmJ56KO6fn5K9KKOEJ5S83dydWqe6f4fevQinjBylYZG4OBIzv8AUr6Ip0iZ2IiKUCIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiD//Z";
  var APP_ICON_MASKABLE_192 = "data:image/jpeg;base64,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";
  var APP_ICON_APPLE_180 = "data:image/jpeg;base64,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";

  try{
    var manifestObject = {
      name: "سَكينة — العادات والأذكار والقرآن",
      short_name: "سَكينة",
      description: "تطبيق إسلامي أوفلاين لتتبع العادات والأذكار ومواقيت الصلاة",
      start_url: ".",
      scope: ".",
      display: "standalone",
      orientation: "portrait",
      background_color: "#080d17",
      theme_color: "#080d17",
      dir: "rtl",
      lang: "ar",
      icons: [
        { src: APP_ICON_ANY_192, sizes: "192x192", type: "image/jpeg", purpose: "any" },
        { src: APP_ICON_ANY_512, sizes: "512x512", type: "image/jpeg", purpose: "any" },
        { src: APP_ICON_MASKABLE_192, sizes: "192x192", type: "image/jpeg", purpose: "maskable" },
        { src: APP_ICON_MASKABLE_512, sizes: "512x512", type: "image/jpeg", purpose: "maskable" }
      ]
    };
    var manifestBlob = new Blob([JSON.stringify(manifestObject)], { type: "application/json" });
    var manifestUrl = URL.createObjectURL(manifestBlob);
    var manifestLink = document.createElement("link");
    manifestLink.rel = "manifest";
    manifestLink.href = manifestUrl;
    document.head.appendChild(manifestLink);

    var appleTouchIcon = document.createElement("link");
    appleTouchIcon.rel = "apple-touch-icon";
    appleTouchIcon.href = APP_ICON_APPLE_180;
    document.head.appendChild(appleTouchIcon);
  }catch(manifestErr){}

  /* ================= PWA — SERVICE WORKER (external file: sw.js, required for installability) ================= */

  if("serviceWorker" in navigator){
    window.addEventListener("load", function(){
      navigator.serviceWorker.register("./sw.js", { scope: "./" }).then(function(registration){
        console.log("✅ تم تسجيل Service Worker بنجاح:", registration.scope);
      }).catch(function(err){
        console.warn("⚠️ فشل تسجيل Service Worker — تأكد من رفع ملف sw.js بجانب index.html على استضافة HTTPS:", err);
      });
    });
  }

  /* ================= INIT ================= */

  document.body.className = currentTheme === "default" ? "" : "theme-" + currentTheme;
  buildThemeGrid();
  updateHeader();
  renderHabits();
  renderStats();
  renderDhikrList();
  buildReciterChips();
  renderSurahList("");
  initReadingMode();
  renderVibrationToggle();
  renderDailyHadith();
  buildMounajaGrid();
  renderAzanSettingsUI();

  setInterval(updateHeader, 60000);
})();
