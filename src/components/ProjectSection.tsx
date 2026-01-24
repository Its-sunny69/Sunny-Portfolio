import { AnimatePresence, motion, useInView } from "motion/react";
import NewCard from "./NewCard";
import { useContext, useRef, useState } from "react";
import DeveloperDetails from "./DeveloperDetails";
import { DeveloperContext } from "@/context/developerContext";
import { useTheme } from "next-themes";
import { ProjectList1 } from "@/data/projectData";
import { projectDeveloperData1 } from "@/data/developerDetailsData";

export default function ProjectSection() {
  const [detailList, setdetailList] = useState({
    semicircleDetail: false,
    projectCardDetail: false,
  });
  const scope = useRef(null);

  const { developerMode } = useContext(DeveloperContext);
  const isInView = useInView(scope, { once: true });
  const { theme } = useTheme();

  const HandleDetailClick = (key: keyof typeof detailList) => {
    setdetailList((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden py-4">
      <div className="flex flex-col items-center px-2 md:px-8">
        <h1
          className="font-36days text-3xl md:text-4xl lg:text-6xl"
          data-cursor-hover="true"
        >
          Hand Crafted Works
        </h1>
        <p className="mt-2 text-center">
          Each project tells a story of growth, upgrades, and milestones
          achieved -{" "}
          <span className="italic">from zero to something i am now</span>.
        </p>
      </div>

      <motion.div
        ref={scope}
        className="relative flex h-screen w-full justify-center overflow-x-auto overflow-y-hidden px-2 md:px-8 lg:overflow-hidden"
      >
        {ProjectList1.map((item, index) => (
          <NewCard key={index} index={index} data={item} />
        ))}

        <div className="absolute bottom-0 z-50 h-[2px] w-[50%] rounded-full border-none bg-black"></div>

        {/* Semicircle Animation */}
        {developerMode && (
          <>
            <button
              className="absolute top-0 right-10 flex cursor-pointer hover:opacity-75 md:right-5"
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
                  className="Lg:top-8 absolute top-8 right-8 z-70 text-xs md:top-5 md:right-5"
                  data={projectDeveloperData1.semicircleDetail}
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
              className="absolute top-16 left-10 flex cursor-pointer hover:opacity-75 md:left-80"
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
                  className="absolute top-28 left-8 z-[70] text-xs md:left-80"
                  data={projectDeveloperData1.projectCardDetail}
                  LabelProps={{ direction: "right", orientation: "up" }}
                />
              )}
            </AnimatePresence>
          </>
        )}
      </motion.div>

      <motion.div
        className="absolute -top-[10%] -z-50 aspect-square rounded-full border border-none bg-transparent md:-top-[80%] lg:-top-[170%]"
        initial={{
          width: 0,
          boxShadow: "0px 0px 0px 0px rgba(255,255,255,0.75)",
        }}
        animate={
          isInView
            ? {
                width: "140%",
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
    </div>
  );
}
