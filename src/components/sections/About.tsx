import Image from "next/image";
import { site } from "@/content/site";
import { ArrowRight } from "@/components/ui/Icons";
import s from "./About.module.css";

export function About() {
  const a = site.about;
  return (
    <section id="about" className={`section ${s.section}`} aria-labelledby="about-title">
      <div className={`container ${s.grid}`}>
        <div className={s.visual} data-reveal="left">
          <figure className={s.photo}>
            <Image
              src="/images/julia.jpg"
              alt={a.photoAlt}
              width={1000}
              height={1250}
              className={s.photoImg}
              sizes="(min-width: 1024px) 34vw, (min-width: 768px) 440px, 92vw"
            />
          </figure>

          {/* Реквізити експерта — суха «карта фахівця» замість плаваючих бейджів */}
          <dl className={s.credentials}>
            {a.credentials.map((c) => (
              <div key={c.k} className={s.credential}>
                <dt>{c.k}</dt>
                <dd>{c.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className={s.copy}>
          <p className="label" data-reveal>
            {a.label}
          </p>
          <h2 id="about-title" className="h2" data-reveal>
            {a.title}
          </h2>

          <div className={s.paras}>
            {a.paragraphs.map((t, i) => (
              <p key={i} className={s.para} data-reveal style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}>
                {t}
              </p>
            ))}
          </div>

          <dl className={s.facts} data-reveal>
            {a.facts.map((f) => (
              <div key={f.label} className={s.fact}>
                <dd className={`num ${s.factValue}`}>{f.value}</dd>
                <dt className={s.factLabel}>{f.label}</dt>
              </div>
            ))}
          </dl>

          <div className={s.foot} data-reveal>
            <a href="#contact" className="btn btn--primary">
              Поговорити зі мною
              <ArrowRight className="btn__icon btn__icon--arrow" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
