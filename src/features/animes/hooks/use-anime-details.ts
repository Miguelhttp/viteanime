import { useQuery } from "@tanstack/react-query";
import { animeService } from "../services/anime-service";

export function useAnimeDetails(id: number) {
  return useQuery({
    queryKey: ["animes", "detail", id],
    queryFn: () => animeService.getAnimeById(id),
    staleTime: 1000 * 60 * 10, // 10 minutos
    enabled: !!id,
  });
}
