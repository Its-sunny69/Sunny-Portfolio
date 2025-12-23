import { motion } from "motion/react";

export default function Testing() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="h-80 w-full overflow-hidden border border-green-400">
        <div className="relative h-56 w-full borde border-white bg-black flex justify-center">
          Testing Component
          <motion.div className="absolute -top-[600%] -z-50 aspect-square w-[120%] rounded-full border border-none bg-transparent"
          initial={{ boxShadow: "0px 0px 0px 0px rgba(255,255,255,0.75)" }}
          animate={{ boxShadow: "0px 5px 80px 10px rgba(255,255,255,0.75)" }}
          transition={{ duration: 2, ease: "circOut" }}
          ></motion.div>
        </div>
      </div>
    </div>
  );
}
