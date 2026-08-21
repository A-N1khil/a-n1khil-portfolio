"use client";

import { useCallback, useState } from "react";
import { useCursor } from "@/app/CursorProvider";
import Timeline, { type TimelineEntryType } from "./timeline";

export default function Experience() {
  const { hollowCursor, solidCursor } = useCursor();
  const [activeType, setActiveType] = useState<TimelineEntryType | null>(null);
  const handleActiveTypeChange = useCallback((type: TimelineEntryType | null): void => {
    setActiveType(type);
  }, []);

  const sectionCopyClasses = "sticky top-1/2 -translate-y-1/2 text-center transition-all duration-500";

  return (
    <section id="experience" className="min-h-screen px-6 py-24 md:px-8">
      <div className="mb-10 text-center md:hidden">
        <p
          className="text-4xl font-bold text-[var(--foreground)] [font-family:var(--font-arvo)]"
          onMouseEnter={hollowCursor}
          onMouseLeave={solidCursor}
        >
          {activeType === "work" ? "Experience" : activeType === "education" ? "Education" : "\u00a0"}
        </p>
        {activeType && (
          <div className="mt-4 text-md italic text-zinc-500">
            <p>
              {activeType === "work"
                ? '"Experience is the teacher of all things."'
                : '"Intelligence plus character—that is the goal of true education."'}
            </p>
            <p>
              - {activeType === "work" ? "Julius Caesar" : "Martin Luther King Jr."}
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[5fr_20fr_minmax(0,50fr)_20fr_5fr]">
        <div className="hidden md:block" aria-hidden="true" />

        <div className="relative hidden h-full md:block">
          <div
            aria-hidden={activeType !== "work"}
            className={`${sectionCopyClasses} ${
              activeType === "work" ? "visible opacity-100" : "invisible -translate-x-4 opacity-0"
            }`}
            onMouseEnter={hollowCursor}
            onMouseLeave={solidCursor}
          >
            <p className="text-4xl font-bold text-[var(--foreground)] [font-family:var(--font-arvo)] lg:text-5xl">
              Experience
            </p>
            <div className="mt-6 text-md italic text-zinc-500">
              <p>&quot;Experience is the teacher of all things.&quot;</p>
              <p>
                - <span className="hover:underline hover:decoration-dotted">Julius Caesar</span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex min-w-0 justify-center overflow-hidden">
          <Timeline onActiveTypeChange={handleActiveTypeChange} />
        </div>

        <div className="relative hidden h-full md:block">
          <div
            aria-hidden={activeType !== "education"}
            className={`${sectionCopyClasses} ${
              activeType === "education" ? "visible opacity-100" : "invisible translate-x-4 opacity-0"
            }`}
            onMouseEnter={hollowCursor}
            onMouseLeave={solidCursor}
          >
            <p className="text-4xl font-bold text-[var(--foreground)] [font-family:var(--font-arvo)] lg:text-5xl">
              Education
            </p>
            <div className="mx-auto mt-6 w-4/5 max-w-56 text-md italic text-zinc-500">
              <p>&quot;Intelligence plus character—that is the goal of true education.&quot;</p>
              <p>
                - <span className="hover:underline hover:decoration-dotted">Martin Luther King Jr.</span>
              </p>
            </div>
          </div>
        </div>

        <div className="hidden md:block" aria-hidden="true" />
      </div>
    </section>
  );
}
