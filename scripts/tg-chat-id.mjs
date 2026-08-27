/**
 * Показує chat_id усіх чатів, які «побачив» бот.
 * Запуск:  npm run tg:id
 *
 * Перед запуском:
 *   • особистий чат — напишіть боту /start
 *   • канал/група   — додайте бота адміністратором і надішліть туди будь-яке повідомлення
 * Telegram зберігає ці події ~24 год, тож робіть це безпосередньо перед запуском.
 */
import { readFileSync } from "node:fs";

function envToken() {
  if (process.env.TELEGRAM_BOT_TOKEN) return process.env.TELEGRAM_BOT_TOKEN;
  for (const file of [".env.local", ".env"]) {
    try {
      const m = readFileSync(file, "utf8").match(/^TELEGRAM_BOT_TOKEN=(.+)$/m);
      if (m?.[1].trim()) return m[1].trim();
    } catch {
      // файлу немає — пробуємо наступний
    }
  }
  return null;
}

const token = envToken();
if (!token) {
  console.error("✖ TELEGRAM_BOT_TOKEN не знайдено (ані в env, ані в .env.local / .env)");
  process.exit(1);
}

const res = await fetch(`https://api.telegram.org/bot${token}/getUpdates`);
const data = await res.json();

if (!data.ok) {
  console.error("✖ Telegram відповів помилкою:", data.description ?? data);
  process.exit(1);
}

const chats = new Map();
for (const upd of data.result) {
  for (const key of ["message", "channel_post", "edited_channel_post", "my_chat_member"]) {
    const chat = upd[key]?.chat;
    if (chat) chats.set(chat.id, chat);
  }
}

if (chats.size === 0) {
  console.log("Оновлень немає. Напишіть боту /start (або надішліть повідомлення в канал,");
  console.log("де бот — адміністратор) і запустіть команду ще раз.");
  process.exit(0);
}

console.log("Знайдені чати — скопіюйте потрібний id у TELEGRAM_CHAT_ID:\n");
for (const c of chats.values()) {
  const name = c.title ?? [c.first_name, c.last_name].filter(Boolean).join(" ") ?? "";
  console.log(`  ${String(c.id).padEnd(16)} ${c.type.padEnd(10)} ${name}${c.username ? ` (@${c.username})` : ""}`);
}
