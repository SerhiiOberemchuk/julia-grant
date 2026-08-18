"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { Phone, Telegram, ArrowUpRight } from "@/components/ui/Icons";
import s from "./MobileBar.module.css";

/**
 * Липка панель дій для мобільних: з'являється після прокрутки першого екрана
 * і ховається, коли користувач уже біля форми.
 */
export function MobileBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const contact = document.getElementById("contact");
    let nearForm = false;
    const io = contact
      ? new IntersectionObserver(
          ([e]) => {
            nearForm = e.isIntersecting;
            setShow(window.scrollY > window.innerHeight * 0.7 && !nearForm);
          },
          { threshold: 0.15 },
        )
      : null;
    io?.observe(contact!);

    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.7 && !nearForm);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, []);

  return (
    <div className={`${s.bar} ${show ? s.show : ""}`} aria-hidden={!show}>
      <a href={site.contacts.phoneHref} className={s.icon} aria-label="Подзвонити">
        <Phone />
      </a>
      <a href={site.contacts.telegram} target="_blank" rel="noopener noreferrer" className={s.icon} aria-label="Написати в Telegram">
        <Telegram />
      </a>
      <a href="#contact" className={`btn btn--primary ${s.cta}`}>
        Записатися
        <ArrowUpRight className="btn__icon" />
      </a>
    </div>
  );
}
