import type { Metadata } from "next";
import { CalendarCheck, Info, ListChecks } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageHeader, Section, SectionHeading } from "@/components/page-sections";
import site from "../site.json";

export const metadata: Metadata = {
  title: "Читальный зал",
  description: site.readingRoom.intro,
};

export default function ReadingRoomPage() {
  const { readingRoom } = site;

  return (
    <>
      <PageHeader
        kicker="Работа с документами"
        title={readingRoom.title}
        intro={readingRoom.intro}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading title="Часы работы" />
            <ul className="mt-6 divide-y divide-border rounded-lg border border-border bg-card shadow-sm">
              {readingRoom.hours.map((row) => (
                <li
                  key={row.days}
                  className="flex items-center justify-between gap-4 px-4 py-3 text-sm"
                >
                  <span className="text-muted-foreground">{row.days}</span>
                  <span className="font-medium text-foreground">{row.time}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {readingRoom.note}
            </p>
          </div>

          <div>
            <SectionHeading title="Как начать работу" />
            <ol className="mt-6 space-y-4">
              {readingRoom.steps.map((step, index) => (
                <li key={step} className="flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary font-serif text-sm font-bold text-primary-foreground"
                  >
                    {index + 1}
                  </span>
                  <p className="pt-1 text-sm leading-relaxed text-foreground sm:text-base">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      <section className="border-t border-border bg-secondary/40">
        <div className="container grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="flex items-center gap-3">
              <ListChecks className="h-6 w-6 text-primary" aria-hidden="true" />
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Правила работы в зале
              </h2>
            </div>
            <ul className="mt-6 space-y-3">
              {readingRoom.rules.map((rule) => (
                <li
                  key={rule}
                  className="rounded-lg border border-border bg-card p-4 text-sm leading-relaxed shadow-sm"
                >
                  {rule}
                </li>
              ))}
            </ul>
          </div>

          <Card className="h-fit">
            <CardHeader>
              <div className="flex items-center gap-3">
                <CalendarCheck className="h-5 w-5 text-primary" aria-hidden="true" />
                <CardTitle className="text-lg">Запись на посещение</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>
                Телефон:{" "}
                <a
                  href={`tel:${site.contacts.phoneHref}`}
                  className="font-medium text-primary hover:underline"
                >
                  {site.contacts.phone}
                </a>
              </p>
              <p>
                Электронная почта:{" "}
                <a
                  href={`mailto:${site.contacts.email}`}
                  className="font-medium text-primary hover:underline"
                >
                  {site.contacts.email}
                </a>
              </p>
              <div className="flex items-start gap-2 rounded-md bg-secondary p-3">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <p>
                  В первый визит возьмите документ, удостоверяющий личность, и
                  прикиньте темы: сотрудники помогут подобрать фонды.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
