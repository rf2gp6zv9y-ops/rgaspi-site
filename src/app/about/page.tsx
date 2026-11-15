import type { Metadata } from "next";
import Image from "next/image";
import { Quote } from "lucide-react";
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
              src="/images/documents.webp"
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
