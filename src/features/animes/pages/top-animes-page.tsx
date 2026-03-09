import { useState } from "react";
import { useTopAnimes } from "../hooks/use-top-animes";
import { AnimeGrid } from "../components/anime-grid";
import { ChevronLeft, ChevronRight, Trophy } from "lucide-react";

export default function TopAnimesPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useTopAnimes(page);

  const hasNextPage = data?.pagination?.has_next_page || false;
  const totalPages = data?.pagination?.last_visible_page || 1;

  const handlePageChange = (newPage: number) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPage(newPage);
  };

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 pt-24 pb-20 sm:px-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500 shadow-lg shadow-yellow-500/30">
            <Trophy className="h-5 w-5 text-black" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
              Top Animes
            </h1>
            <p className="text-sm text-zinc-400">
              Os melhores animes de todos os tempos, ranqueados pela comunidade
            </p>
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
