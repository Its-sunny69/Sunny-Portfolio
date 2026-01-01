import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

type Cursor = {
  x: number;
  y: number;
};

type Data = {
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

export default function DetailsCard({ data, ref }: { data: Data; ref: React.Ref<HTMLDivElement> }) {
  const [followButton, setFollowButton] = useState(false);

  const [cursor, setCursor] = useState<Cursor>({ x: 0, y: 0 });

  const handleCursor = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCursor({ x, y });

    // console.log(rect);
    // console.log(x, y);
  };

  console.log(data);

  // const data = {
  //   title: "Arise",
  //   overview: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  //   imgURL:
  //     "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   description:
  //     "3 Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa minus sed, ex doloremque possimus voluptas sapiente illum doloribus numquam mollitia molestiae, nemo voluptates, nisi molestias! Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
  //   features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
  //   projectURLs: [
  //     {
  //       label: "Live Demo",
  //       url: "https://unpkg.com/simple-icons@v15/icons/simpleicons.svg",
  //     },
  //     {
  //       label: "GitHub",
  //       url: "https://unpkg.com/simple-icons@v15/icons/simpleicons.svg",
  //     },
  //   ],
  //   techListName: "React, Tailwind CSS, HTML5, JavaScript, MongoDB, Next.js",
  //   techListImg: [
  //     "/programming-icons/react.svg",
  //     "/programming-icons/tailwindcss.svg",
  //     "/programming-icons/html5.svg",
  //     "/programming-icons/html5.svg",
  //     "/programming-icons/html5.svg",
  //     "/programming-icons/html5.svg",
  //   ],
  // };

  return (
    <div className="h-screen flex w-full items-center justify-center z-70">

      <div
        className="absolute inset-0 mask-t-from-black mask-t-from-80% mask-t-to-transparent mask-r-from-white mask-r-from-80% mask-r-to-transparent mask-b-from-white mask-b-from-80% mask-b-to-transparent mask-l-from-white mask-l-from-80% mask-l-to-transparent mask-alpha"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, transparent 1px, rgba(225,225,225, 0.4) 1px)",
          backgroundRepeat: "repeat",
          backgroundSize: "5px 5px",
        }}
      />

      <div 
        ref={ref} className="scroll-bar relative z-80 h-[80%] w-[90%] overflow-x-hidden overflow-y-auto rounded-lg bg-black p-8 text-sm text-gray-200">
        <a
          href={data.projectURLs[0].url}
          target="_blank"
          className="bg-green-400 text-red-400"
        >
          <div
            className="absolute top-0 right-0 m-8 aspect-video w-96 cursor-none rounded-lg"
            onMouseMove={(e) => handleCursor(e)}
            onMouseEnter={() => setFollowButton(true)}
            onMouseLeave={() => setFollowButton(false)}
          >
            <img
              src={data.imgURL}
              alt=""
              className={`h-full w-full rounded-lg object-cover ${followButton ? "opacity-85 blur-[1px]" : ""} transition-all duration-200`}
            />

            <AnimatePresence>
              {followButton && (
                <motion.button
                  className="group cursor-none rounded-full px-4 py-2 text-xs text-white backdrop-blur-lg"
                  initial={{
                    scale: 0,
                    opacity: 0,
                    x: cursor.x - 50,
                    y: cursor.y - 220,
                  }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    x: cursor.x - 50,
                    y: cursor.y - 220,
                  }}
                  exit={{
                    scale: 0,
                    opacity: 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  View Project <OpenInNewIcon fontSize="inherit" />
                  <motion.div
                    className="h-[0.7px] w-0 bg-[#a4a4a4] transition-all duration-200 ease-out"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.3, ease: "easeOut", delay: 0.2 }}
                  ></motion.div>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </a>

        <div className="">
          <h1 className="font-36days text-6xl text-white">{data.title}</h1>
          <p className="text-[#a4a4a4]">{data.overview}</p>
        </div>

        <div className="my-8 w-20 mask-l-from-black mask-l-from-50% mask-l-to-transparent mask-alpha">
          <hr />
        </div>

        <div>
          <h2 className="text-xs text-[#a4a4a4] underline underline-offset-2">
            In the Spotlight
          </h2>
          <div className="mt-3 grid min-h-56 grid-cols-5">
            <div className="col-span-3">
              <p>{data.description}</p>

              <ul className="pt-2 pl-2">
                {data.features.map((feature, index) => (
                  <li key={index}>- {feature}</li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 flex items-center justify-end">
              <table className="w-[85%] table-fixed border-collapse text-xs">
                <tbody>
                  <tr>
                    <td className="w-1/3 border p-4 text-center">
                      View Project
                    </td>
                    <td className="border p-4">
                      <a
                        href={data.projectURLs[0].url}
                        className="group block truncate overflow-hidden transition-all duration-400 hover:text-[#a4a4a4]"
                        target="_blank"
                      >
                        {data.projectURLs[0].url}
                        <div className="h-[0.7px] w-0 bg-[#a4a4a4] transition-all duration-400 ease-out group-hover:w-full"></div>
                      </a>
                    </td>
                  </tr>

                  <tr>
                    <td className="w-1/3 border p-4 text-center">
                      Github Repo
                    </td>
                    <td className="border p-4">
                      <a
                        href={data.projectURLs[1].url}
                        className="group block truncate overflow-hidden transition-all duration-400 hover:text-[#a4a4a4]"
                        target="_blank"
                      >
                        {data.projectURLs[1].url}
                        <div className="h-[0.7px] w-0 bg-[#a4a4a4] transition-all duration-400 ease-out group-hover:w-full"></div>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="my-8 w-20 mask-l-from-black mask-l-from-50% mask-l-to-transparent mask-alpha">
          <hr />
        </div>

        <div className="relative">
          <h2 className="text-xs text-[#a4a4a4] underline underline-offset-2">
            Behind the scenes
          </h2>
          <p className="mt-3">{data.techListName}</p>

          <p className="font-36days pointer-events-none absolute -right-4 -bottom-8 z-75 w-fit text-9xl text-[#1c1c1c7e] select-none">
            {data.title.toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  );
}
