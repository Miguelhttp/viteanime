import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useAnimeDetails } from "../hooks/use-anime-details";
import { useAnimeRecommendations } from "../hooks/use-anime-recommendations";
import { useWatchlist } from "@/shared/hooks/use-watchlist";
import { AnimeRow } from "../components/anime-row";
import { AnimeDetailsSkeleton } from "../components/skeletons";
import { OptimizedImage } from "@/shared/components/ui/optimized-image";
import { Star, Play, ChevronLeft, Info, Bookmark } from "lucide-react";

import type { AnimeGenre, AnimeStudio, Anime } from "../types/anime";

export default function AnimeDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: response, isLoading, error } = useAnimeDetails(Number(id));
  const { data: recommendationsData, isLoading: isRecommendationsLoading } =
    useAnimeRecommendations(Number(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (isLoading) {
    return <AnimeDetailsSkeleton />;
  }

  if (error || !response?.data) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-black">
        <h1 className="text-2xl font-bold text-zinc-100">
          Anime não encontrado
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 rounded-xl bg-zinc-900 px-6 py-3 text-zinc-400 ring-1 ring-zinc-800 transition-all hover:bg-zinc-800 hover:text-zinc-100"
        >
          <ChevronLeft className="h-5 w-5" />
          Voltar
        </button>
      </div>
    );
  }

  const anime = response.data;
  const year = anime.aired?.prop?.from?.year || anime.year;

  // Mapeia as recomendações para o formato do AnimeCard
  const recommendedAnimes: Anime[] =
    recommendationsData?.data.map((rec: any) => ({
      ...rec.entry,
      score: null,
      synopsis: "",
      genres: [],
      type: "Anime",
    })) || [];

  return (
    <div className="min-h-screen bg-black pb-20">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden sm:h-[70vh]">
        <OptimizedImage
          src={
            anime.images.webp.large_image_url ||
            anime.images.jpg.large_image_url
          }
          alt={anime.title}
          containerClassName="h-full w-full"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent" />

        {/* Hero Content */}
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-12 sm:px-6">
          <button
            onClick={() => navigate(-1)}
            className="mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-all hover:bg-black/60 sm:h-12 sm:w-12"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-md bg-blue-600 px-2.5 py-1 text-[10px] font-black tracking-widest text-white uppercase sm:text-xs">
                  {anime.type}
                </span>
                <div className="flex items-center gap-1.5 rounded-md bg-white/10 px-2 py-1 text-yellow-500 backdrop-blur-md">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  <span className="text-xs font-black">
                    {anime.score || "N/A"}
                  </span>
                </div>
                {year && (
                  <span className="text-xs font-medium text-zinc-300">
                    {year}
                  </span>
                )}
                {anime.status === "Currently Airing" && (
                  <span className="rounded-md bg-green-500/20 px-2.5 py-1 text-[10px] font-black text-green-400 uppercase">
                    Em Lançamento
                  </span>
                )}
              </div>

              <h1 className="text-3xl font-black text-white sm:text-5xl lg:text-6xl">
                {anime.title}
              </h1>

              <p className="line-clamp-3 max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base">
                {anime.synopsis}
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <button className="flex items-center gap-3 rounded-xl bg-white px-8 py-4 font-black text-black transition-all hover:scale-105 active:scale-95 sm:px-10">
                  <Play className="h-5 w-5 fill-current" />
                  ASSISTIR AGORA
                </button>
                <button className="flex items-center gap-3 rounded-xl bg-zinc-900 px-8 py-4 font-black text-white ring-1 ring-zinc-800 transition-all hover:bg-zinc-800 sm:px-10">
                  <Play className="h-5 w-5" />
                  TRAILER
                </button>
                <WatchlistButton anime={anime} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details Sections */}
      <div className="mx-auto mt-12 grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-3">
        {/* Left Column - Main Info */}
        <div className="space-y-12 lg:col-span-2">
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-zinc-100">
              <Info className="h-5 w-5 text-blue-500" />
              <h2 className="text-xl font-bold">Sinopse</h2>
            </div>
            <p className="text-lg leading-relaxed text-zinc-400">
              {anime.synopsis}
            </p>
          </section>

          {anime.trailer?.youtube_id && (
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-zinc-100">
                Trailer Oficial
              </h2>
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl ring-1 ring-zinc-800">
                <iframe
                  src={`https://www.youtube.com/embed/${anime.trailer.youtube_id}`}
                  title="Anime Trailer"
                  className="absolute inset-0 h-full w-full border-0"
                  allowFullScreen
                />
              </div>
            </section>
          )}
        </div>

        {/* Right Column - Tech Specs */}
        <div className="space-y-8 rounded-2xl bg-zinc-900/50 p-8 ring-1 ring-zinc-800">
          <h2 className="text-xl font-bold text-zinc-100">
            Informações Técnicas
          </h2>

          <div className="space-y-6">
            <div className="flex justify-between border-b border-zinc-800 pb-4">
              <span className="text-zinc-400">Episódios</span>
              <span className="font-bold text-white">
                {anime.episodes || "?"}
              </span>
            </div>
            <div className="flex justify-between border-b border-zinc-800 pb-4">
              <span className="text-zinc-400">Duração</span>
              <span className="font-bold text-white">
                {anime.duration || "?"}
              </span>
            </div>
            <div className="flex justify-between border-b border-zinc-800 pb-4">
              <span className="text-zinc-400">Status</span>
              <span className="font-bold text-white">{anime.status}</span>
            </div>
            <div className="flex justify-between border-b border-zinc-800 pb-4">
              <span className="text-zinc-400">Estúdio</span>
              <span className="font-bold text-blue-400">
                {anime.studios?.map((s: AnimeStudio) => s.name).join(", ") ||
                  "Desconhecido"}
              </span>
            </div>
            <div className="flex justify-between border-b border-zinc-800 pb-4">
              <span className="text-zinc-400">Classificação</span>
              <span className="font-bold text-white">
                {anime.rating || "Livre"}
              </span>
            </div>
            <div className="space-y-2">
              <span className="text-zinc-400">Gêneros</span>
              <div className="flex flex-wrap gap-2 pt-2">
                {anime.genres?.map((g: AnimeGenre) => (
                  <span
                    key={g.mal_id}
                    className="rounded-lg bg-zinc-800 px-3 py-1.5 text-xs font-bold text-zinc-300"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Suggestions Section */}
      <div className="mx-auto mt-20 max-w-7xl px-4 sm:px-6">
        <div className="border-t border-zinc-800 pt-12">
          <AnimeRow
            title="Sugestões para Você"
            animes={recommendedAnimes}
            isLoading={isRecommendationsLoading}
          />
        </div>
      </div>
    </div>
  );
}

function WatchlistButton({ anime }: { anime: any }) {
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const saved = isInWatchlist(anime.mal_id);

  return (
    <button
      onClick={() => toggleWatchlist(anime)}
      className={`flex items-center gap-3 rounded-xl px-8 py-4 font-black transition-all hover:scale-105 active:scale-95 sm:px-10 ${
        saved
          ? "bg-pink-600 text-white shadow-lg shadow-pink-600/30"
          : "bg-zinc-900 text-zinc-300 ring-1 ring-zinc-800 hover:bg-zinc-800"
      }`}
    >
      <Bookmark className={`h-5 w-5 ${saved ? "fill-current" : ""}`} />
      {saved ? "SALVO" : "SALVAR"}
    </button>
  );
}
