import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const ArrowRight = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const ArrowDown = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 5v14M6 13l6 6 6-6" />
  </svg>
);

export const ArrowUpRight = (p: P) => (
  <svg {...base} {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export const Check = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 12.5l4.5 4.5L19 7" />
  </svg>
);

export const Plus = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const Phone = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
  </svg>
);

export const Telegram = (p: P) => (
  <svg {...base} {...p}>
    <path d="M21 4 3 11l6 2 2 6 3-4 5 3z" />
    <path d="M9 13l9-8" />
  </svg>
);

export const Viber = (p: P) => (
  <svg {...base} {...p}>
    <path d="M7 3.5h10a4 4 0 0 1 4 4v7a4 4 0 0 1-4 4h-4l-4 3v-3H7a4 4 0 0 1-4-4v-7a4 4 0 0 1 4-4Z" />
    <path d="M12 7.5c2 0 3.5 1.5 3.5 3.5M12 5c3.5 0 6 2.5 6 6" />
  </svg>
);

export const Instagram = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="3.8" />
    <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);

export const Mail = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);

export const Clock = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);

export const Shield = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const Document = (p: P) => (
  <svg {...base} {...p}>
    <path d="M7 3h7l5 5v13H7z" />
    <path d="M14 3v5h5M10 12h6M10 16h6" />
  </svg>
);

export const Spark = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 3c.6 4.5 3.5 7.4 8 8-4.5.6-7.4 3.5-8 8-.6-4.5-3.5-7.4-8-8 4.5-.6 7.4-3.5 8-8Z" />
  </svg>
);

/** Кругла печатка «ПОГОДЖЕНО» — фірмовий графічний елемент */
export function Stamp({ size = 132, className, text = "ПОГОДЖЕНО · ГРАНТ ОТРИМАНО ·" }: { size?: number; className?: string; text?: string }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 132 132"
      aria-hidden="true"
      style={{ color: "var(--stamp)" }}
    >
      <defs>
        <path id="stamp-circle" d="M66 66 m-46 0 a46 46 0 1 1 92 0 a46 46 0 1 1 -92 0" />
      </defs>
      <circle cx="66" cy="66" r="62" fill="none" stroke="currentColor" strokeWidth="3" />
      <circle cx="66" cy="66" r="55" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
      <text fontFamily="var(--font-mono)" fontSize="10.5" fontWeight="500" letterSpacing="2.4" fill="currentColor">
        <textPath href="#stamp-circle" startOffset="0">
          {text}
        </textPath>
      </text>
      <path d="M50 67l10 10 22-24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
