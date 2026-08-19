import Image from "next/image";
import { site } from "@/content/site";
import { ArrowUpRight } from "@/components/ui/Icons";
import s from "./Cases.module.css";

/**
 * Реєстр погоджених заявок. Жодних імітацій документів:
 * лише факти рядками, а коли клієнтка додасть скріншоти рішень
 * (поле image у site.cases.items) — з’являється колонка з мініатюрами.
 */
export function Cases() {
  const c = site.cases;
  const hasImages = c.items.some((it) => it.image);

  return (
    <section id="cases" className={`section ${s.section}`} aria-labelledby="cases-title">
      <div className="container">
        <div className="section-head">
          <p className="label" data-reveal>
            {c.label}
          </p>
          <h2 id="cases-title" className="h2" data-reveal>
            {c.title}
          </h2>
          <p className="lead" data-reveal>
            {c.lead}
          </p>
        </div>

        <div className={s.ledger} data-reveal>
          <div className={`${s.row} ${s.head}`} aria-hidden="true">
            <span className={s.colN}>№</span>
            <span className={s.colDir}>Напрям</span>
            <span className={s.colNiche}>Проєкт</span>
            <span className={s.colRegion}>Регіон · рік</span>
            <span className={s.colSum}>Сума гранту</span>
            {hasImages && <span className={s.colImg}>Рішення</span>}
          </div>

          <ol className={s.list}>
            {c.items.map((it, i) => (
              <li key={i} className={s.row}>
                <span className={`${s.colN} num`}>{String(i + 1).padStart(2, "0")}</span>
                <span className={s.colDir}>
                  <span className={`${s.tag} ${it.direction === "Старт" ? s.tagStart : s.tagScale}`}>{it.direction}</span>
                </span>
                <span className={s.colNiche}>{it.niche}</span>
                <span className={`${s.colRegion} ${s.muted}`}>
                  {it.region} · {it.year}
                </span>
                <span className={`${s.colSum} num`}>{it.sum}</span>
                {hasImages && (
                  <span className={s.colImg}>
                    {it.image ? (
                      <a href={it.image} target="_blank" rel="noopener noreferrer" className={s.thumb} aria-label="Відкрити скріншот рішення">
                        <Image src={it.image} alt={`Рішення: ${it.niche}, ${it.sum}`} width={160} height={120} sizes="80px" />
                        <ArrowUpRight width={14} height={14} />
                      </a>
                    ) : (
                      <span className={s.thumbEmpty} aria-hidden="true">
                        —
                      </span>
                    )}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>

        <p className={`${s.note} muted`}>{c.note}</p>
      </div>
    </section>
  );
}
