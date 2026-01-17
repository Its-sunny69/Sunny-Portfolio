import { DeveloperContext } from "@/context/developerContext";
import { AnimatePresence, motion } from "motion/react";
import { useContext } from "react";
import ThemeButton from "./ThemeButton";

export default function Navbar() {
  const { developerMode, setDeveloperMode } = useContext(DeveloperContext);

  const toggleDeveloperMode = () => {
    setDeveloperMode(!developerMode);
  };

  return (
    <motion.nav
      className="flex items-center justify-between px-8 py-4 text-xs"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
    >
      <div data-cursor-hover="true">ポートフォリオ</div>
      <div className="flex items-center gap-4">
        <button
          className="hover:text-hover grid cursor-pointer grid-cols-7 divide-x divide-dashed border border-dashed border-neutral-800 transition-all hover:border-neutral-600"
          onClick={toggleDeveloperMode}
        >
          <p className="col-span-5 px-2 py-1">Developer Mode</p>

          <div className="col-span-2 overflow-hidden">
            <AnimatePresence mode="wait">
              {developerMode ? (
                <motion.p
                  key="on"
                  className="px-2 py-1 text-green-500"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  ON
                </motion.p>
              ) : (
                <motion.p
                  key="off"
                  className="px-2 py-1 text-red-500"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  OFF
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </button>

        <a
          href="https://drive.google.com/uc?export=download&id=15gyH9nlnuuhr2CIuvwif9uV4odH_tLaW"
          className="group hover:text-hover transition-all"
          title="Download resume"
        >
          Resume
          <div className="bg-hover h-[0.7px] w-0 transition-all duration-200 ease-out group-hover:w-full"></div>
        </a>

        <ThemeButton />
      </div>
    </motion.nav>
  );
}
