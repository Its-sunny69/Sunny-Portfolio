import { AnimatePresence, motion } from "motion/react";
import { useContext, useState } from "react";
import DetailsCard from "./DetailsCard";
import useOutsideClick from "@/utlis/useOutsideClicks";
import DeveloperDetails from "./DeveloperDetails";
import { DeveloperContext } from "@/context/developerContext";
import { useTheme } from "next-themes";
import { ProjectList2 } from "@/data/projectData";
import { projectDeveloperData2 } from "@/data/developerDetailsData";

export default function ProjectSection2() {
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const [isDetailCardOpen, setIsDetailCardOpen] = useState<{
    isOpen: boolean;
    index: number | null;
  }>({ isOpen: false, index: null });
  const [detailList, setdetailList] = useState({
    slidingBackground: false,
  });
  const { developerMode } = useContext(DeveloperContext);
  const { theme } = useTheme();

  const detailCardRef = useOutsideClick(() =>
    setIsDetailCardOpen({ isOpen: false, index: null }),
  );

  const HandleDetailClick = (key: keyof typeof detailList) => {
    setdetailList((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  return (
    <div className="relative my-8 flex w-full flex-col items-center justify-center px-4 md:px-8 dark:text-white">
      <p className="font-36days mb-2">Some more...</p>

      {ProjectList2.map((item, index) => (
        <motion.div
          key={index}
          className={`relative w-[90%] ${index !== ProjectList2.length - 1 ? "border-t" : "border-y"} border-black py-2 md:p-4 dark:border-white`}
          onHoverStart={() => setIsHovered(index)}
          onHoverEnd={() => setIsHovered(null)}
        >
          {isHovered === index && (
            <motion.div
              layoutId="inner-card"
              className="absolute inset-0 bg-black dark:bg-white"
              transition={{ type: "spring", stiffness: 120, damping: 14 }}
            />
          )}

          <motion.div
            className="relative z-10 grid grid-rows-3 gap-4 md:grid-cols-5 md:grid-rows-1 md:gap-0"
            animate={{
              color:
                isHovered === index
                  ? theme === "light"
                    ? "white"
                    : "black"
                  : theme === "light"
                    ? "black"
                    : "white",
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <h1
              className="col-span-1 transition-all duration-300"
              data-cursor-hover="true"
            >
              {item.title}
            </h1>

            <div className="col-span-3 flex justify-between transition-all duration-300">
              <div className="line-clamp-1 md:px-2">{item.overview}</div>
              <div
                className="group shrink-0 cursor-pointer text-center"
                onClick={() => setIsDetailCardOpen({ isOpen: true, index })}
              >
                more details
                <div className="h-[0.7px] w-0 bg-white transition-all duration-200 ease-out group-hover:w-full dark:bg-black"></div>
              </div>
            </div>

            <div
              className="col-span-1 flex justify-start transition-all duration-300 md:justify-end"
              data-cursor-hover="true"
            >
              <a
                href={item.projectURLs[0].url}
                className="group"
                target="_blank"
              >
                View Project
                <div className="h-[0.7px] w-0 bg-white transition-all duration-200 ease-out group-hover:w-full dark:bg-black"></div>
              </a>
            </div>
          </motion.div>
        </motion.div>
      ))}

      <AnimatePresence>
        {isDetailCardOpen.isOpen && isDetailCardOpen.index !== null && (
          <motion.div
            className="fixed inset-0 z-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "backOut" }}
          >
            <DetailsCard
              data={ProjectList2[isDetailCardOpen.index]}
              ref={detailCardRef}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {developerMode && (
        <>
          <button
            className="absolute top-0 left-10 flex cursor-pointer hover:opacity-75 md:left-48"
            onClick={() => HandleDetailClick("slidingBackground")}
          >
            <motion.p
              initial={{ x: 0, color: "#22c55e" }}
              animate={
                detailList.slidingBackground
                  ? { x: -5, color: "#ef4444" }
                  : { x: 0, color: "#22c55e" }
              }
              transition={{ duration: 0.2 }}
            >
              [
            </motion.p>
            <motion.p className="mx-1">5</motion.p>
            <motion.p
              initial={{ x: 0, color: "#22c55e" }}
              animate={
                detailList.slidingBackground
                  ? { x: 5, color: "#ef4444" }
                  : { x: 0, color: "#22c55e" }
              }
              transition={{ duration: 0.2 }}
            >
              ]
            </motion.p>
          </button>

          <AnimatePresence>
            {developerMode && detailList.slidingBackground && (
              <DeveloperDetails
                className="absolute top-8 left-8 z-70 text-xs md:top-5 md:left-48"
                data={projectDeveloperData2.slidingBackground}
                LabelProps={{ direction: "right", orientation: "up" }}
              />
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
