import { motion } from "motion/react";

export default function NameSvg() {
  return (
    <div className="w-44">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="-0.1 -1.1 16.2 7.2"
        style={{ shapeRendering: 'geometricPrecision' }}
      >
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3.5, ease: "easeInOut" }}
          d="M 4 1 A 1 1 0 0 0 0 1 C 0 3 3 2 3 3 M 0 3 A 1 1 0 0 0 4 3 C 4 1 1 2 1 1 M 0 3 L 1 3 A 1 1 0 0 0 3 3 M 4 1 L 3 1 A 1 1 0 0 0 1 1"
          stroke="#fff"
          strokeWidth="0.15"
          fill="none"
        />
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3.5, ease: "easeInOut" }}
          d="M 3 0 V 3 A 1 1 0 0 0 7 3 V 0 L 6 0 V 3 M 4 0 V 3 A 1 1 0 0 0 6 3 M 3 0 L 4 0"
          stroke="#fff"
          strokeWidth="0.15"
          fill="none"
        />
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3.5, ease: "easeInOut" }}
          d="M 6 0 M 6 0 L 6 5 L 7 5 V 2 L 9 5 L 10 5 V 0 L 9 0 V 3 L 7 0 L 6 0"
          stroke="#fff"
          strokeWidth="0.15"
          fill="none"
        />
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3.5, ease: "easeInOut" }}
          d="M 13 2 A 1 1 0 0 0 9 2 M 13 2 V 5 L 12 5 V 2 A 1 1 0 0 0 10 2 V 5 L 9 5 V 2"
          stroke="#fff"
          strokeWidth="0.15"
          fill="none"
        />
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3.5, ease: "easeInOut" }}
          d="M 11 0 A 1 1 0 0 0 16 0 V 6 L 15 6 V 0 L 16 0 M 12 0 A 1 1 0 0 0 15 0 M 12 0 L 11 0"
          stroke="#fff"
          strokeWidth="0.15"
          fill="none"
        />
      </svg>
    </div>
  );
}
