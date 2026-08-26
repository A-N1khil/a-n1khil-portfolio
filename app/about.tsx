"use client";

import { useCursor } from "@/app/CursorProvider";

export default function About() {
  const { hollowCursor, solidCursor } = useCursor();

  return (
    <section id="aboutme" className="w-full px-8 py-24 md:px-0">
      <div className="mx-auto w-full md:w-3/5">
        <div className="flex items-center gap-4 md:gap-6">
          <h2 className="shrink-0 text-3xl font-bold text-[var(--foreground)] [font-family:var(--font-arvo)] md:text-5xl">
            About Me
          </h2>
          <div className="h-px w-full max-w-lg bg-[var(--color-curvature)]" aria-hidden="true" />
        </div>

        <div
          className="mt-12 space-y-6 text-left text-base leading-7 text-zinc-400 md:mt-16 md:text-base"
          onMouseEnter={hollowCursor}
          onMouseLeave={solidCursor}
        >
          <p>
            Hello! I&apos;m Nikhil, a <span className="emphasis-point">full-stack software developer</span> who enjoys
            building things for the web and figuring out how all the pieces fit together. My interest in software
            development started with a curiosity for creating things from scratch, and over time that curiosity grew
            into building full-stack applications that balance thoughtful user experiences with solid engineering under
            the hood.
          </p>

          <p>
            Fast-forward to today, and I&apos;ve spent over three years working professionally across the stack,
            building and modernizing applications with{" "}
            <span className="emphasis-point">Java, Spring, Angular, React, and TypeScript</span>. Along the way,
            I&apos;ve worked on everything from designing REST APIs and backend services to developing responsive
            interfaces, improving application performance, and taking features from an idea all the way to production.
          </p>

          <p>
            These days, I&apos;m looking for job opportunities. I&apos;ve graduated from{" "}
            <span className="emphasis-point">
              <a href="https://www.umass.edu/">University of Massachusetts, Amherst</a>{" "}
            </span>
            , and I&apos;ve been expanding beyond traditional full-stack development into distributed systems, machine
            learning systems, and AI. I especially enjoy projects where I can combine these areas with web development —
            whether that means building scalable systems, experimenting with new technologies, or simply obsessing over
            the little details that make an interface feel right. Outside of work and coursework, I&apos;m usually
            building something, learning a new technology, or finding an unnecessarily complicated way to automate
            something I could probably do manually.
          </p>
        </div>
      </div>
    </section>
  );
}
