import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScrolling from "@/components/SmoothScrolling";
import { DeveloperContextProvider } from "@/context/developerContext";
import Noise from "@/components/Noise";
import { ThemeProvider } from "next-themes";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const dirtyLine = localFont({
  src: [
    { path: "../fonts/Dirtyline/36daysoftype2022.woff2", style: "regular" },
    { path: "../fonts/Dirtyline/36daysoftype2022.otf", style: "regular" },
  ],
  variable: "--font-36days",
  display: "swap",
});

const nohemi = localFont({
  src: [
    {
      path: "../fonts/Nohemi/Nohemi-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    { path: "../fonts/Nohemi/Nohemi-Thin.otf", weight: "100", style: "normal" },
    {
      path: "../fonts/Nohemi/Nohemi-ExtraLight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../fonts/Nohemi/Nohemi-ExtraLight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../fonts/Nohemi/Nohemi-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/Nohemi/Nohemi-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/Nohemi/Nohemi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Nohemi/Nohemi-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Nohemi/Nohemi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Nohemi/Nohemi-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Nohemi/Nohemi-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/Nohemi/Nohemi-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/Nohemi/Nohemi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    { path: "../fonts/Nohemi/Nohemi-Bold.otf", weight: "700", style: "normal" },
    {
      path: "../fonts/Nohemi/Nohemi-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../fonts/Nohemi/Nohemi-ExtraBold.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../fonts/Nohemi/Nohemi-Black.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../fonts/Nohemi/Nohemi-Black.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-nohemi",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sunny Yadav | Frontend Developer",
  description:
    "Sunny Yadav, I am a frontend developer specializing in React, Next.js, TypeScript, and interactive UI/UX design. I create full-stack projects, and modern web solutions.",
  keywords: [
    "Frontend Developer",
    "Full Stack Developer",
    "React Developer",
    "Next.js",
    "TypeScript",
    "Web Developer",
    "Framer Motion",
    "Custom Animations",
    "Web Design",
    "TailwindCSS",
    "Node.js",
    "MongoDB",
  ],
  authors: [{ name: "Sunny Yadav" }],
  creator: "Sunny Yadav",
  publisher: "Sunny Yadav",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sunny-portfolio-teal.vercel.app",
    siteName: "Sunny Yadav",
    title: "Sunny Yadav | Frontend Developer",
    description:
      "Sunny Yadav, I am a frontend developer specializing in React, Next.js, and interactive design. I create full-stack projects and modern web solutions.",
    images: [
      {
        url: "https://sunny-portfolio-teal.vercel.app/profile.webp",
        width: 1200,
        height: 630,
        alt: "Developer Profile",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sunny Yadav | Frontend Developer",
    description:
      "Frontend Developer specializing in React, Next.js, TypeScript, and interactive UI/UX design. Creating full-stack projects and modern web solutions.",
    images: ["https://sunny-portfolio-teal.vercel.app/profile.webp"],
    creator: "@its_sunny69",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dirtyLine.variable} ${nohemi.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="font-nohemi relative overflow-x-hidden font-light tracking-wider text-black antialiased dark:text-white">
        <Noise
          patternSize={250}
          patternScaleX={1}
          patternScaleY={1}
          patternRefreshInterval={2}
          patternAlpha={15}
        />
        <DeveloperContextProvider>
          <SmoothScrolling>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
              {children}
            </ThemeProvider>
          </SmoothScrolling>
        </DeveloperContextProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
