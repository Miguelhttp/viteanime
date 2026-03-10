import { useState, useCallback, useEffect } from "react";
import type { Anime } from "@/features/animes/types/anime";

// Tipos suportados de listas do usuário
export type ListType = "watchlist" | "favorite" | "completed";

export interface UserListItem {
  anime: Anime;
  listType: ListType;
  addedAt: number; // timestamp
}

const STORAGE_KEY = "viteanime_user_lists";

// Função para converter dados antigos da 'watchlist' caso o usuário estivesse usando a versão antiga
function migrateOldData(): UserListItem[] {
  try {
    const oldStorage = localStorage.getItem("viteanime_watchlist");
    if (oldStorage) {
      const oldList: Anime[] = JSON.parse(oldStorage);
      const migrated: UserListItem[] = oldList.map((anime) => ({
        anime,
        listType: "watchlist",
        addedAt: Date.now(),
      }));
      localStorage.removeItem("viteanime_watchlist"); // limpar o velho
      localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
      return migrated;
    }
  } catch (e) {
    console.error("Erro ao migrar dados antigos", e);
  }
  return [];
}

function getStoredLists(): UserListItem[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    // Se não tem novo, tenta migrar o velho
    return migrateOldData();
  } catch {
    return [];
  }
}

export function useUserLists() {
  const [lists, setLists] = useState<UserListItem[]>(getStoredLists);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
  }, [lists]);

  const addToList = useCallback((anime: Anime, listType: ListType) => {
    setLists((prev) => {
      // Remove do storage se já existir em qual quer lista e adiciona na nova (Evitar duplicatas em listas conflitantes)
      const filtered = prev.filter(
        (item) => item.anime.mal_id !== anime.mal_id,
      );
      return [{ anime, listType, addedAt: Date.now() }, ...filtered];
    });
  }, []);

  const removeFromList = useCallback((malId: number) => {
    setLists((prev) => prev.filter((item) => item.anime.mal_id !== malId));
  }, []);

  const getItemListType = useCallback(
    (malId: number): ListType | null => {
      const item = lists.find((i) => i.anime.mal_id === malId);
      return item ? item.listType : null;
    },
    [lists],
  );

  const getListByType = useCallback(
    (type: ListType): Anime[] => {
      return (
        lists
          .filter((item) => item.listType === type)
          // Mais recentes primeiro
          .sort((a, b) => b.addedAt - a.addedAt)
          .map((item) => item.anime)
      );
    },
    [lists],
  );

  return {
    lists,
    addToList,
    removeFromList,
    getItemListType,
    getListByType,
    // Helper counters para acesso rápido
    stats: {
      watchlist: lists.filter((i) => i.listType === "watchlist").length,
      favorite: lists.filter((i) => i.listType === "favorite").length,
      completed: lists.filter((i) => i.listType === "completed").length,
      total: lists.length,
    },
  };
}
