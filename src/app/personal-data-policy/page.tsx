import type { Metadata } from "next";
import { FileText, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader, Section } from "@/components/page-sections";

export const metadata: Metadata = {
  title: "Политика обработки персональных данных",
  description: "Документы политики обработки персональных данных РГАСПИ",
};

const documents = [
  {
    title: "Приказ №108 от 15.09.2025 — Об утверждении политики обработки ПД",
    href: "/documents/politics-pd-prize-108.pdf",
  },
  {
    title: "Приказ №108 от 15.09.2025 — Приложение",
    href: "/documents/politics-pd-attachment.pdf",
  },
];

export default function PersonalDataPolicyPage() {
  return (
    <>
      <PageHeader
        kicker="Документы"
        title="Политика обработки персональных данных"
        intro="Нормативные документы, регулирующие обработку и защиту персональных данных в РГАСПИ."
      />

      <Section>
        <div className="max-w-2xl space-y-4">
          {documents.map((doc) => (
            <a
              key={doc.href}
              href={doc.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Card className="group cursor-pointer transition-colors hover:border-primary/40 hover:bg-accent">
                <CardContent className="flex items-center gap-4 p-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{doc.title}</h3>
                    <p className="text-sm text-muted-foreground">PDF • Открыть в новой вкладке</p>
                  </div>
                  <Download className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </Section>
    </>
  );
}
