import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef, useState, useEffect, useContext } from "react";
import RingText3D from "@/components/RingText3D";
import Image from "next/image";
import City from "@/assets/city.jpg";
import { DeveloperContext } from "@/context/developerContext";
import DeveloperDetails from "./DeveloperDetails";
import { storyList, storyMessage } from "@/data/storyData";
import { storyDeveloperData } from "@/data/developerDetailsData";

export default function StoryTimeline() {
  const [currentScrollProgress, setCurrentScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [detailList, setdetailList] = useState({
    ringtext3Ddetail: false,
    timelineSVGDetail: false,
  });
  const [positions, setPositions] = useState([
    0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.989,
  ]);
  const [totalLength, setTotalLength] = useState(0);

  const scrollRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const { scrollYProgress } = useScroll({ target: scrollRef });
  const { developerMode } = useContext(DeveloperContext);

  // Responsive SVG values state
  const [responsiveValues, setResponsiveValues] = useState({
    rectWidth: 6,
    rectHeight: 3,
    numberFontSize: 0.3,
    fontSize: 0.2,
    letterSpacing: 0.02,
    lineHeight: 0.3,
    alphaX: 0,
    gammaY: 0,
    ringRadius: 90,
  });

  // Function to detect window size and set responsive values
  const handleResponsiveValues = () => {
    const windowWidth = window.innerWidth;

    if (windowWidth < 640) {
      // sm
      setResponsiveValues({
        rectWidth: 13.7,
        rectHeight: 4.4,
        numberFontSize: 0.7,
        fontSize: 0.6,
        letterSpacing: 0.025,
        lineHeight: 0.6,
        alphaX: -0.5,
        gammaY: 0.4,
        ringRadius: 70,
      });
    } else if (windowWidth <= 768) {
      // md
      setResponsiveValues({
        rectWidth: 9,
        rectHeight: 3,
        numberFontSize: 0.4,
        fontSize: 0.3,
        letterSpacing: 0.03,
        lineHeight: 0.4,
        alphaX: -0.5,
        gammaY: 0,
        ringRadius: 80,
      });
    } else {
      // lg
      setResponsiveValues({
        rectWidth: 6,
        rectHeight: 3,
        numberFontSize: 0.3,
        fontSize: 0.2,
        letterSpacing: 0.02,
        lineHeight: 0.3,
        alphaX: 0,
        gammaY: 0,
        ringRadius: 90,
      });
    }
  };

  useEffect(() => {
    handleResponsiveValues();
    window.addEventListener("resize", handleResponsiveValues);
    return () => window.removeEventListener("resize", handleResponsiveValues);
  }, []);

  const pathLength = useTransform(scrollYProgress, [0.02, 1], [0, 1]);

  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      setTotalLength(length);
    }
  }, []);

  useEffect(() => {
    if (!pathRef.current) return;
    const length = totalLength * currentScrollProgress;
    const point = pathRef.current?.getPointAtLength(length) || {
      x: 0,
      y: 0,
    };
  }, [pathRef.current]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setCurrentScrollProgress(latest);

    let idx = Math.floor(latest * 10);
    if (latest == 0) {
      idx = 0;
    } else {
      idx = idx + 1;
    }

    setActiveIndex(idx);
  });

  useEffect(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
    setPositions(
      isMobile
        ? [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.999]
        : [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.989],
    );
  }, []);

  function wrapSvgText(text: string, maxCharsPerLine = 40) {
    const words = text.split(" ");
    const lines: string[] = [];
    let line = "";
    words.forEach((word) => {
      if ((line + word).length > maxCharsPerLine) {
        lines.push(line.trim());
        line = "";
      }
      line += word + " ";
    });
    if (line) lines.push(line.trim());
    return lines;
  }

  const HandleDetailClick = (key: keyof typeof detailList) => {
    setdetailList((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  return (
    <div className="py-4">
      <div className="flex flex-col items-center px-2 md:px-8">
        <h1
          className="font-36days text-3xl md:text-4xl lg:text-6xl"
          data-cursor-hover="true"
        >
          Story
        </h1>
        <p className="mt-2">
          Not Perfect -<span className="italic"> Still in Progress</span>.
        </p>
      </div>

      <div
        className="relative w-full px-2 tracking-normal md:px-8"
        ref={scrollRef}
      >
        <motion.div className="left sticky top-125 left-full flex h-40 w-fit flex-col items-end justify-end rounded bg-transparent p-2 text-right tracking-wide md:top-110">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              className="rounded-md text-sm whitespace-pre-line"
              data-cursor-hover="true"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {storyMessage[activeIndex]}
            </motion.div>
          </AnimatePresence>

          <div className="my-4 h-1 w-48 rounded bg-neutral-200 dark:bg-neutral-800">
            <motion.div
              className="h-1 rounded bg-neutral-800 dark:bg-white"
              animate={{
                width: `${(activeIndex / (storyMessage.length - 1)) * 100}%`,
              }}
              transition={{ type: "spring", stiffness: 140, damping: 20 }}
            />
          </div>

          <div className="flex items-center justify-end">
            <Image
              src={City}
              alt="city"
              width={50}
              height={50}
              className="aspect-square rounded-full object-cover"
            />
          </div>
        </motion.div>

        <RingText3D
          ClassNames="absolute lg:top-64 md:top-50 top-30 left-0 lg:left-9"
          ringText="THE START "
          ringRadius={responsiveValues.ringRadius}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: currentScrollProgress > 0 ? 1 : 0,
            scale: currentScrollProgress > 0 ? 1 : 0,
          }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{
            duration: 0.3,
            delay: currentScrollProgress > 0 ? 0 : 0.15,
          }}
        />

        {/* Ring Text 3D Animation */}
        {developerMode && (
          <>
            <button
              className="absolute top-30 left-40 flex cursor-pointer hover:opacity-75 lg:top-42 lg:left-54"
              onClick={() => HandleDetailClick("ringtext3Ddetail")}
            >
              <motion.p
                initial={{ x: 0, color: "#22c55e" }}
                animate={
                  detailList.ringtext3Ddetail
                    ? { x: -5, color: "#ef4444" }
                    : { x: 0, color: "#22c55e" }
                }
                transition={{ duration: 0.2 }}
              >
                [
              </motion.p>
              <motion.p className="mx-1">8</motion.p>
              <motion.p
                initial={{ x: 0, color: "#22c55e" }}
                animate={
                  detailList.ringtext3Ddetail
                    ? { x: 5, color: "#ef4444" }
                    : { x: 0, color: "#22c55e" }
                }
                transition={{ duration: 0.2 }}
              >
                ]
              </motion.p>
            </button>

            <AnimatePresence>
              {developerMode && detailList.ringtext3Ddetail && (
                <DeveloperDetails
                  className="absolute top-39 left-8 z-70 text-xs tracking-wider md:top-36 md:left-40 lg:top-48 lg:left-54"
                  data={storyDeveloperData.ringtext3Ddetail}
                  LabelProps={{ direction: "right", orientation: "up" }}
                />
              )}
            </AnimatePresence>
          </>
        )}

        {/*SVG Timeline Animation */}
        {developerMode && (
          <>
            <button
              className="absolute top-40 right-10 flex cursor-pointer hover:opacity-75 md:top-50 md:left-[28rem] lg:top-64 lg:left-[34rem]"
              onClick={() => HandleDetailClick("timelineSVGDetail")}
            >
              <motion.p
                initial={{ x: 0, color: "#22c55e" }}
                animate={
                  detailList.timelineSVGDetail
                    ? { x: -5, color: "#ef4444" }
                    : { x: 0, color: "#22c55e" }
                }
                transition={{ duration: 0.2 }}
              >
                [
              </motion.p>
              <motion.p className="mx-1">9</motion.p>
              <motion.p
                initial={{ x: 0, color: "#22c55e" }}
                animate={
                  detailList.timelineSVGDetail
                    ? { x: 5, color: "#ef4444" }
                    : { x: 0, color: "#22c55e" }
                }
                transition={{ duration: 0.2 }}
              >
                ]
              </motion.p>
            </button>

            <AnimatePresence>
              {developerMode && detailList.timelineSVGDetail && (
                <DeveloperDetails
                  className="absolute top-56 right-8 z-70 text-xs tracking-wider md:left-[17rem] lg:top-72 lg:left-[34rem]"
                  data={storyDeveloperData.timelineSVGDetail}
                  LabelProps={{ direction: "right", orientation: "up" }}
                />
              )}
            </AnimatePresence>
          </>
        )}

        <motion.svg
          ref={svgRef}
          className="bg-whit mx-auto w-full p-1 pb-44 md:pb-24 lg:w-[90%] lg:pb-0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-2 -2 15 56"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient
              id="timeline-gradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#000" />
              <stop offset="100%" stopColor="#fff" />
            </linearGradient>
          </defs>

          <defs>
            <linearGradient
              id="timeline-gradient2"
              x1="0%"
              y1="100%"
              x2="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#000" />
              <stop offset="100%" stopColor="#fff" />
            </linearGradient>
          </defs>

          <motion.path
            ref={pathRef}
            initial={{ pathLength: 0 }}
            style={{ pathLength: pathLength }}
            d="M 0 0 C 0 6 10 4 10 10 C 10 16 0 14 0 20 C 0 26 10 24 10 30 C 10 36 0 34 0 40 C 0 46 10 44 10 50"
            stroke="url(#timeline-gradient)"
            strokeWidth="0.05"
            fill="none"
          />

          <motion.path
            initial={{ pathLength: 0 }}
            style={{ pathLength: pathLength }}
            d="M 0 0 C 1 6 9 4 10 10 C 9 16 1 14 0 20 C 1 26 9 24 10 30 C 9 36 1 34 0 40 C 1 46 9 44 10 50"
            stroke="url(#timeline-gradient2)"
            strokeWidth="0.05"
            fill="none"
          />

          {positions.map((position, index) => {
            const length = position * totalLength;
            const point = pathRef.current?.getPointAtLength(length) || {
              x: 0,
              y: 0,
            };
            const lines = wrapSvgText(
              storyList[index]?.description || "No description",
            );

            const rectWidth = responsiveValues.rectWidth;

            // Calculate safe x position for rect and text
            let safeX = point.x - rectWidth / 2 - 0.5;

            const minX = -2;
            const maxX = 13 - rectWidth;
            safeX = Math.max(minX, Math.min(maxX, safeX));

            return (
              <g key={index}>
                <defs>
                  <filter
                    id="shadow"
                    x="-30%"
                    y="-30%"
                    width="160%"
                    height="160%"
                  >
                    <feDropShadow
                      dx="0"
                      dy="0"
                      stdDeviation="0.2"
                      floodColor="#000"
                      floodOpacity="1"
                    />
                  </filter>
                </defs>

                <AnimatePresence>
                  {/* Rectangle background */}
                  <motion.rect
                    x={safeX}
                    y={point.y - 0.3 - responsiveValues.gammaY}
                    width={responsiveValues.rectWidth}
                    height={responsiveValues.rectHeight}
                    fill="#0a0a0a"
                    stroke="#262626"
                    filter="url(#shadow)"
                    strokeWidth="0.01"
                    strokeDasharray="0.05 0.05"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: currentScrollProgress > position ? 1 : 0,
                      scale: currentScrollProgress > position ? 1 : 0,
                    }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: currentScrollProgress >= position ? 0 : 0.15,
                    }}
                  />
                </AnimatePresence>

                {/* Text number */}
                <AnimatePresence>
                  <motion.text
                    x={safeX + 0.25}
                    y={point.y + 0.3}
                    textAnchor="start"
                    fontSize={responsiveValues.numberFontSize}
                    fill="white"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: currentScrollProgress > position ? 1 : 0,
                      scale: currentScrollProgress > position ? 1 : 0,
                    }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: currentScrollProgress >= position ? 0.1 : 0,
                    }}
                  >
                    {storyList[index] ? storyList[index].title : "Untitled"}
                  </motion.text>
                </AnimatePresence>

                <AnimatePresence>
                  <motion.text
                    width="8"
                    x={safeX + 1}
                    y={point.y + 1 + responsiveValues.gammaY}
                    textAnchor="start"
                    fontSize={responsiveValues.fontSize}
                    fill="white"
                    fontWeight="lighter"
                    letterSpacing={responsiveValues.letterSpacing}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: currentScrollProgress > position ? 1 : 0,
                      scale: currentScrollProgress > position ? 1 : 0,
                    }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: currentScrollProgress >= position ? 0.1 : 0,
                    }}
                  >
                    {lines.map((line, i) => (
                      <tspan
                        x={safeX + 1}
                        dy={i === 0 ? 0 : responsiveValues.lineHeight}
                        key={i}
                      >
                        {line}
                      </tspan>
                    ))}
                  </motion.text>
                </AnimatePresence>
              </g>
            );
          })}
        </motion.svg>

        <RingText3D
          ClassNames="absolute bottom-10 md:bottom-78 lg:bottom-92 md:right-[36.5%]"
          ringText="THE END "
          ringRadius={responsiveValues.ringRadius}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: currentScrollProgress >= 1 ? 1 : 0,
            scale: currentScrollProgress >= 1 ? 1 : 0,
          }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{
            duration: 0.3,
            delay: currentScrollProgress >= 1 ? 0 : 0.15,
          }}
        />
      </div>
    </div>
  );
}
