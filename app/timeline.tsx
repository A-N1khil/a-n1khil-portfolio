"use client";

import { type RefObject, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCursor } from "@/app/CursorProvider";
import TimelineModal from "./timeline-modal";

gsap.registerPlugin(ScrollTrigger);

export type TimelineEntryType = "education" | "work";

export type TimelineEntry = {
  type: TimelineEntryType;
  title: string;
  org: string;
  description: string;
  dateRange: string;
};

type TimelineProps = {
  onActiveTypeChange?: (type: TimelineEntryType | null) => void;
};

export default function Timeline({ onActiveTypeChange }: TimelineProps) {
  // Define the timeline items
  const timelineItems: TimelineEntry[] = [
    {
      type: "work",
      title: "Software Engineer",
      org: "BlackRock",
      description:
        "Worked as a Software Engineer at BlackRock, contributing to the development of enterprise applications and gaining experience in software design and implementation.",
      dateRange: "Jan 2021 - July 2024",
    },
    {
      type: "work",
      title: "Software Engineer Intern",
      org: "Wonderlend Hubs Pvt. Ltd.",
      description:
        "Worked as a Software Engineer at BlackRock, contributing to the development of enterprise applications and gaining experience in software design and implementation.",
      dateRange: "May 2019 - June 2019",
    },
    {
      type: "education",
      title: "Master of Science, Computer Science",
      org: "University of Massachusetts Amherst",
      description:
        "Pursued a Master of Science in Computer Science with a focus on artificial intelligence and machine learning.",
      dateRange: "Aug 2024 - May 2026",
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
  const [activeType, setActiveType] = useState<TimelineEntryType>("work");
  const [expandedEntry, setExpandedEntry] = useState<{ entry: TimelineEntry; origin: DOMRect } | null>(null);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const cards = gsap.utils.toArray(".timeline-card") as HTMLElement[];
      const dots = gsap.utils.toArray(".timeline-dot") as HTMLElement[];
      const entries = gsap.utils.toArray<HTMLElement>(".timeline-entry");

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
            start: "top 65%",
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
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
        });
      });

      entries.forEach((entry, index) => {
        const type = entry.dataset.type as TimelineEntryType;
        const card = entry.querySelector<HTMLElement>(".timeline-card");
        if (!card) return;

        const previousType = entries[index - 1]?.dataset.type as TimelineEntryType | undefined;
        const startsNewSection = previousType !== type;

        ScrollTrigger.create({
          trigger: card,
          start: "top 65%",
          end: "bottom 65%",
          onEnter: (): void => {
            setActiveType(type);
          },
          onEnterBack: (): void => setActiveType(type),
          onLeaveBack: (): void => {
            if (startsNewSection && previousType) {
              setActiveType(previousType);
              onActiveTypeChange?.(previousType);
            }
          },
        });

        if (startsNewSection) {
          ScrollTrigger.create({
            trigger: card,
            start: "top 75%",
            onEnter: (): void => onActiveTypeChange?.(type),
            onEnterBack: (): void => onActiveTypeChange?.(type),
          });
        }
      });
    }, timelineRef);
    return () => context.revert();
  }, [onActiveTypeChange]);

  return (
    <div ref={timelineRef} className="relative mx-auto w-full overflow-hidden py-10">
      <div className="timeline-line absolute left-4 top-0 h-full w-[2px] origin-top bg-[var(--color-curvature)] md:left-1/2 md:-translate-x-1/2" />

      <div className="space-y-14 pb-[30vh] pt-[25vh]">
        {timelineItems.map((item, index) => {
          const isLeft = index % 2 === 0;
          const startsNewSection = item.type === "education" && timelineItems[index - 1]?.type === "work";

          return (
            <div
              key={`${item.type}-${item.title}`}
              data-type={item.type}
              className={`timeline-entry relative flex transition-opacity duration-500 ${
                item.type === activeType ? "opacity-100" : "opacity-40"
              } ${startsNewSection ? "pt-[18vh]" : ""} ${
                isLeft ? "md:justify-start" : "md:justify-end"
              }`}
              onMouseEnter={hollowCursor}
              onMouseLeave={solidCursor}
            >
              <div
                className={`timeline-dot absolute left-4 z-10 h-4 w-4 -translate-x-1/2 rounded-full bg-[var(--color-secondary)] md:left-1/2 ${
                  startsNewSection ? "top-[calc(18vh+1.5rem)]" : "top-6"
                }`}
              />

              <button
                type="button"
                aria-haspopup="dialog"
                onClick={(event) => {
                  setExpandedEntry({ entry: item, origin: event.currentTarget.getBoundingClientRect() });
                }}
                className="timeline-card ml-12 w-full rounded-xl border border-[var(--color-curvature)] bg-[var(--background)] p-5 text-left shadow-lg transition-colors hover:border-[var(--color-secondary)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-primary)] md:ml-0 md:w-[45%]"
              >
                <span className="block text-xs uppercase tracking-[0.25em] text-cyan-300">{item.type}</span>

                <span className="mt-3 block text-sm text-zinc-500">{item.dateRange}</span>

                <span className="mt-2 block text-2xl font-bold text-[var(--foreground)]">{item.title}</span>

                <span className="mt-1 block text-sm text-zinc-400">{item.org}</span>

                <span className="mt-4 block text-sm leading-6 text-zinc-400">{item.description}</span>
              </button>
            </div>
          );
        })}
      </div>

      {expandedEntry && (
        <TimelineModal
          entry={expandedEntry.entry}
          origin={expandedEntry.origin}
          onClose={() => setExpandedEntry(null)}
        />
      )}
    </div>
  );
}
