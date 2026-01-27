"use client";

import { DeveloperContext } from "@/context/developerContext";
import { AnimatePresence, motion } from "motion/react";
import { useContext, useEffect, useState } from "react";
import ThemeButton from "./ThemeButton";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const { developerMode, setDeveloperMode } = useContext(DeveloperContext);
  const [windowWidth, setWindowWidth] = useState(0);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (windowWidth >= 768) {
      setMenu(false);
    }
  }, [windowWidth]);

  const toggleDeveloperMode = () => {
    setDeveloperMode(!developerMode);
  };

  return (
    <motion.div
      className="flex items-center justify-between px-2 py-4 text-xs md:px-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
    >
      <h1 data-cursor-hover="true" className="font-medium" title="portfolio">
        ポートフォリオ
      </h1>
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenu(!menu)}
          className="flex cursor-pointer flex-col gap-1 md:hidden"
          aria-label="Toggle menu"
        >
          <div
            className={`h-0.5 w-6 bg-current transition-all ${menu ? "translate-y-2 rotate-45" : ""}`}
          ></div>
          <div
            className={`h-1 w-6 bg-current transition-all ${menu ? "opacity-0" : ""}`}
          ></div>
          <div
            className={`h-0.5 w-6 bg-current transition-all ${menu ? "-translate-y-2 -rotate-45" : ""}`}
          ></div>
        </button>

        <AnimatePresence>
          {menu ? (
            <MobileMenu />
          ) : (
            <motion.div className="hidden items-center gap-2 md:flex md:gap-4">
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
                href="https://drive.google.com/uc?export=download&id=1G82_3sohjhe42S2i0JjPG6Iw6Bh5UJPI"
                className="group hover:text-hover transition-all"
                title="Download resume"
                download="CV - Sunny Yadav.pdf"
              >
                Resume
                <div className="bg-hover h-[0.7px] w-0 transition-all duration-200 ease-out group-hover:w-full"></div>
              </a>

              <ThemeButton />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
