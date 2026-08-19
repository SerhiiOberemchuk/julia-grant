import Image from "next/image";
import { site } from "@/content/site";
import { CountUp } from "@/components/ui/CountUp";
import { ArrowDown, ArrowRight } from "@/components/ui/Icons";
import s from "./Hero.module.css";

export function Hero() {
  const h = site.hero;
  return (
    <section id="top" className={s.hero} aria-labelledby="hero-title">
      <div className={`container ${s.inner}`}>
        <div className={s.copy}>
          <p className={`label ${s.kicker} ${s.in}`} style={{ "--i": 0 } as React.CSSProperties}>
            {h.kicker}
          </p>

          <h1 id="hero-title" className={`display ${s.title} ${s.in}`} style={{ "--i": 1 } as React.CSSProperties}>
            {h.titleA} <span className="marker">{h.titleAmount}</span> {h.titleB}
          </h1>

          <p className={`${s.subtitle} ${s.in}`} style={{ "--i": 2 } as React.CSSProperties}>
            {h.titleC}
          </p>

          <p className={`lead ${s.lead} ${s.in}`} style={{ "--i": 3 } as React.CSSProperties}>
            {h.lead}
          </p>

          <div className={`${s.ctas} ${s.in}`} style={{ "--i": 4 } as React.CSSProperties}>
            <a href="#contact" className="btn btn--primary btn--lg">
              {h.ctaPrimary}
              <ArrowRight className="btn__icon btn__icon--arrow" />
            </a>
            <a href="#calculator" className="btn btn--ghost btn--lg">
              {h.ctaSecondary}
              <ArrowDown className="btn__icon" />
            </a>
          </div>

          <ul className={`${s.facts} ${s.in}`} style={{ "--i": 5 } as React.CSSProperties}>
            {h.facts.map((f) => (
              <li key={f.label} className={s.fact}>
                <span className={s.factValue}>
                  <CountUp value={f.value} suffix={f.suffix} raw={"raw" in f && f.raw} />
                </span>
                <span className={s.factLabel}>{f.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <figure className={`${s.visual} ${s.inVisual}`}>
          <div className={s.photoCard}>
            <Image
              src="/images/julia.jpg"
              alt={h.photoAlt}
              width={1000}
              height={1250}
              priority
              quality={88}
              className={s.photo}
              sizes="(min-width: 1024px) 40vw, (min-width: 768px) 520px, 92vw"
            />
            {/* статичний редакційний підпис — замість плаваючих бейджів */}
            <figcaption className={s.caption}>
              <span className={s.captionName}>{h.photoCaption.name}</span>
              <span className={s.captionRole}>{h.photoCaption.role}</span>
              <span className={s.captionNote}>{h.photoCaption.note}</span>
            </figcaption>
          </div>
        </figure>
      </div>
    </section>
  );
}
