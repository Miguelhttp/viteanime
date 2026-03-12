import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { animeService } from "../services/anime-service";

export function useTypeaheadSearch(minChars = 3, debounceMs = 300) {
  const [inputValue, setInputValue] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce: só atualiza a query real após o delay
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue.length < minChars) {
        setDebouncedQuery("");
      } else {
        setDebouncedQuery(inputValue);
      }
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [inputValue, minChars, debounceMs]);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["typeahead", debouncedQuery],
    queryFn: () => animeService.searchAnimes({ q: debouncedQuery, limit: 6 }),
    enabled: debouncedQuery.length >= minChars,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  return {
    inputValue,
    setInputValue,
    results: data?.data || [],
    isSearching: isLoading || isFetching,
    hasQuery: debouncedQuery.length >= minChars,
    clear: () => {
      setInputValue("");
      setDebouncedQuery("");
    },
  };
}
