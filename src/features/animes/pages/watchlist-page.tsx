import { useWatchlist } from "@/shared/hooks/use-watchlist";
import { AnimeGrid } from "../components/anime-grid";
import { Bookmark, Trash2 } from "lucide-react";

export default function WatchlistPage() {
  const { watchlist, removeFromWatchlist } = useWatchlist();

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 pt-24 pb-20 sm:px-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-600 shadow-lg shadow-pink-600/30">
            <Bookmark className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
              Minha Lista
            </h1>
            <p className="text-sm text-zinc-400">
              {watchlist.length > 0
                ? `${watchlist.length} anime${watchlist.length > 1 ? "s" : ""} salvos`
                : "Sua lista de animes para assistir"}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      {watchlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-32">
          <Bookmark className="h-16 w-16 text-zinc-700" />
          <h2 className="text-xl font-bold text-zinc-400">
            Nenhum anime salvo ainda
          </h2>
          <p className="max-w-md text-center text-sm text-zinc-500">
            Explore os animes e clique no ícone de favorito para adicionar à sua
            lista. Eles aparecerão aqui!
          </p>
        </div>
      ) : (
        <>
          {/* Clear All */}
          <div className="flex justify-end">
            <button
              onClick={() =>
                watchlist.forEach((a) => removeFromWatchlist(a.mal_id))
              }
              className="flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-red-400 ring-1 ring-zinc-800 transition-all hover:bg-red-500/10 hover:text-red-300"
            >
              <Trash2 className="h-4 w-4" />
              Limpar Lista
            </button>
          </div>

          <div className="min-h-[400px]">
            <AnimeGrid animes={watchlist} isLoading={false} />
          </div>
        </>
      )}
    </div>
  );
}
