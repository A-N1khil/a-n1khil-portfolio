"use client";

import { useCursor } from "./CursorProvider";

export default function Contact() {
  const { hollowCursor, solidCursor } = useCursor();

  return (
    <section
      id="contactme"
      className="relative flex min-h-screen items-center justify-center px-6 py-28 text-center md:px-8 md:py-36"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center">
        <p className="text-sm tracking-[0.18em] text-[var(--color-secondary)] [font-family:var(--font-monaco)] md:text-base">
          What&apos;s Next?
        </p>

        <h2
          className="mt-6 text-3xl font-bold leading-tight text-[var(--foreground)] [font-family:var(--font-arvo)] sm:text-3xl md:text-5xl"
          onMouseEnter={hollowCursor}
          onMouseLeave={solidCursor}
        >
          Get In Touch
        </h2>

        <p className="mt-8 max-w-2xl text-base leading-4 text-zinc-400 sm:text-md md:text-md md:leading-5 [font-family:var(--font-geist-sans)]">
          I&apos;m always open to discussing new opportunities, interesting projects, or simply connecting. Whether you
          have a question or just want to say hello, I&apos;ll do my best to get back to you.
        </p>

        <a
          href="mailto:nikhilanand1006@gmail.com"
          className="mt-12 rounded-lg border border-[var(--color-secondary)] px-8 py-4 text-base text-[var(--color-secondary)] [font-family:var(--font-monaco)] transition-colors duration-300 hover:bg-[var(--color-secondary)] hover:text-[var(--foreground)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-primary)] md:mt-14"
          onMouseEnter={hollowCursor}
          onMouseLeave={solidCursor}
        >
          Say Hello
        </a>
      </div>

      <div onMouseEnter={hollowCursor} onMouseLeave={solidCursor}>
        <p className="absolute bottom-20 left-1/2 w-full max-w-2xl -translate-x-1/2 px-6 text-center text-xs leading-5 text-zinc-400 [font-family:var(--font-geist-sans)] sm:bottom-22 sm:text-sm">
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
        <p className="absolute bottom-14 left-1/2 w-full max-w-xl -translate-x-1/2 px-6 text-center text-xs leading-5 text-zinc-400 [font-family:var(--font-geist-sans)] sm:bottom-16 sm:text-sm">
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
        <p className="absolute bottom-6 left-1/2 w-full max-w-xl -translate-x-1/2 px-6 text-center text-xs leading-5 text-zinc-400 [font-family:var(--font-geist-sans)] sm:bottom-8 sm:text-sm">
          Nikhil Anand &copy; {new Date().getFullYear()}
        </p>
      </div>
    </section>
  );
}
