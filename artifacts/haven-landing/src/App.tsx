import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye, ShieldCheck, Sparkles, Lock,
  Play, ChevronDown, ArrowRight,
  Menu, X,
  Cloud, Boxes, Zap, Globe, Server,
} from "lucide-react";

const NAV_LINKS = [
  { label: "Home" },
  { label: "Features" },
  { label: "Solutions" },
  { label: "Pricing" },
  { label: "Resources", hasDropdown: true },
];

const FEATURES = [
  { icon: Eye,         title: "Full Visibility",    desc: "See everything that matters." },
  { icon: ShieldCheck, title: "Built for Trust",     desc: "Verified, secure and always reliable." },
  { icon: Sparkles,    title: "Total Transparency",  desc: "No hidden data. No fine print." },
  { icon: Lock,        title: "Enterprise Security", desc: "Industry-grade security to protect you." },
];

const COMPANIES = [
  { icon: Cloud,  label: "Acme Corp" },
  { icon: Boxes,  label: "EchoLab" },
  { icon: Globe,  label: "Cloudify" },
  { icon: Zap,    label: "VisionFlow" },
  { icon: Server, label: "HexaTech" },
];

const ease = [0.22, 1, 0.36, 1] as const;
const inter = "'Inter', sans-serif";

function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9, flexShrink: 0 }}>
      {/* NothingHide diamond chevron icon */}
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="26" height="26" rx="7" fill="#0f172a"/>
        <path d="M7 13L13 7L19 13L13 19L7 13Z" fill="white" opacity="0.15"/>
        <path d="M7 13L13 8.5L16 11.5L13 15L7 13Z" fill="white" opacity="0.9"/>
        <path d="M19 13L13 17.5L10 14.5L13 11L19 13Z" fill="white" opacity="0.55"/>
      </svg>
      <span style={{ fontFamily: inter, fontWeight: 640, fontSize: 15, color: "#0f172a", letterSpacing: "-0.02em" }}>NothingHide</span>
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>

      {/* Background */}
      <img src="/hero-bg.jpg" alt="" draggable={false}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", zIndex: 0, userSelect: "none", pointerEvents: "none" }}
      />

      {/* ══ NAVBAR — centering wrapper is static, motion only for fade-in ══ */}
      <div style={{ position: "fixed", top: 12, left: 0, right: 0, zIndex: 50, display: "flex", justifyContent: "center", padding: "0 12px" }}>
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.46, ease }}
          style={{ width: "100%", maxWidth: 800 }}
        >
          {/* Desktop pill */}
          <nav className="nav-desk" style={{ alignItems: "center", background: "#ffffff", borderRadius: 9999, boxShadow: "0 2px 24px rgba(0,0,0,0.11)", padding: "6px 8px", width: "100%" }}>
            <div style={{ paddingLeft: 6, paddingRight: 8, flexShrink: 0 }}><Logo /></div>
            <div style={{ width: 1, height: 17, background: "rgba(0,0,0,0.1)", margin: "0 4px", flexShrink: 0 }} />
            <ul style={{ display: "flex", alignItems: "center", flex: 1, justifyContent: "center", listStyle: "none", margin: 0, padding: 0 }}>
              {NAV_LINKS.map(({ label, hasDropdown }) => (
                <li key={label}>
                  <a href="#" style={{ fontFamily: inter, display: "flex", alignItems: "center", gap: 3, padding: "6px 11px", borderRadius: 9999, fontSize: 13, fontWeight: 440, color: "#0f172a", textDecoration: "none", transition: "background 0.15s", whiteSpace: "nowrap" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "rgba(0,0,0,0.045)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                    {label}
                    {hasDropdown && <ChevronDown size={11} strokeWidth={2} style={{ opacity: 0.4, marginTop: 1 }} />}
                  </a>
                </li>
              ))}
            </ul>
            <button style={{ fontFamily: inter, marginLeft: 6, padding: "8px 20px", borderRadius: 9999, fontSize: 13, fontWeight: 560, color: "#fff", background: "#0f172a", border: "none", cursor: "pointer", flexShrink: 0, transition: "background 0.15s", whiteSpace: "nowrap" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#1e293b")}
              onMouseLeave={e => (e.currentTarget.style.background = "#0f172a")}>
              Login
            </button>
          </nav>

          {/* Mobile pill */}
          <nav className="nav-mob" style={{ alignItems: "center", justifyContent: "space-between", background: "#ffffff", borderRadius: 9999, boxShadow: "0 2px 24px rgba(0,0,0,0.11)", padding: "10px 16px", width: "100%" }}>
            <Logo />
            <button onClick={() => setMenuOpen(v => !v)} style={{ background: "none", border: "none", cursor: "pointer", color: "#0f172a", padding: 4 }}>
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </nav>

          <AnimatePresence>
            {menuOpen && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }}
                style={{ marginTop: 8, background: "#fff", borderRadius: 16, boxShadow: "0 6px 28px rgba(0,0,0,0.13)", padding: "12px", display: "flex", flexDirection: "column", gap: 2 }}>
                {NAV_LINKS.map(({ label }) => (
                  <a key={label} href="#" onClick={() => setMenuOpen(false)}
                    style={{ fontFamily: inter, padding: "9px 12px", borderRadius: 12, fontSize: 14, fontWeight: 440, color: "#0f172a", textDecoration: "none", display: "block", transition: "background 0.15s" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "rgba(0,0,0,0.04)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                    {label}
                  </a>
                ))}
                <button style={{ fontFamily: inter, marginTop: 8, padding: "9px 20px", borderRadius: 9999, fontSize: 13, fontWeight: 560, color: "#fff", background: "#0f172a", border: "none", cursor: "pointer", alignSelf: "flex-start" }}>Login</button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ══ HERO CONTENT ══ */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", textAlign: "center", paddingTop: "clamp(72px, 11vh, 110px)", paddingLeft: 20, paddingRight: 20, zIndex: 1 }}>

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.48, ease, delay: 0.1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 16px", borderRadius: 9999, fontFamily: inter, fontSize: 12, fontWeight: 440, color: "#0f172a", background: "rgba(255,255,255,0.68)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.5)", boxShadow: "0 1px 8px rgba(0,0,0,0.06)", marginBottom: 14, userSelect: "none" }}>
            Trusted by 50,000+ users worldwide&nbsp;<span style={{ color: "#ef4444", fontSize: 11 }}>❤</span>
          </div>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.56, ease, delay: 0.17 }}
          style={{ fontFamily: inter, fontWeight: 860, fontSize: "clamp(38px, 5.2vw, 62px)", color: "#0f172a", lineHeight: 1.07, letterSpacing: "-0.034em", margin: "0 0 12px 0", maxWidth: 640 }}>
          Nothing to hide.<br />Everything to trust.
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease, delay: 0.24 }}
          style={{ fontFamily: inter, fontSize: "clamp(13px, 1.3vw, 16px)", fontWeight: 400, color: "rgba(15,23,42,0.72)", lineHeight: 1.65, margin: "0 0 22px 0", maxWidth: 380 }}>
          A transparent platform built for clarity,<br />accountability, and real trust.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.46, ease, delay: 0.3 }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: 12 }}>
          <button style={{ fontFamily: inter, display: "flex", alignItems: "center", gap: 8, padding: "11px 24px", borderRadius: 9999, fontSize: 14, fontWeight: 600, color: "#fff", background: "#0f172a", border: "none", cursor: "pointer", boxShadow: "0 2px 16px rgba(0,0,0,0.24)", transition: "transform 0.15s, background 0.15s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#1e293b"; e.currentTarget.style.transform = "scale(1.02)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#0f172a"; e.currentTarget.style.transform = "scale(1)"; }}>
            Get Started <ArrowRight size={14} strokeWidth={2.5} />
          </button>
          <button style={{ fontFamily: inter, display: "flex", alignItems: "center", gap: 10, fontSize: 14, fontWeight: 440, color: "#0f172a", background: "none", border: "none", cursor: "pointer", padding: 0, transition: "opacity 0.15s" }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.55")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
            <span style={{ width: 34, height: 34, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.55)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", border: "1px solid rgba(15,23,42,0.18)", flexShrink: 0 }}>
              <Play size={10} style={{ marginLeft: 2, fill: "#0f172a", color: "#0f172a" }} />
            </span>
            Watch Demo
          </button>
        </motion.div>
      </div>

      {/* ══ BOTTOM SECTION — static wrapper, motion only for fade-in ══ */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", paddingBottom: "clamp(6px, 1vh, 12px)", gap: "clamp(6px, 1vh, 10px)" }}>

        {/* Feature strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.58, ease, delay: 0.4 }}
          style={{ width: "min(880px, calc(100vw - 28px))" }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", background: "rgba(255,255,255,0.2)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.38)", borderRadius: 16, boxShadow: "0 4px 36px rgba(0,0,0,0.09)", overflow: "hidden" }}>
            {FEATURES.map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={title}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease, delay: 0.46 + i * 0.065 }}
                style={{ display: "flex", alignItems: "flex-start", gap: 11, padding: "13px 14px", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.3)" : "none" }}>
                <div style={{ width: 33, height: 33, borderRadius: "50%", background: "rgba(255,255,255,0.44)", border: "1px solid rgba(255,255,255,0.58)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={14} strokeWidth={1.75} color="#0f172a" />
                </div>
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontFamily: inter, fontSize: 12, fontWeight: 660, color: "#0f172a", margin: "0 0 2px 0", lineHeight: 1.3 }}>{title}</p>
                  <p style={{ fontFamily: inter, fontSize: 10.5, fontWeight: 400, color: "rgba(15,23,42,0.58)", margin: 0, lineHeight: 1.45 }}>{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Logo bar */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}
        >
          <p style={{ fontFamily: inter, fontSize: 9, fontWeight: 600, letterSpacing: "0.2em", color: "rgba(15,23,42,0.4)", textTransform: "uppercase", margin: 0, userSelect: "none" }}>
            Trusted by companies you know
          </p>
          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", justifyContent: "center", gap: "0 20px" }}>
            {COMPANIES.map(({ icon: Icon, label }, i) => (
              <motion.div key={label}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.7 + i * 0.05 }}
                style={{ display: "flex", alignItems: "center", gap: 5, color: "rgba(15,23,42,0.48)", cursor: "default", userSelect: "none", transition: "color 0.15s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(15,23,42,0.8)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(15,23,42,0.48)")}>
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
