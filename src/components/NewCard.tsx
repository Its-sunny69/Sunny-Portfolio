import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";
import {
  AnimatePresence,
  inView,
  motion,
  useAnimate,
  type AnimationSequence,
} from "motion/react";
import { useEffect, useState } from "react";
import useOutsideClick from "@/utlis/useOutsideClicks";
import DetailsCard from "@/components/DetailsCard";
import Image from "next/image";
import KingSvg from "@/assets/king.svg";
import { useTheme } from "next-themes";
import { StaticImageData } from "next/image";

type Data = {
  title: string;
  overview: string;
  imgURL: string | StaticImageData;
  description: string;
  features: string[];
  projectURLs: {
    label: string;
    url: string;
  }[];
  techListName: string;
  techListImg: (string | StaticImageData)[];
};

function NewCard({ data, index }: { data: Data; index: number }) {
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [isIconVisible, setIsIconVisible] = useState(false);
  const [isDetailCardOpen, setIsDetailCardOpen] = useState(false);
  const [viewportWidth, setViewportWidth] = useState<number | null>(null);

  const ref = useOutsideClick(() => setIsIconVisible(false));
  const detailCardRef = useOutsideClick(() => setIsDetailCardOpen(false));

  const [scope, animation] = useAnimate();
  const { theme } = useTheme();

  const cardWidth = viewportWidth && viewportWidth >= 768 ? 288 : 256; // lg breakpoint
  const N = 3;
  const gap = 24;
  const x = 30 * index;
  const y = 100 + index * 5;
  const r = -20 + index * 5;
  // Center formula: account for card width to center properly
  // Index 0 (left), index 1 (center at 0), index 2 (right)
  const leftX = index * (cardWidth + gap);

  const createSequence = (vw: number): AnimationSequence => [
    [".card", { opacity: 1 }, { duration: 0.3, ease: "easeOut" }],
    [
      ".card",
      {
        rotate: r,
        x: x,
        y: y,
        left: vw / 2 - cardWidth / 2 - 15,
        zIndex: 30 - index,
      },
      { duration: 2, ease: "backInOut", delay: 0.2 },
    ],
    [
      ".card",
      {
        x: x,
        y: y + 400,
      },
      { duration: 2, ease: "backInOut", delay: 1.5 },
    ],
    [
      ".card",
      {
        top: 0,
        left:
          vw <= 768
            ? leftX
            : (vw - N * cardWidth) / (N + 2) +
              index * (cardWidth + (vw - N * cardWidth) / (N + 2)),
        rotate: 0,
        rotateY: 0,
        y: 100,
      },
      { duration: 2, ease: "easeInOut", delay: 0.9 * index },
    ],
    [
      ".card",
      {
        boxShadow:
          theme === "light"
            ? "0px 0px 125px -90px rgba(0,0,0, 0.5)"
            : "0px 0px 170px -90px rgba(255,225,225, 0.6)",
      },
      { duration: 0.3, ease: "easeIn" },
    ],
  ];

  useEffect(() => {
    setViewportWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    if (viewportWidth === null || !scope.current) return;

    const cleanup = inView(scope.current, () => {
      animation(createSequence(viewportWidth));
      setTimeout(
        () => {
          setIsCardFlipped(true);
        },
        6880 + index * 950,
      );
    });

    return cleanup;
  }, [viewportWidth, animation, index, scope]);

  return (
    <div ref={scope} className="absolute inset-0 md:mx-2">
      <motion.div
        className="card absolute w-72 rounded-lg"
        initial={{
          left: 0,
          y: -1000,
          rotateY: 180,
          opacity: 0,
        }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="relative">
          <motion.div className="example-2 mx-2 md:mx-0">
            <AnimatePresence>
              {isCardFlipped ? (
                <motion.div
                  className="inner relative m-2 flex h-[30rem] cursor-pointer flex-col rounded-lg bg-black p-4 text-white"
                  onClick={() => setIsDetailCardOpen(true)}
                  title="View more details"
                >
                  <motion.div
                    className="cover absolute inset-0 z-20 bg-black"
                    initial={{
                      opacity: 1,
                    }}
                    animate={{ opacity: 0, display: "none" }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                  />

                  <Image
                    width={288}
                    height={192}
                    src={data.imgURL}
                    alt="project image"
                    style={{objectPosition: "top left"}}
                    className="h-48 w-full rounded-md object-cover"
                  />

                  <div className="flex flex-1 flex-col items-center justify-between">
                    <div>
                      <div className="mt-4 flex items-center justify-between">
                        <h2
                          className="font-36days text-xl"
                          data-cursor-hover="true"
                        >
                          {data.title}
                        </h2>
                        <a
                          href={data.projectURLs[0].url}
                          className="flex items-center justify-center"
                          data-cursor-hover="true"
                          title="view project"
                          target="_blank"
                        >
                          <LaunchRoundedIcon style={{ fontSize: 16 }} />
                        </a>
                      </div>

                      <p
                        className="my-5 text-sm text-gray-200"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 7,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {data.description}
                      </p>
                    </div>

                    <div className="relative flex h-7 w-full items-center justify-start">
                      {data.techListImg.slice(0, 3).map((icon, index) => (
                        <div
                          key={index}
                          style={{
                            transform: `translateX(${index * 22}px)`,
                            zIndex: 10 + index,
                          }}
                          className="absolute w-fit rounded-full border-3 border-black bg-[#181818] p-1.5 shadow-[0px_0px_97px_-13px_rgba(255,225,225,0.5)] transition-all duration-300 hover:z-50! hover:scale-105"
                        >
                          <Image
                            width={20}
                            height={20}
                            src={icon}
                            className="h-5 w-5"
                            alt="icons"
                          />
                        </div>
                      ))}

                      <motion.button
                        className="absolute z-13 w-fit translate-x-[4.125rem] rounded-full border-3 border-black bg-[#181818] p-1.5 transition-all duration-300 select-none hover:z-50! hover:scale-105 hover:cursor-pointer hover:bg-[#e8e8e8] hover:text-[#181818]"
                        onHoverStart={() => setIsIconVisible(true)}
                        onHoverEnd={() => setIsIconVisible(false)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        exit={{ opacity: 0 }}
                      >
                        <p className="flex h-5 w-5 items-center justify-center text-xs">
                          +{data.techListImg.length - 3}
                        </p>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  className="font-nohemi inner m-2 flex h-[30rem] items-center justify-center rounded-lg bg-black p-4 font-light text-white"
                  exit={{ opacity: 0 }}
                >
                  <Image
                    width={200}
                    height={200}
                    src={KingSvg}
                    alt="king image"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <AnimatePresence>
            {isIconVisible && (
              <motion.div
                ref={ref}
                className={`absolute -bottom-9 left-2 z-14 flex items-center justify-start gap-2 rounded-full bg-black px-3 py-2`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                exit={{ opacity: 0, y: -10 }}
              >
                {data.techListImg.map((icon, index) => (
                  <div
                    key={index}
                    className="rounded-full bg-[#181818] p-1.5 shadow-[0px_0px_97px_-13px_rgba(255,225,225,0.5)]"
                  >
                    <Image
                      width={20}
                      height={20}
                      src={icon}
                      className="h-5 w-5"
                      alt="icons"
                    />
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <AnimatePresence>
        {isDetailCardOpen && (
          <motion.div
            className="fixed inset-0 z-60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "backOut" }}
          >
            <DetailsCard data={data} ref={detailCardRef} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default NewCard;
