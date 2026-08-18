"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  value: number;
  suffix?: string;
  prefix?: string;
  /** Показувати число «як є», без анімації та розділювачів (роки тощо) */
  raw?: boolean;
  duration?: number;
  className?: string;
};

const fmt = new Intl.NumberFormat("uk-UA");

/** Число, що «набігає» при появі у в'юпорті. Без сторонніх бібліотек. */
export function CountUp({ value, suffix = "", prefix = "", raw, duration = 1400, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(raw ? value : 0);

  useEffect(() => {
    if (raw) return;
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      const id = requestAnimationFrame(() => setN(value));
      return () => cancelAnimationFrame(id);
    }

    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setN(Math.round(value * eased));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration, raw]);

  return (
    <span ref={ref} className={`num ${className ?? ""}`}>
      {prefix}
      {raw ? value : fmt.format(n)}
      {suffix}
    </span>
  );
}
