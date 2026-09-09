"use client";

import { type CSSProperties, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useReducedMotion } from "./use-reduced-motion";
import { Draggable } from "gsap/Draggable";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCursor } from "@/app/CursorProvider";
import { CloudCog, CodeXml, Database, GitGraph, type LucideIcon, Server, FileBraces } from "lucide-react";

gsap.registerPlugin(Draggable, ScrollTrigger);

type SkillRecord = {
  experimental: boolean;
  title: string;
  content: string;
  icon: LucideIcon;
  accent: string;
};

type SkillCardStyle = CSSProperties & {
  "--skill-accent": string;
};

export default function Skills() {
  const reducedMotion = useReducedMotion();
  const navigateRef = useRef<(direction: number) => void>(() => {});
  const [activeSkill, setActiveSkill] = useState(0);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const subtitleRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const proxyRef = useRef<HTMLDivElement | null>(null);
  const { hollowCursor, solidCursor } = useCursor();

  const skills: SkillRecord[] = [
    {
      experimental: false,
      title: "Languages",
      content: "Python, Java, JavaScript, TypeScript, SQL",
      icon: FileBraces,
      accent: "#48ec9a",
    },
    {
      experimental: false,
      title: "Frontend",
      content: "Angular, React, HTML5, CSS3, Tailwind CSS, Material UI, GSAP",
      icon: CodeXml,
      accent: "#ec4899",
    },
    {
      experimental: false,
      title: "Databases",
      content: "PostgreSQL, MongoDB, Sybase ASE",
      icon: Database,
      accent: "#22d3ee",
    },
    {
      experimental: false,
      title: "Tools",
      content: "Git, Azure DevOps, GitHub, BitBucket, JUnit, Jest, Sonarqube, Maven",
      icon: GitGraph,
      accent: "#a78bfa",
    },
    {
      experimental: true,
      title: "Cloud",
      content: "AWS, Docker, Kubernetes, Terraform",
      icon: CloudCog,
      accent: "#fb2c36",
    },
    {
      experimental: false,
      title: "Backend",
      content: "Spring Boot, FastAPI, Node.js, REST APIs, Microservices",
      icon: Server,
      accent: "#8b5cf6",
    },
  ];

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const proxy = proxyRef.current;
    const cards = cardsRef.current;

    if (!wrapper || !proxy || !cards.length) return;

    let resizeObserver: ResizeObserver | undefined;
    let draggable: Draggable | undefined;

    const ctx = gsap.context(() => {
      let spacing = 420;
      let cardSpacing = 300;
      let hasEntered = false;
      const total = skills.length;
      const wrapIndex = gsap.utils.wrap(0, total);

      let current = 0;

      function render(animate = true) {
        setActiveSkill(current);
        animate = animate && !reducedMotion;
        cards.forEach((card, index) => {
          let diff = index - current;

          if (diff > total / 2) diff -= total;
          if (diff < -total / 2) diff += total;

          const abs = Math.abs(diff);

          gsap.to(card, {
            x: diff * cardSpacing,
            overwrite: "auto",
            scale: abs === 0 ? 1 : abs === 1 ? 0.78 : 0.55,
            opacity: abs === 0 ? 1 : abs === 1 ? 0.65 : 0.3, // rotate: abs === 0 ? 0 : diff < 0 ? -5 : 5,
            zIndex: 20 - abs,
            duration: animate ? 1.2 : 0,
            delay: animate ? abs * 0.08 : 0,
            ease: "power3.out",
          });
        });
      }

      if (!reducedMotion) {
        gsap.set(cards, {
          x: 0,
          scale: 0.4,
          opacity: 0,
          rotate: 0,
        });

        gsap.set(titleRef.current, {
          opacity: 0,
          y: 80,
        });

        gsap.set(subtitleRef.current, {
          opacity: 0,
          y: 80,
        });

        ScrollTrigger.create({
          trigger: wrapper,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap
              .timeline()
              .to(titleRef.current, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
              })
              .to(
                subtitleRef.current,
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.8,
                  ease: "power3.out",
                },
                "-=0.35",
              )
              .add(() => {
                hasEntered = true;
                render();
              }, "-=0.35");
          },
        });

      } else {
        hasEntered = true;
        render(false);
      }

      [draggable] = Draggable.create(proxy, {
        type: "x",
        trigger: wrapper,
        allowNativeTouchScrolling: true,

        onDrag() {
          current = wrapIndex(Math.round(-this.x / spacing));
          if (hasEntered) render();
        },
        onThrowUpdate() {
          current = wrapIndex(Math.round(-this.x / spacing));
          if (hasEntered) render();
        },
        onDragEnd() {
          gsap.to(proxy, {
            x: -current * spacing,
            duration: reducedMotion ? 0 : 0.4,
            ease: "power3.out",
          });
        },
        onThrowComplete() {
          gsap.to(proxy, {
            x: -current * spacing,
            duration: reducedMotion ? 0 : 0.4,
            ease: "power3.out",
          });
        },
      });

      navigateRef.current = (direction) => {
        if (!hasEntered) return;
        current = wrapIndex(current + direction);
        gsap.killTweensOf(proxy);
        gsap.set(proxy, { x: -current * spacing });
        draggable?.update();
        render();
      };

      resizeObserver = new ResizeObserver(() => {
        // Use the containing width so a swipe stays practical on narrow screens.
        cardSpacing = Math.min(300, wrapper.clientWidth * 0.55);
        spacing = Math.min(420, wrapper.clientWidth * 0.7);
        gsap.killTweensOf(proxy);
        gsap.set(proxy, { x: -current * spacing });
        draggable?.update();
        if (hasEntered) render(false);
      });
      resizeObserver.observe(wrapper);
    }, wrapper);

    return () => {
      navigateRef.current = () => {};
      resizeObserver?.disconnect();
      draggable?.kill();
      gsap.killTweensOf([...cards, proxy]);
      ctx.revert();
    };
  }, [skills.length, reducedMotion]);

  return (
    <section id="skills" onKeyDown={(event) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        navigateRef.current(event.key === "ArrowRight" ? 1 : -1);
      }
    }} className="relative w-full overflow-hidden py-16 sm:py-20 lg:py-24">
      <div ref={titleRef} className="mb-6 px-5 text-center sm:mb-8 sm:px-8 lg:mb-10">
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--foreground)] [font-family:var(--font-arvo)]"
          onMouseEnter={hollowCursor}
          onMouseLeave={solidCursor}
        >
          Skills
        </h2>
      </div>

      <div
        className="mx-auto mb-6 max-w-2xl px-5 text-center text-sm leading-6 italic text-zinc-500 sm:mb-8 sm:px-8 sm:text-base lg:mb-10"
        onMouseEnter={hollowCursor}
        onMouseLeave={solidCursor}
        ref={subtitleRef}
      >
        <p className="italic text-zinc-500">
          &quot;It is possible to fly without motors, but not without knowledge and skill.&quot;
        </p>
        <p>
          - <span className="hover:underline hover:decoration-dotted">Wilbur Wright</span>
        </p>
      </div>

      <div ref={wrapperRef} className="relative mx-auto h-[29rem] w-full max-w-6xl touch-pan-y sm:h-[32rem]">
        <div className="absolute left-0 top-1/2 w-full">
          {skills.map((skill: SkillRecord, index: number) => {
            const Icon: LucideIcon = skill.icon;
            return (
              <article
                key={skill.title}
                aria-hidden={activeSkill !== index}
                ref={(el: HTMLElement | null) => {
                  if (el) {
                    cardsRef.current[index] = el;
                  }
                }}
                style={{ "--skill-accent": skill.accent } as SkillCardStyle}
                className="group absolute left-1/2 top-0 flex h-[25rem] w-[min(19rem,calc(100%-3rem))] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-3xl border border-white/10 bg-[var(--background)] p-5 shadow-2xl shadow-black/30 backdrop-blur-md transition-[border-color] duration-300 hover:border-[var(--skill-accent)] sm:w-[20rem] sm:p-7"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-15 transition-opacity duration-500 group-hover:opacity-25"
                  style={{
                    background: "radial-gradient(circle at 50% 42%, var(--skill-accent) 0%, transparent 48%)",
                  }}
                  aria-hidden="true"
                />

                <div
                  className="relative flex items-start justify-between gap-4"
                  onMouseEnter={hollowCursor}
                  onMouseLeave={solidCursor}
                >
                  <div>
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-[var(--skill-accent)]">
                      Core skill
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold text-[var(--foreground)] [font-family:var(--font-inter)]">
                      {skill.title}
                    </h3>
                  </div>
                </div>

                <div
                  className="relative flex flex-1 items-center justify-center"
                  onMouseEnter={hollowCursor}
                  onMouseLeave={solidCursor}
                >
                  <div className="relative flex h-28 w-28 items-center justify-center sm:h-36 sm:w-36">
                    <div
                      className="absolute inset-0 rounded-[2.5rem] border border-[var(--skill-accent)] opacity-35 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-105"
                      aria-hidden="true"
                    />
                    <div
                      className="absolute inset-3 rounded-[2rem] border border-dashed border-[var(--skill-accent)] opacity-25 transition-transform duration-500 group-hover:-rotate-6"
                      aria-hidden="true"
                    />
                    <Icon className="relative text-[var(--skill-accent)]" size={64} strokeWidth={1.25} />
                  </div>
                </div>

                <div onMouseEnter={hollowCursor} onMouseLeave={solidCursor} className="relative border-t border-white/10 pt-5">
                  <div className="mb-3 flex items-center justify-between font-mono text-[0.65rem] uppercase tracking-[0.22em]">
                    <span className="text-zinc-500">Toolkit</span>
                    {skill.experimental && <span className="text-[var(--skill-accent)]">Exploring</span>}
                  </div>
                  <p className="font-mono text-sm leading-6 text-zinc-300">{skill.content}</p>
                </div>
              </article>
            );
          })}
        </div>

        <div ref={proxyRef} className="invisible absolute" />
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4 px-5">
        <button onMouseEnter={hollowCursor} onMouseLeave={solidCursor} type="button" aria-label="Previous skill" onClick={() => navigateRef.current(-1)} className="min-h-11 rounded-lg border border-[var(--color-curvature)] px-4 focus-visible:outline-2 focus-visible:outline-[var(--color-primary)]">← Previous</button>
        <p onMouseEnter={hollowCursor} onMouseLeave={solidCursor} aria-live="polite" aria-atomic="true" className="text-sm text-zinc-400">{skills[activeSkill].title} · {activeSkill + 1}/{skills.length}</p>
        <button onMouseEnter={hollowCursor} onMouseLeave={solidCursor} type="button" aria-label="Next skill" onClick={() => navigateRef.current(1)} className="min-h-11 rounded-lg border border-[var(--color-curvature)] px-4 focus-visible:outline-2 focus-visible:outline-[var(--color-primary)]">Next →</button>
      </div>
      <p onMouseEnter={hollowCursor} onMouseLeave={solidCursor} className="mt-3 px-5 text-center text-xs text-zinc-500">Swipe, drag, or use the buttons and arrow keys to explore.</p>
    </section>
  );
}
