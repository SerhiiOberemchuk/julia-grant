"use client";

import { useRef } from "react";
import Image from "next/image";
import s from "./CaseShot.module.css";

type Props = {
  src: string;
  alt: string;
  /** Назва проєкту — заголовок лайтбокса */
  title: string;
  /** Напрям · регіон · рік */
  meta: string;
  sum: string;
};

/**
 * Скріншот рішення у реєстрі: мініатюра → збільшене прев’ю при ховері
 * (лише на пристроях з курсором) → повний перегляд у <dialog> на клік/тап.
 * Скріншоти бувають будь-яких пропорцій: мініатюра кадрує верх,
 * прев’ю і лайтбокс показують натуральне співвідношення.
 */
export function CaseShot({ src, alt, title, meta, sum }: Props) {
  const dlgRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button type="button" className={s.thumb} onClick={() => dlgRef.current?.showModal()} aria-label={`Відкрити скріншот рішення: ${title}`}>
        <span className={s.frame}>
          <Image src={src} alt="" fill sizes="48px" className={s.thumbImg} />
        </span>
        <span className={s.zoom} aria-hidden="true">
          +
        </span>

        <span className={s.pop} aria-hidden="true">
          <Image src={src} alt="" width={600} height={900} sizes="300px" className={s.popImg} />
          <span className={s.popHint}>Натиснути — відкрити повністю</span>
        </span>
      </button>

      <dialog
        ref={dlgRef}
        className={s.dlg}
        aria-label={`Скріншот рішення: ${title}`}
        onClick={(e) => {
          if (e.target === dlgRef.current) dlgRef.current.close();
        }}
      >
        <div className={s.dlgInner}>
          <header className={s.dlgHead}>
            <div>
              <p className={s.dlgLabel}>{meta}</p>
              <p className={s.dlgTitle}>
                {title} · <span className="num">{sum}</span>
              </p>
            </div>
            <button type="button" className={s.close} onClick={() => dlgRef.current?.close()} aria-label="Закрити">
              <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M3 3l10 10M13 3L3 13" />
              </svg>
            </button>
          </header>
          <div className={s.dlgBody}>
            <Image src={src} alt={alt} width={800} height={1600} sizes="(max-width: 640px) 94vw, 560px" className={s.dlgImg} />
          </div>
        </div>
      </dialog>
    </>
  );
}
