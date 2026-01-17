"use client";

import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import NightlightRoundRoundedIcon from "@mui/icons-material/NightlightRoundRounded";

export default function ThemeButton() {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  const toggleTheme = () => {
    if (currentTheme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <button onClick={toggleTheme} className=" ">
      <AnimatePresence mode="popLayout">
        {theme === "light" ? (
          <motion.div
            key="night"
            initial={{ rotate: 90, opacity: 0, scale: 0 }}
            animate={{ rotate: -45, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            title="Switch to Night Mode"
          >
            <NightlightRoundRoundedIcon />
          </motion.div>
        ) : (
          <motion.div
            key="light"
            initial={{ rotate: -180, opacity: 0, scale: 0 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 180, opacity: 0, scale: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            title="Switch to Day Mode"
          >
            <LightModeRoundedIcon />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
