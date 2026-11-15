import type { Metadata } from "next";
import { CheckCircle2, Info } from "lucide-react";
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
  title: "Фонды архива",
  description: site.funds.intro,
};

export default function FundsPage() {
  const { funds } = site;

  return (
    <>
      <PageHeader
        kicker="Разделы архива"
        title={funds.title}
        intro={funds.intro}
      />

      <Section>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {funds.groups.map((group) => (
            <Card key={group.title} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg leading-snug">
                  {group.title}
                </CardTitle>
                <CardDescription className="leading-relaxed">
                  {group.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <ul className="space-y-2 border-t border-border pt-4">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-foreground"
                    >
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 flex items-start gap-3 rounded-lg border border-border bg-secondary/60 p-4 text-sm leading-relaxed text-muted-foreground">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
          <p>{funds.note}</p>
        </div>
      </Section>
    </>
  );
}
