"use client";

import Image from "next/image";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useEffect, useRef, useState } from "react";
import styles from "./landing.module.scss";
import Link from "next/link";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useCursor } from "./CursorProvider";

gsap.registerPlugin(TextPlugin, ScrambleTextPlugin);

export default function Landing() {
  const titleRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const { hollowCursor, solidCursor } = useCursor();

  const navItems: string[] = ["About Me", "Skills", "Education", "Work Exp", "Projects"];

  const SCRAMBLE_CHARS = "!<>-_\\/[]{}—=+*^?#________";

  const [showScrollDownHint, setShowScrollDownHint] = useState(false);

  useEffect(() => {
    if (!titleRef.current || !cursorRef.current || !subtextRef.current) return;

    const gsapContext = gsap.context(() => {
      const timeline = gsap.timeline({
        onComplete: () => {
          setShowScrollDownHint(true);
        },
      });
      timeline
        .to(cursorRef.current, {
          duration: 0.25,
          opacity: 0,
          repeat: 5,
          yoyo: true,
          ease: "power1.inOut",
        })
        .to(
          titleRef.current,
          {
            duration: 0.8,
            text: "Hi! I am Nikhil Anand!",
            ease: "none",
          },
          "<",
        )

        .to(cursorRef.current, {
          duration: 0.2,
          opacity: 0,
          ease: "power1.out",
        })
        .to(subtextRef.current, {
          duration: 1.8,
          scrambleText: {
            text: "A CS Grad and a Full Stack Web Developer",
            chars: SCRAMBLE_CHARS,
            revealDelay: 0.2,
            speed: 0.3,
          },
        });
    });

    return () => {
      gsapContext.revert();
    };
  }, []);

  return (
    <>
      <section id="hero" className="flex flex-col items-center text-white text-sm">
        <svg
          className="absolute -z-10 w-screen -mt-40 md:mt-0"
          width="1440"
          height="676"
          viewBox="0 0 1440 676"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="-92" y="-948" width="1624" height="1624" rx="812" fill="url(#a)" />
          <defs>
            <radialGradient
              id="a"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="rotate(90 428 292)scale(812)"
            >
              <stop offset=".63" stopColor="#372AAC" stopOpacity="0" />
              <stop offset="1" stopColor="#372AAC" />
            </radialGradient>
          </defs>
        </svg>
        <nav className="z-50 flex items-center justify-between w-full py-4 md:px-16 lg:px-16 xl:px-32 backdrop-blur">
          <div className="hidden md:flex items-center gap-8 transition duration-500">
            <a href="https://prebuiltui.com" className="flex items-center gap-2 leading-none">
              <Image className="invert" src="/laptop.png" alt="Nikhil Anand" width={70} height={20} />
            </a>
          </div>
          <div className={`md:flex items-center gap-8 transition duration-500 ${styles.nav_text}`}>
            {navItems.map((item: string, index: number) => {
              return (
                <div key={index} className="relative inline-block pt-5">
                  <span className="absolute left-[95%] top-2 -translate-x-1/2 text-xs text-zinc-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <Link
                    key={index}
                    href={`#${item.toLowerCase().replace(/\s/g, "")}`}
                    className="hover:text-cyan-300 hover:text-2xl transition-all duration-300 ease-in-out text-base"
                    onMouseEnter={hollowCursor}
                    onMouseLeave={solidCursor}
                  >
                    {`// ${item}`}
                  </Link>
                </div>
              );
            })}
          </div>
          <div className="hidden md:block space-x-3">
            <button className="hover:bg-slate-300/20 transition px-6 py-2 border border-slate-400 rounded-md">
              Login
            </button>
          </div>
          <button id="open-menu" className="md:hidden active:scale-90 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-menu-icon lucide-menu"
            >
              <path d="M4 5h16" />
              <path d="M4 12h16" />
              <path d="M4 19h16" />
            </svg>
          </button>
        </nav>
        <div
          id="mobile-navLinks"
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300 -translate-x-full"
        >
          {navItems.map((item: string, index: number) => {
            return (
              <a href={`#${item.toLowerCase().replace(/\s/g, "")}`} key={index}>
                {item}
              </a>
            );
          })}
          <a href="#products">Skills</a>
          <a href="#resources">Education</a>
          <a href="#stories">Work Exp</a>
          <a href="#pricing">Contact Me</a>
          <button
            id="close-menu"
            className="active:ring-3 active:ring-white aspect-square size-10 p-1 items-center justify-center bg-slate-100 hover:bg-slate-200 transition text-black rounded-md flex"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-x-icon lucide-x"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <div className="mt-32 min-h-[90px] flex items-center justify-center">
          <h1 className="text-center text-4xl gap-2 leading-tight md:text-6xl md:leading-[70px] font-semibold max-w-4xl">
            <span className={`${styles.title_text}`} ref={titleRef}></span>
            <span className="inline-block ml-1" ref={cursorRef}>
              |
            </span>
          </h1>
        </div>

        <div className="mt-2 min-h-[40px] flex items-center justify-center">
          <p className={`text-center text-2xl max-w-2xl ${styles.subtitle_text}`}>
            <span ref={subtextRef}></span>
          </p>
        </div>

        <div className="mt-16 h-[280px] w-full flex items-center justify-center">
          <Image
            src="/hero-section-showcase.png"
            className="w-full rounded-[15px] max-w-4xl"
            alt="hero section showcase"
            width={1440}
            height={280}
            priority
          />
        </div>

        <div className="h-[4.5rem] mt-16">
          {showScrollDownHint && (
            <a href="#aboutme">
              <DotLottieReact
                src="/lottie/scroll_down_final.lottie"
                loop
                speed={0.75}
                autoplay
                className="w-auto h-18 animate-fadeIn"
                themeData={JSON.stringify({
                  primary: "#323936ff",
                  secondary: "#8b1818ff",
                })}
              />
            </a>
          )}
        </div>
      </section>
    </>
  );
}
