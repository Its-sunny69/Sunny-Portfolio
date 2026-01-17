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

export default function StoryTimeline() {
  const [currentScrollProgress, setCurrentScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [detailList, setdetailList] = useState({
    ringtext3Ddetail: false,
    timelineSVGDetail: false,
  });
  const { developerMode } = useContext(DeveloperContext);

  const scrollRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const { scrollYProgress } = useScroll({ target: scrollRef });

  const [totalLength, setTotalLength] = useState(0);

  const pathLength = useTransform(scrollYProgress, [0.02, 1], [0, 1]);

  // Get total path length on mount
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

    if (pathRef.current && totalLength > 0) {
      // Calculate the current position along the path
      const currentLength = latest * totalLength;
      const point = pathRef.current.getPointAtLength(currentLength);
    }

    let idx = Math.floor(latest * 10);
    if (latest == 0) {
      idx = 0;
    } else {
      idx = idx + 1;
    }

    setActiveIndex(idx);
  });

  const storyList = [
    {
      title: "2013 – Curiosity Sparks",
      description:
        "As a child, I was fascinated by how things worked, always opening toys and gadgets just to see the magic inside.",
    },
    {
      title: "2016 – First Love: Remote Cars",
      description:
        "My earliest obsession was remote-control cars, the first glimpse of technology sparking life into objects.",
    },
    {
      title: "2019 – Science Calls",
      description:
        "This curiosity grew into a love for science, guiding me to choose it as my path in higher secondary education.",
    },
    {
      title: "2020 – Digital Fascination",
      description:
        "While others were drawn to social media, I became intrigued by the internet, digital tools, and how websites lived online.",
    },
    {
      title: "Early 2021 – First Taste of Code",
      description:
        "Experimenting with HTML and CSS, I realized I could not just use the web — I could create it.",
    },
    {
      title: "2021 – Engineering Chosen",
      description:
        "With this growing passion, I stepped into engineering, ready to dive deeper into the world of technology.",
    },
    {
      title: "2022 – C Language: The Foundation",
      description:
        "College introduced me to my first structured programming language, C, which sharpened my logic and problem-solving skills.",
    },
    {
      title: "2023 – JavaScript: The Game Changer",
      description:
        "I discovered JavaScript — the key that opened doors to building dynamic and interactive projects.",
    },
    {
      title: "2024 – Falling for Frontend",
      description:
        "Project by project, my heart leaned toward frontend development — where creativity meets logic.",
    },
    {
      title: "2025 The Journey Continues",
      description:
        "Today, I stand here still learning, still building, chasing the dream of creating amazing things — and this is just the beginning.",
    },
    {
      title: "You Made It!",
      description:
        "If you came till here by reading my story, you’re officially not a recruiter in a hurry (~˘˗˘)~",
    },
  ];

  const storyMessage = [
    "Let’s start the journey \n- I’ll share a few fun facts along the way 🚀",
    "I was in 5th grade, Division B 🧒",
    "By 8th grade, I was shifted to the new Division A based on exam percentages. \nI lost some of my buddies from B 😞",
    "I passed my 10th with 80.40% \n- not too shabby for a science student 😎",
    "I started exploring how the internet stuff actually works \n- while also playing Free Fire like a spoil kid 😂",
    "I was so naive that I started Telegram channel \nto build Web page only with HTML CSS for others. Yes you heard right 🙂",
    "That’s when I realized there was much more beyond HTML and CSS \n- programming had entered the chat 💻",
    "In college, everyone was struggling with the \nlegendary Turbo C compiler including me 🥲",
    "I was building noob projects and proudly calling myself a programmer. \nFake it till you make it 😉",
    "One of the frontend I hated back then was of government websites 🤦‍♂️ \nThough to be fair, they’re improving… slowly 🐢",
    "By this time, it finally clicked:Frontend is not only about design \n- it’s a lot more 🧠",
    "That’s my story so far. Was it boring, interesting, relatable or anything in your mind? 🤔 \nFeel free to leave your message in the contact section \n- I promise, I’ll read it 📬",
  ];

  // Shared milestone positions used for overlay and SVG placements
  const positions = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.989];

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

  const data = {
    ringtext3Ddetail: {
      title: "3D Rotating Ring Text Animation",
      description:
        "How it's created:\n\n• Uses <code class='code'>useMotionValue</code> to hold a shared rotation value that drives the entire text ring\n• <code class='code'>useAnimationFrame</code> increments rotation every frame based on current speed: <code class='code'>degPerMs = 360 / speed</code>\n• <code class='code'>useSpring</code> smooths speed changes (hover vs normal) for natural motion\n• Characters are positioned around a 3D circle using <code class='code'>rotateY(angle)</code> + <code class='code'>translateZ(radius)</code>\n• Parent container applies <code class='code'>perspective</code> and <code class='code'>transformStyle: preserve-3d</code> with tilt via <code class='code'>rotateX</code> and <code class='code'>rotateZ</code>\n\nAnimation Logic:\n\n• Initial: rotation = 0, ring is tilted in 3D via <code class='code'>rotateX</code>/<code class='code'>rotateZ</code>\n• Per frame: rotation increases by <code class='code'>degPerMs * delta</code> to create continuous spin\n• On hover: speed smoothly transitions to a faster value via spring; rotation rate increases\n• Each character uses a shared rotation plus its own angle offset for synchronized movement\n\nKey Technical Details:\n\n• Angle per character: <code class='code'>angle = (360 / charCount) * i</code>\n• Per-character transform computed with <code class='code'>useTransform(rotation, r =&gt; \`rotateY(\${angle + r}deg) translateZ(\${radius}px) translate(-50%, -50%)\`)</code>\n• <code class='code'>perspective</code> on parent enables depth; <code class='code'>preserve-3d</code> keeps child transforms in 3D space\n• Spring config: <code class='code'>{ damping: 40, stiffness: 200 }</code> for responsive yet smooth speed transitions\n\nResult: A smooth 3D ring of text that continuously spins and accelerates on hover, with true depth thanks to perspective and per-character 3D transforms",
      codeSnippet: `// Shared rotation value and smooth speed
const rotation = useMotionValue(0);
const speedSpring = useSpring(speed, { damping: 40, stiffness: 200 });

// Toggle speed on hover
useEffect(() => {
  speedSpring.set(isHovered ? onHoverSpeed : speed);
}, [isHovered, onHoverSpeed, speed, speedSpring]);

// Increment rotation each frame based on current speed
useAnimationFrame((_, delta) => {
  const degPerMs = 360 / speedSpring.get();
  rotation.set(rotation.get() + degPerMs * delta);
});

// Position characters around the ring
{text.split("").map((char, i) => {
  const angle = (360 / charCount) * i;
  const transform = useTransform(
    rotation,
    (r) => \`rotateY(\${angle + r}deg) translateZ(\${radius}px) translate(-50%, -50%)\`
  );
  return (
    <motion.span
      key={i}
      style={{ transform, fontSize: "3rem", color: "#fff" }}
    >
      {char}
    </motion.span>
  );
})}

// Parent with 3D perspective and tilt
<motion.div style={{ perspective: 800 }}>
  <div
    style={{
      transformStyle: "preserve-3d",
      transform: \`rotateX(\${rotateX}deg) rotateZ(\${rotateZ}deg)\`,
      width: 2 * radius + 30,
      height: 2 * radius - 120,
    }}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
  >
    {/* characters */}
  </div>
</motion.div>`,
    },
    timelineSVGDetail: {
      title: "SVG Path Timeline Scroll Animation",
      description:
        "How it's created:\n\n• Binds scroll progress to the timeline container using <code class='code'>useScroll({ target })</code> to get <code class='code'>scrollYProgress</code>\n• Maps progress to stroke draw using <code class='code'>useTransform(scrollYProgress, [0.02, 1], [0, 1])</code> and applies it to <code class='code'>motion.path</code> via <code class='code'>style={{ pathLength }}</code>\n• Computes the path's total length once with <code class='code'>pathRef.current.getTotalLength()</code> in <code class='code'>useEffect</code>\n• Places milestone cards by sampling the SVG path with <code class='code'>getPointAtLength(totalLength * position)</code> for each normalized position value\n• Uses gradients (<code class='code'>linearGradient</code>) and a drop-shadow filter for visual polish\n\nAnimation Logic:\n\n• Initial: <code class='code'>pathLength = 0</code> so the timeline stroke is invisible; milestone rectangles/text are also hidden\n• While scrolling: <code class='code'>pathLength</code> increases towards 1, progressively revealing the path\n• Milestones: Each rect/text fades/scales in when <code class='code'>currentScrollProgress &gt; position</code> (threshold per milestone)\n• Stagger: A small delay is applied per element to create a subtle stagger on reveal\n\nKey Technical Details:\n\n• Accurate placement via <code class='code'>getTotalLength()</code> + <code class='code'>getPointAtLength()</code>: converts normalized progress to an exact <code class='code'>(x,y)</code> on the curve\n• <code class='code'>safeX</code> calculation keeps milestone rectangles within the viewBox bounds\n• Two mirrored <code class='code'>motion.path</code> strokes with opposing gradients add depth\n• Responsive scaling with <code class='code'>viewBox</code> and <code class='code'>preserveAspectRatio</code> keeps the timeline consistent across sizes\n\nResult: A scroll-reactive SVG timeline that draws itself as you scroll and reveals milestone cards precisely anchored along the curve for a clean, narrative progression",
      codeSnippet: `// Scroll progress bound to the timeline container
const scrollRef = useRef<HTMLDivElement>(null);
const pathRef = useRef<SVGPathElement>(null);
const { scrollYProgress } = useScroll({ target: scrollRef });

// Map progress to pathLength (0 → 1)
const pathLength = useTransform(scrollYProgress, [0.02, 1], [0, 1]);

// Cache the total path length once
const [totalLength, setTotalLength] = useState(0);
useEffect(() => {
  if (pathRef.current) {
    setTotalLength(pathRef.current.getTotalLength());
  }
}, []);

// Draw the timeline stroke progressively
<motion.svg viewBox="-2 -2 15 56">
  <motion.path
    ref={pathRef}
    initial={{ pathLength: 0 }}
    style={{ pathLength }}
    d="M 0 0 C 0 6 10 4 10 10 C 10 16 0 14 0 20 C 0 26 10 24 10 30 C 10 36 0 34 0 40 C 0 46 10 44 10 50"
    stroke="url(#timeline-gradient)"
    strokeWidth="0.05"
    fill="none"
  />
</motion.svg>

// Place milestone cards along the path
{positions.map((position, index) => {
  const length = position * totalLength;
  const point = pathRef.current?.getPointAtLength(length) || { x: 0, y: 0 };

  const rectWidth = 6;
  let safeX = point.x - rectWidth / 2 - 0.5;
  if (safeX < 0) safeX = -1.5;

  return (
    <g key={index}>
      <motion.rect
        x={safeX}
        y={point.y - 0.3}
        width="6"
        height="3"
        fill="#0a0a0a"
        stroke="#262626"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: currentScrollProgress > position ? 1 : 0,
          scale: currentScrollProgress > position ? 1 : 0,
        }}
        transition={{ duration: 0.3, delay: currentScrollProgress >= position ? 0 : 0.15 }}
      />

      <motion.text
        x={safeX + 0.25}
        y={point.y + 0.3}
        fontSize="0.3"
        fill="white"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: currentScrollProgress > position ? 1 : 0,
          scale: currentScrollProgress > position ? 1 : 0,
        }}
        transition={{ duration: 0.3, delay: currentScrollProgress >= position ? 0.1 : 0 }}
      >
        {storyList[index] ? storyList[index].title : "Untitled"}
      </motion.text>
    </g>
  );
})`,
    },
  };

  return (
    <div className="py-4">
      <div className="flex flex-col items-center px-8">
        <h1 className="font-36days text-6xl" data-cursor-hover="true">
          Story
        </h1>
        <p>
          Not Perfect -<span className="italic"> Still in Progress</span>.
        </p>
      </div>

      <div className="relative w-full px-8 tracking-normal" ref={scrollRef}>
        <motion.div className="left sticky top-110 left-full flex h-40 w-fit flex-col items-end justify-end rounded bg-transparent p-2 text-right tracking-wide">
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
              className="h-1 rounded dark:bg-white bg-neutral-800"
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
          ClassNames="absolute top-64 left-9"
          ringText="THE START "
          ringRadius={90}
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
              className="absolute top-42 left-54 flex cursor-pointer hover:opacity-75"
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
                  className="absolute top-48 left-54 z-70 text-xs tracking-wider"
                  data={data.ringtext3Ddetail}
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
              className="absolute top-64 left-[34rem] flex cursor-pointer hover:opacity-75"
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
                  className="absolute top-72 left-[34rem] z-70 text-xs tracking-wider"
                  data={data.timelineSVGDetail}
                  LabelProps={{ direction: "right", orientation: "up" }}
                />
              )}
            </AnimatePresence>
          </>
        )}

        <motion.svg
          ref={svgRef}
          className="bg-whit mx-auto w-[90%] p-1"
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

            const rectWidth = 6;

            // Calculate safe x position for rect and text
            let safeX = point.x - rectWidth / 2 - 0.5;
            if (safeX < 0) safeX = -1.5;

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
                    y={point.y - 0.3}
                    width="6"
                    height="3"
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
                    fontSize="0.3"
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
                    y={point.y + 1}
                    textAnchor="start"
                    fontSize="0.2"
                    fill="white"
                    fontWeight="lighter"
                    letterSpacing="0.02"
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
                      <tspan x={safeX + 1} dy={i === 0 ? 0 : "0.3"} key={i}>
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
          ClassNames="absolute bottom-92 right-[36.5%]"
          ringText="THE END "
          ringRadius={90}
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
