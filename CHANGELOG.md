# Changelog

Notable changes to Nikhil Anand's portfolio website, grouped by release.

## v1.1

### Added

- GitHub Actions `PR Build` workflow for pull requests targeting `develop` or `deployment/*` branches.
- Automatic build checks when pull requests are opened, updated with commits, reopened, or edited.
- Node.js 22 and pnpm 10.27.0 setup, pnpm dependency caching, and reproducible installs with `pnpm install --frozen-lockfile`.
- Production validation through `pnpm build`, with read-only repository permissions, a 15-minute job timeout, and cancellation of superseded runs.

## v1.0

### Added

- Initial personal portfolio built with Next.js App Router, React, and TypeScript.
- Dark visual theme using Tailwind CSS, SCSS, custom typography, and purple/pink accents.
- Animated hero and introductory content, with reserved space for revealed content and Lottie animation.
- About section covering professional background, technical interests, and career direction.
- Global MouseFollower cursor with shared solid and hollow hover behavior.
- Draggable skills cards covering languages, frontend, backend, databases, tools, and cloud technologies, with scroll-triggered entrance animations.
- Dedicated work experience and education timelines with scroll-driven animation and expandable detail dialogs.
- Project cards for Scrumsphere, ScheduleCare, and the portfolio, with technology badges and animated detail dialogs.
- Dialog close controls, Escape-key dismissal, and initial focus on the close button.
- Section navigation with active-section tracking, desktop social/contact rail, and email contact section.
- Responsive layouts and component-scoped GSAP animation setup and cleanup.
- Portfolio hosting on Vercel at [a-nikhil.vercel.app](https://a-nikhil.vercel.app).
