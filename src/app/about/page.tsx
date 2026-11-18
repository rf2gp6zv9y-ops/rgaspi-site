import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FileText, Gavel, Heart, History, Scale } from "lucide-react";
import { Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader, Section, SectionHeading } from "@/components/page-sections";
import site from "../site.json";

export const metadata: Metadata = {
  title: "Об архиве",
  description: site.about.intro,
};

export default function AboutPage() {
  const { about } = site;

  return (
    <>
      <PageHeader
        kicker="О организации"
        title={about.title}
        intro={about.intro}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5 text-base leading-relaxed text-foreground">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>

          <div className="space-y-6">
            <Image
              src="/rgaspi-site/images/documents.webp"
              alt="Архивные документы крупным планом"
              width={768}
              height={1024}
              className="h-auto w-full rounded-lg border border-border object-cover shadow-md"
            />
            <figure className="rounded-lg border-l-4 border-primary bg-secondary/60 p-5">
              <Quote className="h-5 w-5 text-primary" aria-hidden="true" />
              <blockquote className="mt-2 font-serif text-lg italic leading-relaxed text-foreground">
                {about.mission}
              </blockquote>
            </figure>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading title="Документы и информация" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Card className="group cursor-pointer transition-colors hover:border-primary/40 hover:bg-accent">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Scale className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Устав РГАСПИ</h3>
                <p className="text-sm text-muted-foreground">Основные положения и положения о деятельности</p>
              </div>
            </CardContent>
          </Card>

          <Link href="/personal-data-policy">
            <Card className="group cursor-pointer transition-colors hover:border-primary/40 hover:bg-accent">
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Политика обработки персональных данных</h3>
                  <p className="text-sm text-muted-foreground">Нормативные документы и приказы</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/personal-data-policy">
            <Card className="group cursor-pointer transition-colors hover:border-primary/40 hover:bg-accent">
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Gavel className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Противодействие коррупции</h3>
                  <p className="text-sm text-muted-foreground">Нормативные документы</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/about/history">
            <Card className="group cursor-pointer transition-colors hover:border-primary/40 hover:bg-accent">
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <History className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">История архива</h3>
                  <p className="text-sm text-muted-foreground">Ключевые вехи и события</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Card className="group cursor-pointer transition-colors hover:border-primary/40 hover:bg-accent">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Heart className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Вакансии</h3>
                <p className="text-sm text-muted-foreground">Открытые позиции и требования</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      <section className="border-t border-border bg-secondary/40">
        <div className="container py-12 sm:py-16">
          <SectionHeading title="Архив в цифрах и фактах" />
          <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {about.facts.map((fact) => (
              <div
                key={fact.label}
                className="rounded-lg border border-border bg-card p-5 shadow-sm"
              >
                <dd className="font-serif text-xl font-bold text-primary">
                  {fact.value}
                </dd>
                <dt className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {fact.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
