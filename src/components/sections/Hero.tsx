import Image from "next/image";
import { site } from "@/content/site";
import { CountUp } from "@/components/ui/CountUp";
import { Stamp, ArrowDown, ArrowRight, Check } from "@/components/ui/Icons";
import s from "./Hero.module.css";

export function Hero() {
  const h = site.hero;
  return (
    <section id="top" className={s.hero} aria-labelledby="hero-title">
      <div className={s.grid} aria-hidden="true" />
      <div className={`container ${s.inner}`}>
        <div className={s.copy}>
          <p className={`label ${s.kicker}`} data-reveal>
            {h.kicker}
          </p>

          <h1 id="hero-title" className={`display ${s.title}`} data-reveal style={{ "--reveal-delay": "80ms" } as React.CSSProperties}>
            {h.titleA} <span className="marker">{h.titleAmount}</span> {h.titleB}
            <span className={s.titleSoft}>{h.titleC}</span>
          </h1>

          <p className={`lead ${s.lead}`} data-reveal style={{ "--reveal-delay": "160ms" } as React.CSSProperties}>
            {h.lead}
          </p>

          <div className={s.ctas} data-reveal style={{ "--reveal-delay": "240ms" } as React.CSSProperties}>
            <a href="#contact" className="btn btn--primary btn--lg">
              {h.ctaPrimary}
              <ArrowRight className="btn__icon btn__icon--arrow" />
            </a>
            <a href="#calculator" className="btn btn--ghost btn--lg">
              {h.ctaSecondary}
              <ArrowDown className="btn__icon" />
            </a>
          </div>

          <ul className={s.facts} data-reveal style={{ "--reveal-delay": "320ms" } as React.CSSProperties}>
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

        <div className={s.visual} data-reveal="scale" style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
          <figure className={s.photoCard}>
            <Image
              src="/images/julia-placeholder.svg"
              alt={h.photoAlt}
              width={900}
              height={1125}
              priority
              unoptimized
              className={s.photo}
              sizes="(min-width: 1024px) 480px, 90vw"
            />
            <figcaption className="sr-only">{h.photoAlt}</figcaption>
            <Stamp className={s.stamp} size={128} />
          </figure>

          {/* плаваючі «квитанції» — соціальний доказ у русі */}
          <div className={`${s.ticket} ${s.ticketA}`} aria-hidden="true">
            <span className={s.ticketIcon}>
              <Check width={16} height={16} />
            </span>
            <span className={s.ticketText}>
              <b>Заявку погоджено</b>
              <i>Масштабування · 2 500 000 ₴</i>
            </span>
          </div>
          <div className={`${s.ticket} ${s.ticketB}`} aria-hidden="true">
            <span className={s.ticketIcon}>
              <Check width={16} height={16} />
            </span>
            <span className={s.ticketText}>
              <b>Заявку погоджено</b>
              <i>Старт бізнесу · 500 000 ₴</i>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
