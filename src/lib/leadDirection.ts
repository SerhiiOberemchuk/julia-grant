/**
 * Крихітний «стор» обраного напряму (Старт / Масштабування), щоб кнопки
 * «Підходить мені» та CTA калькулятора попередньо вибирали напрям у формі.
 * Без бібліотек: CustomEvent + sessionStorage.
 */

export const DIRECTION_EVENT = "lead:direction";
const KEY = "lead.direction";

export function setLeadDirection(direction: string) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(KEY, direction);
  } catch {
    /* приватний режим — ігноруємо */
  }
  window.dispatchEvent(new CustomEvent<string>(DIRECTION_EVENT, { detail: direction }));
}

export function getLeadDirection(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return sessionStorage.getItem(KEY);
  } catch {
    return null;
  }
}

/**
 * Плавно прокручує до форми і фокусує перше поле.
 * Повертає false, якщо форми немає на поточній сторінці —
 * тоді викликач має виконати звичайну навігацію на /#contact.
 */
export function goToContact(): boolean {
  const el = document.getElementById("contact");
  if (!el) return false;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  window.setTimeout(() => {
    el.querySelector<HTMLInputElement>('input[name="name"]')?.focus({ preventScroll: true });
  }, 700);
  return true;
}
