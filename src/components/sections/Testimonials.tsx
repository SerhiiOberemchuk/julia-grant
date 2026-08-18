import { site } from "@/content/site";
import s from "./Testimonials.module.css";

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
              style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties}
            >
              <span className={s.quote} aria-hidden="true">
                “
              </span>
              <blockquote className={s.text}>{it.text}</blockquote>
              <footer className={s.foot}>
                <span className={s.avatar} aria-hidden="true">
                  {it.name.slice(0, 1)}
                </span>
                <div className={s.who}>
                  <b>{it.name}</b>
                  <span>{it.role}</span>
                </div>
                <span className={`num ${s.sum}`}>{it.sum}</span>
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
