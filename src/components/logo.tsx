import { ScrollLink } from "@/components/scroll-link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <ScrollLink
      href="/"
      className={cn(
        "group inline-flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm",
        className
      )}
    >
      <span
        aria-hidden="true"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-primary font-serif text-xl font-bold text-primary-foreground transition-colors group-hover:bg-primary/90"
      >
        Р
      </span>
      <span className="flex flex-col leading-tight">
        <span className="font-serif text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
          РГАСПИ
        </span>
        <span className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          Архив социально-политической истории
        </span>
      </span>
    </ScrollLink>
  );
}
