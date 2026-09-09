"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { BookOpenText } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCursor } from "@/app/CursorProvider";
import { useReducedMotion } from "./use-reduced-motion";
import TimelineModal from "./timeline-modal";

gsap.registerPlugin(ScrollTrigger);

export type TimelineEntryType = "education" | "work";

export type TimelineEntry = {
  type: TimelineEntryType;
  title: string;
  org: string;
  description: string;
  longDescription: string[];
  dateRange: string;
};

const timelineItems: TimelineEntry[] = [
  {
    type: "work",
    title: "Software Engineer 2 (Associate)",
    org: "BlackRock",
    description:
      "Worked as a Full Stack Web Developer at BlackRock, contributing to the development of enterprise applications and gaining experience in software design and implementation.",
    longDescription: [
      "Engineered and delivered 30+ full-stack applications and features using Java, Spring Boot, Angular, REST APIs, and Sybase ASE across 8+ internal teams; modernized legacy systems and optimized workflows to achieve 20–40% performance improvements and raise SonarQube maintainability from C to A.",
      "Designed and developed Spring Boot microservices, REST APIs, batch jobs, and SQL data workflows, integrating Angular frontends with backend services while supporting CI/CD, deployments, production incidents, application upgrades, and code reviews.",
      "Took end-to-end ownership of a legacy financial application, modernizing its Java Swing/JavaFX stack and delivering index, benchmark, portfolio, and exception-processing workflows from low-level design through production; led 5 contract engineers on deadline-critical projects, mentored 12 engineers, participated in technical hiring, and earned promotion to SDE II.",
    ],
    dateRange: "Jan 2021 - July 2024",
  },
  {
    type: "work",
    title: "Software Engineer Intern",
    org: "Wonderlend Hubs Pvt. Ltd.",
    description:
      "Worked as a Software Engineer at Wonderlend Hubs Pvt. Ltd., contributing to the development of enterprise applications and gaining experience in software design and implementation.",
    longDescription: [
      "Developed and scaled a full-stack OCR and document-processing application using Java, Maven, React, TypeScript, and AWS Textract, processing up to 1,000 documents/hour for automated extraction of structured financial and identity data.",
      "Built automated workflows to validate government IDs and analyze bank-statement expenditure patterns for credit-score prediction, integrating the React frontend with Java backend services and AWS-powered OCR processing.",
    ],
    dateRange: "May 2019 - June 2019",
  },
  {
    type: "education",
    title: "Master of Science, Computer Science",
    org: "University of Massachusetts Amherst",
    description:
      "Pursued a Master of Science in Computer Science with a focus on artificial intelligence and machine learning.",
    longDescription: [
      "Relevant Coursework: Network Security, Advanced Software Engineering, Data Science, Reinforcement Learning, and Neural Networks.",
      "GPA: 3.94",
    ],
    dateRange: "Aug 2024 - May 2026",
  },
  {
    type: "education",
    title: "Bachelor of Technology, Computer Science",
    org: "Vellore Institute of Technology",
    description: "Graduated with a CGPA of 8.89/10",
    longDescription: [
      "Relevant Coursework: Database Management Systems, Computer Architecture, Operating Systems and Natural Language Processing.",
      "GPA: 8.89/10",
    ],
    dateRange: "2019 - 2023",
  },
];

const sectionContent = {
  work: {
    id: "workexp",
    title: "Experience",
    quote: "Experience is the teacher of all things.",
    author: "Julius Caesar",
  },
  education: {
    id: "education",
    title: "Education",
    quote: "Intelligence plus character—that is the goal of true education.",
    author: "Martin Luther King Jr.",
  },
} satisfies Record<TimelineEntryType, { id: string; title: string; quote: string; author: string }>;

export default function Timeline() {
  const reducedMotion = useReducedMotion();
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const [expandedEntry, setExpandedEntry] = useState<{ entry: TimelineEntry; origin: DOMRect } | null>(null);
  const { hollowCursor, solidCursor } = useCursor();

  useLayoutEffect(() => {
    if (reducedMotion) return;
    const context = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>(".timeline-section");

      sections.forEach((section) => {
        const heading = section.querySelector<HTMLElement>(".timeline-heading");
        const line = section.querySelector<HTMLElement>(".timeline-line");
        const cards = gsap.utils.toArray<HTMLElement>(".timeline-card", section);
        const dots = gsap.utils.toArray<HTMLElement>(".timeline-dot", section);

        gsap.from(heading, {
          opacity: 0,
          y: 50,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heading,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });

        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: "top",
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
              end: "bottom 75%",
              scrub: true,
            },
          },
        );

        cards.forEach((card) => {
          gsap.from(card, {
            opacity: 0,
            y: 70,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          });
        });

        dots.forEach((dot) => {
          gsap.from(dot, {
            opacity: 0,
            scale: 0,
            duration: 0.4,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: dot,
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          });
        });
      });
    }, timelineRef);

    return () => context.revert();
  }, [reducedMotion]);

  return (
    <div ref={timelineRef} className="mx-auto w-full max-w-3xl">
      {(["work", "education"] as const).map((type) => {
        const content = sectionContent[type];
        const entries = timelineItems.filter((item) => item.type === type);
        const isEducation = type === "education";

        return (
          <section
            id={content.id}
            key={type}
            className={`timeline-section scroll-mt-12 ${isEducation ? "relative pt-24 sm:pt-32 lg:pt-56" : ""}`}
          >
            {isEducation && (
              <div
                className="absolute left-2 top-0 h-24 w-[2px] bg-[var(--color-curvature)] opacity-20 sm:left-4 sm:h-32 lg:left-5 lg:h-56"
                aria-hidden="true"
              />
            )}

            <header
              className="timeline-heading mb-8 text-center sm:mb-12 lg:mb-20"
              onMouseEnter={hollowCursor}
              onMouseLeave={solidCursor}
            >
              <h2 className="text-3xl font-bold text-[var(--foreground)] [font-family:var(--font-arvo)] sm:text-4xl lg:text-5xl">
                {content.title}
              </h2>
              <div className="mx-auto mt-4 max-w-lg text-sm leading-6 italic text-zinc-500 sm:mt-5 sm:text-base">
                <p>&quot;{content.quote}&quot;</p>
                <p className="mt-1">— {content.author}</p>
              </div>
            </header>

            <div className="relative">
              <div
                className={`timeline-line absolute -bottom-12 left-2 top-0 w-[2px] origin-top sm:-bottom-16 sm:left-4 lg:bottom-[-7rem] lg:left-5 ${
                  isEducation
                    ? "bg-gradient-to-b from-transparent via-[var(--color-curvature)] to-[var(--color-curvature)]"
                    : "bg-gradient-to-b from-[var(--color-curvature)] via-[var(--color-curvature)] to-transparent"
                }`}
              />

              <div className="space-y-6 sm:space-y-10 lg:space-y-16">
                {entries.map((item) => (
                  <div
                    key={`${item.type}-${item.title}`}
                    className="timeline-entry relative min-w-0 pl-7 sm:pl-12 lg:pl-16"
                    onMouseEnter={hollowCursor}
                    onMouseLeave={solidCursor}
                  >
                    <div className="timeline-dot absolute left-2 top-6 z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-[var(--color-secondary)] sm:left-4 sm:h-4 sm:w-4 lg:left-5" />

                    <button
                      type="button"
                      aria-haspopup="dialog"
                      onClick={(event) => {
                        setExpandedEntry({
                          entry: item,
                          origin: event.currentTarget.getBoundingClientRect(),
                        });
                      }}
                      className="timeline-card group relative w-full overflow-hidden rounded-xl border border-[var(--color-curvature)] bg-[var(--background)] p-4 text-left break-words sm:p-5 shadow-lg transition-colors duration-300 hover:border-[var(--color-secondary)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-primary)] md:p-7"
                    >
                      <div className="transition-all duration-300 ease-out group-hover:blur-[2px] group-hover:opacity-50">
                        <span className="block text-xs uppercase tracking-[0.25em] text-cyan-300">{item.type}</span>
                        <span className="mt-3 block text-sm text-zinc-500">{item.dateRange}</span>
                        <span className="mt-2 block text-xl leading-snug sm:text-2xl font-bold text-[var(--foreground)]">{item.title}</span>
                        <span className="mt-1 block text-sm text-zinc-400">{item.org}</span>
                        <span className="mt-4 block text-sm leading-6 text-zinc-400">{item.description}</span>
                        <span className="mt-4 block text-sm text-[var(--color-secondary)]">View details →</span>
                      </div>

                      <span className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100">
                        <BookOpenText
                          size={40}
                          strokeWidth={1.75}
                          className="scale-75 text-[var(--foreground)] transition-transform duration-300 ease-out group-hover:scale-100"
                        />
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })}

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
