// src/features/mangas/hooks/use-search-mangas.ts
import { useQuery } from "@tanstack/react-query";
import {
  mangaService,
  type MangaSearchParams,
} from "../services/manga-service";

export function useSearchMangas(params: MangaSearchParams) {
  return useQuery({
    queryKey: ["mangas", "search", params],
    queryFn: () => mangaService.searchMangas(params),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 5,
  });
}
