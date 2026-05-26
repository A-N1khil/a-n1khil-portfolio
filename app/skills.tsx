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
    const trackRef = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const ctx = gsap.context(() => {
            const singleSetWidth = track.scrollWidth / 2;
            const wrapX = gsap.utils.wrap(-singleSetWidth, 0);

            gsap.set(track, { x: 0 });

            Draggable.create(track, {
                type: "x",
                inertia: true,
                cursor: "grab",
                activeCursor: "grabbing",

                onDrag() {
                    gsap.set(track, {
                        x: wrapX(this.x),
                    });
                },

                onThrowUpdate() {
                    gsap.set(track, {
                        x: wrapX(this.x),
                    });
                },
            });
        }, track);

        return () => ctx.revert();
    }, []);

    const duplicatedSkills = [...skills, ...skills];

    return (
        <section id="skills" className="relative w-full overflow-hidden py-24">
            <div className="mb-10 px-8">
                <h2 className="text-5xl font-semibold">Skills</h2>
            </div>

            <div ref={wrapperRef} className="w-full overflow-hidden px-8">
                <div ref={trackRef} className="flex w-max gap-6">
                    {duplicatedSkills.map((skill, index) => (
                        <article
                            key={`${skill.title}-${index}`}
                            className="h-[22rem] w-[28rem] shrink-0 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md"
                        >
                            <h3 className="mb-6 text-3xl font-semibold">
                                {skill.title}
                            </h3>

                            <p className="text-lg leading-relaxed text-white/70">
                                {skill.content}
                            </p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}