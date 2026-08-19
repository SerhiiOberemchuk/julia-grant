"use client";

import { useEffect } from "react";

/**
 * Один глобальний IntersectionObserver для всіх елементів з атрибутом
 * [data-reveal]. Контент за замовчуванням видимий; клас reveal-ready на
 * <html> вмикає приховування (див. globals.css), тому без JS чи до його
 * ініціалізації сторінка повна. Перед увімкненням класу все, що вже у
 * в'юпорті, позначається як показане — жодного блимання.
 * Ставиться атрибут data-revealed, а не клас: className керує React
 * і при ре-рендері перетирав би доданий клас.
 */
export function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    const nodes = () => Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      nodes().forEach((n) => n.setAttribute("data-revealed", ""));
      return;
    }

    // те, що вже на екрані, показуємо одразу — і лише потім вмикаємо приховування
    const vh = window.innerHeight;
    nodes().forEach((n) => {
      const r = n.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) n.setAttribute("data-revealed", "");
    });
    root.classList.add("reveal-ready");

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).setAttribute("data-revealed", "");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.08 },
    );

    const observeAll = () => nodes().forEach((n) => !n.hasAttribute("data-revealed") && io.observe(n));
    observeAll();

    // підхоплюємо вузли, які React домальовує пізніше
    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      root.classList.remove("reveal-ready");
    };
  }, []);

  return null;
}
