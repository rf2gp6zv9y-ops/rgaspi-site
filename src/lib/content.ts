import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";

const nonEmpty = z.string().trim().min(1);

const navItem = z.object({ href: nonEmpty, label: nonEmpty });
const statItem = z.object({ value: nonEmpty, label: nonEmpty });
const newsItem = z.object({
  date: nonEmpty,
  title: nonEmpty,
  text: nonEmpty,
  href: nonEmpty,
});
const fundGroup = z.object({
  title: nonEmpty,
  description: nonEmpty,
  items: z.array(z.string()),
});
const hourItem = z.object({ days: nonEmpty, time: nonEmpty });
const requestType = z.object({ title: nonEmpty, text: nonEmpty });
const onlineExhibition = z.object({
  title: nonEmpty,
  year: nonEmpty,
  text: nonEmpty,
});
const edition = z.object({ title: nonEmpty, text: nonEmpty });
const factItem = z.object({ label: nonEmpty, value: nonEmpty });

export const siteContentSchema = z.object({
  title: nonEmpty,
  shortTitle: nonEmpty,
  description: nonEmpty,
  url: z.string().trim(),
  contacts: z.object({
    address: nonEmpty,
    email: nonEmpty,
    requestEmail: nonEmpty,
    phone: nonEmpty,
    phoneHref: nonEmpty,
    readingRoomHours: nonEmpty,
    officeHours: nonEmpty,
  }),
  nav: z.array(navItem),
  home: z.object({
    heroKicker: nonEmpty,
    heroTitle: nonEmpty,
    heroSubtitle: nonEmpty,
    heroPrimary: navItem,
    heroSecondary: navItem,
    stats: z.array(statItem),
    aboutTitle: nonEmpty,
    aboutText: nonEmpty,
    aboutBullets: z.array(z.string()),
    sectionsTitle: nonEmpty,
    sectionsText: nonEmpty,
    newsTitle: nonEmpty,
    newsText: nonEmpty,
    news: z.array(newsItem),
    ctaTitle: nonEmpty,
    ctaText: nonEmpty,
    ctaButton: navItem,
  }),
  funds: z.object({
    title: nonEmpty,
    intro: nonEmpty,
    groups: z.array(fundGroup),
    note: nonEmpty,
  }),
  readingRoom: z.object({
    title: nonEmpty,
    intro: nonEmpty,
    hours: z.array(hourItem),
    steps: z.array(z.string()),
    rules: z.array(z.string()),
    note: nonEmpty,
  }),
  requests: z.object({
    title: nonEmpty,
    intro: nonEmpty,
    types: z.array(requestType),
    procedure: z.array(z.string()),
    note: nonEmpty,
  }),
  exhibitions: z.object({
    title: nonEmpty,
    intro: nonEmpty,
    online: z.array(onlineExhibition),
    editions: z.array(edition),
    note: nonEmpty,
  }),
  about: z.object({
    title: nonEmpty,
    intro: nonEmpty,
    paragraphs: z.array(z.string()),
    facts: z.array(factItem),
    mission: nonEmpty,
  }),
  footer: z.object({
    tagline: nonEmpty,
    copyright: nonEmpty,
  }),
});

export type SiteContent = z.infer<typeof siteContentSchema>;

const contentFile = path.join(process.cwd(), "src", "app", "site.json");
const dataDir = path.join(process.cwd(), "data");
const backupFile = path.join(dataDir, "site.backup.json");

export async function readSiteContent(): Promise<SiteContent> {
  let raw: string;
  try {
    raw = await readFile(contentFile, "utf8");
  } catch {
    throw new Error("Не удалось прочитать файл контента сайта.");
  }
  const parsed = siteContentSchema.safeParse(JSON.parse(raw));
  if (!parsed.success) {
    throw new Error("Файл контента сайта не соответствует ожидаемой структуре.");
  }
  return parsed.data;
}

export async function writeSiteContent(
  value: unknown
): Promise<{ ok: true; content: SiteContent } | { ok: false; error: string }> {
  const parsed = siteContentSchema.safeParse(value);
  if (!parsed.success) {
    return {
      ok: false,
      error:
        "Контент не сохранён: проверьте, что все поля заполнены и структура разделов не нарушена.",
    };
  }
  await mkdir(dataDir, { recursive: true });
  const current = await readFile(contentFile, "utf8").catch(() => null);
  if (current !== null) {
    await writeFile(backupFile, current, "utf8");
  }
  const tmp = `${contentFile}.tmp`;
  await writeFile(tmp, `${JSON.stringify(parsed.data, null, 2)}\n`, "utf8");
  await rename(tmp, contentFile);
  return { ok: true, content: parsed.data };
}
