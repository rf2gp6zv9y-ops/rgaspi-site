import {
  createHmac,
  randomBytes,
  scryptSync,
  timingSafeEqual,
} from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { cookies } from "next/headers";

const SESSION_COOKIE = "rgaspi_admin_session";
const SESSION_TTL_MS = 12 * 60 * 60 * 1000;
const DEFAULT_PASSWORD = "rgaspi2025";

type AdminConfig = {
  passwordHash: string;
  sessionSecret: string;
};

const dataDir = path.join(process.cwd(), "data");
const adminFile = path.join(dataDir, "admin.json");

function hashPassword(password: string, salt?: string): string {
  const saltHex = salt ?? randomBytes(16).toString("hex");
  const hashHex = scryptSync(password, saltHex, 64).toString("hex");
  return `${saltHex}:${hashHex}`;
}

function verifyPassword(password: string, stored: string): boolean {
  const [saltHex, hashHex] = stored.split(":");
  if (!saltHex || !hashHex) return false;
  const actual = scryptSync(password, saltHex, 64);
  const expected = Buffer.from(hashHex, "hex");
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

async function loadConfig(): Promise<AdminConfig> {
  try {
    const parsed: unknown = JSON.parse(await readFile(adminFile, "utf8"));
    if (
      parsed &&
      typeof parsed === "object" &&
      typeof (parsed as AdminConfig).passwordHash === "string" &&
      typeof (parsed as AdminConfig).sessionSecret === "string"
    ) {
      return parsed as AdminConfig;
    }
  } catch {
    // First run: create the config with the bootstrap password.
  }
  const config: AdminConfig = {
    passwordHash: hashPassword(DEFAULT_PASSWORD),
    sessionSecret: randomBytes(32).toString("hex"),
  };
  await mkdir(dataDir, { recursive: true });
  const tmp = `${adminFile}.tmp`;
  await writeFile(tmp, JSON.stringify(config, null, 2), "utf8");
  await rename(tmp, adminFile);
  return config;
}

function sign(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("hex");
}

export async function checkPassword(password: string): Promise<boolean> {
  const config = await loadConfig();
  return verifyPassword(password, config.passwordHash);
}

export async function createSession(): Promise<void> {
  const config = await loadConfig();
  const expiresAt = Date.now() + SESSION_TTL_MS;
  const payload = String(expiresAt);
  const token = `${payload}.${sign(payload, config.sessionSecret)}`;
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  });
}

export async function destroySession(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;
  const expiresAt = Number(payload);
  if (!Number.isFinite(expiresAt) || expiresAt <= Date.now()) return false;
  const config = await loadConfig();
  const expected = Buffer.from(sign(payload, config.sessionSecret), "hex");
  const actual = Buffer.from(signature, "hex");
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export async function changePassword(
  currentPassword: string,
  newPassword: string
): Promise<boolean> {
  const config = await loadConfig();
  if (!verifyPassword(currentPassword, config.passwordHash)) return false;
  const nextConfig: AdminConfig = {
    ...config,
    passwordHash: hashPassword(newPassword),
  };
  await mkdir(dataDir, { recursive: true });
  const tmp = `${adminFile}.tmp`;
  await writeFile(tmp, JSON.stringify(nextConfig, null, 2), "utf8");
  await rename(tmp, adminFile);
  return true;
}
