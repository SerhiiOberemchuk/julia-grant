import Image from "next/image";
import { site } from "@/content/site";
import { Shield, Document, ArrowRight } from "@/components/ui/Icons";
import s from "./About.module.css";

export function About() {
  const a = site.about;
  return (
    <section id="about" className={`section ${s.section}`} aria-labelledby="about-title">
      <div className={`container ${s.grid}`}>
        <div className={s.visual} data-reveal="left">
          <figure className={s.photo}>
            <Image
              src="/images/julia-placeholder.svg"
              alt={a.photoAlt}
              width={900}
              height={1125}
              unoptimized
              sizes="(min-width: 1024px) 460px, 90vw"
            />
          </figure>
          <div className={s.badge}>
            <Shield width={18} height={18} />
            <span>Працюю офіційно за договором</span>
          </div>
          <div className={`${s.badge} ${s.badgeB}`}>
            <Document width={18} height={18} />
            <span>Фінансова освіта</span>
          </div>
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
                <dt className={s.factLabel}>{f.label}</dt>
                <dd className={`num ${s.factValue}`}>{f.value}</dd>
              </div>
            ))}
          </dl>

          <div className={s.foot} data-reveal>
            <a href="#contact" className="btn btn--primary">
              Поговорити зі мною
              <ArrowRight className="btn__icon btn__icon--arrow" />
            </a>
            <span className={s.signature} aria-hidden="true">
              {a.signature}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
