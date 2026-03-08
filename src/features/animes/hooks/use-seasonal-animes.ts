import { useQuery } from "@tanstack/react-query";
import { animeService } from "../services/anime-service";

export function useSeasonalAnimes(page = 1) {
  return useQuery({
    queryKey: ["animes", "seasonal", page],
    queryFn: () => animeService.getCurrentSeason(page),
    staleTime: 1000 * 60 * 30, // 30 minutos
  });
}
