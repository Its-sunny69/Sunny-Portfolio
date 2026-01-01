import {
  motion,
  useMotionValue,
  useAnimationFrame,
  useScroll,
  useTransform,
} from "motion/react";
import { useState, useRef, useEffect } from "react";
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

  return (
    <div className="flex h-screen flex-col justify-between py-4">
      <div className="px-8 text-center">
        <h1 className="font-36days text-6xl">Skills</h1>
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

      <div className="px-8 text-center">
        <p className="font-36days text-sm text-neutral-800">
          Note: Skills are under continuous development. No final release yet.
        </p>
      </div>
    </div>
  );
}
