// src/features/mangas/types/manga.ts
import type {
  JikanPagination,
  AnimeImages,
  AnimeGenre,
  AnimeTheme,
  AnimeDemographic,
} from "../../animes/types/anime";

/**
 * Interface para a resposta da API Jikan para Mangás
 */
export interface JikanMangaResponse<T = Manga> {
  data: T[];
  pagination: JikanPagination;
}

export interface JikanMangaDetailResponse<T = Manga> {
  data: T;
}

export interface MangaRecommendation {
  entry: {
    mal_id: number;
    url: string;
    images: AnimeImages;
    title: string;
  };
  url: string;
  votes: number;
}

export interface MangaAuthor {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface MangaSerialization {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface Manga {
  mal_id: number;
  url: string;
  images: AnimeImages;
  approved: boolean;
  titles: {
    type: string;
    title: string;
  }[];
  title: string;
  title_english: string | null;
  title_japanese: string | null;
  title_synonyms: string[];
  type:
    | "Manga"
    | "Novel"
    | "Light Novel"
    | "One-shot"
    | "Doujinshi"
    | "Manhwa"
    | "Manhua"
    | null;
  chapters: number | null;
  volumes: number | null;
  status:
    | "Finished"
    | "Publishing"
    | "On Hiatus"
    | "Discontinued"
    | "Not yet published"
    | null;
  publishing: boolean;
  published: {
    from: string | null;
    to: string | null;
    prop: {
      from: {
        day: number | null;
        month: number | null;
        year: number | null;
      };
      to: {
        day: number | null;
        month: number | null;
        year: number | null;
      };
    };
    string: string;
  };
  score: number | null;
  scored_by: number | null;
  rank: number | null;
  popularity: number | null;
  members: number | null;
  favorites: number | null;
  synopsis: string | null;
  background: string | null;
  authors: MangaAuthor[];
  serializations: MangaSerialization[];
  genres: AnimeGenre[];
  explicit_genres: AnimeGenre[];
  themes: AnimeTheme[];
  demographics: AnimeDemographic[];
}
