// src/features/mangas/services/manga-service.ts
import { api } from "@/shared/lib/api";
import type {
  JikanMangaResponse,
  JikanMangaDetailResponse,
} from "../types/manga";

export interface MangaSearchParams {
  q?: string;
  page?: number;
  limit?: number;
  type?:
    | "manga"
    | "novel"
    | "lightnovel"
    | "oneshot"
    | "doujin"
    | "manhwa"
    | "manhua";
  status?: "publishing" | "complete" | "upcoming";
  order_by?: string;
  sort?: "asc" | "desc";
  genres?: string; // IDs separados por vírgula
}

export const mangaService = {
  getTopMangas: async (page = 1, limit = 24): Promise<JikanMangaResponse> => {
    return api.get(`/top/manga?page=${page}&limit=${limit}`);
  },

  searchMangas: async (
    params: MangaSearchParams,
  ): Promise<JikanMangaResponse> => {
    const queryParams = new URLSearchParams();
    if (params.q) queryParams.append("q", params.q);
    if (params.page) queryParams.append("page", params.page.toString());
    if (params.limit) queryParams.append("limit", params.limit.toString());
    if (params.type) queryParams.append("type", params.type);
    if (params.status) queryParams.append("status", params.status);
    if (params.order_by) queryParams.append("order_by", params.order_by);
    if (params.sort) queryParams.append("sort", params.sort);
    if (params.genres) queryParams.append("genres", params.genres);

    return api.get(`/manga?${queryParams.toString()}`);
  },

  getMangaById: async (id: number): Promise<JikanMangaDetailResponse> => {
    return api.get(`/manga/${id}`);
  },

  getMangaRecommendations: async (id: number): Promise<{ data: any[] }> => {
    return api.get(`/manga/${id}/recommendations`);
  },

  getGenres: async (): Promise<{ data: any[] }> => {
    return api.get("/genres/manga");
  },
};
