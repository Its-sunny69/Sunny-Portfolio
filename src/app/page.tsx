"use client";

import Contact from "@/components/Contact";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import NameSvg from "@/components/NameSvg";
import Navbar from "@/components/Navbar";
import ProgressCounter from "@/components/ProgressCounter";
import ProjectSection from "@/components/ProjectSection";
import ProjectSection2 from "@/components/ProjectSection2";
import SkillsSection from "@/components/SkillsSection";
import StoryTimeline from "@/components/StoryTimeline";
import {
  AnimatePresence,
  AnimationSequence,
  motion,
  useAnimate,
  useMotionValue,
  useScroll,
  useTransform,
  useAnimationFrame,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import KeyboardDoubleArrowUpRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowUpRounded";
import { useTheme } from "next-themes";

export default function Home() {
  const [cursorDisplay, setCursorDisplay] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [scope, animation] = useAnimate();
  const [isHovered, setIsHovered] = useState(false);
  const rotationValue = useMotionValue(0);
  const progressDiv = useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWidth] = useState(0);
  const [progressWidth, setProgressWidth] = useState(0);

  const { scrollYProgress } = useScroll();
  const { theme } = useTheme();

  const rotationVelocity = isHovered ? 45 : 90;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useAnimationFrame((_, delta) => {
    const rotationIncrement = (rotationVelocity * delta) / 1000;
    rotationValue.set(rotationValue.get() + rotationIncrement);
  });

  const xProgress = useTransform(
    scrollYProgress,
    [0, 1],
    [0, Math.max(0, windowWidth - progressWidth - 75)],
  );
  const progressCounter = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const loadingSequence: AnimationSequence = [
    [
      ".loading",
      { scale: 1.5, opacity: 1 },
      { duration: 4.5, ease: "easeInOut" },
    ],
    [
      ".loading",
      { maskImage: "linear-gradient(90deg, black 0%, transparent 0%)" },
      { duration: 1, ease: "easeInOut" },
    ],
    [
      ".title-odd",
      { opacity: 0.3 },
      { duration: 1, ease: "easeInOut", at: "-2" },
    ],
    [".title-even", { opacity: 0.2 }, { duration: 1, ease: "easeInOut" }],
    [".title-odd", { opacity: 0.1 }, { duration: 1, ease: "easeInOut" }],
    [".title-even", { opacity: 0.3 }, { duration: 1, ease: "easeInOut" }],
    [".title", { opacity: 1 }, { duration: 1, ease: "easeInOut" }],
    [".title", { opacity: 0 }, { duration: 1, ease: "easeInOut", at: "1" }],
  ];

  // useEffect(() => {
  //   const runAnimation = async () => {
  //     await animation(loadingSequence);
  //     setTimeout(() => {
  //       setIsLoading(false);
  //     }, 500);
  //   };

  //   runAnimation();
  // }, []);

  const sentence = "Custom-crafted animations, built line by line.";
  const words = sentence.split(" ");

  let letterIndex = 0;

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    if (progressDiv.current) {
      setProgressWidth(progressDiv.current.offsetWidth);
    }

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isLoading) {
    return (
      <motion.div
        ref={scope}
        className="relative flex h-screen w-full flex-col items-center justify-center bg-white dark:bg-neutral-950"
      >
        <motion.div
          className="loading mb-2"
          initial={{
            scale: 1.45,
            opacity: 0,
            maskImage: "linear-gradient(90deg, black 100%, transparent 100%)",
          }}
        >
          {isMounted && (
            <NameSvg strokeColor={theme === "light" ? "#000" : "#fff"} />
          )}
        </motion.div>

        <motion.p className="font-36days absolute flex w-fit flex-wrap items-center justify-center">
          {words.map((word, wordIndex) => (
            <span key={wordIndex} className="mx-2">
              {word.split("").map((letter, index) => {
                const currentIndex = letterIndex++;
                return (
                  <motion.span
                    key={index}
                    className={`title ${currentIndex % 2 === 0 ? "title-odd" : "title-even"} mx-1`}
                    initial={{ opacity: 0 }}
                  >
                    {letter}
                  </motion.span>
                );
              })}
            </span>
          ))}
        </motion.p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="relative overflow-x-clip"
      initial={{
        background: "linear-gradient(to right, #ffffff 0%, #000000 0%)",
      }}
      animate={{
        background:
          theme === "light"
            ? [
                "linear-gradient(135deg, #ffffff 0%, #828282 0%, #000000 0%)",
                "linear-gradient(135deg, #ffffff 0%, #828282 2%, #000000 5%)",
                "linear-gradient(135deg, #ffffff 0%, #828282 5%, #000000 10%)",
                "linear-gradient(135deg, #ffffff 0%, #828282 10%, #000000 15%)",
                "linear-gradient(135deg, #ffffff 0%, #828282 15%, #000000 25%)",
                "linear-gradient(135deg, #ffffff 2%, #828282 20%, #000000 35%)",
                "linear-gradient(135deg, #ffffff 5%, #828282 30%, #000000 50%)",
                "linear-gradient(135deg, #ffffff 10%, #828282 40%, #000000 60%)",
                "linear-gradient(135deg, #ffffff 15%, #828282 50%, #000000 70%)",
                "linear-gradient(135deg, #ffffff 25%, #828282 60%, #000000 80%)",
                "linear-gradient(135deg, #ffffff 35%, #828282 70%, #000000 90%)",
                "linear-gradient(135deg, #ffffff 50%, #828282 80%, #000000 95%)",
                "linear-gradient(135deg, #ffffff 60%, #828282 90%, #000000 100%)",
                "linear-gradient(135deg, #ffffff 75%, #828282 95%, #000000 100%)",
                "linear-gradient(135deg, #ffffff 100%, #828282 100%, #000000 100%)",
              ]
            : [
                "linear-gradient(135deg, #ffffff 100%, #828282 100%, #000000 100%)",
                "linear-gradient(135deg, #ffffff 75%, #828282 95%, #000000 100%)",
                "linear-gradient(135deg, #ffffff 60%, #828282 90%, #000000 100%)",
                "linear-gradient(135deg, #ffffff 50%, #828282 80%, #000000 95%)",
                "linear-gradient(135deg, #ffffff 35%, #828282 70%, #000000 90%)",
                "linear-gradient(135deg, #ffffff 25%, #828282 60%, #000000 80%)",
                "linear-gradient(135deg, #ffffff 15%, #828282 50%, #000000 70%)",
                "linear-gradient(135deg, #ffffff 10%, #828282 40%, #000000 60%)",
                "linear-gradient(135deg, #ffffff 5%, #828282 30%, #000000 50%)",
                "linear-gradient(135deg, #ffffff 2%, #828282 20%, #000000 35%)",
                "linear-gradient(135deg, #ffffff 0%, #828282 15%, #000000 25%)",
                "linear-gradient(135deg, #ffffff 0%, #828282 10%, #000000 15%)",
                "linear-gradient(135deg, #ffffff 0%, #828282 5%, #000000 10%)",
                "linear-gradient(135deg, #ffffff 0%, #828282 2%, #000000 5%)",
                "linear-gradient(135deg, #ffffff 0%, #828282 0%, #000000 0%)",
              ],
      }}
      transition={{
        duration: 0.5,
        ease: "linear",
      }}
    >
      <motion.div
        key="progress-bar"
        style={{
          x: xProgress,
        }}
        ref={progressDiv}
        className="sticky top-0 z-11 flex w-fit ![mask-image:none]"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
      >
        [<ProgressCounter value={progressCounter} />
        %]
      </motion.div>

      <div className="relative w-full flex-1">
        <motion.main
          className="relative z-10 min-h-screen w-full"
          initial={{
            background:
              theme === "light"
                ? "linear-gradient(to right, #ffffff 100%, #000000 100%)"
                : "linear-gradient(to right, #000000 0%, #ffffff 0%)",
          }}
          animate={{
            background:
              theme === "light"
                ? [
                    "linear-gradient(135deg, #ffffff 0%, #828282 0%, #000000 0%)",
                    "linear-gradient(135deg, #ffffff 0%, #828282 2%, #000000 5%)",
                    "linear-gradient(135deg, #ffffff 0%, #828282 5%, #000000 10%)",
                    "linear-gradient(135deg, #ffffff 0%, #828282 10%, #000000 15%)",
                    "linear-gradient(135deg, #ffffff 0%, #828282 15%, #000000 25%)",
                    "linear-gradient(135deg, #ffffff 2%, #828282 20%, #000000 35%)",
                    "linear-gradient(135deg, #ffffff 5%, #828282 30%, #000000 50%)",
                    "linear-gradient(135deg, #ffffff 10%, #828282 40%, #000000 60%)",
                    "linear-gradient(135deg, #ffffff 15%, #828282 50%, #000000 70%)",
                    "linear-gradient(135deg, #ffffff 25%, #828282 60%, #000000 80%)",
                    "linear-gradient(135deg, #ffffff 35%, #828282 70%, #000000 90%)",
                    "linear-gradient(135deg, #ffffff 50%, #828282 80%, #000000 95%)",
                    "linear-gradient(135deg, #ffffff 60%, #828282 90%, #000000 100%)",
                    "linear-gradient(135deg, #ffffff 75%, #828282 95%, #000000 100%)",
                    "linear-gradient(135deg, #ffffff 100%, #828282 100%, #000000 100%)",
                  ]
                : [
                    "linear-gradient(135deg, #ffffff 100%, #828282 100%, #000000 100%)",
                    "linear-gradient(135deg, #ffffff 75%, #828282 95%, #000000 100%)",
                    "linear-gradient(135deg, #ffffff 60%, #828282 90%, #000000 100%)",
                    "linear-gradient(135deg, #ffffff 50%, #828282 80%, #000000 95%)",
                    "linear-gradient(135deg, #ffffff 35%, #828282 70%, #000000 90%)",
                    "linear-gradient(135deg, #ffffff 25%, #828282 60%, #000000 80%)",
                    "linear-gradient(135deg, #ffffff 15%, #828282 50%, #000000 70%)",
                    "linear-gradient(135deg, #ffffff 10%, #828282 40%, #000000 60%)",
                    "linear-gradient(135deg, #ffffff 5%, #828282 30%, #000000 50%)",
                    "linear-gradient(135deg, #ffffff 2%, #828282 20%, #000000 35%)",
                    "linear-gradient(135deg, #ffffff 0%, #828282 15%, #000000 25%)",
                    "linear-gradient(135deg, #ffffff 0%, #828282 10%, #000000 15%)",
                    "linear-gradient(135deg, #ffffff 0%, #828282 5%, #000000 10%)",
                    "linear-gradient(135deg, #ffffff 0%, #828282 2%, #000000 5%)",
                    "linear-gradient(135deg, #ffffff 0%, #828282 0%, #000000 0%)",
                  ],
          }}
          transition={{
            duration: 0.5,
            ease: "linear",
          }}
        >
          <AnimatePresence>
            <CustomCursor cursorDisplay={cursorDisplay} />
          </AnimatePresence>

          <nav id="navbar-section">
            <Navbar />
          </nav>

          <section id="hero-section" className="mt-4 lg:min-h-screen">
            <HeroSection />
          </section>

          <section id="project-section" className="my-16 lg:min-h-screen">
            <ProjectSection />
            <ProjectSection2 />
          </section>

          <section id="skills-section" className="my-16 lg:min-h-screen">
            <SkillsSection />
          </section>

          <section id="story-section" className="my-16 lg:min-h-screen">
            <StoryTimeline />
          </section>

          <section id="contact-section" className="my-16 lg:min-h-screen">
            <Contact setCursorDisplay={setCursorDisplay} />
          </section>
        </motion.main>

        <footer
          id="footer-section"
          className="sticky bottom-0 z-5 mt-[29rem] w-full md:mt-[20rem] lg:mt-[29rem]"
        >
          <Footer />
        </footer>

        <div
          id="scroll-to-top"
          className="fixed bottom-0 left-15 z-10 flex h-24 w-24 cursor-pointer items-center justify-center overflow-hidden rounded-full text-neutral-700 dark:text-white"
        >
          <motion.div
            className="absolute rounded-full"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            style={{ rotate: rotationValue }}
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className="relative h-16 w-16">
              {"TO•THE•TOP•".split("").map((char, i) => {
                const totalChars = "TO•THE•TOP•".length;
                const angle = (360 / totalChars) * i;
                return (
                  <motion.div
                    key={i}
                    className="absolute flex h-full w-full items-center justify-center"
                    style={{
                      transform: `rotateZ(${angle}deg) translateY(-32px)`,
                      transformOrigin: "center center",
                    }}
                  >
                    <span className="text-xs font-medium">{char}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
          <KeyboardDoubleArrowUpRoundedIcon fontSize="large" />
        </div>
      </div>
    </motion.div>
  );
}
