import Image from "next/image";
import { site } from "@/content/site";
import { ArrowUpRight } from "@/components/ui/Icons";
import s from "./Testimonials.module.css";

/**
 * Відгуки: цитата на першому плані, атрибуція текстом.
 * Без вигаданих аватарів. Якщо у даних є photo/link — показуємо їх.
 */
export function Testimonials() {
  const t = site.testimonials;
  return (
    <section id="testimonials" className="section" aria-labelledby="testimonials-title">
      <div className="container">
        <div className="section-head">
          <p className="label" data-reveal>
            {t.label}
          </p>
          <h2 id="testimonials-title" className="h2" data-reveal>
            {t.title}
          </h2>
        </div>

        <ul className={s.grid}>
          {t.items.map((it, i) => (
            <li
              key={it.name + i}
              className={s.card}
              data-reveal
              style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
            >
              <blockquote className={s.quote}>
                <p className={s.text}>{it.text}</p>
                <footer className={s.foot}>
                  {it.photo ? (
                    <Image src={it.photo} alt="" width={44} height={44} className={s.photo} />
                  ) : null}
                  <div className={s.who}>
                    <cite className={s.name}>{it.name}</cite>
                    <span className={s.role}>{it.role}</span>
                  </div>
                  <span className={`${s.sum} num`}>грант {it.sum}</span>
                </footer>
              </blockquote>
              {it.link ? (
                <a href={it.link} target="_blank" rel="noopener noreferrer" className={s.source}>
                  Джерело відгуку <ArrowUpRight width={14} height={14} />
                </a>
              ) : null}
            </li>
          ))}
        </ul>

        <p className={`${s.note} muted`}>{t.note}</p>
      </div>
    </section>
  );
}
