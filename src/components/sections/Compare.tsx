import { site } from "@/content/site";
import { Check } from "@/components/ui/Icons";
import s from "./Compare.module.css";

export function Compare() {
  const c = site.compare;
  return (
    <section id="compare" className="section section--tight" aria-labelledby="compare-title">
      <div className="container">
        <div className="section-head">
          <p className="label" data-reveal>
            {c.label}
          </p>
          <h2 id="compare-title" className="h2" data-reveal>
            {c.title}
          </h2>
          <p className="lead" data-reveal>
            {c.lead}
          </p>
        </div>

        <div className={s.tableWrap} data-reveal>
          <table className={s.table}>
            <thead>
              <tr>
                <th scope="col" className={s.thKey}>
                  <span className="sr-only">Критерій</span>
                </th>
                <th scope="col" className={s.thA}>
                  {c.cols[0]}
                </th>
                <th scope="col" className={s.thB}>
                  <span className={s.thBInner}>
                    <Check width={14} height={14} />
                    {c.cols[1]}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {c.rows.map((r) => (
                <tr key={r.k}>
                  <th scope="row" className={s.key}>
                    {r.k}
                  </th>
                  <td className={s.a} data-label={c.cols[0]}>
                    {r.a}
                  </td>
                  <td className={s.b} data-label={c.cols[1]}>
                    {r.b}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
