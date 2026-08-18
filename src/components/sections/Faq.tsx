"use client";

import { useId, useState } from "react";
import { site } from "@/content/site";
import { Plus } from "@/components/ui/Icons";
import s from "./Faq.module.css";

/** Акордеон без бібліотек: плавна анімація висоти через grid-template-rows */
export function Faq() {
  const f = site.faq;
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();

  return (
    <section id="faq" className="section" aria-labelledby="faq-title">
      <div className={`container ${s.grid}`}>
        <div className={s.head}>
          <p className="label" data-reveal>
            {f.label}
          </p>
          <h2 id="faq-title" className="h2" data-reveal>
            {f.title}
          </h2>
          <p className={`muted ${s.hint}`} data-reveal>
            Не знайшли відповіді? Напишіть — відповім особисто.
          </p>
        </div>

        <ul className={s.list}>
          {f.items.map((it, i) => {
            const isOpen = open === i;
            const btnId = `${uid}-q-${i}`;
            const panelId = `${uid}-a-${i}`;
            return (
              <li
                key={i}
                className={`${s.item} ${isOpen ? s.itemOpen : ""}`}
                data-reveal
                style={{ "--reveal-delay": `${(i % 4) * 60}ms` } as React.CSSProperties}
              >
                <h3 className={s.q}>
                  <button
                    id={btnId}
                    type="button"
                    className={s.btn}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className={s.qN}>{String(i + 1).padStart(2, "0")}</span>
                    <span className={s.qText}>{it.q}</span>
                    <span className={s.icon} aria-hidden="true">
                      <Plus width={18} height={18} />
                    </span>
                  </button>
                </h3>
                <div id={panelId} role="region" aria-labelledby={btnId} className={s.panel}>
                  <div className={s.panelInner}>
                    <p className={s.a}>{it.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
