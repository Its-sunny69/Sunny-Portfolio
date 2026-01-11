import { motion } from "motion/react";

type Direction = "right" | "left";
type Orientation = "up" | "down";

interface LabelProps {
  direction: Direction;
  orientation: Orientation;
  length?: number;
  LabelClassName?: string;
  strokeColor?: string;
}

// Configuration object for better maintainability
const CONFIG = {
  baseWidth: 150,
  height: 120,
  baseViewBoxWidth: 200,
  viewBoxHeight: 100,
  startY: 50,
  upY: 25,
  downY: 75,
  startX: 10,
  endX: 180,
} as const;

export default function LabelSvg({
  direction,
  orientation,
  length = 0,
  LabelClassName = "",
  strokeColor = "white",
}: LabelProps) {
  const width = CONFIG.baseWidth + length;

  // Fix viewBox to accommodate left direction with increased length
  const viewBoxWidth =
    direction === "left"
      ? CONFIG.baseViewBoxWidth + length
      : CONFIG.baseViewBoxWidth + length;
  const viewBox = `0 0 ${viewBoxWidth} ${CONFIG.viewBoxHeight}`;

  // Calculate path coordinates based on direction and orientation
  const getPathData = (): string => {
    const isRight = direction === "right";
    const isUp = orientation === "up";

    if (isRight) {
      // Right direction: start from left, extend to right
      const startX = CONFIG.startX;
      const midX = 130 + length;
      const endX = CONFIG.endX + length;
      const endY = isUp ? CONFIG.upY : CONFIG.downY;
      return `M ${startX} ${CONFIG.startY} L ${midX} ${CONFIG.startY} L ${endX} ${endY}`;
    } else {
      // Left direction: start from right, extend to left
      const startX = CONFIG.endX + length;
      const midX = 70; // Keep consistent distance from right edge
      const endX = CONFIG.startX;
      const endY = isUp ? CONFIG.upY : CONFIG.downY;
      return `M ${startX} ${CONFIG.startY} L ${midX} ${CONFIG.startY} L ${endX} ${endY}`;
    }
  };

  // Calculate circle position based on direction
  const circleX = direction === "right" ? CONFIG.startX : CONFIG.endX + length;

  return (
    <svg
      width={width}
      height={CONFIG.height}
      viewBox={viewBox}
      className={`${LabelClassName}`}
    >
      {/* Circle at the start of the line */}
      <motion.circle
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        cx={circleX}
        cy={CONFIG.startY}
        r="6"
        fill={strokeColor}
      />
      <motion.path
        d={getPathData()}
        stroke={strokeColor}
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 1,
          ease: "easeInOut",
          delay: 0.2,
        }}
      />
    </svg>
  );
}
