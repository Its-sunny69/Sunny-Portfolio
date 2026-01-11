import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

const CustomCursor = ({ cursorDisplay }: { cursorDisplay: boolean }) => {
  const [isHovering, setIsHovering] = useState(false);

  const cursorSize = 16;
  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const smoothOptions = { stiffness: 250, damping: 20 };
  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions),
  };

  const handleCursor = (e: MouseEvent): void => {
    const { clientX, clientY } = e;
    const target = e.target as HTMLElement;

    const hoverElement = target.closest("[data-cursor-hover='true']");
    setIsHovering(!!hoverElement);

    mouse.x.set(clientX - cursorSize / 2 + 5);
    mouse.y.set(clientY - cursorSize / 2 - 10);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleCursor);

    return () => {
      window.removeEventListener("mousemove", handleCursor);
    };
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed z-[999] h-4 w-4 rounded-full bg-white mix-blend-difference"
      initial={{ scale: 0, opacity: 0 }}
      animate={
        isHovering && cursorDisplay
          ? { scale: 10, opacity: 0.9, mixBlendMode: "difference" }
          : { scale: cursorDisplay ? 1 : 0, opacity: 1 }
      }
      exit={{ scale: 0, opacity: 0 }}
      transition={{
        duration: 0.25,
      }}
      style={{
        left: smoothMouse.x,
        top: smoothMouse.y,
      }}
    ></motion.div>
  );
};

export default CustomCursor;
