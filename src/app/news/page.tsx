import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageHeader, Section } from "@/components/page-sections";
import site from "../site.json";

export const metadata: Metadata = {
  title: "Новости и события",
  description: "Последние новости и события РГАСПИ",
};

export default function NewsPage() {
  const news = site.home.news;

  return (
    <>
      <PageHeader
        kicker="Новости"
        title="Новости и события"
        intro="Выставки, новые поступления и проекты архива."
      />

      <Section>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {news.map((item) => (
            <Card key={item.title} className="group flex flex-col overflow-hidden">
              <div className="relative aspect-[16/10]">
                <Image
                  src={item.image || "/images/hero.webp"}
                  alt={item.title}
                  fill
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
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  Подробнее
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
