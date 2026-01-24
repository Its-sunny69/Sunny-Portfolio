export default function Footer() {
  return (
    <div className="w-full">
      <div className="flex h-[26rem] w-full bg-neutral-950 text-white">
        <p
          className="flex items-center justify-start px-10 py-8 text-sm opacity-60"
          style={{
            textOrientation: "sideways",
            writingMode: "sideways-lr",
          }}
        >
          Made with Passion and Love ❤
        </p>
        <div className="relative flex-1 overflow-hidden">
          <p className="font-36days absolute right-0 bottom-0 bg-linear-to-t from-white/5 to-transparent to-85% bg-clip-text text-[6rem] font-medium text-transparent md:-bottom-20 md:text-[13rem] lg:-bottom-33 lg:text-[21rem]">
            Sunny
          </p>
        </div>
      </div>
    </div>
  );
}
