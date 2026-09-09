"use client";

import { useCursor } from "@/app/CursorProvider";

export default function About() {
  const { hollowCursor, solidCursor } = useCursor();

  return (
    <section id="aboutme" className="w-full px-5 py-16 sm:px-8 sm:py-20 md:px-16 lg:px-12 lg:py-24">
      <div className="mx-auto w-full max-w-3xl">
        <div className="flex items-center gap-4 md:gap-6">
          <h2 onMouseEnter={hollowCursor} onMouseLeave={solidCursor} className="shrink-0 text-3xl font-bold text-[var(--foreground)] [font-family:var(--font-arvo)] sm:text-4xl lg:text-5xl">
            About Me
          </h2>
          <div className="h-px min-w-0 flex-1 bg-[var(--color-curvature)]" aria-hidden="true" />
        </div>

        <div
          className="mt-8 space-y-5 break-words text-left text-base leading-7 text-zinc-400 sm:mt-10 sm:space-y-6 lg:mt-16 [&_.emphasis-point]:max-w-full"
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
