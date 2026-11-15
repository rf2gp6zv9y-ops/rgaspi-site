import { randomUUID } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";

export const requestSubmitSchema = z.object({
  name: z.string().trim().min(2).max(120),
  contact: z.string().trim().min(5).max(160),
  topic: z.string().trim().max(200).default(""),
  message: z.string().trim().min(10).max(4000),
  // Honeypot field: real visitors never see or fill it.
  company: z.string().max(500).default(""),
});

export type RequestSubmit = z.infer<typeof requestSubmitSchema>;

export type RequestStatus = "new" | "inProgress" | "done";

export type RequestRecord = {
  id: string;
  receivedAt: string;
  name: string;
  contact: string;
  topic: string;
  message: string;
  status: RequestStatus;
};

export const requestStatusSchema = z.enum(["new", "inProgress", "done"]);

const dataDir = path.join(process.cwd(), "data");
const requestsFile = path.join(dataDir, "requests.json");
export const DAILY_REQUEST_LIMIT = 500;

async function readAll(): Promise<RequestRecord[]> {
  try {
    const raw: unknown = JSON.parse(await readFile(requestsFile, "utf8"));
    return Array.isArray(raw) ? (raw as RequestRecord[]) : [];
  } catch {
    return [];
  }
}

let queue: Promise<unknown> = Promise.resolve();

function withLock<T>(fn: () => Promise<T>): Promise<T> {
  const run = queue.then(fn, fn);
  queue = run.catch(() => undefined);
  return run;
}

async function writeAll(records: RequestRecord[]): Promise<void> {
  await mkdir(dataDir, { recursive: true });
  const tmp = `${requestsFile}.tmp`;
  await writeFile(tmp, JSON.stringify(records, null, 2), "utf8");
  await rename(tmp, requestsFile);
}

export async function addRequest(input: RequestSubmit): Promise<RequestRecord> {
  return withLock(async () => {
    const records = await readAll();
    const record: RequestRecord = {
      id: randomUUID(),
      receivedAt: new Date().toISOString(),
      name: input.name,
      contact: input.contact,
      topic: input.topic,
      message: input.message,
      status: "new",
    };
    records.push(record);
    await writeAll(records);
    return record;
  });
}

export async function countTodayRequests(): Promise<number> {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const records = await readAll();
  return records.filter(
    (record) => new Date(record.receivedAt).getTime() >= start.getTime()
  ).length;
}

export async function listRequests(): Promise<RequestRecord[]> {
  const records = await readAll();
  return records.sort((a, b) => b.receivedAt.localeCompare(a.receivedAt));
}

export async function updateRequestStatus(
  id: string,
  status: RequestStatus
): Promise<boolean> {
  return withLock(async () => {
    const records = await readAll();
    const record = records.find((item) => item.id === id);
    if (!record) return false;
    record.status = status;
    await writeAll(records);
    return true;
  });
}

export async function deleteRequest(id: string): Promise<boolean> {
  return withLock(async () => {
    const records = await readAll();
    const next = records.filter((record) => record.id !== id);
    if (next.length === records.length) return false;
    await writeAll(next);
    return true;
  });
}
