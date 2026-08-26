"use client";

import { type CSSProperties, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
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
      content: "Python, Java, JavaScript, TypeScript, Javascript, SQL",
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
      content: "PostgresSQL, MongoDB, Sybase ASE",
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

    const ctx = gsap.context(() => {
      const spacing = 420;
      const total = skills.length;
      const wrapIndex = gsap.utils.wrap(0, total);

      let current = 0;

      function render() {
        cards.forEach((card, index) => {
          let diff = index - current;

          if (diff > total / 2) diff -= total;
          if (diff < -total / 2) diff += total;

          const abs = Math.abs(diff);

          gsap.to(card, {
            // 300 is used here to keep some cards in the background while the rest stay in the center
            x: diff * 300,
            overwrite: "auto",
            scale: abs === 0 ? 1 : abs === 1 ? 0.78 : 0.55,
            opacity: abs === 0 ? 1 : abs === 1 ? 0.65 : 0.3, // rotate: abs === 0 ? 0 : diff < 0 ? -5 : 5,
            zIndex: 20 - abs,
            duration: 1.2,
            delay: abs * 0.08,
            ease: "power3.out",
          });
        });
      }

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
              render();
            }, "-=0.35");
        },
      });

      Draggable.create(proxy, {
        type: "x",
        trigger: wrapper,
        inertia: true,
        throwResistance: 1200,
        onDrag() {
          current = wrapIndex(Math.round(-this.x / spacing));
          render();
        },
        onThrowUpdate() {
          current = wrapIndex(Math.round(-this.x / spacing));
          render();
        },
        onDragEnd() {
          gsap.to(proxy, {
            x: -current * spacing,
            duration: 0.4,
            ease: "power3.out",
          });
        },
        onThrowComplete() {
          gsap.to(proxy, {
            x: -current * spacing,
            duration: 0.4,
            ease: "power3.out",
          });
        },
      });
    }, wrapper);

    return () => ctx.revert();
  }, [skills.length]);

  return (
    <section id="skills" className="relative w-full overflow-hidden py-24">
      <div ref={titleRef} className="mb-10 px-8 text-center">
        <p
          className="text-5xl font-bold text-[var(--foreground)] [font-family:var(--font-arvo)]"
          onMouseEnter={hollowCursor}
          onMouseLeave={solidCursor}
        >
          Skills
        </p>
      </div>

      <div
        className="mb-10 px-8 text-center text-md italic text-zinc-500"
        onMouseEnter={hollowCursor}
        onMouseLeave={solidCursor}
        ref={subtitleRef}
      >
        <p className="text-md italic text-zinc-500">
          &quot;It is possible to fly without motors, but not without knowledge and skill.&quot;
        </p>
        <p>
          - <span className="hover:underline hover:decoration-dotted">Wilbur Wright</span>
        </p>
      </div>

      <div ref={wrapperRef} className="relative mx-auto h-[32rem] w-full max-w-6xl">
        <div className="absolute left-1/2 top-1/2">
          {skills.map((skill: SkillRecord, index: number) => {
            const Icon: LucideIcon = skill.icon;
            return (
              <article
                key={skill.title}
                ref={(el: HTMLElement | null) => {
                  if (el) {
                    cardsRef.current[index] = el;
                  }
                }}
                style={{ "--skill-accent": skill.accent } as SkillCardStyle}
                className="group absolute left-0 top-0 flex h-[25rem] w-[19rem] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-3xl border border-white/10 bg-[var(--background)] p-6 shadow-2xl shadow-black/30 backdrop-blur-md transition-[border-color] duration-300 hover:border-[var(--skill-accent)] sm:w-[20rem] sm:p-7"
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
                  <div className="relative flex h-36 w-36 items-center justify-center">
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

                <div className="relative border-t border-white/10 pt-5">
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
    </section>
  );
}
