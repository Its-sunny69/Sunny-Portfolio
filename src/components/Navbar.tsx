export default function Navbar() {
  return (
    <nav className="mt-4 flex justify-between py-4 text-xs px-8">
      <div>name</div>
      <div>
        <a
          href="https://drive.google.com/uc?export=download&id=15gyH9nlnuuhr2CIuvwif9uV4odH_tLaW"
          className="group transition-all hover:text-[#a4a4a4]"
          title="Download resume"
        >
          Resume
          <div className="h-[0.7px] w-0 bg-[#a4a4a4] transition-all duration-200 ease-out group-hover:w-full"></div>
        </a>
      </div>
    </nav>
  );
}
