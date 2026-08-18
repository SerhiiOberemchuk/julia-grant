import { site } from "@/content/site";
import s from "./Services.module.css";

export function Services() {
  const v = site.services;
  return (
    <section id="services" className="section" aria-labelledby="services-title">
      <div className="container">
        <div className="section-head">
          <p className="label" data-reveal>
            {v.label}
          </p>
          <h2 id="services-title" className="h2" data-reveal>
            {v.title}
          </h2>
          <p className="lead" data-reveal>
            {v.lead}
          </p>
        </div>

        <ol className={s.list}>
          {v.items.map((it, i) => (
            <li
              key={it.n}
              className={s.item}
              data-reveal
              style={{ "--reveal-delay": `${(i % 3) * 90}ms` } as React.CSSProperties}
            >
              <span className={s.n}>{it.n}</span>
              <div className={s.body}>
                <h3 className={s.title}>{it.title}</h3>
                <p className={s.text}>{it.text}</p>
              </div>
              <span className={s.leader} aria-hidden="true" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
