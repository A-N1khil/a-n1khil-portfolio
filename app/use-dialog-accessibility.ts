"use client";

import { useEffect, type RefObject } from "react";

export function useDialogAccessibility(dialogRef: RefObject<HTMLDivElement | null>, onClose: () => void) {
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    const background = Array.from(document.body.children)
      .filter((element): element is HTMLElement => element instanceof HTMLElement && !element.contains(dialog))
      .map((element) => ({ element, inert: element.inert }));
    background.forEach(({ element }) => { element.inert = true; });
    document.body.style.overflow = "hidden";
    const focusable = () => Array.from(dialog.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex="0"]'));
    focusable()[0]?.focus({ preventScroll: true });
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
      if (event.key !== "Tab") return;
      const elements = focusable();
      const first = elements[0];
      const last = elements.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      background.forEach(({ element, inert }) => { element.inert = inert; });
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, [dialogRef, onClose]);
}
