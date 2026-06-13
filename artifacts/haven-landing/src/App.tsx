import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import type { MotionValue, Transition } from "framer-motion";
import {
  Search,
  Menu,
  X,
  Play,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Target,
} from "lucide-react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";
import TeamShowcase from "@/components/ui/team-showcase";
import VariableProximity from "@/components/ui/variable-proximity";
import DisplayCards from "@/components/ui/display-cards";
import { WavePath } from "@/components/ui/wave-path";

gsap.registerPlugin(ScrollTrigger);

/* ─── constants ──────────────────────────────────────────────── */
const CUSTOM_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const FADE_UP = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.72, ease: CUSTOM_EASE, delay } as Transition,
});

const FADE_IN = (delay: number) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8, ease: "easeOut" as const, delay } as Transition,
});

const NAV_LINKS = [
  { name: "Who We Help", href: "#pain" },
  { name: "The Offer",   href: "#offer" },
  { name: "Pricing",     href: "#results" },
  { name: "Team",        href: "#team" },
  { name: "Contact",     href: "#hero" },
];
const COURIER = "'Courier Prime', 'Courier New', Courier, monospace";
const SANS = "'Inter', 'Helvetica Neue', Arial, sans-serif";

/* ─── data ───────────────────────────────────────────────────── */
const PAIN_POINTS = [
  { stat: "Spending ₹10K–50K/month", sub: "with nothing to show" },
  { stat: "Leads come in cold", sub: "no follow-up system" },
  { stat: "Big builders get all the tech", sub: "you get left behind" },
];

const RESULTS_CARDS = [
  {
    icon: <BadgeCheck size={14} color="#4ade80" strokeWidth={1.8} />,
    label: "The Guarantee",
    title: "Miss targets? Full fee refunded.",
    description: "If we don't hit agreed lead numbers, you pay nothing for our service.",
    meta: "No fine print · ad spend excluded",
    accentColor: "#4ade80",
    className: "[grid-area:stack] hover:-translate-y-10 transition-all duration-700 grayscale hover:grayscale-0 before:absolute before:inset-0 before:rounded-2xl before:bg-black/40 before:transition-opacity before:duration-700 hover:before:opacity-0",
  },
  {
    icon: <BarChart3 size={14} color="#60a5fa" strokeWidth={1.8} />,
    label: "Month 2+",
    title: "20–30 leads · WhatsApp running",
    description: "Pipeline fully active — bot auto-replies, follows up, qualifies buyers.",
    meta: "Mumbai · ongoing campaigns",
    accentColor: "#60a5fa",
    className: "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 transition-all duration-700 grayscale hover:grayscale-0 before:absolute before:inset-0 before:rounded-2xl before:bg-black/40 before:transition-opacity before:duration-700 hover:before:opacity-0",
  },
  {
    icon: <Target size={14} color="#f59e0b" strokeWidth={1.8} />,
    label: "Month 1 Target",
    title: "18–25 qualified buyer leads",
    description: "First leads delivered within days of launch. System optimises weekly.",
    meta: "Independent builder · 5–100 units",
    accentColor: "#f59e0b",
    className: "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10 transition-all duration-700",
  },
];

/* ─── small components ───────────────────────────────────────── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        background: "rgba(255,255,255,0.07)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 9999,
        padding: "5px 14px",
        marginBottom: 20,
      }}
    >
      <span
        style={{
          color: "rgba(255,255,255,0.6)",
          fontSize: 11,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          fontFamily: SANS,
        }}
      >
        {children}
      </span>
    </div>
  );
}

/* ─── FLOATING PATHS BACKGROUND ─────────────────────────────── */
function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position} -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position} ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position} ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }));
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      <svg style={{ width: "100%", height: "100%" }} viewBox="0 0 696 316" fill="none" preserveAspectRatio="xMidYMid slice">
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="white"
            strokeWidth={path.width}
            strokeOpacity={0.03 + path.id * 0.007}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{ pathLength: 1, opacity: [0.3, 0.6, 0.3], pathOffset: [0, 1, 0] }}
            transition={{ duration: 20 + (path.id % 7) * 3, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </svg>
    </div>
  );
}

function PainHeadline() {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-60px" });
  return (
    <motion.h2
      ref={containerRef}
      initial={{ opacity: 0, y: 18 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      style={{
        fontFamily: SANS,
        fontSize: "clamp(22px, 2.8vw, 42px)",
        fontWeight: 300,
        color: "white",
        lineHeight: 1.35,
        margin: "0 auto",
        maxWidth: 720,
        letterSpacing: "-0.01em",
        cursor: "default",
      }}
    >
      <VariableProximity
        label="Hoardings. Classifieds. Random broker calls. And still — unsold inventory."
        fromFontVariationSettings='"wght" 300'
        toFontVariationSettings='"wght" 900'
        containerRef={containerRef}
        radius={140}
        falloff="gaussian"
        style={{ display: "inline" }}
      />
    </motion.h2>
  );
}

function FadeSection({
  children,
  style,
  className,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── PERSPECTIVE CARD (Olivier Larose technique) ────────────── */
/*
 * Each card is position:sticky / top:0 / height:100vh.
 * A shared scrollYProgress (0→1 over the full N×100vh container)
 * drives scale + rotate on a per-card basis:
 *   card i exits during progress [i/N, (i+1)/N]
 *   → scale  1 → 0.85
 *   → rotate 0 → −3°
 *   → borderRadius 0 → 16px  (the "card pulling away" feel)
 * The last card receives no transform (it's the destination).
 */
function PerspectiveCard({
  children,
  i,
  total,
  progress,
}: {
  children: React.ReactNode;
  i: number;
  total: number;
  progress: MotionValue<number>;
}) {
  /*
   * Total scroll distance for the container = (N × 100vh) − 100vh = (N−1) × 100vh
   * Card i stacks at scroll = i × 100vh → progress = i / (N−1)
   * So each card's "exit window" is [i/(N-1), (i+1)/(N-1)]
   */
  const segments = total - 1; // N-1 transitions for N cards
  const start = i / segments;
  const end = Math.min(1, (i + 1) / segments);

  const scale = useTransform(progress, [start, end], [1, 0.85]);
  const rotate = useTransform(progress, [start, end], [0, -3]);
  const borderRadius = useTransform(progress, [start, end], [0, 16]);

  const isLast = i === total - 1;

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        zIndex: i + 1,
      }}
    >
      <motion.div
        style={
          isLast
            ? { width: "100%", height: "100%", overflow: "hidden" }
            : {
                scale,
                rotate,
                borderRadius,
                transformOrigin: "top center",
                width: "100%",
                height: "100%",
                overflow: "hidden",
                willChange: "transform",
              }
        }
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ─── APP ─────────────────────────────────────────────────────── */
export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroBgLoaded, setHeroBgLoaded] = useState(false);

  /* perspective container ref + scroll progress */
  const perspContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: perspProgress } = useScroll({
    target: perspContainerRef,
    offset: ["start start", "end end"],
  });

  /* nav transparency on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Lenis smooth scroll — keeps Framer Motion useScroll in sync */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    } as ConstructorParameters<typeof Lenis>[0]);

    /* Snap to nearest 100vh on scroll stop */
    let snapTimer: ReturnType<typeof setTimeout>;
    let isSnapping = false;
    lenis.on("scroll", () => {
      ScrollTrigger.update();
      if (isSnapping) return;
      clearTimeout(snapTimer);
      snapTimer = setTimeout(() => {
        const vh = window.innerHeight;
        const current = window.scrollY;
        const nearest = Math.round(current / vh) * vh;
        if (Math.abs(current - nearest) > 4) {
          isSnapping = true;
          lenis.scrollTo(nearest, {
            duration: 0.9,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            onComplete: () => { isSnapping = false; },
          });
        }
      }, 120);
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      clearTimeout(snapTimer);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const N_CARDS = 6;

  return (
    <main style={{ background: "#080808", fontFamily: SANS }}>

      {/* ══ DESKTOP NAV ══ */}
      <nav
        className="desktop-nav"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 40px",
          transition: "background 0.3s, backdrop-filter 0.3s",
          background: scrolled ? "rgba(8,8,8,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
        }}
      >
        <span style={{ color: "white", fontSize: 13, fontWeight: 400, letterSpacing: "0.22em", textTransform: "uppercase", flexShrink: 0 }}>
          NothingHide
        </span>

        <div style={{ background: "rgba(15,15,15,0.85)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderRadius: 9999, padding: "10px 4px", display: "flex", alignItems: "center", border: "1px solid rgba(255,255,255,0.07)" }}>
          {NAV_LINKS.map((link, i) => (
            <span key={link.name} style={{ display: "flex", alignItems: "center" }}>
              <a
                href={link.href}
                style={{ color: "rgba(255,255,255,0.82)", fontSize: 13.5, fontWeight: 400, textDecoration: "none", whiteSpace: "nowrap", padding: "3px 20px", letterSpacing: "0.01em", transition: "color 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.82)")}
              >
                {link.name}
              </a>
              {i < NAV_LINKS.length - 1 && (
                <span aria-hidden="true" style={{ color: "rgba(255,255,255,0.25)", fontSize: 5, lineHeight: 1, flexShrink: 0 }}>●</span>
              )}
            </span>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
          <button
            aria-label="Search"
            style={{ color: "rgba(255,255,255,0.8)", background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center" }}
          >
            <Search size={17} strokeWidth={1.6} />
          </button>
          <a
            href="#hero"
            style={{ background: "white", color: "#080808", borderRadius: 9999, padding: "9px 22px", fontSize: 13, fontWeight: 500, textDecoration: "none", letterSpacing: "0.01em", transition: "opacity 0.15s" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.88")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
          >
            Book a Call
          </a>
        </div>
      </nav>

      {/* ══ MOBILE NAV ══ */}
      <nav
        className="mobile-nav"
        style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "none", alignItems: "center", justifyContent: "space-between", padding: "18px 20px", background: scrolled ? "rgba(8,8,8,0.9)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", transition: "background 0.3s" }}
      >
        <span style={{ color: "white", fontSize: 14, fontWeight: 500, letterSpacing: "0.04em" }}>NothingHide</span>
        <button
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((v) => !v)}
          style={{ color: "white", background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}
        >
          {mobileMenuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 99, background: "rgba(5,5,5,0.97)", backdropFilter: "blur(20px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6 }}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: "white", fontSize: 28, fontWeight: 300, textDecoration: "none", letterSpacing: "0.02em", padding: "10px 0", fontFamily: COURIER }}
            >
              {link.name}
            </a>
          ))}
          <div style={{ marginTop: 32 }}>
            <a href="#hero" onClick={() => setMobileMenuOpen(false)} style={{ background: "white", color: "#080808", borderRadius: 9999, padding: "12px 32px", fontSize: 15, fontWeight: 500, textDecoration: "none" }}>Book a Call</a>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════
          PERSPECTIVE TRANSITION CONTAINER
          — Olivier Larose technique —
          4 sticky cards × 100vh = 400vh total scroll space.
          Each card "recedes" as the next one slides over it.
      ══════════════════════════════════════════════════════════ */}
      <div
        ref={perspContainerRef}
        style={{ position: "relative", height: `${N_CARDS * 100}vh`, willChange: "transform" }}
      >

        {/* ── CARD 0 · HERO ─────────────────────────────────── */}
        <PerspectiveCard i={0} total={N_CARDS} progress={perspProgress}>
          <section
            id="hero"
            style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", background: "#080808" }}
          >
            {/* Blur placeholder shown while hero image loads */}
            {!heroBgLoaded && (
              <div style={{ position: "absolute", inset: 0, background: "#0a0a0a", zIndex: 0 }} />
            )}
            <img
              src="/hero-bg.jpg"
              alt=""
              draggable={false}
              onLoad={() => setHeroBgLoaded(true)}
              style={{
                position: "absolute", inset: 0, width: "100%", height: "100%",
                objectFit: "cover", objectPosition: "center 30%",
                pointerEvents: "none", userSelect: "none",
                filter: heroBgLoaded ? "blur(0px)" : "blur(28px)",
                transform: heroBgLoaded ? "scale(1)" : "scale(1.08)",
                transition: "filter 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                willChange: "filter, transform",
              }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 22%, transparent 45%)", pointerEvents: "none", zIndex: 1 }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, rgba(4,4,4,0.96) 0%, rgba(4,4,4,0.7) 18%, rgba(4,4,4,0.1) 42%, transparent 60%)", pointerEvents: "none", zIndex: 1 }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(0,0,0,0.25) 0%, transparent 55%)", pointerEvents: "none", zIndex: 1 }} />

            {/* Trust badge */}
            <motion.div
              {...FADE_IN(0.5)}
              style={{
                position: "absolute",
                top: "clamp(80px, 14vh, 110px)",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 10,
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.18)",
                borderRadius: 9999,
                padding: "7px 16px",
                display: "flex",
                alignItems: "center",
                gap: 7,
                whiteSpace: "nowrap",
              }}
            >
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.85)", fontFamily: SANS, letterSpacing: "0.02em" }}>
                Real estate lead gen · Mumbai &amp; Delhi · 2026
              </span>
              <span style={{ fontSize: 14 }}>🏗️</span>
            </motion.div>

            {/* Hero content */}
            <div
              className="hero-content"
              style={{ position: "absolute", left: "clamp(28px, 6vw, 90px)", top: "50%", transform: "translateY(-50%)", marginTop: "16px", zIndex: 10, maxWidth: "min(600px, calc(100vw - 56px))" }}
            >
              <motion.div {...FADE_UP(0.08)} style={{ width: 42, height: 1, background: "rgba(255,255,255,0.4)", marginBottom: 20 }} />
              <motion.h1
                {...FADE_UP(0.2)}
                style={{ fontFamily: COURIER, fontSize: "clamp(34px, 4.8vw, 64px)", fontWeight: 400, color: "white", lineHeight: 1.08, letterSpacing: "-0.01em", margin: "0 0 clamp(14px, 2vh, 24px)" }}
              >
                20–30 qualified buyers.
                <br />
                Every single month.
              </motion.h1>
              <motion.p
                {...FADE_UP(0.38)}
                style={{ fontFamily: SANS, fontSize: "clamp(13px, 1.1vw, 15.5px)", fontWeight: 300, color: "rgba(255,255,255,0.62)", lineHeight: 1.8, margin: "0 0 clamp(22px, 3vh, 36px)", maxWidth: "min(380px, 82vw)" }}
              >
                We run Meta ads, build your landing page, and automate follow-ups on WhatsApp — so independent builders in Mumbai stop losing leads to bigger names.
              </motion.p>
              <motion.div
                {...FADE_UP(0.54)}
                style={{ display: "flex", alignItems: "center", gap: "clamp(12px, 2.5vw, 24px)", flexWrap: "wrap" }}
              >
                <button
                  style={{ fontFamily: SANS, background: "#0f0f0f", color: "white", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 9999, padding: "14px 36px", fontSize: 14, fontWeight: 500, cursor: "pointer", letterSpacing: "0.01em", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 8, transition: "border-color 0.2s, background 0.2s" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#1a1a1a"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.35)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#0f0f0f"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.2)"; }}
                >
                  Book a Free Call <ArrowRight size={14} />
                </button>
                <button
                  style={{ fontFamily: SANS, background: "transparent", color: "rgba(255,255,255,0.75)", border: "none", padding: "14px 0", fontSize: 14, fontWeight: 400, cursor: "pointer", display: "flex", alignItems: "center", gap: 9 }}
                >
                  <span style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.22)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Play size={12} fill="white" stroke="none" style={{ marginLeft: 2 }} />
                  </span>
                  See How It Works
                </button>
              </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
              className="scroll-indicator"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.4 }}
              style={{ position: "absolute", right: "clamp(24px, 4vw, 52px)", bottom: "clamp(36px, 5.5vh, 68px)", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}
            >
              <div style={{ width: 1, height: 40, background: "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.25) 100%)" }} />
              <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: SANS, writingMode: "vertical-lr", transform: "rotate(180deg)" }}>Scroll</span>
            </motion.div>
          </section>
        </PerspectiveCard>

        {/* ── CARD 2 · OUR PROMISE ──────────────────────────── */}
        <PerspectiveCard i={1} total={N_CARDS} progress={perspProgress}>
          <section
            id="the-offer"
            style={{ width: "100%", height: "100%", background: "#0a0a0a", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 40px", borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <FadeSection style={{ textAlign: "center", marginBottom: 52, maxWidth: 640 }}>
              <SectionLabel>The Offer</SectionLabel>
              <h2 style={{ fontFamily: COURIER, fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 400, color: "white", margin: "0 0 20px", lineHeight: 1.2 }}>
                You close deals.
                <br />
                We handle everything else.
              </h2>
              <p style={{ color: "rgba(255,255,255,0.48)", fontSize: 15, fontFamily: SANS, lineHeight: 1.8, margin: 0 }}>
                Meta ads · dedicated landing page · WhatsApp automation · CRM setup. One system, 20–30 qualified buyer inquiries every month. Miss targets? We refund our fee.
              </p>
            </FadeSection>
            <FadeSection>
              <AnimatedText
                text="Nothing to hide."
                textClassName="text-5xl font-normal"
                underlineDuration={1.8}
                underlinePath="M 0,10 Q 75,0 150,10 Q 225,20 300,10"
                underlineHoverPath="M 0,10 Q 75,20 150,10 Q 225,0 300,10"
                style={{ fontFamily: COURIER, color: "white" }}
              />
            </FadeSection>
          </section>
        </PerspectiveCard>

        {/* ── CARD 3 · PAIN ─────────────────────────────────── */}
        <PerspectiveCard i={2} total={N_CARDS} progress={perspProgress}>
          <section
            id="pain"
            style={{ position: "relative", width: "100%", height: "100%", background: "#0d0d0d", display: "flex", flexDirection: "column", justifyContent: "center", padding: "clamp(64px, 9vh, 96px) clamp(28px, 7vw, 100px)", overflow: "hidden" }}
          >
            {/* Floating paths background */}
            <FloatingPaths position={1} />
            <FloatingPaths position={-1} />

            {/* Label */}
            <FadeSection style={{ marginBottom: "clamp(18px, 2.5vh, 28px)" }}>
              <SectionLabel>Pain</SectionLabel>
            </FadeSection>

            {/* Headline — left-aligned, editorial */}
            <FadeSection style={{ marginBottom: "clamp(44px, 6.5vh, 72px)", maxWidth: 600 }}>
              <h2
                style={{
                  fontFamily: SANS,
                  fontSize: "clamp(20px, 2.6vw, 38px)",
                  fontWeight: 300,
                  color: "white",
                  lineHeight: 1.38,
                  margin: 0,
                  letterSpacing: "-0.01em",
                }}
              >
                Hoardings. Classifieds. Random broker calls.
                <br />
                And still —{" "}
                <span style={{ color: "rgba(255,255,255,0.4)", fontStyle: "italic" }}>unsold inventory.</span>
              </h2>
            </FadeSection>

            {/* Pain points — staggered diagonal rows echoing the path lines */}
            <div style={{ width: "100%", maxWidth: 760, position: "relative", zIndex: 1 }}>
              {PAIN_POINTS.map((p, i) => (
                <FadeSection key={i}>
                  <div style={{ height: 1, background: "rgba(255,255,255,0.07)" }} />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "clamp(16px, 4vw, 48px)",
                      padding: "clamp(18px, 2.8vh, 30px) 0",
                      paddingLeft: i === 0 ? 0 : i === 1 ? "clamp(24px, 5vw, 64px)" : "clamp(48px, 10vw, 128px)",
                      transition: "padding 0.4s ease",
                    }}
                  >
                    {/* Large ghost index */}
                    <span
                      style={{
                        fontFamily: COURIER,
                        fontSize: "clamp(36px, 4.5vw, 64px)",
                        fontWeight: 400,
                        color: "rgba(255,255,255,0.055)",
                        lineHeight: 1,
                        flexShrink: 0,
                        userSelect: "none",
                        letterSpacing: "-0.02em",
                        marginTop: 2,
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Content */}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 9 }}>
                        <span style={{ position: "relative", display: "inline-flex", width: 7, height: 7, flexShrink: 0 }}>
                          <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "rgba(239,68,68,0.45)", animation: "pain-ping 1.8s cubic-bezier(0,0,0.2,1) infinite" }} />
                          <span style={{ position: "relative", width: 7, height: 7, borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />
                        </span>
                        <span style={{ fontFamily: SANS, fontSize: "clamp(15px, 1.3vw, 20px)", fontWeight: 600, color: "white", lineHeight: 1.25 }}>
                          {p.stat}
                        </span>
                      </div>
                      <p style={{ fontFamily: SANS, fontSize: "clamp(11px, 0.85vw, 13.5px)", color: "rgba(255,255,255,0.32)", fontStyle: "italic", lineHeight: 1.65, margin: 0 }}>
                        {p.sub}
                      </p>
                    </div>
                  </div>
                </FadeSection>
              ))}
              <div style={{ height: 1, background: "rgba(255,255,255,0.07)" }} />
            </div>
          </section>
        </PerspectiveCard>

        {/* ── CARD 3 · OFFER / THE SYSTEM ──────────────────── */}
        <PerspectiveCard i={3} total={N_CARDS} progress={perspProgress}>
          <section
            id="offer"
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              background: "#0b0b0b",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "clamp(56px, 8vh, 88px) clamp(28px, 8vw, 120px)",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              overflow: "hidden",
            }}
          >
            {/* Top label + headline */}
            <div style={{ width: "100%", maxWidth: 860 }}>
              <FadeSection style={{ marginBottom: "clamp(12px, 1.8vh, 20px)" }}>
                <SectionLabel>What You Get</SectionLabel>
              </FadeSection>

              <FadeSection>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                    gap: 24,
                    marginBottom: "clamp(36px, 5vh, 56px)",
                    flexWrap: "wrap",
                  }}
                >
                  <h2
                    style={{
                      fontFamily: COURIER,
                      fontSize: "clamp(24px, 3.2vw, 48px)",
                      fontWeight: 400,
                      color: "white",
                      lineHeight: 1.12,
                      margin: 0,
                      maxWidth: 520,
                    }}
                  >
                    One complete system.
                    <br />
                    Zero guesswork.
                  </h2>
                  <p
                    style={{
                      fontFamily: SANS,
                      fontSize: "clamp(12px, 0.9vw, 14px)",
                      color: "rgba(255,255,255,0.35)",
                      lineHeight: 1.8,
                      margin: 0,
                      maxWidth: 260,
                      flexShrink: 0,
                    }}
                  >
                    Four pieces, built and managed for you. Client pays Meta directly — we handle everything else.
                  </p>
                </div>
              </FadeSection>

              {/* Wave-separated service rows */}
              {[
                {
                  num: "01",
                  name: "Meta Ads",
                  detail: "Facebook & Instagram campaigns targeting home buyers by location, income, and intent.",
                  tag: "Awareness → Leads",
                },
                {
                  num: "02",
                  name: "Landing Page",
                  detail: "A dedicated project page built to capture leads — fast, mobile-first, and conversion-tested.",
                  tag: "First impression",
                },
                {
                  num: "03",
                  name: "WhatsApp Bot",
                  detail: "Instant auto-reply the second a lead submits. Follows up at 24 h, 48 h, and 7 days automatically.",
                  tag: "Zero cold leads",
                },
                {
                  num: "04",
                  name: "CRM Setup",
                  detail: "A simple live dashboard — every lead, every status, every next action visible at a glance.",
                  tag: "Full visibility",
                },
              ].map((item, idx, arr) => (
                <FadeSection key={item.num}>
                  <WavePath
                    style={{ color: "rgba(255,255,255,0.12)", width: "100%" }}
                    className="mb-0"
                  />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "clamp(16px, 3vw, 48px)",
                      padding: "clamp(16px, 2.4vh, 26px) 0",
                      flexWrap: "wrap",
                    }}
                  >
                    {/* Index */}
                    <span
                      style={{
                        fontFamily: COURIER,
                        fontSize: "clamp(10px, 0.8vw, 12px)",
                        color: "rgba(255,255,255,0.18)",
                        letterSpacing: "0.12em",
                        flexShrink: 0,
                        userSelect: "none",
                        minWidth: 28,
                      }}
                    >
                      {item.num}
                    </span>

                    {/* Name */}
                    <span
                      style={{
                        fontFamily: COURIER,
                        fontSize: "clamp(18px, 2vw, 30px)",
                        fontWeight: 400,
                        color: "white",
                        letterSpacing: "-0.01em",
                        lineHeight: 1,
                        minWidth: "clamp(120px, 16vw, 200px)",
                        flexShrink: 0,
                      }}
                    >
                      {item.name}
                    </span>

                    {/* Detail */}
                    <span
                      style={{
                        fontFamily: SANS,
                        fontSize: "clamp(11px, 0.85vw, 13.5px)",
                        color: "rgba(255,255,255,0.38)",
                        lineHeight: 1.65,
                        flex: 1,
                        minWidth: 180,
                      }}
                    >
                      {item.detail}
                    </span>

                    {/* Tag pill */}
                    <span
                      style={{
                        fontFamily: SANS,
                        fontSize: "clamp(9px, 0.68vw, 10.5px)",
                        color: "rgba(255,255,255,0.35)",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: 9999,
                        padding: "4px 12px",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        flexShrink: 0,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.tag}
                    </span>
                  </div>
                  {idx === arr.length - 1 && (
                    <WavePath
                      style={{ color: "rgba(255,255,255,0.12)", width: "100%" }}
                      className="mb-0"
                    />
                  )}
                </FadeSection>
              ))}
            </div>
          </section>
        </PerspectiveCard>

        {/* ── CARD 4 · TEAM ─────────────────────────────────── */}
        <PerspectiveCard i={4} total={N_CARDS} progress={perspProgress}>
          <section
            id="team"
            style={{ width: "100%", height: "100%", background: "#090909", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px clamp(24px, 6vw, 80px)", borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <FadeSection style={{ textAlign: "center", marginBottom: 40, maxWidth: 580 }}>
              <SectionLabel>The Team</SectionLabel>
              <h2 style={{ fontFamily: COURIER, fontSize: "clamp(26px, 3vw, 44px)", fontWeight: 400, color: "white", margin: "0 auto 14px", lineHeight: 1.15 }}>
                Three roles. One system.
              </h2>
              <p style={{ color: "rgba(255,255,255,0.38)", fontSize: 14, fontFamily: SANS, margin: "0 auto", lineHeight: 1.75 }}>
                Founder, tech, and lead gen — every piece working together so your pipeline never runs dry.
              </p>
            </FadeSection>
            <FadeSection style={{ width: "100%" }}>
              <TeamShowcase />
            </FadeSection>
          </section>
        </PerspectiveCard>

        {/* ── CARD 5 · RESULTS ──────────────────────────────── */}
        <PerspectiveCard i={5} total={N_CARDS} progress={perspProgress}>
          <section
            id="results"
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              background: "#080808",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "clamp(48px, 7vh, 80px) clamp(24px, 6vw, 80px)",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              overflow: "hidden",
            }}
          >
            {/* Floating paths background */}
            <FloatingPaths position={0.6} />

            {/* Left column — copy */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: "clamp(40px, 8vw, 100px)",
                width: "100%",
                maxWidth: 1000,
                position: "relative",
                zIndex: 1,
              }}
              className="results-layout"
            >
              {/* Text side */}
              <div style={{ flex: "0 0 auto", maxWidth: 380 }}>
                <FadeSection style={{ marginBottom: "clamp(14px, 2vh, 20px)" }}>
                  <SectionLabel>Results</SectionLabel>
                </FadeSection>
                <FadeSection style={{ marginBottom: "clamp(12px, 1.8vh, 18px)" }}>
                  <h2
                    style={{
                      fontFamily: COURIER,
                      fontSize: "clamp(26px, 3vw, 44px)",
                      fontWeight: 400,
                      color: "white",
                      lineHeight: 1.15,
                      margin: 0,
                    }}
                  >
                    What to expect,
                    <br />
                    every month.
                  </h2>
                </FadeSection>
                <FadeSection style={{ marginBottom: "clamp(24px, 3.5vh, 36px)" }}>
                  <p
                    style={{
                      fontFamily: SANS,
                      fontSize: "clamp(13px, 1vw, 15px)",
                      color: "rgba(255,255,255,0.42)",
                      lineHeight: 1.8,
                      margin: 0,
                      maxWidth: 320,
                    }}
                  >
                    From day one, the system runs. Leads come in, WhatsApp handles follow-ups, and you get weekly reports. Miss targets — we refund.
                  </p>
                </FadeSection>

                {/* Stats row */}
                <FadeSection>
                  <div style={{ display: "flex", gap: "clamp(20px, 4vw, 40px)" }}>
                    {[
                      { n: "20–30", label: "buyer leads/month" },
                      { n: "7 days", label: "system goes live" },
                      { n: "100%", label: "fee refund guarantee" },
                    ].map((s) => (
                      <div key={s.n}>
                        <div
                          style={{
                            fontFamily: COURIER,
                            fontSize: "clamp(18px, 2vw, 28px)",
                            fontWeight: 400,
                            color: "white",
                            lineHeight: 1,
                            marginBottom: 5,
                          }}
                        >
                          {s.n}
                        </div>
                        <div
                          style={{
                            fontFamily: SANS,
                            fontSize: "clamp(9px, 0.7vw, 10.5px)",
                            color: "rgba(255,255,255,0.3)",
                            textTransform: "uppercase",
                            letterSpacing: "0.12em",
                          }}
                        >
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </FadeSection>
              </div>

              {/* Cards side */}
              <FadeSection style={{ flex: "0 0 auto" }}>
                <div className="results-cards-wrapper">
                  <DisplayCards cards={RESULTS_CARDS} />
                </div>
              </FadeSection>
            </div>
          </section>
        </PerspectiveCard>

      </div>
      {/* ── END PERSPECTIVE CONTAINER ─────────────────────────── */}

    </main>
  );
}
