import Link from "next/link";
import { site } from "@/content/site";
import { ArrowRight } from "@/components/ui/Icons";
import s from "./not-found.module.css";

export default function NotFound() {
  const n = site.notFound;
  return (
    <section className={`section ${s.wrap}`} aria-labelledby="nf-title">
      <div className={`container ${s.inner}`}>
        <p className={`label ${s.kicker}`}>{n.label}</p>

        <div className={s.digits} aria-hidden="true">
          <span className={s.digit}>4</span>
          <span className={`${s.digit} ${s.digitMid}`}>0</span>
          <span className={s.digit}>4</span>
          <span className={s.stamp}>{n.stamp}</span>
        </div>

        <h1 id="nf-title" className={`h2 ${s.title}`}>
          {n.title}
        </h1>
        <p className={`lead ${s.lead}`}>{n.lead}</p>

        <div className={s.actions}>
          <Link href="/" className="btn btn--primary btn--lg">
            {n.ctaHome}
            <ArrowRight className="btn__icon btn__icon--arrow" />
          </Link>
          <Link href="/#calculator" className="btn btn--ghost btn--lg">
            {n.ctaCalc}
          </Link>
        </div>
      </div>
    </section>
  );
}
