# Nikhil Anand — Developer Portfolio

A personal portfolio presenting my full-stack engineering experience, selected projects, and education through an interactive web experience.

**[Explore the live portfolio](https://a-nikhil.vercel.app)** · [GitHub](https://github.com/A-N1khil) · [Email me](mailto:nikhilanand1006@gmail.com)

Hosted on **Vercel** at **[a-nikhil.vercel.app](https://a-nikhil.vercel.app)**.

## About me

I'm a full-stack software developer with over three years of professional experience and a Master of Science in Computer Science from the University of Massachusetts Amherst. My work spans Java and Spring Boot services, REST APIs, Angular and React interfaces, and production application modernization.

At BlackRock, I delivered 30+ applications and features across 8+ internal teams, helped achieve 20–40% performance improvements, and improved SonarQube maintainability from C to A. My experience also includes leading five contract engineers, mentoring 12 engineers, and owning features from design through production support.

I'm interested in full-stack and software engineering opportunities where I can combine backend engineering with thoughtful user experiences. **[Get in touch](mailto:nikhilanand1006@gmail.com)** to discuss a role or project.

## Explore my work

The portfolio brings together work experience, education, technical skills, and project details so you can quickly explore both my background and how I build.

| Featured project | Focus | Technologies |
| --- | --- | --- |
| Scrumsphere | Agile project management, tasks, backlogs, and JWT-secured APIs | Next.js, TypeScript, Spring Boot, Java, MongoDB |
| ScheduleCare | Healthcare appointment scheduling, location services, and two-factor authentication | Next.js, TypeScript, FastAPI, Python, MongoDB |
| Portfolio Website | Custom interaction design, scroll-driven animation, and responsive presentation | Next.js, React, TypeScript, Tailwind CSS, GSAP |

This repository contains the portfolio website; the other projects are showcased within it.

## What this website demonstrates

- **Custom interaction design:** an animated hero, Lottie details, a draggable skills card presentation, and a shared MouseFollower cursor with contextual hover states.
- **Progressive detail:** project and timeline cards open animated dialogs with deeper descriptions; dialogs support Escape-to-close and move focus to the close button.
- **Responsive presentation:** layouts adapt across screen sizes, with dedicated experience and education timelines and a desktop contact rail.
- **Navigation tied to content:** a section navigator tracks the current section and provides shortcuts through the page.
- **Component-oriented engineering:** focused React components, typed project and timeline data, and component-scoped GSAP animation cleanup.
- **Build automation:** GitHub Actions checks the production build for pull requests targeting `develop` and `deployment/*`.

## Technology

| Area | Stack |
| --- | --- |
| Application | Next.js 16 App Router, React 19, TypeScript |
| Styling | Tailwind CSS 4, Sass/SCSS, CSS theme variables |
| Motion | GSAP, ScrollTrigger, Draggable, MouseFollower, Lottie |
| Icons | Lucide React |
| Tooling | pnpm, ESLint, GitHub Actions |
| Hosting | Vercel |

## Run locally

Use Node.js 22 and pnpm 10.27.0 to match the build workflow.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Open [localhost:3000](http://localhost:3000).

```bash
pnpm lint   # Run ESLint
pnpm build  # Create a production build, including TypeScript checks
pnpm start  # Serve the production build
```

## Build checks and releases

[PR Build](.github/workflows/pr-build.yml) installs dependencies from the lockfile and runs `pnpm build` when a matching pull request is opened, updated with commits, reopened, or edited. It caches the pnpm store and cancels superseded runs for the same PR.

See [CHANGELOG.md](CHANGELOG.md) for **v1.0**, the initial portfolio, and **v1.1**, the GitHub Actions build workflow.
