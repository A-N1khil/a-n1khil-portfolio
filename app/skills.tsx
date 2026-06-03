"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCursor } from "@/app/CursorProvider";
import { BrainCircuit, CodeXml, Database, GitGraph, type LucideIcon, Server } from "lucide-react";

gsap.registerPlugin(Draggable, ScrollTrigger);

type SkillRecord = {
  experimental: boolean;
  title: string;
  content: string;
  icon: LucideIcon;
};

export default function Skills() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const proxyRef = useRef<HTMLDivElement | null>(null);
  const { hollowCursor, solidCursor } = useCursor();

  const skills: SkillRecord[] = [
    {
      experimental: false,
      title: "Frontend",
      content: "Angular, TypeScript, React, Next.js, Tailwind, GSAP",
      icon: CodeXml,
    },
    {
      experimental: false,
      title: "Backend",
      content: "Spring Boot, Java, Maven, Python, FastAPI",
      icon: Server,
    },
    {
      experimental: false,
      title: "Databases",
      content: "Sybase ASE, SQL, MongoDB",
      icon: Database,
    },
    {
      experimental: false,
      title: "Version Control",
      content: "Git, Azure DevOps, Github",
      icon: GitGraph,
    },
    {
      experimental: true,
      title: "Network Security",
      content: "Metasploit, Nessus, Ettercap, Wireshark",
      icon: BrainCircuit,
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
            x: diff * 300,
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

      ScrollTrigger.create({
        trigger: wrapper,
        start: "top 75%",
        once: true,
        onEnter: () => {
          render();
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
  }, []);

  return (
    <section id="skills" className="relative w-full overflow-hidden py-24">
      <div className="mb-10 px-8 text-center">
        <p
          className="text-5xl font-semibold text-[var(--foreground)]"
          onMouseEnter={hollowCursor}
          onMouseLeave={solidCursor}
        >
          Skills
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
                className="absolute left-0 top-0 flex h-[24rem] w-[20rem] -translate-x-1/2 -translate-y-1/2 flex-col justify-between rounded-3xl border border-[var(--color-curvature)] bg-white/3 p-8 backdrop-blur-md"
              >
                {/* Grid for Icon and Title */}
                <div className="grid grid-cols-5 items-center">
                  {/* Icon */}
                  <div className="flex justify-center">
                    <Icon size={24} strokeWidth={1.5} className="mb-2" />
                  </div>
                  {/* Title */}
                  <div className="col-span-4">
                    <h3 className="mb-2 items-center leading-none text-3xl font-semibold text-[var(--foreground)]">
                      <span className="relative inline-block">
                        {skill.title}
                        {/* <span className="absolute -left-0.5 -right-1 bottom-0.5 h-2 bg-[var(--color-secondary)] -z-10" /> */}
                      </span>
                    </h3>
                  </div>
                </div>

                <p className="text-lg leading-relaxed text-[var(--foreground)] opacity-70">{skill.content}</p>
              </article>
            );
          })}
        </div>

        <div ref={proxyRef} className="invisible absolute" />
      </div>
    </section>
  );
}
