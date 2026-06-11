import { useState } from "react";
import { Search, Menu, X } from "lucide-react";

const NAV_LINKS = ["Home", "Features", "Solutions", "Pricing", "Resources"];
const COURIER = "'Courier Prime', 'Courier New', Courier, monospace";
const SANS = "'Inter', 'Helvetica Neue', Arial, sans-serif";

function StarIcon({ state, id }: { state: "full" | "half" | "empty"; id?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} style={{ flexShrink: 0 }}>
      {state === "half" && id && (
        <defs>
          <linearGradient id={id} x1="0" x2="1" y1="0" y2="0">
            <stop offset="50%" stopColor="white" stopOpacity="0.88" />
            <stop offset="50%" stopColor="white" stopOpacity="0.14" />
          </linearGradient>
        </defs>
      )}
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        fill={
          state === "full"
            ? "rgba(255,255,255,0.88)"
            : state === "half"
            ? `url(#${id})`
            : "rgba(255,255,255,0.13)"
        }
      />
    </svg>
  );
}

function StarRating() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ display: "flex", gap: 3 }}>
        <StarIcon state="full" />
        <StarIcon state="full" />
        <StarIcon state="full" />
        <StarIcon state="full" />
        <StarIcon state="half" id="star-half" />
      </div>
      <span
        style={{
          color: "rgba(255,255,255,0.7)",
          fontSize: 13,
          fontFamily: SANS,
          fontWeight: 400,
          letterSpacing: "0.01em",
        }}
      >
        4.8
      </span>
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
        background: "#080808",
        fontFamily: SANS,
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
          objectPosition: "center 30%",
          pointerEvents: "none",
          userSelect: "none",
        }}
      />

      {/* ── Top gradient — navbar legibility ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.15) 22%, transparent 45%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* ── Bottom gradient — text legibility ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(0deg, rgba(4,4,4,0.92) 0%, rgba(4,4,4,0.65) 22%, rgba(4,4,4,0.1) 45%, transparent 65%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* ── Left edge gradient — text contrast ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.28) 0%, transparent 55%)",
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
          NothingHide
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
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "white")
                }
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
            textTransform: "uppercase",
          }}
        >
          NothingHide
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
                fontFamily: COURIER,
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

      {/* ══ HERO CONTENT — vertically centered, left anchored ══ */}
      <div
        className="hero-content"
        style={{
          position: "absolute",
          left: "clamp(32px, 6vw, 90px)",
          top: "50%",
          transform: "translateY(-50%)",
          marginTop: "30px",
          zIndex: 10,
          maxWidth: "min(580px, calc(100vw - 64px))",
        }}
      >
        {/* Decorative hairline rule */}
        <div
          style={{
            width: 42,
            height: 1,
            background: "rgba(255,255,255,0.42)",
            marginBottom: 20,
          }}
        />

        {/* Headline */}
        <h1
          style={{
            fontFamily: COURIER,
            fontSize: "clamp(34px, 4.8vw, 62px)",
            fontWeight: 400,
            color: "white",
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
            margin: "0 0 clamp(14px, 1.8vh, 22px)",
            whiteSpace: "normal",
          }}
        >
          Nothing to hide.
          <br />
          Everything to trust.
        </h1>

        {/* Subtext */}
        <p
          style={{
            fontFamily: SANS,
            fontSize: "clamp(13px, 1vw, 15px)",
            fontWeight: 300,
            color: "rgba(255,255,255,0.65)",
            lineHeight: 1.75,
            margin: "0 0 clamp(22px, 2.8vh, 34px)",
            maxWidth: "min(360px, 80vw)",
          }}
        >
          A transparent platform built for clarity, accountability, and real
          trust. We believe honesty is the foundation of every great product.
        </p>

        {/* CTA + Stars inline */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(16px, 3vw, 32px)",
            flexWrap: "wrap",
          }}
        >
          <button
            style={{
              fontFamily: SANS,
              background: "white",
              color: "#080808",
              border: "none",
              borderRadius: 9999,
              padding: "14px 36px",
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
              letterSpacing: "0.01em",
              whiteSpace: "nowrap",
              flexShrink: 0,
              transition: "opacity 0.15s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.opacity = "0.88")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.opacity = "1")
            }
          >
            Get Started
          </button>

          {/* Inline review block */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            <StarRating />
            <span
              style={{
                color: "rgba(255,255,255,0.42)",
                fontSize: 11,
                fontFamily: SANS,
                letterSpacing: "0.04em",
                whiteSpace: "nowrap",
              }}
            >
              Trusted by 50,000+ · Verified Platform
            </span>
          </div>
        </div>
      </div>

      {/* ══ SCROLL INDICATOR — bottom-right ══ */}
      <div
        className="scroll-indicator"
        style={{
          position: "absolute",
          right: "clamp(28px, 4vw, 56px)",
          bottom: "clamp(36px, 5.5vh, 68px)",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            width: 1,
            height: 40,
            background:
              "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.28) 100%)",
          }}
        />
        <span
          style={{
            color: "rgba(255,255,255,0.28)",
            fontSize: 9,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            fontFamily: SANS,
            writingMode: "vertical-lr",
            transform: "rotate(180deg)",
          }}
        >
          Scroll
        </span>
      </div>
    </div>
  );
}
