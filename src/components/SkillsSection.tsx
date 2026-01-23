import {
  motion,
  useMotionValue,
  useAnimationFrame,
  AnimatePresence,
} from "motion/react";
import { useState, useContext } from "react";
import Image from "next/image";
import RevealingText from "./RevealingText";
import DeveloperDetails from "./DeveloperDetails";
import { DeveloperContext } from "@/context/developerContext";
import { programming, tools } from "@/data/skillsData";
import { skillsDeveloperData } from "@/data/developerDetailsData";

const ITEM_WIDTH = 288; // w-72 = 18rem = 288px

export default function SkillsSection() {
  const [detailList, setdetailList] = useState({
    hoverTextRevealingDetail: false,
    infiniteScrollDetail: false,
  });
  const { developerMode } = useContext(DeveloperContext);

  const x1 = useMotionValue(0);
  const x2 = useMotionValue(0);

  const [isTrack1Hovered, setIsTrack1Hovered] = useState(false);
  const [isTrack2Hovered, setIsTrack2Hovered] = useState(false);

  // velocity in px/sec
  const velocity1 = isTrack1Hovered ? 80 : 160;
  const velocity2 = isTrack2Hovered ? 80 : 160;

  useAnimationFrame((_, delta) => {
    const moveBy = (velocity1 * delta) / 1000;
    x1.set(x1.get() - moveBy);

    const halfWidth = programming.length * ITEM_WIDTH;

    if (x1.get() <= -halfWidth) {
      x1.set(0);
    }
  });

  useAnimationFrame((_, delta) => {
    const moveBy = (velocity2 * delta) / 1000;
    x2.set(x2.get() + moveBy);

    const halfWidth = tools.length * ITEM_WIDTH;

    if (x2.get() >= 0) {
      x2.set(-halfWidth);
    }
  });

  const HandleDetailClick = (key: keyof typeof detailList) => {
    setdetailList((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  return (
    <div className="relative flex h-screen flex-col justify-between py-4">
      <RevealingText className="absolute top-0 right-0 border" HoverMe={true}>
        <div className="flex items-center justify-center">
          <div>
            <p>Curiosity</p>
          </div>
          <div className="mx-4 flex gap-2">
            <p
              style={{
                textOrientation: "sideways",
                writingMode: "sideways-lr",
                pointerEvents: "none",
              }}
            >
              Self Motivation
            </p>
            <p
              style={{
                textOrientation: "sideways",
                writingMode: "sideways-lr",
                pointerEvents: "none",
              }}
            >
              Growth Mindset
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p>Calmness</p>
            <p>Ownership</p>
          </div>
        </div>
      </RevealingText>

      <RevealingText
        className="absolute bottom-5 left-0 lg:bottom-0"
        HoverMe={true}
      >
        <div className="flex items-center justify-center">
          <div className="flex flex-col gap-2">
            <p>Attention to Detail</p>
            <p>Logical Thinking</p>
          </div>
          <div className="mx-4 flex gap-2">
            <p
              style={{
                textOrientation: "sideways",
                writingMode: "sideways-lr",
                pointerEvents: "none",
              }}
            >
              Collaboration
            </p>
            <p
              style={{
                textOrientation: "sideways",
                writingMode: "sideways-lr",
                pointerEvents: "none",
              }}
            >
              Teamwork
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p>Active Listening</p>
            <p>Clear Communication</p>
          </div>
        </div>
      </RevealingText>

      <div className="flex flex-col items-center px-2 md:px-8">
        <h1
          className="font-36days text-3xl md:text-4xl lg:text-6xl"
          data-cursor-hover="true"
        >
          Skills
        </h1>
      </div>

      <div className="flex w-full flex-col items-center justify-center overflow-hidden">
        <div className="mb-6 w-full px-4 md:px-8">
          <p>Languages & Frameworks I Work With...</p>
        </div>
        <div
          className="mb-1 w-full overflow-hidden border-y border-dashed border-neutral-800 mask-r-from-black mask-r-from-70% mask-r-to-transparent mask-l-from-black mask-l-from-70% mask-l-to-transparent mask-alpha p-1"
          onMouseEnter={() => setIsTrack1Hovered(true)}
          onMouseLeave={() => setIsTrack1Hovered(false)}
        >
          <motion.div className="flex" style={{ x: x1, width: "max-content" }}>
            {[...programming, ...programming].map((item, idx) => (
              <div
                key={idx}
                className="flex h-20 w-64 shrink-0 grow-0 basis-auto items-center justify-center border-l border-dashed border-neutral-800 px-4 py-1 lg:h-24 lg:w-72 lg:py-0"
              >
                <Image
                  className="grayscale-100"
                  src={item.Icon}
                  alt={`${item.name}`}
                  width={65}
                  height={65}
                />

                <span
                  className="ml-3 bg-clip-text text-xl font-semibold transition-all hover:text-transparent lg:text-2xl"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${item.textColor1}, ${item.textColor2})`,
                  }}
                >
                  {item.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        <div
          className="w-full overflow-hidden border-y border-dashed border-neutral-800 mask-r-from-black mask-r-from-70% mask-r-to-transparent mask-l-from-black mask-l-from-70% mask-l-to-transparent mask-alpha p-1"
          onMouseEnter={() => setIsTrack2Hovered(true)}
          onMouseLeave={() => setIsTrack2Hovered(false)}
        >
          <motion.div className="flex" style={{ x: x2, width: "max-content" }}>
            {[...tools, ...tools].map((item, idx) => (
              <div
                key={idx}
                className="flex h-20 w-64 shrink-0 grow-0 basis-auto items-center justify-center border-l border-dashed border-neutral-800 px-4 py-1 lg:h-24 lg:w-72 lg:py-0"
              >
                <Image
                  className="grayscale-100"
                  src={item.Icon}
                  alt={`${item.name}`}
                  width={65}
                  height={65}
                />

                <span
                  className="ml-3 bg-clip-text text-xl font-semibold transition-all hover:text-transparent lg:text-2xl"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${item.textColor1}, ${item.textColor2})`,
                  }}
                >
                  {item.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
        <div className="mt-6 w-full px-8 text-end">
          <p>...Tools That Power My Workflow</p>
        </div>
      </div>

      <div className="flex justify-end px-4 md:px-8">
        <p
          className="font-36days text-sm text-neutral-700"
          data-cursor-hover="true"
        >
          Note: Skills are under continuous development. No final release yet.
        </p>
      </div>

      {/* Hover Text Reveal Animation */}
      {developerMode && (
        <>
          <button
            className="absolute top-15 left-10 flex cursor-pointer hover:opacity-75 md:right-[21rem] lg:top-0 lg:right-96"
            onClick={() => HandleDetailClick("hoverTextRevealingDetail")}
          >
            <motion.p
              initial={{ x: 0, color: "#22c55e" }}
              animate={
                detailList.hoverTextRevealingDetail
                  ? { x: -5, color: "#ef4444" }
                  : { x: 0, color: "#22c55e" }
              }
              transition={{ duration: 0.2 }}
            >
              [
            </motion.p>
            <motion.p className="mx-1">6</motion.p>
            <motion.p
              initial={{ x: 0, color: "#22c55e" }}
              animate={
                detailList.hoverTextRevealingDetail
                  ? { x: 5, color: "#ef4444" }
                  : { x: 0, color: "#22c55e" }
              }
              transition={{ duration: 0.2 }}
            >
              ]
            </motion.p>
          </button>

          <AnimatePresence>
            {developerMode && detailList.hoverTextRevealingDetail && (
              <DeveloperDetails
                className="absolute top-23 left-8 z-70 text-xs md:top-20 md:right-[21rem] lg:top-5 lg:right-96"
                data={skillsDeveloperData.hoverTextRevealingDetail}
                LabelProps={{ direction: "left", orientation: "up" }}
              />
            )}
          </AnimatePresence>
        </>
      )}

      {/* Infinite scroll Animation */}
      {developerMode && (
        <>
          <button
            className="absolute top-50 right-10 flex cursor-pointer hover:opacity-75 md:left-[24rem] lg:top-52 lg:left-[28rem]"
            onClick={() => HandleDetailClick("infiniteScrollDetail")}
          >
            <motion.p
              initial={{ x: 0, color: "#22c55e" }}
              animate={
                detailList.infiniteScrollDetail
                  ? { x: -5, color: "#ef4444" }
                  : { x: 0, color: "#22c55e" }
              }
              transition={{ duration: 0.2 }}
            >
              [
            </motion.p>
            <motion.p className="mx-1">7</motion.p>
            <motion.p
              initial={{ x: 0, color: "#22c55e" }}
              animate={
                detailList.infiniteScrollDetail
                  ? { x: 5, color: "#ef4444" }
                  : { x: 0, color: "#22c55e" }
              }
              transition={{ duration: 0.2 }}
            >
              ]
            </motion.p>
          </button>

          <AnimatePresence>
            {developerMode && detailList.infiniteScrollDetail && (
              <DeveloperDetails
                className="absolute top-59 right-8 z-70 text-xs md:top-56 md:left-[16rem] lg:left-[28rem]"
                data={skillsDeveloperData.infiniteScrollDetail}
                LabelProps={{ direction: "right", orientation: "up" }}
              />
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
