// src/components/logo.tsx
import { ScrollLink } from "@/components/scroll-link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <ScrollLink
      href="/"
      className={cn(
        "group inline-flex items-center gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm",
        className
      )}
    >
      <img
        src="/favicon.svg"
        alt="РГАСПИ"
        className="-mt-4 h-20 w-20 shrink-0 transition-opacity group-hover:opacity-90"
      />
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
