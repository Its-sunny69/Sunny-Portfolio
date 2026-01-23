import { AnimatePresence, motion } from "framer-motion";
import { use, useState } from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useTheme } from "next-themes";

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

export default function DetailsCard({
  data,
  ref,
}: {
  data: Data;
  ref: React.Ref<HTMLDivElement>;
}) {
  const [followButton, setFollowButton] = useState(false);

  const [cursor, setCursor] = useState<Cursor>({ x: 0, y: 0 });

  const { theme } = useTheme();

  const handleCursor = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCursor({ x, y });
  };

  return (
    <div className="z-[70] flex h-screen w-full items-center justify-center">
      <div
        className="absolute inset-0 mask-t-from-white mask-t-from-80% mask-t-to-transparent mask-r-from-black mask-r-from-80% mask-r-to-transparent mask-b-from-black mask-b-from-80% mask-b-to-transparent mask-l-from-black mask-l-from-80% mask-l-to-transparent mask-alpha dark:mask-t-from-black dark:mask-r-from-white dark:mask-b-from-white dark:mask-l-from-white"
        style={{
          backgroundImage:
            theme === "light"
              ? "radial-gradient(circle at center, transparent 1px, rgba(0,0,0, 0.3) 1px)"
              : "radial-gradient(circle at center, transparent 1px, rgba(225,225,225, 0.4) 1px)",
          backgroundRepeat: "repeat",
          backgroundSize: "5px 5px",
        }}
      />

      <div
        ref={ref}
        className="scroll-bar relative z-80 h-[80%] w-[90%] overflow-x-hidden overflow-y-auto rounded-lg bg-black p-4 text-sm text-gray-200 md:p-8"
      >
        <a
          href={data.projectURLs[0].url}
          target="_blank"
          className="bg-green-400 text-red-400"
        >
          <div
            className="top-0 right-0 aspect-video cursor-none rounded-lg md:absolute md:m-8 md:w-64 lg:w-96"
            onMouseMove={(e) => handleCursor(e)}
            onMouseEnter={() => setFollowButton(true)}
            onMouseLeave={() => setFollowButton(false)}
          >
            <img
              src={data.imgURL}
              alt="image"
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

        <div className="mt-4 md:mt-0">
          <h1
            className="font-36days text-4xl text-white lg:text-6xl"
            data-cursor-hover="true"
          >
            {data.title}
          </h1>
          <p className="text-[#a4a4a4] md:w-1/2 lg:w-full">{data.overview}</p>
        </div>

        <div className="my-8 w-20 mask-l-from-black mask-l-from-50% mask-l-to-transparent mask-alpha">
          <hr />
        </div>

        <div>
          <h2 className="text-xs text-[#a4a4a4] underline underline-offset-2">
            In the Spotlight
          </h2>
          <div className="mt-3 grid min-h-56 w-full gap-4 lg:grid-cols-5 lg:gap-0">
            <div className="col-span-3">
              <p>{data.description}</p>

              <ul className="pt-2 pl-2">
                {data.features.map((feature, index) => (
                  <li key={index}>
                    - <span dangerouslySetInnerHTML={{ __html: feature }} />
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-3 flex items-center justify-center md:col-span-2 md:justify-end">
              <table className="w-full table-fixed border-collapse text-xs md:w-[85%]">
                <tbody>
                  <tr>
                    <td className="border p-4 text-center md:w-1/3">
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
                    <td className="border p-4 text-center md:w-1/3">
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
          <p className="z-[76] mt-3">{data.techListName}</p>

          <p className="font-36days pointer-events-none absolute -right-4 -bottom-8 -z-5 w-fit text-6xl text-[#1c1c1c7e] select-none lg:text-9xl">
            {data.title.toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  );
}
