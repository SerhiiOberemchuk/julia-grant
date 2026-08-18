import { site } from "@/content/site";
import { Stamp } from "@/components/ui/Icons";
import s from "./Cases.module.css";

export function Cases() {
  const c = site.cases;
  return (
    <section id="cases" className={`section ${s.section}`} aria-labelledby="cases-title">
      <div className="container">
        <div className="section-head">
          <p className="label" data-reveal>
            {c.label}
          </p>
          <h2 id="cases-title" className="h2" data-reveal>
            {c.title}
          </h2>
          <p className="lead" data-reveal>
            {c.lead}
          </p>
        </div>
      </div>

      <div className={s.rail}>
        <ul className={`container ${s.list}`}>
          {c.items.map((it, i) => (
            <li
              key={i}
              className={s.card}
              data-reveal
              style={{ "--reveal-delay": `${(i % 3) * 100}ms`, "--tilt": `${(i % 2 ? 1 : -1) * 0.8}deg` } as React.CSSProperties}
            >
              {/* «Документ»: місце під скріншот рішення. Поки — стилізований лист */}
              <div className={s.doc} aria-hidden="true">
                <div className={s.docHead}>
                  <span />
                  <span />
                </div>
                <div className={s.docLines}>
                  {Array.from({ length: 7 }).map((_, k) => (
                    <i key={k} style={{ width: `${88 - ((k * 23) % 40)}%` }} />
                  ))}
                </div>
                <Stamp className={s.stamp} size={96} />
              </div>
              <div className={s.meta}>
                <span className={s.direction}>{it.direction}</span>
                <p className={`num ${s.sum}`}>{it.sum}</p>
                <p className={s.niche}>{it.niche}</p>
                <p className={s.region}>
                  {it.region} · {it.year}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <p className={`container muted ${s.hint}`}>← гортайте →</p>
    </section>
  );
}
