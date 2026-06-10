import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = ["Home", "Usecases", "Pricing", "Careers", "Contact"];

/* ─── Logo ─────────────────────────────────────────── */
function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "7px", flexShrink: 0 }}>
      {/* Red circle with inner white dot */}
      <div style={{
        width: "22px", height: "22px", borderRadius: "50%",
        background: "#dc2626",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#fff" }} />
      </div>
      <span style={{
        fontFamily: "'Inter', sans-serif",
        fontWeight: 500,
        fontSize: "15px",
        letterSpacing: "-0.01em",
        color: "#1a1a1a",
      }}>
        Haven
      </span>
    </div>
  );
}

/* ─── Frosted pill shell ─────────────────────────────── */
const pill: React.CSSProperties = {
  background: "rgba(255,255,255,0.62)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  border: "1px solid rgba(255,255,255,0.45)",
  borderRadius: "9999px",
  boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
};

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>

      {/* ── Background ───────────────────────────────── */}
      <img
        src="/hero-bg.jpg"
        alt=""
        draggable={false}
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover", objectPosition: "center",
          zIndex: 0,
        }}
      />

      {/* ── Navbar — compact centered pill ───────────── */}
      <header style={{
        position: "fixed", top: "14px", left: "50%",
        transform: "translateX(-50%)",
        zIndex: 100,
        width: "max-content",
        maxWidth: "calc(100vw - 32px)",
      }}>

        {/* Desktop pill */}
        <nav
          className="nav-desktop"
          style={{
            ...pill,
            alignItems: "center",
            padding: "6px 6px 6px 14px",
            gap: 0,
          }}
        >
          {/* Logo */}
          <Logo />

          {/* Divider */}
          <div style={{ width: "1px", height: "16px", background: "rgba(0,0,0,0.12)", margin: "0 18px" }} />

          {/* Nav links */}
          <ul style={{ display: "flex", alignItems: "center", gap: "4px", listStyle: "none", margin: 0, padding: 0 }}>
            {navLinks.map((link) => (
              <li key={link}>
                <a href="#" style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "13px",
                  fontWeight: 400,
                  color: "#1a1a1a",
                  textDecoration: "none",
                  padding: "5px 10px",
                  borderRadius: "9999px",
                  display: "block",
                  transition: "background 0.15s",
                }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>

          {/* Login button — dark pill embedded in the right end */}
          <button style={{
            marginLeft: "10px",
            fontFamily: "'Inter', sans-serif",
            fontSize: "13px",
            fontWeight: 500,
            color: "#fff",
            background: "#0f172a",
            border: "none",
            borderRadius: "9999px",
            padding: "8px 20px",
            cursor: "pointer",
            transition: "opacity 0.15s",
            whiteSpace: "nowrap",
          }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Login
          </button>
        </nav>

        {/* Mobile pill */}
        <nav
          className="nav-mobile"
          style={{
            ...pill,
            alignItems: "center",
            padding: "8px 8px 8px 14px",
            gap: "10px",
          }}
        >
          <Logo />
          <button
            style={{ background: "none", border: "none", cursor: "pointer", color: "#1a1a1a", display: "flex", padding: "4px" }}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </header>

      {/* Mobile dropdown */}
      {open && (
        <div style={{
          position: "fixed", top: "62px", left: "50%",
          transform: "translateX(-50%)",
          zIndex: 99,
          width: "calc(100vw - 32px)",
          maxWidth: "360px",
          ...pill,
          borderRadius: "20px",
          padding: "16px 20px",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}>
          {navLinks.map((link) => (
            <a key={link} href="#"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                fontWeight: 400,
                color: "#1a1a1a",
                textDecoration: "none",
                padding: "9px 12px",
                borderRadius: "12px",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              onClick={() => setOpen(false)}
            >
              {link}
            </a>
          ))}
          <button style={{
            marginTop: "8px",
            fontFamily: "'Inter', sans-serif",
            fontSize: "13px",
            fontWeight: 500,
            color: "#fff",
            background: "#0f172a",
            border: "none",
            borderRadius: "9999px",
            padding: "10px 20px",
            cursor: "pointer",
            alignSelf: "flex-start",
          }}>
            Login
          </button>
        </div>
      )}

      {/* ── Hero Content ─────────────────────────────── */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: "22vh",
        paddingLeft: "20px",
        paddingRight: "20px",
        textAlign: "center",
      }}>

        {/* Announcement badge */}
        <div style={{
          ...pill,
          display: "inline-flex",
          alignItems: "center",
          padding: "5px 14px",
          marginBottom: "18px",
          fontFamily: "'Inter', sans-serif",
          fontSize: "12.5px",
          fontWeight: 400,
          color: "#1a1a1a",
          whiteSpace: "nowrap",
        }}>
          We just raised 20M 🚀
        </div>

        {/* Headline — Cormorant Garamond, high-contrast editorial serif */}
        <h1 style={{
          fontFamily: "'Cormorant Garamond', 'Georgia', serif",
          fontSize: "clamp(42px, 7vw, 82px)",
          fontWeight: 600,
          fontStyle: "normal",
          color: "#1a1a1a",
          lineHeight: 1.05,
          letterSpacing: "-0.01em",
          margin: "0 0 14px 0",
          maxWidth: "720px",
        }}>
          Design with ease.
        </h1>

        {/* Subheadline */}
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "clamp(14px, 1.5vw, 17px)",
          fontWeight: 400,
          color: "#1a1a1a",
          lineHeight: 1.7,
          margin: "0 0 30px 0",
          maxWidth: "440px",
          opacity: 0.9,
        }}>
          Design smarter with AI that understands you.
          <br />
          So you can take a breath.
        </p>

        {/* CTA — joined pill: [Get Started →] | [Watch Demo] */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          ...pill,
          padding: "5px",
          gap: 0,
        }}>
          <button style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "14px",
            fontWeight: 500,
            color: "#1a1a1a",
            background: "#fff",
            border: "none",
            borderRadius: "9999px",
            padding: "10px 22px",
            cursor: "pointer",
            whiteSpace: "nowrap",
            boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
            transition: "transform 0.15s, box-shadow 0.15s",
          }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.02)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 3px 12px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 1px 4px rgba(0,0,0,0.1)";
            }}
          >
            Get Started →
          </button>

          <button style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "14px",
            fontWeight: 400,
            color: "#1a1a1a",
            background: "transparent",
            border: "none",
            borderRadius: "9999px",
            padding: "10px 20px",
            cursor: "pointer",
            whiteSpace: "nowrap",
            transition: "opacity 0.15s",
          }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Watch Demo
          </button>
        </div>
      </div>

      {/* ── Scroll indicator ─────────────────────────── */}
      <div style={{
        position: "fixed",
        bottom: "24px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 50,
        ...pill,
        padding: "6px 18px",
        fontFamily: "'Inter', sans-serif",
        fontSize: "10.5px",
        fontWeight: 500,
        letterSpacing: "0.2em",
        color: "#1a1a1a",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
      }}>
        SCROLL ↓
      </div>
    </div>
  );
}
