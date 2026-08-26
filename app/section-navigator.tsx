"use client";

import { useEffect, useState } from "react";
import { useCursor } from "./CursorProvider";

const sections = [
  { id: "aboutme", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contactme", label: "Contact" },
];

export default function SectionNavigator() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { hollowCursor, solidCursor } = useCursor();

  useEffect(() => {
    let frameId = 0;

    const updateNavigator = () => {
      frameId = 0;

      const sectionElements = sections
        .map(({ id }) => document.getElementById(id))
        .filter((section): section is HTMLElement => section !== null);

      if (sectionElements.length !== sections.length) return;

      setIsVisible(sectionElements[1].getBoundingClientRect().top <= window.innerHeight * 0.85);

      const focusLine = window.innerHeight * 0.45;
      let nextIndex = 0;

      sectionElements.forEach((section, index) => {
        if (section.getBoundingClientRect().top <= focusLine) {
          nextIndex = index;
        }
      });

      setActiveIndex(nextIndex);
    };

    const requestUpdate = () => {
      if (!frameId) frameId = window.requestAnimationFrame(updateNavigator);
    };

    updateNavigator();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <aside
      aria-label="Page sections"
      className={`fixed bottom-6 right-3 z-40 transition-all duration-500 ease-out sm:bottom-10 sm:right-6 lg:right-8 ${
        isVisible ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-6 opacity-0"
      }`}
    >
      <nav className="relative flex h-52 w-10 flex-col items-center justify-between rounded-2xl border border-white/10 bg-[var(--color-dark-card)]/80 py-4 shadow-xl shadow-black/25 backdrop-blur-md">
        <div className="absolute bottom-6 left-1/2 top-6 w-px -translate-x-1/2 bg-white/15" aria-hidden="true" />

        <div
          className="pointer-events-none absolute left-1/2 top-4 h-5 w-[3px] -translate-x-1/2 rounded-full bg-[var(--color-secondary)] shadow-[0_0_10px_var(--color-secondary)] transition-transform duration-500 ease-out"
          style={{ transform: `translate(-50%, ${activeIndex * 39}px)` }}
          aria-hidden="true"
        />

        {sections.map(({ id, label }, index) => (
          <button
            key={id}
            type="button"
            aria-label={`Go to ${label}`}
            aria-current={activeIndex === index ? "location" : undefined}
            onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })}
            onMouseEnter={hollowCursor}
            onMouseLeave={solidCursor}
            className="group relative z-10 flex h-5 w-full items-center justify-center focus-visible:outline-none"
          >
            <span className="pointer-events-none absolute right-full mr-3 rounded-md border border-white/10 bg-[var(--color-dark-card)] px-2 py-1 font-mono text-[0.65rem] text-zinc-300 opacity-0 shadow-lg transition-all duration-200 group-hover:-translate-x-1 group-hover:opacity-100 group-focus-visible:-translate-x-1 group-focus-visible:opacity-100">
              {label}
            </span>
            <span
              className={`h-px transition-all duration-300 ${
                activeIndex === index
                  ? "w-4 bg-[var(--color-secondary)]"
                  : "w-2 bg-zinc-500 group-hover:w-4 group-hover:bg-zinc-300"
              }`}
              aria-hidden="true"
            />
          </button>
        ))}
      </nav>
    </aside>
  );
}
