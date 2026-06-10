import { useState } from "react";
import { Search } from "lucide-react";

const NAV_LINKS = ["Home", "How It Works", "Philosophy", "Use Cases"];

function StarRating() {
  return (
    <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            width: 28,
            height: 28,
            borderRadius: 5,
            background: i < 4 ? "#f97316" : "transparent",
            border: i < 4 ? "none" : "2px solid #f97316",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <svg
            viewBox="0 0 24 24"
            width="100%"
            height="100%"
            style={{ display: "block" }}
          >
            {i < 4 ? (
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                fill="white"
              />
            ) : (
              <>
                <defs>
                  <clipPath id="half">
                    <rect x="0" y="0" width="12" height="24" />
                  </clipPath>
                </defs>
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  fill="#f97316"
                  clipPath="url(#half)"
                />
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="1.5"
                />
              </>
            )}
          </svg>
        </span>
      ))}
    </div>
  );
}

export default function App() {
  const [langOpen, setLangOpen] = useState(false);

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

      {/* ── Subtle top-fade so nav is readable ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 30%, transparent 55%, rgba(0,0,0,0.25) 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* ══ NAVBAR ══ */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "22px 36px",
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
          }}
        >
          AETHERA
        </span>

        {/* Center pill */}
        <div
          style={{
            background: "rgba(18,18,18,0.82)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            borderRadius: 9999,
            padding: "11px 6px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {NAV_LINKS.map((link, i) => (
            <span key={link} style={{ display: "flex", alignItems: "center" }}>
              <a
                href="#"
                style={{
                  color: "rgba(255,255,255,0.92)",
                  fontSize: 13.5,
                  fontWeight: 400,
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  padding: "2px 18px",
                  letterSpacing: "0.01em",
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "white")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.92)")
                }
              >
                {link}
              </a>
              {i < NAV_LINKS.length - 1 && (
                <span
                  style={{
                    color: "rgba(255,255,255,0.35)",
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
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <button
            onClick={() => setLangOpen((v) => !v)}
            style={{
              color: "rgba(255,255,255,0.88)",
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
              color: "rgba(255,255,255,0.88)",
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
          paddingTop: "clamp(100px, 13vh, 140px)",
          paddingLeft: 24,
          paddingRight: 24,
          zIndex: 10,
        }}
      >
        {/* Headline */}
        <h1
          style={{
            fontFamily: "'Courier Prime', 'Courier New', Courier, monospace",
            fontSize: "clamp(30px, 4.2vw, 58px)",
            fontWeight: 400,
            color: "white",
            lineHeight: 1.22,
            letterSpacing: "0em",
            margin: "0 0 22px 0",
            maxWidth: 680,
          }}
        >
          A New Kind of Intelligence
          <br />– Human at Heart
        </h1>

        {/* Subtext */}
        <p
          style={{
            fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
            fontSize: "clamp(13px, 1.05vw, 15px)",
            fontWeight: 300,
            color: "rgba(255,255,255,0.78)",
            lineHeight: 1.72,
            margin: "0 0 36px 0",
            maxWidth: 390,
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
            padding: "15px 36px",
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
            letterSpacing: "0.01em",
            transition: "background 0.15s, transform 0.1s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "rgba(255,255,255,0.9)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "white";
          }}
        >
          See How It Works
        </button>
      </div>

      {/* ══ BOTTOM REVIEW BAR ══ */}
      <div
        style={{
          position: "absolute",
          bottom: 30,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 14,
          zIndex: 10,
        }}
      >
        <span
          style={{
            color: "rgba(255,255,255,0.65)",
            fontSize: 13,
            fontWeight: 300,
          }}
        >
          Reviews 1,042
        </span>
        <StarRating />
        <span
          style={{
            color: "rgba(255,255,255,0.65)",
            fontSize: 13,
            fontWeight: 300,
          }}
        >
          Excellent Score
        </span>
      </div>
    </div>
  );
}
