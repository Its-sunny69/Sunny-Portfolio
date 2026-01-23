import {
  CSS3Icon,
  HTML5Icon,
  JavaScriptIcon,
  ReactJSIcon,
  TailwindCSSIcon,
  TypeScriptIcon,
  NextJSIcon,
  MongoDBIcon,
  NodeJSIcon,
  FirebaseIcon,
} from "@/assets/programming-icons";

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

export const ProjectList1: CardItem[] = [
  {
    title: "Portfolio",
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
      ReactJSIcon,
      TailwindCSSIcon,
      HTML5Icon,
      HTML5Icon,
      HTML5Icon,
      HTML5Icon,
    ],
  },
  {
    title: "Briefox",
    overview:
      "AI-powered web tool for designers to generate briefs, find fonts, and extract color palettes.",
    imgURL:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Briefox is an AI-powered design assistant that empowers designers with instant access to design briefs, font discovery, and color palette extraction. Featuring zero-login convenience, Lighthouse-optimized performance, and seamless Gemini API integration for intelligent design recommendations.",
    features: [
      "Achieved <strong class='text-white font-bold'>96 Performance</strong>, <strong class='text-white font-bold'>82 Accessibility</strong>, <strong class='text-white font-bold'>96 Best Practices</strong>, and <strong class='text-white font-bold'>92 SEO</strong> scores using Lighthouse.",
      "<strong class='text-white font-bold'>Optimized user experience</strong> with <strong class='text-white font-bold'>fast</strong>, <strong class='text-white font-bold'>mobile-friendly</strong> UI built using Next.js (TypeScript) and Tailwind CSS.",
      "Integrated Gemini API for <strong class='text-white font-bold'>AI-driven content</strong> and features like <strong class='text-white font-bold'>drag-drop</strong>, <strong class='text-white font-bold'>HEIC conversion</strong>, and <strong class='text-white font-bold'>clipboard support</strong>.",
      "<strong class='text-white font-bold'>Monetized</strong> via Google Analytics, AdSense, and AdsTerra; deployed on Vercel with a <strong class='text-white font-bold'>custom domain</strong>.",
      "Key tools: <strong class='text-white font-bold'>Design Brief Generator</strong>, <strong class='text-white font-bold'>Font Finder</strong>, and <strong class='text-white font-bold'>Color Palette Extractor</strong> with <strong class='text-white font-bold'>export options</strong>.",
    ],
    projectURLs: [
      {
        label: "Live Demo",
        url: "https://www.briefox.com/",
      },
      {
        label: "GitHub",
        url: "https://github.com/Its-sunny69/Essential-Graphic-Design-Tools",
      },
    ],
    techListName:
      "HTML, CSS, TypeScript, Next.js, TailwindCSS, MongoDB, API integration",
    techListImg: [
      HTML5Icon,
      CSS3Icon,
      TailwindCSSIcon,
      TypeScriptIcon,
      NextJSIcon,
      MongoDBIcon,
    ],
  },
  {
    title: "Arise",
    overview:
      "A productivity-focused app designed to help users overcome procrastination.",
    imgURL:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Arise is a collaborative productivity platform that combines real-time task management with room-based collaboration. It features modular architecture built with React and Redux, secure JWT authentication, and leaderboard metrics to keep teams motivated and organized.",
    features: [
      "Developed a <strong class='text-white font-bold'>modular frontend</strong> using React and Redux to manage <strong class='text-white font-bold'>real-time task lists</strong>, <strong class='text-white font-bold'>room-based collaboration</strong>, and user state.",
      "Implemented <strong class='text-white font-bold'>dynamic UI elements</strong> with TailwindCSS for <strong class='text-white font-bold'>responsiveness</strong> and <strong class='text-white font-bold'>visually engaging user experience</strong>.",
      "Used <strong class='text-white font-bold'>authentication</strong> and backend to <strong class='text-white font-bold'>securely manage user sessions</strong> and <strong class='text-white font-bold'>room access</strong>.",
      "Leveraged structured storage for <strong class='text-white font-bold'>user tasks</strong>, <strong class='text-white font-bold'>room data</strong>, and <strong class='text-white font-bold'>leaderboard metrics</strong>.",
    ],
    projectURLs: [
      {
        label: "Live Demo",
        url: "https://arise-hazel.vercel.app/",
      },
      {
        label: "GitHub",
        url: "https://github.com/Its-sunny69/Arise",
      },
    ],
    techListName:
      "HTML, CSS, JavaScript, ReactJS, Redux, TailwindCSS, NodeJS, ExpressJS, JWT, MongoDB",
    techListImg: [
      HTML5Icon,
      CSS3Icon,
      TailwindCSSIcon,
      JavaScriptIcon,
      ReactJSIcon,
      NodeJSIcon,
      MongoDBIcon,
    ],
  },
];

export const ProjectList2: CardItem[] = [
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
      HTML5Icon,
      CSS3Icon,
      JavaScriptIcon,
      TailwindCSSIcon,
      ReactJSIcon,
      NodeJSIcon,
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
    techListImg: [
      HTML5Icon,
      CSS3Icon,
      TailwindCSSIcon,
      ReactJSIcon,
      FirebaseIcon,
    ],
  },
];
