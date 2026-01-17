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
          Made with Passion and Love &hearts;
        </p>
        <div className="relative flex-1 overflow-hidden">
          <p className="font-36days absolute right-0 -bottom-33 bg-linear-to-t from-white/5 to-transparent to-85% bg-clip-text text-[21rem] font-medium text-transparent">
            Sunny
          </p>
        </div>
      </div>
    </div>
  );
}
