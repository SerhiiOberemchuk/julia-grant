import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/content/site";

export const alt = `${site.brand.name} — ${site.hero.titleA} ${site.hero.titleAmount} ${site.hero.titleB}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Satori не бачить next/font і public/ — усе читається з assets/ на збірці
const unbounded = await readFile(join(process.cwd(), "assets/unbounded-600.ttf"));
const mono = await readFile(join(process.cwd(), "assets/jetbrains-mono-500.ttf"));
// Банер клієнтки з OLX (700×700) — джерело public/images/olx-image.webp, для Satori збережений як JPEG
const photo = await readFile(join(process.cwd(), "assets/og-photo.jpg"));
const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;
// Монограма «ЮЛ» з логотипа, перефарбована в колір паперу (джерело public/images/logo.jpg)
const mark = await readFile(join(process.cwd(), "assets/logo-mark-paper.png"));
const markSrc = `data:image/png;base64,${mark.toString("base64")}`;
const MARK_RATIO = 705 / 388; // ширина/висота монограми

const PAPER = "#fffff0";
const MARKER = "#f0dfa6";
// синій із самого банера, щоб панель зливалася з фото без шва
const NAVY = "#0a203f";
const NAVY_DEEP = "#081c3a";

const PHOTO = size.height; // квадрат 630×630 ліворуч
const PANEL = size.width - PHOTO; // 570px праворуч

/** Картка для соцмереж і месенджерів: банер клієнтки + бренд-панель у палітрі сайту */
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
          background: NAVY,
          color: PAPER,
          fontFamily: "Unbounded",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- Satori приймає лише <img> */}
        <img src={photoSrc} width={PHOTO} height={PHOTO} alt="" style={{ display: "flex" }} />

        <div
          style={{
            width: PANEL,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "52px 56px 48px 48px",
            background: `linear-gradient(180deg, ${NAVY} 0%, ${NAVY_DEEP} 100%)`,
            position: "relative",
          }}
        >
          {/* водяний знак — монограма з логотипа, зрізана краєм */}
          <div style={{ position: "absolute", right: -120, bottom: -60, display: "flex", opacity: 0.07 }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- Satori приймає лише <img> */}
            <img src={markSrc} width={420} height={420 / MARK_RATIO} alt="" />
          </div>

          {/* Шапка: монограма з логотипа + ім'я, як на самому лого */}
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- Satori приймає лише <img> */}
            <img src={markSrc} width={54 * MARK_RATIO} height={54} alt="" />
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div style={{ fontSize: 24, letterSpacing: "-0.01em" }}>Юлія Лукащук</div>
              <div style={{ fontFamily: "JetBrains Mono", fontSize: 12, letterSpacing: "0.12em", color: MARKER }}>
                {site.brand.tagline.toUpperCase()}
              </div>
            </div>
          </div>

          {/* Заголовок */}
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <div style={{ fontFamily: "JetBrains Mono", fontSize: 14, letterSpacing: "0.1em", color: MARKER, marginBottom: 16 }}>
              {"єРобота · Дія · безповоротна допомога".toUpperCase()}
            </div>
            <div style={{ fontSize: 40, lineHeight: 1.15, letterSpacing: "-0.02em" }}>{site.hero.titleA}</div>
            <div style={{ fontSize: 76, lineHeight: 1.05, letterSpacing: "-0.03em", color: MARKER }}>
              {site.hero.titleAmount}
            </div>
            <div style={{ fontSize: 40, lineHeight: 1.15, letterSpacing: "-0.02em" }}>{site.hero.titleB}</div>
          </div>

          {/* Підвал */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              borderTop: `1px solid rgba(255, 255, 240, 0.18)`,
              paddingTop: 20,
              fontFamily: "JetBrains Mono",
              fontSize: 16,
              letterSpacing: "0.02em",
              color: "rgba(255, 255, 240, 0.72)",
            }}
          >
            <div style={{ display: "flex" }}>
              {fact.value}
              {fact.suffix} {fact.label} · бізнес-план і супровід
            </div>
            <div style={{ display: "flex", color: PAPER }}>{domain}</div>
          </div>
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
