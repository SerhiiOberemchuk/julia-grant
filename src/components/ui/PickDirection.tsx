"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { setLeadDirection, goToContact } from "@/lib/leadDirection";

type Props = {
  /** Значення, яке буде обране у формі (має збігатися з site.contact.directions) */
  direction: string;
  className?: string;
  children: ReactNode;
};

/**
 * Кнопка «Підходить мені»: запам'ятовує напрям, обирає відповідну радіокнопку
 * у формі й плавно прокручує до неї. Якщо форми на сторінці немає
 * (правові сторінки) — Link виконує звичайний перехід на /#contact.
 */
export function PickDirection({ direction, className, children }: Props) {
  return (
    <Link
      href="/#contact"
      className={className}
      onClick={(e) => {
        setLeadDirection(direction);
        // якщо форма є на цій сторінці — гортаємо самі, інакше лишаємо перехід Link
        if (goToContact()) e.preventDefault();
      }}
    >
      {children}
    </Link>
  );
}
