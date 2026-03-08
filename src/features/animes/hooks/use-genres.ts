import { useQuery } from "@tanstack/react-query";
import { animeService } from "../services/anime-service";

export function useGenres() {
  return useQuery({
    queryKey: ["animes", "genres"],
    queryFn: () => animeService.getGenres(),
    staleTime: 1000 * 60 * 60 * 24, // 24 horas (gêneros raramente mudam)
  });
}
