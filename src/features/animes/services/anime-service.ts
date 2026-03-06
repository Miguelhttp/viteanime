// src/services/api/anime.ts
import { api } from "@/shared/lib/api";
import type { JikanResponse } from "../types/anime";

export const animeService = {
  getCurrentSeason: async (): Promise<JikanResponse> => {
    return api.get("/seasons/now?limit=12");
  },

  searchAnimes: async (query: string): Promise<JikanResponse> => {
    return api.get(`/anime?q=${query}&limit=12`);
  },

  getAnimeById: async (id: number) => {
    return api.get(`/anime/${id}`);
  },

  getTopAnimes: async (): Promise<JikanResponse> => {
    return api.get("/top/anime?limit=12");
  },

  getUpcomingAnimes: async (): Promise<JikanResponse> => {
    return api.get("/seasons/upcoming?limit=12");
  },
};
