// src/hooks/useCurrentSeasonAnimes.ts
import { useQuery } from "@tanstack/react-query";
import { animeService } from "../services/anime-service";

export function useCurrentSeasonAnimes() {
  return useQuery({
    queryKey: ["current-season-animes"],
    queryFn: () => animeService.getCurrentSeason(),
    staleTime: 1000 * 60 * 60, // 1 hora
  });
}
