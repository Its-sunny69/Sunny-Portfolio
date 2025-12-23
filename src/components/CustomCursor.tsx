import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect } from "react";

const CustomCursor = ({ cursorDisplay } : { cursorDisplay: boolean }) => {
  const cursorSize = 16;
  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const smoothOptions = { stiffness: 250, damping: 20, };
  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions),
  };

  const handleCursor = (e: MouseEvent): void => {
    const { clientX, clientY } = e;

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
      className="pointer-events-none fixed h-4 w-4 rounded-full bg-blue-400 z-[999]"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: cursorDisplay ? 1 : 0, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{
        duration: 0.1,
      }}
      style={{
        left: smoothMouse.x,
        top: smoothMouse.y,
      }}
    ></motion.div>
  );
}

export default CustomCursor;