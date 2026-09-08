"use client";

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, X } from "lucide-react";
import gsap from "gsap";
import { badges, type ProjectEntry } from "./Projects";

type ProjectModalProps = {
  project: ProjectEntry;
  origin: DOMRect;
  onClose: () => void;
};

export default function ProjectModal({ project, origin, onClose }: ProjectModalProps) {
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const isClosingRef = useRef(false);
  const projectBadges = Object.values(project.stack).flat();
  const projectLinks = [
    { label: "Source Code", href: project.githubLink },
    { label: "Backend Source", href: project.githubServerLink },
    { label: "Live Demo", href: project.liveDemoLink },
  ].filter((link) => link.href);

  const closeModal = useCallback((): void => {
    const dialog = dialogRef.current;
    const backdrop = backdropRef.current;
    if (!dialog || !backdrop || isClosingRef.current) return;

    isClosingRef.current = true;
    const dialogBounds = dialog.getBoundingClientRect();

    gsap
      .timeline({ onComplete: onClose })
      .to(backdrop, { opacity: 0, duration: 0.25, ease: "power2.in" }, 0)
      .to(
        dialog,
        {
          x: origin.left - dialogBounds.left,
          y: origin.top - dialogBounds.top,
          scaleX: origin.width / dialogBounds.width,
          scaleY: origin.height / dialogBounds.height,
          opacity: 0,
          duration: 0.35,
          ease: "power3.in",
        },
        0,
      );
  }, [onClose, origin]);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    const backdrop = backdropRef.current;
    if (!dialog || !backdrop) return;

    const dialogBounds = dialog.getBoundingClientRect();
    const context = gsap.context(() => {
      gsap.set(backdrop, { opacity: 0 });
      gsap.set(dialog, {
        x: origin.left - dialogBounds.left,
        y: origin.top - dialogBounds.top,
        scaleX: origin.width / dialogBounds.width,
        scaleY: origin.height / dialogBounds.height,
        opacity: 0.6,
        transformOrigin: "top left",
      });

      gsap.to(backdrop, { opacity: 1, duration: 0.3, ease: "power2.out" });
      gsap.to(dialog, {
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
        onComplete: () => closeButtonRef.current?.focus(),
      });
    });

    return (): void => context.revert();
  }, [origin]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", handleKeyDown);
    return (): void => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal]);

  return createPortal(
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-3 backdrop-blur-sm sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeModal();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="relative max-h-[calc(100dvh-1.5rem)] w-full max-w-2xl overflow-y-auto overscroll-contain rounded-2xl sm:max-h-[calc(100dvh-3rem)] sm:rounded-3xl border border-[var(--color-curvature)] bg-[var(--background)] p-5 text-left break-words shadow-2xl sm:p-8 md:p-10"
      >
        <button
          ref={closeButtonRef}
          type="button"
          aria-label="Close project details"
          onClick={closeModal}
          className="absolute right-3 top-3 flex size-11 items-center justify-center rounded-full sm:right-5 sm:top-5 border border-[var(--color-curvature)] p-2 text-zinc-400 transition-colors hover:text-[var(--foreground)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
        >
          <X size={20} />
        </button>

        <h2
          id="project-modal-title"
          className="pr-12 text-2xl leading-snug sm:text-3xl font-bold text-[var(--foreground)] [font-family:var(--font-arvo)] md:text-4xl"
        >
          {project.title}
        </h2>

        <div className="my-5 h-px sm:my-7 bg-[var(--color-curvature)]" />

        <div className="min-w-0">
          <ul className="list-disc space-y-3 pl-5 text-sm leading-6 sm:text-base sm:leading-7 text-zinc-300 marker:text-[var(--color-secondary)]">
            {project.longDescription.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        </div>

        {projectLinks.length > 0 && (
          <nav aria-label={`${project.title} links`} className="mt-6 flex flex-wrap gap-3">
            {projectLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-[var(--color-curvature)] px-4 py-2 text-sm text-[var(--foreground)] transition-colors hover:border-[var(--color-secondary)] hover:text-[var(--color-secondary)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-primary)]"
              >
                {label}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            ))}
          </nav>
        )}

        <div className="mt-6 flex flex-wrap gap-2 border-t border-[var(--color-curvature)] pt-4 sm:mt-8 sm:pt-6" aria-label={`${project.title} technologies`}>
          {projectBadges.map((badge) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={badge} src={badges[badge]} alt={badge} className="h-6 max-w-full object-contain" />
          ))}
        </div>
      </div>
    </div>,
    document.body,
  );
}
