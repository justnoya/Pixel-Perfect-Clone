import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import type { MotionValue, Transition } from "framer-motion";
import {
  Search,
  Menu,
  X,
  Eye,
  Shield,
  Sparkles,
  Lock,
  ChevronRight,
  Play,
  ArrowRight,
  Check,
  Star,
} from "lucide-react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";
import TeamShowcase from "@/components/ui/team-showcase";
import VariableProximity from "@/components/ui/variable-proximity";

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

const NAV_LINKS = ["Home", "Features", "Solutions", "Pricing", "Resources"];
const COURIER = "'Courier Prime', 'Courier New', Courier, monospace";
const SANS = "'Inter', 'Helvetica Neue', Arial, sans-serif";

/* ─── data ───────────────────────────────────────────────────── */
const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Connect your data",
    desc: "Plug in your existing tools and data sources. We handle the rest — zero friction, instant sync.",
  },
  {
    step: "02",
    title: "Get full clarity",
    desc: "Every decision, action, and outcome is logged, visible, and auditable — nothing hidden.",
  },
  {
    step: "03",
    title: "Build real trust",
    desc: "Share verified reports with your team, clients, and stakeholders with one click.",
  },
];

const FEATURES = [
  {
    icon: Eye,
    title: "Radical Transparency",
    desc: "Every data point is visible. Every action is logged. Your organization runs with complete clarity.",
  },
  {
    icon: Shield,
    title: "Verified Platform",
    desc: "Third-party audits, SOC 2 compliance, and open security reports. We prove trust, not just promise it.",
  },
  {
    icon: Sparkles,
    title: "Real-time Insights",
    desc: "Live dashboards that surface what matters most — no lag, no delay, no surprises.",
  },
  {
    icon: Lock,
    title: "Enterprise-Grade Security",
    desc: "End-to-end encryption, role-based access, and zero-trust architecture built in from day one.",
  },
  {
    icon: Check,
    title: "Accountability at Scale",
    desc: "Set policies, track compliance, and get automatic alerts when something needs attention.",
  },
  {
    icon: Star,
    title: "Trusted by 50,000+",
    desc: "From startups to Fortune 500s — teams that care about integrity choose NothingHide.",
  },
];

const PRICING = [
  {
    plan: "Starter",
    price: "$0",
    period: "/ month",
    desc: "For individuals and small teams getting started.",
    features: ["Up to 3 users", "5 data sources", "Basic audit log", "Email support"],
    cta: "Get started free",
    highlight: false,
  },
  {
    plan: "Pro",
    price: "$49",
    period: "/ month",
    desc: "For growing teams that need full visibility.",
    features: ["Up to 25 users", "Unlimited data sources", "Advanced analytics", "Priority support", "Custom reports"],
    cta: "Start free trial",
    highlight: true,
  },
  {
    plan: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For organizations that need the full platform.",
    features: ["Unlimited users", "Dedicated instance", "SSO & SAML", "SLA guarantee", "Onboarding support"],
    cta: "Contact sales",
    highlight: false,
  },
];

const PAIN_POINTS = [
  { stat: "Spending ₹10K–50K/month", sub: "with nothing to show" },
  { stat: "Leads come in cold", sub: "no follow-up system" },
  { stat: "Big builders get all the tech", sub: "you get left behind" },
];

const TESTIMONIALS = [
  {
    quote: "NothingHide transformed how our board interacts with company data. Full trust, finally.",
    name: "Sophia Laurent",
    role: "COO, Meridian Systems",
    rating: 5,
  },
  {
    quote: "We cut compliance prep from weeks to hours. The audit trail alone is worth every penny.",
    name: "James Okafor",
    role: "Head of Compliance, EchoLab",
    rating: 5,
  },
  {
    quote: "Our clients love the transparency reports. It's become a genuine competitive advantage.",
    name: "Priya Nair",
    role: "CEO, VisionFlow",
    rating: 5,
  },
];

/* ─── small components ───────────────────────────────────────── */
function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} fill="rgba(255,255,255,0.85)" stroke="none" />
      ))}
    </div>
  );
}

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

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      clearTimeout(snapTimer);
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
            <span key={link} style={{ display: "flex", alignItems: "center" }}>
              <a
                href="#"
                style={{ color: "rgba(255,255,255,0.82)", fontSize: 13.5, fontWeight: 400, textDecoration: "none", whiteSpace: "nowrap", padding: "3px 20px", letterSpacing: "0.01em", transition: "color 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.82)")}
              >
                {link}
              </a>
              {i < NAV_LINKS.length - 1 && (
                <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 5, lineHeight: 1, flexShrink: 0 }}>●</span>
              )}
            </span>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
          <button style={{ color: "rgba(255,255,255,0.8)", background: "none", border: "none", cursor: "pointer", fontSize: 13, fontFamily: "inherit", letterSpacing: "0.05em", display: "flex", alignItems: "center", gap: 4 }}>
            EN <span style={{ fontSize: 9, opacity: 0.7 }}>▾</span>
          </button>
          <button style={{ color: "rgba(255,255,255,0.8)", background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center" }}>
            <Search size={17} strokeWidth={1.6} />
          </button>
          <a
            href="#"
            style={{ background: "white", color: "#080808", borderRadius: 9999, padding: "9px 22px", fontSize: 13, fontWeight: 500, textDecoration: "none", letterSpacing: "0.01em", transition: "opacity 0.15s" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.88")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
          >
            Login
          </a>
        </div>
      </nav>

      {/* ══ MOBILE NAV ══ */}
      <nav
        className="mobile-nav"
        style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "none", alignItems: "center", justifyContent: "space-between", padding: "18px 20px", background: scrolled ? "rgba(8,8,8,0.9)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", transition: "background 0.3s" }}
      >
        <span style={{ color: "white", fontSize: 14, fontWeight: 500, letterSpacing: "0.04em" }}>NothingHide</span>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button style={{ color: "rgba(255,255,255,0.85)", background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}>
            <Search size={18} strokeWidth={1.6} />
          </button>
          <button onClick={() => setMobileMenuOpen((v) => !v)} style={{ color: "white", background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}>
            {mobileMenuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 99, background: "rgba(5,5,5,0.97)", backdropFilter: "blur(20px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6 }}>
          {NAV_LINKS.map((link) => (
            <a key={link} href="#" onClick={() => setMobileMenuOpen(false)} style={{ color: "white", fontSize: 28, fontWeight: 300, textDecoration: "none", letterSpacing: "0.02em", padding: "10px 0", fontFamily: COURIER }}>
              {link}
            </a>
          ))}
          <div style={{ marginTop: 32 }}>
            <a href="#" style={{ background: "white", color: "#080808", borderRadius: 9999, padding: "12px 32px", fontSize: 15, fontWeight: 500, textDecoration: "none" }}>Login</a>
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
        style={{ position: "relative", height: `${N_CARDS * 100}vh` }}
      >

        {/* ── CARD 0 · HERO ─────────────────────────────────── */}
        <PerspectiveCard i={0} total={N_CARDS} progress={perspProgress}>
          <section
            id="hero"
            style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", background: "#080808" }}
          >
            <img
              src="/hero-bg.jpg"
              alt=""
              draggable={false}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%", pointerEvents: "none", userSelect: "none" }}
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
                Trusted by 50,000+ users worldwide
              </span>
              <span style={{ fontSize: 14 }}>❤️</span>
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
                Nothing to hide.
                <br />
                Everything to trust.
              </motion.h1>
              <motion.p
                {...FADE_UP(0.38)}
                style={{ fontFamily: SANS, fontSize: "clamp(13px, 1.1vw, 15.5px)", fontWeight: 300, color: "rgba(255,255,255,0.62)", lineHeight: 1.8, margin: "0 0 clamp(22px, 3vh, 36px)", maxWidth: "min(380px, 82vw)" }}
              >
                A transparent platform built for clarity, accountability, and real trust. We believe honesty is the foundation of every great product.
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
                  Get Started <ArrowRight size={14} />
                </button>
                <button
                  style={{ fontFamily: SANS, background: "transparent", color: "rgba(255,255,255,0.75)", border: "none", padding: "14px 0", fontSize: 14, fontWeight: 400, cursor: "pointer", display: "flex", alignItems: "center", gap: 9 }}
                >
                  <span style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.22)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Play size={12} fill="white" stroke="none" style={{ marginLeft: 2 }} />
                  </span>
                  Watch Demo
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
        <PerspectiveCard i={2} total={N_CARDS} progress={perspProgress}>
          <section
            id="section-02"
            style={{ width: "100%", height: "100%", background: "#0a0a0a", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 40px", borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <FadeSection style={{ textAlign: "center", marginBottom: 52, maxWidth: 640 }}>
              <SectionLabel>Our Promise</SectionLabel>
              <h2 style={{ fontFamily: COURIER, fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 400, color: "white", margin: "0 0 20px", lineHeight: 1.2 }}>
                Honesty isn't a feature.
                <br />
                It's the whole product.
              </h2>
              <p style={{ color: "rgba(255,255,255,0.48)", fontSize: 15, fontFamily: SANS, lineHeight: 1.8, margin: 0 }}>
                We built NothingHide because we believe transparency shouldn't be optional — it should be the default.
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
        <PerspectiveCard i={3} total={N_CARDS} progress={perspProgress}>
          <section
            id="pain"
            style={{ position: "relative", width: "100%", height: "100%", background: "#0d0d0d", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px clamp(24px, 6vw, 80px)", overflow: "hidden" }}
          >
            {/* Floating paths background */}
            <FloatingPaths position={1} />
            <FloatingPaths position={-1} />
            {/* Label + Headline */}
            <FadeSection style={{ textAlign: "center", marginBottom: "clamp(40px, 6vh, 72px)", maxWidth: 780 }}>
              <SectionLabel>Pain</SectionLabel>
              <PainHeadline />
            </FadeSection>

            {/* Three pain-point columns */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                maxWidth: 860,
                width: "100%",
                borderTop: "1px solid rgba(255,255,255,0.09)",
                paddingTop: "clamp(28px, 4vh, 48px)",
              }}
            >
              {PAIN_POINTS.map((p, i) => (
                <FadeSection
                  key={i}
                  style={{
                    padding: "0 clamp(16px, 2.5vw, 36px)",
                    borderRight: i < PAIN_POINTS.length - 1 ? "1px solid rgba(255,255,255,0.09)" : "none",
                    paddingLeft: i === 0 ? 0 : undefined,
                    paddingRight: i === PAIN_POINTS.length - 1 ? 0 : undefined,
                  }}
                >
                  {/* pulse dot */}
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                    <span style={{ position: "relative", display: "inline-flex", width: 8, height: 8 }}>
                      <span style={{
                        position: "absolute", inset: 0, borderRadius: "50%",
                        background: "rgba(239,68,68,0.5)",
                        animation: "pain-ping 1.8s cubic-bezier(0,0,0.2,1) infinite",
                      }} />
                      <span style={{ position: "relative", width: 8, height: 8, borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />
                    </span>
                  </div>
                  <div style={{ fontFamily: SANS, fontSize: "clamp(14px, 1.15vw, 17px)", fontWeight: 600, color: "white", lineHeight: 1.3, marginBottom: 8 }}>
                    {p.stat}
                  </div>
                  <div style={{ fontFamily: SANS, fontSize: "clamp(12px, 0.85vw, 13.5px)", color: "rgba(255,255,255,0.38)", fontStyle: "italic", lineHeight: 1.6 }}>
                    {p.sub}
                  </div>
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
              <SectionLabel>Team</SectionLabel>
              <h2 style={{ fontFamily: COURIER, fontSize: "clamp(26px, 3vw, 44px)", fontWeight: 400, color: "white", margin: "0 auto 14px", lineHeight: 1.15 }}>
                The people behind the platform
              </h2>
              <p style={{ color: "rgba(255,255,255,0.38)", fontSize: 14, fontFamily: SANS, margin: "0 auto", lineHeight: 1.75 }}>
                A focused team obsessed with transparency, trust, and real results.
              </p>
            </FadeSection>
            <FadeSection style={{ width: "100%" }}>
              <TeamShowcase />
            </FadeSection>
          </section>
        </PerspectiveCard>

        {/* ── CARD 5 · FEATURES (last — no scale transform) ─── */}
        <PerspectiveCard i={5} total={N_CARDS} progress={perspProgress}>
          <section
            id="features"
            style={{ width: "100%", height: "100%", background: "#0a0a0a", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px clamp(24px, 6vw, 80px)", borderTop: "1px solid rgba(255,255,255,0.05)" }}
          >
            <FadeSection style={{ textAlign: "center", marginBottom: 40 }}>
              <SectionLabel>Features</SectionLabel>
              <h2 style={{ fontFamily: COURIER, fontSize: "clamp(26px, 3vw, 44px)", fontWeight: 400, color: "white", margin: "0 auto 12px", lineHeight: 1.15, maxWidth: 560 }}>
                Everything you need to build trust
              </h2>
              <p style={{ color: "rgba(255,255,255,0.42)", fontSize: 14, fontFamily: SANS, maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
                One platform, total transparency. From compliance to culture.
              </p>
            </FadeSection>

            <div
              className="features-grid"
              style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, maxWidth: 1060, width: "100%", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, overflow: "hidden" }}
            >
              {FEATURES.map((f, i) => {
                const Icon = f.icon;
                return (
                  <FadeSection
                    key={f.title}
                    style={{
                      padding: "clamp(18px, 2.4vw, 32px)",
                      background: "#0f0f0f",
                      borderRight: i % 3 < 2 ? "1px solid rgba(255,255,255,0.06)" : "none",
                      borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none",
                    }}
                  >
                    <div style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                      <Icon size={16} color="rgba(255,255,255,0.65)" strokeWidth={1.5} />
                    </div>
                    <h3 style={{ fontFamily: SANS, fontSize: "clamp(13px, 1vw, 15px)", fontWeight: 500, color: "white", margin: "0 0 8px" }}>
                      {f.title}
                    </h3>
                    <p style={{ fontFamily: SANS, fontSize: "clamp(12px, 0.8vw, 13px)", color: "rgba(255,255,255,0.42)", lineHeight: 1.7, margin: 0 }}>
                      {f.desc}
                    </p>
                  </FadeSection>
                );
              })}
            </div>
          </section>
        </PerspectiveCard>

      </div>
      {/* ── END PERSPECTIVE CONTAINER ─────────────────────────── */}


      {/* ══════════════════════════════════════════ */}
      {/* PRICING                                   */}
      {/* ══════════════════════════════════════════ */}
      <section id="pricing" style={{ width: "100%", padding: "clamp(64px, 10vh, 120px) clamp(24px, 6vw, 80px)", background: "#080808", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <FadeSection style={{ textAlign: "center", marginBottom: 64 }}>
          <SectionLabel>Pricing</SectionLabel>
          <h2 style={{ fontFamily: COURIER, fontSize: "clamp(28px, 3.5vw, 50px)", fontWeight: 400, color: "white", margin: "0 auto 16px", lineHeight: 1.15, maxWidth: 560 }}>
            Simple, transparent pricing
          </h2>
          <p style={{ color: "rgba(255,255,255,0.42)", fontSize: 15, fontFamily: SANS, maxWidth: 440, margin: "0 auto", lineHeight: 1.75 }}>
            No hidden fees. No surprises. Just the plan that fits your team.
          </p>
        </FadeSection>

        <div className="pricing-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, maxWidth: 1060, margin: "0 auto" }}>
          {PRICING.map((p) => (
            <FadeSection
              key={p.plan}
              style={{ background: p.highlight ? "white" : "#0f0f0f", border: p.highlight ? "none" : "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "clamp(24px, 3vw, 40px)", display: "flex", flexDirection: "column" }}
            >
              <div style={{ marginBottom: 28 }}>
                <div style={{ fontFamily: SANS, fontSize: 12, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: p.highlight ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.4)", marginBottom: 14 }}>{p.plan}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 10 }}>
                  <span style={{ fontFamily: COURIER, fontSize: "clamp(32px, 3.5vw, 46px)", fontWeight: 400, color: p.highlight ? "#080808" : "white" }}>{p.price}</span>
                  <span style={{ fontFamily: SANS, fontSize: 14, color: p.highlight ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.35)" }}>{p.period}</span>
                </div>
                <p style={{ fontFamily: SANS, fontSize: 13.5, color: p.highlight ? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.42)", lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", display: "flex", flexDirection: "column", gap: 10 }}>
                {p.features.map((feat) => (
                  <li key={feat} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Check size={14} color={p.highlight ? "#080808" : "rgba(255,255,255,0.55)"} strokeWidth={2.5} />
                    <span style={{ fontFamily: SANS, fontSize: 13.5, color: p.highlight ? "rgba(0,0,0,0.72)" : "rgba(255,255,255,0.6)" }}>{feat}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#"
                style={{ marginTop: "auto", textAlign: "center", background: p.highlight ? "#080808" : "transparent", color: p.highlight ? "white" : "rgba(255,255,255,0.72)", border: p.highlight ? "none" : "1px solid rgba(255,255,255,0.15)", borderRadius: 9999, padding: "13px 24px", fontSize: 14, fontWeight: 500, textDecoration: "none", fontFamily: SANS, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, transition: "opacity 0.15s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.82")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
              >
                {p.cta} <ArrowRight size={13} />
              </a>
            </FadeSection>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════ */}
      {/* TESTIMONIALS                              */}
      {/* ══════════════════════════════════════════ */}
      <section id="testimonials" style={{ width: "100%", padding: "clamp(64px, 10vh, 120px) clamp(24px, 6vw, 80px)", background: "#0a0a0a", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <FadeSection style={{ textAlign: "center", marginBottom: 64 }}>
          <SectionLabel>Testimonials</SectionLabel>
          <h2 style={{ fontFamily: COURIER, fontSize: "clamp(28px, 3.5vw, 50px)", fontWeight: 400, color: "white", margin: "0 auto", lineHeight: 1.15, maxWidth: 540 }}>
            Trusted by teams who care
          </h2>
        </FadeSection>

        <div className="testimonials-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, maxWidth: 1060, margin: "0 auto" }}>
          {TESTIMONIALS.map((t) => (
            <FadeSection
              key={t.name}
              style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "clamp(24px, 3vw, 40px)" }}
            >
              <StarRating count={t.rating} />
              <p style={{ fontFamily: SANS, fontSize: "clamp(13.5px, 1vw, 15.5px)", color: "rgba(255,255,255,0.72)", lineHeight: 1.8, margin: "20px 0 24px", fontStyle: "italic" }}>
                "{t.quote}"
              </p>
              <div>
                <div style={{ fontFamily: SANS, fontSize: 14, fontWeight: 500, color: "white" }}>{t.name}</div>
                <div style={{ fontFamily: SANS, fontSize: 12.5, color: "rgba(255,255,255,0.38)", marginTop: 3 }}>{t.role}</div>
              </div>
            </FadeSection>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════ */}
      {/* CTA                                       */}
      {/* ══════════════════════════════════════════ */}
      <section style={{ width: "100%", padding: "clamp(80px, 14vh, 140px) clamp(24px, 6vw, 80px)", background: "#080808", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <FadeSection style={{ textAlign: "center", maxWidth: 680, margin: "0 auto" }}>
          <SectionLabel>Get Started</SectionLabel>
          <h2 style={{ fontFamily: COURIER, fontSize: "clamp(32px, 4.5vw, 62px)", fontWeight: 400, color: "white", margin: "0 0 20px", lineHeight: 1.1 }}>
            Ready to build real trust?
          </h2>
          <p style={{ fontFamily: SANS, fontSize: 15, color: "rgba(255,255,255,0.48)", lineHeight: 1.8, marginBottom: 40 }}>
            Join 50,000+ teams that chose honesty as their default setting. No credit card required.
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <a
              href="#"
              style={{ background: "white", color: "#080808", borderRadius: 9999, padding: "16px 40px", fontSize: 15, fontWeight: 500, textDecoration: "none", fontFamily: SANS, display: "flex", alignItems: "center", gap: 8, transition: "opacity 0.15s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.88")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
            >
              Start for free <ArrowRight size={15} />
            </a>
            <a
              href="#"
              style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, fontFamily: SANS, textDecoration: "none", display: "flex", alignItems: "center", gap: 6, transition: "color 0.15s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.9)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.6)")}
            >
              Talk to sales <ChevronRight size={14} />
            </a>
          </div>
        </FadeSection>
      </section>

      {/* ══════════════════════════════════════════ */}
      {/* FOOTER                                    */}
      {/* ══════════════════════════════════════════ */}
      <footer style={{ width: "100%", padding: "48px clamp(24px, 6vw, 80px) 40px", background: "#050505", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 56 }}>
            <div>
              <span style={{ color: "white", fontSize: 13, fontWeight: 400, letterSpacing: "0.22em", textTransform: "uppercase", display: "block", marginBottom: 16 }}>NothingHide</span>
              <p style={{ fontFamily: SANS, fontSize: 13.5, color: "rgba(255,255,255,0.38)", lineHeight: 1.75, margin: "0 0 20px", maxWidth: 260 }}>
                A transparent platform built for clarity, accountability, and real trust.
              </p>
            </div>
            {[
              { title: "Product", links: ["Features", "Pricing", "Security", "Changelog"] },
              { title: "Company", links: ["About", "Blog", "Careers", "Press"] },
              { title: "Legal", links: ["Privacy", "Terms", "Security", "Cookies"] },
            ].map((col) => (
              <div key={col.title}>
                <div style={{ fontFamily: SANS, fontSize: 11, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 16 }}>{col.title}</div>
                {col.links.map((l) => (
                  <a
                    key={l}
                    href="#"
                    style={{ display: "block", fontFamily: SANS, fontSize: 13.5, color: "rgba(255,255,255,0.45)", textDecoration: "none", marginBottom: 10, transition: "color 0.15s" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.8)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.45)")}
                  >{l}</a>
                ))}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.06)", flexWrap: "wrap", gap: 12 }}>
            <span style={{ fontFamily: SANS, fontSize: 12.5, color: "rgba(255,255,255,0.25)" }}>
              © 2026 NothingHide. All rights reserved.
            </span>
            <span style={{ fontFamily: SANS, fontSize: 12.5, color: "rgba(255,255,255,0.25)" }}>
              Nothing to hide.
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
