// السلايدر
const slides = document.querySelectorAll('.carousel img'); // جلب جميع الصور داخل العنصر الذي يحتوي على كلاس carousel
let current = 0; // متغير لحفظ رقم الشريحة الحالية (البداية من 0)

// زر السهم "التالي"
document.getElementById('next')?.addEventListener('click', () => { // إذا وُجد زر next أضف له حدث عند الضغط
    slides[current].classList.remove('active'); // إزالة كلاس active من الشريحة الحالية
    current = (current + 1) % slides.length; // الانتقال للشريحة التالية مع الدوران عند آخر شريحة
    slides[current].classList.add('active'); // إضافة كلاس active للشريحة الجديدة
});

// زر السهم "السابق"
document.getElementById('prev')?.addEventListener('click', () => { // إذا وُجد زر prev أضف له حدث عند الضغط
    slides[current].classList.remove('active'); // إزالة كلاس active من الشريحة الحالية
    current = (current - 1 + slides.length) % slides.length; // الانتقال للشريحة السابقة مع الدوران عند أول شريحة
    slides[current].classList.add('active'); // إضافة كلاس active للشريحة الجديدة
});

setInterval(() => { // تكرار تنفيذ هذا الكود كل فترة زمنية محددة
    if (slides.length > 0) { // التأكد أن هناك شرائح أصلًا
        slides[current].classList.remove('active'); // إزالة كلاس active من الشريحة الحالية
        current = (current + 1) % slides.length; // الانتقال للشريحة التالية تلقائيًا
        slides[current].classList.add('active'); // تفعيل الشريحة الجديدة
    }
}, 5000); // التبديل كل 5000 مللي ثانية = 5 ثواني

// القائمة المنسدلة للغة
const langBtn = document.getElementById('langBtn'); // جلب زر اختيار اللغة من الهيدر
const langMenu = document.getElementById('langMenu'); // جلب قائمة اللغات المنسدلة
langBtn?.addEventListener('click', () => { // إذا موجود زر اللغة، أضف له حدث الضغط
    langMenu.classList.toggle('show'); // إظهار/إخفاء قائمة اللغات بالتبديل على كلاس show
});

// اختر كل القوائم المنسدلة
const dropdowns = document.querySelectorAll('.dropdown-dest'); // جلب كل عناصر القائمة المنسدلة الخاصة بالوجهات

dropdowns.forEach(dropdown => { // المرور على كل قائمة منسدلة
  const button = dropdown.querySelector('a'); // الزر الرئيسي الذي يفتح القائمة المنسدلة (الرابط)
  const menu = dropdown.querySelector('.dropdown-menu'); // القائمة الفرعية التي تحتوي على الروابط الداخلية

  button.addEventListener('click', function(e) { // عند الضغط على الزر الرئيسي
    e.preventDefault(); // منع السلوك الافتراضي للرابط (عدم الانتقال/تحديث الصفحة)
    menu.classList.toggle('show'); // إظهار أو إخفاء القائمة الفرعية بالتبديل على كلاس show
  });
});


// إخفاء القوائم عند الضغط خارجها
window.addEventListener('click', (e) => { // إضافة مستمع للضغط على أي مكان في نافذة المتصفح
    // إخفاء قائمة اللغة
    if (!e.target.matches('#langBtn')) langMenu?.classList.remove('show'); // إذا الضغط ليس على زر اللغة، أخفِ قائمة اللغة

    // إخفاء جميع القوائم المنسدلة
    dropdowns.forEach(dropdown => { // المرور على كل قائمة منسدلة للوجهات
        const menu = dropdown.querySelector('.dropdown-menu'); // القائمة الفرعية
        if (!dropdown.contains(e.target)) { // إذا العنصر الذي تم الضغط عليه ليس داخل هذه القائمة
            menu.classList.remove('show'); // إزالة كلاس show لإخفاء القائمة
        }
    });
});

function toggleText(btn) { // دالة التبديل بين إظهار/إخفاء النص الإضافي "اقرأ المزيد"
    const paragraph = btn.previousElementSibling; // جلب الفقرة التي تسبق الزر مباشرة
    const moreText = paragraph.querySelector(".more"); // جزء النص المخفي داخل span بكلاس more
    const dots = paragraph.querySelector(".dots"); // النقاط الثلاثة ... داخل span بكلاس dots

    if (moreText.style.display === "none" || !paragraph.classList.contains("show")) { // إذا كان النص المخفي غير ظاهر أو الفقرة ليس عليها كلاس show
        moreText.style.display = "inline"; // إظهار النص الإضافي
        dots.style.display = "none"; // إخفاء النقاط الثلاثة
        btn.textContent = "إخفاء"; // تغيير نص الزر إلى "إخفاء"
        paragraph.classList.add("show"); // إضافة كلاس show للدلالة أنه في حالة عرض
    } else {
        moreText.style.display = "none"; // إخفاء النص الإضافي
        dots.style.display = "inline"; // إظهار النقاط الثلاثة من جديد
        btn.textContent = "اقرأ المزيد"; // إعادة نص الزر إلى "اقرأ المزيد"
        paragraph.classList.remove("show"); // إزالة كلاس show من الفقرة
    }
}

// ===== سلايدر جميع القوائم على شكل كروت =====
document.querySelectorAll(".slider-wrapper").forEach((slider) => { // البحث عن كل سلايدر عام يحتوي على كلاس slider-wrapper
    const track = slider.querySelector(".cards-track"); // المسار الذي تتحرك داخله الكروت
    const btnLeft = slider.querySelector(".slide-btn.left"); // زر تحريك السلايدر إلى اليسار (حسب التصميم)
    const btnRight = slider.querySelector(".slide-btn.right"); // زر تحريك السلايدر إلى اليمين (حسب التصميم)

    if (btnLeft) { // إذا كان زر اليسار موجود
        btnLeft.addEventListener("click", () => { // عند الضغط على زر اليسار
            track.scrollBy({ left: 300, behavior: "smooth" }); // تحريك المسار 300 بكسل أفقيًا مع سكرول ناعم
        });
    }

    if (btnRight) { // إذا كان زر اليمين موجود
        btnRight.addEventListener("click", () => { // عند الضغط على زر اليمين
            track.scrollBy({ left: -300, behavior: "smooth" }); // تحريك المسار عكس الاتجاه 300 بكسل مع سكرول ناعم
        });
    }
});

// هذا السكربت يعمل على أي صفحة تحتوي على class map-card و div id="map"
document.addEventListener("DOMContentLoaded", function () { // تنفيذ الكود بعد تحميل محتوى الصفحة بالكامل

    const mapElement = document.getElementById("map"); // جلب عنصر الخريطة الرئيسي الذي يحمل id="map"
    if (!mapElement) return; // إذا لم توجد خريطة في الصفحة، لا تكمل الكود

    const cards = document.querySelectorAll(".map-card"); // جلب جميع الكروت التي تمثل أماكن على الخريطة
    if (cards.length === 0) return; // إذا لا يوجد أي كرت، لا تكمل الكود

    // إحداثيات أول كرت (fallback)
    const fallbackLat = parseFloat(cards[0].dataset.lat); // قراءة خط العرض من data-lat لأول كرت كموقع افتراضي
    const fallbackLng = parseFloat(cards[0].dataset.lng); // قراءة خط الطول من data-lng لأول كرت كموقع افتراضي
    const fallbackZoom = parseInt(cards[0].dataset.zoom) || 9; // قراءة مستوى الزوم من data-zoom أو 9 إذا غير موجود

    // إحداثيات من الـ HTML إذا موجودة
    const firstLat = parseFloat(mapElement.dataset.firstLat) || fallbackLat; // استخدام بيانات مخصصة من الخريطة إذا موجودة، وإلا استخدم fallback
    const firstLng = parseFloat(mapElement.dataset.firstLng) || fallbackLng; // نفس الشيء لخط الطول
    const firstZoom = parseInt(mapElement.dataset.firstZoom) || fallbackZoom; // نفس الشيء لمستوى الزوم

    // إنشاء الخريطة
    var map = L.map("map").setView([firstLat, firstLng], firstZoom); // إنشاء خريطة Leaflet داخل العنصر map وتعيين المركز والزوم الأولي

    // إضافة Tile Layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { // استخدام خريطة OpenStreetMap كطبقة أساسية
        attribution: '&copy; OpenStreetMap contributors' // نص الحقوق الذي يظهر أسفل الخريطة
    }).addTo(map); // إضافة الطبقة إلى الخريطة

    // إضافة الماركز وربطها بالكروت
    const markers = []; // مصفوفة لحفظ جميع الـ markers في الخريطة

    cards.forEach(card => { // المرور على كل كرت يمثل موقعًا
        const lat = parseFloat(card.dataset.lat); // قراءة خط العرض للموقع من بيانات الكرت
        const lng = parseFloat(card.dataset.lng); // قراءة خط الطول للموقع من بيانات الكرت
        const name = card.dataset.name; // قراءة اسم المكان من بيانات الكرت
        const imgSrc = card.querySelector('img').getAttribute('src');  // أخذ مسار الصورة داخل الكرت لاستخدامه كأيقونة
        const zoom = parseInt(card.dataset.zoom) || 13; // قراءة مستوى الزوم الخاص بالمكان أو استخدام 13 كافتراضي

        // إنشاء أيقونة مخصصة لكل Marker
        const customIcon = L.icon({ // إنشاء أيقونة مخصصة للماركر
            iconUrl: imgSrc, // استخدام صورة الكرت كأيقونة للماركر
            iconSize: [50, 50], // حجم الأيقونة (عرض × ارتفاع)
            iconAnchor: [25, 25], // نقطة الارتكاز داخل الأيقونة (منتصفها)
            popupAnchor: [0, -25], // موضع ظهور البوب أب بالنسبة للأيقونة
            className: "custom-marker" // كلاس CSS مخصص لتعديل شكل الأيقونة
        });

        // إنشاء Marker
        const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map) // إنشاء ماركر بالموقع المحدد وبالأيقونة المخصصة وإضافته للخريطة
            .bindPopup(name); // ربط بوب أب باسم المكان عند الضغط/المرور

        markers.push(marker); // إضافة الماركر إلى المصفوفة للحفظ لاحقًا

        // تفاعل الكرت → الخريطة
        card.addEventListener("mouseenter", () => { // عند تمرير الماوس فوق الكرت
            map.flyTo([lat, lng], zoom, { animate: true, duration: 1.5 }); // تحريك الخريطة إلى موقع الكرت مع زوم مناسب وحركة ناعمة
            marker.openPopup(); // فتح البوب أب الخاص بالماركر
            card.style.transform = "scale(1.05)"; // تكبير بسيط للكرت عند المرور عليه
            card.style.boxShadow = "0 10px 25px rgba(0,0,0,0.2)"; // إضافة ظل للكرت لإبرازه
        });

        card.addEventListener("mouseleave", () => { // عند خروج الماوس من الكرت
            marker.closePopup(); // إغلاق البوب أب
            card.style.transform = "scale(1)"; // إعادة حجم الكرت للوضع الطبيعي
            card.style.boxShadow = "none"; // إزالة الظل

            // يرجع للزوم الأول بعد التمرير فقط
            map.flyTo([firstLat, firstLng], firstZoom, { animate: true, duration: 1.5 }); // إعادة الخريطة لموقعها الأصلي وزومها الأصلي
        });

        // الضغط فقط يروح للموقع — بدون أي تثبيت للزوم
        card.addEventListener("click", () => { // عند الضغط على الكرت
            map.flyTo([lat, lng], zoom, { animate: true, duration: 1.5 }); // تحريك الخريطة لموقع هذا المكان
            marker.openPopup(); // فتح البوب أب للمكان
        });

        // تفاعل الماركر → الكرت
        marker.on('mouseover', () => { // عند تمرير الماوس فوق الماركر
            card.style.transform = "scale(1.05)"; // تكبير الكرت المرتبط بهذا الماركر
            card.style.boxShadow = "0 10px 25px rgba(0,0,0,0.2)"; // إضافة ظل للكرت لإبرازه
        });

        marker.on('mouseout', () => { // عند خروج الماوس من فوق الماركر
            card.style.transform = "scale(1)"; // إعادة حجم الكرت للوضع الطبيعي
            card.style.boxShadow = "none"; // إزالة الظل
        });

        marker.on('click', () => { // عند الضغط على الماركر
            map.flyTo([lat, lng], zoom, { animate: true, duration: 1.2 }); // تحريك الخريطة نحو هذا المكان مع زوم معين
            marker.openPopup(); // فتح البوب أب

            // إعادة باقي الكروت لطبيعتها
            cards.forEach(c => { // المرور على كل الكروت
                c.style.transform = "scale(1)"; // إعادة الحجم الطبيعي
                c.style.boxShadow = "none"; // إزالة الظلال
            });

            card.scrollIntoView({ behavior: "smooth", block: "center" }); // تمرير الصفحة بحيث يظهر الكرت في المنتصف بسلاسة
            card.style.transform = "scale(1.05)"; // تكبير الكرت المختار
            card.style.boxShadow = "0 10px 25px rgba(0,0,0,0.25)"; // إضافة ظل أقوى لتمييز الكرت
        });
    });
});

// شغّل الكود فقط إذا الصفحة تحتوي على عناصر مواقيت الصلاة
if (document.getElementById("prayer-times")) { // التأكد من وجود عنصر مواقيت الصلاة في الصفحة قبل تشغيل هذا الجزء

    navigator.geolocation.getCurrentPosition(success, error); // طلب إحداثيات الموقع من المتصفح واستدعاء success أو error

    function success(position) { // دالة تُستدعى عند نجاح الحصول على الموقع
        const lat = position.coords.latitude; // الحصول على خط العرض من كائن الموقع
        const lng = position.coords.longitude; // الحصول على خط الطول من كائن الموقع

        // جلب مواقيت الصلاة
        fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=2`) // طلب بيانات مواقيت الصلاة من API لموقع AlAdhan
            .then(res => res.json()) // تحويل الاستجابة إلى JSON
            .then(data => { // التعامل مع البيانات بعد جلبها
                const t = data.data.timings; // استخراج كائن المواقيت من البيانات
                const container = document.getElementById("prayer-times"); // جلب العنصر الذي سيعرض مواقيت الصلاة
                container.innerHTML = `
                    <p><strong>الفجر:</strong> ${t.Fajr}</p>
                    <p><strong>الظهر:</strong> ${t.Dhuhr}</p>
                    <p><strong>العصر:</strong> ${t.Asr}</p>
                    <p><strong>المغرب:</strong> ${t.Maghrib}</p>
                    <p><strong>العشاء:</strong> ${t.Isha}</p>
                `;
            });

        // جلب اتجاه القبلة
        fetch(`https://api.aladhan.com/v1/qibla/${lat}/${lng}`) // طلب بيانات اتجاه القبلة من API آخر في نفس الخدمة
            .then(res => res.json()) // تحويل الاستجابة إلى JSON
            .then(data => { // التعامل مع البيانات
                const direction = data.data.direction.toFixed(2); // استخراج اتجاه القبلة والتقريب لرقمين بعد الفاصلة
                const directionEl = document.getElementById("qibla-direction"); // العنصر الذي سيعرض رقم الاتجاه
                const arrowEl = document.querySelector(".qibla-arrow"); // عنصر السهم الذي سيتم تدويره

                directionEl.innerHTML = `اتجاه القبلة: ${direction}°`; // كتابة نص اتجاه القبلة في الصفحة
                arrowEl.style.transform = `rotate(${direction}deg)`; // تدوير السهم بدرجة اتجاه القبلة
            });
    }

    function error() { // دالة تُستدعى إذا فشل الحصول على الموقع من المستخدم
        alert("الرجاء السماح بالوصول إلى موقعك للحصول على مواقيت الصلاة واتجاه القبلة."); // إظهار تنبيه للمستخدم يطلب السماح بالموقع
    }
}

/* ============================
   دوال مساعدة لربط البيانات بالحساب الحالي
   ============================ */

// ترجع إيميل المستخدم الحالي إذا كان مسجل دخول، أو null إذا لا
function getCurrentUserEmail() {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const email = localStorage.getItem("userEmail");
    if (!isLoggedIn || !email) return null;
    return email;
}

// ترجع مفتاح خاص بالمستخدم مثلاً: favorites_saif@gmail.com
function getUserKey(keyName) {
    const email = getCurrentUserEmail();
    if (!email) return null;
    return `${keyName}_${email}`;
}

// قراءة قيمة (JSON) من التخزين خاصة بالمستخدم
function userGet(keyName, defaultValue) {
    const fullKey = getUserKey(keyName);
    if (!fullKey) return defaultValue;
    const raw = localStorage.getItem(fullKey);
    if (!raw) return defaultValue;
    try {
        return JSON.parse(raw);
    } catch (e) {
        return defaultValue;
    }
}

// تخزين قيمة (JSON) خاصة بالمستخدم
function userSet(keyName, value) {
    const fullKey = getUserKey(keyName);
    if (!fullKey) return;
    localStorage.setItem(fullKey, JSON.stringify(value));
}

/* ============================
   نظام المفضلة (لكل حساب لوحده)
   ============================ */

// مصفوفة المفضلة للحساب الحالي
let favorites = userGet("favorites", []);

// دالة حفظ المفضلة للحساب الحالي
function saveFavoritesForCurrentUser() {
    userSet("favorites", favorites);
}

// دالة التعامل مع الضغط على القلب داخل الكرت
function toggleFavorite(el, event) {
    event.stopPropagation();
    event.preventDefault();

    // يجب تسجيل الدخول أولاً لاستخدام المفضلة
    if (!getCurrentUserEmail()) {
        alert("الرجاء تسجيل الدخول لاستخدام المفضلة.");
        return;
    }

    let card = el.closest(".card");
    if (!card) return;

    let cardId = card.getAttribute("data-id");
    let cardHTML = card.outerHTML;

    let exists = favorites.some(f => f.id === cardId);

    if (exists) {
        favorites = favorites.filter(f => f.id !== cardId);
        el.classList.remove("active");
    } else {
        favorites.push({
            id: cardId,
            html: cardHTML
        });
        el.classList.add("active");
    }

    saveFavoritesForCurrentUser();

    if (document.getElementById("favContainer")) renderFavorites();
}

// تفعيل القلوب عند تحميل الصفحة (إذا الكرت موجود بالمفضلة سابقاً)
function activateSavedHearts() {
    favorites = userGet("favorites", []); // تحميل مفضلة الحساب الحالي
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        let cardId = card.getAttribute("data-id");
        let heart = card.querySelector(".heart-icon");
        if (!heart) return;

        let exists = favorites.some(f => f.id === cardId);
        if (exists) heart.classList.add("active");
    });
}

// عرض الكروت في صفحة المفضلة
function renderFavorites() {
    const container = document.getElementById("favContainer");
    if (!container) return;

    // لو المستخدم غير مسجل دخول
    if (!getCurrentUserEmail()) {
        container.innerHTML = `<p style="text-align:center;">الرجاء تسجيل الدخول لعرض المفضلة.</p>`;
        return;
    }

    favorites = userGet("favorites", []);

    if (!favorites || favorites.length === 0) {
        container.innerHTML = `<p style="text-align:center;">لا توجد عناصر في المفضلة.</p>`;
        return;
    }

    container.innerHTML = "";

    favorites.forEach(item => {
        let div = document.createElement("div");
        div.innerHTML = item.html;
        container.appendChild(div);
    });
}

// عند تحميل الصفحة: فعّل القلوب + اعرض المفضلة إن وجدت
document.addEventListener("DOMContentLoaded", () => {
    activateSavedHearts();
    renderFavorites();
});

// جعل الكرت بالكامل يفتح الرابط الموجود في data-link
document.addEventListener('click', function (e) {
    const card = e.target.closest('.card[data-link]');
    if (!card) return;

    if (e.target.closest('.heart-icon') || e.target.closest('.btn')) {
        return;
    }

    const url = card.dataset.link;
    if (url) {
        window.location.href = url;
    }
});

// ==================================================================
// مخطط الرحلات + صفحة "خطة رحلتي" (لكل حساب لوحده)
// ==================================================================

document.addEventListener("DOMContentLoaded", function () {

  // مفتاح التخزين يكون خاص بالمستخدم الحالي
  function getTripStorageKey() {
    return getUserKey("myTripPlanCards"); // مثلاً: myTripPlanCards_saif@gmail.com
  }

  // دوال مساعدة للتعامل مع التخزين
  function getStoredCards() {
    const key = getTripStorageKey();
    if (!key) return []; // إذا ما في حساب، نرجع مصفوفة فاضية

    try {
      const raw = JSON.parse(localStorage.getItem(key)) || [];
      const cleaned = raw.filter(item => typeof item === "string" && item.trim() !== "");
      if (cleaned.length !== raw.length) {
        localStorage.setItem(key, JSON.stringify(cleaned));
      }
      return cleaned;
    } catch (e) {
      return [];
    }
  }

  function setStoredCards(arr) {
    const key = getTripStorageKey();
    if (!key) return;
    localStorage.setItem(key, JSON.stringify(arr));
  }

  // ================================================================
  // 1) صفحة "مخطط الرحلات" Trip planner.html
  // ================================================================

  const destinationSelect = document.getElementById("destination");
  const generateBtn       = document.getElementById("generateTripsBtn");

  const tripCardsWrapper = document.getElementById("suggestedTrips");
  const tripCards        = tripCardsWrapper
    ? tripCardsWrapper.querySelectorAll(".trip-card")
    : [];

  function filterTrips() {
    if (!destinationSelect || !tripCards.length) return;

    const destValue = destinationSelect.value;

    tripCards.forEach(function (card) {
      const cardDest = card.dataset.destination || "";
      let show = true;

      if (destValue && cardDest !== destValue) {
        show = false;
      }

      card.style.display = show ? "block" : "none";
    });
  }

  if (generateBtn && destinationSelect && tripCards.length) {
    generateBtn.addEventListener("click", filterTrips);
  }

  const addToPlanButtons = document.querySelectorAll(".add-to-plan");

  function getCardHtmlForStorage(card) {
    const clone = card.cloneNode(true);
    const addBtn = clone.querySelector(".add-to-plan");
    if (addBtn) addBtn.remove();

    const removeBtn = clone.querySelector(".remove-trip-btn");
    if (removeBtn) removeBtn.remove();

    return clone.outerHTML.trim();
  }

  (function initAddButtonsState() {
    const stored = getStoredCards();

    addToPlanButtons.forEach(function (btn) {
      const card = btn.closest(".card");
      if (!card) return;
      const html = getCardHtmlForStorage(card);

      if (stored.includes(html)) {
        btn.textContent = "تمت الإضافة إلى الخطة";
        btn.classList.add("in-plan");
      }
    });
  })();

  addToPlanButtons.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();

      // لازم يكون مسجل دخول علشان يضيف للخطة
      if (!getCurrentUserEmail()) {
        alert("الرجاء تسجيل الدخول لإضافة المسارات إلى خطتك.");
        return;
      }

      const card = this.closest(".card");
      if (!card) return;

      const html = getCardHtmlForStorage(card);
      let cardsArr = getStoredCards();

      const index = cardsArr.indexOf(html);

      if (index !== -1) {
        cardsArr.splice(index, 1);
        setStoredCards(cardsArr);

        this.textContent = "إضافة إلى خطتي";
        this.classList.remove("in-plan");
      } else {
        cardsArr.push(html);
        setStoredCards(cardsArr);

        this.textContent = "تمت الإضافة إلى الخطة";
        this.classList.add("in-plan");
      }
    });
  });

  // ================================================================
  // 2) صفحة "خطة رحلتي" myplan.html
  // ================================================================

  const cardsContainer     = document.getElementById("planCardsContainer");
  const planPreviewText    = document.getElementById("planPreviewText");
  const viewPlanBtn        = document.getElementById("viewPlanBtn");
  const downloadPlanPdfBtn = document.getElementById("downloadPlanPdfBtn");
  const shareWhatsAppBtn   = document.getElementById("shareWhatsAppBtn");
  const modalOverlay       = document.getElementById("tripPlanModalOverlay");
  const modalList          = document.getElementById("tripPlanModalList");
  const closeModalBtns     = document.querySelectorAll(".close-trip-plan-modal");

  const storedCards = getStoredCards();

  if (cardsContainer) {
    if (!getCurrentUserEmail()) {
      if (planPreviewText) {
        planPreviewText.textContent = "الرجاء تسجيل الدخول لعرض خطة رحلتك.";
      }
    } else if (!storedCards.length) {
      if (planPreviewText) {
        planPreviewText.textContent = "لا توجد أي عناصر محفوظة بعد.";
      }
    } else {
      storedCards.forEach(function (html) {
        const wrapper = document.createElement("div");
        wrapper.innerHTML = html.trim();
        const card = wrapper.firstElementChild;
        if (!card) return;

        const body = card.querySelector(".card-body") || card;
        const removeBtn = document.createElement("button");
        removeBtn.className = "remove-trip-btn";
        removeBtn.textContent = "حذف المسار";
        body.appendChild(removeBtn);

        cardsContainer.appendChild(card);
      });

      if (planPreviewText) {
        planPreviewText.textContent = `تمت إضافة ${storedCards.length} مسارًا إلى خطتك.`;
      }
    }
  }

  function extractLinesFromCards() {
    const lines = [];
    if (!cardsContainer) return lines;

    const cards = cardsContainer.querySelectorAll(".card");
    cards.forEach(function (card) {
      const titleEl = card.querySelector(".card-title");
      const textEl  = card.querySelector(".card-text");

      const titleText = titleEl ? titleEl.textContent.trim() : "";
      const descText  = textEl ? textEl.textContent.trim()  : "";

      const line =
        (titleText || "مسار بدون عنوان") +
        (descText ? " – " + descText : "");

      lines.push(line);
    });

    return lines;
  }

  if (viewPlanBtn && modalOverlay && modalList && cardsContainer) {
    viewPlanBtn.addEventListener("click", function () {
      const lines = extractLinesFromCards();
      modalList.innerHTML = "";

      if (!lines.length) {
        const li = document.createElement("li");
        li.textContent = "لا توجد عناصر في الخطة حتى الآن.";
        modalList.appendChild(li);
      } else {
        lines.forEach(function (line) {
          const li = document.createElement("li");
          li.textContent = line;
          modalList.appendChild(li);
        });
      }

      modalOverlay.style.display = "flex";
    });
  }

  if (closeModalBtns && modalOverlay) {
    closeModalBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        modalOverlay.style.display = "none";
      });
    });

    modalOverlay.addEventListener("click", function (e) {
      if (e.target === modalOverlay) {
        modalOverlay.style.display = "none";
      }
    });
  }

  if (downloadPlanPdfBtn && cardsContainer) {
    downloadPlanPdfBtn.addEventListener("click", function () {
      const lines = extractLinesFromCards();
      if (!lines.length) {
        return;
      }

      let content = ` 
        <!DOCTYPE html>
        <html lang="ar" dir="rtl">
        <head>
          <meta charset="UTF-8">
          <title>خطة رحلتي - رحول</title>
          <style>
            body {
              font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
              direction: rtl;
              text-align: right;
              padding: 40px 0;
              margin: 0;
              background: #f3f3f3;
            }
            .plan-wrapper {
              display: flex;
              justify-content: center;
              align-items: flex-start;
            }
            .plan-card {
              background: #ffffff;
              border-radius: 18px;
              padding: 32px 32px 24px;
              max-width: 800px;
              width: 90%;
              box-shadow: 0 10px 30px rgba(0,0,0,0.12);
            }
            .plan-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 24px;
              gap: 16px;
            }
            .plan-title {
              font-size: 26px;
              font-weight: 700;
              margin: 0;
            }
            .plan-logo img {
              height: 60px;
              filter: drop-shadow(0 8px 28px rgba(0,0,0,0.75));
            }
            .plan-list {
              list-style: none;
              padding: 0;
              margin: 0;
            }
            .plan-list li {
              margin-bottom: 10px;
              font-size: 16px;
              position: relative;
              padding-right: 18px;
            }
            .plan-list li::before {
              content: "•";
              position: absolute;
              right: 0;
              top: 0;
              color: #720f0f;
              font-size: 18px;
            }
            .footer {
              margin-top: 28px;
              text-align: center;
              font-size: 12px;
              color: #777;
            }
          </style>
        </head>
        <body>
          <div class="plan-wrapper">
            <div class="plan-card">
              <div class="plan-header">
                <h1 class="plan-title">خطة رحلتي</h1>
                <div class="plan-logo">
                  <img src="images/logo.png" alt="شعار رحول">
                </div>
              </div>
              <ul class="plan-list">
      `;

      lines.forEach(function (line) {
        const safe = line
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
        content += `<li>${safe}</li>`;
      });

      content += ` 
              </ul>
              <div class="footer">
                &copy; ${new Date().getFullYear()} رحول - جميع الحقوق محفوظة.
              </div>
            </div>
          </div>
        </body>
        </html>
      `;

      const printWindow = window.open("", "_blank");
      if (!printWindow) {
        return;
      }

      printWindow.document.open();
      printWindow.document.write(content);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    });
  }

  if (shareWhatsAppBtn && cardsContainer) {
    shareWhatsAppBtn.addEventListener("click", function () {
      const lines = extractLinesFromCards();
      if (!lines.length) {
        return;
      }

      const message =
        "خطة رحلتي:\n\n" +
        lines.map(line => "• " + line).join("\n");

      const url = "https://wa.me/?text=" + encodeURIComponent(message);
      window.open(url, "_blank");
    });
  }

  if (cardsContainer) {
    cardsContainer.addEventListener("click", function (e) {
      if (!e.target.classList.contains("remove-trip-btn")) return;

      const card = e.target.closest(".card");
      if (!card) return;

      card.remove();

      const newCards = [];
      cardsContainer.querySelectorAll(".card").forEach(function (c) {
        const clone = c.cloneNode(true);
        const btn = clone.querySelector(".remove-trip-btn");
        if (btn) btn.remove();
        newCards.push(clone.outerHTML);
      });
      setStoredCards(newCards);

      if (planPreviewText) {
        if (newCards.length === 0) {
          planPreviewText.textContent = "لا توجد أي عناصر محفوظة بعد.";
        } else {
          planPreviewText.textContent = `تمت إضافة ${newCards.length} مسارًا إلى خطتك.`;
        }
      }
    });
  }

  function showToast(message) {
    // فاضية متعمد
  }
});

// =======================
// تسجيل الدخول + تغيير زر النافبار
// =======================

document.addEventListener("DOMContentLoaded", function () {

    const openLoginBtn    = document.getElementById("openLoginModal");
    const authModal       = document.getElementById("authModal");
    const closeAuth       = document.getElementById("closeAuth");
    const showRegister    = document.getElementById("showRegister");
    const showLogin       = document.getElementById("showLogin");
    const loginSection    = document.getElementById("loginSection");
    const registerSection = document.getElementById("registerSection");
    const registerForm    = document.getElementById("registerForm");
    const loginForm       = document.getElementById("loginForm");
    const loginLogoutBtn  = document.getElementById("loginLogoutBtn");

    // فتح المودال عند الضغط على زر "تسجيل الدخول" (لو استخدمناه مباشرة)
    if (openLoginBtn && authModal) {
        openLoginBtn.addEventListener("click", function () {
            authModal.style.display = "block";
        });
    }

    // زر النافبار (تسجيل الدخول / تسجيل الخروج)
    if (loginLogoutBtn) {
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        loginLogoutBtn.textContent = isLoggedIn ? "تسجيل الخروج" : "تسجيل الدخول";

        loginLogoutBtn.addEventListener("click", function () {
            const nowLoggedIn = localStorage.getItem("isLoggedIn") === "true";

            if (nowLoggedIn) {
    // تسجيل خروج
    localStorage.removeItem("isLoggedIn");
    window.location.reload();
} else {
    
                // فتح مودال تسجيل الدخول
                if (authModal) authModal.style.display = "block";
            }
        });
    }

    // إغلاق المودال عند الضغط على X
    if (closeAuth && authModal) {
        closeAuth.addEventListener("click", function () {
            authModal.style.display = "none";
        });
    }

    // إغلاق المودال عند الضغط خارج الصندوق
    window.addEventListener("click", function (e) {
        if (e.target === authModal) {
            authModal.style.display = "none";
        }
    });

    // الانتقال من تسجيل الدخول إلى إنشاء حساب
    if (showRegister && loginSection && registerSection) {
        showRegister.addEventListener("click", function (e) {
            e.preventDefault();
            loginSection.style.display = "none";
            registerSection.style.display = "block";
        });
    }

    // الانتقال من إنشاء حساب إلى تسجيل الدخول
    if (showLogin && loginSection && registerSection) {
        showLogin.addEventListener("click", function (e) {
            e.preventDefault();
            registerSection.style.display = "none";
            loginSection.style.display = "block";
        });
    }

    // إنشاء حساب جديد
    if (registerForm) {
        registerForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const email       = document.getElementById("regEmail").value.trim();
            const pass        = document.getElementById("regPassword").value.trim();
            const passConfirm = document.getElementById("regPasswordConfirm").value.trim();

            if (pass !== passConfirm) {
                alert("كلمتا المرور غير متطابقتين");
                return;
            }

            if (pass.length < 4) {
                alert("كلمة المرور يجب أن تكون 4 أحرف على الأقل");
                return;
            }

            localStorage.setItem("userEmail", email);
            localStorage.setItem("userPassword", pass);

            alert("تم إنشاء الحساب بنجاح! يمكنك تسجيل الدخول الآن.");

            registerSection.style.display = "none";
            loginSection.style.display = "block";
        });
    }

    // تسجيل الدخول
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const savedEmail    = localStorage.getItem("userEmail");
            const savedPassword = localStorage.getItem("userPassword");

            const email    = document.getElementById("loginEmail").value.trim();
            const password = document.getElementById("loginPassword").value.trim();

            if (!savedEmail) {
                alert("لا يوجد حساب مسجل. الرجاء إنشاء حساب.");
                return;
            }

           if (email === savedEmail && password === savedPassword) {
    localStorage.setItem("isLoggedIn", "true");
    if (authModal) authModal.style.display = "none";
    window.location.reload();
} else {

                alert("الإيميل أو كلمة المرور غير صحيحة");
            }
        });
    }

});

/* =========================
   Contact Page Logic
   يشتغل فقط إذا كنا في صفحة contact.html
   ========================= */

document.addEventListener("DOMContentLoaded", () => {

  // نتحقق: هل عناصر صفحة اتصل بنا موجودة؟
  const contactForm = document.getElementById("contactForm");
  const starsWrap   = document.getElementById("stars");
  const formStatus  = document.getElementById("formStatus");
  const ratingResult = document.getElementById("ratingResult");

  // إذا ما لقينا الفورم ولا النجوم = معناها مو صفحة اتصل بنا -> نطلع بدون ما نسوي شيء
  if (!contactForm && !starsWrap) return;

  /* ---------- (1) نموذج التواصل ---------- */

  // دالة: جلب الرسائل المحفوظة من localStorage
  function getMessages() {
    try {
      return JSON.parse(localStorage.getItem("rahoolMessages")) || [];
    } catch {
      return [];
    }
  }

  // دالة: حفظ الرسائل في localStorage
  function saveMessages(arr) {
    localStorage.setItem("rahoolMessages", JSON.stringify(arr));
  }

  // تشغيل الكود فقط إذا الفورم موجود
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault(); // يمنع تحديث الصفحة

      // قراءة القيم من الحقول
      const name    = document.getElementById("name")?.value.trim();
      const email   = document.getElementById("email")?.value.trim();
      const type    = document.getElementById("type")?.value;
      const message = document.getElementById("message")?.value.trim();

      // تحقق سريع: أي حقل ناقص؟
      if (!name || !email || !type || !message) {
        if (formStatus) {
          formStatus.textContent = "❌ تأكد من تعبئة جميع الحقول.";
          formStatus.className = "status err";
        }
        return;
      }

      // إنشاء كائن (Object) للرسالة
      const newMsg = {
        name,
        email,
        type,
        message,
        createdAt: new Date().toISOString() // تاريخ الإرسال
      };

      // حفظ الرسالة
      const all = getMessages();
      all.unshift(newMsg);     // نضيفها بالبداية (الأحدث فوق)
      saveMessages(all);

      // رسالة نجاح للمستخدم
      if (formStatus) {
        formStatus.textContent = "✅ تم إرسال رسالتك بنجاح! شكرًا لتواصلك معنا.";
        formStatus.className = "status ok";
      }

      // تفريغ الحقول
      contactForm.reset();
    });
  }

  /* ---------- (2) التقييم بالنجوم ---------- */

  // دالة: تلوين/تفعيل النجوم حسب القيمة
  function setStars(val) {
    document.querySelectorAll(".star").forEach((btn) => {
      const v = Number(btn.dataset.value);
      btn.classList.toggle("active", v <= val);
    });
  }

  // دالة: تحميل التقييم السابق عند فتح الصفحة
  function loadRating() {
    const saved = Number(localStorage.getItem("rahoolRating") || 0);
    if (saved > 0) {
      setStars(saved);
      if (ratingResult) ratingResult.textContent = `⭐ تقييمك الحالي: ${saved} / 5`;
    }
  }

  // تشغيل التقييم فقط إذا قسم النجوم موجود
  if (starsWrap) {
    starsWrap.addEventListener("click", (e) => {
      const btn = e.target.closest(".star");
      if (!btn) return;

      const val = Number(btn.dataset.value);

      // حفظ التقييم
      localStorage.setItem("rahoolRating", String(val));

      // تحديث واجهة النجوم
      setStars(val);

      // عرض رسالة للمستخدم
      if (ratingResult) ratingResult.textContent = `⭐ شكرًا! تم حفظ تقييمك: ${val} / 5`;
    });

    // تحميل التقييم عند فتح الصفحة
    loadRating();
  }

});






/* =========================================================
   Rahool Admin System (ALL IN script.js) - paste at END
   - Admin login via existing #loginForm
   - Protect admin.html
   - Admin page: add cards + list + delete + clear all + logout
   - City dropdown autocomplete
   - Inject cards into sections by IDs:
     rh-events-section, rh-activities-section, rh-restaurants-section, rh-accommodation-section
   ========================================================= */
(function () {
  "use strict";

  // ===== Admin account (CHANGE ONLY HERE) =====
  const RH_ADMIN_EMAIL = "Rahoul@gmail.com";
  const RH_ADMIN_PASS  = "123456";

  // ===== LocalStorage keys (unique for this system) =====
  const RH_LS = {
    isLoggedIn: "rh_isLoggedIn",
    currentUserEmail: "rh_currentUserEmail",
    cards: "rh_cards",
  };

  const RH_DEFAULT_IMG =
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80&auto=format&fit=crop";

  // ===== Cities (your file names) =====
  const RH_CITIES = [
    { name: "أبها", page: "abha.html" },
    { name: "الأحساء", page: "ahsa.html" },
    { name: "العلا", page: "alula.html" },
    { name: "عسير", page: "assir.html" },
    { name: "الباحة", page: "baha.html" },
    { name: "الدرعية", page: "diriyah.html" },
    { name: "حائل", page: "hail.html" },
    { name: "جازان", page: "jazan.html" },
    { name: "جدة", page: "jeddah.html" },
    { name: "الجبيل", page: "jubail.html" },
    { name: "مدينة الملك عبدالله الاقتصادية", page: "kingabdullah.html" },
    { name: "مكة", page: "mecca.html" },
    { name: "المدينة المنورة", page: "medina.html" },
    { name: "نجران", page: "najran.html" },
    { name: "القصيم", page: "qassim.html" },
    { name: "الرياض", page: "riyadh.html" },
    { name: "تبوك", page: "tabuk.html" },
    { name: "الطائف", page: "taif.html" },
    { name: "ينبع", page: "yanbu.html" },
  ];

  // ===== Helpers =====
  function rh_isLoggedIn() {
    return localStorage.getItem(RH_LS.isLoggedIn) === "true";
  }
  function rh_currentEmail() {
    return (localStorage.getItem(RH_LS.currentUserEmail) || "").trim();
  }
  function rh_isAdmin() {
    return rh_isLoggedIn() && rh_currentEmail().toLowerCase() === RH_ADMIN_EMAIL.toLowerCase();
  }

  function rh_openModal() {
    const modal = document.getElementById("authModal");
    if (modal) modal.style.display = "block";
  }
  function rh_closeModal() {
    const modal = document.getElementById("authModal");
    if (modal) modal.style.display = "none";
  }

  function rh_safeParse(raw) {
    try { return JSON.parse(raw); } catch { return null; }
  }
  function rh_getCards() {
    const raw = localStorage.getItem(RH_LS.cards);
    const data = raw ? rh_safeParse(raw) : [];
    return Array.isArray(data) ? data : [];
  }
  function rh_setCards(arr) {
    localStorage.setItem(RH_LS.cards, JSON.stringify(arr));
  }

  function rh_escapeHtml(str) {
    return String(str ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  // ===== Navbar button (#loginLogoutBtn) =====
  function rh_updateNavbarButton() {
    const btn = document.getElementById("loginLogoutBtn");
    if (!btn) return;

    if (!rh_isLoggedIn()) btn.textContent = "تسجيل الدخول";
    else if (rh_isAdmin()) btn.textContent = "لوحة الأدمن";
    else btn.textContent = "تسجيل الخروج";
  }

  function rh_bindNavbarButton() {
    const btn = document.getElementById("loginLogoutBtn");
    if (!btn) return;

    // لمنع تكرار الربط إذا تكرر تحميل السكربت
    if (btn.dataset.rhBound === "1") return;
    btn.dataset.rhBound = "1";

    btn.addEventListener("click", function () {
      if (!rh_isLoggedIn()) {
        rh_openModal();
        return;
      }
      if (rh_isAdmin()) {
        window.location.href = "admin.html";
        return;
      }
      // normal user logout (نظامنا فقط)
      localStorage.removeItem(RH_LS.isLoggedIn);
      localStorage.removeItem(RH_LS.currentUserEmail);
      window.location.reload();
    });
  }

  // ===== Modal close (#closeAuth) =====
  function rh_bindModalClose() {
    const closeBtn = document.getElementById("closeAuth");
    const modal = document.getElementById("authModal");

    if (closeBtn && closeBtn.dataset.rhBound !== "1") {
      closeBtn.dataset.rhBound = "1";
      closeBtn.addEventListener("click", rh_closeModal);
    }

    if (modal && modal.dataset.rhBound !== "1") {
      modal.dataset.rhBound = "1";
      modal.addEventListener("click", (e) => {
        if (e.target === modal) rh_closeModal();
      });
    }
  }

  // ===== Login form (#loginForm): admin handled here ONLY =====
  function rh_bindLoginForm() {
    const form = document.getElementById("loginForm");
    if (!form) return;

    // لمنع تكرار الربط
    if (form.dataset.rhBound === "1") return;
    form.dataset.rhBound = "1";

    form.addEventListener("submit", function (e) {
      const email = document.getElementById("loginEmail")?.value.trim() || "";
      const pass  = document.getElementById("loginPassword")?.value.trim() || "";

      // إذا بيانات الأدمن = نمسكها إحنا
      if (email.toLowerCase() === RH_ADMIN_EMAIL.toLowerCase() && pass === RH_ADMIN_PASS) {
        e.preventDefault();
        localStorage.setItem(RH_LS.isLoggedIn, "true");
        localStorage.setItem(RH_LS.currentUserEmail, email);
        rh_closeModal();
        rh_updateNavbarButton();
        window.location.href = "admin.html";
        return;
      }

      // غير كذا: لا نتدخل — خليه يكمل نظامك القديم
    });
  }

  // ===== Protect admin.html =====
  function rh_protectAdminPage() {
    const isAdminPage = window.location.pathname.toLowerCase().includes("admin.html");
    if (!isAdminPage) return;

    if (!rh_isAdmin()) {
      alert("غير مصرح. لازم تسجل دخول بحساب الأدمن.");
      window.location.href = "index.html";
    }
  }

  // ===== Inject cards to sections by ID =====
  function rh_getTrackBySectionId(sectionId) {
    const sec = document.getElementById(sectionId);
    if (!sec) return null;
    return sec.querySelector(".cards-track");
  }

function rh_injectCards() {
  const cards = rh_getCards();
  if (!cards.length) return;

  // ✅ اسم صفحة المدينة الحالية مثل: riyadh.html
  const currentPage = (window.location.pathname.split("/").pop() || "").toLowerCase();

  const sectionMap = {
    events: "rh-events-section",
    activities: "rh-activities-section",
    restaurants: "rh-restaurants-section",
    accommodation: "rh-accommodation-section"
  };

  for (const c of cards) {

    // ✅ (1) فلترة المدينة: اعرض فقط إذا المدينة المختارة = الصفحة الحالية
    const cardCityPage = (c.cityPage || "").trim().toLowerCase();

    

    // إذا ما فيه cityPage (يعني ما تم اختيار مدينة من الأدمن) تجاهله
    if (!cardCityPage) continue;

    // إذا الكرت مو لهذه الصفحة، تجاهله
    if (cardCityPage !== currentPage) continue;

    // ✅ (2) بعدها يكمل الإضافة عادي
    const secId = sectionMap[c.category];
    const track = secId ? rh_getTrackBySectionId(secId) : null;
    if (!track) continue;

    const title = rh_escapeHtml(c.title);
    const desc  = rh_escapeHtml(c.desc);

    const img  = (c.img && c.img.trim()) ? c.img.trim() : RH_DEFAULT_IMG;
    const link = (c.link && c.link.trim()) ? c.link.trim() : (c.cityPage || "");

    const cardEl = document.createElement("div");
    cardEl.className = "card";

    // ✅ للمفضلة
    cardEl.dataset.id = c.id || ("rh_" + Date.now());
    if (link) cardEl.dataset.link = link;

    cardEl.innerHTML = `
      <span class="heart-icon" onclick="toggleFavorite(this, event)">❤</span>
      <img src="${img}" alt="${title}">
      <div class="card-body">
        <div class="card-title">${title}</div>
        <div class="card-text">${desc}</div>
        ${
          link
            ? `<a href="${link}" class="btn" target="_blank">اعرف المزيد</a>`
            : `<a href="#" class="btn" onclick="return false;">بدون رابط</a>`
        }
      </div>
    `;

    track.appendChild(cardEl);
  }
}



  // =========================================================
  // =============== ADMIN PAGE LOGIC (inside script.js) ======
  // =========================================================
  function rh_isAdminPage() {
    return window.location.pathname.toLowerCase().includes("admin.html");
  }

  function rh_adminRenderList() {
    const list = document.getElementById("rhAdminCardsList");
    if (!list) return;

    const cards = rh_getCards();
    if (!cards.length) {
      list.innerHTML = `<div class="rh-adminItem">لا يوجد كروت مضافة.</div>`;
      return;
    }

    list.innerHTML = cards.map((c, idx) => {
      const title = rh_escapeHtml(c.title);
      const desc  = rh_escapeHtml(c.desc);
      const cat   = rh_escapeHtml(c.category);
      const city  = rh_escapeHtml(c.cityName || "");
      const cityPage = rh_escapeHtml(c.cityPage || "");
      if (!cityPage) {alert("لازم تختار المدينة من القائمة.");return;}
      const link  = rh_escapeHtml(c.link || "");
      const img   = rh_escapeHtml(c.img || "");

      return `
        <div class="rh-adminItem" data-idx="${idx}">
          <div class="rh-adminMeta">
            <div><b>${title}</b> <small>(${cat})</small></div>
            <div>${city ? `🏙️ ${city}` : ""}</div>
          </div>

          <div style="margin-top:8px; font-size:13px; color:#374151; line-height:1.7;">
            ${desc}
          </div>

          <div style="margin-top:8px; font-size:12px; color:#6b7280;">
            ${cityPage ? `صفحة المدينة: ${cityPage}` : ""}
            ${link ? `<br>الرابط: ${link}` : ""}
            ${img ? `<br>الصورة: ${img}` : ""}
          </div>

          <div class="rh-adminRow">
            <button class="rh-smallBtn copy" type="button" data-copy="${link || cityPage || ""}">نسخ الرابط</button>
            <button class="rh-smallBtn delete" type="button" data-del="${idx}">حذف</button>
          </div>
        </div>
      `;
    }).join("");
  }

  function rh_adminBindListClicks() {
    const list = document.getElementById("rhAdminCardsList");
    if (!list) return;

    if (list.dataset.rhBound === "1") return;
    list.dataset.rhBound = "1";

    list.addEventListener("click", (e) => {
      const delBtn = e.target.closest("[data-del]");
      if (delBtn) {
        const idx = Number(delBtn.getAttribute("data-del"));
        const cards = rh_getCards();
        cards.splice(idx, 1);
        rh_setCards(cards);
        rh_adminRenderList();
        return;
      }

      const copyBtn = e.target.closest("[data-copy]");
      if (copyBtn) {
        const txt = copyBtn.getAttribute("data-copy") || "";
        if (!txt) return alert("ما فيه رابط لنسخه.");
        navigator.clipboard?.writeText(txt)
          .then(() => alert("تم نسخ الرابط ✅"))
          .catch(() => alert("ما قدرت أنسخ، انسخه يدويًا."));
      }
    });
  }

  function rh_adminBindClearAll() {
    const btn = document.getElementById("rhClearAllBtn");
    if (!btn) return;

    if (btn.dataset.rhBound === "1") return;
    btn.dataset.rhBound = "1";

    btn.addEventListener("click", () => {
      if (!confirm("متأكد تبغى تحذف كل الكروت؟")) return;
      localStorage.removeItem(RH_LS.cards);
      rh_adminRenderList();
    });
  }

  function rh_adminBindLogout() {
    const btn = document.getElementById("rhAdminLogoutBtn");
    if (!btn) return;

    if (btn.dataset.rhBound === "1") return;
    btn.dataset.rhBound = "1";

    btn.addEventListener("click", () => {
      // نظامنا
      localStorage.removeItem(RH_LS.isLoggedIn);
      localStorage.removeItem(RH_LS.currentUserEmail);

      // احتياطًا لو عندك مفاتيح قديمة
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("currentUserEmail");

      window.location.href = "index.html";
    });
  }

  // ===== City dropdown in admin page =====
  function rh_adminBindCityDropdown() {
    const cityInput = document.getElementById("rhCityInput");
    const dropdown = document.getElementById("rhCityDropdown");
    const hidden = document.getElementById("rhCityPage");
    if (!cityInput || !dropdown) return;

    function open() { dropdown.classList.add("is-open"); }
    function close() { dropdown.classList.remove("is-open"); }

    function render(filterText) {
      const q = (filterText || "").trim();
      const list = !q ? RH_CITIES : RH_CITIES.filter(c => c.name.includes(q));

      if (!list.length) {
        dropdown.innerHTML = `<div class="rh-cityOption">لا يوجد نتائج</div>`;
        open();
        return;
      }

      dropdown.innerHTML = list.map(c => `
        <div class="rh-cityOption" data-city="${rh_escapeHtml(c.name)}" data-page="${rh_escapeHtml(c.page)}">
          ${rh_escapeHtml(c.name)}
          <small>${rh_escapeHtml(c.page)}</small>
        </div>
      `).join("");

      open();
    }

    if (cityInput.dataset.rhBound !== "1") {
      cityInput.dataset.rhBound = "1";

      cityInput.addEventListener("focus", () => render(cityInput.value));
      cityInput.addEventListener("input", () => {
        if (hidden) hidden.value = ""; // ما نثبت الرابط إلا إذا اختار من القائمة
        render(cityInput.value);
      });
    }

    if (dropdown.dataset.rhBound !== "1") {
      dropdown.dataset.rhBound = "1";
      dropdown.addEventListener("click", (e) => {
        const opt = e.target.closest(".rh-cityOption");
        if (!opt) return;

        const name = opt.getAttribute("data-city") || "";
        const page = opt.getAttribute("data-page") || "";

        cityInput.value = name;
        if (hidden) hidden.value = page;
        close();
      });
    }

    if (document.documentElement.dataset.rhCityDocBound !== "1") {
      document.documentElement.dataset.rhCityDocBound = "1";
      document.addEventListener("click", (e) => {
        if (!e.target.closest(".rh-cityWrap")) close();
      });
    }
  }

  // ===== Add card in admin page =====
  function rh_adminBindAddForm() {
    const form = document.getElementById("rhAddCardForm");
    if (!form) return;

    if (form.dataset.rhBound === "1") return;
    form.dataset.rhBound = "1";

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const category = document.getElementById("rhCardCategory")?.value || "events";
      const title = (document.getElementById("rhCardTitle")?.value || "").trim();
      const desc  = (document.getElementById("rhCardDesc")?.value || "").trim();
      const link  = (document.getElementById("rhCardLink")?.value || "").trim();
      const img   = (document.getElementById("rhCardImg")?.value || "").trim();

      const cityName = (document.getElementById("rhCityInput")?.value || "").trim();
      const cityPage = (document.getElementById("rhCityPage")?.value || "").trim();

      if (!title || !desc) {
        alert("لازم تكتب العنوان والوصف.");
        return;
      }

      const newCard = {
        id: "rh_" + Date.now(),
        category,
        title,
        desc,
        link: link || cityPage || "",
        img: img || RH_DEFAULT_IMG,
        cityName: cityName || "",
        cityPage: cityPage || ""
      };

      const cards = rh_getCards();
      cards.push(newCard);
      rh_setCards(cards);

      form.reset();
      const ci = document.getElementById("rhCityInput");
      const hp = document.getElementById("rhCityPage");
      if (ci) ci.value = "";
      if (hp) hp.value = "";

      rh_adminRenderList();
      alert("تمت إضافة الكرت ✅");
    });
  }

  // ===== Init =====
  document.addEventListener("DOMContentLoaded", function () {
    // عام لكل الصفحات
    rh_protectAdminPage();
    rh_updateNavbarButton();
    rh_bindNavbarButton();
    rh_bindModalClose();
    rh_bindLoginForm();
    rh_injectCards();

    // خاص بصفحة admin.html فقط
    if (rh_isAdminPage()) {
      rh_adminBindLogout();
      rh_adminBindClearAll();
      rh_adminBindListClicks();
      rh_adminBindCityDropdown();
      rh_adminBindAddForm();
      rh_adminRenderList();
    }
  });

})();


const navToggle = document.querySelector(".nav-toggle"); // زر ☰
const navLinks  = document.querySelector(".nav-links");  // القائمة

function placeMenu() {
  if (!navToggle || !navLinks) return;

  const r = navToggle.getBoundingClientRect();

  // تحت الزر مباشرة
  navLinks.style.left = `${r.left}px`;
  navLinks.style.top  = `${r.bottom + 8}px`; // 8px مسافة بسيطة

  // تأكيدات تمنع CSS القديم يودّيها للوسط
  navLinks.style.right = "auto";
  navLinks.style.transform = "none";
  navLinks.style.margin = "0";
}

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    placeMenu();
    navLinks.classList.toggle("open");
  });

  // لو تغير المقاس/سكرول وهي مفتوحة تبقى تحت الزر
  window.addEventListener("resize", () => {
    if (navLinks.classList.contains("open")) placeMenu();
  });
  window.addEventListener("scroll", () => {
    if (navLinks.classList.contains("open")) placeMenu();
  }, { passive: true });
}



document.addEventListener("click", (e) => {
  if (!navLinks.classList.contains("open")) return;
  if (e.target.closest(".nav-toggle")) return;
  if (e.target.closest(".nav-links")) return;
  navLinks.classList.remove("open");
});

function updateLoginLogoutBtn() {
  const btn = document.getElementById("loginLogoutBtn");
  if (!btn) return;

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  btn.textContent = isLoggedIn ? "تسجيل الخروج" : "تسجيل الدخول";
}

// أول ما تفتح الصفحة
document.addEventListener("DOMContentLoaded", updateLoginLogoutBtn);

// عند الضغط على الزر
document.addEventListener("click", function (e) {
  const btn = e.target.closest("#loginLogoutBtn");
  if (!btn) return;

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (isLoggedIn) {
    // تسجيل خروج
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("currentUserEmail");
    updateLoginLogoutBtn();
  } else {
    // يوديه لصفحة تسجيل الدخول
    window.location.href = "login.html";
  }
});




