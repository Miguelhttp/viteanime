import { useQuery } from "@tanstack/react-query";
import { animeService } from "../services/anime-service";

export function useTopAnimes(page = 1) {
  return useQuery({
    queryKey: ["animes", "top", page],
    queryFn: () => animeService.getTopAnimes(page),
    staleTime: 1000 * 60 * 30,
  });
}
