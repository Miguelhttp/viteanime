// src/features/mangas/hooks/use-top-mangas.ts
import { useQuery } from "@tanstack/react-query";
import { mangaService } from "../services/manga-service";

export function useTopMangas(page = 1) {
  return useQuery({
    queryKey: ["mangas", "top", page],
    queryFn: () => mangaService.getTopMangas(page),
    staleTime: 1000 * 60 * 30,
  });
}
