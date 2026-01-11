import { AnimatePresence, motion } from "motion/react";
import { useContext, useEffect, useState } from "react";
import DetailsCard from "./DetailsCard";
import useOutsideClick from "@/utlis/useOutsideClicks";
import DeveloperDetails from "./DeveloperDetails";
import { DeveloperContext } from "@/context/developerContext";

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
  const [detailList, setdetailList] = useState({
    slidingBackground: false,
  });
  const { developerMode } = useContext(DeveloperContext);

  const detailCardRef = useOutsideClick(() =>
    setIsDetailCardOpen({ isOpen: false, index: null }),
  );

  const HandleDetailClick = (key: keyof typeof detailList) => {
    setdetailList((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
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

  const data = {
    slidingBackground: {
      title: "Sliding Background Hover Animation",
      description:
        "How it's created:\n\n• Uses <code class='code'>onHoverStart</code> and <code class='code'>onHoverEnd</code> callbacks to track hover state\n• <code class='code'>motion.div</code> with <code class='code'>layoutId=\"inner-card\"</code> creates a shared layout animation context\n• <code class='code'>inset-0</code> (position absolute with all edges 0) fills the entire parent container\n• Background color is solid white, positioned behind text using z-index layering\n\nAnimation Logic:\n\n• Background Element: Initially hidden, slides in with spring physics on hover\n• Spring Transition: Uses <code class='code'>type: \"spring\", stiffness: 120, damping: 14</code> for bouncy, natural motion\n• Text Color: Animates from white to black based on hover state: <code class='code'>animate={{ color: isHovered === index ? \"black\" : \"white\" }}</code>\n• Duration: 0.2s easeOut for color transition\n• Z-index Layering: Background div is at default z-index, text is <code class='code'>relative z-10</code> to stay on top\n\nInteraction Flow:\n\n• On hover: Background slides in with spring animation, text color transitions to black\n• Off hover: Background slides out, text returns to white\n• Combined effect: Creates impression of light background expanding behind dark text, then text darkening\n\nOptimization:\n\n• <code class='code'>layoutId</code> enables Framer Motion's shared layout animation for smooth transitions\n• Single state variable (<code class='code'>isHovered</code>) controls both background and text color\n• Applied to each card in the list independently with index matching\n\nResult: Creates an elegant, responsive background highlight effect with physics-based motion that feels natural and interactive, perfect for list item hover states",
      codeSnippet: `const [isHovered, setIsHovered] = useState<number | null>(null);

<motion.div
  className="relative w-[90%] border border-white p-4"
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
    className="relative z-10 grid grid-cols-5"
    animate={{ color: isHovered === index ? "black" : "white" }}
    transition={{ duration: 0.2, ease: "easeOut" }}
  >
    <h1>{item.title}</h1>
    <span>{item.overview}</span>
    <a href={item.projectURLs[0].url}>View Project</a>
  </motion.div>
</motion.div>`,
    },
  };

  return (
    <div className="relative my-8 flex w-full flex-col items-center justify-center px-8 text-white">
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
            <h1
              className="col-span-1 transition-all duration-300"
              data-cursor-hover="true"
            >
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

            <div
              className="col-span-1 flex justify-end transition-all duration-300"
              data-cursor-hover="true"
            >
              <a
                href={item.projectURLs[0].url}
                className="group"
                target="_blank"
              >
                View Project
                <div className="h-[0.7px] w-0 bg-black transition-all duration-200 ease-out group-hover:w-full"></div>
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
              data={list[isDetailCardOpen.index]}
              ref={detailCardRef}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {developerMode && (
        <>
          <button
            className="absolute top-0 left-48 flex cursor-pointer hover:opacity-75"
            onClick={() => HandleDetailClick("slidingBackground")}
          >
            <motion.p
              initial={{ x: 0, color: "#05df72" }}
              animate={
                detailList.slidingBackground
                  ? { x: -5, color: "red" }
                  : { x: 0, color: "#05df72" }
              }
              transition={{ duration: 0.2 }}
            >
              [
            </motion.p>
            <motion.p className="mx-1">5</motion.p>
            <motion.p
              initial={{ x: 0, color: "#05df72" }}
              animate={
                detailList.slidingBackground
                  ? { x: 5, color: "red" }
                  : { x: 0, color: "#05df72" }
              }
              transition={{ duration: 0.2 }}
            >
              ]
            </motion.p>
          </button>

          <AnimatePresence>
            {developerMode && detailList.slidingBackground && (
              <DeveloperDetails
                className="absolute top-5 left-48 z-70 text-xs"
                data={data.slidingBackground}
                LabelProps={{ direction: "right", orientation: "up" }}
              />
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
