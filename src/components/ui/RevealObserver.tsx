"use client";

import { useEffect } from "react";

/**
 * Один глобальний IntersectionObserver для всіх елементів з атрибутом
 * [data-reveal]. Додає клас .is-visible при появі у в'юпорті.
 * Підтримує динамічно додані вузли через MutationObserver.
 */
export function RevealObserver() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = () => Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (reduce || !("IntersectionObserver" in window)) {
      nodes().forEach((n) => n.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    const observeAll = () => nodes().forEach((n) => !n.classList.contains("is-visible") && io.observe(n));
    observeAll();

    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
