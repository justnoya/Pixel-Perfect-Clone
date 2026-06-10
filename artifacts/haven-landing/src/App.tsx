import { useState, useRef, useCallback } from "react";
import {
  motion, AnimatePresence,
  useMotionValue, useSpring, useTransform,
} from "framer-motion";
import {
  Play, ChevronDown, ArrowRight, Menu, X,
  Cloud, Boxes, Zap, Globe, Server,
} from "lucide-react";

const NAV_LINKS = [
  { label: "Home" },
  { label: "Features" },
  { label: "Solutions" },
  { label: "Pricing" },
  { label: "Resources", hasDropdown: true },
];

const COMPANIES = [
  { icon: Cloud,  label: "Acme Corp" },
  { icon: Boxes,  label: "EchoLab" },
  { icon: Globe,  label: "Cloudify" },
  { icon: Zap,    label: "VisionFlow" },
  { icon: Server, label: "HexaTech" },
];

const inter = "'Inter', sans-serif";
const SPRING = { stiffness: 38, damping: 26 };

/* ── Word-reveal component ── */
const LINE1 = ["Nothing", "to", "hide."];
const LINE2 = ["Everything", "to", "trust."];

function WordReveal({ words, baseDelay }: { words: string[]; baseDelay: number }) {
  return (
    <span style={{ display: "block" }}>
      {words.map((word, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", marginRight: i < words.length - 1 ? "0.28em" : 0 }}>
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "105%", opacity: 0, filter: "blur(6px)" }}
            animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1], delay: baseDelay + i * 0.1 }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ── Magnetic button ── */
function MagneticBtn({ children, style, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 18 });
  const springY = useSpring(y, { stiffness: 200, damping: 18 });
  const [shimmer, setShimmer] = useState(false);

  const onMove = useCallback((e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.28);
    y.set((e.clientY - r.top - r.height / 2) * 0.28);
  }, [x, y]);

  const onLeave = useCallback(() => {
    x.set(0); y.set(0); setShimmer(false);
  }, [x, y]);

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY, position: "relative", overflow: "hidden", ...style as any }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onMouseEnter={() => setShimmer(true)}
      {...rest as any}
    >
      {/* shimmer sweep */}
      <AnimatePresence>
        {shimmer && (
          <motion.span
            key="shimmer"
            initial={{ x: "-120%", skewX: -12 }}
            animate={{ x: "220%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
            style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.22) 50%, transparent 100%)", pointerEvents: "none" }}
          />
        )}
      </AnimatePresence>
      {children}
    </motion.button>
  );
}

/* ── Logo ── */
function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9, flexShrink: 0 }}>
      <motion.div
        whileHover={{ rotate: [0, -8, 8, 0], transition: { duration: 0.5 } }}
        style={{ width: 34, height: 34, borderRadius: 9, background: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, cursor: "pointer" }}
      >
        <img src="/logo.png" alt="NothingHide" style={{ width: 26, height: 26, objectFit: "contain", display: "block" }} />
      </motion.div>
      <span style={{ fontFamily: inter, fontWeight: 640, fontSize: 15, color: "#0f172a", letterSpacing: "-0.02em" }}>NothingHide</span>
    </div>
  );
}

/* ══════════════════════════════════ */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  /* mouse parallax */
  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);
  const bgX = useTransform(useSpring(rawX, SPRING), [0, 1], ["2.5%", "-2.5%"]);
  const bgY = useTransform(useSpring(rawY, SPRING), [0, 1], ["2.5%", "-2.5%"]);

  /* cursor glow */
  const cursorX = useMotionValue(-400);
  const cursorY = useMotionValue(-400);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    rawX.set((e.clientX - left) / width);
    rawY.set((e.clientY - top) / height);
    cursorX.set(e.clientX - left - 200);
    cursorY.set(e.clientY - top - 200);
  }, [rawX, rawY, cursorX, cursorY]);

  return (
    <div
      onMouseMove={handleMouseMove}
      style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}
    >
      {/* ── Background (parallax) ── */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0 }}>
        <motion.img
          src="/hero-bg.jpg" alt="" draggable={false}
          className="hero-bg"
          style={{ position: "absolute", top: "-5%", left: "-5%", width: "110%", height: "110%", objectFit: "cover", userSelect: "none", pointerEvents: "none", x: bgX, y: bgY }}
        />
      </div>

      {/* ── Mobile sky fix overlay (green gradient masks pale sky on portrait) ── */}
      <div className="mobile-sky-fix" />

      {/* ── Ambient orbs ── */}
      <div className="orb orb1" style={{ zIndex: 1 }} />
      <div className="orb orb2" style={{ zIndex: 1 }} />
      <div className="orb orb3" style={{ zIndex: 1 }} />

      {/* ── Cursor glow ── */}
      <motion.div
        style={{ position: "absolute", zIndex: 2, pointerEvents: "none", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.13) 0%, transparent 70%)", x: cursorX, y: cursorY }}
      />

      {/* ══ NAVBAR ══ */}
      <div style={{ position: "fixed", top: 12, left: 0, right: 0, zIndex: 50, display: "flex", justifyContent: "center", padding: "0 12px" }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: "100%", maxWidth: 800 }}
        >
          {/* Desktop pill */}
          <nav className="nav-desk" style={{ alignItems: "center", background: "rgba(255,255,255,0.96)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderRadius: 9999, boxShadow: "0 2px 28px rgba(0,0,0,0.1)", border: "1px solid rgba(255,255,255,0.7)", padding: "6px 8px", width: "100%" }}>
            <div style={{ paddingLeft: 6, paddingRight: 8, flexShrink: 0 }}><Logo /></div>
            <div style={{ width: 1, height: 17, background: "rgba(0,0,0,0.1)", margin: "0 4px", flexShrink: 0 }} />
            <ul style={{ display: "flex", alignItems: "center", flex: 1, justifyContent: "center", listStyle: "none", margin: 0, padding: 0 }}>
              {NAV_LINKS.map(({ label, hasDropdown }, i) => (
                <motion.li key={label}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <motion.a href="#"
                    whileHover={{ scale: 1.04 }}
                    style={{ fontFamily: inter, display: "flex", alignItems: "center", gap: 3, padding: "6px 11px", borderRadius: 9999, fontSize: 13, fontWeight: 440, color: "#0f172a", textDecoration: "none", whiteSpace: "nowrap" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "rgba(0,0,0,0.045)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                  >
                    {label}
                    {hasDropdown && (
                      <motion.span whileHover={{ rotate: 180 }} transition={{ duration: 0.25 }}>
                        <ChevronDown size={11} strokeWidth={2} style={{ opacity: 0.4 }} />
                      </motion.span>
                    )}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
            <motion.button
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.05, background: "#1e293b" } as any}
              whileTap={{ scale: 0.96 }}
              style={{ fontFamily: inter, marginLeft: 6, padding: "8px 20px", borderRadius: 9999, fontSize: 13, fontWeight: 560, color: "#fff", background: "#0f172a", border: "none", cursor: "pointer", flexShrink: 0, whiteSpace: "nowrap" }}
            >
              Login
            </motion.button>
          </nav>

          {/* Mobile pill */}
          <nav className="nav-mob" style={{ alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.96)", backdropFilter: "blur(12px)", borderRadius: 9999, boxShadow: "0 2px 24px rgba(0,0,0,0.11)", padding: "10px 16px", width: "100%" }}>
            <Logo />
            <button onClick={() => setMenuOpen(v => !v)} style={{ background: "none", border: "none", cursor: "pointer", color: "#0f172a", padding: 4 }}>
              <AnimatePresence mode="wait">
                <motion.span key={menuOpen ? "x" : "m"} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }} style={{ display: "flex" }}>
                  {menuOpen ? <X size={18} /> : <Menu size={18} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </nav>

          <AnimatePresence>
            {menuOpen && (
              <motion.div initial={{ opacity: 0, y: -10, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.97 }} transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                style={{ marginTop: 8, background: "rgba(255,255,255,0.97)", backdropFilter: "blur(12px)", borderRadius: 16, boxShadow: "0 8px 36px rgba(0,0,0,0.14)", padding: "12px", display: "flex", flexDirection: "column", gap: 2 }}>
                {NAV_LINKS.map(({ label }, i) => (
                  <motion.a key={label} href="#" onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.2 }}
                    style={{ fontFamily: inter, padding: "9px 12px", borderRadius: 12, fontSize: 14, fontWeight: 440, color: "#0f172a", textDecoration: "none", display: "block" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "rgba(0,0,0,0.04)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                  >
                    {label}
                  </motion.a>
                ))}
                <motion.button whileTap={{ scale: 0.95 }} style={{ fontFamily: inter, marginTop: 8, padding: "9px 20px", borderRadius: 9999, fontSize: 13, fontWeight: 560, color: "#fff", background: "#0f172a", border: "none", cursor: "pointer", alignSelf: "flex-start" }}>Login</motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ══ HERO CONTENT ══ */}
      <div className="hero-content" style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", textAlign: "center", paddingTop: "clamp(72px, 11vh, 110px)", paddingLeft: 20, paddingRight: 20, zIndex: 5 }}>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <div className="badge-pulse" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 16px", borderRadius: 9999, fontFamily: inter, fontSize: 12, fontWeight: 440, color: "#0f172a", background: "rgba(255,255,255,0.72)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.6)", marginBottom: 16, userSelect: "none" }}>
            Trusted by 50,000+ users worldwide&nbsp;
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 1.6 }}
              style={{ display: "inline-block", color: "#ef4444", fontSize: 11 }}
            >❤</motion.span>
          </div>
        </motion.div>

        {/* Headline — word by word reveal */}
        <h1 style={{ fontFamily: inter, fontWeight: 860, fontSize: "clamp(38px, 5.2vw, 64px)", color: "#0f172a", lineHeight: 1.07, letterSpacing: "-0.034em", margin: "0 0 14px 0", maxWidth: 660 }}>
          <WordReveal words={LINE1} baseDelay={0.2} />
          <WordReveal words={LINE2} baseDelay={0.52} />
        </h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.88 }}
          style={{ fontFamily: inter, fontSize: "clamp(13px, 1.3vw, 16px)", fontWeight: 400, color: "rgba(15,23,42,0.72)", lineHeight: 1.65, margin: "0 0 26px 0", maxWidth: 380 }}
        >
          A transparent platform built for clarity,<br />accountability, and real trust.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 1.05 }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: 14 }}
        >
          {/* Get Started — magnetic + shimmer */}
          <MagneticBtn
            style={{ fontFamily: inter, display: "flex", alignItems: "center", gap: 8, padding: "12px 26px", borderRadius: 9999, fontSize: 14, fontWeight: 600, color: "#fff", background: "#0f172a", border: "none", cursor: "pointer", boxShadow: "0 4px 24px rgba(0,0,0,0.28)" } as React.CSSProperties}
          >
            <motion.span style={{ display: "flex", alignItems: "center", gap: 8 }}
              whileHover={{ x: 2 }} transition={{ type: "spring", stiffness: 300 }}>
              Get Started
              <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }} style={{ display: "flex" }}>
                <ArrowRight size={14} strokeWidth={2.5} />
              </motion.span>
            </motion.span>
          </MagneticBtn>

          {/* Watch Demo — pulse ring */}
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            style={{ fontFamily: inter, display: "flex", alignItems: "center", gap: 11, fontSize: 14, fontWeight: 440, color: "#0f172a", background: "none", border: "none", cursor: "pointer", padding: 0 }}
          >
            <span style={{ position: "relative", width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.6)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", border: "1px solid rgba(15,23,42,0.16)", flexShrink: 0 }}>
              <span className="pulse-ring" />
              <span className="pulse-ring-2" />
              <Play size={10} style={{ marginLeft: 2, fill: "#0f172a", color: "#0f172a", position: "relative", zIndex: 1 }} />
            </span>
            <motion.span
              whileHover={{ x: 2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >Watch Demo</motion.span>
          </motion.button>
        </motion.div>
      </div>

      {/* ══ BOTTOM — logo bar ══ */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", paddingBottom: "clamp(8px, 1.2vh, 16px)" }}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 7 }}
        >
          <p style={{ fontFamily: inter, fontSize: 9, fontWeight: 600, letterSpacing: "0.22em", color: "rgba(15,23,42,0.38)", textTransform: "uppercase", margin: 0, userSelect: "none" }}>
            Trusted by companies you know
          </p>
          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", justifyContent: "center", gap: "0 22px" }}>
            {COMPANIES.map(({ icon: Icon, label }, i) => (
              <motion.div key={label}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 1.4 + i * 0.07 }}
                whileHover={{ y: -2, color: "rgba(15,23,42,0.85)" } as any}
                style={{ display: "flex", alignItems: "center", gap: 5, color: "rgba(15,23,42,0.46)", cursor: "default", userSelect: "none" }}
              >
                <Icon size={12} strokeWidth={1.65} />
                <span style={{ fontFamily: inter, fontSize: 11.5, fontWeight: 500 }}>{label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
