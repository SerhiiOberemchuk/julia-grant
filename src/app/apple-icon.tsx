import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const INK = "#232455";
const GOLD = "#ab8115";

/** Іконка для iOS «На головний екран» — той самий знак, що в логотипі, на синьому тлі */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: INK,
        }}
      >
        <svg width="132" height="132" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="19" fill="none" stroke={GOLD} strokeWidth="1.6" />
          <path
            d="M13 21l5 5 10-12"
            fill="none"
            stroke={GOLD}
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    size,
  );
}
