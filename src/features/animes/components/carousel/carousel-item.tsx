import type { Anime } from "../../types/anime";
import { Star } from "lucide-react";
import { Link } from "react-router";

interface CarouselItemProps {
  anime: Anime;
  isActive: boolean;
  textRef: React.RefObject<HTMLDivElement | null>;
}

export const CarouselItem = ({
  anime,
  isActive,
  textRef,
}: CarouselItemProps) => (
  <div className="relative h-full w-full shrink-0 overflow-hidden">
    <picture>
      <source
        srcSet={
          anime.images.webp.large_image_url ||
          anime.images.jpg.large_image_url ||
          ""
        }
        type="image/webp"
      />
      <img
        src={anime.images.jpg.large_image_url || ""}
        alt={anime.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
    </picture>

    <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-transparent" />
    <div className="absolute inset-0 hidden bg-linear-to-r from-slate-950/80 via-transparent to-transparent lg:block" />

    <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-12 lg:p-20">
      <div
        ref={isActive ? textRef : null}
        className="max-w-3xl space-y-3 sm:space-y-4"
      >
        <div className="animate-text flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-1 rounded-full bg-yellow-500/20 px-3 py-1 text-sm font-bold text-yellow-500 backdrop-blur-md">
            <Star className="h-4 w-4 fill-current" />
            {anime.score?.toFixed(1) || "N/A"}
          </span>
          <span
            className={`rounded-full px-3 py-1 text-sm font-bold backdrop-blur-md ${
              anime.airing
                ? "bg-green-500/20 text-green-500"
                : "bg-slate-500/20 text-slate-300"
            }`}
          >
            {anime.airing ? "Em Exibição" : "Finalizado"}
          </span>
          {anime.type && (
            <span className="rounded-full bg-blue-500/20 px-3 py-1 text-sm font-bold text-blue-500 backdrop-blur-md">
              {anime.type}
            </span>
          )}
        </div>

        <h2 className="animate-text text-2xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-7xl">
          {anime.title}
        </h2>

        {anime.synopsis && (
          <p className="animate-text line-clamp-2 max-w-2xl text-sm text-slate-300 sm:line-clamp-3 sm:text-lg">
            {anime.synopsis}
          </p>
        )}

        <div className="animate-text pt-2 sm:pt-4">
          <Link
            to={`/anime/${anime.mal_id}`}
            className="inline-block rounded-full bg-white px-6 py-2.5 text-sm font-bold text-slate-950 transition-all hover:scale-105 hover:bg-slate-100 active:scale-95 sm:px-8 sm:py-3 sm:text-base"
          >
            Ver Detalhes
          </Link>
        </div>
      </div>
    </div>
  </div>
);
