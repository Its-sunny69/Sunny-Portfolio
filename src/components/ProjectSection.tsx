import { AnimatePresence, motion, useInView } from "motion/react";
import reactIcon from "@/assets/programming-icons/reactjs.svg";
import tailwindIcon from "@/assets/programming-icons/tailwindcss.svg";
import html5Icon from "@/assets/programming-icons/html5.svg";
import typescriptIcon from "@/assets/programming-icons/typescript.svg";
import nextjsIcon from "@/assets/programming-icons/nextjs.svg";
import mongodbIcon from "@/assets/programming-icons/mongodb.svg";
import css3Icon from "@/assets/programming-icons/css3.svg";
import javascriptIcon from "@/assets/programming-icons/javascript.svg";
import nodejsIcon from "@/assets/programming-icons/nodejs.svg";
import NewCard from "./NewCard";
import { useContext, useRef, useState } from "react";
import DeveloperDetails from "./DeveloperDetails";
import { DeveloperContext } from "@/context/developerContext";
import { useTheme } from "next-themes";

type CardItem = {
  title: string;
  overview: string;
  imgURL: string;
  description: string;
  features: string[];
  projectURLs: {
    label: string;
    url: string;
  }[];
  techListName: string;
  techListImg: string[];
};

const list: CardItem[] = [
  {
    title: "Portafolio",
    overview: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    imgURL:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "3 Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa minus sed, ex doloremque possimus voluptas sapiente illum doloribus numquam mollitia molestiae, nemo voluptates, nisi molestias! Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
    projectURLs: [
      {
        label: "Live Demo",
        url: "https://unpkg.com/simple-icons@v15/icons/simpleicons.svg",
      },
      {
        label: "GitHub",
        url: "https://unpkg.com/simple-icons@v15/icons/simpleicons.svg",
      },
    ],
    techListName: "React, Tailwind CSS, HTML5, JavaScript, MongoDB, Next.js",
    techListImg: [
      reactIcon,
      tailwindIcon,
      html5Icon,
      html5Icon,
      html5Icon,
      html5Icon,
    ],
  },
  {
    title: "Briefox",
    overview:
      "AI-powered web tool for designers to generate briefs, find fonts, and extract color palettes.",
    imgURL:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Briefox is an AI-powered design assistant that empowers designers with instant access to design briefs, font discovery, and color palette extraction. Featuring zero-login convenience, Lighthouse-optimized performance, and seamless Gemini API integration for intelligent design recommendations.",
    features: [
      "Achieved <strong class='text-white font-bold'>96 Performance</strong>, <strong class='text-white font-bold'>82 Accessibility</strong>, <strong class='text-white font-bold'>96 Best Practices</strong>, and <strong class='text-white font-bold'>92 SEO</strong> scores using Lighthouse.",
      "<strong class='text-white font-bold'>Optimized user experience</strong> with <strong class='text-white font-bold'>fast</strong>, <strong class='text-white font-bold'>mobile-friendly</strong> UI built using Next.js (TypeScript) and Tailwind CSS.",
      "Integrated Gemini API for <strong class='text-white font-bold'>AI-driven content</strong> and features like <strong class='text-white font-bold'>drag-drop</strong>, <strong class='text-white font-bold'>HEIC conversion</strong>, and <strong class='text-white font-bold'>clipboard support</strong>.",
      "<strong class='text-white font-bold'>Monetized</strong> via Google Analytics, AdSense, and AdsTerra; deployed on Vercel with a <strong class='text-white font-bold'>custom domain</strong>.",
      "Key tools: <strong class='text-white font-bold'>Design Brief Generator</strong>, <strong class='text-white font-bold'>Font Finder</strong>, and <strong class='text-white font-bold'>Color Palette Extractor</strong> with <strong class='text-white font-bold'>export options</strong>.",
    ],
    projectURLs: [
      {
        label: "Live Demo",
        url: "https://www.briefox.com/",
      },
      {
        label: "GitHub",
        url: "https://github.com/Its-sunny69/Essential-Graphic-Design-Tools",
      },
    ],
    techListName:
      "HTML, CSS, TypeScript, Next.js, TailwindCSS, MongoDB, API integration",
    techListImg: [
      html5Icon,
      css3Icon,
      tailwindIcon,
      typescriptIcon,
      nextjsIcon,
      mongodbIcon,
    ],
  },
  {
    title: "Arise",
    overview:
      "A productivity-focused app designed to help users overcome procrastination.",
    imgURL:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Arise is a collaborative productivity platform that combines real-time task management with room-based collaboration. It features modular architecture built with React and Redux, secure JWT authentication, and leaderboard metrics to keep teams motivated and organized.",
    features: [
      "Developed a <strong class='text-white font-bold'>modular frontend</strong> using React and Redux to manage <strong class='text-white font-bold'>real-time task lists</strong>, <strong class='text-white font-bold'>room-based collaboration</strong>, and user state.",
      "Implemented <strong class='text-white font-bold'>dynamic UI elements</strong> with TailwindCSS for <strong class='text-white font-bold'>responsiveness</strong> and <strong class='text-white font-bold'>visually engaging user experience</strong>.",
      "Used <strong class='text-white font-bold'>authentication</strong> and backend to <strong class='text-white font-bold'>securely manage user sessions</strong> and <strong class='text-white font-bold'>room access</strong>.",
      "Leveraged structured storage for <strong class='text-white font-bold'>user tasks</strong>, <strong class='text-white font-bold'>room data</strong>, and <strong class='text-white font-bold'>leaderboard metrics</strong>.",
    ],
    projectURLs: [
      {
        label: "Live Demo",
        url: "https://arise-hazel.vercel.app/",
      },
      {
        label: "GitHub",
        url: "https://github.com/Its-sunny69/Arise",
      },
    ],
    techListName:
      "HTML, CSS, JavaScript, ReactJS, Redux, TailwindCSS, NodeJS, ExpressJS, JWT, MongoDB",
    techListImg: [
      html5Icon,
      css3Icon,
      tailwindIcon,
      javascriptIcon,
      reactIcon,
      nodejsIcon,
      mongodbIcon,
    ],
  },
];

export default function ProjectSection() {
  const [detailList, setdetailList] = useState({
    semicircleDetail: false,
    projectCardDetail: false,
  });
  const { developerMode } = useContext(DeveloperContext);
  const scope = useRef(null);
  const isInView = useInView(scope, { once: true });
  const { theme } = useTheme();

  const HandleDetailClick = (key: keyof typeof detailList) => {
    setdetailList((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const data = {
    semicircleDetail: {
      title: "Glowing Semicircle Animation",
      description:
        "How it's created:\n\n• Uses <code class='code'>motion.div</code> with <code class='code'>aspect-square</code> and <code class='code'>rounded-full</code> to create a perfect circle\n• Positioned with <code class='code'>-top-[180%]</code> to sit above the viewport\n• Layered with <code class='code'>-z-50</code> to sit behind all content\n• <code class='code'>border border-none bg-transparent</code> allows only the box-shadow to be visible\n\nAnimation Logic:\n\n• Initial State: width is 0 (invisible), boxShadow is <code class='code'>0px 0px 0px 0px rgba(255,255,255,0.75)</code>\n• Active State (isInView): width expands to 120%, boxShadow becomes <code class='code'>0px 5px 80px 10px rgba(255,255,255,0.55)</code>\n• The shadow blur radius grows from 0px to 80px, creating a soft glowing effect\n• Spread radius increases from 0px to 10px, expanding the glow outward\n\nTiming & Triggers:\n\n• Transition duration: 4 seconds with <code class='code'>easeInOut</code> easing\n• Triggered by <code class='code'>useInView</code> hook with <code class='code'>once: true</code> option\n• Animation plays once when section enters viewport\n\nResult: Creates an elegant, glowing semicircular backdrop that expands and illuminates when the project section comes into view, adding depth and visual impact to the section",
      codeSnippet: `// useInView hook setup
const scope = useRef(null);
const isInView = useInView(scope, { once: true });

// Glowing semicircle animation
<motion.div
  className="absolute -top-[180%] -z-50 aspect-square rounded-full border border-none bg-transparent"
  initial={{
    width: 0,
    boxShadow: "0px 0px 0px 0px rgba(255,255,255,0.75)",
  }}
  animate={
    isInView
      ? {
          width: "120%",
          boxShadow: "0px 5px 80px 10px rgba(255,255,255,0.55)",
        }
      : {
          width: 0,
          boxShadow: "0px 0px 0px 0px rgba(255,255,255,0.75)",
        }
  }
  transition={{ duration: 4, ease: "easeInOut" }}
/>`,
    },
    projectCardDetail: {
      title: "Project Card Staggered Entrance Animation",
      description:
        "How it's created:\n\n• Cards use <code class='code'>useAnimate</code> hook to orchestrate complex multi-step sequences\n• <code class='code'>inView</code> callback triggers animation when card enters viewport\n• Card positions calculated dynamically: x = 30 * index, y = 100 + index * 5, rotate = -20 + index * 5\n• Initial state: card positioned at top (y: -1000) with rotateY: 180 (flipped) and opacity: 0\n\nAnimation Sequence (5 steps):\n\n• Step 1: Fade in card (opacity: 0 to 1) in 0.3s with easeOut\n• Step 2: Rotate, position, and stack cards with rotation (-20 to 0) and x/y/left/zIndex transforms over 2s using backInOut easing\n• Step 3: Drop cards down (y increases by 400px) over 2s with backInOut easing\n• Step 4: Settle cards into final grid layout, reset rotation, reposition left based on card width and spacing calculations over 2s with easeInOut\n• Step 5: Add glowing box-shadow effect (0 to 170px glow) in 0.3s with easeIn\n\nCard Flip Animation:\n\n• Uses <code class='code'>AnimatePresence</code> with conditional rendering of back/front sides\n• Back side (front to user): Shows project image, title, description, tech icons with glowing shadows\n• Front side (back to user): Shows decorative spade icon on black background\n• Flip timing: Triggered ~6.88s after entrance + (index * 950ms) for staggered flip effect\n\nInteractive Effects:\n\n• <code class='code'>whileHover={{ scale: 1.05 }}</code> adds 5% scale increase on hover\n• Tech icons stack with overflow indicators (+N more) with hover scaling\n• Tech tooltip appears on +N button hover with smooth fade-in animation\n\nResult: Creates an impressive choreographed entrance where cards cascade in, settle into a grid layout, flip to reveal project details, with smooth hover interactions and layered visual effects",
      codeSnippet: `const createSequence = (vw: number): AnimationSequence => [
  [".card", { opacity: 1 }, { duration: 0.3, ease: "easeOut" }],
  [".card", {
    rotate: r,
    x: x,
    y: y,
    left: vw / 3,
    zIndex: 30 - index,
  }, { duration: 2, ease: "backInOut", delay: 0.2 }],
  [".card", { x: x, y: y + 400 }, { duration: 2, ease: "backInOut", delay: 1.5 }],
  [".card", {
    top: 0,
    left: (vw - N * cardWidth) / (N + 3) + index * (cardWidth + (vw - N * cardWidth) / (N + 2)),
    rotate: 0,
    rotateY: 0,
    y: 100,
  }, { duration: 2, ease: "easeInOut", delay: 0.9 * index }],
  [".card", { boxShadow: "0px 0px 170px -90px rgba(255,225,225, 0.5)" }, { duration: 0.3, ease: "easeIn" }],
];

// Trigger animation on viewport entry
const cleanup = inView(scope.current, () => {
  animation(createSequence(viewportWidth));
  setTimeout(() => setIsCardFlipped(true), 6880 + index * 950);
});

// Card flip with AnimatePresence
<AnimatePresence>
  {isCardFlipped ? (
    <motion.div className="inner rounded-lg bg-black p-4">
      {/* Front side: Project details */}
    </motion.div>
  ) : (
    <motion.div className="inner rounded-lg bg-black flex items-center justify-center">
      {/* Back side: Spade icon */}
    </motion.div>
  )}
</AnimatePresence>`,
    },
  };

  return (
    <div className="py-4">
      <div className="flex flex-col items-center px-8">
        <h1 className="font-36days text-6xl" data-cursor-hover="true">
          Hand Crafted Works
        </h1>
        <p>
          Each project tells a story of growth, upgrades, and milestones
          achieved -{" "}
          <span className="italic">from zero to something i am now</span>.
        </p>
      </div>

      <motion.div
        ref={scope}
        className="relative flex h-screen w-full justify-center gap-4 overflow-hidden px-8"
      >
        {list.map((item: CardItem, index) => (
          <NewCard key={index} index={index} data={item} />
        ))}

        <div className="absolute bottom-0 z-50 h-[2px] w-[50%] rounded-full border-none bg-white"></div>

        <motion.div
          className="absolute -top-[180%] -z-50 aspect-square rounded-full border border-none bg-transparent"
          initial={{
            width: 0,
            boxShadow: "0px 0px 0px 0px rgba(255,255,255,0.75)",
          }}
          animate={
            isInView
              ? {
                  width: "120%",
                  boxShadow:
                    theme === "light"
                      ? "0px 5px 80px 10px rgba(0,0,0,0.3)"
                      : "0px 5px 80px 10px rgba(255,255,255,0.55)",
                }
              : {
                  width: 0,
                  boxShadow: "0px 0px 0px 0px rgba(255,255,255,0.75)",
                }
          }
          transition={{ duration: 4, ease: "easeInOut" }}
        ></motion.div>

        {/* Semicircle Animation */}
        {developerMode && (
          <>
            <button
              className="absolute top-0 right-5 flex cursor-pointer hover:opacity-75"
              onClick={() => HandleDetailClick("semicircleDetail")}
            >
              <motion.p
                initial={{ x: 0, color: "#22c55e" }}
                animate={
                  detailList.semicircleDetail
                    ? { x: -5, color: "#ef4444" }
                    : { x: 0, color: "#22c55e" }
                }
                transition={{ duration: 0.2 }}
              >
                [
              </motion.p>
              <motion.p className="mx-1">3</motion.p>
              <motion.p
                initial={{ x: 0, color: "#22c55e" }}
                animate={
                  detailList.semicircleDetail
                    ? { x: 5, color: "#ef4444" }
                    : { x: 0, color: "#22c55e" }
                }
                transition={{ duration: 0.2 }}
              >
                ]
              </motion.p>
            </button>
            <AnimatePresence>
              {developerMode && detailList.semicircleDetail && (
                <DeveloperDetails
                  className="absolute top-8 right-5 z-70 text-xs"
                  data={data.semicircleDetail}
                  LabelProps={{ direction: "left", orientation: "up" }}
                />
              )}
            </AnimatePresence>
          </>
        )}

        {/* Project Card Animation */}
        {developerMode && (
          <>
            <button
              className="absolute top-16 left-80 flex cursor-pointer hover:opacity-75"
              onClick={() => HandleDetailClick("projectCardDetail")}
            >
              <motion.p
                initial={{ x: 0, color: "#22c55e" }}
                animate={
                  detailList.projectCardDetail
                    ? { x: -5, color: "#ef4444" }
                    : { x: 0, color: "#22c55e" }
                }
                transition={{ duration: 0.2 }}
              >
                [
              </motion.p>
              <motion.p className="mx-1">4</motion.p>
              <motion.p
                initial={{ x: 0, color: "#22c55e" }}
                animate={
                  detailList.projectCardDetail
                    ? { x: 5, color: "#ef4444" }
                    : { x: 0, color: "#22c55e" }
                }
                transition={{ duration: 0.2 }}
              >
                ]
              </motion.p>
            </button>

            <AnimatePresence>
              {developerMode && detailList.projectCardDetail && (
                <DeveloperDetails
                  className="absolute top-28 left-80 z-[70] text-xs"
                  data={data.projectCardDetail}
                  LabelProps={{ direction: "right", orientation: "up" }}
                />
              )}
            </AnimatePresence>
          </>
        )}
      </motion.div>
    </div>
  );
}
