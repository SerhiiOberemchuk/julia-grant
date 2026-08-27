import { NextResponse } from "next/server";

/**
 * Прийом заявок з форми → повідомлення в Telegram.
 *
 * Обовʼязкові env-змінні:
 *   TELEGRAM_BOT_TOKEN — токен бота від @BotFather
 *   TELEGRAM_CHAT_ID   — куди слати: id каналу/групи (напр. -1001234567890),
 *                        @username каналу або id особистого чату
 * Необовʼязкова:
 *   TELEGRAM_THREAD_ID — id теми, якщо група з увімкненими «Темами» (форум)
 *
 * Якщо змінні не задані — лід логується в консоль сервера (режим розробки).
 */

type Lead = {
  name: string;
  phone: string;
  direction?: string;
  message?: string;
  website?: string; // honeypot
  page?: string;
};

const PHONE_RE = /^[+\d\s()-]{9,20}$/;
const TG_TIMEOUT_MS = 10_000;

// простий rate-limit у пам'яті процесу (достатньо для лендінгу)
const hits = new Map<string, { n: number; t: number }>();
function limited(ip: string) {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now - rec.t > 10 * 60_000) {
    hits.set(ip, { n: 1, t: now });
    return false;
  }
  rec.n += 1;
  return rec.n > 8;
}

function esc(s: string) {
  return s.replace(/[<>&]/g, (ch) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" })[ch] as string);
}

function kyivTime() {
  return new Intl.DateTimeFormat("uk-UA", {
    timeZone: "Europe/Kyiv",
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());
}

function buildText(lead: Lead) {
  return [
    "🟢 <b>Нова заявка з сайту</b>",
    "",
    `👤 Ім'я: <b>${esc(lead.name)}</b>`,
    `📞 Телефон: <code>${esc(lead.phone)}</code>`,
    lead.direction ? `🎯 Напрям: ${esc(lead.direction)}` : null,
    lead.message ? `💬 Про ідею: ${esc(lead.message)}` : null,
    "",
    `🕒 ${kyivTime()}`,
    lead.page ? `🔗 ${esc(lead.page)}` : null,
  ]
    .filter((l) => l !== null)
    .join("\n");
}

async function callTelegram(token: string, payload: Record<string, unknown>) {
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(TG_TIMEOUT_MS),
  });

  if (res.ok) return true;

  // Telegram віддає причину в JSON — вона критично важлива для налагодження
  const detail = await res.text().catch(() => "");
  console.error(`[lead] Telegram ${res.status}: ${detail.slice(0, 300)}`);
  return false;
}

async function sendTelegram(lead: Lead) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chat = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chat) return false;

  const payload: Record<string, unknown> = {
    chat_id: chat,
    text: buildText(lead),
    parse_mode: "HTML",
    link_preview_options: { is_disabled: true },
  };

  const thread = process.env.TELEGRAM_THREAD_ID;
  if (thread) payload.message_thread_id = Number(thread);

  try {
    if (await callTelegram(token, payload)) return true;
  } catch (e) {
    console.error("[lead] Telegram мережева помилка", e);
  }

  // одна повторна спроба: мережеві збої та 5xx у Telegram трапляються
  try {
    return await callTelegram(token, payload);
  } catch (e) {
    console.error("[lead] Telegram повторна спроба не вдалася", e);
    return false;
  }
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (limited(ip)) return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });

  let body: Lead;
  try {
    body = (await req.json()) as Lead;
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  // honeypot: боти заповнюють приховане поле — відповідаємо «ок», але нічого не шлемо
  if (body.website) return NextResponse.json({ ok: true });

  const name = (body.name ?? "").toString().trim().slice(0, 80);
  const phone = (body.phone ?? "").toString().trim().slice(0, 24);
  const direction = (body.direction ?? "").toString().trim().slice(0, 40);
  const message = (body.message ?? "").toString().trim().slice(0, 1200);
  const page = (body.page ?? "").toString().trim().slice(0, 300);

  if (name.length < 2 || !PHONE_RE.test(phone)) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 422 });
  }

  const lead: Lead = { name, phone, direction, message, page };

  if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) {
    console.info("[lead] (Telegram не налаштований) →", lead);
    return NextResponse.json({ ok: true, dev: true });
  }

  if (!(await sendTelegram(lead))) {
    return NextResponse.json({ ok: false, error: "delivery" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
