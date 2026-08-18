import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import s from "./page.module.css";

export const metadata: Metadata = {
  title: "Політика конфіденційності",
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <main className={`container ${s.page}`}>
      <p className="label">Правова інформація</p>
      <h1 className="h2">Політика конфіденційності</h1>
      <p className="muted">Редакція від {site.programUpdatedAt}</p>

      <section className={s.block}>
        <h2 className="h3">1. Хто обробляє дані</h2>
        <p>
          Володільцем персональних даних є {site.footer.legalName} (далі — «Виконавець»). Контакт для питань щодо
          персональних даних: <a href={`mailto:${site.contacts.email}`}>{site.contacts.email}</a>.
        </p>
      </section>

      <section className={s.block}>
        <h2 className="h3">2. Які дані збираються</h2>
        <p>
          Через форму на сайті збираються: ім’я, номер телефону, обраний напрям гранту та (за бажанням) короткий опис
          ідеї. Також можуть автоматично збиратися технічні дані (IP-адреса, тип пристрою, сторінка звернення) для
          захисту від спаму та аналітики.
        </p>
      </section>

      <section className={s.block}>
        <h2 className="h3">3. Мета обробки</h2>
        <p>
          Дані використовуються виключно для зв’язку з вами щодо консультації та надання послуг із підготовки грантової
          заявки. Дані не передаються третім особам, окрім сервісів доставки повідомлень (месенджер/пошта) та випадків,
          передбачених законом.
        </p>
      </section>

      <section className={s.block}>
        <h2 className="h3">4. Cookies та аналітика</h2>
        <p>
          Сайт може використовувати файли cookie сервісів аналітики та реклами (Google Analytics / Google Ads) для
          оцінки ефективності реклами. Ви можете вимкнути cookie у налаштуваннях браузера.
        </p>
      </section>

      <section className={s.block}>
        <h2 className="h3">5. Ваші права</h2>
        <p>
          Відповідно до Закону України «Про захист персональних даних» ви маєте право знати про обробку своїх даних,
          вимагати їх уточнення або видалення, відкликати згоду. Для цього напишіть на{" "}
          <a href={`mailto:${site.contacts.email}`}>{site.contacts.email}</a>.
        </p>
      </section>

      <Link href="/" className="btn btn--ghost">
        ← На головну
      </Link>
    </main>
  );
}
