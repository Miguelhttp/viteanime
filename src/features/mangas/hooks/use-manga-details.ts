// src/features/mangas/hooks/use-manga-details.ts
import { useQuery } from "@tanstack/react-query";
import { mangaService } from "../services/manga-service";

export function useMangaDetails(id: number) {
  return useQuery({
    queryKey: ["mangas", "details", id],
    queryFn: () => mangaService.getMangaById(id),
    staleTime: 1000 * 60 * 60,
  });
}
