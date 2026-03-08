// src/services/api/anime.ts
import { api } from "@/shared/lib/api";
import type { JikanResponse } from "../types/anime";

export interface SearchParams {
  q?: string;
  page?: number;
  limit?: number;
  type?: "tv" | "movie" | "ova" | "special" | "ona" | "music";
  status?: "airing" | "complete" | "upcoming";
  order_by?: string;
  sort?: "asc" | "desc";
  genres?: string; // IDs separados por vírgula
}

export const animeService = {
  getCurrentSeason: async (page = 1, limit = 24): Promise<JikanResponse> => {
    return api.get(`/seasons/now?page=${page}&limit=${limit}`);
  },

  getSeasonList: async (): Promise<{ data: any[] }> => {
    return api.get("/seasons");
  },

  getAnimesBySeason: async (
    year: number,
    season: string,
    page = 1,
  ): Promise<JikanResponse> => {
    return api.get(`/seasons/${year}/${season}?page=${page}`);
  },

  searchAnimes: async (params: SearchParams): Promise<JikanResponse> => {
    const queryParams = new URLSearchParams();
    if (params.q) queryParams.append("q", params.q);
    if (params.page) queryParams.append("page", params.page.toString());
    if (params.limit) queryParams.append("limit", params.limit.toString());
    if (params.type) queryParams.append("type", params.type);
    if (params.status) queryParams.append("status", params.status);
    if (params.order_by) queryParams.append("order_by", params.order_by);
    if (params.sort) queryParams.append("sort", params.sort);
    if (params.genres) queryParams.append("genres", params.genres);

    return api.get(`/anime?${queryParams.toString()}`);
  },

  getGenres: async (): Promise<{ data: any[] }> => {
    return api.get("/genres/anime");
  },

  getAnimeById: async (id: number) => {
    return api.get(`/anime/${id}`);
  },

  getAnimeRecommendations: async (id: number): Promise<{ data: any[] }> => {
    return api.get(`/anime/${id}/recommendations`);
  },

  getTopAnimes: async (page = 1, limit = 24): Promise<JikanResponse> => {
    return api.get(`/top/anime?page=${page}&limit=${limit}`);
  },

  getUpcomingAnimes: async (): Promise<JikanResponse> => {
    return api.get("/seasons/upcoming?limit=12");
  },
};
