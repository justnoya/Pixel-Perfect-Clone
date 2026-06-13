import { useState } from "react";
import { FaLinkedinIn, FaTwitter, FaBehance, FaInstagram } from "react-icons/fa";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    behance?: string;
  };
}

const DEFAULT_MEMBERS: TeamMember[] = [
  {
    id: "1",
    name: "Swappy",
    role: "Founder / Strategist",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop&crop=face",
    social: { instagram: "#", linkedin: "#" },
  },
  {
    id: "2",
    name: "Dhurv",
    role: "Tech & Websites",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop&crop=face",
    social: { linkedin: "#" },
  },
  {
    id: "3",
    name: "Mack",
    role: "Lead Generation",
    image: "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=400&h=500&fit=crop&crop=face",
    social: { instagram: "#", linkedin: "#" },
  },
];

const SANS = "'Inter', 'Helvetica Neue', Arial, sans-serif";

interface TeamShowcaseProps {
  members?: TeamMember[];
}

export default function TeamShowcase({ members = DEFAULT_MEMBERS }: TeamShowcaseProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div style={{ width: "100%", maxWidth: 960, margin: "0 auto" }}>
      {/* ── PHOTO GRID ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "clamp(8px, 1.2vw, 14px)",
          marginBottom: "clamp(28px, 4vh, 44px)",
        }}
        className="team-photo-grid"
      >
        {members.map((member, i) => (
          <MemberCard
            key={member.id}
            member={member}
            index={i}
            hoveredId={hoveredId}
            onHover={setHoveredId}
          />
        ))}
      </div>

      {/* ── MEMBER LIST ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "clamp(12px, 2vw, 24px)",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          paddingTop: "clamp(18px, 2.5vh, 28px)",
        }}
        className="team-member-list"
      >
        {members.map((member) => (
          <MemberRow
            key={member.id}
            member={member}
            hoveredId={hoveredId}
            onHover={setHoveredId}
          />
        ))}
      </div>
    </div>
  );
}

function MemberCard({
  member,
  index,
  hoveredId,
  onHover,
}: {
  member: TeamMember;
  index: number;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;

  /* Alternate card heights for a natural masonry feel */
  const heights = ["clamp(140px,22vw,210px)", "clamp(160px,25vw,240px)", "clamp(150px,23vw,220px)",
                   "clamp(155px,24vw,230px)", "clamp(145px,22.5vw,215px)", "clamp(160px,25vw,240px)"];
  const height = heights[index % heights.length];

  return (
    <div
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
      onTouchStart={() => onHover(isActive ? null : member.id)}
      style={{
        position: "relative",
        borderRadius: "clamp(10px, 1.4vw, 16px)",
        overflow: "hidden",
        height,
        cursor: "pointer",
        opacity: isDimmed ? 0.45 : 1,
        transition: "opacity 0.35s ease, transform 0.35s ease",
        transform: isActive ? "scale(1.02)" : "scale(1)",
        flexShrink: 0,
      }}
    >
      {/* Photo — pixel blur effect on face */}
      <img
        src={member.image}
        alt={member.name}
        loading="lazy"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center top",
          display: "block",
          transition: "filter 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.5s ease",
          filter: isActive
            ? "blur(0px) grayscale(0) brightness(1.05)"
            : "blur(5px) grayscale(1) brightness(0.55)",
          transform: isActive ? "scale(1.06)" : "scale(1.0)",
          willChange: "filter, transform",
        }}
      />

      {/* Bottom gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: isActive
            ? "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)"
            : "linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.06) 50%, transparent 100%)",
          transition: "background 0.4s ease",
          pointerEvents: "none",
        }}
      />

      {/* Name + role reveal on hover */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "clamp(8px, 1.2vw, 14px)",
          transform: isActive ? "translateY(0)" : "translateY(6px)",
          opacity: isActive ? 1 : 0,
          transition: "transform 0.35s ease, opacity 0.35s ease",
          pointerEvents: "none",
        }}
      >
        <div style={{ fontFamily: SANS, fontSize: "clamp(11px, 1vw, 13px)", fontWeight: 600, color: "white", letterSpacing: "0.01em", lineHeight: 1.2 }}>
          {member.name}
        </div>
        <div style={{ fontFamily: SANS, fontSize: "clamp(9px, 0.75vw, 10.5px)", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.12em", marginTop: 3 }}>
          {member.role}
        </div>
      </div>

      {/* Corner index badge */}
      <div
        style={{
          position: "absolute",
          top: "clamp(6px, 0.9vw, 10px)",
          right: "clamp(6px, 0.9vw, 10px)",
          fontFamily: "'Courier Prime', monospace",
          fontSize: "clamp(8px, 0.7vw, 10px)",
          color: "rgba(255,255,255,0.3)",
          lineHeight: 1,
          userSelect: "none",
          transition: "opacity 0.3s ease",
          opacity: isDimmed ? 0 : 1,
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>
    </div>
  );
}

function MemberRow({
  member,
  hoveredId,
  onHover,
}: {
  member: TeamMember;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;

  const socials = [
    member.social?.twitter && { icon: <FaTwitter size={9} />, href: member.social.twitter },
    member.social?.linkedin && { icon: <FaLinkedinIn size={9} />, href: member.social.linkedin },
    member.social?.instagram && { icon: <FaInstagram size={9} />, href: member.social.instagram },
    member.social?.behance && { icon: <FaBehance size={9} />, href: member.social.behance },
  ].filter(Boolean) as { icon: React.ReactNode; href: string }[];

  return (
    <div
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
      style={{
        cursor: "pointer",
        opacity: isDimmed ? 0.35 : 1,
        transition: "opacity 0.3s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
        <span
          style={{
            display: "inline-block",
            width: isActive ? 18 : 12,
            height: 3,
            borderRadius: 9999,
            background: isActive ? "white" : "rgba(255,255,255,0.22)",
            transition: "width 0.3s ease, background 0.3s ease",
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: SANS,
            fontSize: "clamp(12px, 1.1vw, 15px)",
            fontWeight: 600,
            color: isActive ? "white" : "rgba(255,255,255,0.65)",
            transition: "color 0.3s ease",
            lineHeight: 1.2,
          }}
        >
          {member.name}
        </span>
      </div>
      <div style={{ paddingLeft: 20 }}>
        <div
          style={{
            fontFamily: SANS,
            fontSize: "clamp(8px, 0.7vw, 9.5px)",
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            color: "rgba(255,255,255,0.3)",
            marginBottom: 6,
          }}
        >
          {member.role}
        </div>
        {socials.length > 0 && (
          <div
            style={{
              display: "flex",
              gap: 4,
              opacity: isActive ? 1 : 0,
              transform: isActive ? "translateY(0)" : "translateY(4px)",
              transition: "opacity 0.25s ease, transform 0.25s ease",
            }}
          >
            {socials.map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 22,
                  height: 22,
                  borderRadius: 6,
                  background: "rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.5)",
                  textDecoration: "none",
                  transition: "background 0.15s ease, color 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.15)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "white";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.08)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.5)";
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
