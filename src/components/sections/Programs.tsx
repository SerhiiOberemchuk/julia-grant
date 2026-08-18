import { site } from "@/content/site";
import { Check, ArrowRight } from "@/components/ui/Icons";
import { PickDirection } from "@/components/ui/PickDirection";
import s from "./Programs.module.css";

export function Programs() {
  const p = site.programs;
  return (
    <section id="programs" className="section" aria-labelledby="programs-title">
      <div className="container">
        <div className="section-head">
          <p className="label" data-reveal>
            {p.label}
          </p>
          <h2 id="programs-title" className="h2" data-reveal>
            {p.title}
          </h2>
          <p className="lead" data-reveal>
            {p.lead}
          </p>
        </div>

        <div className={s.grid}>
          {p.items.map((it, i) => (
            <article
              key={it.code}
              className={`${s.card} ${i === 1 ? s.cardDark : ""}`}
              data-reveal
              style={{ "--reveal-delay": `${i * 120}ms` } as React.CSSProperties}
            >
              <header className={s.head}>
                <span className={s.code}>{it.code}</span>
                <span className={s.index}>0{i + 1}</span>
              </header>
              <h3 className={`h3 ${s.title}`}>{it.title}</h3>
              <p className={`num ${s.range}`}>{it.range}</p>
              <p className={s.base}>{it.base}</p>
              <p className={s.for}>{it.for}</p>
              <ul className={s.points}>
                {it.points.map((pt) => (
                  <li key={pt}>
                    <span className={s.tick}>
                      <Check width={14} height={14} />
                    </span>
                    {pt}
                  </li>
                ))}
              </ul>
              <PickDirection
                direction={it.formValue}
                className={`btn ${i === 1 ? "btn--light" : "btn--ghost"} ${s.cta}`}
              >
                Підходить мені
                <ArrowRight className="btn__icon btn__icon--arrow" />
              </PickDirection>
              <span className={s.watermark} aria-hidden="true">
                {i === 0 ? "500К" : "2,5М"}
              </span>
            </article>
          ))}
        </div>

        <p className={`muted ${s.note}`} data-reveal>
          {p.note}
        </p>
      </div>
    </section>
  );
}
