"use client";

import { type RefObject, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCursor } from "@/app/CursorProvider";

gsap.registerPlugin(ScrollTrigger);

type TimelineEntry = {
  type: "education" | "work";
  title: string;
  org: string;
  description: string;
  dateRange: string;
};

export default function Timeline() {
  // Define the timeline items
  const timelineItems: TimelineEntry[] = [
    {
      type: "education",
      title: "Master of Science, Computer Science",
      org: "University of Massachusetts Amherst",
      description:
        "Pursued a Master of Science in Computer Science with a focus on artificial intelligence and machine learning.",
      dateRange: "Aug 2024 - May 2026",
    },
    {
      type: "work",
      title: "Software Engineer",
      org: "BlackRock",
      description:
        "Worked as a Software Engineer at BlackRock, contributing to the development of enterprise applications and gaining experience in software design and implementation.",
      dateRange: "Jan 2021 - July 2024",
    },
    {
      type: "education",
      title: "Bachelor of Technology, Computer Science",
      org: "Vellore Institute of Technology",
      description: "Graduated with a CGPA of 9.01/10.0",
      dateRange: "2019 - 2023",
    },
  ];

  const { hollowCursor, solidCursor } = useCursor();
  const timelineRef: RefObject<HTMLDivElement | null> = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const cards = gsap.utils.toArray(".timeline-card") as HTMLElement[];
      const dots = gsap.utils.toArray(".timeline-dot") as HTMLElement[];

      gsap.from(".timeline-line", {
        scaleY: 0,
        transformOrigin: "top",
        ease: "none",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 75%",
          end: "bottom 75%",
          scrub: true,
        },
      });

      cards.forEach((card, index) => {
        gsap.from(card, {
          opacity: 0,
          y: 80,
          x: index % 2 === 0 ? -40 : 40,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });

      dots.forEach((dot) => {
        gsap.from(dot, {
          scale: 0,
          opacity: 0,
          duration: 0.4,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: dot,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, timelineRef);
    return () => context.revert();
  });

  return (
    <div ref={timelineRef} className="relative mx-auto overflow-hidden py-10">
      <div className="timeline-line absolute left-4 top-0 h-full w-[2px] origin-top bg-zinc-700 md:left-1/2 md:-translate-x-1/2" />

      <div className="space-y-14">
        {timelineItems.map((item, index) => {
          const isLeft = index % 2 === 0;

          return (
            <div
              key={`${item.type}-${item.title}`}
              className={`relative flex ${isLeft ? "md:justify-start" : "md:justify-end"}`}
              onMouseEnter={hollowCursor}
              onMouseLeave={solidCursor}
            >
              <div className="timeline-dot absolute left-4 top-6 z-10 h-4 w-4 -translate-x-1/2 rounded-full bg-[var(--foreground)] md:left-1/2 " />

              <div className="timeline-card ml-12 w-full rounded-xl border border-zinc-700/60 bg-[var(--background)] p-5 shadow-lg md:ml-0 md:w-[45%]">
                <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">{item.type}</p>

                <p className="mt-3 text-sm text-zinc-500">{item.dateRange}</p>

                <h3 className="mt-2 text-2xl font-bold text-[var(--foreground)]">{item.title}</h3>

                <p className="mt-1 text-sm text-zinc-400">{item.org}</p>

                <p className="mt-4 text-sm leading-6 text-zinc-400">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
