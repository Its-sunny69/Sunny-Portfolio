import { useEffect, useState } from "react";

export default function Footer() {
  const [mobileView, setMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setMobileView(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full">
      <div className="flex h-[26rem] w-full flex-col-reverse bg-neutral-950 text-white md:flex-row">
        <p
          className="flex items-center justify-center py-2 text-sm opacity-60 md:justify-start md:px-10 md:py-8"
          style={
            mobileView
              ? {}
              : {
                  textOrientation: "sideways",
                  writingMode: "sideways-lr",
                }
          }
        >
          Made with Passion and Love ❤
        </p>
        <div className="relative flex flex-1 justify-center overflow-hidden md:block">
          <p className="font-36days absolute bottom-0 bg-linear-to-t from-white/5 to-transparent to-85% bg-clip-text text-[6rem] font-medium text-transparent md:right-0 md:-bottom-20 md:text-[13rem] lg:-bottom-33 lg:text-[21rem]">
            Sunny
          </p>
        </div>
      </div>
    </div>
  );
}
