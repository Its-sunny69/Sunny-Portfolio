import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

// Reveal content in a circular area following the cursor
export default function RevealingText({
  children,
  className,
  style,
  HoverMe = false,
  textOrientation = "normal",
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  HoverMe?: boolean;
  textOrientation?: "sideways" | "normal";
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const radius = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 300, damping: 30 });
  const smoothRadius = useSpring(radius, { stiffness: 300, damping: 30 });

  // Create radial gradient mask that follows cursor
  const maskImage = useTransform(
    [smoothX, smoothY, smoothRadius],
    ([x, y, r]) =>
      `radial-gradient(circle ${r}px at ${x}px ${y}px, black 0%, transparent 100%)`,
  );

  useEffect(() => {
    radius.set(isHovering ? 80 : 0);
  }, [isHovering, radius]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <div
      ref={containerRef}
      className={`${className} flex items-center justify-center`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Revealed content layer with mask */}
      {HoverMe && (
        <motion.p
          className="pointer-events-none absolute text-neutral-700"
          initial={{ opacity: 1 }}
          animate={{ opacity: isHovering ? 0 : 1 }}
          transition={{ duration: 0.2 }}
          style={{
            textOrientation:
              textOrientation === "sideways" ? "sideways" : "initial",
            writingMode:
              textOrientation === "sideways" ? "sideways-lr" : "initial",
          }}
        >
          Hover Me
        </motion.p>
      )}
      <motion.div
        className="pointer-events-none h-full w-full p-16"
        style={{
          maskImage,
          WebkitMaskImage: maskImage,
          ...style,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovering ? 0.4 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
