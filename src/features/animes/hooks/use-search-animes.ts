import { useQuery } from "@tanstack/react-query";
import { animeService, type SearchParams } from "../services/anime-service";

export function useSearchAnimes(params: SearchParams) {
  return useQuery({
    queryKey: ["animes", "search", params],
    queryFn: () => animeService.searchAnimes(params),
    placeholderData: (previousData) => previousData, // Mantém os dados antigos enquanto carrega os novos (UX melhor na paginação)
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
}
