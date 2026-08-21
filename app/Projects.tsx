"use client";

export const badges = {
  react: "https://shieldcn.dev/badge/React.svg?variant=outline&brand=react",
  nextjs: "https://shieldcn.dev/badge/Next.js.svg?variant=outline&brand=nextdotjs",
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
  googlemaps:
    "https://shieldcn.dev/badge/Google%20Maps-05DF72.svg?variant=outline&font=geist&logo=googlemaps&logoColor=ef4444",
  gsap: "https://shieldcn.dev/badge/GSAP-7BF1A8.svg?variant=outline&logo=gsap",
};

export type TechStack = {
  frontend?: string[];
  backend?: string[];
  database?: string[];
  testing?: string[];
  devops?: string[];
  apis?: string[];
};

export type ProjectEntry = {
  title: string;
  stack: TechStack;
  description: string;
  longDescription: string[];
  githubLink?: string;
  githubServerLink?: string;
};

export default function Projects() {
  const projects: ProjectEntry[] = [
    {
      title: "Scrumsphere",
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
      githubLink: "https://github.com/yourusername/scrumsphere",
      githubServerLink: "https://github.com/yourusername/scrumsphere-server",
    },
    {
      title: "Portfolio Website",
      stack: {
        frontend: ["typescript", "react", "nextjs", "tailwindcss", "gsap"],
      },
      description: "A personal portfolio website to showcase my work and skills.",
      longDescription: [
        "The Portfolio Website is a personal project designed to showcase my work and skills.",
        "Built with Next.js, TypeScript, and TailwindCSS for a modern look and feel.",
        "WebFlow animations are implemented using GSAP for smooth and engaging transitions.",
      ],
    },
    {
      title: "ScheduleCare",
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

  return <></>;
}
