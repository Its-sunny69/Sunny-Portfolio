import {
  motion,
  useMotionValue,
  useAnimationFrame,
  useTransform,
  useSpring,
  AnimatePresence,
} from "motion/react";
import { useEffect, useState } from "react";

export default function RingText3D({
  ringText = "RING TEXT",
  ringRadius = 120,
  ClassNames = "",
  speed = 6000,
  onHoverSpeed = 16000,
  rotateX = -20,
  rotateZ = -30,
  initial = {},
  animate = {},
  exit = {},
  transition = {},
}: {
  ClassNames?: string;
  ringText?: string;
  ringRadius?: number;
  speed?: number;
  onHoverSpeed?: number;
  rotateX?: number;
  rotateZ?: number;
  initial?: React.ComponentProps<typeof motion.div>["initial"];
  animate?: React.ComponentProps<typeof motion.div>["animate"];
  exit?: React.ComponentProps<typeof motion.div>["exit"];
  transition?: React.ComponentProps<typeof motion.div>["transition"];
}) {
  const [isHovered, setIsHovered] = useState(false);

  const text = ringText;
  const radius = ringRadius;
  const charCount = text.length;

  const rotation = useMotionValue(0);

  const speedSpring = useSpring(speed, { damping: 40, stiffness: 200 });

  useEffect(() => {
    speedSpring.set(isHovered ? onHoverSpeed : speed);
  }, [isHovered, onHoverSpeed, speed, speedSpring]);

  useAnimationFrame((_, delta) => {
    // Calculate how much to rotate based on current speed
    const degPerMs = 360 / speedSpring.get();
    rotation.set(rotation.get() + degPerMs * delta);
  });

  return (
    <AnimatePresence>
      <motion.div
        className={`${ClassNames}`}
        style={{ perspective: 800 }}
        initial={initial}
        animate={animate}
        exit={exit}
        transition={transition}
      >
        <div
          className="font-36days cusrsor-pointer relative h-35 w-70 select-none"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${rotateX}deg) rotateZ(${rotateZ}deg)`,
            width: 2 * radius + 30,
            height: 2 * radius - 120,
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {text.split("").map((char, i) => {
            const angle = (360 / charCount) * i;
            const transform = useTransform(
              rotation,
              (r) =>
                `rotateY(${angle + r}deg) translateZ(${radius}px) translate(-50%, -50%)`,
            );
            return (
              <motion.span
                key={i}
                className="absolute top-[50%] left-[42%] text-[2rem] text-black lg:text-[3rem] dark:text-white"
                style={{
                  transform,
                  whiteSpace: "pre",
                }}
              >
                {char}
              </motion.span>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
