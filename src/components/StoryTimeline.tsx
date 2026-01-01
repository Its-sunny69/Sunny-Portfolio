import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef, useState, useEffect } from "react";
import RingText3D from "@/components/RingText3D";
import Image from "next/image";
import City from "@/assets/city.jpg";

export default function StoryTimeline() {
  const [currentScrollProgress, setCurrentScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const { scrollYProgress } = useScroll({ target: scrollRef });

  const [totalLength, setTotalLength] = useState(0);
  const [currentPoints, setCurrentPoints] = useState({ x: 0, y: 0 });

  const pathLength = useTransform(scrollYProgress, [0.02, 1], [0, 1]);

  // Get total path length on mount
  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      // console.log("Total Path Length:", length);
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

    setCurrentPoints({ x: point.x, y: point.y });
    // console.log("Point at length", length, "->", point);
  }, [pathRef.current]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // console.log("Scroll Progress:", latest);
    setCurrentScrollProgress(latest);

    if (pathRef.current && totalLength > 0) {
      // Calculate the current position along the path
      const currentLength = latest * totalLength;
      const point = pathRef.current.getPointAtLength(currentLength);

      // console.log("Current Point:", { x: point.x, y: point.y });
    }

    // Determine active milestone index based on scroll progress
    // let idx = 0;
    // for (let i = 0; i < positions.length; i++) {
    //   if (latest >= positions[i]) idx = i;
    // }
    let idx = Math.floor(latest * 10);
    if (latest == 0) {
      idx = 0;
    } else {
      idx = idx + 1;
    }
    // console.log("Active Index:", idx);
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
    "I was so naive that I started Telegram channel \nto build Web page only with HTML CSS for others. Yes you heard correct 🙂",
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

  return (
    <div className="py-4">
      <div className="px-8 text-center">
        <h1 className="font-36days text-6xl">Story</h1>
        <p>
          Not Perfect -<span className="italic"> Still in Progress</span>.
        </p>
      </div>

      <div className="relative w-full px-8 tracking-normal" ref={scrollRef}>
        <motion.div className="left sticky top-110 left-full flex h-40 w-fit flex-col items-end justify-end rounded bg-transparent p-2 text-right tracking-wide">
          {/* <div className="text-xs opacity-70">Story Progress</div> */}

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              className="rounded-md text-sm whitespace-pre-line"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {storyMessage[activeIndex]}
            </motion.div>
          </AnimatePresence>

          <div className="my-4 h-1 w-48 rounded bg-neutral-800">
            <motion.div
              className="h-1 rounded bg-white"
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
          {/* <div className="mt-1 text-[11px] opacity-70">
            {activeIndex + 1} / {storyMessage.length}
          </div> */}
        </motion.div>

        <RingText3D
          ClassNames="absolute top-64 left-9"
          ringText="START STORY "
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

            const rectWidth = 6; // your rectangle width

            // Calculate safe x position for rect and text
            let safeX = point.x - rectWidth / 2 - 0.5;
            if (safeX < 0) safeX = -1.5;

            return (
              <g key={index}>
                <defs>
                  <filter
                    id="shadow"
                    x="-30%" // expands left
                    y="-30%" // expands up
                    width="160%" // expands right
                    height="160%" // expands down
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
                    // x={point.x - 1.8}
                    x={safeX}
                    y={point.y - 0.3}
                    width="6"
                    height="3"
                    //   rx="0.1" // This makes it rounded (like border-radius)
                    //   ry="0.1" // This makes it rounded (like border-radius)
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
                    y={point.y + 0.3} // Slight offset for centering
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
                    y={point.y + 1} // Slight offset for centering
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
                    {/* {storyList[index]
                    ? storyList[index].description
                    : "No description"} */}
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
