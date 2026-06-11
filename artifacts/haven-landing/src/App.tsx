import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Transition } from "framer-motion";
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
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";

gsap.registerPlugin(ScrollTrigger);

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

const HERO_FEATURES = [
  { icon: Eye, label: "Full Visibility", desc: "See everything that matters." },
  { icon: Shield, label: "Built for Trust", desc: "Verified, secure and always reliable." },
  { icon: Sparkles, label: "Total Transparency", desc: "No hidden data. No fine print." },
  { icon: Lock, label: "Enterprise Security", desc: "Industry-grade security to protect you." },
];

const TRUSTED_LOGOS = [
  "Acme Corp", "EchoLab", "Cloudify", "VisionFlow", "HexaTech", "Meridian",
];

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

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {Array.from({ length: count }).map((_, i) => (
        <Star
          key={i}
          size={14}
          fill="rgba(255,255,255,0.85)"
          stroke="none"
        />
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
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const blankSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!blankSectionRef.current) return;
      gsap.fromTo(
        blankSectionRef.current,
        { borderTopColor: "rgba(255,255,255,0)" },
        {
          borderTopColor: "rgba(255,255,255,0.10)",
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: blankSectionRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

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
          zIndex: 50,
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
              <a href="#" style={{ color: "rgba(255,255,255,0.82)", fontSize: 13.5, fontWeight: 400, textDecoration: "none", whiteSpace: "nowrap", padding: "3px 20px", letterSpacing: "0.01em", transition: "color 0.15s" }}
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
          <a href="#" style={{ background: "white", color: "#080808", borderRadius: 9999, padding: "9px 22px", fontSize: 13, fontWeight: 500, textDecoration: "none", letterSpacing: "0.01em", transition: "opacity 0.15s" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.88")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
          >
            Login
          </a>
        </div>
      </nav>

      {/* ══ MOBILE NAV ══ */}
      <nav className="mobile-nav" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, display: "none", alignItems: "center", justifyContent: "space-between", padding: "18px 20px", background: scrolled ? "rgba(8,8,8,0.9)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", transition: "background 0.3s" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/logo.png" alt="NothingHide" style={{ width: 28, height: 28, objectFit: "contain" }} />
          <span style={{ color: "white", fontSize: 14, fontWeight: 500, letterSpacing: "0.04em" }}>NothingHide</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button style={{ color: "rgba(255,255,255,0.85)", background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}>
            <Search size={18} strokeWidth={1.6} />
          </button>
          <button onClick={() => setMobileMenuOpen((v) => !v)} style={{ color: "white", background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}>
            {mobileMenuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </div>
      </nav>

      {/* ══ MOBILE MENU ══ */}
      {mobileMenuOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 40, background: "rgba(5,5,5,0.97)", backdropFilter: "blur(20px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6 }}>
          {NAV_LINKS.map((link) => (
            <a key={link} href="#" onClick={() => setMobileMenuOpen(false)} style={{ color: "white", fontSize: 28, fontWeight: 300, textDecoration: "none", letterSpacing: "0.02em", padding: "10px 0", fontFamily: COURIER }}>
              {link}
            </a>
          ))}
          <div style={{ marginTop: 32, display: "flex", gap: 16 }}>
            <a href="#" style={{ background: "white", color: "#080808", borderRadius: 9999, padding: "12px 32px", fontSize: 15, fontWeight: 500, textDecoration: "none" }}>Login</a>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════ */}
      {/* HERO SECTION                               */}
      {/* ══════════════════════════════════════════ */}
      <section id="hero" style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden", minHeight: 600 }}>
        <img src="/hero-bg.jpg" alt="" draggable={false} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%", pointerEvents: "none", userSelect: "none" }} />

        {/* Gradients */}
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
          style={{
            position: "absolute",
            left: "clamp(28px, 6vw, 90px)",
            top: "50%",
            transform: "translateY(-50%)",
            marginTop: "16px",
            zIndex: 10,
            maxWidth: "min(600px, calc(100vw - 56px))",
          }}
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

        {/* Bottom feature strip */}
        <motion.div
          {...FADE_UP(0.75)}
          className="hero-features"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 10,
            display: "flex",
            alignItems: "stretch",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(8,8,8,0.55)",
            backdropFilter: "blur(18px)",
          }}
        >
          {HERO_FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={f.label}
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "20px 28px",
                  borderRight: i < HERO_FEATURES.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
                }}
              >
                <Icon size={18} color="rgba(255,255,255,0.55)" strokeWidth={1.5} style={{ flexShrink: 0 }} />
                <div>
                  <div style={{ color: "rgba(255,255,255,0.88)", fontSize: 13, fontWeight: 500, marginBottom: 2, fontFamily: SANS }}>
                    {f.label}
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.42)", fontSize: 12, fontFamily: SANS, lineHeight: 1.4 }}>
                    {f.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.2 }}
          style={{ position: "absolute", right: "clamp(24px, 4vw, 52px)", bottom: "clamp(100px, 16vh, 130px)", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}
        >
          <div style={{ width: 1, height: 40, background: "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.25) 100%)" }} />
          <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: SANS, writingMode: "vertical-lr", transform: "rotate(180deg)" }}>Scroll</span>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════ */}
      {/* TRUSTED BY LOGOS                          */}
      {/* ══════════════════════════════════════════ */}
      <section style={{ width: "100%", padding: "56px 40px", background: "#080808", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <FadeSection>
          <p style={{ textAlign: "center", color: "rgba(255,255,255,0.28)", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", fontFamily: SANS, marginBottom: 36 }}>
            Trusted by companies you know
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "clamp(28px, 5vw, 72px)", flexWrap: "wrap" }}>
            {TRUSTED_LOGOS.map((logo) => (
              <span
                key={logo}
                style={{ color: "rgba(255,255,255,0.3)", fontSize: 14, fontWeight: 500, letterSpacing: "0.06em", fontFamily: SANS, transition: "color 0.2s", cursor: "default" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLSpanElement).style.color = "rgba(255,255,255,0.65)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLSpanElement).style.color = "rgba(255,255,255,0.3)")}
              >
                {logo}
              </span>
            ))}
          </div>
        </FadeSection>
      </section>

      {/* ══════════════════════════════════════════ */}
      {/* ANIMATED TEXT SECTION                     */}
      {/* ══════════════════════════════════════════ */}
      <section
        ref={blankSectionRef}
        id="section-02"
        style={{ width: "100%", minHeight: "70vh", background: "#0a0a0a", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 40px", borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <FadeSection style={{ textAlign: "center", marginBottom: 64, maxWidth: 640 }}>
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
        <AnimatedText
          text="Nothing to hide."
          textClassName="text-5xl font-normal"
          underlineDuration={1.8}
          underlinePath="M 0,10 Q 75,0 150,10 Q 225,20 300,10"
          underlineHoverPath="M 0,10 Q 75,20 150,10 Q 225,0 300,10"
          style={{ fontFamily: COURIER, color: "white" }}
        />
      </section>

      {/* ══════════════════════════════════════════ */}
      {/* HOW IT WORKS                              */}
      {/* ══════════════════════════════════════════ */}
      <section id="how-it-works" style={{ width: "100%", padding: "clamp(64px, 10vh, 120px) clamp(24px, 6vw, 80px)", background: "#080808" }}>
        <FadeSection style={{ textAlign: "center", marginBottom: 72 }}>
          <SectionLabel>How It Works</SectionLabel>
          <h2 style={{ fontFamily: COURIER, fontSize: "clamp(28px, 3.5vw, 50px)", fontWeight: 400, color: "white", margin: "0 auto", lineHeight: 1.15, maxWidth: 600 }}>
            Clarity in three simple steps
          </h2>
        </FadeSection>

        <div className="how-it-works-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, maxWidth: 1100, margin: "0 auto", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, overflow: "hidden" }}>
          {HOW_IT_WORKS.map((item, i) => (
            <FadeSection key={item.step} style={{ padding: "clamp(28px, 4vw, 52px)", background: "#0c0c0c", borderRight: i < HOW_IT_WORKS.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none", position: "relative" }}>
              <div style={{ fontFamily: COURIER, fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 400, color: "rgba(255,255,255,0.06)", lineHeight: 1, marginBottom: 24 }}>
                {item.step}
              </div>
              <h3 style={{ fontFamily: SANS, fontSize: "clamp(15px, 1.2vw, 18px)", fontWeight: 500, color: "white", margin: "0 0 14px" }}>
                {item.title}
              </h3>
              <p style={{ fontFamily: SANS, fontSize: "clamp(13px, 0.9vw, 14.5px)", color: "rgba(255,255,255,0.45)", lineHeight: 1.75, margin: 0 }}>
                {item.desc}
              </p>
              <div style={{ marginTop: 32 }}>
                <ChevronRight size={16} color="rgba(255,255,255,0.25)" />
              </div>
            </FadeSection>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════ */}
      {/* FEATURES GRID                             */}
      {/* ══════════════════════════════════════════ */}
      <section id="features" style={{ width: "100%", padding: "clamp(64px, 10vh, 120px) clamp(24px, 6vw, 80px)", background: "#0a0a0a", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <FadeSection style={{ textAlign: "center", marginBottom: 64 }}>
          <SectionLabel>Features</SectionLabel>
          <h2 style={{ fontFamily: COURIER, fontSize: "clamp(28px, 3.5vw, 50px)", fontWeight: 400, color: "white", margin: "0 auto 16px", lineHeight: 1.15, maxWidth: 600 }}>
            Everything you need to build trust
          </h2>
          <p style={{ color: "rgba(255,255,255,0.42)", fontSize: 15, fontFamily: SANS, maxWidth: 500, margin: "0 auto", lineHeight: 1.75 }}>
            One platform, total transparency. From compliance to culture.
          </p>
        </FadeSection>

        <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, maxWidth: 1100, margin: "0 auto", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, overflow: "hidden" }}>
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <FadeSection
                key={f.title}
                style={{
                  padding: "clamp(24px, 3vw, 44px)",
                  background: "#0c0c0c",
                  borderRight: i % 3 < 2 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  transition: "background 0.2s",
                }}
              >
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                  <Icon size={18} color="rgba(255,255,255,0.65)" strokeWidth={1.5} />
                </div>
                <h3 style={{ fontFamily: SANS, fontSize: "clamp(14px, 1.1vw, 16px)", fontWeight: 500, color: "white", margin: "0 0 10px" }}>
                  {f.title}
                </h3>
                <p style={{ fontFamily: SANS, fontSize: "clamp(12.5px, 0.85vw, 14px)", color: "rgba(255,255,255,0.42)", lineHeight: 1.75, margin: 0 }}>
                  {f.desc}
                </p>
              </FadeSection>
            );
          })}
        </div>
      </section>

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
              style={{
                background: p.highlight ? "white" : "#0f0f0f",
                border: p.highlight ? "none" : "1px solid rgba(255,255,255,0.08)",
                borderRadius: 16,
                padding: "clamp(24px, 3vw, 40px)",
                display: "flex",
                flexDirection: "column",
              }}
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
      {/* CTA SECTION                               */}
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
            <a href="#" style={{ background: "white", color: "#080808", borderRadius: 9999, padding: "16px 40px", fontSize: 15, fontWeight: 500, textDecoration: "none", fontFamily: SANS, display: "flex", alignItems: "center", gap: 8, transition: "opacity 0.15s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.88")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
            >
              Start for free <ArrowRight size={15} />
            </a>
            <a href="#" style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, fontFamily: SANS, textDecoration: "none", display: "flex", alignItems: "center", gap: 6, transition: "color 0.15s" }}
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
                  <a key={l} href="#" style={{ display: "block", fontFamily: SANS, fontSize: 13.5, color: "rgba(255,255,255,0.45)", textDecoration: "none", marginBottom: 10, transition: "color 0.15s" }}
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
