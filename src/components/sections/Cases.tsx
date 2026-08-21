import { site } from "@/content/site";
import { CaseShot } from "@/components/ui/CaseShot";
import s from "./Cases.module.css";

/**
 * Реєстр погоджених заявок. Жодних імітацій документів:
 * лише факти рядками, а коли клієнтка додасть скріншоти рішень
 * (поле image у site.cases.items) — з’являється колонка з мініатюрами:
 * ховер показує збільшене прев’ю, клік/тап відкриває лайтбокс.
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
                      <CaseShot
                        src={it.image}
                        alt={`Скріншот рішення: ${it.niche}, ${it.sum}`}
                        title={it.niche}
                        meta={`${it.direction} · ${it.region} · ${it.year}`}
                        sum={it.sum}
                      />
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
