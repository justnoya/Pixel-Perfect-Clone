import * as React from "react";
import { motion, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedTextProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  textClassName?: string;
  underlineClassName?: string;
  underlinePath?: string;
  underlineHoverPath?: string;
  underlineDuration?: number;
  /** Fallback delay (ms) before animation plays if scroll never triggers */
  fallbackDelay?: number;
}

const AnimatedText = React.forwardRef<HTMLDivElement, AnimatedTextProps>(
  (
    {
      text,
      textClassName,
      underlineClassName,
      underlinePath = "M 0,10 Q 75,0 150,10 Q 225,20 300,10",
      underlineHoverPath = "M 0,10 Q 75,20 150,10 Q 225,0 300,10",
      underlineDuration = 1.2,
      fallbackDelay = 2800,
      className,
      style,
      ...props
    },
    forwardedRef
  ) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const lineControls = useAnimation();
    const [played, setPlayed] = React.useState(false);

    React.useEffect(() => {
      if (played) return;

      // Fallback timer — plays regardless of scroll detection
      const fallback = setTimeout(() => setPlayed(true), fallbackDelay);

      // IntersectionObserver — fires as soon as 1px is visible
      let observer: IntersectionObserver | null = null;
      if (containerRef.current) {
        observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              clearTimeout(fallback);
              setPlayed(true);
            }
          },
          { threshold: 0, rootMargin: "0px" }
        );
        observer.observe(containerRef.current);
      }

      return () => {
        clearTimeout(fallback);
        observer?.disconnect();
      };
    }, [played, fallbackDelay]);

    // Sequence: draw line → swing forever
    React.useEffect(() => {
      if (!played) return;
      const run = async () => {
        await lineControls.start({
          pathLength: 1,
          opacity: 1,
          transition: { duration: underlineDuration, ease: "easeInOut", delay: 0.1 },
        });
        lineControls.start({
          d: underlineHoverPath,
          transition: {
            duration: 0.85,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          },
        });
      };
      run();
    }, [played]);

    return (
      <div
        ref={(node) => {
          (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef)
            (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={cn("flex flex-col items-center justify-center", className)}
        style={style}
        {...props}
      >
        <div style={{ position: "relative", display: "inline-block", paddingBottom: 28 }}>

          {/* Text — always visible, no opacity or transform gate */}
          <h2
            className={cn("font-bold text-center", textClassName)}
            style={{ margin: 0, color: "white" }}
          >
            {text}
          </h2>

          {/* Underline — draws on scroll into view (or after fallbackDelay), then swings */}
          <svg
            width="100%"
            height="20"
            viewBox="0 0 300 20"
            style={{ position: "absolute", bottom: 0, left: 0, overflow: "visible" }}
            className={underlineClassName}
          >
            <motion.path
              d={underlinePath}
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={lineControls}
            />
          </svg>
        </div>
      </div>
    );
  }
);

AnimatedText.displayName = "AnimatedText";
export { AnimatedText };
