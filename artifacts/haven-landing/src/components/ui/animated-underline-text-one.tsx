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
      className,
      style,
      ...props
    },
    forwardedRef
  ) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const lineControls = useAnimation();
    const textControls = useAnimation();
    const [triggered, setTriggered] = React.useState(false);

    // Scroll-position polling — reliable in all iframe/preview contexts
    React.useEffect(() => {
      const check = () => {
        const el = containerRef.current;
        if (!el || triggered) return;
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.88) {
          setTriggered(true);
        }
      };
      check();
      window.addEventListener("scroll", check, { passive: true });
      return () => window.removeEventListener("scroll", check);
    }, [triggered]);

    // Sequence: text fade-up → line draws → line swings forever
    React.useEffect(() => {
      if (!triggered) return;

      const run = async () => {
        // 1. Fade text up
        await textControls.start({
          y: 0,
          opacity: 1,
          transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
        });

        // 2. Draw the underline
        await lineControls.start({
          pathLength: 1,
          opacity: 1,
          transition: { duration: underlineDuration, ease: "easeInOut" },
        });

        // 3. Swing forever
        lineControls.start({
          d: underlineHoverPath,
          transition: { duration: 0.9, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
        });
      };

      run();
    }, [triggered, lineControls, textControls, underlineDuration, underlineHoverPath]);

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

          {/* Text */}
          <motion.h2
            className={cn("font-bold text-center", textClassName)}
            style={{ margin: 0 }}
            animate={textControls}
            initial={{ y: 14, opacity: 0 }}
          >
            {text}
          </motion.h2>

          {/* Underline — draws then swings */}
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
