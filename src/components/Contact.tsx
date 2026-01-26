import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useTransform,
  MotionValue,
} from "motion/react";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Profile3 from "@/assets/contact.webp";
import DeveloperDetails from "./DeveloperDetails";
import { DeveloperContext } from "@/context/developerContext";
import { useTheme } from "next-themes";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import PriorityHighRoundedIcon from "@mui/icons-material/PriorityHighRounded";
import SentimentDissatisfiedRoundedIcon from "@mui/icons-material/SentimentDissatisfiedRounded";
import { contactDeveloperData } from "@/data/developerDetailsData";

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
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState("");

  const { developerMode } = useContext(DeveloperContext);

  const { theme } = useTheme();

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

  useEffect(() => {
    if (isSent) {
      const timer = setTimeout(() => {
        setIsSent("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isSent]);

  const handleCopy = () => {
    const email = "ranjeetyadav31638@gmail.com";

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(email)
        .then(() => {
          setIsItVisible(true);
        })
        .catch(() => {
          fallbackCopy(email);
        });
    } else {
      // Fallback for older browsers or non-secure contexts
      fallbackCopy(email);
    }
  };

  const fallbackCopy = (text: string) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();

    try {
      document.execCommand("copy");
      setIsItVisible(true);
    } catch (err) {
      console.error("Copy failed:", err);
    }

    document.body.removeChild(textarea);
  };

  const handleMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleMail = async () => {
    if (message.trim().length === 0) {
      setIsSent("Message cannot be empty.");
      return;
    }

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const text = await res.text();

      if (!res.ok) {
        console.error("API Error:", text);
        setIsSent("Failed to send message.");
        return;
      } else {
        setIsSent("Message Sent!");
        setMessage("");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const HandleDetailClick = (key: keyof typeof detailList) => {
    setdetailList((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  return (
    <div className="h-screen w-full bg-white pt-16 text-black">
      <div className="flex flex-col items-center px-2 md:px-8">
        <h1
          className="font-36days text-3xl md:text-4xl lg:text-6xl"
          data-cursor-hover="true"
        >
          Open a Conversation
        </h1>
        <p className="pt-2 text-center">
          No Redirect, Email ID required -
          <span className="italic"> just write and hit send!</span>
        </p>
      </div>

      <motion.div className="relative mt-16 min-h-[38rem] overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent"></div>

        <motion.div
          className="absolute left-32 h-56 w-36 md:left-28 lg:left-[18.5%]"
          style={{ y: imgY, scale: imgScale }}
        >
          <Image src={Profile3} alt="profile picture" fill className="object-cover" />
        </motion.div>

        <svg viewBox="1 0 25 12" className="mt-28 w-full lg:mt-0" ref={section}>
          <path
            d="M 0 10 C 4 11 10 10 10 5 C 10 0 4 0 4 5 C 4 10 11 12 15 10 S 20 0 29 5"
            id="wave"
            fill="none"
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

        <div className="top-0 right-0 bottom-0 left-3/7 z-10 m-4 mr-4 flex flex-col items-start justify-between gap-2 rounded-xl bg-gray-400/30 p-4 text-black backdrop-blur-xs md:absolute lg:mr-8 lg:gap-4 lg:p-8">
          <div className="">
            <p
              className="font-36days text-2xl lg:text-4xl"
              data-cursor-hover="true"
            >
              Your Turn to Say Hi!
            </p>
            <p className="mt-2">
              Let's Connect, You can share any thing with me :&#41;
            </p>

            <div className="mt-6 flex flex-col items-start gap-2 lg:flex-row lg:gap-4">
              <p className="w-fit rounded-full bg-gray-600/30 px-6 py-2 text-xs">
                ranjeetyadav31638@gmail.com
              </p>

              <div>
                <div className="">
                  <button
                    className="button-circular-reveal-2 left-0 cursor-pointer rounded-full bg-[#4a556542] px-6 py-2 text-xs transition-all hover:text-white active:text-white"
                    onClick={handleCopy}
                  >
                    Copy
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
              className="max-h-64 min-h-44 max-w-96 rounded-xl bg-gray-600/30 p-4 text-sm text-black focus:outline-none"
              maxLength={200}
              placeholder="Leave your feedback here anonymously...but if you are one of my friend or classmate then do mention your name ( • ‿ - ) ✧"
              onChange={handleMessage}
            ></textarea>

            <button
              className="button-circular-reveal-3 font-36days w-fit cursor-pointer rounded-full bg-black px-6 py-2 text-xl text-white transition-all hover:text-black active:text-black lg:text-3xl"
              onClick={handleMail}
            >
              Send &rarr;
            </button>
            <p className="text-sm" data-cursor-hover="true">
              Note: If for some reason the message is not sent, you can mail me
              directly.
            </p>
          </div>
        </div>

        <AnimatePresence>
          {isSent.length && (
            <motion.div
              className={`fixed top-5 right-5 z-50 flex items-center justify-center gap-2 overflow-hidden rounded-md ${theme === "light" ? "bg-black text-white" : "bg-white text-black"} px-6 py-2 text-sm shadow-lg`}
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              {isSent.includes("empty") ? (
                <motion.p
                  initial={{ x: 0 }}
                  animate={{ x: [0, -5, 5, -5, 5, 0] }}
                  transition={{ duration: 0.5 }}
                  className="text-orange-400"
                >
                  <SentimentDissatisfiedRoundedIcon />
                </motion.p>
              ) : isSent.includes("Failed") ? (
                <motion.p
                  initial={{ rotate: 0 }}
                  animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="text-red-500"
                >
                  <PriorityHighRoundedIcon />
                </motion.p>
              ) : (
                <motion.p
                  initial={{ x: -50, y: 50, scale: 0.5, rotate: -45 }}
                  animate={{
                    x: [-50, 0, 50],
                    y: [50, 0, -50],
                    scale: [0.5, 1, 0.5],
                  }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="text-green-400"
                >
                  <SendRoundedIcon />
                </motion.p>
              )}
              {isSent}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Text scroll Animation */}
        {developerMode && (
          <>
            <button
              className="absolute top-0 left-10 flex cursor-pointer text-black hover:opacity-75 md:left-72"
              onClick={() => HandleDetailClick("textPathScrollDetail")}
            >
              <motion.p
                initial={{ x: 0, color: "black" }}
                animate={
                  detailList.textPathScrollDetail
                    ? { x: -5, color: "#ef4444" }
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
                    ? { x: 5, color: "#ef4444" }
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
                  className="absolute top-10 left-8 z-70 text-xs md:left-72"
                  data={contactDeveloperData.textPathScrollDetail}
                  LabelProps={{
                    direction: "right",
                    orientation: "up",
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
              className="absolute top-5 left-10 flex cursor-pointer text-white hover:opacity-75"
              onClick={() => HandleDetailClick("slowRevealingSectionDetail")}
            >
              <motion.p
                initial={{ x: 0, color: "#22c55e" }}
                animate={
                  detailList.slowRevealingSectionDetail
                    ? { x: -5, color: "#ef4444" }
                    : { x: 0, color: "#22c55e" }
                }
                transition={{ duration: 0.2 }}
              >
                [
              </motion.p>
              <motion.p className="mx-1">11</motion.p>
              <motion.p
                initial={{ x: 0, color: "#22c55e" }}
                animate={
                  detailList.slowRevealingSectionDetail
                    ? { x: 5, color: "#ef4444" }
                    : { x: 0, color: "#22c55e" }
                }
                transition={{ duration: 0.2 }}
              >
                ]
              </motion.p>
            </button>

            <AnimatePresence>
              {developerMode && detailList.slowRevealingSectionDetail && (
                <DeveloperDetails
                  className="absolute top-15 left-8 z-70 text-xs md:top-10 md:left-10"
                  data={contactDeveloperData.slowRevealingSectionDetail}
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

  const y = useTransform(scrollYProgress, [0, 1], [-50, 0]);

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
        initial={false}
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
              rel="noopener noreferrer"
            >
              <p
                className={`mx-4 font-medium ${link.color} bg-clip-text text-xl transition-all hover:text-transparent md:text-3xl`}
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
