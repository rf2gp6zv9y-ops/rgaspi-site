import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { Section } from "@/components/page-sections";
import MarkdownRenderer from "@/components/markdown-renderer";

export const metadata: Metadata = {
  title: "История архива",
  description: "История создания и развития РГАСПИ от 1904 года до наших дней",
};

export default function HistoryPage() {
  const filePath = path.join(process.cwd(), "src", "content", "history.md");
  const historyText = fs.readFileSync(filePath, "utf-8");

  return (
    <>
      <Section>
        <article className="max-w-3xl">
          <h1 className="mb-8 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            История архива
          </h1>
          <MarkdownRenderer content={historyText} />
        </article>
      </Section>
    </>
  );
}
