import { AnimatePresence, motion } from "motion/react";
import { useContext, useState } from "react";
import DetailsCard from "./DetailsCard";
import useOutsideClick from "@/utlis/useOutsideClicks";
import DeveloperDetails from "./DeveloperDetails";
import { DeveloperContext } from "@/context/developerContext";
import reactIcon from "@/assets/programming-icons/reactjs.svg";
import tailwindIcon from "@/assets/programming-icons/tailwindcss.svg";
import html5Icon from "@/assets/programming-icons/html5.svg";
import css3Icon from "@/assets/programming-icons/css3.svg";
import javascriptIcon from "@/assets/programming-icons/javascript.svg";
import nodejsIcon from "@/assets/programming-icons/nodejs.svg";
import firebase from "@/assets/programming-icons/firebase.svg";
import { useTheme } from "next-themes";

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

  const list: CardItem[] = [
    {
      title: "Oak Together",
      overview:
        "Tree Plantation and Event Management Web App [ Incomplete Project ]",
      imgURL:
        "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description:
        "Oak Together is a collaborative tree plantation platform that combines environmental activism with gamified engagement. Built as a team project, it connects users to real environmental initiatives through interactive mapping, real-time air quality monitoring, and AI-powered insights for sustainable impact.",
      features: [
        "Developed a <strong class='text-white font-bold'>responsive, interactive web app</strong> to promote <strong class='text-white font-bold'>environmental awareness</strong> through tree plantation drives and <strong class='text-white font-bold'>gamified participation</strong>.",
        "Built core frontend features using <strong class='text-white font-bold'>React</strong> and <strong class='text-white font-bold'>Redux</strong>, with <strong class='text-white font-bold'>Live AQI Display</strong> [D3.js] for <strong class='text-white font-bold'>real-time data visualization</strong>.",
        "<strong class='text-white font-bold'>User Dashboard</strong> tracking <strong class='text-white font-bold'>points</strong>, <strong class='text-white font-bold'>badges</strong>, and <strong class='text-white font-bold'>unlocked cards</strong> for engagement and gamification.",
        "<strong class='text-white font-bold'>Map Interface</strong> [Google Map API] displaying <strong class='text-white font-bold'>barren/planted/watered sites</strong> with <strong class='text-white font-bold'>event markers</strong> and <strong class='text-white font-bold'>interactive popups</strong>.",
        "<strong class='text-white font-bold'>Event Listing Page</strong> with <strong class='text-white font-bold'>advanced filters</strong>, <strong class='text-white font-bold'>pagination</strong>, and <strong class='text-white font-bold'>detailed event cards</strong>.",
        "<strong class='text-white font-bold'>Ask AI</strong> feature using <strong class='text-white font-bold'>Gemini API</strong>-based <strong class='text-white font-bold'>tree recommendations</strong> and environmental insights.",
        "<strong class='text-white font-bold'>Frontend Optimization</strong> focused on <strong class='text-white font-bold'>performance</strong>, <strong class='text-white font-bold'>intuitive navigation</strong>, and <strong class='text-white font-bold'>seamless user experience</strong> through <strong class='text-white font-bold'>modular design</strong>.",
      ],
      projectURLs: [
        {
          label: "Live Demo",
          url: "https://oak-together-fkup.vercel.app/",
        },
        {
          label: "GitHub",
          url: "https://github.com/Its-sunny69/Oak-Together",
        },
      ],
      techListName:
        "HTML, CSS, JavaScript, TailwindCSS, ReactJS, Redux, Google Maps API, GeminiAPI",
      techListImg: [
        html5Icon,
        css3Icon,
        javascriptIcon,
        tailwindIcon,
        reactIcon,
        nodejsIcon,
      ],
    },
    {
      title: "TrustVibes",
      overview:
        "Public review and testimonial management platform with no-auth feedback collection.",
      imgURL:
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description:
        "TrustVibes is a feedback collection platform that enables businesses to gather authentic customer reviews and testimonials without requiring user authentication. Built with React and Firebase, it simplifies the review submission process while providing powerful admin tools for testimonial management and display.",
      features: [
        "Developed a <strong class='text-white font-bold'>public review form</strong> using <strong class='text-white font-bold'>ReactJS</strong> and <strong class='text-white font-bold'>Firebase</strong> for <strong class='text-white font-bold'>seamless feedback collection</strong>.",
        "<strong class='text-white font-bold'>No user authentication required</strong> - visitors can submit <strong class='text-white font-bold'>feedback</strong> and <strong class='text-white font-bold'>reviews</strong> without creating accounts or logging in.",
        "<strong class='text-white font-bold'>Create Form</strong> with intuitive UI, dedicated <strong class='text-white font-bold'>Review Space</strong>, and smooth <strong class='text-white font-bold'>feedback submission</strong> workflow.",
        "<strong class='text-white font-bold'>Admin Dashboard</strong> for managing, moderating, and organizing <strong class='text-white font-bold'>customer testimonials</strong> and reviews.",
        "<strong class='text-white font-bold'>Testimonials converted to iFrame</strong> for easy embeddable display on external websites and landing pages.",
        "Integrated <strong class='text-white font-bold'>Firebase Realtime Database</strong> for <strong class='text-white font-bold'>real-time data sync</strong>, secure storage, and <strong class='text-white font-bold'>scalable review management</strong>.",
      ],
      projectURLs: [
        {
          label: "Live Demo",
          url: "https://trust-vibes.vercel.app/",
        },
        {
          label: "GitHub",
          url: "https://github.com/Its-sunny69/ReviewProvider",
        },
      ],
      techListName: "HTML, CSS, TailwindCSS, React, Firebase",
      techListImg: [html5Icon, css3Icon, tailwindIcon, reactIcon, firebase],
    },
  ];

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
    <div className="relative my-8 flex w-full flex-col items-center justify-center px-8 dark:text-white">
      <p className="font-36days mb-2">Some more...</p>

      {list.map((item, index) => (
        <motion.div
          key={index}
          className={`relative w-[90%] ${index !== list.length - 1 ? "border-t" : "border-y"} border-black p-4 dark:border-white`}
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
            className="relative z-10 grid grid-cols-5"
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
              <div className="truncate px-2">{item.overview}</div>
              <div
                className="group shrink-0 cursor-pointer text-center"
                onClick={() => setIsDetailCardOpen({ isOpen: true, index })}
              >
                more details
                <div className="h-[0.7px] w-0 bg-white transition-all duration-200 ease-out group-hover:w-full dark:bg-black"></div>
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
