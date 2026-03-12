// src/features/mangas/components/manga-grid.tsx
import { MangaCard } from "./manga-card";
import { MangaCardSkeleton } from "./manga-skeletons";
import type { Manga } from "../types/manga";

interface MangaGridProps {
  mangas: Manga[];
  isLoading: boolean;
}

export function MangaGrid({ mangas, isLoading }: MangaGridProps) {
  if (isLoading && mangas.length === 0) {
    return (
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <MangaCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!isLoading && mangas.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-zinc-500">Nenhum mangá encontrado.</p>
      </div>
    );
  }

  const uniqueMangas = Array.from(
    new Map(mangas.map((m) => [m.mal_id, m])).values(),
  );

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {uniqueMangas.map((manga) => (
        <MangaCard key={manga.mal_id} manga={manga} />
      ))}
    </div>
  );
}
