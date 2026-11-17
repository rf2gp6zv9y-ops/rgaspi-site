// src/app/request/page.tsx
import type { Metadata } from "next";
import { Info, Mail, Send } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageHeader, Section } from "@/components/page-sections";
import { RequestForm } from "./request-form";
import site from "../site.json";

export const metadata: Metadata = {
  title: "Исполнение запросов",
  description: site.requests.intro,
};

export default function RequestsPage() {
  const { requests } = site;

  return (
    <>
      <PageHeader
        kicker="Услуги архива"
        title={requests.title}
        intro={requests.intro}
      />

      <Section>
        <div className="grid gap-4 sm:grid-cols-2">
          {requests.types.map((type) => (
            <Card key={type.title}>
              <CardHeader>
                <CardTitle className="text-lg">{type.title}</CardTitle>
                <CardDescription className="leading-relaxed">
                  {type.text}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </Section>

      <section className="border-y border-border bg-secondary/40">
        <div className="container grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="flex items-center gap-3">
              <Send className="h-6 w-6 text-primary" aria-hidden="true" />
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Как подать запрос
              </h2>
            </div>
            <ol className="mt-6 space-y-4">
              {requests.procedure.map((step, index) => (
                <li key={step} className="flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary font-serif text-sm font-bold text-primary-foreground"
                  >
                    {index + 1}
                  </span>
                  <p className="pt-1 text-sm leading-relaxed sm:text-base">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <Card className="h-fit">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" aria-hidden="true" />
                <CardTitle className="text-lg">Куда направить</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>
                Электронная почта:{" "}
                <a
                  href={`mailto:${site.contacts.email}`}
                  className="font-medium text-primary hover:underline"
                >
                  {site.contacts.email}
                </a>
              </p>
              <p>Адрес приёмной: {site.contacts.address}</p>
              <p>Приёмная работает: {site.contacts.officeHours}</p>
              <div className="flex items-start gap-2 rounded-md bg-secondary p-3">
                <Info
                  className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <p>{requests.note}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Send className="h-6 w-6 text-primary" aria-hidden="true" />
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Отправить запрос с сайта
              </h2>
            </div>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
              Заполните форму — ваша заявка будет отправлена напрямую в архив.
              Сотрудники рассмотрят её и свяжутся с вами по указанному контакту.
            </p>
          </div>
          <Card id="feedback">
            <CardContent className="pt-6">
              {/*
              <RequestForm
                email={site.contacts.email}
                defaultTopic="Замечание по прототипу сайта"
                compact
              />
              */}
            </CardContent>
          </Card>
        </div>
      </Section>
    </>
  );
}