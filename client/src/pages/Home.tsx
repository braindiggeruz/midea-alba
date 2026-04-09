/**
 * MIDEA ALBA LANDING PAGE
 * Design: Dark Cyber Tech
 * Colors: #050D1A bg, #00E5FF cyan neon, #FFD600 yellow CTA
 * Fonts: Bebas Neue (display), Montserrat (body), Orbitron (data)
 * Goal: Maximum lead conversion — collect name + phone
 */

import { useState, useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

// ── Image URLs (CDN) ──────────────────────────────────────────────────────────
const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663532358315/Pvyt7qa76fQ9ttQfPKguuc/hero-bg_2bce22a1.jpg";
const AC_HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663532358315/Pvyt7qa76fQ9ttQfPKguuc/ac-hero_ce9c07c1.png";
const SAVINGS_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663532358315/Pvyt7qa76fQ9ttQfPKguuc/savings-visual_43ddf70a.jpg";
const WIFI_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663532358315/Pvyt7qa76fQ9ttQfPKguuc/wifi-control_20f63a8d.jpg";
const SILENT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663532358315/Pvyt7qa76fQ9ttQfPKguuc/silent-visual_b5569ce7.jpg";

// ── Types ─────────────────────────────────────────────────────────────────────
interface HexBadgeProps {
  icon: string;
  label: string;
  sub?: string;
}

interface FeatureCardProps {
  icon: string;
  title: string;
  desc: string;
  highlight: string;
}

interface CounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

// ── Counter Animation ─────────────────────────────────────────────────────────
function AnimatedCounter({ end, suffix = "", prefix = "", duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

// ── Hex Badge ─────────────────────────────────────────────────────────────────
function HexBadge({ icon, label, sub }: HexBadgeProps) {
  return (
    <motion.div
      className="flex flex-col items-center gap-1"
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      <div
        className="relative flex flex-col items-center justify-center text-center"
        style={{
          width: 90,
          height: 104,
          background: "rgba(0,229,255,0.06)",
          border: "1.5px solid rgba(0,229,255,0.45)",
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          boxShadow: "0 0 12px rgba(0,229,255,0.2), inset 0 0 12px rgba(0,229,255,0.05)",
        }}
      >
        <span style={{ fontSize: "1.5rem" }}>{icon}</span>
        <span style={{ fontSize: "0.6rem", color: "#00E5FF", fontWeight: 700, lineHeight: 1.2, marginTop: 2 }}>{label}</span>
        {sub && <span style={{ fontSize: "0.55rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.1 }}>{sub}</span>}
      </div>
    </motion.div>
  );
}

// ── Feature Card ──────────────────────────────────────────────────────────────
function FeatureCard({ icon, title, desc, highlight }: FeatureCardProps) {
  return (
    <motion.div
      className="dark-card rounded-2xl p-6 flex flex-col gap-3"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, borderColor: "rgba(0,229,255,0.5)" }}
    >
      <div className="text-4xl mb-1">{icon}</div>
      <div
        className="font-bebas text-2xl"
        style={{ color: "#00E5FF", letterSpacing: "0.05em" }}
      >
        {title}
      </div>
      <p className="text-sm text-gray-300 leading-relaxed">{desc}</p>
      <div
        className="font-orbitron text-sm font-bold mt-auto pt-2"
        style={{
          color: "#FFD600",
          borderTop: "1px solid rgba(255,214,0,0.2)",
          paddingTop: "0.75rem",
        }}
      >
        {highlight}
      </div>
    </motion.div>
  );
}

// ── Pain Point Card ───────────────────────────────────────────────────────────
function PainCard({ emoji, pain, solution }: { emoji: string; pain: string; solution: string }) {
  return (
    <motion.div
      className="rounded-xl p-5 flex gap-4 items-start"
      style={{
        background: "rgba(10,22,40,0.9)",
        border: "1px solid rgba(0,229,255,0.15)",
      }}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <span className="text-3xl flex-shrink-0">{emoji}</span>
      <div>
        <p className="text-gray-400 text-sm line-through mb-1">{pain}</p>
        <p className="text-white font-semibold text-sm">{solution}</p>
      </div>
    </motion.div>
  );
}

// ── Review Card ───────────────────────────────────────────────────────────────
function ReviewCard({ name, city, text, rating }: { name: string; city: string; text: string; rating: number }) {
  return (
    <motion.div
      className="dark-card rounded-2xl p-6 flex flex-col gap-3"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex gap-1">
        {Array.from({ length: rating }).map((_, i) => (
          <span key={i} style={{ color: "#FFD600", fontSize: "1rem" }}>★</span>
        ))}
      </div>
      <p className="text-gray-300 text-sm leading-relaxed italic">"{text}"</p>
      <div className="flex items-center gap-2 mt-auto">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
          style={{ background: "rgba(0,229,255,0.2)", color: "#00E5FF" }}
        >
          {name[0]}
        </div>
        <div>
          <p className="font-semibold text-sm text-white">{name}</p>
          <p className="text-xs text-gray-500">{city}</p>
        </div>
      </div>
    </motion.div>
  );
}

// ── Lead Form ─────────────────────────────────────────────────────────────────
function LeadForm({ id }: { id: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setLoading(true);
    // Simulate submission — in production connect to Telegram bot API
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        className="text-center py-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="font-bebas text-3xl neon-cyan mb-2">ЗАЯВКА ПРИНЯТА!</h3>
        <p className="text-gray-300">Наш менеджер свяжется с вами в течение 15 минут</p>
      </motion.div>
    );
  }

  return (
    <form id={id} onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Ваше имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full px-5 py-4 rounded-xl text-white placeholder-gray-500 outline-none transition-all"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(0,229,255,0.3)",
          fontSize: "1rem",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#00E5FF")}
        onBlur={(e) => (e.target.style.borderColor = "rgba(0,229,255,0.3)")}
      />
      <input
        type="tel"
        placeholder="+998 __ ___ __ __"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
        className="w-full px-5 py-4 rounded-xl text-white placeholder-gray-500 outline-none transition-all"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(0,229,255,0.3)",
          fontSize: "1rem",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#00E5FF")}
        onBlur={(e) => (e.target.style.borderColor = "rgba(0,229,255,0.3)")}
      />
      <button type="submit" className="btn-cta w-full" disabled={loading}>
        {loading ? "ОТПРАВЛЯЕМ..." : "ПОЛУЧИТЬ КОНСУЛЬТАЦИЮ БЕСПЛАТНО"}
      </button>
      <p className="text-xs text-gray-500 text-center">
        Нажимая кнопку, вы соглашаетесь на обработку персональных данных
      </p>
    </form>
  );
}

// ── Comparison Table ──────────────────────────────────────────────────────────
function ComparisonTable() {
  const rows = [
    { param: "Шум", others: "45 дБ (мешает спать)", alba: "19 дБ (тише шёпота)" },
    { param: "Управление", others: "Только пульт", alba: "Wi-Fi + голос + приложение" },
    { param: "Экономия", others: "Обычный инвертор", alba: "AI EcoMaster -60% свет" },
    { param: "Защита", others: "Нет", alba: "Prime Guard от 145V" },
    { param: "Охлаждение", others: "10-15 минут", alba: "3 минуты" },
    { param: "Точность", others: "±2-3°C", alba: "±0.5°C" },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full" style={{ borderCollapse: "separate", borderSpacing: 0 }}>
        <thead>
          <tr>
            <th className="py-4 px-4 text-left text-gray-400 font-semibold text-sm">Параметр</th>
            <th className="py-4 px-4 text-center text-gray-400 font-semibold text-sm">Обычный кондей</th>
            <th
              className="py-4 px-4 text-center font-bold text-sm font-bebas text-xl"
              style={{ color: "#00E5FF" }}
            >
              MIDEA ALBA
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <motion.tr
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              style={{
                background: i % 2 === 0 ? "rgba(0,229,255,0.03)" : "transparent",
              }}
            >
              <td className="py-3 px-4 text-gray-300 text-sm font-semibold">{row.param}</td>
              <td className="py-3 px-4 text-center text-gray-500 text-sm">
                <span className="flex items-center justify-center gap-1">
                  <span style={{ color: "#FF3B30" }}>✗</span> {row.others}
                </span>
              </td>
              <td className="py-3 px-4 text-center text-sm font-semibold" style={{ color: "#00E5FF" }}>
                <span className="flex items-center justify-center gap-1">
                  <span style={{ color: "#4CD964" }}>✓</span> {row.alba}
                </span>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Sticky CTA Bar ────────────────────────────────────────────────────────────
function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4"
      initial={{ y: 100 }}
      animate={{ y: visible ? 0 : 100 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div
        className="max-w-lg mx-auto rounded-2xl p-4 flex items-center justify-between gap-4"
        style={{
          background: "rgba(5,13,26,0.95)",
          border: "1px solid rgba(0,229,255,0.3)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 -4px 30px rgba(0,0,0,0.5), 0 0 20px rgba(0,229,255,0.1)",
        }}
      >
        <div>
          <p className="text-xs text-gray-400">Midea ALBA</p>
          <div className="flex items-center gap-2">
            <span className="font-bebas text-2xl" style={{ color: "#FFD600" }}>360$</span>
            <span className="text-sm text-gray-500 line-through">450$</span>
          </div>
        </div>
        <a
          href="#lead-form"
          className="btn-cta text-base px-6 py-3"
          style={{ fontSize: "1rem", padding: "0.75rem 1.5rem" }}
        >
          КУПИТЬ СЕЙЧАС
        </a>
      </div>
    </motion.div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function Home() {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 47, seconds: 12 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; minutes = 59; seconds = 59; }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="min-h-screen circuit-bg" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      {/* ── HEADER ── */}
      <header
        className="fixed top-0 left-0 right-0 z-40 px-4 py-3"
        style={{
          background: "rgba(5,13,26,0.9)",
          borderBottom: "1px solid rgba(0,229,255,0.15)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bebas text-2xl" style={{ color: "#00E5FF", letterSpacing: "0.1em" }}>
              WELKIN
            </span>
            <span className="text-gray-500 text-lg">×</span>
            <span className="font-bebas text-2xl text-white">MIDEA</span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-sm text-gray-400">
            <span>📞</span>
            <span>+998 99 892 36 02</span>
          </div>
          <a href="#lead-form" className="btn-cta" style={{ fontSize: "0.9rem", padding: "0.6rem 1.5rem" }}>
            КУПИТЬ ЗА 360$
          </a>
        </div>
      </header>

      {/* ── HERO ── */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{
          paddingTop: "80px",
          background: `linear-gradient(to bottom, rgba(5,13,26,0.7) 0%, rgba(5,13,26,0.9) 100%), url(${HERO_BG}) center/cover no-repeat`,
        }}
      >
        {/* Animated circuit lines */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="max-w-6xl mx-auto px-4 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div>
              {/* Urgency badge */}
              <motion.div
                className="inline-flex items-center gap-2 mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="urgency-badge">🔥 АКЦИЯ ОГРАНИЧЕНА</span>
                <span className="text-gray-400 text-sm">Осталось: <span style={{ color: "#FF3B30", fontWeight: 700 }}>47 штук</span></span>
              </motion.div>

              {/* Main headline */}
              <motion.h1
                className="font-bebas leading-none mb-4"
                style={{ fontSize: "clamp(3rem, 8vw, 6rem)", letterSpacing: "0.02em" }}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <span className="text-white">УМНЫЙ</span>
                <br />
                <span style={{ color: "#00E5FF" }}>КОНДИЦИОНЕР</span>
                <br />
                <span className="text-white">ЗА </span>
                <span style={{ color: "#FFD600" }}>360$</span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                className="text-gray-300 text-lg mb-8 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Midea ALBA — охлаждает за <strong style={{ color: "#00E5FF" }}>3 минуты</strong>,
                работает тише <strong style={{ color: "#00E5FF" }}>19 дБ</strong>,
                экономит <strong style={{ color: "#FFD600" }}>200$ в год</strong> на электричестве
              </motion.p>

              {/* Hex badges */}
              <motion.div
                className="flex flex-wrap gap-3 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <HexBadge icon="🤖" label="AI" sub="EcoMaster" />
                <HexBadge icon="📶" label="Wi-Fi" sub="Control" />
                <HexBadge icon="🔇" label="19 дБ" sub="Тишина" />
                <HexBadge icon="🛡️" label="Prime" sub="Guard" />
                <HexBadge icon="⚡" label="от 145V" sub="Защита" />
                <HexBadge icon="♻️" label="Инвертор" sub="-60%" />
              </motion.div>

              {/* CTA */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 items-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <a href="#lead-form" className="btn-cta text-xl">
                  КУПИТЬ ЗА 360$ <span className="price-old text-base ml-2">450$</span>
                </a>
              </motion.div>

              {/* Trust signals */}
              <motion.div
                className="flex flex-wrap gap-4 mt-6 text-sm text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <span>✅ Бесплатная установка</span>
                <span>✅ Гарантия 3 года</span>
                <span>✅ Доставка по Ташкенту</span>
              </motion.div>
            </div>

            {/* Right: Product image */}
            <motion.div
              className="relative flex justify-center items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(0,229,255,0.15) 0%, transparent 70%)",
                  filter: "blur(40px)",
                }}
              />
              <img
                src={AC_HERO}
                alt="Midea ALBA кондиционер"
                className="relative z-10 w-full max-w-lg animate-float"
                style={{ filter: "drop-shadow(0 0 30px rgba(0,229,255,0.3))" }}
              />
            </motion.div>
          </div>
        </div>

        {/* Countdown timer */}
        <div
          className="absolute bottom-0 left-0 right-0 py-4"
          style={{
            background: "rgba(0,0,0,0.5)",
            borderTop: "1px solid rgba(255,214,0,0.3)",
          }}
        >
          <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <span className="text-gray-300 text-sm font-semibold">⏰ Акция заканчивается через:</span>
            <div className="flex gap-3 items-center">
              {[
                { val: pad(timeLeft.hours), label: "часов" },
                { val: pad(timeLeft.minutes), label: "минут" },
                { val: pad(timeLeft.seconds), label: "секунд" },
              ].map(({ val, label }, i) => (
                <div key={i} className="flex flex-col items-center">
                  <span
                    className="font-orbitron text-2xl font-bold"
                    style={{ color: "#FFD600", minWidth: "2.5rem", textAlign: "center" }}
                  >
                    {val}
                  </span>
                  <span className="text-xs text-gray-500">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PAIN POINTS ── */}
      <section className="py-20 px-4" style={{ background: "rgba(0,0,0,0.3)" }}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-bebas text-5xl text-white mb-3" style={{ letterSpacing: "0.05em" }}>
              УЗНАЁШЬ СЕБЯ?
            </h2>
            <p className="text-gray-400">Типичные проблемы с обычными кондиционерами</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-4">
            <PainCard emoji="😤" pain="Кондей шумит как трактор — не могу спать" solution="ALBA работает тише шёпота — всего 19 дБ" />
            <PainCard emoji="💸" pain="Счёт за электричество вырос в 2 раза" solution="AI EcoMaster экономит до 60% электроэнергии" />
            <PainCard emoji="📵" pain="Нельзя включить кондей до прихода домой" solution="Wi-Fi управление с телефона из любой точки мира" />
            <PainCard emoji="🔥" pain="Жара +45°C, а кондей охлаждает 20 минут" solution="Охлаждает комнату за 3 минуты на полной мощности" />
            <PainCard emoji="⚡" pain="Скачки напряжения сожгли предыдущий кондей" solution="Prime Guard защищает от 145V — работает при любом напряжении" />
            <PainCard emoji="🌡️" pain="Температура скачет — то жарко, то холодно" solution="Точность ±0.5°C — AI сам поддерживает нужный климат" />
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { val: 360, suffix: "$", label: "Цена вместо 450$", color: "#FFD600" },
              { val: 19, suffix: " дБ", label: "Уровень шума", color: "#00E5FF" },
              { val: 60, suffix: "%", label: "Экономия электричества", color: "#4CD964" },
              { val: 200, suffix: "$", label: "Экономия в год", color: "#FFD600" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="text-center p-6 rounded-2xl dark-card"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div
                  className="font-bebas text-5xl mb-1"
                  style={{ color: stat.color, fontFamily: "'Orbitron', sans-serif" }}
                >
                  <AnimatedCounter end={stat.val} suffix={stat.suffix} />
                </div>
                <p className="text-gray-400 text-xs">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-20 px-4" style={{ background: "rgba(0,0,0,0.2)" }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-bebas text-5xl text-white mb-3" style={{ letterSpacing: "0.05em" }}>
              6 ПРИЧИН ВЫБРАТЬ <span style={{ color: "#00E5FF" }}>ALBA</span>
            </h2>
            <p className="text-gray-400">Технологии, которые меняют комфорт</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon="🤖"
              title="AI ECOMASTER"
              desc="Искусственный интеллект анализирует температуру, влажность и активность людей в комнате. Автоматически подбирает оптимальный режим."
              highlight="Экономия до 60% на электричестве"
            />
            <FeatureCard
              icon="📶"
              title="WI-FI УПРАВЛЕНИЕ"
              desc="Управляйте кондиционером с телефона через приложение Midea Air. Голосовое управление через Алису и Google Assistant."
              highlight="Включай за 30 минут до прихода домой"
            />
            <FeatureCard
              icon="🔇"
              title="19 ДБ ТИШИНА"
              desc="Тише человеческого шёпота (30 дБ). Идеально для спальни, детской комнаты и рабочего кабинета. Спите без помех."
              highlight="Обычный кондей — 45 дБ. ALBA — 19 дБ"
            />
            <FeatureCard
              icon="🛡️"
              title="PRIME GUARD"
              desc="Защита компрессора от скачков напряжения. Работает при напряжении от 145V. Защищает от перегрева и замерзания."
              highlight="Гарантия 3 года на весь кондиционер"
            />
            <FeatureCard
              icon="⚡"
              title="ОХЛАЖДАЕТ ЗА 3 МИН"
              desc="Режим Turbo Cool мгновенно охлаждает комнату до нужной температуры. Снижает с +45°C до +22°C за 3 минуты."
              highlight="Точность поддержания температуры ±0.5°C"
            />
            <FeatureCard
              icon="♻️"
              title="ИНВЕРТОР"
              desc="Инверторный компрессор не выключается полностью, а снижает мощность. Нет резких пусков — меньше износ и расход энергии."
              highlight="Экономия 200$ в год на электричестве"
            />
          </div>
        </div>
      </section>

      {/* ── FEATURE SHOWCASE: SAVINGS ── */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="font-bebas text-lg" style={{ color: "#FFD600", letterSpacing: "0.1em" }}>
                ЭКОНОМИЯ
              </span>
              <h2 className="font-bebas text-5xl text-white mt-2 mb-4" style={{ letterSpacing: "0.03em" }}>
                КОНДЕЙ, КОТОРЫЙ<br />
                <span style={{ color: "#4CD964" }}>ПЛАТИТ СЕБЕ</span>
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                AI EcoMaster анализирует потребление и автоматически снижает мощность, когда комната достигла нужной температуры. Результат — экономия <strong style={{ color: "#FFD600" }}>до 200$ в год</strong> на электричестве.
              </p>
              <div className="space-y-3">
                {[
                  { label: "Экономия на электричестве", val: "-60%", color: "#4CD964" },
                  { label: "Экономия в год", val: "200$", color: "#FFD600" },
                  { label: "Срок окупаемости", val: "1.5 года", color: "#00E5FF" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <span className="text-gray-300 text-sm">{item.label}</span>
                    <span className="font-orbitron font-bold text-lg" style={{ color: item.color }}>{item.val}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img src={SAVINGS_IMG} alt="Экономия на электричестве" className="w-full rounded-2xl" style={{ boxShadow: "0 0 40px rgba(76,217,100,0.2)" }} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FEATURE SHOWCASE: WIFI ── */}
      <section className="py-20 px-4" style={{ background: "rgba(0,0,0,0.2)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="order-2 lg:order-1 relative"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img src={WIFI_IMG} alt="Wi-Fi управление" className="w-full rounded-2xl" style={{ boxShadow: "0 0 40px rgba(0,229,255,0.2)" }} />
            </motion.div>
            <motion.div
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="font-bebas text-lg" style={{ color: "#00E5FF", letterSpacing: "0.1em" }}>
                УМНЫЙ ДОМ
              </span>
              <h2 className="font-bebas text-5xl text-white mt-2 mb-4" style={{ letterSpacing: "0.03em" }}>
                УПРАВЛЯЙ<br />
                <span style={{ color: "#00E5FF" }}>С ТЕЛЕФОНА!</span>
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                Приложение Midea Air позволяет управлять кондиционером из любой точки мира. Включи за 30 минут до прихода домой — заходи в прохладу.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: "📱", label: "Midea App" },
                  { icon: "🎤", label: "Голосовое управление" },
                  { icon: "🏠", label: "Умный дом" },
                  { icon: "📅", label: "Расписание" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "rgba(0,229,255,0.05)", border: "1px solid rgba(0,229,255,0.2)" }}>
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-sm text-gray-300 font-semibold">{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FEATURE SHOWCASE: SILENT ── */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="font-bebas text-lg" style={{ color: "#4CD964", letterSpacing: "0.1em" }}>
                ТИШИНА
              </span>
              <h2 className="font-bebas text-5xl text-white mt-2 mb-4" style={{ letterSpacing: "0.03em" }}>
                ТИШЕ ЧЕМ<br />
                <span style={{ color: "#4CD964" }}>ТВОЙ ШЁПОТ</span>
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                Обычный кондиционер шумит как 45 дБ — это уровень шумного офиса. ALBA работает на 19 дБ — тише человеческого шёпота. Идеально для сна и работы.
              </p>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-400">Обычный кондей</span>
                    <span className="text-sm font-bold" style={{ color: "#FF3B30" }}>45 дБ</span>
                  </div>
                  <div className="h-3 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: "linear-gradient(90deg, #FF3B30, #FF6B35)" }}
                      initial={{ width: 0 }}
                      whileInView={{ width: "90%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-400">Midea ALBA</span>
                    <span className="text-sm font-bold" style={{ color: "#4CD964" }}>19 дБ</span>
                  </div>
                  <div className="h-3 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: "linear-gradient(90deg, #4CD964, #00E5FF)" }}
                      initial={{ width: 0 }}
                      whileInView={{ width: "38%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.4 }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span>🛏️</span> Спальня
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span>👶</span> Детская
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span>💼</span> Офис
                </div>
              </div>
            </motion.div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img src={SILENT_IMG} alt="Тишина 19 дБ" className="w-full rounded-2xl" style={{ boxShadow: "0 0 40px rgba(76,217,100,0.2)" }} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── COMPARISON ── */}
      <section className="py-20 px-4" style={{ background: "rgba(0,0,0,0.3)" }}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-bebas text-5xl text-white mb-3" style={{ letterSpacing: "0.05em" }}>
              ALBA VS <span style={{ color: "#FF3B30" }}>ОБЫЧНЫЙ КОНДЕЙ</span>
            </h2>
          </motion.div>
          <div className="dark-card rounded-2xl overflow-hidden">
            <ComparisonTable />
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-bebas text-5xl text-white mb-3" style={{ letterSpacing: "0.05em" }}>
              ЧТО ГОВОРЯТ <span style={{ color: "#FFD600" }}>КЛИЕНТЫ</span>
            </h2>
            <p className="text-gray-400">Более 500 довольных покупателей по всему Узбекистану</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ReviewCard
              name="Акбар Рашидов"
              city="Ташкент, Юнусабад"
              text="Купил месяц назад — счёт за свет реально снизился. Жена довольна — тихо работает, не мешает спать. Рекомендую!"
              rating={5}
            />
            <ReviewCard
              name="Дилноза Каримова"
              city="Ташкент, Мирзо-Улугбек"
              text="Управляю с телефона — это просто космос! Включаю за 20 минут до прихода домой. Дети в детской спят отлично."
              rating={5}
            />
            <ReviewCard
              name="Бахром Усманов"
              city="Ташкент, Чиланзар"
              text="У нас напряжение скачет — старый кондей сгорел. ALBA работает без проблем уже 3 месяца. Prime Guard — реально работает."
              rating={5}
            />
            <ReviewCard
              name="Малика Юсупова"
              city="Ташкент, Сергели"
              text="Охлаждает очень быстро. Жара +45 на улице, а дома +22 через 5 минут. Установщики приехали в тот же день!"
              rating={5}
            />
            <ReviewCard
              name="Санжар Тошматов"
              city="Ташкент, Бектемир"
              text="Взял в рассрочку 0%. Переплаты нет. Кондей отличный — тихий, умный, красивый. Welkin — надёжные ребята."
              rating={5}
            />
            <ReviewCard
              name="Гульнора Хасанова"
              city="Ташкент, Яккасарай"
              text="Муж скептически относился к 'умному' кондею. Теперь сам управляет с телефона и хвастается перед друзьями 😄"
              rating={5}
            />
          </div>
        </div>
      </section>

      {/* ── PRICE & OFFER ── */}
      <section className="py-20 px-4" style={{ background: "rgba(0,0,0,0.4)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="urgency-badge text-base px-4 py-2 mb-6 inline-block">
              🔥 СПЕЦИАЛЬНАЯ ЦЕНА — ОГРАНИЧЕННОЕ ВРЕМЯ
            </span>
            <h2 className="font-bebas text-7xl mt-6 mb-2" style={{ color: "#FFD600", letterSpacing: "0.05em", lineHeight: 1 }}>
              360$
            </h2>
            <p className="text-gray-400 text-xl mb-2">
              <span className="line-through">Обычная цена: 450$</span>
            </p>
            <p className="text-2xl font-bold mb-8" style={{ color: "#4CD964" }}>
              Вы экономите 90$ прямо сейчас!
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mb-10">
              {[
                { icon: "🚚", title: "Бесплатная доставка", sub: "По всему Ташкенту" },
                { icon: "🔧", title: "Бесплатная установка", sub: "Мастер приедет в тот же день" },
                { icon: "📋", title: "Гарантия 3 года", sub: "Официальная гарантия Midea" },
              ].map((item, i) => (
                <div key={i} className="p-5 rounded-xl" style={{ background: "rgba(0,229,255,0.05)", border: "1px solid rgba(0,229,255,0.2)" }}>
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <p className="font-bold text-white text-sm">{item.title}</p>
                  <p className="text-xs text-gray-400 mt-1">{item.sub}</p>
                </div>
              ))}
            </div>

            <a href="#lead-form" className="btn-cta text-2xl inline-block">
              КУПИТЬ ЗА 360$ — СЭКОНОМИТЬ 90$
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── LEAD FORM ── */}
      <section id="lead-form" className="py-20 px-4">
        <div className="max-w-xl mx-auto">
          <motion.div
            className="rounded-3xl p-8 sm:p-12"
            style={{
              background: "rgba(10,22,40,0.9)",
              border: "1px solid rgba(0,229,255,0.3)",
              boxShadow: "0 0 60px rgba(0,229,255,0.1)",
            }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-8">
              <h2 className="font-bebas text-4xl text-white mb-2" style={{ letterSpacing: "0.05em" }}>
                ОСТАВЬ ЗАЯВКУ
              </h2>
              <p className="text-gray-400">
                Получи <strong style={{ color: "#FFD600" }}>бесплатную консультацию</strong> и узнай точную цену с установкой
              </p>
              <div className="flex items-center justify-center gap-4 mt-4 text-sm text-gray-500">
                <span>✅ Без предоплаты</span>
                <span>✅ Ответим за 15 минут</span>
              </div>
            </div>
            <LeadForm id="main-lead-form" />
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 px-4" style={{ background: "rgba(0,0,0,0.3)" }}>
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-bebas text-5xl text-white mb-3" style={{ letterSpacing: "0.05em" }}>
              ЧАСТЫЕ ВОПРОСЫ
            </h2>
          </motion.div>
          <div className="space-y-4">
            {[
              {
                q: "Сколько стоит установка?",
                a: "Установка БЕСПЛАТНАЯ при покупке кондиционера. Мастер приедет в тот же день или на следующий день.",
              },
              {
                q: "Есть ли рассрочка?",
                a: "Да! Рассрочка 0% на 6 и 12 месяцев. Никаких переплат. Уточните условия у менеджера.",
              },
              {
                q: "Какая гарантия?",
                a: "Официальная гарантия Midea — 3 года на весь кондиционер, 5 лет на компрессор.",
              },
              {
                q: "Доставляете в регионы?",
                a: "Да, доставляем по всему Узбекистану. Стоимость доставки уточняйте у менеджера.",
              },
              {
                q: "Работает ли при низком напряжении?",
                a: "Да! Prime Guard защищает кондиционер и позволяет работать при напряжении от 145V.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="rounded-xl overflow-hidden"
                style={{ border: "1px solid rgba(0,229,255,0.15)" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <details className="group">
                  <summary
                    className="flex items-center justify-between p-5 cursor-pointer font-semibold text-white"
                    style={{ background: "rgba(10,22,40,0.8)" }}
                  >
                    <span>{item.q}</span>
                    <span style={{ color: "#00E5FF" }}>+</span>
                  </summary>
                  <div className="p-5 text-gray-300 text-sm leading-relaxed" style={{ background: "rgba(5,13,26,0.8)" }}>
                    {item.a}
                  </div>
                </details>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="py-12 px-4"
        style={{
          background: "rgba(0,0,0,0.5)",
          borderTop: "1px solid rgba(0,229,255,0.1)",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="font-bebas text-2xl" style={{ color: "#00E5FF" }}>WELKIN</span>
                <span className="text-gray-500">×</span>
                <span className="font-bebas text-2xl text-white">MIDEA</span>
              </div>
              <p className="text-gray-500 text-sm">Официальный дистрибьютор Midea в Узбекистане</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Контакты</h4>
              <p className="text-gray-400 text-sm">📞 +998 99 892 36 02</p>
              <p className="text-gray-400 text-sm mt-1">📱 Instagram: @welkin.midea</p>
              <p className="text-gray-400 text-sm mt-1">💬 Telegram: @welkin_midea</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Режим работы</h4>
              <p className="text-gray-400 text-sm">Пн-Сб: 9:00 — 19:00</p>
              <p className="text-gray-400 text-sm mt-1">Вс: 10:00 — 17:00</p>
              <p className="text-gray-400 text-sm mt-1">Ташкент, Узбекистан</p>
            </div>
          </div>
          <div
            className="pt-6 text-center text-gray-600 text-xs"
            style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
          >
            © 2025 Welkin × Midea. Все права защищены.
          </div>
        </div>
      </footer>

      {/* ── STICKY CTA ── */}
      <StickyCTA />
    </div>
  );
}
