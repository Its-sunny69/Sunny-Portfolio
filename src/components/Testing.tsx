import { motion, useMotionValue, useAnimationFrame } from "motion/react";
import { useState, useRef } from "react";

const items = ["a", "b", "c", "d", "e", "f", "g"];
const ITEM_WIDTH = 208; // w-52 = 13rem = 208px

export default function Testing() {
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const trackRef = useRef(null);

  // velocity in px/sec
  const velocity = isHovered ? 80 : 160;

  useAnimationFrame((_, delta) => {
    const moveBy = (velocity * delta) / 1000;
    x.set(x.get() - moveBy);

    const halfWidth = items.length * ITEM_WIDTH;

    // seamless reset
    if (x.get() <= -halfWidth) {
      x.set(0);
    }
  });

  return (
    <div className="flex h-screen w-full items-center overflow-hidden">
      <div
        className="w-full overflow-hidden border p-1"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          ref={trackRef}
          className="flex"
          style={{ x, width: "max-content" }}
        >
          {[...items, ...items].map((item, idx) => (
            <div
              key={idx}
              className="flex h-24 w-52 shrink-0 items-center justify-center border"
            >
              {item}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
