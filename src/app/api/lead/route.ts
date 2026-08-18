import { NextResponse } from "next/server";

/**
 * Прийом заявок з форми.
 * Канали доставки (вмикаються env-змінними, можна кілька одночасно):
 *   TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID  — повідомлення в Telegram
 *   RESEND_API_KEY + LEAD_TO_EMAIL (+ LEAD_FROM_EMAIL) — лист через Resend API
 * Якщо нічого не налаштовано — лід логується у консоль сервера (режим розробки).
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

async function sendTelegram(lead: Lead) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chat = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chat) return false;

  const text = [
    "🟢 <b>Нова заявка з сайту</b>",
    `👤 Ім'я: <b>${esc(lead.name)}</b>`,
    `📞 Телефон: <code>${esc(lead.phone)}</code>`,
    lead.direction ? `🎯 Напрям: ${esc(lead.direction)}` : null,
    lead.message ? `💬 Про ідею: ${esc(lead.message)}` : null,
    lead.page ? `🔗 ${esc(lead.page)}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chat, text, parse_mode: "HTML" }),
  });
  return res.ok;
}

async function sendEmail(lead: Lead) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL;
  if (!key || !to) return false;
  const from = process.env.LEAD_FROM_EMAIL ?? "Сайт <onboarding@resend.dev>";

  const html = `
    <h2>Нова заявка з сайту</h2>
    <p><b>Ім'я:</b> ${esc(lead.name)}</p>
    <p><b>Телефон:</b> ${esc(lead.phone)}</p>
    ${lead.direction ? `<p><b>Напрям:</b> ${esc(lead.direction)}</p>` : ""}
    ${lead.message ? `<p><b>Про ідею:</b> ${esc(lead.message)}</p>` : ""}
    ${lead.page ? `<p><small>${esc(lead.page)}</small></p>` : ""}
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [to], subject: `Заявка: ${lead.name}, ${lead.phone}`, html }),
  });
  return res.ok;
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

  const results = await Promise.allSettled([sendTelegram(lead), sendEmail(lead)]);
  const delivered = results.some((r) => r.status === "fulfilled" && r.value === true);
  const configured = Boolean(
    (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) ||
      (process.env.RESEND_API_KEY && process.env.LEAD_TO_EMAIL),
  );

  if (!configured) {
    console.info("[lead] (канали доставки не налаштовані) →", lead);
    return NextResponse.json({ ok: true, dev: true });
  }

  if (!delivered) {
    console.error("[lead] доставка не вдалася", results);
    return NextResponse.json({ ok: false, error: "delivery" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
