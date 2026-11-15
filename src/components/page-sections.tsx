import { cn } from "@/lib/utils";

type PageHeaderProps = {
  kicker: string;
  title: string;
  intro: string;
};

export function PageHeader({ kicker, title, intro }: PageHeaderProps) {
  return (
    <div className="border-b border-border bg-secondary/50">
      <div className="container py-12 sm:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          {kicker}
        </p>
        <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {intro}
        </p>
      </div>
    </div>
  );
}

export function SectionHeading({
  title,
  text,
  className,
}: {
  title: string;
  text?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
      {text ? (
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          {text}
        </p>
      ) : null}
    </div>
  );
}

export function Section({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("container py-12 sm:py-16", className)}>
      {children}
    </section>
  );
}
