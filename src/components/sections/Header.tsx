"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { site } from "@/content/site";
import { Phone, ArrowUpRight } from "@/components/ui/Icons";
import s from "./Header.module.css";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`${s.header} ${scrolled ? s.scrolled : ""}`}>
      <div className={`container ${s.bar}`}>
        <Link href="/" className={s.logo} aria-label="На головну">
          <span className={s.logoMark} aria-hidden="true">
            <svg viewBox="0 0 40 40" width="40" height="40">
              <circle cx="20" cy="20" r="19" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M13 21l5 5 10-12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className={s.logoText}>
            <b>{site.brand.shortName}</b>
            <i>{site.brand.tagline}</i>
          </span>
        </Link>

        <nav className={s.nav} aria-label="Розділи сторінки">
          {site.nav.map((n) => (
            <Link key={n.href} href={n.href} className={s.navLink}>
              {n.label}
            </Link>
          ))}
        </nav>

        <div className={s.actions}>
          <a href={site.contacts.phoneHref} className={s.phone}>
            <Phone width={18} height={18} />
            <span>{site.contacts.phoneDisplay}</span>
          </a>
          <Link href="/#contact" className={`btn btn--primary ${s.cta}`}>
            Консультація
            <ArrowUpRight className="btn__icon" />
          </Link>
          <button
            type="button"
            className={`${s.burger} ${open ? s.burgerOpen : ""}`}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Закрити меню" : "Відкрити меню"}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={`${s.mobile} ${open ? s.mobileOpen : ""}`} aria-hidden={!open}>
        <nav className={s.mobileNav} aria-label="Мобільне меню">
          {site.nav.map((n, i) => (
            <Link
              key={n.href}
              href={n.href}
              className={s.mobileLink}
              style={{ transitionDelay: `${60 + i * 40}ms` }}
              onClick={() => setOpen(false)}
            >
              <span className="label">{String(i + 1).padStart(2, "0")}</span>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className={s.mobileFoot}>
          <Link href="/#contact" className="btn btn--primary btn--lg" onClick={() => setOpen(false)}>
            Записатися на консультацію
          </Link>
          <a href={site.contacts.phoneHref} className={s.mobilePhone}>
            <Phone /> {site.contacts.phoneDisplay}
          </a>
          <p className="muted">{site.contacts.workHours}</p>
        </div>
      </div>
    </header>
  );
}
