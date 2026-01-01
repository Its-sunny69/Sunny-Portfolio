import { motion, useInView } from "motion/react";
import reactIcon from "@/assets/programming-icons/reactjs.svg";
import tailwindIcon from "@/assets/programming-icons/tailwindcss.svg";
import html5Icon from "@/assets/programming-icons/html5.svg";
import NewCard from "./NewCard";
import { useRef } from "react";

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
      reactIcon,
      tailwindIcon,
      html5Icon,
      html5Icon,
      html5Icon,
      html5Icon,
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
    techListImg: [reactIcon, tailwindIcon, html5Icon, html5Icon, html5Icon],
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
    techListImg: [reactIcon, tailwindIcon, html5Icon, html5Icon, html5Icon],
  },
];

export default function ProjectSection() {
  const scope = useRef(null);
  const isInView = useInView(scope, { once: true });

  return (
    <div className="py-4">
      <div className="px-8 text-center">
        <h1 className="font-36days text-6xl">Hand Crafted Works</h1>
        <p>
          Each project tells a story of growth, upgrades, and milestones
          achieved -{" "}
          <span className="italic">from zero to something i am now</span>.
        </p>
      </div>

      <motion.div
        ref={scope}
        className="relative flex h-screen w-full justify-center gap-4 overflow-hidden px-8"
      >
        {list.map((item: CardItem, index) => (
          <NewCard key={index} index={index} data={item} />
        ))}

        <div className="absolute bottom-0 z-50 h-[2px] w-[50%] rounded-full border-none bg-white"></div>

        <motion.div
          className="absolute -top-[180%] -z-50 aspect-square rounded-full border border-none bg-transparent"
          initial={{
            width: 0,
            boxShadow: "0px 0px 0px 0px rgba(255,255,255,0.75)",
          }}
          animate={
            isInView
              ? {
                  width: "120%",
                  boxShadow: "0px 5px 80px 10px rgba(255,255,255,0.55)",
                }
              : {
                  width: 0,
                  boxShadow: "0px 0px 0px 0px rgba(255,255,255,0.75)",
                }
          }
          transition={{ duration: 4, ease: "easeInOut" }}
        ></motion.div>
      </motion.div>
    </div>
  );
}
