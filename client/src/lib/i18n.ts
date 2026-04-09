/*
 * i18n — Midea ALBA Landing Page
 * Two languages: RU (Russian) and UZ (Uzbek)
 */

export type Lang = "ru" | "uz";

export const translations = {
  // ── HEADER ──
  header: {
    telegram: { ru: "Telegram", uz: "Telegram" },
    buyBtn: { ru: "КУПИТЬ ЗА 360$", uz: "360$ GA SOTIB OLISH" },
  },

  // ── HERO ──
  hero: {
    urgencyBadge: { ru: "Акция — осталось", uz: "Aksiya — qoldi" },
    urgencySuffix: { ru: "штук", uz: "dona" },
    headline1: { ru: "+45°C НА УЛИЦЕ?", uz: "+45°C TASHQARIDA?" },
    headline2: { ru: "+22°C ДОМА", uz: "+22°C UYDA" },
    headline3prefix: { ru: "ЗА ", uz: "" },
    headline3highlight: { ru: "3 МИНУТЫ", uz: "3 DAQIQADA" },
    subheadName: { ru: "Midea ALBA", uz: "Midea ALBA" },
    subheadText: {
      ru: " — AI-кондиционер, который работает ",
      uz: " — AI-konditsioner, ",
    },
    subheadQuiet: { ru: "тише шёпота", uz: "shivirdan ham jim" },
    subheadSaves: { ru: "200$/год", uz: "200$/yil" },
    subheadSavesPrefix: { ru: "экономит ", uz: "tejaydi " },
    subheadSuffix: { ru: " и управляется с телефона", uz: " va telefondan boshqariladi" },
    socialProof: { ru: "500+ довольных клиентов", uz: "500+ mamnun mijoz" },
    ctaBuy: { ru: "КУПИТЬ ЗА 360$", uz: "360$ GA SOTIB OLISH" },
    ctaTelegram: { ru: "НАПИСАТЬ В TELEGRAM", uz: "TELEGRAMGA YOZISH" },
    trustInstall: { ru: "Бесплатная установка", uz: "Bepul o'rnatish" },
    trustWarranty: { ru: "Гарантия 3 года", uz: "3 yil kafolat" },
    trustInstallment: { ru: "Рассрочка 0%", uz: "0% bo'lib to'lash" },
    countdownLabel: { ru: "Акция заканчивается через:", uz: "Aksiya tugashiga:" },
    countdownH: { ru: "ч", uz: "s" },
    countdownM: { ru: "м", uz: "d" },
    countdownS: { ru: "с", uz: "s" },
  },

  // ── PAIN POINTS ──
  pains: {
    title: { ru: "УЗНАЁШЬ ", uz: "O'ZINGNI " },
    titleHighlight: { ru: "СЕБЯ", uz: "TANIDINGMI" },
    titleEnd: { ru: "?", uz: "?" },
    subtitle: {
      ru: "Эти проблемы знакомы каждому владельцу обычного кондиционера",
      uz: "Bu muammolar oddiy konditsioner egalariga tanish",
    },
    items: [
      {
        pain: { ru: "Кондей шумит как трактор", uz: "Konditsioner traktor kabi shovqin qiladi" },
        detail: { ru: "Невозможно спать, дети просыпаются", uz: "Uxlab bo'lmaydi, bolalar uyg'onib ketadi" },
        solution: { ru: "ALBA — всего 19 дБ, тише шёпота", uz: "ALBA — atigi 19 dB, shivirdan ham jim" },
      },
      {
        pain: { ru: "Счёт за свет вырос в 2 раза", uz: "Elektr hisob-kitobi 2 barobar oshdi" },
        detail: { ru: "Кондиционер жрёт электричество", uz: "Konditsioner elektr yeyapti" },
        solution: { ru: "AI EcoMaster экономит до 60%", uz: "AI EcoMaster 60% gacha tejaydi" },
      },
      {
        pain: { ru: "Нельзя включить до прихода домой", uz: "Uyga kelgunicha yoqib bo'lmaydi" },
        detail: { ru: "Приходишь в раскалённую квартиру", uz: "Issiq xonadonga kelasiz" },
        solution: { ru: "Wi-Fi управление с телефона", uz: "Telefondan Wi-Fi boshqaruv" },
      },
      {
        pain: { ru: "+45°C, а кондей охлаждает 20 мин", uz: "+45°C, konditsioner 20 daqiqa sovutadi" },
        detail: { ru: "Пока остынет — уже вспотел", uz: "Sovuguncha — terlab bo'lasiz" },
        solution: { ru: "ALBA охлаждает за 3 минуты!", uz: "ALBA 3 daqiqada sovutadi!" },
      },
      {
        pain: { ru: "Скачки напряжения сожгли кондей", uz: "Kuchlanish o'zgarishi konditsionerni yoqdi" },
        detail: { ru: "Ремонт стоил дороже нового", uz: "Ta'mirlash yangisidan qimmatga tushdi" },
        solution: { ru: "Prime Guard — защита от 145V", uz: "Prime Guard — 145V dan himoya" },
      },
      {
        pain: { ru: "Температура скачет ±3°C", uz: "Harorat ±3°C sakraydi" },
        detail: { ru: "То жарко, то холодно — нестабильно", uz: "Goh issiq, goh sovuq — beqaror" },
        solution: { ru: "Точность ±0.5°C — AI держит климат", uz: "±0.5°C aniqlik — AI iqlimni ushlab turadi" },
      },
    ],
    ctaText: { ru: "Хватит мучиться — есть решение!", uz: "Azob chekish yetarli — yechim bor!" },
    ctaBtn: { ru: "РЕШИТЬ ВСЕ ПРОБЛЕМЫ ЗА 360$", uz: "BARCHA MUAMMOLARNI 360$ GA HAL QILISH" },
  },

  // ── KEY NUMBERS ──
  numbers: {
    items: [
      { label: { ru: "Цена вместо 450$", uz: "Narx 450$ o'rniga" } },
      { label: { ru: "Тише шёпота", uz: "Shivirdan ham jim" } },
      { label: { ru: "Экономия электричества", uz: "Elektr tejash" } },
      { label: { ru: "Экономия на счетах", uz: "Hisobda tejash" } },
    ],
  },

  // ── 6 REASONS / FEATURES ──
  features: {
    title: { ru: "6 ПРИЧИН ", uz: "ALBANI TANLASH UCHUN " },
    titleHighlight: { ru: "ВЫБРАТЬ ALBA", uz: "6 SABAB" },
    subtitle: {
      ru: "Технологии, которые меняют ваш комфорт навсегда",
      uz: "Qulayligingizni abadiy o'zgartiradigan texnologiyalar",
    },
    items: [
      {
        title: { ru: "AI ECOMASTER", uz: "AI ECOMASTER" },
        desc: { ru: "ИИ анализирует температуру, влажность и активность", uz: "AI harorat, namlik va faollikni tahlil qiladi" },
        highlight: { ru: "Экономия до 60% на электричестве", uz: "Elektr energiyada 60% gacha tejash" },
      },
      {
        title: { ru: "WI-FI УПРАВЛЕНИЕ", uz: "WI-FI BOSHQARUV" },
        desc: { ru: "Управляй с телефона из любой точки мира", uz: "Dunyoning istalgan joyidan telefondan boshqaring" },
        highlight: { ru: "Включай за 30 мин до прихода", uz: "Kelishdan 30 daqiqa oldin yoqing" },
      },
      {
        title: { ru: "19 ДБ ТИШИНА", uz: "19 DB JIMLIK" },
        desc: { ru: "Тише шёпота — для спальни и детской", uz: "Shivirdan jim — yotoqxona va bolalar xonasi uchun" },
        highlight: { ru: "Обычный кондей — 45 дБ", uz: "Oddiy konditsioner — 45 dB" },
      },
      {
        title: { ru: "ОХЛАЖДАЕТ ЗА 3 МИН", uz: "3 DAQIQADA SOVUTADI" },
        desc: { ru: "Turbo Cool: с +45°C до +22°C мгновенно", uz: "Turbo Cool: +45°C dan +22°C ga bir zumda" },
        highlight: { ru: "Точность температуры ±0.5°C", uz: "Harorat aniqligi ±0.5°C" },
      },
      {
        title: { ru: "ЭКОНОМИТ 200$/ГОД", uz: "YILIGA 200$ TEJAYDI" },
        desc: { ru: "Инвертор + AI = минимальный расход", uz: "Invertor + AI = minimal sarf" },
        highlight: { ru: "Окупается за 1.5 года", uz: "1.5 yilda o'zini qoplaydi" },
      },
      {
        title: { ru: "PRIME GUARD", uz: "PRIME GUARD" },
        desc: { ru: "Защита от скачков — работает от 145V", uz: "Kuchlanish o'zgarishidan himoya — 145V dan ishlaydi" },
        highlight: { ru: "Гарантия 3 года на всё", uz: "Hamma narsaga 3 yil kafolat" },
      },
    ],
  },

  // ── COMPARISON TABLE ──
  comparison: {
    title: { ru: "ALBA VS ", uz: "ALBA VS " },
    titleHighlight: { ru: "ОБЫЧНЫЙ КОНДЕЙ", uz: "ODDIY KONDITSIONER" },
    headerParam: { ru: "Параметр", uz: "Parametr" },
    headerBad: { ru: "Обычный", uz: "Oddiy" },
    headerGood: { ru: "MIDEA ALBA", uz: "MIDEA ALBA" },
    ctaBtn: { ru: "ВЫБРАТЬ ALBA — 360$", uz: "ALBANI TANLASH — 360$" },
    rows: [
      { param: { ru: "Шум", uz: "Shovqin" }, bad: { ru: "45 дБ", uz: "45 dB" }, good: { ru: "19 дБ", uz: "19 dB" } },
      { param: { ru: "Управление", uz: "Boshqaruv" }, bad: { ru: "Только пульт", uz: "Faqat pult" }, good: { ru: "Wi-Fi + голос + приложение", uz: "Wi-Fi + ovoz + ilova" } },
      { param: { ru: "Экономия", uz: "Tejash" }, bad: { ru: "Обычный компрессор", uz: "Oddiy kompressor" }, good: { ru: "AI EcoMaster -60%", uz: "AI EcoMaster -60%" } },
      { param: { ru: "Защита", uz: "Himoya" }, bad: { ru: "Нет защиты", uz: "Himoya yo'q" }, good: { ru: "Prime Guard от 145V", uz: "Prime Guard 145V dan" } },
      { param: { ru: "Охлаждение", uz: "Sovutish" }, bad: { ru: "15-20 минут", uz: "15-20 daqiqa" }, good: { ru: "3 минуты", uz: "3 daqiqa" } },
      { param: { ru: "Температура", uz: "Harorat" }, bad: { ru: "±3°C скачки", uz: "±3°C sakrash" }, good: { ru: "±0.5°C точность", uz: "±0.5°C aniqlik" } },
      { param: { ru: "Рассрочка", uz: "Bo'lib to'lash" }, bad: { ru: "Нет", uz: "Yo'q" }, good: { ru: "0% на 12 месяцев", uz: "12 oyga 0%" } },
      { param: { ru: "Цена", uz: "Narx" }, bad: { ru: "350-500$", uz: "350-500$" }, good: { ru: "360$ (было 450$)", uz: "360$ (avval 450$)" } },
    ],
  },

  // ── REVIEWS ──
  reviews: {
    title: { ru: "ЧТО ГОВОРЯТ ", uz: "MIJOZLAR " },
    titleHighlight: { ru: "КЛИЕНТЫ", uz: "NIMA DEYDI" },
    ratingText: { ru: "— 500+ отзывов", uz: "— 500+ sharhlar" },
    items: [
      {
        name: { ru: "Акбар Рашидов", uz: "Akbar Rashidov" },
        loc: { ru: "Юнусабад", uz: "Yunusobod" },
        text: {
          ru: "Купил месяц назад — счёт за свет реально снизился. Жена довольна — тихо работает, не мешает спать.",
          uz: "Bir oy oldin sotib oldim — elektr hisobi haqiqatan kamaydi. Xotinim mamnun — jim ishlaydi, uxlashga xalaqit bermaydi.",
        },
      },
      {
        name: { ru: "Дилноза Каримова", uz: "Dilnoza Karimova" },
        loc: { ru: "Мирзо-Улугбек", uz: "Mirzo Ulug'bek" },
        text: {
          ru: "Управляю с телефона — это космос! Включаю за 20 минут до прихода. Дети в детской спят отлично.",
          uz: "Telefondan boshqaraman — bu ajoyib! Kelishdan 20 daqiqa oldin yoqaman. Bolalar yaxshi uxlashyapti.",
        },
      },
      {
        name: { ru: "Бахром Усманов", uz: "Bahrom Usmanov" },
        loc: { ru: "Чиланзар", uz: "Chilonzor" },
        text: {
          ru: "У нас напряжение скачет — старый кондей сгорел. ALBA работает без проблем уже 3 месяца.",
          uz: "Bizda kuchlanish sakraydi — eski konditsioner yonib ketdi. ALBA 3 oydan beri muammosiz ishlayapti.",
        },
      },
      {
        name: { ru: "Малика Юсупова", uz: "Malika Yusupova" },
        loc: { ru: "Сергели", uz: "Sergeli" },
        text: {
          ru: "Охлаждает очень быстро. Жара +45, а дома +22 через 5 минут. Установщики приехали в тот же день!",
          uz: "Juda tez sovutadi. Issiqlik +45, uyda esa 5 daqiqada +22. O'rnatuvchilar o'sha kuni kelishdi!",
        },
      },
      {
        name: { ru: "Санжар Тошматов", uz: "Sanjar Toshmatov" },
        loc: { ru: "Бектемир", uz: "Bektemir" },
        text: {
          ru: "Взял в рассрочку 0%. Переплаты нет. Кондей отличный — тихий, умный, красивый.",
          uz: "0% bo'lib to'lashga oldim. Ortiqcha to'lov yo'q. Konditsioner zo'r — jim, aqlli, chiroyli.",
        },
      },
      {
        name: { ru: "Гульнора Хасанова", uz: "Gulnora Xasanova" },
        loc: { ru: "Яккасарай", uz: "Yakkasaroy" },
        text: {
          ru: "Муж скептически относился к 'умному' кондею. Теперь сам управляет с телефона и хвастается перед друзьями!",
          uz: "Erim 'aqlli' konditsionerga shubha bilan qarardi. Endi o'zi telefondan boshqaradi va do'stlariga maqtanadi!",
        },
      },
    ],
  },

  // ── PRICING + LEAD FORM ──
  pricing: {
    urgency: { ru: "СПЕЦИАЛЬНАЯ ЦЕНА — ОСТАЛОСЬ", uz: "MAXSUS NARX — QOLDI" },
    urgencySuffix: { ru: "ШТУК", uz: "DONA" },
    deliveryTitle: { ru: "Бесплатная доставка", uz: "Bepul yetkazib berish" },
    deliveryDesc: { ru: "По всему Ташкенту", uz: "Butun Toshkent bo'ylab" },
    installTitle: { ru: "Бесплатная установка", uz: "Bepul o'rnatish" },
    installDesc: { ru: "Мастер в тот же день", uz: "Usta o'sha kuni" },
    warrantyTitle: { ru: "Гарантия 3 года", uz: "3 yil kafolat" },
    warrantyDesc: { ru: "Официальная Midea", uz: "Rasmiy Midea" },
    installmentMain: { ru: "Рассрочка 0% — всего 30$/мес", uz: "Bo'lib to'lash 0% — atigi 30$/oy" },
    installmentSub: { ru: "12 месяцев без переплаты", uz: "12 oy ortiqcha to'lovsiz" },
    formTitle: { ru: "ОСТАВЬ ЗАЯВКУ", uz: "ARIZA QOLDIRING" },
    formSubtitle: { ru: "Получи ", uz: "Oling " },
    formSubtitleHighlight: { ru: "бесплатную консультацию", uz: "bepul maslahat" },
    formSubtitleEnd: { ru: " и точную цену", uz: " va aniq narx" },
    formBenefitsTitle: { ru: "Что вы получите:", uz: "Siz nima olasiz:" },
    formBenefits: [
      { ru: "Точный расчёт для вашей комнаты", uz: "Xonangiz uchun aniq hisob-kitob" },
      { ru: "Подбор оптимальной мощности", uz: "Optimal quvvatni tanlash" },
      { ru: "Расчёт рассрочки 0%", uz: "0% bo'lib to'lash hisobi" },
      { ru: "Запись на бесплатную установку", uz: "Bepul o'rnatishga yozilish" },
    ],
    inputName: { ru: "Ваше имя", uz: "Ismingiz" },
    inputPhone: { ru: "+998 __ ___ __ __", uz: "+998 __ ___ __ __" },
    submitBtn: { ru: "ПОЛУЧИТЬ КОНСУЛЬТАЦИЮ", uz: "MASLAHAT OLISH" },
    submitSent: { ru: "ЗАЯВКА ОТПРАВЛЕНА!", uz: "ARIZA YUBORILDI!" },
    noPrepay: { ru: "Без предоплаты", uz: "Oldindan to'lovsiz" },
    fastReply: { ru: "Ответим за 5 мин", uz: "5 daqiqada javob beramiz" },
    consent: { ru: "Нажимая кнопку, вы соглашаетесь на обработку данных", uz: "Tugmani bosish orqali ma'lumotlarni qayta ishlashga rozilik bildirasiz" },
    contactDirect: { ru: "Или свяжитесь напрямую:", uz: "Yoki to'g'ridan-to'g'ri bog'laning:" },
    alertName: { ru: "Введите ваше имя", uz: "Ismingizni kiriting" },
    alertPhone: { ru: "Введите корректный номер телефона", uz: "To'g'ri telefon raqamini kiriting" },
  },

  // ── FAQ ──
  faq: {
    title: { ru: "ЧАСТЫЕ ", uz: "KO'P " },
    titleHighlight: { ru: "ВОПРОСЫ", uz: "BERILADIGAN SAVOLLAR" },
    items: [
      {
        q: { ru: "Сколько стоит установка?", uz: "O'rnatish qancha turadi?" },
        a: {
          ru: "Установка БЕСПЛАТНАЯ! Мастер приедет в день доставки или на следующий день. Стандартная установка (до 3м трассы) включена в стоимость.",
          uz: "O'rnatish BEPUL! Usta yetkazib berish kunida yoki ertasi kuni keladi. Standart o'rnatish (3m gacha trassa) narxga kiritilgan.",
        },
      },
      {
        q: { ru: "Есть ли рассрочка?", uz: "Bo'lib to'lash bormi?" },
        a: {
          ru: "Да! Рассрочка 0% на 12 месяцев без переплаты. Это всего 30$ в месяц. Оформление за 15 минут с паспортом.",
          uz: "Ha! 12 oyga 0% bo'lib to'lash, ortiqcha to'lovsiz. Bu oyiga atigi 30$. Pasport bilan 15 daqiqada rasmiylashtirish.",
        },
      },
      {
        q: { ru: "Какая гарантия?", uz: "Qanday kafolat?" },
        a: {
          ru: "Официальная гарантия Midea — 3 года на весь кондиционер. Сервисный центр в Ташкенте. Запчасти всегда в наличии.",
          uz: "Midea rasmiy kafolati — butun konditsionerga 3 yil. Toshkentda xizmat markazi. Ehtiyot qismlar doimo mavjud.",
        },
      },
      {
        q: { ru: "Доставляете в регионы?", uz: "Viloyatlarga yetkazib berasizmi?" },
        a: {
          ru: "Да! Доставляем по всему Узбекистану. По Ташкенту — бесплатно в тот же день. В регионы — 1-3 дня.",
          uz: "Ha! Butun O'zbekiston bo'ylab yetkazib beramiz. Toshkent bo'ylab — o'sha kuni bepul. Viloyatlarga — 1-3 kun.",
        },
      },
      {
        q: { ru: "Работает ли при низком напряжении?", uz: "Past kuchlanishda ishlaydimi?" },
        a: {
          ru: "Да! Технология Prime Guard позволяет ALBA работать при напряжении от 145V. Защита от скачков, перегрева и замерзания.",
          uz: "Ha! Prime Guard texnologiyasi ALBA ni 145V dan boshlab ishlashga imkon beradi. Sakrash, qizib ketish va muzlashdan himoya.",
        },
      },
      {
        q: { ru: "На какую площадь хватает?", uz: "Qancha maydonga yetadi?" },
        a: {
          ru: "ALBA 9 — до 25 кв.м (комната, спальня). ALBA 12 — до 35 кв.м (гостиная). ALBA 18 — до 50 кв.м (большой зал). Поможем подобрать!",
          uz: "ALBA 9 — 25 kv.m gacha (xona, yotoqxona). ALBA 12 — 35 kv.m gacha (mehmonxona). ALBA 18 — 50 kv.m gacha (katta zal). Tanlashda yordam beramiz!",
        },
      },
    ],
  },

  // ── FINAL CTA ──
  finalCta: {
    title: { ru: "ЛЕТО ", uz: "YOZ " },
    titleHighlight: { ru: "УЖЕ ЗДЕСЬ", uz: "ALLAQACHON KELDI" },
    subtitle: {
      ru: "Не ждите +45°C — закажите Midea ALBA сейчас и забудьте о жаре, шуме и огромных счетах",
      uz: "+45°C ni kutmang — Midea ALBA ni hozir buyurtma qiling va issiqlik, shovqin va katta hisoblarni unuting",
    },
    installment: { ru: "Рассрочка 0% — всего 30$/мес", uz: "Bo'lib to'lash 0% — atigi 30$/oy" },
    ctaBtn: { ru: "КУПИТЬ ЗА 360$ — СЭКОНОМИТЬ 90$", uz: "360$ GA SOTIB OLISH — 90$ TEJASH" },
    badgeDelivery: { ru: "Бесплатная доставка", uz: "Bepul yetkazib berish" },
    badgeInstall: { ru: "Бесплатная установка", uz: "Bepul o'rnatish" },
    badgeWarranty: { ru: "Гарантия 3 года", uz: "3 yil kafolat" },
    badgeInstallment: { ru: "Рассрочка 0%", uz: "Bo'lib to'lash 0%" },
  },

  // ── FOOTER ──
  footer: {
    officialDealer: { ru: "Официальный дистрибьютор Midea в Узбекистане", uz: "O'zbekistondagi Midea rasmiy distribyutori" },
    contacts: { ru: "Контакты", uz: "Kontaktlar" },
    workHours: { ru: "Режим работы", uz: "Ish vaqti" },
    monSat: { ru: "Пн-Сб: 9:00 — 19:00", uz: "Du-Sha: 9:00 — 19:00" },
    sun: { ru: "Вс: 10:00 — 17:00", uz: "Yak: 10:00 — 17:00" },
    city: { ru: "Ташкент, Узбекистан", uz: "Toshkent, O'zbekiston" },
    rights: { ru: "Все права защищены.", uz: "Barcha huquqlar himoyalangan." },
  },

  // ── STICKY BAR ──
  sticky: {
    buyBtn: { ru: "КУПИТЬ", uz: "SOTIB OLISH" },
    installment: { ru: "или 30$/мес", uz: "yoki 30$/oy" },
  },
} as const;

// Helper to get text for current language
export function t(obj: { ru: string; uz: string }, lang: Lang): string {
  return obj[lang];
}
