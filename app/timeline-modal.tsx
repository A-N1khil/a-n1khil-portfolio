"use client";

import { useCallback, useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import gsap from "gsap";
import { useCursor } from "./CursorProvider";
import { useReducedMotion } from "./use-reduced-motion";
import { useDialogAccessibility } from "./use-dialog-accessibility";
import type { TimelineEntry } from "./timeline";

type TimelineModalProps = {
  entry: TimelineEntry;
  origin: DOMRect;
  onClose: () => void;
};

export default function TimelineModal({ entry, origin, onClose }: TimelineModalProps) {
  const { hollowCursor, solidCursor } = useCursor();
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const isClosingRef = useRef(false);
  const reducedMotion = useReducedMotion();

  const closeModal = useCallback((): void => {
    const dialog = dialogRef.current;
    const backdrop = backdropRef.current;
    if (!dialog || !backdrop || isClosingRef.current) return;

    isClosingRef.current = true;
    if (reducedMotion) { onClose(); return; }
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
  }, [onClose, origin, reducedMotion]);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    const backdrop = backdropRef.current;
    if (!dialog || !backdrop) return;

    if (reducedMotion) return;
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
      });
    });

    return (): void => context.revert();
  }, [origin, reducedMotion]);

  useDialogAccessibility(dialogRef, closeModal);

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
        onMouseEnter={hollowCursor}
        onMouseLeave={solidCursor}
        role="dialog"
        aria-modal="true"
        aria-labelledby="timeline-modal-title"
        className="relative max-h-[calc(100dvh-1.5rem)] w-full max-w-2xl overflow-y-auto overscroll-contain rounded-2xl sm:max-h-[calc(100dvh-3rem)] sm:rounded-3xl border border-[var(--color-curvature)] bg-[var(--background)] p-5 text-left break-words shadow-2xl sm:p-8 md:p-10"
      >
        <button
          ref={closeButtonRef}
          type="button"
          aria-label="Close details"
          onClick={closeModal}
          className="absolute right-3 top-3 flex size-11 items-center justify-center rounded-full sm:right-5 sm:top-5 border border-[var(--color-curvature)] p-2 text-zinc-400 transition-colors hover:text-[var(--foreground)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
        >
          <X size={20} />
        </button>

        <p className="pr-12 text-xs uppercase tracking-[0.25em] text-cyan-300">{entry.type}</p>
        <p className="mt-5 pr-10 text-sm text-zinc-500">{entry.dateRange}</p>
        <h2 id="timeline-modal-title" className="mt-3 text-2xl leading-snug font-bold text-[var(--foreground)] sm:text-3xl md:text-4xl">
          {entry.title}
        </h2>
        <p className="mt-2 text-base text-zinc-400">{entry.org}</p>
        <div className="my-5 h-px sm:my-7 bg-[var(--color-curvature)]" />
        <ul className="list-disc space-y-3 pl-5 text-sm leading-6 sm:text-base sm:leading-7 text-zinc-300 marker:text-[var(--color-secondary)]">
          {entry.longDescription.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
      </div>
    </div>,
    document.body,
  );
}
