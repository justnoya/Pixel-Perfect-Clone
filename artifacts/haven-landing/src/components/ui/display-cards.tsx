"use client";

import { cn } from "@/lib/utils";

interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  label?: string;
  title?: string;
  description?: string;
  meta?: string;
  accentColor?: string;
}

function DisplayCard({
  className,
  icon,
  label = "Result",
  title = "Client win",
  description = "Qualified buyer leads delivered",
  meta = "Mumbai",
  accentColor = "#4ade80",
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-40 w-[22rem] -skew-y-[8deg] select-none flex-col justify-between rounded-2xl px-5 py-4 transition-all duration-700",
        "[&>*]:flex [&>*]:items-center [&>*]:gap-2",
        className
      )}
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.1)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
      }}
    >
      {/* Top row — icon + label */}
      <div>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 26,
            height: 26,
            borderRadius: "50%",
            background: `${accentColor}22`,
            flexShrink: 0,
          }}
        >
          {icon}
        </span>
        <p
          style={{
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: accentColor,
            fontFamily: "'Courier Prime', monospace",
          }}
        >
          {label}
        </p>
      </div>

      {/* Middle — title */}
      <p
        style={{
          fontSize: 17,
          fontWeight: 500,
          color: "rgba(255,255,255,0.92)",
          fontFamily: "'Inter', sans-serif",
          lineHeight: 1.3,
          whiteSpace: "nowrap",
        }}
      >
        {title}
      </p>

      {/* Bottom row — description + meta */}
      <div style={{ flexDirection: "column", alignItems: "flex-start", gap: 2 }}>
        <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.45)", fontFamily: "'Inter', sans-serif", lineHeight: 1.4 }}>
          {description}
        </p>
        <p style={{ fontSize: 10.5, color: "rgba(255,255,255,0.22)", fontFamily: "'Courier Prime', monospace", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          {meta}
        </p>
      </div>

      {/* Right-side fade overlay (mimics the original component) */}
      <div
        style={{
          position: "absolute",
          top: "-5%",
          right: -4,
          width: "38%",
          height: "110%",
          background: "linear-gradient(to left, #090909 0%, transparent 100%)",
          borderRadius: "0 16px 16px 0",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[];
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateAreas: "'stack'",
        placeItems: "center",
      }}
    >
      {(cards ?? []).map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </div>
  );
}
