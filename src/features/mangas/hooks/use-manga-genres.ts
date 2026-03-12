// src/features/mangas/hooks/use-manga-genres.ts
import { useQuery } from "@tanstack/react-query";
import { mangaService } from "../services/manga-service";

export function useMangaGenres() {
  return useQuery({
    queryKey: ["mangas", "genres"],
    queryFn: () => mangaService.getGenres(),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
}
