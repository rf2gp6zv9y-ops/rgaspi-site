/**
 * Утилиты для хеширования пароля и управления сессией администратора.
 *
 * Пароль хранится в переменной окружения ADMIN_PASSWORD как SHA-256 хеш.
 * При входе проверяется хеш и устанавливается cookie-сессия.
 */

const SESSION_COOKIE = "rgaspi_admin_session";

export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function getSessionCookieName(): string {
  return SESSION_COOKIE;
}

export async function verifyPassword(
  plain: string
): Promise<boolean> {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const provided = await hashPassword(plain);
  return provided === expected;
}
