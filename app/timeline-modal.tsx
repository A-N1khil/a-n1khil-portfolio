"use client";

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import gsap from "gsap";
import type { TimelineEntry } from "./timeline";

type TimelineModalProps = {
  entry: TimelineEntry;
  origin: DOMRect;
  onClose: () => void;
};

export default function TimelineModal({ entry, origin, onClose }: TimelineModalProps) {
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const isClosingRef = useRef(false);

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-6 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeModal();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="timeline-modal-title"
        className="relative w-full max-w-2xl rounded-3xl border border-[var(--color-curvature)] bg-[var(--background)] p-8 text-left shadow-2xl md:p-10"
      >
        <button
          ref={closeButtonRef}
          type="button"
          aria-label="Close details"
          onClick={closeModal}
          className="absolute right-5 top-5 rounded-full border border-[var(--color-curvature)] p-2 text-zinc-400 transition-colors hover:text-[var(--foreground)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
        >
          <X size={20} />
        </button>

        <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">{entry.type}</p>
        <p className="mt-5 text-sm text-zinc-500">{entry.dateRange}</p>
        <h2 id="timeline-modal-title" className="mt-3 pr-12 text-3xl font-bold text-[var(--foreground)] md:text-4xl">
          {entry.title}
        </h2>
        <p className="mt-2 text-base text-zinc-400">{entry.org}</p>
        <div className="my-7 h-px bg-[var(--color-curvature)]" />
        <p className="text-base leading-7 text-zinc-300">{entry.description}</p>
      </div>
    </div>,
    document.body,
  );
}
