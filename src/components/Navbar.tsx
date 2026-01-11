import { DeveloperContext } from "@/context/developerContext";
import { AnimatePresence, motion } from "motion/react";
import { useContext } from "react";

export default function Navbar() {
  const { developerMode, setDeveloperMode } = useContext(DeveloperContext);

  const toggleDeveloperMode = () => {
    setDeveloperMode(!developerMode);
  };

  return (
    <nav className="flex items-center justify-between px-8 py-4 text-xs">
      <div data-cursor-hover="true">ポートフォリオ</div>
      <div className="flex items-center">
        <button
          className="mx-4 grid cursor-pointer grid-cols-7 divide-x divide-dashed border border-dashed border-neutral-800 transition-all hover:border-neutral-600"
          onClick={toggleDeveloperMode}
        >
          <p className="col-span-5 px-2 py-1">Developer Mode</p>

          <div className="col-span-2 overflow-hidden">
            <AnimatePresence mode="wait">
              {developerMode ? (
                <motion.p
                  key="on"
                  className="px-2 py-1 text-green-400"
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
                  className="px-2 py-1 text-red-400"
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
          className="group transition-all hover:text-[#a4a4a4]"
          title="Download resume"
        >
          Resume
          <div className="h-[0.7px] w-0 bg-[#a4a4a4] transition-all duration-200 ease-out group-hover:w-full"></div>
        </a>
      </div>
    </nav>
  );
}
