export const heroSectionDeveloperdata = {
  imageDetial: {
    title: "Image Slice Animation",
    description:
      "How it's created:\n\n• Image is divided into 4 vertical slices using <code class='code'>backgroundPosition</code> property\n• Each slice is exactly <code class='code'>w-20</code> (80px) wide and <code class='code'>backgroundSize: '400% 100%'</code>\n• Slices positioned at: 0%, 33.33%, 66.66%, and 100% for seamless coverage\n\nAnimation Logic:\n\n• Left Slice (img-part-1): Fades in with radial gradient mask from top-left corner\n• Middle Slice 1 (img-part-2): Slides up from y: 20 while fading in\n• Middle Slice 2 (img-part-3): Slides down from y: -20 while fading in\n• Right Slice (img-part-4): Fades in with radial gradient mask from bottom-right corner\n\nTiming:\n\n• All animations run for 1.5s duration\n• Staggered timing: Middle slices start at 0ms, edge slices start at -2s (200ms earlier)\n• Synchronized via Framer Motion's <code class='code'>AnimationSequence</code> with negative <code class='code'>at</code> values\n\nResult: Creates a dynamic entrance effect where the image unfolds from center outward with smooth directional movement and gradient fade-in masks on edges",
    codeSnippet: `const sequence: AnimationSequence = [
  [".img-part-2", { y: 0, opacity: 1 }, { duration: 1.5 }],
  [".img-part-3", { y: 0, opacity: 1 }, { duration: 1.5, at: "-1.5" }],
  [".img-part", { opacity: 1 }, { duration: 1.5 }],
  [".img-part-1", {
    opacity: 1,
    maskImage: "radial-gradient(circle at top left, black 60%, transparent 90%)"
  }, { duration: 1.5, at: "-2" }],
  [".img-part-4", {
    opacity: 1,
    maskImage: "radial-gradient(circle at bottom right, black 60%, transparent 90%)"
  }, { duration: 1.5, at: "-2" }]
];

// Each slice structure:
<motion.div
  style={{
    backgroundImage: \`url(\${heroImage.src})\`,
    backgroundSize: "400% 100%",
    backgroundPosition: "0% 50%"
  }}
  initial={{ opacity: 0 }}
  className="h-[33rem] w-20 bg-no-repeat"
/>`,
  },
  textDetail: {
    title: "Animated Gradient Text",
    description:
      "How it's created:\n\n• Uses Framer Motion's <code class='code'>motion.p</code> component\n• Text is set to <code class='code'>text-transparent</code> with gradient applied via <code class='code'>background</code> property\n• <code class='code'>backgroundClip: 'text'</code> clips the gradient to text shape only\n\nAnimation Logic:\n\n• Initial: Gradient fully white, opacity 0 (invisible)\n• Animated: Gradient shifts from white (34%) to black (83%), <code class='code'>opacity: 1</code>\n• Timing: 3.3s <code class='code'>delay</code>, 2s <code class='code'>duration</code>, <code class='code'>easeInOut</code> easing\n\nResult: Text fades in with smooth gradient sweep creating elegant reveal effect",
    codeSnippet: ` <motion.p
    className="font-36days text-[7.5rem] text-transparent"
    data-cursor-hover="true"
    initial={{
        background: "linear-gradient(162deg,rgba(255, 255, 255, 1) 100%, rgba(0, 0, 0, 1) 100%)",
        backgroundClip: "text",
        opacity: 0,
    }}
    animate={{
        background: "linear-gradient(162deg,rgba(255, 255, 255, 1) 34%, rgba(0, 0, 0, 1) 83%)",
        opacity: 1,
    }}
    transition={{
        delay: 3.3,
        duration: 2,
        ease: "easeInOut",
    }}
>
    Sunny Yadav
</motion.p>
            `,
  },
};

export const projectDeveloperData1 = {
  semicircleDetail: {
    title: "Glowing Semicircle Animation",
    description:
      "How it's created:\n\n• Uses <code class='code'>motion.div</code> with <code class='code'>aspect-square</code> and <code class='code'>rounded-full</code> to create a perfect circle\n• Positioned with <code class='code'>-top-[180%]</code> to sit above the viewport\n• Layered with <code class='code'>-z-50</code> to sit behind all content\n• <code class='code'>border border-none bg-transparent</code> allows only the box-shadow to be visible\n\nAnimation Logic:\n\n• Initial State: width is 0 (invisible), boxShadow is <code class='code'>0px 0px 0px 0px rgba(255,255,255,0.75)</code>\n• Active State (isInView): width expands to 120%, boxShadow becomes <code class='code'>0px 5px 80px 10px rgba(255,255,255,0.55)</code>\n• The shadow blur radius grows from 0px to 80px, creating a soft glowing effect\n• Spread radius increases from 0px to 10px, expanding the glow outward\n\nTiming & Triggers:\n\n• Transition duration: 4 seconds with <code class='code'>easeInOut</code> easing\n• Triggered by <code class='code'>useInView</code> hook with <code class='code'>once: true</code> option\n• Animation plays once when section enters viewport\n\nResult: Creates an elegant, glowing semicircular backdrop that expands and illuminates when the project section comes into view, adding depth and visual impact to the section",
    codeSnippet: `// useInView hook setup
const scope = useRef(null);
const isInView = useInView(scope, { once: true });

// Glowing semicircle animation
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
/>`,
  },
  projectCardDetail: {
    title: "Project Card Staggered Entrance Animation",
    description:
      "How it's created:\n\n• Cards use <code class='code'>useAnimate</code> hook to orchestrate complex multi-step sequences\n• <code class='code'>inView</code> callback triggers animation when card enters viewport\n• Card positions calculated dynamically: x = 30 * index, y = 100 + index * 5, rotate = -20 + index * 5\n• Initial state: card positioned at top (y: -1000) with rotateY: 180 (flipped) and opacity: 0\n\nAnimation Sequence (5 steps):\n\n• Step 1: Fade in card (opacity: 0 to 1) in 0.3s with easeOut\n• Step 2: Rotate, position, and stack cards with rotation (-20 to 0) and x/y/left/zIndex transforms over 2s using backInOut easing\n• Step 3: Drop cards down (y increases by 400px) over 2s with backInOut easing\n• Step 4: Settle cards into final grid layout, reset rotation, reposition left based on card width and spacing calculations over 2s with easeInOut\n• Step 5: Add glowing box-shadow effect (0 to 170px glow) in 0.3s with easeIn\n\nCard Flip Animation:\n\n• Uses <code class='code'>AnimatePresence</code> with conditional rendering of back/front sides\n• Back side (front to user): Shows project image, title, description, tech icons with glowing shadows\n• Front side (back to user): Shows decorative spade icon on black background\n• Flip timing: Triggered ~6.88s after entrance + (index * 950ms) for staggered flip effect\n\nInteractive Effects:\n\n• <code class='code'>whileHover={{ scale: 1.05 }}</code> adds 5% scale increase on hover\n• Tech icons stack with overflow indicators (+N more) with hover scaling\n• Tech tooltip appears on +N button hover with smooth fade-in animation\n\nResult: Creates an impressive choreographed entrance where cards cascade in, settle into a grid layout, flip to reveal project details, with smooth hover interactions and layered visual effects",
    codeSnippet: `const createSequence = (vw: number): AnimationSequence => [
  [".card", { opacity: 1 }, { duration: 0.3, ease: "easeOut" }],
  [".card", {
    rotate: r,
    x: x,
    y: y,
    left: vw / 3,
    zIndex: 30 - index,
  }, { duration: 2, ease: "backInOut", delay: 0.2 }],
  [".card", { x: x, y: y + 400 }, { duration: 2, ease: "backInOut", delay: 1.5 }],
  [".card", {
    top: 0,
    left: (vw - N * cardWidth) / (N + 3) + index * (cardWidth + (vw - N * cardWidth) / (N + 2)),
    rotate: 0,
    rotateY: 0,
    y: 100,
  }, { duration: 2, ease: "easeInOut", delay: 0.9 * index }],
  [".card", { boxShadow: "0px 0px 170px -90px rgba(255,225,225, 0.5)" }, { duration: 0.3, ease: "easeIn" }],
];

// Trigger animation on viewport entry
const cleanup = inView(scope.current, () => {
  animation(createSequence(viewportWidth));
  setTimeout(() => setIsCardFlipped(true), 6880 + index * 950);
});

// Card flip with AnimatePresence
<AnimatePresence>
  {isCardFlipped ? (
    <motion.div className="inner rounded-lg bg-black p-4">
      {/* Front side: Project details */}
    </motion.div>
  ) : (
    <motion.div className="inner rounded-lg bg-black flex items-center justify-center">
      {/* Back side: Spade icon */}
    </motion.div>
  )}
</AnimatePresence>`,
  },
};

export const projectDeveloperData2 = {
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

export const skillsDeveloperData = {
  hoverTextRevealingDetail: {
    title: "Cursor-Following Circular Text Reveal Animation",
    description:
      "How it's created:\n\n• Uses <code class='code'>useMotionValue</code> to track real-time cursor position (mouseX, mouseY) and reveal radius\n• <code class='code'>useSpring</code> smooths all values with physics: stiffness: 300, damping: 30 for responsive but natural motion\n• <code class='code'>useTransform</code> creates dynamic radial gradient mask that follows cursor: <code class='code'>radial-gradient(circle ${r}px at ${x}px ${y}px, black 0%, transparent 100%)</code>\n• Mask applied via <code class='code'>maskImage</code> and <code class='code'>WebkitMaskImage</code> (webkit prefix for browser support)\n\nAnimation Logic:\n\n• Initial: radius = 0 (invisible), opacity = 0, \"Hover Me\" text visible\n• On mouseEnter: radius animates to 80px via spring physics, \"Hover Me\" fades out, main content fades to opacity 0.4\n• On mouseMove: maskImage updates in real-time with current cursor coordinates within container bounds\n• On mouseLeave: radius returns to 0, \"Hover Me\" fades back in, content fades out\n• Spring physics makes cursor feel responsive and smooth, not snappy\n\nKey Technical Details:\n\n• <code class='code'>getBoundingClientRect()</code> calculates offset between viewport and container to ensure precise cursor tracking\n• Gradient uses <code class='code'>black</code> for fully visible area, <code class='code'>transparent</code> for fully hidden area\n• Circular reveal creates smooth feathered edges through gradient's 0% → 100% transition\n• Separate state for hover vs motion values allows independent control of animation timing\n\nInteractive Features:\n\n• Optional <code class='code'>HoverMe</code> prop shows/hides initial prompt text\n• Optional <code class='code'>textOrientation</code> prop supports sideways text writing mode\n• <code class='code'>pointer-events-none</code> prevents mask from interfering with clicks\n\nResult: Creates an elegant, interactive reveal effect where content inside a circular area centered on the cursor becomes visible, perfect for highlighting specific UI elements or text during hover interactions",
    codeSnippet: `const [isHovering, setIsHovering] = useState(false);

const mouseX = useMotionValue(0);
const mouseY = useMotionValue(0);
const radius = useMotionValue(0);

const smoothX = useSpring(mouseX, { stiffness: 300, damping: 30 });
const smoothY = useSpring(mouseY, { stiffness: 300, damping: 30 });
const smoothRadius = useSpring(radius, { stiffness: 300, damping: 30 });

// Create dynamic radial gradient mask following cursor
const maskImage = useTransform(
  [smoothX, smoothY, smoothRadius],
  ([x, y, r]) =>
    \`radial-gradient(circle \${r}px at \${x}px \${y}px, black 0%, transparent 100%)\`
);

useEffect(() => {
  radius.set(isHovering ? 80 : 0);
}, [isHovering, radius]);

const handleMouseMove = (e: React.MouseEvent) => {
  if (!containerRef.current) return;
  const rect = containerRef.current.getBoundingClientRect();
  mouseX.set(e.clientX - rect.left);
  mouseY.set(e.clientY - rect.top);
};

<div
  onMouseMove={handleMouseMove}
  onMouseEnter={() => setIsHovering(true)}
  onMouseLeave={() => setIsHovering(false)}
>
  <motion.div
    style={{ maskImage, WebkitMaskImage: maskImage }}
    animate={{ opacity: isHovering ? 0.4 : 0 }}
  >
    {children}
  </motion.div>
</div>`,
  },
  infiniteScrollDetail: {
    title: "Infinite Carousel Scroll Animation",
    description:
      "How it's created:\n\n• Uses <code class='code'>useMotionValue</code> to track horizontal position (x1, x2) continuously\n• <code class='code'>useAnimationFrame</code> hook updates position every frame based on velocity: <code class='code'>moveBy = (velocity * delta) / 1000</code>\n• Two separate tracks scroll in opposite directions: x1 moves left (negative), x2 moves right (positive)\n• Items array is duplicated <code class='code'>[...items1, ...items1]</code> to create seamless loop\n• Velocity changes on hover: 160 px/sec normal → 80 px/sec when hovered (2x slower)\n\nSeamless Reset Logic:\n\n• Track 1: When <code class='code'>x1.get() <= -halfWidth</code>, reset to 0 (traveled full width, restart)\n• Track 2: When <code class='code'>x2.get() >= 0</code>, reset to <code class='code'>-halfWidth</code> (traveled full width backward, restart)\n• Duplicated items ensure no visual gap during reset - next item smoothly takes place of previous\n• <code class='code'>halfWidth = items.length * ITEM_WIDTH</code> (ITEM_WIDTH = 288px for w-72)\n\nHTML Structure:\n\n• Parent div has <code class='code'>overflow-hidden</code> to clip items outside bounds\n• Items styled with <code class='code'>w-72 shrink-0 grow-0 basis-auto</code> to maintain fixed width\n\nInteractive Controls:\n\n• <code class='code'>onMouseEnter</code> / <code class='code'>onMouseLeave</code> toggle <code class='code'>isTrack1Hovered</code> / <code class='code'>isTrack2Hovered</code> state\n• Velocity decreases on hover (160 → 80) for better readability\n• Gradient text on hover: <code class='code'>hover:text-transparent</code> reveals <code class='code'>backgroundImage</code> gradient\n\nOptimization Details:\n\n• <code class='code'>delta</code> parameter in useAnimationFrame provides frame time, enables frame-rate independent animation\n• Position calculation: <code class='code'>x1.set(x1.get() - moveBy)</code> decrements for leftward scroll\n• Duplicated items prevent empty space at end of array\n\nResult: Creates smooth, continuous infinite carousel with hover speed control, feathered edge transitions, and seamless item looping - perfect for showcasing skill items or product listings",
    codeSnippet: `const x1 = useMotionValue(0);
const x2 = useMotionValue(0);
const [isTrack1Hovered, setIsTrack1Hovered] = useState(false);

const velocity1 = isTrack1Hovered ? 80 : 160;

useAnimationFrame((_, delta) => {
  const moveBy = (velocity1 * delta) / 1000;
  x1.set(x1.get() - moveBy);

  const halfWidth = items1.length * ITEM_WIDTH;

  // Seamless reset when traveled full width
  if (x1.get() <= -halfWidth) {
    x1.set(0);
  }
});

<div className="overflow-hidden">
  <motion.div 
    className="flex" 
    style={{ x: x1, width: "max-content" }}
  >
    {[...items1, ...items1].map((item, idx) => (
      <div key={idx} className="w-72 shrink-0 grow-0 basis-auto">
        {/* Item content */}
      </div>
    ))}
  </motion.div>
</div>`,
  },
};

export const storyDeveloperData = {
  ringtext3Ddetail: {
    title: "3D Rotating Ring Text Animation",
    description:
      "How it's created:\n\n• Uses <code class='code'>useMotionValue</code> to hold a shared rotation value that drives the entire text ring\n• <code class='code'>useAnimationFrame</code> increments rotation every frame based on current speed: <code class='code'>degPerMs = 360 / speed</code>\n• <code class='code'>useSpring</code> smooths speed changes (hover vs normal) for natural motion\n• Characters are positioned around a 3D circle using <code class='code'>rotateY(angle)</code> + <code class='code'>translateZ(radius)</code>\n• Parent container applies <code class='code'>perspective</code> and <code class='code'>transformStyle: preserve-3d</code> with tilt via <code class='code'>rotateX</code> and <code class='code'>rotateZ</code>\n\nAnimation Logic:\n\n• Initial: rotation = 0, ring is tilted in 3D via <code class='code'>rotateX</code>/<code class='code'>rotateZ</code>\n• Per frame: rotation increases by <code class='code'>degPerMs * delta</code> to create continuous spin\n• On hover: speed smoothly transitions to a faster value via spring; rotation rate increases\n• Each character uses a shared rotation plus its own angle offset for synchronized movement\n\nKey Technical Details:\n\n• Angle per character: <code class='code'>angle = (360 / charCount) * i</code>\n• Per-character transform computed with <code class='code'>useTransform(rotation, r =&gt; \`rotateY(\${angle + r}deg) translateZ(\${radius}px) translate(-50%, -50%)\`)</code>\n• <code class='code'>perspective</code> on parent enables depth; <code class='code'>preserve-3d</code> keeps child transforms in 3D space\n• Spring config: <code class='code'>{ damping: 40, stiffness: 200 }</code> for responsive yet smooth speed transitions\n\nResult: A smooth 3D ring of text that continuously spins and accelerates on hover, with true depth thanks to perspective and per-character 3D transforms",
    codeSnippet: `// Shared rotation value and smooth speed
const rotation = useMotionValue(0);
const speedSpring = useSpring(speed, { damping: 40, stiffness: 200 });

// Toggle speed on hover
useEffect(() => {
  speedSpring.set(isHovered ? onHoverSpeed : speed);
}, [isHovered, onHoverSpeed, speed, speedSpring]);

// Increment rotation each frame based on current speed
useAnimationFrame((_, delta) => {
  const degPerMs = 360 / speedSpring.get();
  rotation.set(rotation.get() + degPerMs * delta);
});

// Position characters around the ring
{text.split("").map((char, i) => {
  const angle = (360 / charCount) * i;
  const transform = useTransform(
    rotation,
    (r) => \`rotateY(\${angle + r}deg) translateZ(\${radius}px) translate(-50%, -50%)\`
  );
  return (
    <motion.span
      key={i}
      style={{ transform, fontSize: "3rem", color: "#fff" }}
    >
      {char}
    </motion.span>
  );
})}

// Parent with 3D perspective and tilt
<motion.div style={{ perspective: 800 }}>
  <div
    style={{
      transformStyle: "preserve-3d",
      transform: \`rotateX(\${rotateX}deg) rotateZ(\${rotateZ}deg)\`,
      width: 2 * radius + 30,
      height: 2 * radius - 120,
    }}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
  >
    {/* characters */}
  </div>
</motion.div>`,
  },
  timelineSVGDetail: {
    title: "SVG Path Timeline Scroll Animation",
    description:
      "How it's created:\n\n• Binds scroll progress to the timeline container using <code class='code'>useScroll({ target })</code> to get <code class='code'>scrollYProgress</code>\n• Maps progress to stroke draw using <code class='code'>useTransform(scrollYProgress, [0.02, 1], [0, 1])</code> and applies it to <code class='code'>motion.path</code> via <code class='code'>style={{ pathLength }}</code>\n• Computes the path's total length once with <code class='code'>pathRef.current.getTotalLength()</code> in <code class='code'>useEffect</code>\n• Places milestone cards by sampling the SVG path with <code class='code'>getPointAtLength(totalLength * position)</code> for each normalized position value\n• Uses gradients (<code class='code'>linearGradient</code>) and a drop-shadow filter for visual polish\n\nAnimation Logic:\n\n• Initial: <code class='code'>pathLength = 0</code> so the timeline stroke is invisible; milestone rectangles/text are also hidden\n• While scrolling: <code class='code'>pathLength</code> increases towards 1, progressively revealing the path\n• Milestones: Each rect/text fades/scales in when <code class='code'>currentScrollProgress &gt; position</code> (threshold per milestone)\n• Stagger: A small delay is applied per element to create a subtle stagger on reveal\n\nKey Technical Details:\n\n• Accurate placement via <code class='code'>getTotalLength()</code> + <code class='code'>getPointAtLength()</code>: converts normalized progress to an exact <code class='code'>(x,y)</code> on the curve\n• <code class='code'>safeX</code> calculation keeps milestone rectangles within the viewBox bounds\n• Two mirrored <code class='code'>motion.path</code> strokes with opposing gradients add depth\n• Responsive scaling with <code class='code'>viewBox</code> and <code class='code'>preserveAspectRatio</code> keeps the timeline consistent across sizes\n\nResult: A scroll-reactive SVG timeline that draws itself as you scroll and reveals milestone cards precisely anchored along the curve for a clean, narrative progression",
    codeSnippet: `// Scroll progress bound to the timeline container
const scrollRef = useRef<HTMLDivElement>(null);
const pathRef = useRef<SVGPathElement>(null);
const { scrollYProgress } = useScroll({ target: scrollRef });

// Map progress to pathLength (0 → 1)
const pathLength = useTransform(scrollYProgress, [0.02, 1], [0, 1]);

// Cache the total path length once
const [totalLength, setTotalLength] = useState(0);
useEffect(() => {
  if (pathRef.current) {
    setTotalLength(pathRef.current.getTotalLength());
  }
}, []);

// Draw the timeline stroke progressively
<motion.svg viewBox="-2 -2 15 56">
  <motion.path
    ref={pathRef}
    initial={{ pathLength: 0 }}
    style={{ pathLength }}
    d="M 0 0 C 0 6 10 4 10 10 C 10 16 0 14 0 20 C 0 26 10 24 10 30 C 10 36 0 34 0 40 C 0 46 10 44 10 50"
    stroke="url(#timeline-gradient)"
    strokeWidth="0.05"
    fill="none"
  />
</motion.svg>

// Place milestone cards along the path
{positions.map((position, index) => {
  const length = position * totalLength;
  const point = pathRef.current?.getPointAtLength(length) || { x: 0, y: 0 };

  const rectWidth = 6;
  let safeX = point.x - rectWidth / 2 - 0.5;
  if (safeX < 0) safeX = -1.5;

  return (
    <g key={index}>
      <motion.rect
        x={safeX}
        y={point.y - 0.3}
        width="6"
        height="3"
        fill="#0a0a0a"
        stroke="#262626"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: currentScrollProgress > position ? 1 : 0,
          scale: currentScrollProgress > position ? 1 : 0,
        }}
        transition={{ duration: 0.3, delay: currentScrollProgress >= position ? 0 : 0.15 }}
      />

      <motion.text
        x={safeX + 0.25}
        y={point.y + 0.3}
        fontSize="0.3"
        fill="white"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: currentScrollProgress > position ? 1 : 0,
          scale: currentScrollProgress > position ? 1 : 0,
        }}
        transition={{ duration: 0.3, delay: currentScrollProgress >= position ? 0.1 : 0 }}
      >
        {storyList[index] ? storyList[index].title : "Untitled"}
      </motion.text>
    </g>
  );
})`,
  },
};

export const contactDeveloperData = {
  textPathScrollDetail: {
    title: "Scroll-Driven Wavy Text Path Animation",
    description:
      "How it's created:\n\n• Binds scroll progress to an SVG section using <code class='code'>useScroll({ target: section, offset: [\"start end\", \"end start\"] })</code> to get <code class='code'>sectionScrollY</code>\n• Defines an SVG wave path using Bezier curves: <code class='code'>d=\"M 0 10 C 4 11 10 10 10 5 C ...\"</code>\n• Creates 40 <code class='code'>textPath</code> elements that each follow the wave path via <code class='code'>href=\"#wave\"</code>\n• Stores refs to all textPath elements in <code class='code'>paths.current</code> array for dynamic control\n• Each textPath is initialized with a staggered <code class='code'>startOffset={i * 35 + \"%\"}</code>\n\nAnimation Logic:\n\n• Initial: Each textPath positioned along the wave at offset <code class='code'>i * 35%</code>, creating a repeating pattern\n• On scroll: Uses <code class='code'>sectionScrollY.on(\"change\")</code> listener to update <code class='code'>startOffset</code> dynamically\n• Formula: <code class='code'>startOffset = -15 + i * 15 + e * 15</code> where <code class='code'>e</code> is scroll progress (0-1)\n• Result: Text flows along the wave from bottom-left to top-right as user scrolls, creating a continuous wavy scrolling effect\n\nKey Technical Details:\n\n• SVG <code class='code'>&lt;textPath&gt;</code> element: anchors text to follow the path defined by <code class='code'>href=\"#wave\"</code>\n• <code class='code'>startOffset</code> attribute: controls where along the path the text starts (in percentage or pixel units)\n• The negative base <code class='code'>-15</code> shifts text off-screen initially; <code class='code'>i * 15</code> spaces copies; <code class='code'>e * 15</code> scrolls them smoothly\n• All 40 textPath refs stored in array for batch updates on every scroll frame\n• <code class='code'>offset: [\"start end\", \"end start\"]</code> triggers animation when section enters and leaves viewport\n\nResult: A mesmerizing wave of repeating text that flows smoothly along a curved path as you scroll, perfect for eye-catching hero sections or decorative animations",
    codeSnippet: `// Scroll progress for the SVG section
const section = useRef(null);
const paths = useRef<(SVGTextPathElement | null)[]>([]);
const { scrollYProgress: sectionScrollY } = useScroll({
  target: section,
  offset: ["start end", "end start"],
});

// Update all textPath startOffsets on scroll
useEffect(() => {
  sectionScrollY.on("change", (e) => {
    paths.current.forEach((path, i) => {
      if (path) {
        // Dynamic formula: base offset + stagger + scroll animation
        path.setAttribute("startOffset", -15 + i * 15 + e * 15 + "%");
      }
    });
  });
}, []);

// Wave path definition
<svg viewBox="1 0 25 12" className="w-full" ref={section}>
  <path
    d="M 0 10 C 4 11 10 10 10 5 C 10 0 4 0 4 5 C 4 10 11 12 15 10 S 20 0 29 5"
    id="wave"
    fill="none"
  />

  {/* 40 copies of text, each following the wave path */}
  <text className="text-[1px] tracking-tight select-none" fill="black">
    {[...Array(40)].map((_, i) => (
      <textPath
        key={i}
        href="#wave"
        startOffset={i * 35 + "%"}
        ref={(ref) => {
          paths.current[i] = ref;
        }}
      >
        Lets connect! {i % 2 === 0 ? "💜" : "💙"}
      </textPath>
    ))}
  </text>
</svg>`,
  },
  slowRevealingSectionDetail: {
    title: "Scroll-Driven Vertical Slide-Up Reveal Animation",
    description:
      "How it's created:\n\n• Binds scroll progress to the social section container using <code class='code'>useScroll({ target: container, offset: [\"start end\", \"end end\"] })</code> to get <code class='code'>scrollYProgress</code>\n• Uses <code class='code'>useTransform(scrollYProgress, [0, 1], [-220, 0])</code> to map scroll progress (0-1) to Y translation (-220px to 0px)\n• Applies the transformed Y value to a <code class='code'>motion.div</code> via <code class='code'>style={{ y }}</code> to create smooth vertical movement\n• Social links are rendered directly inside the sliding container\n\nAnimation Logic:\n\n• Initial: Section positioned at <code class='code'>y = -220px</code> (off-screen, hidden below viewport)\n• While scrolling: As user scrolls and progress increases from 0 to 1, section smoothly slides upward\n• Final: At full scroll progress (1), section reaches <code class='code'>y = 0px</code> (natural position, fully visible in viewport)\n• The entire section translates vertically based on scroll position, no individual element delays\n\nKey Technical Details:\n\n• <code class='code'>useTransform</code> creates a continuous, real-time mapping from scroll progress to Y position\n• Input range <code class='code'>[0, 1]</code> represents scroll progress from start to end\n• Output range <code class='code'>[-220, 0]</code> defines vertical translation in pixels\n• <code class='code'>offset: [\"start end\", \"end end\"]</code> triggers animation when container enters viewport and stays visible\n• Motion values update automatically; no manual animation frame or effect listeners needed\n• <code class='code'>bg-clip-text</code> with gradient backgrounds creates colored link text\n\nResult: A smooth, scroll-reactive vertical slide-up animation that brings the entire social links section into view as the user scrolls.",
    codeSnippet: `// Scroll progress for the social section container
const container = useRef(null);
const { scrollYProgress } = useScroll({
  target: container,
  offset: ["start end", "end end"],
});

// Map scroll progress to Y translation: 0 → 1 maps to -220px → 0px
const y = useTransform(scrollYProgress, [0, 1], [-220, 0]);

// Slide up container from off-screen to visible
<motion.div
  style={{ y }}
  className="flex h-full w-full items-center justify-center bg-black py-4 text-white"
>
  <hr className="h-[0.5px] w-full bg-white/30" />
  {socialLinks.map((link) => (
    <Fragment key={link.name}>
      <a href={link.url} target="_blank">
        <p className={\`\${link.color} bg-clip-text text-3xl transition-all hover:text-transparent\`}>
          {link.name}
        </p>
      </a>
      <hr className="h-[0.5px] w-full bg-white/30" />
    </Fragment>
  ))}
</motion.div>`,
  },
};
