/*
 * Midea ALBA — МЕГА-ПРОДАЮЩИЙ ЛЕНДИНГ v4 (i18n RU/UZ + Telegram Bot)
 * Design: Dark Cyber Tech — #050D1A bg, neon cyan accents, yellow CTAs
 * Languages: Russian (default) + Uzbek with toggle switcher
 * All CTA → https://t.me/mideazubot
 */
import { useState, useEffect, useRef, type FormEvent } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Snowflake, Wifi, Volume2, Shield, Zap, Brain, Phone, Clock,
  ChevronDown, Star, Check, X, Truck, Wrench, FileText,
  MessageCircle, ThermometerSun, BatteryCharging, Timer, Send,
  ArrowDown, Sparkles, Globe
} from "lucide-react";
import { type Lang, translations as T, t } from "@/lib/i18n";
import { trackLead, trackContact, trackInitiateCheckout } from "@/lib/fbpixel";
import { usePixelTracking } from "@/hooks/usePixelTracking";

// ── CDN URLs ─────────────────────────────────────────────────────────────────
const IMG = {
  heroBg: "https://d2xsxph8kpxj0f.cloudfront.net/310519663532358315/Pvyt7qa76fQ9ttQfPKguuc/hero-bg_2bce22a1.jpg",
  acHero: "https://d2xsxph8kpxj0f.cloudfront.net/310519663532358315/Pvyt7qa76fQ9ttQfPKguuc/ac-hero_ce9c07c1.png",
  temperature: "https://d2xsxph8kpxj0f.cloudfront.net/310519663532358315/Pvyt7qa76fQ9ttQfPKguuc/v2_creative_20_temperature_control_5582a0f9.png",
  wifiControl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663532358315/Pvyt7qa76fQ9ttQfPKguuc/v2_creative_16_wifi_control_03d365a2.png",
  soundWave: "https://d2xsxph8kpxj0f.cloudfront.net/310519663532358315/Pvyt7qa76fQ9ttQfPKguuc/v2_creative_18_sound_wave_e1f556fb.png",
  moneyTree: "https://d2xsxph8kpxj0f.cloudfront.net/310519663532358315/Pvyt7qa76fQ9ttQfPKguuc/v2_creative_7_money_tree_d44a28ff.png",
  speedometer: "https://d2xsxph8kpxj0f.cloudfront.net/310519663532358315/Pvyt7qa76fQ9ttQfPKguuc/v2_creative_8_speedometer_397f4449.png",
  robotAi: "https://d2xsxph8kpxj0f.cloudfront.net/310519663532358315/Pvyt7qa76fQ9ttQfPKguuc/v2_creative_12_robot_ai_b7a25853.png",
  priceShock: "https://d2xsxph8kpxj0f.cloudfront.net/310519663532358315/Pvyt7qa76fQ9ttQfPKguuc/v2_creative_1_price_shock_61318392.webp",
  limited: "https://d2xsxph8kpxj0f.cloudfront.net/310519663532358315/Pvyt7qa76fQ9ttQfPKguuc/v2_creative_4_limited_4c57be13.webp",
  lifestyle: "https://d2xsxph8kpxj0f.cloudfront.net/310519663532358315/Pvyt7qa76fQ9ttQfPKguuc/v2_creative_5_lifestyle_881041a6.webp",
};

// ── All CTA links now point to the Telegram bot ──
const TELEGRAM_BOT = "https://t.me/mideazubot";
const INSTAGRAM_LINK = "https://instagram.com/welkin.midea";
const PHONE = "+998 99 892 36 02";
const PHONE_HREF = "tel:+998998923602";
const WHATSAPP_LINK = "https://wa.me/998998923602";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

// ── Animated counter ────────────────────────────────────────────────────────
function Counter({ end, suffix = "", prefix = "", duration = 2000 }: { end: number; suffix?: string; prefix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(end * eased);
      setCount(current);
      if (progress >= 1) {
        clearInterval(timer);
        setCount(end);
        setDone(true);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return <span ref={ref}>{prefix}{done ? end : count}{suffix}</span>;
}

// ── Countdown timer ──────────────────────────────────────────────────────────
function Countdown({ lang }: { lang: Lang }) {
  const [time, setTime] = useState({ h: 23, m: 47, s: 12 });
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prev => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; m = 59; s = 59; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");
  const labels = [
    { val: pad(time.h), label: t(T.hero.countdownH, lang) },
    { val: pad(time.m), label: t(T.hero.countdownM, lang) },
    { val: pad(time.s), label: t(T.hero.countdownS, lang) },
  ];
  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      {labels.map((item, i) => (
        <div key={i} className="flex items-center gap-1.5 sm:gap-2">
          <div className="flex flex-col items-center">
            <span className="font-bebas text-2xl sm:text-4xl text-white bg-white/10 backdrop-blur-sm rounded-lg px-2.5 sm:px-3.5 py-1 border border-cyan-500/30 min-w-[2.5rem] sm:min-w-[3.5rem] text-center tabular-nums">
              {item.val}
            </span>
            <span className="text-[9px] sm:text-[10px] text-gray-500 mt-0.5">{item.label}</span>
          </div>
          {i < 2 && <span className="font-bebas text-xl sm:text-3xl text-cyan-400/60 -mt-3">:</span>}
        </div>
      ))}
    </div>
  );
}

// ── Pulsing CTA button ───────────────────────────────────────────────────────
function PulseCTA({ text, onClick, href, size = "lg", className = "" }: { text: string; onClick?: () => void; href?: string; size?: "lg" | "md" | "sm"; className?: string }) {
  const sizes = {
    lg: "text-xl sm:text-2xl px-10 sm:px-16 py-4 sm:py-5",
    md: "text-base sm:text-xl px-6 sm:px-10 py-3 sm:py-4",
    sm: "text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-2.5",
  };

  const inner = (
    <>
      <span className="relative z-10">{text}</span>
      <motion.div
        className="absolute inset-0 rounded-xl bg-yellow-400/30"
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  );

  const cls = `relative font-bebas font-bold text-black rounded-xl bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.4)] hover:shadow-[0_0_50px_rgba(250,204,21,0.6)] transition-all ${sizes[size]} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${cls} inline-flex items-center justify-center text-center`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        onClick={onClick}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={cls}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
    >
      {inner}
    </motion.button>
  );
}

// ── Section wrapper with fade-in ─────────────────────────────────────────────
function Section({ children, id, className = "" }: { children: React.ReactNode; id?: string; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.section
      ref={ref}
      id={id}
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}

// ── FAQ Item ─────────────────────────────────────────────────────────────────
function FaqItem({ q, a, icon }: { q: string; a: string; icon: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-cyan-900/40 rounded-xl overflow-hidden bg-[#0a1628]/80 backdrop-blur-sm hover:border-cyan-500/40 transition-colors">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-3 sm:gap-4 p-4 sm:p-5 text-left">
        <div className="shrink-0 w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
          {icon}
        </div>
        <span className="flex-1 font-montserrat font-semibold text-sm sm:text-base text-white">{q}</span>
        <ChevronDown className={`w-5 h-5 text-cyan-400 transition-transform duration-300 shrink-0 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="px-4 sm:px-5 pb-4 sm:pb-5 pl-[3.75rem] sm:pl-[4.5rem] text-sm text-gray-300 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Language Switcher ────────────────────────────────────────────────────────
function LangSwitch({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div className="flex items-center bg-white/5 border border-cyan-900/40 rounded-lg overflow-hidden">
      <button
        onClick={() => setLang("ru")}
        className={`px-2.5 py-1.5 text-xs font-montserrat font-bold transition-all ${
          lang === "ru"
            ? "bg-cyan-500/20 text-cyan-400 border-r border-cyan-500/30"
            : "text-gray-500 hover:text-gray-300 border-r border-cyan-900/20"
        }`}
      >
        RU
      </button>
      <button
        onClick={() => setLang("uz")}
        className={`px-2.5 py-1.5 text-xs font-montserrat font-bold transition-all ${
          lang === "uz"
            ? "bg-cyan-500/20 text-cyan-400"
            : "text-gray-500 hover:text-gray-300"
        }`}
      >
        UZ
      </button>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ══════════════════════════════════════════════════════════════════════════════
export default function Home() {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window !== "undefined") {
      // Priority: URL ?lang= param > localStorage > default "ru"
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get("lang");
      if (urlLang === "uz" || urlLang === "ru") return urlLang;
      const saved = localStorage.getItem("midea-lang");
      if (saved === "uz" || saved === "ru") return saved;
    }
    return "ru";
  });
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formSent, setFormSent] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const [stock] = useState(47);

  // Facebook Pixel: auto-track scroll-based events (ViewContent, ScrollDepth, Schedule)
  usePixelTracking(lang);

  // Persist language choice + sync URL param for shareable links
  useEffect(() => {
    localStorage.setItem("midea-lang", lang);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", lang);
    window.history.replaceState({}, "", url.toString());
  }, [lang]);

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 700);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const phoneDigits = formPhone.replace(/\D/g, "");
    if (!formName.trim() || phoneDigits.length < 9) {
      alert(formName.trim() ? t(T.pricing.alertPhone, lang) : t(T.pricing.alertName, lang));
      return;
    }
    // Open Telegram bot with pre-filled message
    const msg = encodeURIComponent(
      lang === "ru"
        ? `Здравствуйте! Меня зовут ${formName.trim()}, мой номер: ${formPhone}. Хочу узнать про Midea ALBA.`
        : `Assalomu alaykum! Mening ismim ${formName.trim()}, raqamim: ${formPhone}. Midea ALBA haqida bilmoqchiman.`
    );
    // Facebook Pixel: Track Lead conversion
    trackLead(lang, { name: formName.trim() });
    window.open(`${TELEGRAM_BOT}?text=${msg}`, "_blank");
    setFormSent(true);
    setTimeout(() => setFormSent(false), 5000);
    setFormName("");
    setFormPhone("");
  };

  // Pain point icons (same for both languages)
  const painIcons = [
    { icon: <Volume2 className="w-6 h-6" />, borderColor: "border-red-500/30 hover:border-red-400", iconBg: "bg-red-500/15 text-red-400" },
    { icon: <Zap className="w-6 h-6" />, borderColor: "border-orange-500/30 hover:border-orange-400", iconBg: "bg-orange-500/15 text-orange-400" },
    { icon: <Wifi className="w-6 h-6" />, borderColor: "border-blue-500/30 hover:border-blue-400", iconBg: "bg-blue-500/15 text-blue-400" },
    { icon: <ThermometerSun className="w-6 h-6" />, borderColor: "border-yellow-500/30 hover:border-yellow-400", iconBg: "bg-yellow-500/15 text-yellow-400" },
    { icon: <Shield className="w-6 h-6" />, borderColor: "border-purple-500/30 hover:border-purple-400", iconBg: "bg-purple-500/15 text-purple-400" },
    { icon: <Snowflake className="w-6 h-6" />, borderColor: "border-teal-500/30 hover:border-teal-400", iconBg: "bg-teal-500/15 text-teal-400" },
  ];

  // Feature images
  const featureImgs = [IMG.robotAi, IMG.wifiControl, IMG.soundWave, IMG.speedometer, IMG.moneyTree, IMG.lifestyle];

  // Review colors
  const reviewColors = [
    "from-cyan-500 to-blue-600",
    "from-pink-500 to-rose-600",
    "from-green-500 to-emerald-600",
    "from-yellow-500 to-amber-600",
    "from-indigo-500 to-violet-600",
    "from-rose-500 to-red-600",
  ];

  // FAQ icons
  const faqIcons = [
    <Wrench className="w-5 h-5" />,
    <FileText className="w-5 h-5" />,
    <Shield className="w-5 h-5" />,
    <Truck className="w-5 h-5" />,
    <Zap className="w-5 h-5" />,
    <Timer className="w-5 h-5" />,
  ];

  // Number stats config
  const numberStats = [
    { end: 360, prefix: "", suffix: "$", color: "text-yellow-400", borderColor: "border-yellow-500/20 hover:border-yellow-500/50", icon: <Sparkles className="w-6 h-6 text-yellow-400" /> },
    { end: 19, prefix: "", suffix: " дБ", color: "text-cyan-400", borderColor: "border-cyan-500/20 hover:border-cyan-500/50", icon: <Volume2 className="w-6 h-6 text-cyan-400" /> },
    { end: 60, prefix: "-", suffix: "%", color: "text-green-400", borderColor: "border-green-500/20 hover:border-green-500/50", icon: <BatteryCharging className="w-6 h-6 text-green-400" /> },
    { end: 200, prefix: "", suffix: "$/год", color: "text-emerald-400", borderColor: "border-emerald-500/20 hover:border-emerald-500/50", icon: <Zap className="w-6 h-6 text-emerald-400" /> },
  ];

  return (
    <div className="min-h-screen bg-[#050D1A] text-white overflow-x-hidden">

      {/* ═══ HEADER ═══ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#050D1A]/90 backdrop-blur-md border-b border-cyan-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14 sm:h-16">
          <div className="font-bebas text-lg sm:text-xl tracking-wider">
            <span className="text-cyan-400">WELKIN</span>
            <span className="text-gray-500 mx-1">&times;</span>
            <span className="text-white">MIDEA</span>
          </div>
          <div className="hidden md:flex items-center gap-5">
            <a href={PHONE_HREF} className="flex items-center gap-2 text-sm text-gray-300 hover:text-cyan-400 transition-colors">
              <Phone className="w-4 h-4" /> {PHONE}
            </a>
            <a href={TELEGRAM_BOT} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-300 hover:text-cyan-400 transition-colors">
              <MessageCircle className="w-4 h-4" /> Telegram
            </a>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <LangSwitch lang={lang} setLang={setLang} />
            {/* Mobile phone icon */}
            <a href={PHONE_HREF} className="md:hidden shrink-0 w-9 h-9 rounded-lg bg-green-600/20 border border-green-500/30 flex items-center justify-center text-green-400 hover:bg-green-600/30 transition-all">
              <Phone className="w-4 h-4" />
            </a>
            <PulseCTA text={t(T.header.buyBtn, lang)} href={TELEGRAM_BOT} size="sm" className="hidden sm:inline-flex" onClick={() => trackInitiateCheckout('header', lang)} />
          </div>
        </div>
      </header>

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex items-center pt-16" style={{ backgroundImage: `url(${IMG.heroBg})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0 bg-gradient-to-r from-[#050D1A]/95 via-[#050D1A]/80 to-[#050D1A]/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050D1A] via-transparent to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full grid lg:grid-cols-2 gap-8 lg:gap-12 items-center py-16 sm:py-0">
          {/* Left */}
          <div className="space-y-5 sm:space-y-6">
            {/* Urgency badge */}
            <motion.div
              className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/40 rounded-full px-4 py-1.5"
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-red-400 font-montserrat font-bold text-xs sm:text-sm uppercase tracking-wide">
                {t(T.hero.urgencyBadge, lang)} {stock} {t(T.hero.urgencySuffix, lang)}
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="font-bebas leading-[0.9] tracking-tight">
              <span className="block text-4xl sm:text-6xl lg:text-7xl text-white">{t(T.hero.headline1, lang)}</span>
              <span className="block text-5xl sm:text-7xl lg:text-[5.5rem] text-cyan-400 neon-cyan">{t(T.hero.headline2, lang)}</span>
              <span className="block text-4xl sm:text-6xl lg:text-7xl text-white">
                {t(T.hero.headline3prefix, lang)}<span className="text-yellow-400">{t(T.hero.headline3highlight, lang)}</span>
              </span>
            </h1>

            {/* Subheadline */}
            <p className="font-montserrat text-sm sm:text-lg text-gray-300 max-w-lg leading-relaxed">
              <span className="text-white font-bold">{t(T.hero.subheadName, lang)}</span>
              {t(T.hero.subheadText, lang)}
              <span className="text-cyan-400 font-semibold">{t(T.hero.subheadQuiet, lang)}</span>,{" "}
              {t(T.hero.subheadSavesPrefix, lang)}
              <span className="text-yellow-400 font-bold">{t(T.hero.subheadSaves, lang)}</span>
              {t(T.hero.subheadSuffix, lang)}
            </p>

            {/* Social proof */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex -space-x-2">
                {["А", "Д", "Б", "М", "С"].map((letter, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 border-2 border-[#050D1A] flex items-center justify-center text-xs font-bold">
                    {letter}
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <div className="flex items-center gap-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-yellow-400" />)}
                  <span className="text-white ml-1 font-bold">4.9</span>
                </div>
                <span className="text-gray-400 text-xs">{t(T.hero.socialProof, lang)}</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-end gap-3 sm:gap-4">
              <span className="font-bebas text-5xl sm:text-7xl text-yellow-400 neon-yellow">360$</span>
              <span className="font-bebas text-2xl sm:text-4xl text-gray-500 line-through mb-1 sm:mb-2">450$</span>
              <span className="bg-red-600 text-white font-montserrat font-bold text-xs sm:text-sm px-2.5 py-1 rounded-lg mb-2 sm:mb-3 animate-pulse">-20%</span>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <PulseCTA text={t(T.hero.ctaBuy, lang)} href={TELEGRAM_BOT} size="lg" onClick={() => trackInitiateCheckout('hero', lang)} />
              <a
                href={TELEGRAM_BOT}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bebas text-lg sm:text-xl px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-[#0088cc] text-white hover:bg-[#0099dd] transition-all text-center flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,136,204,0.3)]"
                onClick={() => trackContact('Telegram', lang)}
              >
                <MessageCircle className="w-5 h-5" />
                {t(T.hero.ctaTelegram, lang)}
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3 sm:gap-5 text-xs sm:text-sm text-gray-400">
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-green-400" /> {t(T.hero.trustInstall, lang)}</span>
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-green-400" /> {t(T.hero.trustWarranty, lang)}</span>
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-green-400" /> {t(T.hero.trustInstallment, lang)}</span>
            </div>
          </div>

          {/* Right — Product image */}
          <div className="relative hidden lg:flex items-center justify-center">
            <motion.div
              className="absolute w-[480px] h-[480px] rounded-full bg-cyan-500/5 border border-cyan-500/10"
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            />
            <motion.img
              src={IMG.acHero}
              alt="Midea ALBA"
              className="relative z-10 w-full max-w-[520px] drop-shadow-[0_0_60px_rgba(0,200,255,0.3)]"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            />
            {/* Neon glow rings */}
            <motion.div
              className="absolute w-[400px] h-[400px] rounded-full border border-cyan-500/10"
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute w-[350px] h-[350px] rounded-full border border-cyan-400/5"
              animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
          </div>
        </div>

        {/* Countdown at bottom of hero */}
        <div className="absolute bottom-4 sm:bottom-8 left-0 right-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-5">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Clock className="w-4 h-4 text-red-400 animate-pulse" />
                <span className="font-montserrat">{t(T.hero.countdownLabel, lang)}</span>
              </div>
              <Countdown lang={lang} />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 hidden sm:block"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="w-5 h-5 text-cyan-400/40" />
        </motion.div>
      </section>

      {/* ═══ PAIN POINTS — "УЗНАЁШЬ СЕБЯ?" ═══ */}
      <Section id="pains" className="py-16 sm:py-24 bg-[#050D1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="font-bebas text-4xl sm:text-6xl lg:text-7xl text-white">
              {t(T.pains.title, lang)}<span className="text-red-500">{t(T.pains.titleHighlight, lang)}</span>{t(T.pains.titleEnd, lang)}
            </h2>
            <p className="font-montserrat text-gray-400 mt-2 sm:mt-3 text-sm sm:text-lg max-w-2xl mx-auto">{t(T.pains.subtitle, lang)}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {T.pains.items.map((item, i) => (
              <motion.div
                key={i}
                className={`relative rounded-2xl border ${painIcons[i].borderColor} bg-[#0a1628]/60 p-5 sm:p-6 transition-all duration-300 group`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4, scale: 1.02 }}
              >
                <div className={`w-12 h-12 rounded-xl ${painIcons[i].iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  {painIcons[i].icon}
                </div>
                <p className="font-montserrat font-bold text-white text-base sm:text-lg">{t(item.pain, lang)}</p>
                <p className="font-montserrat text-gray-500 text-sm mt-1">{t(item.detail, lang)}</p>
                <div className="mt-4 pt-3 border-t border-white/5">
                  <p className="font-montserrat font-bold text-sm text-green-400 flex items-center gap-2">
                    <Check className="w-4 h-4 shrink-0" />
                    {t(item.solution, lang)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA after pains */}
          <div className="text-center mt-10 sm:mt-14">
            <p className="font-montserrat text-gray-400 text-sm sm:text-base mb-4">{t(T.pains.ctaText, lang)}</p>
            <PulseCTA text={t(T.pains.ctaBtn, lang)} href={TELEGRAM_BOT} size="md" onClick={() => trackInitiateCheckout('pains_section', lang)} />
          </div>
        </div>
      </Section>

      {/* ═══ KEY NUMBERS ═══ */}
      <Section className="py-14 sm:py-20 bg-gradient-to-b from-[#050D1A] via-[#081525] to-[#050D1A]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {numberStats.map((item, i) => (
              <motion.div
                key={i}
                className={`text-center p-4 sm:p-7 rounded-2xl bg-[#0a1628]/60 border ${item.borderColor} transition-all duration-300`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -3 }}
              >
                <div className="mb-2 sm:mb-3 flex justify-center">{item.icon}</div>
                <div className={`font-bebas text-3xl sm:text-5xl lg:text-6xl ${item.color}`}>
                  <Counter end={item.end} prefix={item.prefix} suffix={item.suffix} />
                </div>
                <p className="font-montserrat text-gray-400 text-xs sm:text-sm mt-1 sm:mt-2">{t(T.numbers.items[i].label, lang)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ CREATIVE GALLERY — 6 Reasons ═══ */}
      <Section id="features-section" className="py-14 sm:py-20 bg-[#050D1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="font-bebas text-4xl sm:text-6xl lg:text-7xl text-white">
              {t(T.features.title, lang)}<span className="text-cyan-400">{t(T.features.titleHighlight, lang)}</span>
            </h2>
            <p className="font-montserrat text-gray-400 mt-2 text-sm sm:text-lg">{t(T.features.subtitle, lang)}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {T.features.items.map((card, i) => (
              <motion.div
                key={i}
                className="group relative rounded-2xl overflow-hidden border border-cyan-900/30 hover:border-cyan-500/40 transition-all duration-500 bg-[#0a1628]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative aspect-square overflow-hidden">
                  <img src={featureImgs[i]} alt={t(card.title, lang)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/30 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="font-bebas text-xl sm:text-2xl text-cyan-400 drop-shadow-lg">{t(card.title, lang)}</h3>
                  </div>
                </div>
                <div className="p-4 sm:p-5">
                  <p className="font-montserrat text-gray-300 text-xs sm:text-sm leading-relaxed">{t(card.desc, lang)}</p>
                  <p className="font-montserrat text-green-400 text-xs sm:text-sm font-bold mt-2 flex items-center gap-1.5">
                    <Check className="w-4 h-4 shrink-0" />{t(card.highlight, lang)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ COMPARISON TABLE ═══ */}
      <Section id="comparison" className="py-14 sm:py-20 bg-gradient-to-b from-[#050D1A] via-[#081525] to-[#050D1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="font-bebas text-4xl sm:text-6xl lg:text-7xl text-center mb-10 sm:mb-14">
            {t(T.comparison.title, lang)}<span className="text-red-500">{t(T.comparison.titleHighlight, lang)}</span>
          </h2>

          <div className="rounded-2xl border border-cyan-900/30 overflow-hidden bg-[#0a1628]/60">
            {/* Header */}
            <div className="grid grid-cols-3 bg-[#0a1628] border-b border-cyan-900/30">
              <div className="p-3 sm:p-4 font-montserrat font-bold text-gray-400 text-xs sm:text-sm">{t(T.comparison.headerParam, lang)}</div>
              <div className="p-3 sm:p-4 font-montserrat font-bold text-red-400 text-xs sm:text-sm text-center">{t(T.comparison.headerBad, lang)}</div>
              <div className="p-3 sm:p-4 font-montserrat font-bold text-cyan-400 text-xs sm:text-sm text-center bg-cyan-500/5">{t(T.comparison.headerGood, lang)}</div>
            </div>
            {T.comparison.rows.map((row, i) => (
              <div key={i} className={`grid grid-cols-3 ${i % 2 === 0 ? "bg-white/[0.02]" : ""} border-b border-cyan-900/10 last:border-b-0`}>
                <div className="p-3 sm:p-4 font-montserrat font-semibold text-white text-xs sm:text-sm flex items-center">{t(row.param, lang)}</div>
                <div className="p-3 sm:p-4 font-montserrat text-xs sm:text-sm text-center flex items-center justify-center gap-1 text-red-400/80">
                  <X className="w-3.5 h-3.5 shrink-0 text-red-500" />
                  <span>{t(row.bad, lang)}</span>
                </div>
                <div className="p-3 sm:p-4 font-montserrat text-xs sm:text-sm text-center flex items-center justify-center gap-1 text-green-400 font-semibold bg-cyan-500/5">
                  <Check className="w-3.5 h-3.5 shrink-0 text-green-500" />
                  <span>{t(row.good, lang)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <PulseCTA text={t(T.comparison.ctaBtn, lang)} href={TELEGRAM_BOT} size="md" onClick={() => trackInitiateCheckout('comparison', lang)} />
          </div>
        </div>
      </Section>

      {/* ═══ REVIEWS ═══ */}
      <Section id="reviews-section" className="py-14 sm:py-20 bg-[#050D1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="font-bebas text-4xl sm:text-6xl lg:text-7xl text-white">
              {t(T.reviews.title, lang)}<span className="text-cyan-400">{t(T.reviews.titleHighlight, lang)}</span>
            </h2>
            <div className="flex items-center justify-center gap-2 mt-3">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
              </div>
              <span className="font-montserrat text-white font-bold">4.9</span>
              <span className="font-montserrat text-gray-400 text-sm">{t(T.reviews.ratingText, lang)}</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {T.reviews.items.map((review, i) => (
              <motion.div
                key={i}
                className="rounded-2xl border border-cyan-900/30 bg-[#0a1628]/60 p-5 sm:p-6 hover:border-cyan-500/30 transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="font-montserrat text-gray-300 text-sm leading-relaxed">"{t(review.text, lang)}"</p>
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/5">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${reviewColors[i]} flex items-center justify-center font-bold text-sm text-white shrink-0`}>
                    {t(review.name, lang)[0]}
                  </div>
                  <div>
                    <p className="font-montserrat font-bold text-white text-sm">{t(review.name, lang)}</p>
                    <p className="font-montserrat text-gray-500 text-xs">
                      {lang === "ru" ? "Ташкент" : "Toshkent"}, {t(review.loc, lang)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ PRICING + LEAD FORM COMBINED ═══ */}
      <Section id="lead-form" className="py-14 sm:py-24 bg-gradient-to-b from-[#050D1A] via-[#081020] to-[#050D1A]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Urgency banner */}
          <motion.div
            className="text-center mb-8 sm:mb-12"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/40 rounded-full px-5 py-2 font-montserrat font-bold text-red-400 text-sm sm:text-base">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              {t(T.pricing.urgency, lang)} {stock} {t(T.pricing.urgencySuffix, lang)}
            </span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Left — Price card */}
            <div className="rounded-3xl border-2 border-cyan-500/30 bg-gradient-to-br from-[#0a1628] to-[#081020] p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-yellow-400 to-cyan-500" />

              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <span className="font-bebas text-6xl sm:text-8xl text-yellow-400 neon-yellow">360$</span>
                </div>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <span className="font-bebas text-2xl sm:text-3xl text-gray-500 line-through">450$</span>
                  <span className="bg-red-600 text-white font-montserrat font-bold text-sm px-3 py-1 rounded-lg">-90$</span>
                </div>
              </div>

              {/* Bonuses */}
              <div className="space-y-3 mb-6">
                {[
                  { icon: <Truck className="w-5 h-5 text-cyan-400" />, title: t(T.pricing.deliveryTitle, lang), desc: t(T.pricing.deliveryDesc, lang) },
                  { icon: <Wrench className="w-5 h-5 text-cyan-400" />, title: t(T.pricing.installTitle, lang), desc: t(T.pricing.installDesc, lang) },
                  { icon: <FileText className="w-5 h-5 text-cyan-400" />, title: t(T.pricing.warrantyTitle, lang), desc: t(T.pricing.warrantyDesc, lang) },
                ].map((bonus, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-cyan-900/20">
                    <div className="shrink-0 w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">{bonus.icon}</div>
                    <div>
                      <p className="font-montserrat font-bold text-white text-sm">{bonus.title}</p>
                      <p className="font-montserrat text-gray-500 text-xs">{bonus.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Installment */}
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-center">
                <p className="font-montserrat font-bold text-green-400 text-base sm:text-lg">
                  {t(T.pricing.installmentMain, lang)}
                </p>
                <p className="font-montserrat text-gray-400 text-xs mt-1">{t(T.pricing.installmentSub, lang)}</p>
              </div>
            </div>

            {/* Right — Lead form */}
            <div className="rounded-3xl border border-yellow-500/30 bg-gradient-to-br from-[#0a1628] to-[#081525] p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-cyan-400 to-yellow-400" />

              <div className="text-center mb-5 sm:mb-6">
                <h2 className="font-bebas text-3xl sm:text-4xl text-white">{t(T.pricing.formTitle, lang)}</h2>
                <p className="font-montserrat text-gray-400 text-sm mt-2">
                  {t(T.pricing.formSubtitle, lang)}<span className="text-cyan-400 font-bold">{t(T.pricing.formSubtitleHighlight, lang)}</span>{t(T.pricing.formSubtitleEnd, lang)}
                </p>
              </div>

              {/* What you get */}
              <div className="mb-5 p-3.5 rounded-xl bg-cyan-500/5 border border-cyan-500/20">
                <p className="font-montserrat font-bold text-cyan-400 text-sm mb-2">{t(T.pricing.formBenefitsTitle, lang)}</p>
                <ul className="space-y-1.5 text-xs sm:text-sm text-gray-300">
                  {T.pricing.formBenefits.map((b, i) => (
                    <li key={i} className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-green-400 shrink-0" /> {t(b, lang)}</li>
                  ))}
                </ul>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder={t(T.pricing.inputName, lang)}
                  value={formName}
                  onChange={e => setFormName(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-cyan-900/40 text-white placeholder-gray-500 font-montserrat text-sm focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                />
                <input
                  type="tel"
                  placeholder={t(T.pricing.inputPhone, lang)}
                  value={formPhone}
                  onChange={e => setFormPhone(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-cyan-900/40 text-white placeholder-gray-500 font-montserrat text-sm focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                />
                <motion.button
                  type="submit"
                  className="w-full font-bebas text-xl sm:text-2xl py-4 rounded-xl bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 text-black font-bold shadow-[0_0_30px_rgba(250,204,21,0.3)] hover:shadow-[0_0_50px_rgba(250,204,21,0.5)] transition-all flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {formSent ? (
                    <><Check className="w-6 h-6" /> {t(T.pricing.submitSent, lang)}</>
                  ) : (
                    <><Send className="w-5 h-5" /> {t(T.pricing.submitBtn, lang)}</>
                  )}
                </motion.button>
              </form>

              <div className="flex items-center justify-center gap-3 mt-4 text-xs text-gray-500">
                <span className="flex items-center gap-1"><Check className="w-3 h-3 text-green-500" /> {t(T.pricing.noPrepay, lang)}</span>
                <span className="flex items-center gap-1"><Check className="w-3 h-3 text-green-500" /> {t(T.pricing.fastReply, lang)}</span>
              </div>

              <p className="text-center text-gray-600 text-[10px] mt-3">
                {t(T.pricing.consent, lang)}
              </p>
            </div>
          </div>

          {/* Or contact directly */}
          <div className="mt-8 text-center">
            <p className="font-montserrat text-gray-400 text-sm mb-4">{t(T.pricing.contactDirect, lang)}</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a href={TELEGRAM_BOT} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0088cc] text-white font-montserrat font-bold text-sm hover:bg-[#0099dd] transition-all shadow-[0_0_15px_rgba(0,136,204,0.3)]" onClick={() => trackContact('Telegram', lang)}>
                <MessageCircle className="w-5 h-5" /> Telegram
              </a>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] text-white font-montserrat font-bold text-sm hover:bg-[#20bd5a] transition-all shadow-[0_0_15px_rgba(37,211,102,0.3)]" onClick={() => trackContact('WhatsApp', lang)}>
                <Phone className="w-5 h-5" /> WhatsApp
              </a>
              <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-montserrat font-bold text-sm hover:from-purple-500 hover:to-pink-500 transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)]" onClick={() => trackContact('Instagram', lang)}>
                <Sparkles className="w-5 h-5" /> Instagram
              </a>
              <a href={PHONE_HREF} className="flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-600/20 border border-cyan-500/40 text-cyan-300 font-montserrat font-bold text-sm hover:bg-cyan-600/30 transition-all" onClick={() => trackContact('Phone', lang)}>
                <Phone className="w-5 h-5" /> {PHONE}
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══ FAQ ═══ */}
      <Section id="faq-section" className="py-14 sm:py-20 bg-[#050D1A]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="font-bebas text-4xl sm:text-6xl text-center text-white mb-10 sm:mb-14">
            {t(T.faq.title, lang)}<span className="text-cyan-400">{t(T.faq.titleHighlight, lang)}</span>
          </h2>

          <div className="space-y-3">
            {T.faq.items.map((item, i) => (
              <FaqItem key={i} icon={faqIcons[i]} q={t(item.q, lang)} a={t(item.a, lang)} />
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ FINAL CTA BANNER ═══ */}
      <Section className="py-14 sm:py-20 bg-gradient-to-r from-[#050D1A] via-[#0a1628] to-[#050D1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-bebas text-4xl sm:text-6xl text-white mb-3">
            {t(T.finalCta.title, lang)}<span className="text-red-500">{t(T.finalCta.titleHighlight, lang)}</span>
          </h2>
          <p className="font-montserrat text-gray-400 text-sm sm:text-lg mb-4 max-w-2xl mx-auto">
            {t(T.finalCta.subtitle, lang)}
          </p>
          <p className="font-montserrat text-yellow-400 font-bold text-base sm:text-xl mb-6">
            {t(T.finalCta.installment, lang)}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <PulseCTA text={t(T.finalCta.ctaBtn, lang)} href={TELEGRAM_BOT} size="lg" onClick={() => trackInitiateCheckout('final_cta', lang)} />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mt-6 text-xs sm:text-sm text-gray-400">
            <span className="flex items-center gap-1.5"><Truck className="w-4 h-4 text-cyan-400" /> {t(T.finalCta.badgeDelivery, lang)}</span>
            <span className="flex items-center gap-1.5"><Wrench className="w-4 h-4 text-cyan-400" /> {t(T.finalCta.badgeInstall, lang)}</span>
            <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-cyan-400" /> {t(T.finalCta.badgeWarranty, lang)}</span>
            <span className="flex items-center gap-1.5"><FileText className="w-4 h-4 text-cyan-400" /> {t(T.finalCta.badgeInstallment, lang)}</span>
          </div>
        </div>
      </Section>

      {/* ═══ FOOTER ═══ */}
      <footer className="py-10 sm:py-14 bg-[#030a14] border-t border-cyan-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-3 gap-8 sm:gap-12">
            <div>
              <div className="font-bebas text-xl tracking-wider mb-3">
                <span className="text-cyan-400">WELKIN</span> &times; <span className="text-white">MIDEA</span>
              </div>
              <p className="font-montserrat text-gray-500 text-sm">{t(T.footer.officialDealer, lang)}</p>
              <div className="flex items-center gap-2 mt-3">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                <span className="font-montserrat text-white text-sm font-bold ml-1">4.9</span>
              </div>
            </div>
            <div>
              <p className="font-montserrat font-bold text-white text-sm mb-3">{t(T.footer.contacts, lang)}</p>
              <div className="space-y-2 text-sm text-gray-400">
                <a href={PHONE_HREF} className="flex items-center gap-2 hover:text-cyan-400 transition-colors"><Phone className="w-4 h-4" />{PHONE}</a>
                <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-cyan-400 transition-colors"><Sparkles className="w-4 h-4" />@welkin.midea</a>
                <a href={TELEGRAM_BOT} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-cyan-400 transition-colors"><MessageCircle className="w-4 h-4" />@mideazubot</a>
              </div>
            </div>
            <div>
              <p className="font-montserrat font-bold text-white text-sm mb-3">{t(T.footer.workHours, lang)}</p>
              <div className="space-y-1 text-sm text-gray-400">
                <p>{t(T.footer.monSat, lang)}</p>
                <p>{t(T.footer.sun, lang)}</p>
                <p className="mt-2">{t(T.footer.city, lang)}</p>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-cyan-900/20 text-center text-gray-600 text-xs font-montserrat">
            &copy; 2026 Welkin &times; Midea. {t(T.footer.rights, lang)}
          </div>
        </div>
      </footer>

      {/* ═══ STICKY BOTTOM BAR ═══ */}
      <AnimatePresence>
        {showSticky && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-[#0a1628]/95 backdrop-blur-md border-t border-cyan-900/40 py-2.5 px-4"
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="font-bebas text-lg sm:text-xl text-white">ALBA</span>
                <span className="font-bebas text-lg sm:text-xl text-yellow-400">360$</span>
                <span className="font-bebas text-sm text-gray-500 line-through hidden sm:inline">450$</span>
                <span className="text-[10px] sm:text-xs text-green-400 font-montserrat font-bold">{t(T.sticky.installment, lang)}</span>
              </div>
              <div className="flex items-center gap-2">
                <PulseCTA text={t(T.sticky.buyBtn, lang)} href={TELEGRAM_BOT} size="sm" onClick={() => trackInitiateCheckout('sticky_bar', lang)} />
                <a href={TELEGRAM_BOT} target="_blank" rel="noopener noreferrer" className="shrink-0 w-10 h-10 rounded-xl bg-[#0088cc] flex items-center justify-center text-white hover:bg-[#0099dd] transition-all" onClick={() => trackContact('Telegram_sticky', lang)}>
                  <MessageCircle className="w-4 h-4" />
                </a>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="shrink-0 w-10 h-10 rounded-xl bg-[#25D366] flex items-center justify-center text-white hover:bg-[#20bd5a] transition-all" onClick={() => trackContact('WhatsApp_sticky', lang)}>
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom padding for sticky bar */}
      <div className="h-16" />
    </div>
  );
}
