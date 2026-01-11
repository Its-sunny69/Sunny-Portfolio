import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useTransform,
  MotionValue,
} from "motion/react";
import { Fragment, use, useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import City from "@/assets/city.jpg";
import DeveloperDetails from "./DeveloperDetails";
import { DeveloperContext } from "@/context/developerContext";

export default function Contact({
  setCursorDisplay,
}: {
  setCursorDisplay: (visible: boolean) => void;
}) {
  const section = useRef(null);
  const container = useRef(null);
  const [isItVisible, setIsItVisible] = useState(false);
  const [detailList, setdetailList] = useState({
    textPathScrollDetail: false,
    slowRevealingSectionDetail: false,
  });

  const { developerMode } = useContext(DeveloperContext);

  const paths = useRef<(SVGTextPathElement | null)[]>([]);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"],
  });
  const { scrollYProgress: sectionScrollY } = useScroll({
    target: section,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(sectionScrollY, [0.1, 0.5, 0.9], [700, 200, -700]);
  const imgScale = useTransform(
    sectionScrollY,
    [0.1, 0.5, 0.9],
    [0.8, 1.5, 0.8],
  );

  useEffect(() => {
    sectionScrollY.on("change", (e) => {
      paths.current.forEach((path, i) => {
        if (path) {
          path.setAttribute("startOffset", -15 + i * 15 + e * 15 + "%");
        }
      });
    });
  }, []);

  useEffect(() => {
    if (isItVisible) {
      setTimeout(() => setIsItVisible(false), 2000);
    }
  }, [isItVisible]);

  const handleCopy = () => {
    navigator.clipboard.writeText("ranjeetyadav31638@gmail.com");
    setIsItVisible(true);
  };

  const handleMail = () => {
    window.open(
      "https://mail.google.com/mail/?view=cm&fs=1&to=ranjeetyadav31638@gmail.com",
      "_blank",
    );
  };

  const HandleDetailClick = (key: keyof typeof detailList) => {
    setdetailList((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const data = {
    textPathScrollDetail: {
      title: "Scroll-Driven Wavy Text Path Animation",
      description:
        "How it's created:\n\n• Binds scroll progress to an SVG section using <code class='code'>useScroll({ target: section, offset: [\"start end\", \"end start\"] })</code> to get <code class='code'>sectionScrollY</code>\n• Defines an SVG wave path using Bezier curves: <code class='code'>d=\"M 0 10 C 4 11 10 10 10 5 C ...\"</code>\n• Creates 40 <code class='code'>textPath</code> elements that each follow the wave path via <code class='code'>href=\"#wave\"</code>\n• Stores refs to all textPath elements in <code class='code'>paths.current</code> array for dynamic control\n• Each textPath is initialized with a staggered <code class='code'>startOffset={i * 35 + \"%\"}</code>\n\nAnimation Logic:\n\n• Initial: Each textPath positioned along the wave at offset <code class='code'>i * 35%</code>, creating a repeating pattern\n• On scroll: Uses <code class='code'>sectionScrollY.on(\"change\")</code> listener to update <code class='code'>startOffset</code> dynamically\n• Formula: <code class='code'>startOffset = -15 + i * 15 + e * 15</code> where <code class='code'>e</code> is scroll progress (0-1)\n• Result: Text flows along the wave from bottom-left to top-right as user scrolls, creating a continuous wavy scrolling effect\n\nKey Technical Details:\n\n• SVG <code class='code'>&lt;textPath&gt;</code> element: anchors text to follow the path defined by <code class='code'>href=\"#wave\"</code>\n• <code class='code'>startOffset</code> attribute: controls where along the path the text starts (in percentage or pixel units)\n• The negative base <code class='code'>-15</code> shifts text off-screen initially; <code class='code'>i * 15</code> spaces copies; <code class='code'>e * 15</code> scrolls them smoothly\n• All 40 textPath refs stored in array for batch updates on every scroll frame\n• <code class='code'>offset: [\"start end\", \"end start\"]</code> triggers animation when section enters and leaves viewport\n\nResult: A mesmerizing wave of repeating text that flows smoothly along a curved path as you scroll, perfect for eye-catching hero sections or decorative animations",
      codeSnippet: `// Scroll progress for the SVG section
const section = useRef(null);
const paths = useRef<(SVGTextPathElement | null)[]>([]);
const { scrollYProgress: sectionScrollY } = useScroll({
  target: section,
  offset: ["start end", "end start"],
});

// Update all textPath startOffsets on scroll
useEffect(() => {
  sectionScrollY.on("change", (e) => {
    paths.current.forEach((path, i) => {
      if (path) {
        // Dynamic formula: base offset + stagger + scroll animation
        path.setAttribute("startOffset", -15 + i * 15 + e * 15 + "%");
      }
    });
  });
}, []);

// Wave path definition
<svg viewBox="1 0 25 12" className="w-full" ref={section}>
  <path
    d="M 0 10 C 4 11 10 10 10 5 C 10 0 4 0 4 5 C 4 10 11 12 15 10 S 20 0 29 5"
    id="wave"
    fill="none"
  />

  {/* 40 copies of text, each following the wave path */}
  <text className="text-[1px] tracking-tight select-none" fill="black">
    {[...Array(40)].map((_, i) => (
      <textPath
        key={i}
        href="#wave"
        startOffset={i * 35 + "%"}
        ref={(ref) => {
          paths.current[i] = ref;
        }}
      >
        Lets connect! {i % 2 === 0 ? "💜" : "💙"}
      </textPath>
    ))}
  </text>
</svg>`,
    },
    slowRevealingSectionDetail: {
      title: "Scroll-Driven Vertical Slide-Up Reveal Animation",
      description:
        "How it's created:\n\n• Binds scroll progress to the social section container using <code class='code'>useScroll({ target: container, offset: [\"start end\", \"end end\"] })</code> to get <code class='code'>scrollYProgress</code>\n• Uses <code class='code'>useTransform(scrollYProgress, [0, 1], [-220, 0])</code> to map scroll progress (0-1) to Y translation (-220px to 0px)\n• Applies the transformed Y value to a <code class='code'>motion.div</code> via <code class='code'>style={{ y }}</code> to create smooth vertical movement\n• Social links are rendered directly inside the sliding container\n\nAnimation Logic:\n\n• Initial: Section positioned at <code class='code'>y = -220px</code> (off-screen, hidden below viewport)\n• While scrolling: As user scrolls and progress increases from 0 to 1, section smoothly slides upward\n• Final: At full scroll progress (1), section reaches <code class='code'>y = 0px</code> (natural position, fully visible in viewport)\n• The entire section translates vertically based on scroll position, no individual element delays\n\nKey Technical Details:\n\n• <code class='code'>useTransform</code> creates a continuous, real-time mapping from scroll progress to Y position\n• Input range <code class='code'>[0, 1]</code> represents scroll progress from start to end\n• Output range <code class='code'>[-220, 0]</code> defines vertical translation in pixels\n• <code class='code'>offset: [\"start end\", \"end end\"]</code> triggers animation when container enters viewport and stays visible\n• Motion values update automatically; no manual animation frame or effect listeners needed\n• <code class='code'>bg-clip-text</code> with gradient backgrounds creates colored link text\n\nResult: A smooth, scroll-reactive vertical slide-up animation that brings the entire social links section into view as the user scrolls.",
      codeSnippet: `// Scroll progress for the social section container
const container = useRef(null);
const { scrollYProgress } = useScroll({
  target: container,
  offset: ["start end", "end end"],
});

// Map scroll progress to Y translation: 0 → 1 maps to -220px → 0px
const y = useTransform(scrollYProgress, [0, 1], [-220, 0]);

// Slide up container from off-screen to visible
<motion.div
  style={{ y }}
  className="flex h-full w-full items-center justify-center bg-black py-4 text-white"
>
  <hr className="h-[0.5px] w-full bg-white/30" />
  {socialLinks.map((link) => (
    <Fragment key={link.name}>
      <a href={link.url} target="_blank">
        <p className={\`\${link.color} bg-clip-text text-3xl transition-all hover:text-transparent\`}>
          {link.name}
        </p>
      </a>
      <hr className="h-[0.5px] w-full bg-white/30" />
    </Fragment>
  ))}
</motion.div>`,
    },
  };

  return (
    <div className="h-screen w-full bg-white pt-16 text-white">
      <motion.div className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent"></div>

        <motion.div
          className="absolute h-56 w-36"
          style={{ x: 250, y: imgY, scale: imgScale }}
        >
          <Image src={City} alt="Description" fill className="object-cover" />
        </motion.div>

        <div className="absolute top-0 right-0 bottom-0 left-3/7 z-10 m-4 mr-8 flex flex-col items-start justify-between gap-4 overflow-y-auto rounded-xl bg-gray-400/30 p-8 text-black backdrop-blur-xs">
          <div className="">
            <p className="font-36days text-6xl" data-cursor-hover="true">
              Your Turn to Say Hi!
            </p>
            <p className="mt-2">
              Let's Connect, You can share any thing with me :)
            </p>

            <div className="mt-6 flex items-start gap-4">
              <p className="w-fit rounded-full bg-gray-600/30 px-6 py-2 text-xs">
                ranjeetyadav31638@gmail.com
              </p>

              <div>
                <div className="">
                  <button
                    className="button-circular-reveal-2 left-0 cursor-pointer rounded-l-full bg-[#4a556542] px-6 py-2 text-xs transition-all hover:text-white"
                    style={{
                      clipPath: "polygon(0 0, 100% 0%, 75% 100%, 0% 100%)",
                    }}
                    onClick={handleCopy}
                  >
                    Copy
                  </button>
                  <button
                    className="button-circular-reveal-1 -left-4.5 cursor-pointer rounded-r-full bg-gray-600/30 px-6 py-2 text-xs transition-all hover:text-white"
                    style={{
                      clipPath:
                        "polygon(27.5% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    }}
                    onClick={handleMail}
                  >
                    Mail
                  </button>
                </div>
                <AnimatePresence>
                  <motion.div
                    className={`py-1 text-center text-xs`}
                    initial={{ opacity: 0, y: -8 }}
                    animate={
                      isItVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }
                    }
                    transition={{ duration: 0.3 }}
                    exit={{ opacity: 0, y: -8 }}
                  >
                    Email Copied !
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="mt- flex flex-1 flex-col justify-between gap-4">
            <textarea
              className="max-h-64 min-h-44 w-96 rounded-xl bg-gray-600/30 p-4 text-sm text-black focus:outline-none"
              maxLength={200}
              placeholder="Leave your feedback here..."
            ></textarea>

            <button
              className="button-circular-reveal-3 font-36days w-fit cursor-pointer rounded-full bg-black px-6 py-2 text-3xl text-white transition-all hover:text-black"
              onClick={handleMail}
            >
              Send &rarr;
            </button>
            <p className="text-sm" data-cursor-hover="true">
              Note: Clicking send button will redirect you to your Gmail.
            </p>
          </div>
        </div>

        <svg viewBox="1 0 25 12" className="w-full" ref={section}>
          <path
            d="M 0 10 C 4 11 10 10 10 5 C 10 0 4 0 4 5 C 4 10 11 12 15 10 S 20 0 29 5"
            id="wave"
            fill="none"
            // stroke="#fff"
            // strokeWidth="0.2"
          />

          <text className="text-[1px] tracking-tight select-none" fill="black">
            {[...Array(40)].map((_, i) => (
              <textPath
                key={i}
                href="#wave"
                startOffset={i * 35 + "%"}
                ref={(ref) => {
                  paths.current[i] = ref;
                }}
              >
                Lets connect! {i % 2 === 0 ? "💜" : "💙"}
              </textPath>
            ))}
          </text>
        </svg>

        {/* Text scroll Animation */}
        {developerMode && (
          <>
            <button
              className="absolute top-0 left-72 flex cursor-pointer text-black hover:opacity-75"
              onClick={() => HandleDetailClick("textPathScrollDetail")}
            >
              <motion.p
                initial={{ x: 0, color: "black" }}
                animate={
                  detailList.textPathScrollDetail
                    ? { x: -5, color: "red" }
                    : { x: 0, color: "black" }
                }
                transition={{ duration: 0.2 }}
              >
                [
              </motion.p>
              <motion.p className="mx-1">10</motion.p>
              <motion.p
                initial={{ x: 0, color: "black" }}
                animate={
                  detailList.textPathScrollDetail
                    ? { x: 5, color: "red" }
                    : { x: 0, color: "black" }
                }
                transition={{ duration: 0.2 }}
              >
                ]
              </motion.p>
            </button>

            <AnimatePresence>
              {developerMode && detailList.textPathScrollDetail && (
                <DeveloperDetails
                  className="absolute top-10 left-72 z-70 text-xs"
                  data={data.textPathScrollDetail}
                  LabelProps={{
                    direction: "right",
                    orientation: "up",
                    strokeColor: "black",
                  }}
                />
              )}
            </AnimatePresence>
          </>
        )}
      </motion.div>

      <div ref={container} className="relative">
        <Social
          scrollYProgress={scrollYProgress}
          setCursorDisplay={setCursorDisplay}
        />

        {/*Slow Reveling Section Animation */}
        {developerMode && (
          <>
            <button
              className="absolute top-5 left-10 flex cursor-pointer hover:opacity-75"
              onClick={() => HandleDetailClick("slowRevealingSectionDetail")}
            >
              <motion.p
                initial={{ x: 0, color: "#05df72" }}
                animate={
                  detailList.slowRevealingSectionDetail
                    ? { x: -5, color: "red" }
                    : { x: 0, color: "#05df72" }
                }
                transition={{ duration: 0.2 }}
              >
                [
              </motion.p>
              <motion.p className="mx-1">11</motion.p>
              <motion.p
                initial={{ x: 0, color: "#05df72" }}
                animate={
                  detailList.slowRevealingSectionDetail
                    ? { x: 5, color: "red" }
                    : { x: 0, color: "#05df72" }
                }
                transition={{ duration: 0.2 }}
              >
                ]
              </motion.p>
            </button>

            <AnimatePresence>
              {developerMode && detailList.slowRevealingSectionDetail && (
                <DeveloperDetails
                  className="absolute top-10 left-10 z-70 text-xs"
                  data={data.slowRevealingSectionDetail}
                  LabelProps={{ direction: "right", orientation: "up" }}
                />
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
}

const Social = ({
  scrollYProgress,
  setCursorDisplay,
}: {
  scrollYProgress: MotionValue<number>;
  setCursorDisplay: (visible: boolean) => void;
}) => {
  const [linkVisible, setLinkVisible] = useState<string | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const y = useTransform(scrollYProgress, [0, 1], [-220, 0]);
  console.log(y);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();

    mouseX.set(e.clientX - rect.left + 20);
    mouseY.set(e.clientY - rect.top - 70);
  };

  const socialLinks = [
    {
      name: "Linkedin",
      url: "https://www.linkedin.com/in/sunny-yadav-557676249/",
      color: "bg-[#0A66C2]",
    },
    {
      name: "Github",
      url: "https://github.com/Its-sunny69/",
      color: "bg-[#181717]",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/its__sunny69/",
      color:
        "bg-[linear-gradient(45deg,_#feda75,_#fa7e1e,_#d62976,_#962fbf,_#4f5bd5)]",
    },
  ];

  const handleMouseEnter = (name: string) => {
    setLinkVisible(name);
    setCursorDisplay(false);
  };

  const handleMouseLeave = () => {
    setCursorDisplay(true);
    setLinkVisible(null);
  };

  return (
    <div className="h-[250px] w-full overflow-hidden shadow-[0px_36px_41px_17px_rgba(0,0,0,1)]">
      <motion.div
        style={{ y }}
        className="flex h-full w-full items-center justify-center bg-black py-4 text-white"
      >
        <hr className="h-[0.5px] w-full bg-white/30" />
        {socialLinks.map((link) => (
          <Fragment key={link.name}>
            <a
              href={link.url}
              onMouseMove={(e) => handleMouseMove(e)}
              onMouseEnter={() => handleMouseEnter(link.name)}
              onMouseLeave={handleMouseLeave}
              target="_blank"
            >
              <p
                className={`mx-4 font-medium ${link.color} bg-clip-text text-3xl transition-all hover:text-transparent`}
              >
                {link.name}
              </p>

              <AnimatePresence>
                {linkVisible && linkVisible === link.name && (
                  <motion.p
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    style={{
                      position: "absolute",
                      x: mouseX,
                      y: mouseY,
                    }}
                    className="rounded-full bg-white/20 px-4 py-2 text-sm backdrop-blur-xs"
                  >
                    Connect on {link.name}!
                  </motion.p>
                )}
              </AnimatePresence>
            </a>
            <hr className="h-[0.5px] w-full bg-white/30" />
          </Fragment>
        ))}
      </motion.div>
    </div>
  );
};
