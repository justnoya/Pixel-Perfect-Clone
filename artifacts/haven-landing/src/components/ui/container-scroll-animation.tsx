import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import type { MotionValue } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
  externalProgress,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
  externalProgress?: MotionValue<number>;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: internalProgress } = useScroll({ target: containerRef });

  const progress = externalProgress ?? internalProgress;

  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const rotate   = useTransform(progress, [0, 1], [20, 0]);
  const scale    = useTransform(progress, [0, 1], isMobile ? [0.7, 0.9] : [1.05, 1]);
  const translate = useTransform(progress, [0, 1], [0, -60]);

  return (
    <div ref={containerRef} className="flex items-center justify-center w-full" style={{ perspective: "1000px" }}>
      <div className="w-full">
        <ScrollHeader translate={translate}>{titleComponent}</ScrollHeader>
        <ScrollCard rotate={rotate} scale={scale}>{children}</ScrollCard>
      </div>
    </div>
  );
};

function ScrollHeader({ translate, children }: { translate: MotionValue<number>; children: React.ReactNode }) {
  return (
    <motion.div style={{ translateY: translate }} className="max-w-4xl mx-auto text-center mb-6 md:mb-10">
      {children}
    </motion.div>
  );
}

function ScrollCard({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="max-w-4xl -mt-4 mx-auto w-full border border-white/10 p-3 md:p-6 bg-black/30 rounded-[24px] shadow-2xl backdrop-blur-sm"
    >
      <div className="h-full w-full overflow-hidden rounded-[16px] bg-white/5 md:p-4">
        {children}
      </div>
    </motion.div>
  );
}
