import { useQuery } from "@tanstack/react-query";
import { animeService } from "../services/anime-service";

export function useAnimeRecommendations(id: number) {
  return useQuery({
    queryKey: ["animes", "recommendations", id],
    queryFn: () => animeService.getAnimeRecommendations(id),
    staleTime: 1000 * 60 * 60, // 1 hora
    enabled: !!id,
  });
}
