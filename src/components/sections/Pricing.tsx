import { site } from "@/content/site";
import { Check, ArrowRight } from "@/components/ui/Icons";
import s from "./Pricing.module.css";

export function Pricing() {
  const p = site.pricing;
  return (
    <section id="pricing" className="section section--tight" aria-labelledby="pricing-title">
      <div className="container">
        <div className={s.band} data-reveal="scale">
          <div className={s.copy}>
            <p className="label">{p.label}</p>
            <h2 id="pricing-title" className="h2">
              {p.title}
            </h2>
            <p className={s.text}>{p.text}</p>
          </div>
          <div className={s.side}>
            <ul className={s.list}>
              {p.bullets.map((b) => (
                <li key={b}>
                  <span className={s.tick}>
                    <Check width={14} height={14} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <a href="#contact" className="btn btn--primary btn--lg">
              {p.cta}
              <ArrowRight className="btn__icon btn__icon--arrow" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
