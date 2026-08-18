"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { site } from "@/content/site";
import { ArrowRight, Telegram, Viber, Instagram, Phone, Mail, Check } from "@/components/ui/Icons";
import { trackLead } from "@/lib/analytics";
import { DIRECTION_EVENT, getLeadDirection } from "@/lib/leadDirection";
import s from "./Contact.module.css";

type Status = "idle" | "sending" | "ok" | "error";

const DIRECTIONS: readonly string[] = site.contact.directions;

export function Contact() {
  const c = site.contact;
  const [status, setStatus] = useState<Status>("idle");
  const [direction, setDirection] = useState<string>(c.directions[0]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [highlight, setHighlight] = useState(false);
  const hlTimer = useRef<number | undefined>(undefined);

  // Кнопки «Підходить мені» та CTA калькулятора обирають напрям тут
  useEffect(() => {
    const stored = getLeadDirection();
    if (stored && DIRECTIONS.includes(stored)) {
      // через rAF, щоб не робити синхронний setState всередині ефекту
      requestAnimationFrame(() => setDirection(stored));
    }

    const onPick = (e: Event) => {
      const value = (e as CustomEvent<string>).detail;
      if (!value || !DIRECTIONS.includes(value)) return;
      setDirection(value);
      setHighlight(true);
      window.clearTimeout(hlTimer.current);
      hlTimer.current = window.setTimeout(() => setHighlight(false), 1800);
    };

    window.addEventListener(DIRECTION_EVENT, onPick);
    return () => {
      window.removeEventListener(DIRECTION_EVENT, onPick);
      window.clearTimeout(hlTimer.current);
    };
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const consent = data.get("consent") === "on";
    const website = String(data.get("website") ?? ""); // honeypot

    const errs: Record<string, string> = {};
    if (name.length < 2) errs.name = "Вкажіть ім'я";
    if (!/^[+\d\s()-]{9,20}$/.test(phone)) errs.phone = "Вкажіть коректний телефон";
    if (!consent) errs.consent = "Потрібна згода на обробку даних";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, direction, message, website, page: window.location.href }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("ok");
      trackLead({ direction });
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className={`section ${s.section}`} aria-labelledby="contact-title">
      <div className={`container ${s.grid}`}>
        <div className={s.copy}>
          <p className="label" data-reveal>
            {c.label}
          </p>
          <h2 id="contact-title" className="h2" data-reveal>
            {c.title}
          </h2>
          <p className="lead" data-reveal>
            {c.lead}
          </p>

          <div className={s.messengers} data-reveal>
            <p className={s.messengersTitle}>{c.messengersTitle}</p>
            <div className={s.msgRow}>
              <a href={site.contacts.telegram} target="_blank" rel="noopener noreferrer" className={s.msg}>
                <Telegram /> Telegram
              </a>
              <a href={site.contacts.viber} className={s.msg}>
                <Viber /> Viber
              </a>
              <a href={site.contacts.instagram} target="_blank" rel="noopener noreferrer" className={s.msg}>
                <Instagram /> Instagram
              </a>
            </div>
            <ul className={s.contacts}>
              <li>
                <Phone width={18} height={18} />
                <a href={site.contacts.phoneHref}>{site.contacts.phoneDisplay}</a>
              </li>
              <li>
                <Mail width={18} height={18} />
                <a href={`mailto:${site.contacts.email}`}>{site.contacts.email}</a>
              </li>
              <li className="muted">{site.contacts.workHours}</li>
            </ul>
          </div>
        </div>

        <div className={s.formWrap} data-reveal="scale">
          {status === "ok" ? (
            <div className={s.success} role="status">
              <span className={s.successIcon}>
                <Check width={28} height={28} />
              </span>
              <h3 className="h3">{c.success.title}</h3>
              <p className="muted">{c.success.text}</p>
              <a href={site.contacts.telegram} target="_blank" rel="noopener noreferrer" className="btn btn--primary">
                <Telegram className="btn__icon" /> Написати в Telegram
              </a>
            </div>
          ) : (
            <form className={s.form} onSubmit={onSubmit} noValidate>
              <div className={s.row}>
                <label className={`${s.field} ${errors.name ? s.fieldError : ""}`}>
                  <span className={s.fieldLabel}>{c.fields.name}</span>
                  <input name="name" type="text" autoComplete="name" placeholder="Юлія" required />
                  {errors.name && <em className={s.err}>{errors.name}</em>}
                </label>
                <label className={`${s.field} ${errors.phone ? s.fieldError : ""}`}>
                  <span className={s.fieldLabel}>{c.fields.phone}</span>
                  <input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+380" required />
                  {errors.phone && <em className={s.err}>{errors.phone}</em>}
                </label>
              </div>

              <fieldset className={`${s.field} ${highlight ? s.fieldPulse : ""}`}>
                <legend className={s.fieldLabel}>{c.fields.direction}</legend>
                <div className={s.pills} role="radiogroup">
                  {c.directions.map((d) => (
                    <label key={d} className={`${s.pill} ${direction === d ? s.pillActive : ""}`}>
                      <input
                        type="radio"
                        name="direction"
                        value={d}
                        checked={direction === d}
                        onChange={() => setDirection(d)}
                        className="sr-only"
                      />
                      {d}
                    </label>
                  ))}
                </div>
              </fieldset>

              <label className={s.field}>
                <span className={s.fieldLabel}>{c.fields.message}</span>
                <textarea name="message" rows={3} placeholder="Наприклад: хочу відкрити кав'ярню, потрібно обладнання ~400 тис." />
              </label>

              {/* honeypot для ботів */}
              <label className={s.hp} aria-hidden="true">
                Website
                <input name="website" type="text" tabIndex={-1} autoComplete="off" />
              </label>

              <label className={`${s.consent} ${errors.consent ? s.consentError : ""}`}>
                <input name="consent" type="checkbox" />
                <span className={s.checkbox} aria-hidden="true">
                  <Check width={12} height={12} />
                </span>
                <span>
                  {c.fields.consent} (<Link href="/privacy">політика</Link>)
                </span>
              </label>
              {errors.consent && <em className={s.err}>{errors.consent}</em>}

              <button type="submit" className={`btn btn--primary btn--lg ${s.submit}`} disabled={status === "sending"}>
                {status === "sending" ? "Надсилаю…" : c.fields.submit}
                <ArrowRight className="btn__icon btn__icon--arrow" />
              </button>

              {status === "error" && (
                <p className={s.formError} role="alert">
                  {c.error}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
