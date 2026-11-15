import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/logo";
import { Separator } from "@/components/ui/separator";
import site from "@/app/site.json";

export function SiteFooter() {
  const { contacts, nav, footer } = site;

  return (
    <footer className="mt-16 border-t border-border bg-secondary/60">
      <div className="container grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo />
          <p className="text-sm leading-relaxed text-muted-foreground">
            {footer.tagline}
          </p>
        </div>

        <nav aria-label="Меню в подвале">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
            Разделы
          </h3>
          <ul className="mt-4 space-y-2.5">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
            Контакты
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <span>{contacts.address}</span>
            </li>
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <a
                href={`tel:${contacts.phoneHref}`}
                className="transition-colors hover:text-primary"
              >
                {contacts.phone}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <a
                href={`mailto:${contacts.email}`}
                className="transition-colors hover:text-primary"
              >
                {contacts.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <span>{contacts.readingRoomHours}</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
            Часы работы
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li>Читальный зал: {contacts.readingRoomHours}</li>
            <li>Приёмная: {contacts.officeHours}</li>
          </ul>
        </div>
      </div>

      <Separator />

      <div className="container py-5">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {footer.copyright}
        </p>
        <p className="mt-1 text-[10px] text-muted-foreground/50">
          <Link href="/admin/login" className="hover:text-muted-foreground">
            Администрирование
          </Link>
        </p>
      </div>
    </footer>
  );
}
