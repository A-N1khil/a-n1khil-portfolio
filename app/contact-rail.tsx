"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCursor } from "./CursorProvider";

gsap.registerPlugin(ScrollTrigger);

type SocialLink = {
  label: "GitHub" | "LinkedIn" | "Email";
  href: string;
};

const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/A-N1khil" },
  { label: "LinkedIn", href: "https://www.linkedin.com" },
  { label: "Email", href: "mailto:nikhilanand1006@gmail.com" },
];

function SocialIcon({ name }: { name: SocialLink["label"] }) {
  const sharedProps = {
    width: 15,
    height: 15,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (name === "GitHub") {
    return (
      <svg {...sharedProps}>
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7A5.4 5.4 0 0 0 19.3 4 5 5 0 0 0 19.2.5S18 0 15 1.8a13.4 13.4 0 0 0-7 0C5 .1 3.8.5 3.8.5A5 5 0 0 0 3.7 4a5.4 5.4 0 0 0-1.5 3.7c0 5.4 3.5 6.6 6.8 7A4.8 4.8 0 0 0 8 18v4" />
        <path d="M8 19c-3 .9-3-1.5-4-2" />
      </svg>
    );
  }

  if (name === "LinkedIn") {
    return (
      <svg {...sharedProps}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" />
        <path d="M2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    );
  }

  return (
    <svg {...sharedProps}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 7L2 7" />
    </svg>
  );
}

export default function ContactRail() {
  const railRef = useRef<HTMLElement | null>(null);
  const { hollowCursor, solidCursor } = useCursor();

  useLayoutEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const context = gsap.context(() => {
      gsap.set(rail, { autoAlpha: 0, x: -24, pointerEvents: "none" });

      ScrollTrigger.create({
        trigger: "#skills",
        start: "top 85%",
        onEnter: () => {
          gsap.to(rail, {
            autoAlpha: 1,
            x: 0,
            pointerEvents: "auto",
            duration: 0.55,
            ease: "power3.out",
          });
        },
        onEnterBack: () => {
          gsap.to(rail, {
            autoAlpha: 1,
            x: 0,
            pointerEvents: "auto",
            duration: 0.55,
            ease: "power3.out",
          });
        },
        onLeaveBack: () => {
          gsap.to(rail, {
            autoAlpha: 0,
            x: -24,
            pointerEvents: "none",
            duration: 0.4,
            ease: "power2.in",
          });
        },
      });
    });

    return () => context.revert();
  }, []);

  return (
    <aside
      ref={railRef}
      aria-label="Social links"
      className="fixed bottom-0 left-5 z-40 hidden h-[30vh] w-10 flex-col items-center md:flex lg:left-8"
    >
      <nav className="flex flex-col items-center gap-7">
        {socialLinks.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target={label === "Email" ? undefined : "_blank"}
            rel={label === "Email" ? undefined : "noreferrer"}
            aria-label={label}
            className="text-slate-400 transition-colors duration-200 hover:text-[var(--color-secondary)] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-primary)]"
            onMouseEnter={hollowCursor}
            onMouseLeave={solidCursor}
          >
            <SocialIcon name={label} />
          </a>
        ))}
      </nav>

      <div className="mt-8 w-px flex-1 bg-slate-400" aria-hidden="true" />
    </aside>
  );
}
