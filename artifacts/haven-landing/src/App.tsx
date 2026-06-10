import { useState } from "react";
import { Search, Menu, X } from "lucide-react";

const NAV_LINKS = ["Home", "How It Works", "Philosophy", "Use Cases"];

function StarBox({ filled, partial }: { filled: boolean; partial?: boolean }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 30,
        height: 30,
        borderRadius: 6,
        background: filled ? "#f97316" : partial ? "rgba(249,115,22,0.5)" : "rgba(249,115,22,0.18)",
        flexShrink: 0,
      }}
    >
      <svg viewBox="0 0 20 20" width={16} height={16} style={{ flexShrink: 0 }}>
        <path
          d="M10 1.5l2.47 5 5.53.8-4 3.9.94 5.5L10 14.1 5.06 16.7 6 11.2l-4-3.9 5.53-.8z"
          fill="white"
        />
      </svg>
    </span>
  );
}

function StarRating() {
  return (
    <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
      <StarBox filled={true} />
      <StarBox filled={true} />
      <StarBox filled={true} />
      <StarBox filled={true} />
      <StarBox filled={false} partial={true} />
    </div>
  );
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "#0a0a0a",
        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
      }}
    >
      {/* ── Background image ── */}
      <img
        src="/hero-bg.jpg"
        alt=""
        draggable={false}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center center",
          pointerEvents: "none",
          userSelect: "none",
        }}
      />

      {/* ── Gradient overlays ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.1) 28%, transparent 50%, rgba(0,0,0,0.2) 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* ══ DESKTOP NAVBAR ══ */}
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
          padding: "22px 40px",
        }}
      >
        {/* Logo */}
        <span
          style={{
            color: "white",
            fontSize: 13,
            fontWeight: 400,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            flexShrink: 0,
          }}
        >
          AETHERA
        </span>

        {/* Center pill */}
        <div
          style={{
            background: "rgba(15,15,15,0.85)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderRadius: 9999,
            padding: "10px 4px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {NAV_LINKS.map((link, i) => (
            <span key={link} style={{ display: "flex", alignItems: "center" }}>
              <a
                href="#"
                style={{
                  color: "rgba(255,255,255,0.88)",
                  fontSize: 13.5,
                  fontWeight: 400,
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  padding: "3px 20px",
                  letterSpacing: "0.01em",
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.88)")
                }
              >
                {link}
              </a>
              {i < NAV_LINKS.length - 1 && (
                <span
                  style={{
                    color: "rgba(255,255,255,0.3)",
                    fontSize: 5,
                    lineHeight: 1,
                    flexShrink: 0,
                  }}
                >
                  ●
                </span>
              )}
            </span>
          ))}
        </div>

        {/* Right controls */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            flexShrink: 0,
          }}
        >
          <button
            style={{
              color: "rgba(255,255,255,0.85)",
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 4,
              fontSize: 13,
              fontFamily: "inherit",
              letterSpacing: "0.05em",
              padding: 0,
            }}
          >
            EN
            <span style={{ fontSize: 9, opacity: 0.7, marginTop: 1 }}>▾</span>
          </button>
          <button
            style={{
              color: "rgba(255,255,255,0.85)",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Search size={17} strokeWidth={1.6} />
          </button>
        </div>
      </nav>

      {/* ══ MOBILE NAVBAR ══ */}
      <nav
        className="mobile-nav"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: "none",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 20px",
        }}
      >
        <span
          style={{
            color: "white",
            fontSize: 13,
            fontWeight: 400,
            letterSpacing: "0.22em",
          }}
        >
          AETHERA
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button
            style={{
              color: "rgba(255,255,255,0.85)",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              display: "flex",
            }}
          >
            <Search size={18} strokeWidth={1.6} />
          </button>
          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            style={{
              color: "white",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              display: "flex",
            }}
          >
            {mobileMenuOpen ? (
              <X size={22} strokeWidth={1.5} />
            ) : (
              <Menu size={22} strokeWidth={1.5} />
            )}
          </button>
        </div>
      </nav>

      {/* ══ MOBILE MENU OVERLAY ══ */}
      {mobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 40,
            background: "rgba(5,5,5,0.97)",
            backdropFilter: "blur(20px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                color: "white",
                fontSize: 26,
                fontWeight: 300,
                textDecoration: "none",
                letterSpacing: "0.02em",
                padding: "10px 0",
                fontFamily: "'Courier Prime', monospace",
              }}
            >
              {link}
            </a>
          ))}
          <div
            style={{
              display: "flex",
              gap: 24,
              marginTop: 32,
              color: "rgba(255,255,255,0.45)",
              fontSize: 13,
            }}
          >
            <button
              style={{
                color: "rgba(255,255,255,0.5)",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 13,
                fontFamily: "inherit",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              EN ▾
            </button>
          </div>
        </div>
      )}

      {/* ══ HERO CONTENT ══ */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          textAlign: "center",
          paddingTop: "clamp(90px, 12vh, 130px)",
          paddingLeft: "clamp(20px, 5vw, 60px)",
          paddingRight: "clamp(20px, 5vw, 60px)",
          zIndex: 10,
        }}
      >
        {/* Headline */}
        <h1
          style={{
            fontFamily: "'Courier Prime', 'Courier New', Courier, monospace",
            fontSize: "clamp(26px, 3.7vw, 48px)",
            fontWeight: 400,
            color: "white",
            lineHeight: 1.22,
            letterSpacing: "0em",
            margin: "0 0 20px 0",
            maxWidth: "min(820px, 90vw)",
            whiteSpace: "normal",
          }}
        >
          A New Kind of Intelligence
          <br />– Human at Heart
        </h1>

        {/* Subtext */}
        <p
          style={{
            fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
            fontSize: "clamp(13px, 1.1vw, 15px)",
            fontWeight: 300,
            color: "rgba(255,255,255,0.75)",
            lineHeight: 1.75,
            margin: "0 0 34px 0",
            maxWidth: "min(400px, 86vw)",
          }}
        >
          Aethera is a collaborative AI designed to elevate thought, co-create
          ideas, and build with empathy. It's in sync with how you think and
          feel.
        </p>

        {/* CTA button */}
        <button
          style={{
            fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
            background: "white",
            color: "#0a0a0a",
            border: "none",
            borderRadius: 9999,
            padding: "15px 38px",
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
            letterSpacing: "0.01em",
            whiteSpace: "nowrap",
            transition: "opacity 0.15s",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.opacity = "0.88")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.opacity = "1")
          }
        >
          See How It Works
        </button>
      </div>

      {/* ══ BOTTOM REVIEW BAR ══ */}
      <div
        style={{
          position: "absolute",
          bottom: "clamp(16px, 3vh, 32px)",
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          zIndex: 10,
          flexWrap: "wrap",
          padding: "0 20px",
        }}
      >
        <span
          style={{
            color: "rgba(255,255,255,0.6)",
            fontSize: 13,
            fontWeight: 300,
            whiteSpace: "nowrap",
          }}
        >
          Reviews 1,042
        </span>
        <StarRating />
        <span
          style={{
            color: "rgba(255,255,255,0.6)",
            fontSize: 13,
            fontWeight: 300,
            whiteSpace: "nowrap",
          }}
        >
          Excellent Score
        </span>
      </div>
    </div>
  );
}
