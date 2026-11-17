"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NewsItem = {
  date: string;
  title: string;
  text: string;
  shortText?: string;
  href: string;
  image?: string;
};

type HeroCarouselProps = {
  news: NewsItem[];
  autoPlayInterval?: number;
};

export function HeroCarousel({ news, autoPlayInterval = 5000 }: HeroCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex((prev) => (prev + index + news.length) % news.length);
    },
    [news.length]
  );

  const next = useCallback(() => goTo(1), [goTo]);
  const prev = useCallback(() => goTo(-1), [goTo]);

  useEffect(() => {
    if (isPaused) return;
    intervalRef.current = setInterval(next, autoPlayInterval);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, next, autoPlayInterval]);

  if (!news.length) return null;

  const currentItem = news[activeIndex];

  return (
    <div
      className="relative h-[400px] sm:h-[480px] lg:h-[560px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      {news.map((item, index) => (
        <div
          key={item.title}
          className={cn(
            "absolute inset-0 transition-all duration-700 ease-in-out",
            index === activeIndex
              ? "opacity-100 scale-100"
              : "opacity-0 scale-105 pointer-events-none"
          )}
        >
          {/* Background image */}
          <div className="absolute inset-0">
            <Image
              src={item.image || "/images/hero.webp"}
              alt={item.title}
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10" />
          </div>

          {/* Content overlay */}
          <div className="relative flex h-full items-end">
            <div className="container pb-16 sm:pb-20 lg:pb-24">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                  {item.date}
                </p>
                <h2 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
                  {item.title}
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
                  {item.shortText || item.text}
                </p>
                {item.href !== "/void" && (
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="mt-6 border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
                  >
                    <Link href={item.href}>
                      Подробнее
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation arrows */}
      <button
        type="button"
        onClick={prev}
        //className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/30 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/50"
        className="absolute bottom-6 left-4 rounded-full border border-white/15 bg-black/10 p-2 text-white/70 backdrop-blur-[2px] transition-colors hover:bg-black/30 hover:text-white"
        aria-label="Предыдущая новость"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={next}
        //className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/30 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/50"
        className="absolute bottom-6 right-4 rounded-full border border-white/15 bg-black/10 p-2 text-white/70 backdrop-blur-[2px] transition-colors hover:bg-black/30 hover:text-white"
        aria-label="Следующая новость"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
        {news.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              index === activeIndex
                ? "w-8 bg-white"
                : "w-2 bg-white/40 hover:bg-white/60"
            )}
            aria-label={`Перейти к новости ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
