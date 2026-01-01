import {
  AnimatePresence,
  motion,
  useAnimate,
  useInView,
  type AnimationSequence,
} from "motion/react";
import Image from "next/image";
import heroImage from "@/assets/mountain3.jpg";
import { useEffect, useRef, useState } from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

type Cursor = {
  x: number;
  y: number;
};

export default function HeroSection() {
  const [followButton, setFollowButton] = useState(false);

  const [cursor, setCursor] = useState<Cursor>({ x: 0, y: 0 });

  const scrollRef = useRef(null);

  const isInView = useInView(scrollRef);

  const handleCursor = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCursor({ x, y });
  };
  const [scope, animation] = useAnimate();

  const sequence: AnimationSequence = [
    [".img-part-2", { y: 0, opacity: 1 }, { duration: 1.5 }],
    [".img-part-3", { y: 0, opacity: 1 }, { duration: 1.5, at: "-1.5" }],
    [".img-part", { opacity: 1 }, { duration: 1.5 }],
    [
      ".img-part-1",
      {
        opacity: 1,
        maskImage:
          "radial-gradient(circle at top left, black 60%, transparent 90%)",
      },
      { duration: 1.5, at: "-2" },
    ],
    [
      ".img-part-4",
      {
        opacity: 1,
        maskImage:
          "radial-gradient(circle at bottom right, black 60%, transparent 90%)",
      },
      { duration: 1.5, at: "-2" },
    ],
  ];

  useEffect(() => {
    animation(sequence);
  }, []);

  return (
    <div className="relative px-8">
      <div className="grid grid-cols-7 py-4">
        <div
          ref={scope}
          className="col-span-3 flex items-center justify-center"
        >
          <div
            className="relative flex h-[33rem] cursor-none"
            onMouseMove={(e) => handleCursor(e)}
            onMouseEnter={() => setFollowButton(true)}
            onMouseLeave={() => setFollowButton(false)}
          >
            <motion.div
              style={{
                backgroundImage: `url(${heroImage.src})`,
                backgroundSize: "400% 100%",
                backgroundPosition: "0% 50%",
              }}
              initial={{ opacity: 0 }}
              className="img-part-1 img-part h-[33rem] w-20 bg-no-repeat"
            ></motion.div>
            <motion.div
              style={{
                backgroundImage: `url(${heroImage.src})`,
                backgroundSize: "400% 100%",
                backgroundPosition: "33.33% 50%",
              }}
              initial={{ y: 20, opacity: 0 }}
              className="img-part-2 h-[33rem] w-20 bg-no-repeat"
            ></motion.div>
            <motion.div
              style={{
                backgroundImage: `url(${heroImage.src})`,
                backgroundSize: "400% 100%",
                backgroundPosition: "66.66% 50%",
              }}
              initial={{ y: -20, opacity: 0 }}
              className="img-part-3 h-[33rem] w-20 bg-no-repeat"
            ></motion.div>
            <motion.div
              style={{
                backgroundImage: `url(${heroImage.src})`,
                backgroundSize: "400% 100%",
                backgroundPosition: "100% 50%",
              }}
              initial={{ opacity: 0 }}
              className="img-part-4 img-part h-[33rem] w-20 bg-no-repeat"
            ></motion.div>

            <AnimatePresence>
              {followButton && (
                <motion.button
                  className="group pointer-events-none absolute rounded-full px-4 py-2 text-xs text-white backdrop-blur-lg"
                  initial={{
                    scale: 0,
                    opacity: 0,
                    x: cursor.x - 160,
                    y: cursor.y - 0,
                  }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    x: cursor.x - 10,
                    y: cursor.y - 0,
                  }}
                  exit={{
                    scale: 0,
                    opacity: 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  Wanna talk? <OpenInNewIcon fontSize="inherit" />
                  <motion.div
                    className="h-[0.7px] w-0 bg-[#a4a4a4] transition-all duration-200 ease-out"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.3, ease: "easeOut", delay: 0.2 }}
                  ></motion.div>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="col-span-4">
          <p>I am</p>
          <motion.p
            className="font-36days text-[7.5rem] text-transparent"
            initial={{
              background:
                "linear-gradient(162deg,rgba(255, 255, 255, 1) 100%, rgba(0, 0, 0, 1) 100%)",
              backgroundClip: "text",
              opacity: 0,
            }}
            animate={{
              background:
                "linear-gradient(162deg,rgba(255, 255, 255, 1) 34%, rgba(0, 0, 0, 1) 83%)",
              opacity: 1,
            }}
            transition={{
              delay: 0.5,
              duration: 2,
              ease: "easeInOut",
            }}
          >
            Sunny Yadav
          </motion.p>
          <p className="text-right">a Frontend Developer</p>

          <p className="mt-14 text-2xl">
            Every scroll reveals a chapter — walk through my journey and see how
            it all began.
          </p>
        </div>

        <motion.a
          ref={scrollRef}
          href="#project-section"
          className="absolute bottom-8 left-1/2 flex w-fit -translate-x-1/2 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-white px-4 py-2 text-sm hover:border-[#a4a4a4] hover:text-[#a4a4a4]"
          initial={{ display: "hidden", opacity: 0 }}
          whileInView={{ display: "flex", opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <p className="mr-2">scroll</p>
          <ArrowDownwardIcon fontSize="small" className="animate-bounce" />
        </motion.a>
      </div>
    </div>
  );
}
