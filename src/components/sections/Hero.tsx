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
          <p className={`label ${s.kicker}`} data-reveal>
            {h.kicker}
          </p>

          <h1 id="hero-title" className={`display ${s.title}`} data-reveal style={{ "--reveal-delay": "80ms" } as React.CSSProperties}>
            {h.titleA} <span className="marker">{h.titleAmount}</span> {h.titleB}
          </h1>

          <p className={s.subtitle} data-reveal style={{ "--reveal-delay": "140ms" } as React.CSSProperties}>
            {h.titleC}
          </p>

          <p className={`lead ${s.lead}`} data-reveal style={{ "--reveal-delay": "200ms" } as React.CSSProperties}>
            {h.lead}
          </p>

          <div className={s.ctas} data-reveal style={{ "--reveal-delay": "260ms" } as React.CSSProperties}>
            <a href="#contact" className="btn btn--primary btn--lg">
              {h.ctaPrimary}
              <ArrowRight className="btn__icon btn__icon--arrow" />
            </a>
            <a href="#calculator" className="btn btn--ghost btn--lg">
              {h.ctaSecondary}
              <ArrowDown className="btn__icon" />
            </a>
          </div>

          <ul className={s.facts} data-reveal style={{ "--reveal-delay": "340ms" } as React.CSSProperties}>
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

        <figure className={s.visual} data-reveal="scale" style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
          <div className={s.photoCard}>
            <Image
              src="/images/julia.jpg"
              alt={h.photoAlt}
              width={1000}
              height={1250}
              priority
              quality={88}
              className={s.photo}
              sizes="(min-width: 1024px) 480px, 90vw"
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
