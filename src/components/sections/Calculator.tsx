"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { site } from "@/content/site";
import { ArrowRight, Check } from "@/components/ui/Icons";
import { PickDirection } from "@/components/ui/PickDirection";
import s from "./Calculator.module.css";

const fmt = new Intl.NumberFormat("uk-UA");

/** Плавно анімує число до цільового значення */
function useSmoothNumber(target: number, ms = 500) {
  const [v, setV] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    const start = performance.now();
    const f = from.current;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / ms);
      const e = 1 - Math.pow(1 - p, 3);
      const cur = Math.round(f + (target - f) * e);
      setV(cur);
      if (p < 1) raf = requestAnimationFrame(tick);
      else from.current = target;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return v;
}

type DirId = (typeof site.calculator.directions)[number]["id"];
type BonusId = (typeof site.calculator.bonuses)[number]["id"];

export function Calculator() {
  const c = site.calculator;
  const [dirId, setDirId] = useState<DirId>(c.directions[0].id);
  const dir = c.directions.find((d) => d.id === dirId)!;
  const [base, setBase] = useState<number>(dir.default);
  const [picked, setPicked] = useState<Set<BonusId>>(new Set());

  const bonusPct = useMemo(
    () => c.bonuses.filter((b) => picked.has(b.id)).reduce((acc, b) => acc + b.bonus, 0),
    [picked, c.bonuses],
  );
  const rawTotal = Math.round(base * (1 + bonusPct / 100));
  const total = Math.min(rawTotal, dir.cap);
  const capped = rawTotal > dir.cap;
  const bonusSum = total - base;
  const animatedTotal = useSmoothNumber(total);
  const pct = ((base - dir.min) / (dir.max - dir.min)) * 100;

  const toggle = (id: BonusId) =>
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <section id="calculator" className={`section ${s.section}`} aria-labelledby="calc-title">
      <div className="container">
        <div className="section-head">
          <p className="label" data-reveal>
            {c.label}
          </p>
          <h2 id="calc-title" className="h2" data-reveal>
            {c.title}
          </h2>
          <p className="lead" data-reveal>
            {c.lead}
          </p>
        </div>

        <div className={s.card} data-reveal="scale">
          <div className={s.controls}>
            {/* Напрям */}
            <fieldset className={s.field}>
              <legend className={s.legend}>Напрям</legend>
              <div className={s.segment} role="radiogroup">
                {c.directions.map((d) => (
                  <label key={d.id} className={`${s.segItem} ${d.id === dirId ? s.segActive : ""}`}>
                    <input
                      type="radio"
                      name="direction"
                      value={d.id}
                      checked={d.id === dirId}
                      onChange={() => {
                        setDirId(d.id);
                        setBase(d.default);
                      }}
                      className="sr-only"
                    />
                    {d.name}
                    <small>до {fmt.format(d.cap)} ₴</small>
                  </label>
                ))}
                <span
                  className={s.segThumb}
                  aria-hidden="true"
                  style={{ transform: `translateX(${dirId === c.directions[0].id ? 0 : 100}%)` }}
                />
              </div>
            </fieldset>

            {/* Слайдер */}
            <div className={s.field}>
              <div className={s.sliderHead}>
                <span className={s.legend}>{c.baseLabel}</span>
                <output className={`num ${s.sliderValue}`} htmlFor="base">
                  {fmt.format(base)} ₴
                </output>
              </div>
              <div className={s.sliderWrap} style={{ "--pct": `${pct}%` } as React.CSSProperties}>
                <input
                  id="base"
                  type="range"
                  min={dir.min}
                  max={dir.max}
                  step={dir.step}
                  value={base}
                  onChange={(e) => setBase(Number(e.target.value))}
                  className={s.slider}
                  aria-label={c.baseLabel}
                  aria-valuetext={`${fmt.format(base)} гривень`}
                />
              </div>
              <div className={`num ${s.sliderScale}`}>
                <span>{fmt.format(dir.min)} ₴</span>
                <span>{fmt.format(dir.max)} ₴</span>
              </div>
            </div>

            {/* Бонуси */}
            <fieldset className={s.field}>
              <legend className={s.legend}>Що стосується вас (можна кілька)</legend>
              <div className={s.chips}>
                {c.bonuses.map((b) => {
                  const on = picked.has(b.id);
                  return (
                    <label key={b.id} className={`${s.chip} ${on ? s.chipActive : ""}`}>
                      <input type="checkbox" checked={on} onChange={() => toggle(b.id)} className="sr-only" />
                      <span className={s.chipTick} aria-hidden="true">
                        <Check width={12} height={12} />
                      </span>
                      <span>{b.name}</span>
                      <b>+{b.bonus} %</b>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </div>

          <div className={s.result}>
            <div className={s.resultTop}>
              <span className="label" style={{ color: "rgba(255,255,250,.7)" }}>
                {c.resultLabel}
              </span>
              <p className={`num ${s.total}`} aria-live="polite">
                {fmt.format(animatedTotal)} <span className={s.cur}>₴</span>
              </p>
              <dl className={s.breakdown}>
                <div>
                  <dt>Базова сума</dt>
                  <dd className="num">{fmt.format(base)} ₴</dd>
                </div>
                <div>
                  <dt>Бонуси {bonusPct > 0 ? `+${bonusPct} %` : "—"}</dt>
                  <dd className="num">{bonusSum > 0 ? `+${fmt.format(bonusSum)} ₴` : "0 ₴"}</dd>
                </div>
                {capped && (
                  <div className={s.capRow}>
                    <dt>{c.capNote}</dt>
                    <dd className="num">{fmt.format(dir.cap)} ₴</dd>
                  </div>
                )}
              </dl>
            </div>
            <div className={s.resultBottom}>
              <PickDirection direction={site.contact.directionByCalc[dirId] ?? ""} className="btn btn--light btn--lg">
                {c.cta}
                <ArrowRight className="btn__icon btn__icon--arrow" />
              </PickDirection>
              <p className={s.disclaimer}>{c.disclaimer}</p>
            </div>
            <span className={s.resultGlow} aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
