import { AnimeCard } from "./anime-card";
import { AnimeCardSkeleton } from "./skeletons";
import type { Anime } from "../types/anime";

interface AnimeGridProps {
  animes: Anime[];
  isLoading: boolean;
}

export function AnimeGrid({ animes, isLoading }: AnimeGridProps) {
  if (isLoading && animes.length === 0) {
    return (
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <AnimeCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!isLoading && animes.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-zinc-500">Nenhum anime encontrado.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {animes.map((anime) => (
        <AnimeCard key={anime.mal_id} anime={anime} />
      ))}
    </div>
  );
}
