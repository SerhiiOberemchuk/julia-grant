/**
 * Відстеження конверсій. Google Ads підключається через env:
 *   NEXT_PUBLIC_GTAG_ID            — напр. AW-XXXXXXXXX (тег Google Ads)
 *   NEXT_PUBLIC_GADS_CONVERSION    — напр. AW-XXXXXXXXX/AbCdEfGhIjK (send_to конверсії)
 * Якщо змінні не задані — функції нічого не роблять.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export const GTAG_ID = process.env.NEXT_PUBLIC_GTAG_ID;
export const GADS_CONVERSION = process.env.NEXT_PUBLIC_GADS_CONVERSION;

export function trackLead(params: Record<string, string> = {}) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event: "lead_submit", ...params });

  if (window.gtag) {
    if (GADS_CONVERSION) {
      window.gtag("event", "conversion", { send_to: GADS_CONVERSION, ...params });
    }
    window.gtag("event", "generate_lead", params);
  }

  window.fbq?.("track", "Lead", params);
}

export function trackClick(name: string, params: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event: name, ...params });
  window.gtag?.("event", name, params);
}
