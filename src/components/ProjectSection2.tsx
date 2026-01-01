import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import DetailsCard from "./DetailsCard";
import useOutsideClick from "@/utlis/useOutsideClicks";

type CardItem = {
  title: string;
  overview: string;
  imgURL: string;
  description: string;
  features: string[];
  projectURLs: {
    label: string;
    url: string;
  }[];
  techListName: string;
  techListImg: string[];
};

export default function ProjectSection2() {
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const [isDetailCardOpen, setIsDetailCardOpen] = useState<{
    isOpen: boolean;
    index: number | null;
  }>({ isOpen: false, index: null });

  const detailCardRef = useOutsideClick(() =>
    setIsDetailCardOpen({ isOpen: false, index: null }),
  );

  const list: CardItem[] = [
    {
      title: "Arise",
      overview: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      imgURL:
        "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description:
        "3 Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa minus sed, ex doloremque possimus voluptas sapiente illum doloribus numquam mollitia molestiae, nemo voluptates, nisi molestias! Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
      features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
      projectURLs: [
        {
          label: "Live Demo",
          url: "https://unpkg.com/simple-icons@v15/icons/simpleicons.svg",
        },
        {
          label: "GitHub",
          url: "https://unpkg.com/simple-icons@v15/icons/simpleicons.svg",
        },
      ],
      techListName: "React, Tailwind CSS, HTML5, JavaScript, MongoDB, Next.js",
      techListImg: [
        "/programming-icons/react.svg",
        "/programming-icons/tailwindcss.svg",
        "/programming-icons/html5.svg",
        "/programming-icons/html5.svg",
        "/programming-icons/html5.svg",
        "/programming-icons/html5.svg",
      ],
    },
    {
      title: "Beta",
      overview:
        "A short and compelling summary of what Project Beta is all about.",
      imgURL:
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description:
        "Here is a detailed breakdown of Project Beta. This project aimed to streamline a complex workflow into an intuitive application. Significant effort was invested in API design and database optimization for performance.",
      features: [
        "API Integration",
        "Advanced Search",
        "Data Visualization",
        "Export to CSV",
      ],
      projectURLs: [
        {
          label: "Live Demo",
          url: "https://unpkg.com/simple-icons@v15/icons/simpleicons.svg",
        },
        {
          label: "GitHub",
          url: "https://unpkg.com/simple-icons@v15/icons/simpleicons.svg",
        },
      ],
      techListName: "Vue.js, Firebase, Tailwind CSS, Chart.js",
      techListImg: [
        "/programming-icons/react.svg",
        "/programming-icons/tailwindcss.svg",
        "/programming-icons/html5.svg",
        "/programming-icons/html5.svg",
        "/programming-icons/html5.svg",
      ],
    },
    {
      title: "Gamma",
      overview:
        "An exciting glimpse into the innovative features of Project Gamma.",
      imgURL:
        "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description:
        "This section provides a complete description of Project Gamma. It is a full-stack application built with a focus on scalability and maintainability, utilizing modern development practices and a robust testing suite.",
      features: ["Feature A", "Feature B", "Feature C", "Feature D"],
      projectURLs: [
        {
          label: "Live Demo",
          url: "https://unpkg.com/simple-icons@v15/icons/simpleicons.svg",
        },
        {
          label: "GitHub",
          url: "https://unpkg.com/simple-icons@v15/icons/simpleicons.svg",
        },
      ],
      techListName: "Next.js, TypeScript, GraphQL, PostgreSQL",
      techListImg: [
        "/programming-icons/react.svg",
        "/programming-icons/tailwindcss.svg",
        "/programming-icons/html5.svg",
        "/programming-icons/html5.svg",
        "/programming-icons/html5.svg",
      ],
    },
  ];

  useEffect(() => {
    // console.log(isDetailCardOpen);
  }, [isDetailCardOpen]);

  return (
    <div className="my-8 flex w-full flex-col items-center justify-center px-8 text-white">
      <p className="font-36days mb-2">Some more...</p>

      {list.map((item, index) => (
        <motion.div
          key={index}
          className={`relative w-[90%] ${index !== list.length - 1 ? "border-t" : "border-y"} border-white p-4`}
          onHoverStart={() => setIsHovered(index)}
          onHoverEnd={() => setIsHovered(null)}
        >
          {isHovered === index && (
            <motion.div
              layoutId="inner-card"
              className="absolute inset-0 bg-white"
              transition={{ type: "spring", stiffness: 120, damping: 14 }}
            />
          )}

          <motion.div
            className="relative z-10 grid grid-cols-5 text-white"
            animate={{ color: isHovered === index ? "black" : "white" }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <h1 className="col-span-1 transition-all duration-300">
              {item.title}
            </h1>

            <div className="col-span-3 flex justify-between transition-all duration-300">
              <span className="truncate">{item.overview}</span>{" "}
              <div
                className="group cursor-pointer"
                onClick={() => setIsDetailCardOpen({ isOpen: true, index })}
              >
                more details
                <div className="h-[0.7px] w-0 bg-black transition-all duration-200 ease-out group-hover:w-full"></div>
              </div>
            </div>

            <div className="col-span-1 flex justify-end">
              <div className="w-fit">
                <a
                  href={item.projectURLs[0].url}
                  className="group"
                  target="_blank"
                >
                  View Project
                  <div className="h-[0.7px] w-0 bg-black transition-all duration-200 ease-out group-hover:w-full"></div>
                </a>
              </div>
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
              data={list[isDetailCardOpen.index]}
              ref={detailCardRef}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
