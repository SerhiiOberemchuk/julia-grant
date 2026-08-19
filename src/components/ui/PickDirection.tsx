"use client";

import type { ReactNode } from "react";
import { setLeadDirection, goToContact } from "@/lib/leadDirection";

type Props = {
  /** Значення, яке буде обране у формі (має збігатися з site.contact.directions) */
  direction: string;
  className?: string;
  children: ReactNode;
};

/**
 * Кнопка «Підходить мені»: запам'ятовує напрям, обирає відповідну
 * радіокнопку у формі й плавно прокручує до неї. Використовується лише
 * на головній, де форма завжди є, тому це звичайний якір — однаковий
 * на сервері й клієнті.
 */
export function PickDirection({ direction, className, children }: Props) {
  return (
    <a
      href="#contact"
      className={className}
      onClick={(e) => {
        setLeadDirection(direction);
        if (goToContact()) e.preventDefault();
      }}
    >
      {children}
    </a>
  );
}
