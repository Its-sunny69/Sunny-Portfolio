import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import LabelDetailCard from "./LabelDetailCard";
import useOutsideClick from "@/utlis/useOutsideClicks";
import LabelSvg from "./LabelSvg";

type Direction = "right" | "left";
type Orientation = "up" | "down";

type Data = {
  title: string;
  description: string;
  codeSnippet: string;
};

interface LabelProps {
  direction: Direction;
  orientation: Orientation;
  length?: number;
  LabelClassName?: string;
}

type DeveloperDetailsProps = {
  className: string;
  LabelProps?: LabelProps;
  data: Data;
};

export default function DeveloperDetails({
  className = "",
  LabelProps = { direction: "left", orientation: "up" },
  data,
}: DeveloperDetailsProps) {
  const [isDetailCardOpen, setIsDetailCardOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  const detailCardRef = useOutsideClick(() => setIsDetailCardOpen(false));

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 640);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <motion.div
      className={`${className} flex justify-center text-white ${LabelProps.orientation == "up" ? "items-start" : "items-end"} ${LabelProps.direction == "right" ? "flex-row-reverse" : ""}`}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="scroll-bar max-h-80 min-h-36 max-w-80 min-w-64 overflow-auto rounded-lg border border-neutral-700/50"
        initial={{
          opacity: 0,
          boxShadow: "0 0px 16px rgba(225,225,225,0)",
          backdropFilter: "blur(0px)",
        }}
        animate={{
          opacity: 1,
          boxShadow: "0 0px 16px rgba(225,225,225,0.2)",
          backdropFilter: "blur(24px)",
        }}
        transition={{ duration: 0.4, delay: 1.2, ease: "easeInOut" }}
      >
        <div className="flex items-center justify-between gap-2 bg-neutral-950/50 p-4">
          <h1 className="text-sm">{data.title}</h1>
          <button
            className="cursor-pointer rounded-lg bg-white px-2 py-1 text-black transition-all hover:bg-gray-200 active:scale-95"
            onClick={() => setIsDetailCardOpen(true)}
          >
            View Code
          </button>
        </div>

        <hr className="h-[1px] border-none bg-transparent" />

        <p
          className="bg-neutral-950/50 px-4 py-3 leading-relaxed whitespace-pre-wrap"
          dangerouslySetInnerHTML={{
            __html: data.description.replace(/\n/g, "<br />"),
          }}
        />
      </motion.div>

      {!isMobileView && <LabelSvg {...LabelProps} />}

      <AnimatePresence>
        {isDetailCardOpen && (
          <motion.div
            className="fixed inset-0 z-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "backOut" }}
          >
            <LabelDetailCard data={data} ref={detailCardRef} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
