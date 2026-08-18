import { site } from "@/content/site";
import { Telegram, Viber, Instagram, ArrowUpRight } from "@/components/ui/Icons";
import s from "./Footer.module.css";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={s.footer}>
      <div className={`container ${s.grid}`}>
        <div className={s.brand}>
          <p className={s.name}>{site.brand.shortName}</p>
          <p className={s.tag}>{site.brand.tagline}</p>
          <p className={`muted ${s.loc}`}>{site.brand.location}</p>
        </div>

        <nav className={s.nav} aria-label="Футер">
          {site.nav.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </nav>

        <div className={s.social}>
          <a href={site.contacts.telegram} target="_blank" rel="noopener noreferrer" aria-label="Telegram">
            <Telegram />
          </a>
          <a href={site.contacts.viber} aria-label="Viber">
            <Viber />
          </a>
          <a href={site.contacts.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <Instagram />
          </a>
          <a href={site.contacts.phoneHref} className={s.phone}>
            {site.contacts.phoneDisplay}
          </a>
        </div>
      </div>

      <div className={`container ${s.legal}`}>
        <p className={s.disclaimer}>{site.footer.disclaimer}</p>
        <p className={s.sources}>
          Умови програми звірено {site.programUpdatedAt}:{" "}
          {site.footer.sources.map((src, i) => (
            <span key={src.href}>
              <a href={src.href} target="_blank" rel="noopener noreferrer">
                {src.label}
                <ArrowUpRight width={12} height={12} />
              </a>
              {i < site.footer.sources.length - 1 ? " · " : ""}
            </span>
          ))}
        </p>
        <div className={s.bottom}>
          <span>
            © {year} {site.footer.legalName}. {site.footer.rights}
          </span>
          <a href="/privacy">{site.footer.privacy}</a>
        </div>
      </div>
    </footer>
  );
}
