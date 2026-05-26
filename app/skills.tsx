"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

const skills = [
    {
        title: "Frontend",
        content: "React, Next.js, TypeScript, Tailwind, GSAP.",
    },
    {
        title: "Backend",
        content: "Java, Spring Boot, REST APIs, MongoDB.",
    },
    {
        title: "Machine Learning",
        content: "Python, PyTorch, TensorFlow, model evaluation.",
    },
    {
        title: "Data Systems",
        content: "PySpark, Kafka, streaming pipelines.",
    },
    {
        title: "AI Workflows",
        content: "LLM-assisted development and prompt iteration.",
    },
];

export default function Skills() {
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);
    const proxyRef = useRef<HTMLDivElement | null>(null);

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
                        opacity: abs === 0 ? 1 : abs === 1 ? 0.65 : 0.3,
                        // rotate: abs === 0 ? 0 : diff < 0 ? -5 : 5,
                        zIndex: 20 - abs,
                        duration: 0.45,
                        ease: "power3.out",
                    });
                });
            }

            render();

            Draggable.create(proxy, {
                type: "x",
                trigger: wrapper,
                inertia: true,
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
                <p className="text-5xl font-semibold text-[var(--foreground)]">
                    Skills
                </p>
            </div>

            <div
                ref={wrapperRef}
                className="relative mx-auto h-[32rem] w-full max-w-6xl overflow-hidden"
            >
                <div className="absolute left-1/2 top-1/2">
                    {skills.map((skill, index) => (
                        <article
                            key={skill.title}
                            ref={(el) => {
                                if (el) cardsRef.current[index] = el;
                            }}
                            className="absolute left-0 top-0 flex h-[24rem] w-[18rem] -translate-x-1/2 -translate-y-1/2 flex-col justify-between rounded-3xl border border-[var(--color-curvature)] bg-white/3 p-8 backdrop-blur-md"
                        >
                            <h3 className="mb-6 text-3xl font-semibold text-[var(--foreground)]">
                                {skill.title}
                            </h3>

                            <p className="text-lg leading-relaxed text-[var(--foreground)] opacity-70">
                                {skill.content}
                            </p>
                        </article>
                    ))}
                </div>

                <div ref={proxyRef} className="invisible absolute" />
            </div>
        </section>
    );
}