import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/content/site";

export const alt = `${site.brand.name} — ${site.hero.titleA} ${site.hero.titleAmount} ${site.hero.titleB}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Satori не бачить next/font — файли лежать у assets/ і читаються на збірці
const unbounded = await readFile(join(process.cwd(), "assets/unbounded-600.ttf"));
const mono = await readFile(join(process.cwd(), "assets/jetbrains-mono-500.ttf"));

const PAPER = "#f5f1ea";
const INK = "#10151c";
const INK_3 = "#5b6472";
const GREEN = "#1e5a3c";
const LINE = "rgba(16, 21, 28, 0.14)";

/** Картка для соцмереж і месенджерів — та сама палітра й типографіка, що на сайті */
export default function Image() {
  const domain = site.url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const fact = site.hero.facts[0];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: PAPER,
          color: INK,
          padding: "60px 72px",
          fontFamily: "Unbounded",
          position: "relative",
        }}
      >
        {/* печатка «погоджено» — той самий знак, що в логотипі, зрізаний краєм */}
        <div style={{ position: "absolute", right: -170, bottom: -170, display: "flex", opacity: 0.07 }}>
          <svg width="620" height="620" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="19" fill="none" stroke={GREEN} strokeWidth="1.5" />
            <path d="M13 21l5 5 10-12" fill="none" stroke={GREEN} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Шапка */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="56" height="56" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="19" fill="none" stroke={GREEN} strokeWidth="1.5" />
            <path d="M13 21l5 5 10-12" fill="none" stroke={GREEN} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ fontSize: 28, letterSpacing: "-0.01em" }}>{site.brand.shortName}</div>
            <div style={{ fontFamily: "JetBrains Mono", fontSize: 15, letterSpacing: "0.12em", color: INK_3 }}>
              {site.brand.tagline.toUpperCase()}
            </div>
          </div>
        </div>

        {/* Заголовок */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ fontFamily: "JetBrains Mono", fontSize: 17, letterSpacing: "0.1em", color: GREEN, marginBottom: 18 }}>
            {"єРобота · Дія · безповоротна допомога".toUpperCase()}
          </div>
          <div style={{ fontSize: 52, lineHeight: 1.15, letterSpacing: "-0.02em" }}>{site.hero.titleA}</div>
          <div style={{ fontSize: 122, lineHeight: 1.05, letterSpacing: "-0.035em", color: GREEN }}>
            {site.hero.titleAmount}
          </div>
          <div style={{ fontSize: 52, lineHeight: 1.15, letterSpacing: "-0.02em" }}>{site.hero.titleB}</div>
        </div>

        {/* Підвал */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `1px solid ${LINE}`,
            paddingTop: 24,
            fontFamily: "JetBrains Mono",
            fontSize: 19,
            letterSpacing: "0.02em",
            color: INK_3,
          }}
        >
          <div style={{ display: "flex" }}>
            {fact.value}
            {fact.suffix} {fact.label} · бізнес-план і супровід
          </div>
          <div style={{ display: "flex", color: INK }}>{domain}</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Unbounded", data: unbounded, style: "normal", weight: 600 },
        { name: "JetBrains Mono", data: mono, style: "normal", weight: 500 },
      ],
    },
  );
}
