import { useState } from "react";
import { Menu, X } from "lucide-react";

function HavenLogo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <div
        style={{
          width: "28px",
          height: "28px",
          borderRadius: "50%",
          background: "#e53e3e",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <div
          style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#fff" }}
        />
      </div>
      <span
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500,
          fontSize: "1.05rem",
          letterSpacing: "-0.01em",
          color: "#1a1a1a",
        }}
      >
        Haven
      </span>
    </div>
  );
}

const navLinks = ["Home", "Usecases", "Pricing", "Careers", "Contact"];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* ── Background Image ── */}
      <img
        src="/hero-bg.jpg"
        alt="Alpine meadow"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          display: "block",
          zIndex: 0,
        }}
        draggable={false}
      />

      {/* ── Navbar ── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 40px",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        <HavenLogo />

        {/* Desktop nav */}
        <ul
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
          className="hide-mobile"
        >
          {navLinks.map((link) => (
            <li key={link}>
              <a
                href="#"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "#1a1a1a",
                  textDecoration: "none",
                }}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop Login */}
        <button
          className="hide-mobile"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "14px",
            fontWeight: 500,
            color: "#fff",
            background: "#0f172a",
            border: "none",
            borderRadius: "9999px",
            padding: "9px 22px",
            cursor: "pointer",
            transition: "transform 0.15s, box-shadow 0.15s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.02)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.2)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
          }}
        >
          Login
        </button>

        {/* Mobile hamburger */}
        <button
          className="show-mobile"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#1a1a1a",
            display: "none",
            padding: "4px",
          }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            top: "56px",
            left: 0,
            right: 0,
            zIndex: 99,
            padding: "16px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            background: "rgba(255,255,255,0.88)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(255,255,255,0.3)",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "15px",
                fontWeight: 500,
                color: "#1a1a1a",
                textDecoration: "none",
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link}
            </a>
          ))}
          <button
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "14px",
              fontWeight: 500,
              color: "#fff",
              background: "#0f172a",
              border: "none",
              borderRadius: "9999px",
              padding: "10px 22px",
              cursor: "pointer",
              alignSelf: "flex-start",
            }}
          >
            Login
          </button>
        </div>
      )}

      {/* ── Hero Content ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: "28vh",
          paddingLeft: "16px",
          paddingRight: "16px",
          textAlign: "center",
        }}
      >
        {/* Announcement Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "6px 16px",
            marginBottom: "20px",
            fontFamily: "'Inter', sans-serif",
            fontSize: "13px",
            fontWeight: 400,
            color: "#1a1a1a",
            background: "rgba(255,255,255,0.75)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            border: "1px solid rgba(255,255,255,0.35)",
            borderRadius: "9999px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
          }}
        >
          We just raised 20M 🚀
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(40px, 6.5vw, 78px)",
            fontWeight: 800,
            color: "#1a1a1a",
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            margin: "0 0 16px 0",
            maxWidth: "700px",
          }}
        >
          Design with ease.
        </h1>

        {/* Subheadline */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(15px, 1.6vw, 18px)",
            fontWeight: 400,
            color: "#1a1a1a",
            lineHeight: 1.65,
            margin: "0 0 32px 0",
            maxWidth: "480px",
          }}
        >
          Design smarter with AI that understands you.
          <br />
          So you can take a breath.
        </p>

        {/* CTA Buttons */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
          }}
        >
          <button
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "15px",
              fontWeight: 500,
              color: "#1a1a1a",
              background: "#ffffff",
              border: "1px solid rgba(0,0,0,0.08)",
              borderRadius: "9999px",
              padding: "13px 28px",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.09)",
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.02)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.14)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.09)";
            }}
          >
            Get Started →
          </button>
          <button
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "15px",
              fontWeight: 500,
              color: "#1a1a1a",
              background: "transparent",
              border: "1px solid rgba(0,0,0,0.18)",
              borderRadius: "9999px",
              padding: "13px 28px",
              cursor: "pointer",
              transition: "transform 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
            }}
          >
            Watch Demo
          </button>
        </div>
      </div>

      {/* ── Scroll Indicator ── */}
      <div
        style={{
          position: "fixed",
          bottom: "28px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 50,
          padding: "7px 20px",
          fontFamily: "'Inter', sans-serif",
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "0.18em",
          color: "#1a1a1a",
          textTransform: "uppercase",
          background: "rgba(255,255,255,0.6)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          border: "1px solid rgba(255,255,255,0.35)",
          borderRadius: "9999px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
          whiteSpace: "nowrap",
        }}
      >
        SCROLL ↓
      </div>
    </div>
  );
}
