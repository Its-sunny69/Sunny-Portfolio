import {
  AnimatePresence,
  MotionValue,
  useMotionValueEvent,
  motion,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

export default function ProgressCounter({
  value,
}: {
  value: MotionValue<number>;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const prevValueRef = useRef(0);

  useMotionValueEvent(value, "change", (latest) => {
    const newValue = Math.round(latest as number);
    setDisplayValue(newValue);
  });

  // Calculate scroll direction based on previous and current value
  const scrollDirection = displayValue > prevValueRef.current ? "down" : "up";

  // Update ref after render
  useEffect(() => {
    prevValueRef.current = displayValue;
  }, [displayValue]);

  // Pad to 3 digits (000 to 100)
  const paddedValue = displayValue.toString().padStart(3, "0");
  const digits = paddedValue.split("");

  return (
    <div className="flex items-center justify-center">
      {digits.map((digit, index) => (
        <AnimatePresence mode="wait" key={index}>
          <motion.span
            key={`${digit}-${index}`}
            initial={{ opacity: 0, y: scrollDirection === "down" ? 10 : -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: scrollDirection === "down" ? -10 : 10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="inline-block w-3 text-center"
          >
            {digit}
          </motion.span>
        </AnimatePresence>
      ))}
    </div>
  );
}
