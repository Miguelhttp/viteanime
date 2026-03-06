import { useQuery } from "@tanstack/react-query";
import { animeService } from "../services/anime-service";

export function useTopAnimes() {
  return useQuery({
    queryKey: ["top-animes"],
    queryFn: () => animeService.getTopAnimes(),
    staleTime: 1000 * 60 * 60, // 1 hora
  });
}
