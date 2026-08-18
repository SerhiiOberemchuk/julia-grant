import { site } from "@/content/site";
import { Clock } from "@/components/ui/Icons";
import s from "./Process.module.css";

export function Process() {
  const p = site.process;
  return (
    <section id="process" className={`section ${s.section}`} aria-labelledby="process-title">
      <div className="container">
        <div className={s.head}>
          <div className="section-head" style={{ marginBottom: 0 }}>
            <p className="label" data-reveal>
              {p.label}
            </p>
            <h2 id="process-title" className="h2" data-reveal>
              {p.title}
            </h2>
            <p className="lead" data-reveal>
              {p.lead}
            </p>
          </div>
        </div>

        <ol className={s.steps}>
          {p.steps.map((st, i) => (
            <li
              key={st.n}
              className={s.step}
              data-reveal
              style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
            >
              <div className={s.stepTop}>
                <span className={s.stepN}>{st.n}</span>
                <span className={s.stepTime}>
                  <Clock width={14} height={14} />
                  {st.time}
                </span>
              </div>
              <h3 className={s.stepTitle}>{st.title}</h3>
              <p className={s.stepText}>{st.text}</p>
              <span className={s.dot} aria-hidden="true" />
            </li>
          ))}
        </ol>

        <p className={`muted ${s.footnote}`}>{p.footnote}</p>
      </div>
    </section>
  );
}
