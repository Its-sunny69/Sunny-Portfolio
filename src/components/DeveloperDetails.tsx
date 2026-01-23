import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import LabelDetailCard from "./LabelDetailCard";
import useOutsideClick from "@/utlis/useOutsideClicks";
import { Description } from "@mui/icons-material";
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

  const Dummydata = {
    title: "Animated Gradient Text",
    description:
      "How it's created:\n\n• Uses Framer Motion's <code class='code'>motion.p</code> component\n• Text is set to <code class='code'>text-transparent</code> with gradient applied via <code class='code'>background</code> property\n• <code class='code'>backgroundClip: 'text'</code> clips the gradient to text shape only\n\nAnimation Logic:\n\n• Initial: Gradient fully white, opacity 0 (invisible)\n• Animated: Gradient shifts from white (34%) to black (83%), <code class='code'>opacity: 1</code>\n• Timing: 3.3s <code class='code'>delay</code>, 2s <code class='code'>duration</code>, <code class='code'>easeInOut</code> easing\n\nResult: Text fades in with smooth gradient sweep creating elegant reveal effect",
    codeSnippet: ` <motion.p
    className="font-36days text-[7.5rem] text-transparent"
    data-cursor-hover="true"
    initial={{
        background: "linear-gradient(162deg,rgba(255, 255, 255, 1) 100%, rgba(0, 0, 0, 1) 100%)",
        backgroundClip: "text",
        opacity: 0,
    }}
    animate={{
        background: "linear-gradient(162deg,rgba(255, 255, 255, 1) 34%, rgba(0, 0, 0, 1) 83%)",
        opacity: 1,
    }}
    transition={{
        delay: 3.3,
        duration: 2,
        ease: "easeInOut",
    }}
>
    Sunny Yadav
</motion.p>
            `,
  };

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
          <p className="text-sm">{data.title}</p>
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
