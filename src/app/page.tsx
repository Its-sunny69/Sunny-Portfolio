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
import Testing from "@/components/Testing";
import { animateSequence } from "motion/mini";
import {
  AnimatePresence,
  AnimationSequence,
  motion,
  MotionValue,
  useAnimate,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { div } from "motion/react-client";
import { use, useEffect, useLayoutEffect, useRef, useState } from "react";

export default function Home() {
  const [cursorDisplay, setCursorDisplay] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [scope, animation] = useAnimate();
  const progressDiv = useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWidth] = useState(0);
  const [progressWidth, setProgressWidth] = useState(0);

  const { scrollYProgress } = useScroll();

  const xProgress = useTransform(
    scrollYProgress,
    [0, 1],
    [0, Math.max(0, windowWidth - progressWidth - 15)],
  );
  const progressCounter = useTransform(scrollYProgress, [0, 1], [0, 100]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    console.log("scrollYProgress:", latest);
    console.log("xProgress:", xProgress.get());
  });

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

  useEffect(() => {
    console.log("scrollYProgress:", scrollYProgress);
  }, [scrollYProgress]);

  useEffect(() => {
    // Set initial window width
    setWindowWidth(window.innerWidth);

    // Measure progress div width
    if (progressDiv.current) {
      setProgressWidth(progressDiv.current.offsetWidth);
    }

    // Update window width on resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const runAnimation = async () => {
      await animation(loadingSequence);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };

    runAnimation();
  }, []);

  console.log("rendering background");

  const sentence = "Let's keep aside this showpiece and move to the portfolio";
  const words = sentence.split(" ");

  let letterIndex = 0;

  if (isLoading) {
    return (
      <motion.div
        ref={scope}
        className="relative flex h-screen w-full flex-col items-center justify-center bg-neutral-950"
      >
        <motion.div
          className="loading mb-2"
          initial={{
            scale: 1.45,
            opacity: 0,
            maskImage: "linear-gradient(90deg, black 100%, transparent 100%)",
          }}
        >
          <NameSvg />
        </motion.div>

        <motion.p className="font-36days absolute">
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
    <div className="realtive">
      <motion.div
        style={{ x: xProgress }}
        ref={progressDiv}
        className="sticky top-0 z-[15] flex w-fit"
      >
        [<ProgressCounter value={progressCounter} />
        %]
      </motion.div>

      <div className="realtive w-full flex-1">
        <div className="relative z-10 min-h-screen w-full bg-neutral-950">
          <AnimatePresence>
            <CustomCursor cursorDisplay={cursorDisplay} />
          </AnimatePresence>
          <div>
            <Navbar />
          </div>

          <div id="hero-section" className="mt-4 min-h-screen">
            <HeroSection />
          </div>
          <div id="project-section" className="my-16 min-h-screen border">
            <ProjectSection />
            <ProjectSection2 />
          </div>
          <div id="skills-section" className="my-16 min-h-screen border">
            <SkillsSection />
          </div>
          <div id="story-section" className="my-16 min-h-screen border">
            <StoryTimeline />
          </div>
          <div id="contact-section" className="my-16 min-h-screen border">
            <Contact setCursorDisplay={setCursorDisplay} />
          </div>
        </div>
        <div className="sticky bottom-0 -z-10 mt-[21rem] w-full bg-blue-400">
          <Footer />
        </div>
      </div>
    </div>
  );
}
