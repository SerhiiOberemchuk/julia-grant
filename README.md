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

## Де що правити

| Що | Де |
|---|---|
| Усі тексти, цифри, контакти, FAQ, кейси, відгуки | `src/content/site.ts` |
| Фото | `public/images/` (замінити `julia-placeholder.svg` і шляхи в `Hero.tsx` / `About.tsx`) |
| Скріни погоджених заявок | `public/cases/` + масив `cases.items` |
| Кольори, шрифти, відступи, кнопки | `src/app/globals.css` |
| Секції | `src/components/sections/*` |
| Прийом заявок | `src/app/api/lead/route.ts` (Telegram / Resend через `.env`) |
| Google Ads конверсія | `src/lib/analytics.ts` + `NEXT_PUBLIC_GADS_CONVERSION` |

## Змінні оточення

Див. `.env.example`. Без налаштованих каналів заявки логуються в консоль сервера.
