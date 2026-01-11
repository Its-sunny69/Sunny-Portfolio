import {
  motion,
  useMotionValue,
  useAnimationFrame,
  useScroll,
  useTransform,
  AnimatePresence,
} from "motion/react";
import { useState, useRef, useEffect, useContext } from "react";
import Image from "next/image";
//Programming Icons
import Html5Icon from "@/assets/programming-icons/html5.svg";
import Css3Icon from "@/assets/programming-icons/css3.svg";
import Javascript from "@/assets/programming-icons/javascript.svg";
import Typescript from "@/assets/programming-icons/typescript.svg";
import Reactjs from "@/assets/programming-icons/reactjs.svg";
import Nextjs from "@/assets/programming-icons/nextjs.svg";
import Nodejs from "@/assets/programming-icons/nodejs.svg";
import Mongodb from "@/assets/programming-icons/mongodb.svg";
import Tailwindcss from "@/assets/programming-icons/tailwindcss.svg";
//Tool Icons
import Github from "@/assets/tool-icons/github.svg";
import Git from "@/assets/tool-icons/git.svg";
import Vscode from "@/assets/tool-icons/vscode.svg";
import Chatgpt from "@/assets/tool-icons/chatgpt.svg";
import Postman from "@/assets/tool-icons/postman.svg";
import GithubCopilot from "@/assets/tool-icons/github-copilot.svg";
import MaterialUi from "@/assets/tool-icons/material-ui.svg";
import ShadcnUi from "@/assets/tool-icons/shadcn-ui.svg";
import { div } from "motion/react-client";
import RevealingText from "./RevealingText";
import DeveloperDetails from "./DeveloperDetails";
import { DeveloperContext } from "@/context/developerContext";

const items1 = [
  {
    name: "HTML5",
    Icon: Html5Icon,
    textColor1: "#e44d26",
    textColor2: "#F16529",
  },
  {
    name: "CSS3",
    Icon: Css3Icon,
    textColor1: "#1172b8",
    textColor2: "#33aadd",
  },
  {
    name: "Javascript",
    Icon: Javascript,
    textColor1: "#f7df1e",
    textColor2: "#f7df1e",
  },
  {
    name: "Typescript",
    Icon: Typescript,
    textColor1: "#007acc",
    textColor2: "#007acc",
  },
  {
    name: "ReactJs",
    Icon: Reactjs,
    textColor1: "#00d8ff",
    textColor2: "#00d8ff",
  },
  {
    name: "NextJs",
    Icon: Nextjs,
    textColor1: "#000000",
    textColor2: "#000000",
  },
  {
    name: "NodeJs",
    Icon: Nodejs,
    textColor1: "#8cc84b",
    textColor2: "#8cc84b",
  },
  {
    name: "MongoDb",
    Icon: Mongodb,
    textColor1: "#4ca84c",
    textColor2: "#439945",
  },
  {
    name: "TailwindCSS",
    Icon: Tailwindcss,
    textColor1: "#2298BD",
    textColor2: "#0ED7B5",
  },
];

const items2 = [
  {
    name: "Github",
    Icon: Github,
    textColor1: "#000000",
    textColor2: "#000000",
  },
  { name: "Git", Icon: Git, textColor1: "#ee513b", textColor2: "#ee513b" },
  {
    name: "Vscode",
    Icon: Vscode,
    textColor1: "#007acc",
    textColor2: "#1f9cf0",
  },
  {
    name: "Chatgpt",
    Icon: Chatgpt,
    textColor1: "#000000",
    textColor2: "#000000",
  },
  {
    name: "Postman",
    Icon: Postman,
    textColor1: "#ff6c37",
    textColor2: "#ff6c37",
  },
  {
    name: "Copilot",
    Icon: GithubCopilot,
    textColor1: "#000000",
    textColor2: "#000000",
  },
  {
    name: "Material UI",
    Icon: MaterialUi,
    textColor1: "#29b6f6",
    textColor2: "#0288d1",
  },
  {
    name: "Shadcn UI",
    Icon: ShadcnUi,
    textColor1: "#ffffff",
    textColor2: "#ffffff",
  },
];

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

    const halfWidth = items1.length * ITEM_WIDTH;

    // seamless reset
    if (x1.get() <= -halfWidth) {
      x1.set(0);
    }
  });

  useAnimationFrame((_, delta) => {
    const moveBy = (velocity2 * delta) / 1000;
    x2.set(x2.get() + moveBy);

    const halfWidth = items2.length * ITEM_WIDTH;

    // seamless reset
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

  const data = {
    hoverTextRevealingDetail: {
      title: "Cursor-Following Circular Text Reveal Animation",
      description:
        "How it's created:\n\n• Uses <code class='code'>useMotionValue</code> to track real-time cursor position (mouseX, mouseY) and reveal radius\n• <code class='code'>useSpring</code> smooths all values with physics: stiffness: 300, damping: 30 for responsive but natural motion\n• <code class='code'>useTransform</code> creates dynamic radial gradient mask that follows cursor: <code class='code'>radial-gradient(circle ${r}px at ${x}px ${y}px, black 0%, transparent 100%)</code>\n• Mask applied via <code class='code'>maskImage</code> and <code class='code'>WebkitMaskImage</code> (webkit prefix for browser support)\n\nAnimation Logic:\n\n• Initial: radius = 0 (invisible), opacity = 0, \"Hover Me\" text visible\n• On mouseEnter: radius animates to 80px via spring physics, \"Hover Me\" fades out, main content fades to opacity 0.4\n• On mouseMove: maskImage updates in real-time with current cursor coordinates within container bounds\n• On mouseLeave: radius returns to 0, \"Hover Me\" fades back in, content fades out\n• Spring physics makes cursor feel responsive and smooth, not snappy\n\nKey Technical Details:\n\n• <code class='code'>getBoundingClientRect()</code> calculates offset between viewport and container to ensure precise cursor tracking\n• Gradient uses <code class='code'>black</code> for fully visible area, <code class='code'>transparent</code> for fully hidden area\n• Circular reveal creates smooth feathered edges through gradient's 0% → 100% transition\n• Separate state for hover vs motion values allows independent control of animation timing\n\nInteractive Features:\n\n• Optional <code class='code'>HoverMe</code> prop shows/hides initial prompt text\n• Optional <code class='code'>textOrientation</code> prop supports sideways text writing mode\n• <code class='code'>pointer-events-none</code> prevents mask from interfering with clicks\n\nResult: Creates an elegant, interactive reveal effect where content inside a circular area centered on the cursor becomes visible, perfect for highlighting specific UI elements or text during hover interactions",
      codeSnippet: `const [isHovering, setIsHovering] = useState(false);

const mouseX = useMotionValue(0);
const mouseY = useMotionValue(0);
const radius = useMotionValue(0);

const smoothX = useSpring(mouseX, { stiffness: 300, damping: 30 });
const smoothY = useSpring(mouseY, { stiffness: 300, damping: 30 });
const smoothRadius = useSpring(radius, { stiffness: 300, damping: 30 });

// Create dynamic radial gradient mask following cursor
const maskImage = useTransform(
  [smoothX, smoothY, smoothRadius],
  ([x, y, r]) =>
    \`radial-gradient(circle \${r}px at \${x}px \${y}px, black 0%, transparent 100%)\`
);

useEffect(() => {
  radius.set(isHovering ? 80 : 0);
}, [isHovering, radius]);

const handleMouseMove = (e: React.MouseEvent) => {
  if (!containerRef.current) return;
  const rect = containerRef.current.getBoundingClientRect();
  mouseX.set(e.clientX - rect.left);
  mouseY.set(e.clientY - rect.top);
};

<div
  onMouseMove={handleMouseMove}
  onMouseEnter={() => setIsHovering(true)}
  onMouseLeave={() => setIsHovering(false)}
>
  <motion.div
    style={{ maskImage, WebkitMaskImage: maskImage }}
    animate={{ opacity: isHovering ? 0.4 : 0 }}
  >
    {children}
  </motion.div>
</div>`,
    },
    infiniteScrollDetail: {
      title: "Infinite Carousel Scroll Animation",
      description:
        "How it's created:\n\n• Uses <code class='code'>useMotionValue</code> to track horizontal position (x1, x2) continuously\n• <code class='code'>useAnimationFrame</code> hook updates position every frame based on velocity: <code class='code'>moveBy = (velocity * delta) / 1000</code>\n• Two separate tracks scroll in opposite directions: x1 moves left (negative), x2 moves right (positive)\n• Items array is duplicated <code class='code'>[...items1, ...items1]</code> to create seamless loop\n• Velocity changes on hover: 160 px/sec normal → 80 px/sec when hovered (2x slower)\n\nSeamless Reset Logic:\n\n• Track 1: When <code class='code'>x1.get() <= -halfWidth</code>, reset to 0 (traveled full width, restart)\n• Track 2: When <code class='code'>x2.get() >= 0</code>, reset to <code class='code'>-halfWidth</code> (traveled full width backward, restart)\n• Duplicated items ensure no visual gap during reset - next item smoothly takes place of previous\n• <code class='code'>halfWidth = items.length * ITEM_WIDTH</code> (ITEM_WIDTH = 288px for w-72)\n\nHTML Structure:\n\n• Parent div has <code class='code'>overflow-hidden</code> to clip items outside bounds\n• Items styled with <code class='code'>w-72 shrink-0 grow-0 basis-auto</code> to maintain fixed width\n\nInteractive Controls:\n\n• <code class='code'>onMouseEnter</code> / <code class='code'>onMouseLeave</code> toggle <code class='code'>isTrack1Hovered</code> / <code class='code'>isTrack2Hovered</code> state\n• Velocity decreases on hover (160 → 80) for better readability\n• Gradient text on hover: <code class='code'>hover:text-transparent</code> reveals <code class='code'>backgroundImage</code> gradient\n\nOptimization Details:\n\n• <code class='code'>delta</code> parameter in useAnimationFrame provides frame time, enables frame-rate independent animation\n• Position calculation: <code class='code'>x1.set(x1.get() - moveBy)</code> decrements for leftward scroll\n• Duplicated items prevent empty space at end of array\n\nResult: Creates smooth, continuous infinite carousel with hover speed control, feathered edge transitions, and seamless item looping - perfect for showcasing skill items or product listings",
      codeSnippet: `const x1 = useMotionValue(0);
const x2 = useMotionValue(0);
const [isTrack1Hovered, setIsTrack1Hovered] = useState(false);

const velocity1 = isTrack1Hovered ? 80 : 160;

useAnimationFrame((_, delta) => {
  const moveBy = (velocity1 * delta) / 1000;
  x1.set(x1.get() - moveBy);

  const halfWidth = items1.length * ITEM_WIDTH;

  // Seamless reset when traveled full width
  if (x1.get() <= -halfWidth) {
    x1.set(0);
  }
});

<div className="overflow-hidden">
  <motion.div 
    className="flex" 
    style={{ x: x1, width: "max-content" }}
  >
    {[...items1, ...items1].map((item, idx) => (
      <div key={idx} className="w-72 shrink-0 grow-0 basis-auto">
        {/* Item content */}
      </div>
    ))}
  </motion.div>
</div>`,
    },
  };

  return (
    <div className="relative flex h-screen flex-col justify-between py-4">
      <RevealingText className="absolute top-0 right-0" HoverMe={true}>
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

      <RevealingText className="absolute bottom-0 left-0" HoverMe={true}>
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

      <div className="flex flex-col items-center px-8">
        <h1 className="font-36days text-6xl" data-cursor-hover="true">
          Skills
        </h1>
      </div>

      <div className="flex w-full flex-col items-center justify-center overflow-hidden">
        <div className="mb-6 w-full px-8">
          <p>Languages & Frameworks I Work With...</p>
        </div>
        <div
          className="mb-1 w-full overflow-hidden border-y border-dashed border-neutral-800 mask-r-from-black mask-r-from-70% mask-r-to-transparent mask-l-from-black mask-l-from-70% mask-l-to-transparent mask-alpha p-1"
          onMouseEnter={() => setIsTrack1Hovered(true)}
          onMouseLeave={() => setIsTrack1Hovered(false)}
        >
          <motion.div className="flex" style={{ x: x1, width: "max-content" }}>
            {[...items1, ...items1].map((item, idx) => (
              <div
                key={idx}
                className="flex h-24 w-72 shrink-0 grow-0 basis-auto items-center justify-center border-l border-dashed border-neutral-800 px-4"
              >
                <Image
                  className="grayscale-100"
                  src={item.Icon}
                  alt={`${item.name}`}
                  width={65}
                  height={65}
                />

                <span
                  className="ml-3 bg-clip-text text-2xl font-semibold transition-all hover:text-transparent"
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
            {[...items2, ...items2].map((item, idx) => (
              <div
                key={idx}
                className="flex h-24 w-72 shrink-0 grow-0 basis-auto items-center justify-center border-l border-dashed border-neutral-800 px-4"
              >
                <Image
                  className="grayscale-100"
                  src={item.Icon}
                  alt={`${item.name}`}
                  width={65}
                  height={65}
                />

                <span
                  className="ml-3 bg-clip-text text-2xl font-semibold transition-all hover:text-transparent"
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

      <div className="flex justify-end px-8">
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
            className="absolute top-0 right-96 flex cursor-pointer hover:opacity-75"
            onClick={() => HandleDetailClick("hoverTextRevealingDetail")}
          >
            <motion.p
              initial={{ x: 0, color: "#05df72" }}
              animate={
                detailList.hoverTextRevealingDetail
                  ? { x: -5, color: "red" }
                  : { x: 0, color: "#05df72" }
              }
              transition={{ duration: 0.2 }}
            >
              [
            </motion.p>
            <motion.p className="mx-1">6</motion.p>
            <motion.p
              initial={{ x: 0, color: "#05df72" }}
              animate={
                detailList.hoverTextRevealingDetail
                  ? { x: 5, color: "red" }
                  : { x: 0, color: "#05df72" }
              }
              transition={{ duration: 0.2 }}
            >
              ]
            </motion.p>
          </button>

          <AnimatePresence>
            {developerMode && detailList.hoverTextRevealingDetail && (
              <DeveloperDetails
                className="absolute top-5 right-96 z-70 text-xs"
                data={data.hoverTextRevealingDetail}
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
            className="absolute top-52 left-[28rem] flex cursor-pointer hover:opacity-75"
            onClick={() => HandleDetailClick("infiniteScrollDetail")}
          >
            <motion.p
              initial={{ x: 0, color: "#05df72" }}
              animate={
                detailList.infiniteScrollDetail
                  ? { x: -5, color: "red" }
                  : { x: 0, color: "#05df72" }
              }
              transition={{ duration: 0.2 }}
            >
              [
            </motion.p>
            <motion.p className="mx-1">7</motion.p>
            <motion.p
              initial={{ x: 0, color: "#05df72" }}
              animate={
                detailList.infiniteScrollDetail
                  ? { x: 5, color: "red" }
                  : { x: 0, color: "#05df72" }
              }
              transition={{ duration: 0.2 }}
            >
              ]
            </motion.p>
          </button>

          <AnimatePresence>
            {developerMode && detailList.infiniteScrollDetail && (
              <DeveloperDetails
                className="absolute top-56 left-[28rem] z-70 text-xs"
                data={data.infiniteScrollDetail}
                LabelProps={{ direction: "right", orientation: "up" }}
              />
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
