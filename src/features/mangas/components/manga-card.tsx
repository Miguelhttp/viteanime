// src/features/mangas/components/manga-card.tsx
import { useNavigate } from "react-router";
import type { Manga } from "../types/manga";
import { Star, BookOpen } from "lucide-react";
import { OptimizedImage } from "@/shared/components/ui/optimized-image";

interface MangaCardProps {
  manga: Manga;
}

export function MangaCard({ manga }: MangaCardProps) {
  const navigate = useNavigate();
  const year = manga.published?.prop?.from?.year;
  const genres = manga.genres
    ?.slice(0, 2)
    .map((g) => g.name)
    .join(", ");

  return (
    <div
      onClick={() => navigate(`/manga/${manga.mal_id}`)}
      className="group relative aspect-2/3 w-full min-w-35 cursor-pointer overflow-hidden rounded-xl bg-zinc-900 transition-all duration-500 hover:scale-105 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] sm:min-w-50"
    >
      {/* Poster */}
      <OptimizedImage
        src={
          manga.images.webp.image_url || manga.images.jpg.image_url || undefined
        }
        alt={manga.title}
        className="group-hover:scale-110"
        containerClassName="h-full w-full"
      />

      {/* Hover Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black via-black/40 to-transparent p-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:p-5">
        <div className="translate-y-4 transition-all duration-500 ease-out group-hover:translate-y-0">
          <div className="flex items-center gap-2 text-[10px] font-black tracking-widest text-zinc-400 uppercase">
            <span className="rounded-sm bg-white/10 px-1.5 py-0.5 backdrop-blur-md">
              {manga.type || "Manga"}
            </span>
            {year && (
              <>
                <span className="h-1 w-1 rounded-full bg-zinc-600" />
                <span>{year}</span>
              </>
            )}
          </div>

          <h3 className="group-hover:text-primary mt-1 line-clamp-1 text-sm leading-tight font-black text-white transition-colors sm:mt-2 sm:text-base">
            {manga.title}
          </h3>

          <div className="mt-2 hidden space-y-2 transition-all delay-100 duration-500 group-hover:block">
            {genres && (
              <p className="line-clamp-1 text-[10px] font-medium text-blue-400/80">
                {genres}
              </p>
            )}
            <p className="line-clamp-2 text-[10px] leading-relaxed text-zinc-300 sm:line-clamp-3">
              {manga.synopsis || "Sem sinopse disponível."}
            </p>
          </div>

          <div className="mt-2 flex items-center justify-between sm:mt-4">
            <div className="flex items-center gap-1.5 rounded-lg bg-yellow-500/10 px-2 py-1 text-yellow-500 ring-1 ring-yellow-500/20 backdrop-blur-md">
              <Star className="h-3 w-3 fill-current sm:h-3.5 sm:w-3.5" />
              <span className="text-[10px] font-black sm:text-xs">
                {manga.score?.toFixed(1) || "N/A"}
              </span>
            </div>

            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all hover:scale-110 active:scale-95 sm:h-10 sm:w-10">
              <BookOpen className="h-4 w-4 fill-current sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
