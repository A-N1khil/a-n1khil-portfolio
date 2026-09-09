"use client";

import { useState } from "react";
import { useCursor } from "./CursorProvider";
import { BookOpenText } from "lucide-react";
import ProjectModal from "./project-modal";

export const badges = {
  react: "https://shieldcn.dev/badge/React.svg?variant=outline&brand=react",
  nextjs: "https://shieldcn.dev/badge/Next.js.svg?brand=nextdotjs&mode=light",
  tailwindcss: "https://shieldcn.dev/badge/Tailwind%20CSS.svg?variant=outline&brand=tailwindcss",
  typescript: "https://shieldcn.dev/badge/TypeScript.svg?variant=outline&brand=typescript",
  springboot: "https://shieldcn.dev/badge/Spring%20Boot.svg?variant=outline&brand=springboot",
  mongodb: "https://shieldcn.dev/badge/MongoDB.svg?variant=outline&brand=mongodb",
  jest: "https://shieldcn.dev/badge/Jest.svg?variant=outline&brand=jest",
  shadcn:
    "https://shieldcn.dev/badge/built%20with-shadcnblocks-000000.svg?logo=shadcnblocks&logoColor=fff&variant=outline&brand=shadcnblocks&color=%23fff&labelTextColor=shadcn&label=+",
  maven: "https://shieldcn.dev/badge/Maven.svg?variant=outline&brand=apachemaven",
  java: "https://shieldcn.dev/badge/Java-ED8B00.svg?logo=ri%3AFaJava&logoColor=fff&variant=outline",
  fastapi: "https://shieldcn.dev/badge/FastAPI.svg?variant=outline&brand=fastapi",
  python: "https://shieldcn.dev/badge/Python.svg?variant=outline&brand=python",
  googlemaps:
    "https://shieldcn.dev/badge/Google%20Maps-05DF72.svg?variant=outline&font=geist&logo=googlemaps&logoColor=ef4444",
  gsap: "https://shieldcn.dev/badge/GSAP-7BF1A8.svg?variant=outline&logo=gsap",
};

export type TechStack = {
  frontend?: BadgeName[];
  backend?: BadgeName[];
  database?: BadgeName[];
  testing?: BadgeName[];
  devops?: BadgeName[];
  apis?: BadgeName[];
};

type BadgeName = keyof typeof badges;

export type ProjectEntry = {
  title: string;
  stack: TechStack;
  description: string;
  longDescription: string[];
  githubLink?: string;
  githubServerLink?: string;
  liveDemoLink?: string;
};

export default function Projects() {
  const { hollowCursor, solidCursor } = useCursor();
  const [expandedProject, setExpandedProject] = useState<{ project: ProjectEntry; origin: DOMRect } | null>(null);

  const projects: ProjectEntry[] = [
    {
      title: "ApplyFlow",
      githubLink: "https://github.com/A-N1khil/applyflow",
      stack: {
        frontend: ["typescript", "react", "nextjs", "tailwindcss"],
        backend: ["fastapi", "python"],
      },
      description: "A job application tracker for organizing opportunities and following application progress.",
      longDescription: [
        "ApplyFlow brings job applications, company information, notes, and application activity into one place.",
        "The frontend uses Next.js, React, TypeScript, and Tailwind CSS, with dashboard and application-detail views.",
        "The Python backend uses FastAPI and SQLAlchemy, with separate services for applications, companies, notes, and activity.",
      ],
    },
    {
      title: "Scrumsphere",
      githubLink: "https://github.com/A-N1khil/scrumsphere",
      githubServerLink: "https://github.com/A-N1khil/scrumsphere-server",
      stack: {
        frontend: ["typescript", "react", "shadcn", "nextjs", "tailwindcss"],
        backend: ["springboot", "java", "maven"],
        database: ["mongodb"],
        testing: ["jest"],
        apis: ["googlemaps"],
      },
      description: "A web application for managing agile software development projects.",
      longDescription: [
        "Scrumsphere is a web application designed to help teams manage their agile software development projects.",
        "It provides a user-friendly interface for creating and managing tasks, and backlogs.",
        "The application is built with Next.js, TypeScript, and TailwindCSS for a modern look and feel.",
        "The backend is powered by Spring Boot and MongoDB, providing a robust and scalable solution for managing project data.",
        "API endpoint security is implemented using JWT authentication, ensuring that only authorized users can access sensitive data.",
      ],
    },
    {
      title: "Portfolio Website",
      githubLink: "https://github.com/A-N1khil/a-n1khil-portfolio",
      liveDemoLink: "https://a-nikhil.vercel.app",
      stack: {
        frontend: ["typescript", "react", "nextjs", "tailwindcss", "gsap"],
      },
      description: "A personal portfolio website to showcase my work and skills.",
      longDescription: [
        "The Portfolio Website is a personal project designed to showcase my work and skills.",
        "Built with Next.js, TypeScript, and TailwindCSS for a modern look and feel.",
        "Animations are implemented using GSAP for smooth and engaging transitions.",
      ],
    },
    {
      title: "ScheduleCare",
      githubLink: "https://github.com/A-N1khil/520-SchedulCare",
      stack: {
        frontend: ["typescript", "react", "nextjs", "tailwindcss"],
        backend: ["fastapi", "python"],
        database: ["mongodb"],
        apis: ["googlemaps"],
      },
      description: "A web application for managing healthcare appointments and schedules.",
      longDescription: [
        "ScheduleCare is a web application designed to help users manage their healthcare appointments and schedules.",
        "The frontend is built with Next.js, TypeScript, and TailwindCSS for a modern look and feel.",
        "The backend is powered by FastAPI and Python, providing a robust and scalable solution for managing user data.",
        "The application uses MongoDB as its database to store and retrieve user information.",
        "APIs from Google Maps are utilized to provide location-based services and enhance the user experience.",
        "PyOTP is used for implementing two-factor authentication, ensuring that user accounts are secure and protected.",
      ],
    },
  ];

  return (
    <section id="projects" className="px-5 pb-16 pt-20 sm:px-8 sm:pb-20 sm:pt-24 md:px-16 lg:px-12 lg:pb-32 lg:pt-40">
      <div className="mx-auto max-w-6xl">
        <h2
          onMouseEnter={hollowCursor}
          onMouseLeave={solidCursor}
          className="text-center text-3xl font-bold text-[var(--foreground)] [font-family:var(--font-arvo)] sm:text-4xl lg:text-5xl"
        >
          Projects
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:mt-10 sm:gap-6 md:auto-rows-fr md:grid-cols-2 lg:mt-16">
          {projects.map((project) => {
            const projectBadges = Object.values(project.stack).flat();

            return (
              <button
                onMouseEnter={hollowCursor}
                onMouseLeave={solidCursor}
                type="button"
                aria-haspopup="dialog"
                key={project.title}
                onClick={(event) => {
                  setExpandedProject({
                    project,
                    origin: event.currentTarget.getBoundingClientRect(),
                  });
                }}
                className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-[var(--color-curvature)] bg-white/3 p-5 text-left break-words shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-secondary)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-primary)] sm:p-6 xl:p-8 [font-family:var(--font-geist-sans)]"
              >
                <div className="flex h-full flex-col transition-all duration-300 ease-out group-hover:blur-[2px] group-hover:opacity-50">
                  <h3 className="text-xl leading-snug sm:text-2xl font-bold text-[var(--foreground)] [font-family:var(--font-arvo)]">
                    {project.title}
                  </h3>
                  <p className="mt-4 flex-1 text-sm leading-6 sm:text-base sm:leading-7 text-zinc-300">
                    {project.description}
                  </p>

                  <span className="mt-4 text-sm text-[var(--color-secondary)]">View details →</span>
                  <div className="mt-6 flex flex-wrap gap-2" aria-label={`${project.title} technologies`}>
                    {projectBadges.map((badge) => (
                      // These compact shields are supplied by the badge service defined above.
                      // eslint-disable-next-line @next/next/no-img-element
                      <img key={badge} src={badges[badge]} alt={badge} className="h-6 max-w-full object-contain" />
                    ))}
                  </div>
                </div>

                <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100">
                  <BookOpenText
                    size={40}
                    strokeWidth={1.75}
                    className="scale-75 text-[var(--foreground)] transition-transform duration-300 ease-out group-hover:scale-100"
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {expandedProject && (
        <ProjectModal
          project={expandedProject.project}
          origin={expandedProject.origin}
          onClose={() => setExpandedProject(null)}
        />
      )}
    </section>
  );
}
