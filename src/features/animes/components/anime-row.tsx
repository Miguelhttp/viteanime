import { useRef, useState, useEffect } from "react";
import { Link } from "react-router";
import type { Anime } from "../types/anime";
import { AnimeCard } from "./anime-card";
import { AnimeCardSkeleton } from "./skeletons";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface AnimeRowProps {
  title: string;
  animes: Anime[];
  isLoading?: boolean;
  viewAllHref?: string;
}

export function AnimeRow({
  title,
  animes,
  isLoading,
  viewAllHref,
}: AnimeRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth * 0.8
          : scrollLeft + clientWidth * 0.8;

      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    handleScroll();
  }, [animes]);

  if (isLoading) {
    return (
      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center justify-between px-1">
          <Skeleton className="h-8 w-48 bg-zinc-800" />
          <Skeleton className="h-4 w-16 bg-zinc-800" />
        </div>
        <div className="flex gap-3 overflow-hidden sm:gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-[140px] shrink-0 sm:w-[200px]">
              <AnimeCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!animes || animes.length === 0) return null;

  return (
    <section className="group/row relative w-full space-y-4 overflow-hidden sm:space-y-6">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-lg font-black tracking-tight text-white sm:text-2xl">
          {title}{" "}
          <span className="ml-2 text-[10px] font-medium text-zinc-600 sm:text-xs">
            ({animes.length})
          </span>
        </h2>
        {viewAllHref ? (
          <Link
            to={viewAllHref}
            className="group flex items-center gap-1 text-[10px] font-bold tracking-widest text-zinc-500 uppercase transition-colors hover:text-white sm:text-xs"
          >
            Ver Tudo
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        ) : (
          <span className="flex items-center gap-1 text-[10px] font-bold tracking-widest text-zinc-600 uppercase sm:text-xs">
            Ver Tudo
            <ChevronRight className="h-4 w-4" />
          </span>
        )}
      </div>

      <div className="relative">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={() => scroll("left")}
            className="absolute top-1/2 -left-4 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/5 bg-zinc-950/80 p-3 text-white shadow-2xl backdrop-blur-xl transition-all hover:scale-110 hover:bg-white hover:text-black md:flex"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={() => scroll("right")}
            className="absolute top-1/2 -right-4 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/5 bg-zinc-950/80 p-3 text-white shadow-2xl backdrop-blur-xl transition-all hover:scale-110 hover:bg-white hover:text-black md:flex"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="scrollbar-hide flex gap-3 overflow-x-auto scroll-smooth pb-4 transition-all sm:gap-6"
        >
          {animes.map((anime) => (
            <div key={anime.mal_id} className="w-[140px] shrink-0 sm:w-[200px]">
              <AnimeCard anime={anime} />
            </div>
          ))}
          {/* Spacing for end of scroll */}
          <div className="w-4 shrink-0 sm:w-8" />
        </div>
      </div>
    </section>
  );
}
