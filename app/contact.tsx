"use client";

import { ArrowUpRight } from "lucide-react";
import { useCursor } from "./CursorProvider";

export default function Contact() {
  const { hollowCursor, solidCursor } = useCursor();

  return (
    <section
      id="contactme"
      className="relative flex min-h-svh flex-col items-center px-5 pb-6 pt-16 text-center sm:px-8 sm:pb-8 sm:pt-20 md:px-16 lg:px-12 lg:pt-28"
    >
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center">
        <p onMouseEnter={hollowCursor} onMouseLeave={solidCursor} className="text-sm tracking-[0.18em] text-[var(--color-secondary)] [font-family:var(--font-monaco)] md:text-base">
          What&apos;s Next?
        </p>

        <h2
          className="mt-6 text-3xl font-bold leading-tight text-[var(--foreground)] [font-family:var(--font-arvo)] sm:text-4xl lg:text-5xl"
          onMouseEnter={hollowCursor}
          onMouseLeave={solidCursor}
        >
          Get In Touch
        </h2>

        <p onMouseEnter={hollowCursor} onMouseLeave={solidCursor} className="mt-6 max-w-2xl text-base leading-7 text-zinc-400 sm:mt-8 [font-family:var(--font-geist-sans)]">
          I&apos;m always open to discussing new opportunities, interesting projects, or simply connecting. Whether you
          have a question or just want to say hello, I&apos;ll do my best to get back to you.
        </p>

        <a
          href="mailto:nikhilanand1006@gmail.com"
          className="mt-8 inline-flex min-h-11 items-center justify-center rounded-lg border border-[var(--color-secondary)] px-8 py-4 text-base text-[var(--color-secondary)] [font-family:var(--font-monaco)] transition-colors duration-300 hover:bg-[var(--color-secondary)] hover:text-[var(--foreground)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-primary)] sm:mt-10 lg:mt-14"
          onMouseEnter={hollowCursor}
          onMouseLeave={solidCursor}
        >
          Say Hello
        </a>

        <div onMouseEnter={hollowCursor} onMouseLeave={solidCursor} className="mt-7">
          <p className="text-sm text-zinc-500">Or find me on</p>
          <nav aria-label="Social links" className="mt-1 flex flex-wrap items-center justify-center gap-x-6">
            {[
              { label: "GitHub", href: "https://github.com/A-N1khil" },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/a-nikhil/" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-11 items-center gap-1.5 rounded-sm text-sm text-zinc-300 transition-colors hover:text-[var(--color-secondary)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-primary)]"
              >
                <span className="emphasis-point">{label}</span>
                <ArrowUpRight aria-hidden="true" size={14} className="text-zinc-500 transition-colors group-hover:text-[var(--color-secondary)]" />
              </a>
            ))}
          </nav>
        </div>
      </div>

      <footer
        className="mx-auto mt-16 w-full max-w-2xl space-y-3 break-words text-xs leading-5 text-zinc-400 [font-family:var(--font-geist-sans)] sm:mt-20 sm:text-sm lg:mt-24 [&_.emphasis-point]:max-w-full"
        onMouseEnter={hollowCursor}
        onMouseLeave={solidCursor}
      >
        <p>
          Designed in{" "}
          <span className="emphasis-point">
            <a target="_blank" rel="noopener noreferrer" href="https://www.figma.com/">
              Figma
            </a>
          </span>
          , coded in{" "}
          <span className="emphasis-point">
            <a target="_blank" rel="noopener noreferrer" href="https://code.visualstudio.com/">
              Visual Studio Code
            </a>
          </span>
          , and deployed with{" "}
          <span className="emphasis-point">
            <a target="_blank" rel="noopener noreferrer" href="https://vercel.com/">
              Vercel
            </a>
          </span>{" "}
          by yours truly.
        </p>
        <p>
          Built with{" "}
          <span className="emphasis-point">
            <a target="_blank" rel="noopener noreferrer" href="https://nextjs.org/">
              Next.js
            </a>
          </span>
          ,{" "}
          <span className="emphasis-point">
            <a target="_blank" rel="noopener noreferrer" href="https://tailwindcss.com/">
              Tailwind CSS
            </a>
          </span>
          , and animations powered by{" "}
          <span className="emphasis-point">
            <a target="_blank" rel="noopener noreferrer" href="https://gsap.com/">
              GSAP
            </a>
          </span>
          .
        </p>
        <p>
          Nikhil Anand &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </section>
  );
}
