"use client";

import { useCursor } from "./CursorProvider";

export default function Contact() {
  const { hollowCursor, solidCursor } = useCursor();

  return (
    <section
      id="contactme"
      className="flex min-h-screen items-center justify-center px-6 py-28 text-center md:px-8 md:py-36"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center">
        <p className="text-sm tracking-[0.18em] text-[var(--color-secondary)] [font-family:var(--font-monaco)] md:text-base">
          05. What&apos;s Next?
        </p>

        <h2
          className="mt-6 text-5xl font-bold leading-tight text-[var(--foreground)] [font-family:var(--font-arvo)] sm:text-6xl md:text-7xl"
          onMouseEnter={hollowCursor}
          onMouseLeave={solidCursor}
        >
          Get In Touch
        </h2>

        <p className="mt-8 max-w-2xl text-base leading-4 text-zinc-400 sm:text-md md:text-lg md:leading-9 [font-family:var(--font-geist-sans)]">
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
    </section>
  );
}
