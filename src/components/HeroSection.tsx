import {
  AnimatePresence,
  motion,
  useAnimate,
  type AnimationSequence,
} from "motion/react";
import heroImage from "@/assets/mountain3.jpg";
import { useContext, useEffect, useRef, useState } from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import RevealingText from "./RevealingText";
import TypingAnimation from "./TypingAnimation";
import DeveloperDetails from "./DeveloperDetails";
import { DeveloperContext } from "@/context/developerContext";
import { useTheme } from "next-themes";
import { heroSectionDeveloperdata } from "@/data/developerDetailsData";

type Cursor = {
  x: number;
  y: number;
};

export default function HeroSection() {
  const [followButton, setFollowButton] = useState(false);
  const [detailList, setdetailList] = useState({
    imageDetail: false,
    textDetail: false,
  });
  const [gradientBackground, setGradientBackground] = useState({
    initial:
      "linear-gradient(162deg,rgba(255, 255, 255, 1) 100%, rgba(0, 0, 0, 1) 100%)",
    animate:
      "linear-gradient(162deg,rgba(255, 255, 255, 1) 34%, rgba(0, 0, 0, 1) 83%)",
  });
  const [cursor, setCursor] = useState<Cursor>({ x: 0, y: 0 });
  const scrollRef = useRef(null);

  const [scope, animation] = useAnimate();
  const { developerMode } = useContext(DeveloperContext);
  const { theme } = useTheme();

  const handleCursor = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCursor({ x, y });
  };

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

  useEffect(() => {
    if (theme === "light") {
      setGradientBackground({
        initial:
          "linear-gradient(162deg,rgba(0, 0, 0, 1) 100%, rgba(255, 255, 255, 1) 100%)",
        animate:
          "linear-gradient(162deg,rgba(0, 0, 0, 1) 20%, rgba(255, 255, 255, 1) 81%)",
      });
    } else {
      setGradientBackground({
        initial:
          "linear-gradient(162deg,rgba(255, 255, 255, 1) 100%, rgba(0, 0, 0, 1) 100%)",
        animate:
          "linear-gradient(162deg,rgba(255, 255, 255, 1) 34%, rgba(0, 0, 0, 1) 83%)",
      });
    }
  }, [theme]);

  const HandleDetailClick = (key: keyof typeof detailList) => {
    setdetailList((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  return (
    <div className="relative px-2 md:px-8">
      <div className="grid grid-rows-2 gap-8 py-4 md:grid-cols-7 md:grid-rows-1 md:gap-0">
        <div
          ref={scope}
          className="relative row-span-1 flex items-center justify-center md:col-span-3"
        >
          <RevealingText className="absolute top-0 -left-10 text-sm lg:left-0 lg:text-base">
            <p
              style={{
                textOrientation: "sideways",
                writingMode: "sideways-lr",
                pointerEvents: "none",
              }}
            >
              I took this pic specially for portfolio :&#41;
            </p>
          </RevealingText>

          <div
            className="relative flex cursor-none md:h-[31rem] lg:h-[33rem]"
            onMouseMove={(e) => handleCursor(e)}
            onMouseEnter={() => setFollowButton(true)}
            onMouseLeave={() => setFollowButton(false)}
            data-cursor-hover="true"
          >
            <motion.div
              style={{
                backgroundImage: `url(${heroImage.src})`,
                backgroundSize: "400% 100%",
                backgroundPosition: "0% 50%",
              }}
              initial={{ opacity: 0 }}
              className="img-part-1 img-part h-[26rem] w-16 bg-no-repeat lg:h-[33rem] lg:w-20"
            ></motion.div>
            <motion.div
              style={{
                backgroundImage: `url(${heroImage.src})`,
                backgroundSize: "400% 100%",
                backgroundPosition: "33.33% 50%",
              }}
              initial={{ y: 20, opacity: 0 }}
              className="img-part-2 h-[26rem] w-16 bg-no-repeat lg:h-[33rem] lg:w-20"
            ></motion.div>
            <motion.div
              style={{
                backgroundImage: `url(${heroImage.src})`,
                backgroundSize: "400% 100%",
                backgroundPosition: "66.66% 50%",
              }}
              initial={{ y: -20, opacity: 0 }}
              className="img-part-3 h-[26rem] w-16 bg-no-repeat lg:h-[33rem] lg:w-20"
            ></motion.div>
            <motion.div
              style={{
                backgroundImage: `url(${heroImage.src})`,
                backgroundSize: "400% 100%",
                backgroundPosition: "100% 50%",
              }}
              initial={{ opacity: 0 }}
              className="img-part-4 img-part h-[26rem] w-16 bg-no-repeat lg:h-[33rem] lg:w-20"
            ></motion.div>

            <AnimatePresence>
              {followButton && (
                <motion.button
                  className="group pointer-events-none absolute rounded-full px-4 py-2 text-xs text-neutral-950 backdrop-blur-lg dark:text-white"
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
                    className="h-[0.7px] w-0 bg-neutral-700 transition-all duration-200 ease-out"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.3, ease: "easeOut", delay: 0.2 }}
                  ></motion.div>
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {developerMode && (
            <>
              <button
                className="absolute -top-8 left-10 flex cursor-pointer hover:opacity-75 md:right-20 lg:top-0"
                onClick={() => HandleDetailClick("imageDetail")}
              >
                <motion.p
                  initial={{ x: 0, color: "#22c55e" }}
                  animate={
                    detailList.imageDetail
                      ? { x: -5, color: "#ef4444" }
                      : { x: 0, color: "#22c55e" }
                  }
                  transition={{ duration: 0.2 }}
                >
                  [
                </motion.p>
                <motion.p className="mx-1">1</motion.p>
                <motion.p
                  initial={{ x: 0, color: "#22c55e" }}
                  animate={
                    detailList.imageDetail
                      ? { x: 5, color: "#ef4444" }
                      : { x: 0, color: "#22c55e" }
                  }
                  transition={{ duration: 0.2 }}
                >
                  ]
                </motion.p>
              </button>

              <AnimatePresence>
                {developerMode && detailList.imageDetail && (
                  <DeveloperDetails
                    className="absolute top-8 left-8 z-70 text-xs md:left-[80%]"
                    data={heroSectionDeveloperdata.imageDetial}
                    LabelProps={{
                      direction: "right",
                      orientation: "up",
                    }}
                  />
                )}
              </AnimatePresence>
            </>
          )}
        </div>

        <motion.div className="relative row-span-1 md:col-span-4">
          <TypingAnimation text="I am" delay={2.8} />

          <motion.p
            className="font-36days text-[4rem] text-transparent lg:text-[7.5rem]"
            data-cursor-hover="true"
            initial={{
              background: gradientBackground.initial,
              backgroundClip: "text",
              opacity: 0,
            }}
            animate={{
              background: gradientBackground.animate,
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

          {developerMode && (
            <>
              <button
                className="absolute -top-5 left-10 flex cursor-pointer hover:opacity-75 md:left-0 lg:top-15 lg:-left-7"
                onClick={() => HandleDetailClick("textDetail")}
              >
                <motion.p
                  initial={{ x: 0, color: "#22c55e" }}
                  animate={
                    detailList.textDetail
                      ? { x: -5, color: "#ef4444" }
                      : { x: 0, color: "#22c55e" }
                  }
                  transition={{ duration: 0.2 }}
                >
                  [
                </motion.p>
                <motion.p className="mx-1">2</motion.p>
                <motion.p
                  initial={{ x: 0, color: "#22c55e" }}
                  animate={
                    detailList.textDetail
                      ? { x: 5, color: "#ef4444" }
                      : { x: 0, color: "#22c55e" }
                  }
                  transition={{ duration: 0.2 }}
                >
                  ]
                </motion.p>
              </button>

              <AnimatePresence>
                {developerMode && detailList.textDetail && (
                  <DeveloperDetails
                    className="absolute top-5 left-8 text-xs md:-left-[63%] lg:top-21"
                    data={heroSectionDeveloperdata.textDetail}
                    LabelProps={{
                      direction: "left",
                      orientation: "up",
                    }}
                  />
                )}
              </AnimatePresence>
            </>
          )}

          <TypingAnimation
            text="a Frontend Developer"
            className="text-right"
            delay={5.8}
          />

          <div
            className="mt-14 text-center text-xl md:text-start lg:text-2xl"
            data-cursor-hover="true"
          >
            <TypingAnimation
              text="Every scroll reveals a chapter — walk through my journey and see how it all began."
              delay={7}
            />
          </div>

          <RevealingText className="absolute right-0 bottom-8 text-sm md:bottom-15 lg:bottom-0 lg:text-base">
            <div>
              <p>Not a topper, not a high-IQ genius</p>
              <p className="ml-8">
                — just an ordinary guy with an imagination that refused to stay
                small.
              </p>
            </div>
          </RevealingText>
        </motion.div>

        <motion.a
          ref={scrollRef}
          href="#project-section"
          title="scroll down"
          className="hover:border-hover hover:text-hover absolute bottom-0 left-1/2 flex w-fit -translate-x-1/2 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-black px-4 py-2 text-sm md:bottom-8 dark:border-white"
          initial={{ display: "hidden", opacity: 0 }}
          animate={{ display: "flex", opacity: 1 }}
          transition={{ duration: 0.3, delay: 11.8, ease: "easeInOut" }}
        >
          <p className="mr-2">scroll</p>
          <ArrowDownwardIcon fontSize="small" className="animate-bounce" />
        </motion.a>
      </div>
    </div>
  );
}
