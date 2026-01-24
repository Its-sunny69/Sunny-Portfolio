import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

export default function Testing({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const radius = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 300, damping: 30 });
  const smoothRadius = useSpring(radius, { stiffness: 300, damping: 30 });

  //Radial gradient mask that follows cursor
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
