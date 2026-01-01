import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useTransform,
  MotionValue,
} from "motion/react";
import { Fragment, use, useEffect, useRef, useState } from "react";
import Image from "next/image";
import City from "@/assets/city.jpg";

export default function Contact({
  setCursorDisplay,
}: {
  setCursorDisplay: (visible: boolean) => void;
}) {
  const section = useRef(null);
  const container = useRef(null);
  const [isItVisible, setIsItVisible] = useState(false);

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

        <div className="absolute top-0 right-0 bottom-0 left-1/2 z-10 m-4 mr-8 flex flex-col items-start justify-between gap-4 overflow-y-auto rounded-xl bg-gray-400/30 p-8 text-black backdrop-blur-xs">
          <div className="">
            <p className="font-36days text-6xl">Let's Connect!</p>
            <p>You can share any thing with me :)</p>

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
                    email copied !
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
            <p>Note: Clicking send button will redirect you to your Gmail.</p>
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
            {[...Array(20)].map((_, i) => (
              <textPath
                key={i}
                href="#wave"
                startOffset={i * 15 + "%"}
                ref={(ref) => {
                  paths.current[i] = ref;
                }}
              >
                Lets connect! {i % 2 === 0 ? "💜" : "💙"}
              </textPath>
            ))}
          </text>
        </svg>
      </motion.div>

      <div ref={container} className="relative">
        <Social
          scrollYProgress={scrollYProgress}
          setCursorDisplay={setCursorDisplay}
        />
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
