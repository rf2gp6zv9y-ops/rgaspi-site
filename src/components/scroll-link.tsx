"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import type { LinkProps } from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { useEffect } from "react";

type ScrollLinkProps = LinkProps &
  ComponentPropsWithoutRef<"a"> & {
    scroll?: boolean;
  };

export function ScrollLink({
  href,
  scroll = true,
  children,
  onClick,
  ...props
}: ScrollLinkProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick: ComponentPropsWithoutRef<"a">["onClick"] = (e) => {
    onClick?.(e);
    if (e.defaultPrevented) return;

    const isSamePath =
      (typeof href === "string" ? href : String(href)) === pathname;

    if (isSamePath && scroll) {
      e.preventDefault();
      const hash = typeof href === "string" ? href.split("#")[1] : undefined;
      router.refresh();
      setTimeout(() => {
        if (hash) {
          document.getElementById(hash)?.scrollIntoView();
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 50);
    }
  };

  return (
    <Link href={href} onClick={handleClick} scroll={scroll} {...props}>
      {children}
    </Link>
  );
}
