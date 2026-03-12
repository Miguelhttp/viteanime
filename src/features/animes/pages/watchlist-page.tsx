import { useState } from "react";
import { useUserLists, type ListType } from "@/shared/hooks/use-user-lists";
import { AnimeGrid } from "../components/anime-grid";
import { Bookmark, Heart, CheckCircle2, Library } from "lucide-react";
import { useDocumentTitle } from "@/shared/hooks/use-document-title";

export default function WatchlistPage() {
  useDocumentTitle("Minha Biblioteca");
  const { getListByType, stats } = useUserLists();
  const [activeTab, setActiveTab] = useState<ListType>("watchlist");

  const currentList = getListByType(activeTab);

  const TABS: {
    id: ListType;
    label: string;
    icon: typeof Bookmark;
    count: number;
  }[] = [
    {
      id: "watchlist",
      label: "Quero Assistir",
      icon: Bookmark,
      count: stats.watchlist,
    },
    { id: "favorite", label: "Favoritos", icon: Heart, count: stats.favorite },
    {
      id: "completed",
      label: "Já Assisti",
      icon: CheckCircle2,
      count: stats.completed,
    },
  ];

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 pt-24 pb-20 sm:px-6">
      {/* Header */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-violet-600 to-fuchsia-600 shadow-lg shadow-violet-600/30">
            <Library className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Minha Biblioteca
            </h1>
            <p className="mt-1 text-sm text-zinc-400">
              {stats.total > 0
                ? `${stats.total} animes salvos no total`
                : "Seu acervo pessoal de animes"}
            </p>
          </div>
        </div>

        {/* Tabs System */}
        <div className="scrollbar-hide flex overflow-x-auto pb-2">
          <div className="flex gap-2 rounded-2xl bg-zinc-900/50 p-1.5 ring-1 ring-white/5">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-zinc-800 text-white shadow-md ring-1 ring-white/10"
                      : "text-zinc-400 hover:bg-zinc-800/50 hover:text-white"
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 ${isActive ? "text-blue-400" : ""}`}
                  />
                  {tab.label}
                  <span
                    className={`ml-1.5 rounded-full px-2 py-0.5 text-xs ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "bg-zinc-800 text-zinc-500"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      {currentList.length === 0 ? (
        <div className="animate-in fade-in flex flex-col items-center justify-center gap-4 py-32 duration-500">
          <Library className="h-16 w-16 text-zinc-800" />
          <h2 className="text-xl font-bold text-zinc-500">
            Esta lista está vazia
          </h2>
          <p className="max-w-md text-center text-sm text-zinc-500">
            Navegue pelos animes e adicione-os à sua biblioteca usando os botões
            na página de detalhes.
          </p>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-4 min-h-[400px] duration-500">
          <AnimeGrid animes={currentList} isLoading={false} />
        </div>
      )}
    </div>
  );
}
