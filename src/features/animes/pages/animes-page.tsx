import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router";
import { useSearchAnimes } from "../hooks/use-search-animes";
import { useGenres } from "../hooks/use-genres";
import { AnimeGrid } from "../components/anime-grid";
import { useDocumentTitle } from "@/shared/hooks/use-document-title";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  X,
  ChevronDown,
  Tag,
} from "lucide-react";

import type { AnimeGenre } from "../types/anime";

const CATEGORIES = [
  { id: "all", label: "Qualquer Formato", value: undefined },
  { id: "tv", label: "Série TV", value: "tv" },
  { id: "movie", label: "Filme", value: "movie" },
  { id: "ova", label: "OVA", value: "ova" },
  { id: "special", label: "Especial", value: "special" },
];

const STATUSES = [
  { id: "all", label: "Qualquer Status", value: undefined },
  { id: "airing", label: "Em Lançamento", value: "airing" },
  { id: "complete", label: "Completo", value: "complete" },
  { id: "upcoming", label: "Por Lançar", value: "upcoming" },
];

const ORDERS = [
  { id: "members-desc", label: "Popularidade", value: "members-desc" },
  { id: "score-desc", label: "Melhor Avaliado", value: "score-desc" },
  { id: "title-asc", label: "Título (A-Z)", value: "title-asc" },
  { id: "start_date-desc", label: "Mais Recente", value: "start_date-desc" },
];

export default function Animes() {
  useDocumentTitle("Explorar Animes");

  // Hook para manipular os parâmetros da URL
  // searchParams -> lê os parâmetros da URL
  // setSearchParams -> atualiza os parâmetros da URL
  const [searchParams, setSearchParams] = useSearchParams();
  // Pega os parâmetros da URL
  const query = searchParams.get("q") || "";
  // Pega a página atual
  const page = parseInt(searchParams.get("page") || "1");
  const type =
    (searchParams.get("type") as
      | "tv"
      | "movie"
      | "ova"
      | "special"
      | "ona"
      | "music") || undefined;
  const status =
    (searchParams.get("status") as "airing" | "complete" | "upcoming") ||
    undefined;
  const orderStr = searchParams.get("sort") || "";
  const genreId = searchParams.get("genre") || "";

  const [localSearch, setLocalSearch] = useState(query);
  const { data: genresData } = useGenres();
  const [isGenreOpen, setIsGenreOpen] = useState(false);
  const [genreFilter, setGenreFilter] = useState("");
  const genreDropdownRef = useRef<HTMLDivElement>(null);

  const [orderBy, sortDirection] = orderStr
    ? orderStr.split("-")
    : [undefined, undefined];

  // Hook para buscar os animes, passando os parâmetros da URL
  const { data, isLoading } = useSearchAnimes({
    q: query,
    page,
    type,
    status,
    order_by: orderBy,
    sort: sortDirection as "asc" | "desc",
    genres: genreId,
    limit: 24,
  });

  // Debounce para busca
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== query) {
        setSearchParams((prev) => {
          if (localSearch) prev.set("q", localSearch);
          else prev.delete("q");
          prev.set("page", "1");
          return prev;
        });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [localSearch, query, setSearchParams]);

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        genreDropdownRef.current &&
        !genreDropdownRef.current.contains(e.target as Node)
      ) {
        setIsGenreOpen(false);
        setGenreFilter("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTypeChange = (newType: string | undefined) => {
    setSearchParams((prev) => {
      if (newType) prev.set("type", newType);
      else prev.delete("type");
      prev.set("page", "1");
      return prev;
    });
  };

  const handleStatusChange = (newStatus: string) => {
    setSearchParams((prev) => {
      if (newStatus) prev.set("status", newStatus);
      else prev.delete("status");
      prev.set("page", "1");
      return prev;
    });
  };

  const handleOrderChange = (newOrder: string) => {
    setSearchParams((prev) => {
      if (newOrder) prev.set("sort", newOrder);
      else prev.delete("sort");
      prev.set("page", "1");
      return prev;
    });
  };

  const handleGenreChange = (newGenreId: string) => {
    setSearchParams((prev) => {
      if (newGenreId) prev.set("genre", newGenreId);
      else prev.delete("genre");
      prev.set("page", "1");
      return prev;
    });
    setIsGenreOpen(false);
    setGenreFilter("");
  };

  const handlePageChange = (newPage: number) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setSearchParams((prev) => {
      prev.set("page", newPage.toString());
      return prev;
    });
  };

  const hasNextPage = data?.pagination?.has_next_page || false;
  const totalPages = data?.pagination?.last_visible_page || 1;
  const genres = genresData?.data || [];

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 pt-24 pb-20 sm:px-6">
      {/* Header & Search */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Explorar Animes
          </h1>
          <p className="text-zinc-400">
            Descubra milhares de títulos da nossa biblioteca.
          </p>
        </div>

        <div className="flex w-full max-w-xl flex-col gap-4 sm:flex-row sm:items-center">
          {/* Dropdown de Gêneros (Customizado) */}
          <div
            ref={genreDropdownRef}
            className="relative flex-1 sm:max-w-[220px]"
          >
            <button
              onClick={() => setIsGenreOpen((prev) => !prev)}
              className={`flex w-full items-center gap-2 rounded-xl bg-zinc-900 py-3.5 pr-4 pl-4 text-left text-sm ring-1 ring-white/10 transition-all ${
                isGenreOpen
                  ? "bg-zinc-800 text-white ring-white/20"
                  : genreId
                    ? "text-white ring-blue-500/30"
                    : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
              }`}
            >
              <Tag className="h-4 w-4 shrink-0 text-zinc-400" />
              <span className="flex-1 truncate">
                {genreId
                  ? genres.find((g: AnimeGenre) => String(g.mal_id) === genreId)
                      ?.name || "Gênero"
                  : "Todos os Gêneros"}
              </span>
              {genreId && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleGenreChange("");
                  }}
                  className="shrink-0 rounded-full p-0.5 text-zinc-500 transition-colors hover:bg-zinc-700 hover:text-white"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-zinc-400 transition-transform duration-200 ${
                  isGenreOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Panel */}
            {isGenreOpen && (
              <div className="absolute top-full left-0 z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl shadow-black/50">
                {/* Busca interna */}
                <div className="border-b border-white/5 p-3">
                  <div className="relative">
                    <Search className="absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
                    <input
                      type="text"
                      autoFocus
                      value={genreFilter}
                      onChange={(e) => setGenreFilter(e.target.value)}
                      placeholder="Filtrar gêneros..."
                      className="w-full rounded-lg bg-zinc-800/80 py-2 pr-3 pl-9 text-xs text-white placeholder-zinc-500 ring-1 ring-white/5 focus:ring-white/20 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Lista de Gêneros */}
                <ul className="max-h-56 overflow-y-auto py-1">
                  <li>
                    <button
                      onClick={() => handleGenreChange("")}
                      className={`flex w-full items-center gap-2 px-4 py-2.5 text-left text-xs font-medium transition-colors ${
                        !genreId
                          ? "bg-blue-500/10 text-blue-400"
                          : "text-zinc-300 hover:bg-white/5"
                      }`}
                    >
                      Todos os Gêneros
                    </button>
                  </li>
                  {genres
                    .filter((g: AnimeGenre) =>
                      g.name.toLowerCase().includes(genreFilter.toLowerCase()),
                    )
                    .map((g: AnimeGenre) => (
                      <li key={g.mal_id}>
                        <button
                          onClick={() => handleGenreChange(String(g.mal_id))}
                          className={`flex w-full items-center gap-2 px-4 py-2.5 text-left text-xs font-medium transition-colors ${
                            String(g.mal_id) === genreId
                              ? "bg-blue-500/10 text-blue-400"
                              : "text-zinc-300 hover:bg-white/5"
                          }`}
                        >
                          {g.name}
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>

          {/* Busca por Nome */}
          <div className="relative flex-[1.5]">
            <input
              type="text"
              placeholder="Buscar por nome..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full rounded-xl border-none bg-zinc-900 px-12 py-3.5 text-sm text-zinc-100 ring-1 ring-zinc-800 transition-all placeholder:text-zinc-500 focus:bg-zinc-800/50 focus:ring-2 focus:ring-blue-500/20"
            />
            <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-zinc-400" />
            {localSearch && (
              <button
                onClick={() => setLocalSearch("")}
                className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full p-1 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-200"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Advanced Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex flex-wrap gap-3">
          {/* Formato Dropdown */}
          <div className="relative">
            <select
              value={type || ""}
              onChange={(e) => handleTypeChange(e.target.value)}
              className="appearance-none rounded-xl border-none bg-zinc-900 py-2.5 pr-10 pl-4 text-xs font-bold text-zinc-300 ring-1 ring-zinc-800 transition-all hover:bg-zinc-800 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.value || ""}>
                  {cat.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          </div>

          {/* Status Dropdown */}
          <div className="relative">
            <select
              value={status || ""}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="appearance-none rounded-xl border-none bg-zinc-900 py-2.5 pr-10 pl-4 text-xs font-bold text-zinc-300 ring-1 ring-zinc-800 transition-all hover:bg-zinc-800 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
            >
              {STATUSES.map((stat) => (
                <option key={stat.id} value={stat.value || ""}>
                  {stat.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          </div>

          {/* Ordenação Dropdown */}
          <div className="relative">
            <select
              value={orderStr || ""}
              onChange={(e) => handleOrderChange(e.target.value)}
              className="appearance-none rounded-xl border-none bg-zinc-900 py-2.5 pr-10 pl-4 text-xs font-bold text-zinc-300 ring-1 ring-zinc-800 transition-all hover:bg-zinc-800 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
            >
              <option value="">Ordenar por (Padrão)</option>
              {ORDERS.map((ord) => (
                <option key={ord.id} value={ord.value}>
                  {ord.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="min-h-[400px]">
        <AnimeGrid animes={data?.data || []} isLoading={isLoading} />
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1 || isLoading}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-zinc-900 text-zinc-400 ring-1 ring-white/10 transition-all hover:bg-zinc-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2 text-sm font-medium">
            <span className="text-white">{page}</span>
            <span className="text-zinc-500">de</span>
            <span className="text-zinc-500">{totalPages}</span>
          </div>

          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={!hasNextPage || isLoading}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-zinc-900 text-zinc-400 ring-1 ring-white/10 transition-all hover:bg-zinc-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}
