"use client";

import { useLayoutEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCursor } from "@/app/CursorProvider";
import Timeline from "./timeline";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const { hollowCursor, solidCursor } = useCursor();

  // Wrapper over the timeline
  // Also serves as the trigger for the scroll animation
  const wrapperRef: RefObject<HTMLDivElement | null> = useRef<HTMLDivElement | null>(null);

  // Ref for the experience title
  const experienceTitleRef: RefObject<HTMLDivElement | null> = useRef<HTMLDivElement | null>(null);

  // Ref for the experience subtitle
  const experienceSubTitleRef: RefObject<HTMLDivElement | null> = useRef<HTMLDivElement | null>(null);

  // Layout effect for animating the experience section title
  useLayoutEffect(() => {
    if (!experienceTitleRef.current) return;

    const context = gsap.context(() => {
      const wrapper: HTMLDivElement | null = wrapperRef.current;
      if (!wrapper || !experienceTitleRef.current || !experienceSubTitleRef.current) return;

      gsap.set(experienceTitleRef.current, {
        opacity: 0,
        y: 80,
      });

      ScrollTrigger.create({
        trigger: wrapper,
        start: "top 80%",
        once: true,
        onEnter: (): void => {
          gsap
            .timeline()
            .to(experienceTitleRef.current, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
            })
            .to(
              experienceSubTitleRef.current,
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
              },
              "-=0.35"
            );
        },
      });
    });

    return (): void => context.revert();
  });

  return (
    <>
      <section id="experience" className="min-h-screen px-8 py-24">
        <div className="grid min-h-[calc(100vh-12rem)] grid-cols-1 items-center gap-8 md:grid-cols-[35fr_65fr]">
          {/* Left Split */}
          <div className="h-fit">
            {/* Experience Title */}
            <div ref={experienceTitleRef} className="mb-10 px-8 text-center">
              <p
                className="text-5xl font-bold text-[var(--foreground)] [font-family:var(--font-arvo)]"
                onMouseEnter={hollowCursor}
                onMouseLeave={solidCursor}
              >
                Experience
              </p>
            </div>

            {/* Experience Subtitle */}
            <div
              className="mb-10 px-8 text-center text-md italic text-zinc-500"
              onMouseEnter={hollowCursor}
              onMouseLeave={solidCursor}
              ref={experienceSubTitleRef}
            >
              <p className="text-md italic text-zinc-500">&quot;Experience is the teacher of all things.&quot;</p>
              <p>
                - <span className="hover:underline hover:decoration-dotted">Julius Ceaser</span>
              </p>
            </div>
          </div>

          {/* Right Split */}
          <div className="flex min-h-[50vh] items-center justify-center overflow-hidden">
            <Timeline />
          </div>
        </div>
      </section>
    </>
  );
}
