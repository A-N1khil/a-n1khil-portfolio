"use client";

import Image from "next/image";
import { Menu, X } from "lucide-react";
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
  const subtextRef = useRef<HTMLSpanElement>(null);
  const { hollowCursor, solidCursor } = useCursor();

  const navItems: string[] = ["About Me", "Skills", "Education", "Work Exp", "Projects"];

  const SCRAMBLE_CHARS = "!<>-_\\/[]{}—=+*^?#________";

  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      <section id="hero" className="relative isolate flex w-full flex-col items-center px-5 pb-8 text-sm text-[var(--foreground)] sm:px-8 lg:px-12">
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-auto w-full"
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
        <nav
          aria-label="Main navigation"
          className="z-50 flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 py-4 backdrop-blur"
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setIsMenuOpen(false);
              event.currentTarget.querySelector<HTMLButtonElement>("button")?.focus();
            }
          }}
        >
          <Link href="#hero" aria-label="Nikhil Anand — home" className="shrink-0">
            <Image className="h-auto w-12 invert lg:w-[70px]" src="/laptop.png" alt="" width={70} height={20} />
          </Link>
          <button
            type="button"
            aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isMenuOpen}
            aria-controls="landing-nav-links"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="flex size-11 items-center justify-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-primary)] lg:hidden"
          >
            {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
          <div
            id="landing-nav-links"
            className={`${isMenuOpen ? "flex" : "hidden"} w-full flex-col gap-2 lg:flex lg:w-auto lg:flex-row lg:items-center lg:gap-6 xl:gap-8 ${styles.nav_text}`}
          >
            {navItems.map((item, index) => (
              <Link
                key={item}
                href={`#${item.toLowerCase().replace(/\s/g, "")}`}
                onClick={() => setIsMenuOpen(false)}
                className="relative flex min-h-11 items-center gap-3 rounded-sm py-3 text-base transition-colors duration-300 hover:text-[var(--color-secondary)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-primary)] lg:pt-5"
                onMouseEnter={hollowCursor}
                onMouseLeave={solidCursor}
              >
                <span aria-hidden="true" className="text-xs text-zinc-400 lg:absolute lg:right-0 lg:top-0">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {`// ${item}`}
              </Link>
            ))}
          </div>
        </nav>

        <div className="mt-16 flex w-full max-w-4xl items-center justify-center sm:mt-24 lg:mt-32">
          <h1 className="grid w-full text-center text-3xl font-semibold leading-tight sm:text-5xl lg:text-6xl lg:leading-[70px]">
            <span aria-hidden="true" className={`invisible col-start-1 row-start-1 ${styles.title_text}`}>
              Hi! I am Nikhil Anand!<span className="ml-1">|</span>
            </span>
            <span className="col-start-1 row-start-1" aria-hidden="true">
              <span className={styles.title_text} ref={titleRef}></span>
              <span className={`ml-1 inline-block ${styles.title_text}`} ref={cursorRef}>|</span>
            </span>
            <span className="sr-only">Hi! I am Nikhil Anand!</span>
          </h1>
        </div>

        <div className="mt-4 flex w-full max-w-2xl items-center justify-center">
          <p className={`grid w-full text-center text-base leading-relaxed sm:text-xl lg:text-2xl ${styles.subtitle_text}`}>
            <span className="invisible col-start-1 row-start-1" aria-hidden="true">
              A CS Grad and a Full Stack Web Developer
            </span>
            <span className="col-start-1 row-start-1 break-words" ref={subtextRef} aria-hidden="true"></span>
            <span className="sr-only">A CS Grad and a Full Stack Web Developer</span>
          </p>
        </div>

        <div className="mt-10 flex w-full max-w-4xl items-center justify-center sm:mt-12 lg:mt-16">
          <Image
            src="/hero-section-showcase.png"
            className="h-auto w-full rounded-[15px]"
            sizes="(min-width: 1024px) 896px, (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)"
            alt="hero section showcase"
            width={1440}
            height={280}
            priority
          />
        </div>

        <div className="mt-8 h-[4.5rem] sm:mt-12 lg:mt-16">
          {showScrollDownHint && (
            <a href="#aboutme" aria-label="Scroll to About Me">
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
