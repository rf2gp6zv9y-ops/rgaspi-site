const WINDOW_MS = 15 * 60 * 1000;
const BURST_LIMIT = 3;
const DAY_MS = 24 * 60 * 60 * 1000;
const DAY_LIMIT = 10;
const MAX_KEYS = 1000;

const hits = new Map<string, number[]>();

export function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const stamps = (hits.get(key) ?? []).filter((time) => now - time < DAY_MS);
  const bursts = stamps.filter((time) => now - time < WINDOW_MS).length;
  const allowed = bursts < BURST_LIMIT && stamps.length < DAY_LIMIT;
  if (allowed) stamps.push(now);
  hits.set(key, stamps);
  if (hits.size > MAX_KEYS) {
    for (const [mapKey, times] of hits) {
      if (times.every((time) => now - time >= DAY_MS)) hits.delete(mapKey);
    }
  }
  return allowed;
}
