import Link from "next/link";
import type { ReactNode, CSSProperties } from "react";
import { site } from "@/content/site";
import { ArrowRight } from "@/components/ui/Icons";
import s from "./LegalPage.module.css";

type Props = {
  kicker: string;
  title: string;
  /** Дата редакції документа */
  updatedAt: string;
  intro?: ReactNode;
  /** Ширша колонка — для сторінок із таблицями */
  wide?: boolean;
  children: ReactNode;
};

/** Спільна оболонка для правових сторінок: оферта, політика, тарифи */
export function LegalPage({ kicker, title, updatedAt, intro, wide, children }: Props) {
  return (
    <article className={s.page} style={wide ? ({ "--legal-width": "1040px" } as CSSProperties) : undefined}>
      <header className={`container ${s.head}`}>
        <nav className={s.crumbs} aria-label="Навігація">
          <Link href="/">Головна</Link>
          <span aria-hidden="true">/</span>
          <span>{title}</span>
        </nav>
        <p className="label">{kicker}</p>
        <h1 className="h2">{title}</h1>
        <p className={s.meta}>
          Редакція від {updatedAt} · {site.legal.executorName}
        </p>
        {intro && <div className={s.intro}>{intro}</div>}
      </header>

      <div className={`container ${s.body}`}>{children}</div>

      <div className={`container ${s.foot}`}>
        <div className={s.otherDocs}>
          <p className={s.otherTitle}>Інші документи</p>
          <ul>
            {site.legalPages.map((p) => (
              <li key={p.href}>
                <Link href={p.href}>{p.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <Link href="/#contact" className="btn btn--primary">
          Записатися на консультацію
          <ArrowRight className="btn__icon btn__icon--arrow" />
        </Link>
      </div>
    </article>
  );
}

/** Пронумерований розділ документа */
export function LegalSection({ n, title, children }: { n: string; title: string; children: ReactNode }) {
  return (
    <section className={s.section}>
      <h2 className={s.sectionTitle}>
        <span className={s.sectionN}>{n}</span>
        {title}
      </h2>
      <div className={s.sectionBody}>{children}</div>
    </section>
  );
}
