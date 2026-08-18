import type { Metadata } from "next";
import { site } from "@/content/site";
import { LegalPage, LegalSection } from "@/components/legal/LegalPage";
import s from "@/components/legal/LegalPage.module.css";

export const metadata: Metadata = {
  title: "Тарифи на послуги",
  description:
    "Вартість послуг з підготовки бізнес-плану та супроводу заявки на державний грант «Власна справа»: пакети, строки, порядок оплати.",
  robots: { index: true, follow: true },
};

const L = site.legal;

export default function TarifyPage() {
  return (
    <LegalPage
      kicker="Правова інформація"
      title="Тарифи на послуги"
      updatedAt={L.tariffsDate}
      wide
      intro={
        <>
          Ці тарифи є невід&apos;ємною частиною <a href="/oferta">Договору публічної оферти</a> і поширюються на осіб, які
          погодилися з його умовами та <a href="/privacy">Політикою конфіденційності</a> шляхом оплати послуг.
        </>
      }
    >
      <LegalSection n="1" title="Перелік послуг та вартість">
        <div className={s.tableWrap}>
          <table className={s.table}>
            <colgroup>
              <col />
              <col />
              <col />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">Послуга</th>
                <th scope="col">Що входить</th>
                <th scope="col">Строк</th>
                <th scope="col">Вартість</th>
              </tr>
            </thead>
            <tbody>
              {L.tariffs.map((t) => (
                <tr key={t.name}>
                  <th scope="row">{t.name}</th>
                  <td>{t.what}</td>
                  <td className={s.term}>{t.term}</td>
                  <td className={s.price}>{t.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>{L.tariffsNote}</p>
      </LegalSection>

      <LegalSection n="2" title="Порядок оплати">
        <ol>
          <li>
            Оплата здійснюється у безготівковій формі на рахунок Виконавця за реквізитами, зазначеними у розділі 4 цієї
            сторінки та в <a href="/oferta">Договорі оферти</a>.
          </li>
          <li>
            Можлива оплата двома частинами: 50 % — передоплата після погодження обсягу робіт, 50 % — після узгодження
            підготовленого бізнес-плану.
          </li>
          <li>Роботи розпочинаються після надходження передоплати та отримання повного пакета вихідних даних від Замовника.</li>
          <li>Комісії банків та платіжних систем сплачує Замовник.</li>
        </ol>
      </LegalSection>

      <LegalSection n="3" title="Що впливає на остаточну вартість">
        <ul>
          <li>напрям програми: «Старт бізнесу» чи «Масштабування» та відповідна сума гранту;</li>
          <li>складність проєкту: кількість напрямів діяльності, обсяг обладнання, наявність виробництва;</li>
          <li>обсяг вихідних даних, які потрібно зібрати й систематизувати;</li>
          <li>терміновість підготовки документів;</li>
          <li>потреба в додаткових послугах: реєстрація ФОП, підбір КВЕДів, консультації з маркетингу.</li>
        </ul>
        <p>
          Точна вартість повідомляється на безкоштовній консультації до підписання договору й не змінюється в
          односторонньому порядку після початку робіт.
        </p>
      </LegalSection>

      <LegalSection n="4" title="Реквізити для оплати">
        <dl className={s.requisites}>
          <div>
            <dt>Отримувач</dt>
            <dd>{L.executorName}</dd>
          </div>
          <div>
            <dt>РНОКПП</dt>
            <dd>{L.ipn}</dd>
          </div>
          <div>
            <dt>IBAN</dt>
            <dd>{L.iban}</dd>
          </div>
          <div>
            <dt>Банк</dt>
            <dd>{L.bank}</dd>
          </div>
          <div>
            <dt>Призначення платежу</dt>
            <dd>Оплата інформаційно-консультаційних послуг згідно з договором публічної оферти</dd>
          </div>
        </dl>
        <p>
          Питання щодо оплати: <a href={`mailto:${L.email}`}>{L.email}</a>,{" "}
          <a href={site.contacts.phoneHref}>{L.phone}</a>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
