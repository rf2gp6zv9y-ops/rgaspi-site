import type { Metadata } from "next";
import { BookMarked, Info, Library } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageHeader, Section, SectionHeading } from "@/components/page-sections";
import site from "../site.json";

export const metadata: Metadata = {
  title: "Выставки и издания",
  description: site.exhibitions.intro,
};

export default function ExhibitionsPage() {
  const { exhibitions } = site;

  return (
    <>
      <PageHeader
        kicker="Проекты архива"
        title={exhibitions.title}
        intro={exhibitions.intro}
      />

      <Section>
        <SectionHeading
          title="Онлайн-выставки"
          text="Документы из фондов архива в тематических подборках — их можно посмотреть с любого устройства."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {exhibitions.online.map((item) => (
            <Card key={item.title} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <BookMarked
                    className="h-5 w-5 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <CardTitle className="text-lg leading-snug">
                    {item.title}
                  </CardTitle>
                </div>
                <CardDescription className="mt-2 leading-relaxed">
                  {item.text}
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <p className="text-sm font-medium text-muted-foreground">
                  {item.year}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <section className="border-y border-border bg-secondary/40">
        <div className="container py-12 sm:py-16">
          <div className="flex items-center gap-3">
            <Library className="h-6 w-6 text-primary" aria-hidden="true" />
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Издания архива
            </h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {exhibitions.editions.map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-border bg-card p-5 shadow-sm"
              >
                <h3 className="font-serif text-lg font-bold leading-snug">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex items-start gap-3 rounded-lg border border-border bg-secondary/60 p-4 text-sm leading-relaxed text-muted-foreground">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            <p>{exhibitions.note}</p>
          </div>
        </div>
      </section>
    </>
  );
}
