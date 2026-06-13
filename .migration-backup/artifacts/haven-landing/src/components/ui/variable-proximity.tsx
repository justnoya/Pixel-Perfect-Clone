import { useRef, useState, useCallback, useEffect } from "react";

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function parseFVS(s: string): Record<string, number> {
  const out: Record<string, number> = {};
  const re = /"([^"]+)"\s+([\d.-]+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(s)) !== null) out[m[1]] = parseFloat(m[2]);
  return out;
}

function formatFVS(o: Record<string, number>) {
  return Object.entries(o)
    .map(([k, v]) => `"${k}" ${v.toFixed(2)}`)
    .join(", ");
}

function getFalloff(dist: number, radius: number, falloff: "linear" | "exponential" | "gaussian") {
  const r = Math.max(0, 1 - dist / radius);
  if (falloff === "exponential") return r * r;
  if (falloff === "gaussian") return Math.exp(-((dist / (radius * 0.5)) ** 2) / 2);
  return r;
}

export interface VariableProximityProps {
  label: string;
  fromFontVariationSettings: string;
  toFontVariationSettings: string;
  containerRef: React.RefObject<HTMLElement | null>;
  radius?: number;
  falloff?: "linear" | "exponential" | "gaussian";
  style?: React.CSSProperties;
  className?: string;
}

export default function VariableProximity({
  label,
  fromFontVariationSettings,
  toFontVariationSettings,
  containerRef,
  radius = 120,
  falloff = "linear",
  style,
  className,
}: VariableProximityProps) {
  const [mouse, setMouse] = useState<{ x: number; y: number } | null>(null);
  const spanRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const onMove = useCallback((e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY }), []);
  const onLeave = useCallback(() => setMouse(null), []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [containerRef, onMove, onLeave]);

  const from = parseFVS(fromFontVariationSettings);
  const to = parseFVS(toFontVariationSettings);

  function fvs(i: number) {
    if (!mouse) return fromFontVariationSettings;
    const span = spanRefs.current[i];
    if (!span) return fromFontVariationSettings;
    const rect = span.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dist = Math.hypot(mouse.x - cx, mouse.y - cy);
    if (dist >= radius) return fromFontVariationSettings;
    const t = getFalloff(dist, radius, falloff);
    const interpolated: Record<string, number> = {};
    for (const axis in from) {
      interpolated[axis] = lerp(from[axis], to[axis] ?? from[axis], t);
    }
    return formatFVS(interpolated);
  }

  return (
    <span style={style} className={className}>
      {label.split("").map((char, i) => (
        <span
          key={i}
          ref={(el) => { spanRefs.current[i] = el; }}
          style={{
            display: "inline-block",
            fontVariationSettings: fvs(i),
            transition: "font-variation-settings 0.08s ease-out",
            whiteSpace: char === " " ? "pre" : undefined,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
