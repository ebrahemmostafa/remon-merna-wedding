/* ===== Language Switcher ===== */
const translations = {
  ar: {
    // Envelope
    "The grand celebration of": "الاحتفال الكبير بزفاف",
    "envelope-names": "ريمون و ميرنا",
    "Tap to open": "اضغط للفتح",

    // Hero
    "save-the-date-hero": "✦ احفظوا التاريخ ✦",
    "we are getting married": "سنتزوج",
    "Sunday": "الأحد",
    "Aug 2026": "أغسطس 2026",
    "Ceremony": "المراسم",
    "in the evening": "مساءً",
    "Locations": "الأماكن",
    "Giza-Zamalek": "الجيزة والزمالك",
    "Cairo · Egypt": "القاهرة · مصر",
    "scroll-down": "تمرير",

    // Photo reveal
    "Two souls": "روحان",
    "one journey": "رحلة واحدة",

    // Love story
    "Our story": "قصتنا",
    "how it began": "كيف بدأت",
    "story1": "ما كان لقاؤنا صدفةً، كان تدبير الله ليجعل منكِ شريكة حياتي، والحكاية التي أريد أن أعيشها للأبد",
    "story2": "اخترتُكِ اليوم.. وسأختاركِ في كل غدٍ يأتي",
    "story3": "لم نجد في بعضنا الحب فحسب، بل وجدنا الطمأنينة التي تجعل كل شيء يبدو هيناً وممكناً.",

    // Countdown
    "counting every moment": "نعد كل لحظة",
    "until forever": "حتى الأبد",
    "days": "أيام",
    "hours": "ساعات",
    "minutes": "دقائق",
    "seconds": "ثواني",

    // Calendar
    "save the date": "احفظوا التاريخ",
    "August 2026": "أغسطس 2026",
    "calendar-footer": "✦ الأحد · 6:00 مساءً ✦",

    // Location
    "where it happens": "حيث يتم الحدث",
    "The Church": "الكنيسة",
    "6:00 PM — 7:00 PM": "6:00 مساءً — 7:00 مساءً",
    "open in maps": "افتح في الخرائط ←",
    "Wedding Hall": "قاعة الزفاف",
    "8:00 PM — 12:00 AM": "8:00 مساءً — 12:00 صباحاً",

    // Gallery
    "moments": "لحظات",
    "Frozen in time": "مجمدة في الزمن",
    "drag-hint": "← اسحب للاستكشاف →",

    // RSVP
    "be with us": "كن معنا",
    "Kindly reply": "نرجو الرد",
    "Your name": "الاسم",
    "Email": "البريد الإلكتروني",
    "Will you attend?": "هل ستحضر؟",
    "Joyfully accept": "بكل سرور",
    "Regretfully decline": "أعتذر",
    "Number of guests": "عدد الضيوف",
    "A note for us": "ملاحظة لنا",
    "send rsvp": "إرسال",
    "rsvp-thanks": "شكراً لك، تم الاستلام بنجاح.",
    "rsvp-see-you": "نحن متشوقون لرؤيتك في أغسطس.",

    // Final
    "with all our love": "مع كل حبنا",
    "final-title": "نحن متشوقون<br /><span class=\"text-gradient-rose\">للاحتفال معكم.</span>",
    "final-signature": "ريمون وميرنا",

    // Footer
    "footer-names": "ريمون وميرنا",
    "footer-tagline": "إلى الأبد، بدءاً من الثلاثين من أغسطس",
    "footer-location": "القاهرة · 2026",
    "made-with-love": "صُنع بحب بواسطة",

    // Audio
    "music": "موسيقى",
    "playing": "يعمل",

    // Toggle label
    "LangToggle": "En"
  },
  en: {
    // Envelope
    "The grand celebration of": "The grand celebration of",
    "envelope-names": "Remon <em>&amp;</em> Merna",
    "Tap to open": "Tap to open",

    // Hero
    "save-the-date-hero": "✦  Save the date  ✦",
    "we are getting married": "we are getting married",
    "Sunday": "Sunday",
    "Aug 2026": "Aug 2026",
    "Ceremony": "Ceremony",
    "in the evening": "in the evening",
    "Locations": "Locations",
    "Giza-Zamalek": "Giza & Zamalek",
    "Cairo · Egypt": "Cairo · Egypt",
    "scroll-down": "scroll",

    // Photo reveal
    "Two souls": "Two souls",
    "one journey": "one journey",

    // Love story
    "Our story": "Our story",
    "how it began": "how it began",
    "story1": "I\u2019ve loved you for a lifetime in my dreams, today it becomes reality",
    "story2": "My heart had been searching for yours, long before our paths ever crossed",
    "story3": "We are choosing each other, today and every day after",

    // Countdown
    "counting every moment": "counting every moment",
    "until forever": "until forever",
    "days": "days",
    "hours": "hours",
    "minutes": "minutes",
    "seconds": "seconds",

    // Calendar
    "save the date": "save the date",
    "August 2026": "August 2026",
    "calendar-footer": "✦ Sunday · 6:00 pm ✦",

    // Location
    "where it happens": "where it happens",
    "The Church": "The Church",
    "6:00 PM — 7:00 PM": "6:00 PM — 7:00 PM",
    "open in maps": "open in maps →",
    "Wedding Hall": "Wedding Hall",
    "8:00 PM — 12:00 AM": "8:00 PM — 12:00 AM",

    // Gallery
    "moments": "moments",
    "Frozen in time": "Frozen in time",
    "drag-hint": "← drag to explore →",

    // RSVP
    "be with us": "be with us",
    "Kindly reply": "Kindly reply",
    "Your name": "Your name",
    "Email": "Email",
    "Will you attend?": "Will you attend?",
    "Joyfully accept": "Joyfully accept",
    "Regretfully decline": "Regretfully decline",
    "Number of guests": "Number of guests",
    "A note for us": "A note for us",
    "send rsvp": "send rsvp",
    "rsvp-thanks": "Thank you, beautifully received.",
    "rsvp-see-you": "We can\u2019t wait to see you in August.",

    // Final
    "with all our love": "with all our love",
    "final-title": "We can\u2019t wait<br /><span class=\"text-gradient-rose\">to celebrate with you.</span>",
    "final-signature": "Remon & Merna",

    // Footer
    "footer-names": "remon & merna",
    "footer-tagline": "forever, beginning august thirty",
    "footer-location": "cairo · 2026",
    "made-with-love": "Made with love by",

    // Audio
    "music": "music",
    "playing": "playing",

    // Toggle label
    "LangToggle": "العربية"
  }
};

// Keys whose translations contain HTML and must use innerHTML
const htmlKeys = new Set([
  "envelope-names",
  "final-title"
]);

document.addEventListener('DOMContentLoaded', function () {
  var langToggleBtn = document.getElementById('lang-toggle-btn');
  var currentLang = 'en';

  if (!langToggleBtn) return;

  langToggleBtn.addEventListener('click', function () {
    currentLang = currentLang === 'en' ? 'ar' : 'en';

    // Set document direction and language
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';

    // Translate all elements with data-i18n
    var elements = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < elements.length; i++) {
      var el = elements[i];
      var key = el.getAttribute('data-i18n');
      var val = translations[currentLang][key];
      if (val === undefined) continue;

      if (htmlKeys.has(key)) {
        el.innerHTML = val;
      } else {
        el.textContent = val;
      }
    }

    // Update toggle button text
    langToggleBtn.textContent = translations[currentLang]['LangToggle'];

    // Toggle body class for Arabic-specific styles
    if (currentLang === 'ar') {
      document.body.classList.add('ar-active');
    } else {
      document.body.classList.remove('ar-active');
    }
  });
});
