"use client";
import CustomCursor from "@/components/CustomCursor";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import ProjectSection from "@/components/ProjectSection";
import ProjectSection2 from "@/components/ProjectSection2";
import Testing from "@/components/Testing";
import { AnimatePresence } from "motion/react";
import { useState } from "react";

export default function Home() {
  const [cursorDisplay, setCursorDisplay] = useState(true);

  console.log("rendering background");

  return (
    <div className="relative w-full">
      <AnimatePresence>
        <CustomCursor cursorDisplay={cursorDisplay} />
      </AnimatePresence>

      <div>
        <Navbar />
      </div>

      <div className="mt-4"><HeroSection /></div>

      <div id="project-section" className="my-8">
        <ProjectSection />
        <ProjectSection2 />
      </div>

      {/* <Testing /> */}
    </div>
  );
}
