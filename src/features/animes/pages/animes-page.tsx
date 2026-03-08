import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { useSearchAnimes } from "../hooks/use-search-animes";
import { useGenres } from "../hooks/use-genres";
import { AnimeGrid } from "../components/anime-grid";
import { Search, ChevronLeft, ChevronRight, X, Filter } from "lucide-react";

const CATEGORIES = [
  { id: "all", label: "Tudo", value: undefined },
  { id: "tv", label: "TV", value: "tv" },
  { id: "movie", label: "Filmes", value: "movie" },
  { id: "ova", label: "OVA", value: "ova" },
  { id: "special", label: "Especiais", value: "special" },
];

export default function Animes() {
  // Hook para manipular os parâmetros da URL
  // searchParams -> lê os parâmetros da URL
  // setSearchParams -> atualiza os parâmetros da URL
  const [searchParams, setSearchParams] = useSearchParams();
  // Pega os parâmetros da URL
  const query = searchParams.get("q") || "";
  // Pega a página atual
  const page = parseInt(searchParams.get("page") || "1");
  // Pega o tipo
  const type = (searchParams.get("type") as any) || undefined;
  // Pega o gênero
  const genreId = searchParams.get("genre") || "";

  const [localSearch, setLocalSearch] = useState(query);
  const { data: genresData } = useGenres();

  // Hook para buscar os animes, passando os parâmetros da URL
  const { data, isLoading } = useSearchAnimes({
    q: query,
    page,
    type,
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

  const handleTypeChange = (newType: string | undefined) => {
    setSearchParams((prev) => {
      if (newType) prev.set("type", newType);
      else prev.delete("type");
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
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Explorar Animes
          </h1>
          <p className="text-zinc-400">
            Descubra milhares de títulos da nossa biblioteca.
          </p>
        </div>

        <div className="flex w-full max-w-xl flex-col gap-4 sm:flex-row sm:items-center">
          {/* Dropdown de Gêneros */}
          <div className="relative flex-1 sm:max-w-[200px]">
            <select
              value={genreId}
              onChange={(e) => handleGenreChange(e.target.value)}
              className="w-full appearance-none rounded-xl border-none bg-zinc-900 py-3.5 pr-10 pl-11 text-zinc-100 ring-1 ring-zinc-800 transition-all focus:bg-zinc-800/50 focus:ring-2 focus:ring-blue-500/50"
            >
              <option value="">Todos os Gêneros</option>
              {genres.map((g: any) => (
                <option key={g.mal_id} value={g.mal_id}>
                  {g.name}
                </option>
              ))}
            </select>
            <Filter className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-zinc-500" />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-500">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>

          {/* Busca por Nome */}
          <div className="relative flex-[1.5]">
            <input
              type="text"
              placeholder="Buscar por nome..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full rounded-xl border-none bg-zinc-900 px-12 py-3.5 text-zinc-100 ring-1 ring-zinc-800 transition-all placeholder:text-zinc-500 focus:bg-zinc-800/50 focus:ring-2 focus:ring-blue-500/50"
            />
            <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-zinc-500" />
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

      {/* Categories / Filters */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleTypeChange(cat.value)}
            className={`cursor-pointer rounded-full px-5 py-2 text-sm font-medium transition-all ${
              type === cat.value
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                : "bg-zinc-900 text-zinc-400 ring-1 ring-zinc-800 hover:bg-zinc-800 hover:text-zinc-200"
            }`}
          >
            {cat.label}
          </button>
        ))}
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
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-zinc-900 text-zinc-400 ring-1 ring-zinc-800 transition-all hover:bg-zinc-800 hover:text-zinc-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2 text-sm font-medium">
            <span className="text-zinc-100">{page}</span>
            <span className="text-zinc-500">de</span>
            <span className="text-zinc-500">{totalPages}</span>
          </div>

          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={!hasNextPage || isLoading}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-zinc-900 text-zinc-400 ring-1 ring-zinc-800 transition-all hover:bg-zinc-800 hover:text-zinc-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}
