# Юлія — грантова консультантка · сайт

Односторінковий сайт для консультантки з державних грантів «Власна справа» (єРобота / Дія).
Унікальний дизайн без UI-бібліотек і шаблонів: Next.js 16 + TypeScript + CSS Modules, усі компоненти й анімації — власні.

- Дизайн-план та структура: [`docs/design-plan.md`](docs/design-plan.md)
- Дослідження ніші та факти про програму: [`docs/research.md`](docs/research.md)
- Вихідний бриф: [`docs/init-info.md`](docs/init-info.md)

## Запуск

```bash
npm install
cp .env.example .env.local   # заповнити за потреби
npm run dev                  # http://localhost:3000
```

`npm run build && npm start` — production. `npm run lint` — ESLint.

## Структура

```
src/
  app/
    layout.tsx        спільна оболонка: Header + main + Footer + MobileBar
    page.tsx          головна (тільки секції)
    oferta/           договір публічної оферти
    privacy/          політика конфіденційності
    tarify/           тарифи на послуги
    api/lead/         прийом заявок з форми
  components/
    sections/         секції головної (Hero, Programs, Calculator, …)
    legal/            оболонка правових сторінок (LegalPage)
    ui/               дрібні власні компоненти (CountUp, Icons, MobileBar, …)
  content/site.ts     увесь контент і юридичні реквізити
  lib/                analytics (Google Ads), leadDirection (вибір напряму)
```

Усі сторінки рендеряться в спільному layout — Header і Footer однакові скрізь,
переходи між сторінками клієнтські (`next/link`), без перезавантаження.

## Де що правити

| Що | Де |
|---|---|
| Усі тексти, цифри, контакти, FAQ, кейси, відгуки | `src/content/site.ts` |
| Реквізити ФОП, тарифи, дати редакцій документів | `src/content/site.ts` → `legal` |
| Фото | `public/images/julia.jpg` — зараз тимчасове стокове, див. `public/images/README.md` |
| Скріни погоджених заявок | `public/cases/` + масив `cases.items` |
| Кольори, шрифти, відступи, кнопки | `src/app/globals.css` |
| Секції | `src/components/sections/*` |
| Прийом заявок | `src/app/api/lead/route.ts` (Telegram / Resend через `.env`) |
| Картинка для соцмереж (og:image) | `src/app/opengraph-image.tsx` + шрифти в `assets/` |
| Google Ads конверсія | `src/lib/analytics.ts` + `NEXT_PUBLIC_GADS_CONVERSION` |

## Змінні оточення

Див. `.env.example`. Без налаштованих каналів заявки логуються в консоль сервера.
