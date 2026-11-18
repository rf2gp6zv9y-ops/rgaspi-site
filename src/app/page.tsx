// src/app/page.tsx
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  FileSearch,
  Landmark,
  ScrollText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Section, SectionHeading } from "@/components/page-sections";
import { HeroCarousel } from "@/components/hero-carousel";
import site from "./site.json";

const sectionIcons = {
  "/funds": ScrollText,
  "/reading-room": BookOpen,
  "/requests": FileSearch,
  "/exhibitions": Landmark,
  "/about": ArrowRight,
} as const;

export default function HomePage() {
  const { home, nav } = site;
  const sections = nav.filter((item) => item.href !== "/");

  return (
    <>
      {/* News Carousel */}
      <section className="border-b border-border bg-secondary/30">
        <div className="container pb-2 pt-4">

          <div className="flex flex-wrap items-center gap-3 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-900">
            <span className="shrink-0 rounded bg-amber-400 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-amber-950">
              Прототип
            </span>
            <span className="min-w-0 flex-1">
              Это прототип сайта. Информация, новости и разделы носят демонстрационный характер и будут заменены на актуальные материалы.
            </span>
            <Button asChild variant="outline" size="sm" className="shrink-0">
              <Link href="/requests#feedback">Оставить замечание или пожелание</Link>
            </Button>
          </div>

        </div>
        < div className="container pb-4 pt-2">
          <HeroCarousel news={home.news.slice(0, 5)} autoPlayInterval={6000} />
        </div>
      </section>
      {/* Hero */}
      <section className="border-b border-border bg-secondary/50">
        <div className="container grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              {home.heroKicker}
            </p>
            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              {home.heroTitle}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {home.heroSubtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href={home.heroPrimary.href}>
                  {home.heroPrimary.label}
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href={home.heroSecondary.href}>
                  {home.heroSecondary.label}
                </Link>
              </Button>
            </div>

            <dl className="mt-10 grid max-w-xl grid-cols-1 gap-6 border-t border-border pt-8 sm:grid-cols-3">
              {home.stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-serif text-2xl font-bold text-primary sm:text-3xl">
                    {stat.value}
                  </dd>
                  <dd className="mt-1 text-sm text-muted-foreground">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <Image
              src={process.env.NODE_ENV === 'production' ? "/rgaspi-site/images/hero.webp" : "/images/hero.webp"}
              alt="Читальный зал архива"
              width={1024}
              height={683}
              priority
              className="h-auto w-full rounded-lg border border-border object-cover shadow-md"
            />
          </div>
        </div>
      </section>

      {/* About */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading title={home.aboutTitle} text={home.aboutText} />
          <ul className="grid gap-4 sm:grid-cols-2">
            {home.aboutBullets.map((bullet) => (
              <li
                key={bullet}
                className="rounded-lg border border-border bg-card p-4 text-sm leading-relaxed text-foreground shadow-sm"
              >
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Sections */}
      <section className="border-y border-border bg-secondary/40">
        <div className="container py-12 sm:py-16">
          <SectionHeading
            title={home.sectionsTitle}
            text={home.sectionsText}
          />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map((item) => {
              const Icon =
                sectionIcons[item.href as keyof typeof sectionIcons] ??
                ArrowRight;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex h-full flex-col rounded-lg border border-border bg-card p-5 shadow-sm transition-colors hover:border-primary/40 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <Icon
                      className="h-6 w-6 text-primary"
                      aria-hidden="true"
                    />
                    <span className="mt-4 font-serif text-lg font-bold">
                      {item.label}
                    </span>
                    <span className="mt-2 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors group-hover:text-primary">
                      Перейти в раздел
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* News Cards */}
      <Section>
        <div className="flex items-end justify-between">
          <SectionHeading title={home.newsTitle} text={home.newsText} />
          {home.news.length > 6 && (
            <Link
              href="/news"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              Все новости
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {home.news.slice(0, 6).map((item) => (
            <Card key={item.title} className="group flex flex-col overflow-hidden">
              <div className="relative aspect-[16/10]">
                <Image
                  src={`${process.env.NODE_ENV === 'production' ? '/rgaspi-site' : ''}${item.image || "/images/hero.webp"}`}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <p className="absolute bottom-3 left-3 text-xs font-semibold uppercase tracking-wider text-white">
                  {item.date}
                </p>
              </div>
              <CardHeader>
                <CardTitle className="text-lg leading-snug">
                  {item.title}
                </CardTitle>
                <CardDescription className="mt-2 leading-relaxed">
                  {item.text}
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                {item.href !== "/void" && (
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    Подробнее
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        {home.news.length > 6 && (
          <div className="mt-6 text-right">
            <Link
              href="/news"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              Все новости
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </Section>

      {/* CTA */}
      <Section className="pb-16">
        <div className="rounded-xl border border-primary/25 bg-primary px-6 py-10 text-primary-foreground sm:px-10">
          <h2 className="font-serif text-2xl font-bold tracking-tight sm:text-3xl">
            {home.ctaTitle}
          </h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-primary-foreground/90">
            {home.ctaText}
          </p>
          <Button
            asChild
            size="lg"
            className="mt-6 bg-background text-primary hover:bg-background/90"
          >
            <Link href={home.ctaButton.href}>{home.ctaButton.label}</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
