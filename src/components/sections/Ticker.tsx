import { site } from "@/content/site";
import { Spark } from "@/components/ui/Icons";
import s from "./Ticker.module.css";

/** Нескінченна стрічка фактів — чистий CSS, дубльований трек для безшовного циклу */
export function Ticker() {
  const items = site.ticker;
  const track = (ariaHidden: boolean) => (
    <ul className={s.track} aria-hidden={ariaHidden}>
      {items.map((t, i) => (
        <li key={i} className={s.item}>
          <Spark className={s.spark} width={14} height={14} />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={s.wrap}>
      <div className={s.ticker} role="marquee" aria-label="Ключові факти про програму">
        <div className={s.rail}>
          {track(false)}
          {track(true)}
        </div>
      </div>
    </div>
  );
}
