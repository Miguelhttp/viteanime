import { useQuery } from "@tanstack/react-query";
import { animeService } from "../services/anime-service";

export function useUpcomingAnimes() {
  return useQuery({
    queryKey: ["upcoming-animes"],
    queryFn: () => animeService.getUpcomingAnimes(),
    staleTime: 1000 * 60 * 60, // 1 hora
  });
}
