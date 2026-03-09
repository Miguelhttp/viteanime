import { useState, useCallback, useEffect } from "react";
import type { Anime } from "@/features/animes/types/anime";

const STORAGE_KEY = "viteanime_watchlist";

function getStoredList(): Anime[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState<Anime[]>(getStoredList);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = useCallback((anime: Anime) => {
    setWatchlist((prev) => {
      if (prev.some((a) => a.mal_id === anime.mal_id)) return prev;
      return [...prev, anime];
    });
  }, []);

  const removeFromWatchlist = useCallback((malId: number) => {
    setWatchlist((prev) => prev.filter((a) => a.mal_id !== malId));
  }, []);

  const isInWatchlist = useCallback(
    (malId: number) => watchlist.some((a) => a.mal_id === malId),
    [watchlist],
  );

  const toggleWatchlist = useCallback(
    (anime: Anime) => {
      if (isInWatchlist(anime.mal_id)) {
        removeFromWatchlist(anime.mal_id);
      } else {
        addToWatchlist(anime);
      }
    },
    [isInWatchlist, removeFromWatchlist, addToWatchlist],
  );

  return {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    toggleWatchlist,
    count: watchlist.length,
  };
}
