import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useMangaDetails } from "../hooks/use-manga-details";
import { useMangaRecommendations } from "../hooks/use-manga-recommendations";
import { MangaRow } from "../components/manga-row";
import { MangaDetailsSkeleton } from "../components/manga-skeletons";
import { useDocumentTitle } from "@/shared/hooks/use-document-title";
import { OptimizedImage } from "@/shared/components/ui/optimized-image";
import { Star, BookOpen, ChevronLeft, Info } from "lucide-react";

import type { Manga, MangaRecommendation } from "../types/manga";
import type { AnimeGenre } from "../../animes/types/anime";

export default function MangaDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: response, isLoading, error } = useMangaDetails(Number(id));
  const { data: recommendationsData, isLoading: isRecommendationsLoading } =
    useMangaRecommendations(Number(id));

  useDocumentTitle(response?.data?.title || "Detalhes do Mangá");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (isLoading) {
    return <MangaDetailsSkeleton />;
  }

  if (error || !response?.data) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-zinc-950">
        <h1 className="text-2xl font-bold text-white">Mangá não encontrado</h1>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 rounded-xl bg-zinc-900 px-6 py-3 text-zinc-400 ring-1 ring-white/10 transition-all hover:bg-zinc-800 hover:text-white"
        >
          <ChevronLeft className="h-5 w-5" />
          Voltar
        </button>
      </div>
    );
  }

  const manga = response.data;
  const year = manga.published?.prop?.from?.year;

  const recommendedMangas: Manga[] = Array.from(
    new Map(
      (recommendationsData?.data || []).map((rec: MangaRecommendation) => [
        rec.entry.mal_id,
        {
          ...rec.entry,
          score: null,
          synopsis: "",
          genres: [],
          type: "Manga",
        } as unknown as Manga,
      ]),
    ).values(),
  );

  return (
    <div className="min-h-screen bg-zinc-950 pb-20">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden sm:h-[70vh]">
        <OptimizedImage
          src={
            (manga.images.webp.large_image_url ||
              manga.images.jpg.large_image_url ||
              undefined) as string | undefined
          }
          alt={manga.title}
          containerClassName="h-full w-full"
        />
        <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/60 to-transparent" />

        {/* Hero Content */}
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-12 sm:px-6">
          <button
            onClick={() => navigate(-1)}
            className="mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20 sm:h-12 sm:w-12"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-md bg-blue-600 px-2.5 py-1 text-[10px] font-black tracking-widest text-white uppercase sm:text-xs">
                  {manga.type}
                </span>
                <div className="flex items-center gap-1.5 rounded-md bg-white/10 px-2 py-1 text-yellow-500 backdrop-blur-md">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  <span className="text-xs font-black">
                    {manga.score || "N/A"}
                  </span>
                </div>
                {year && (
                  <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                    {year}
                  </span>
                )}
                {manga.publishing && (
                  <span className="rounded-md bg-green-500/20 px-2.5 py-1 text-[10px] font-black text-green-400 uppercase">
                    Em Publicação
                  </span>
                )}
              </div>

              <h1 className="text-3xl font-black text-white sm:text-5xl lg:text-6xl">
                {manga.title}
              </h1>

              <p className="line-clamp-3 max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base">
                {manga.synopsis}
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <button className="flex items-center gap-3 rounded-xl bg-white px-8 py-4 font-black text-zinc-950 transition-all hover:scale-105 active:scale-95 sm:px-10">
                  <BookOpen className="h-5 w-5" />
                  LER AGORA
                </button>
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
            <div className="flex items-center gap-2 text-white">
              <span className="h-5 w-5 text-blue-500">
                <Info className="h-5 w-5" />
              </span>
              <h2 className="text-xl font-bold">Sinopse</h2>
            </div>
            <p className="text-lg leading-relaxed text-zinc-400">
              {manga.synopsis || "Sem sinopse disponível."}
            </p>
          </section>
        </div>

        {/* Right Column - Tech Specs */}
        <div className="space-y-8 rounded-2xl bg-white/5 p-8 ring-1 ring-white/10">
          <h2 className="text-xl font-bold text-white">Informações Técnicas</h2>

          <div className="space-y-6">
            <div className="flex justify-between border-b border-white/5 pb-4">
              <span className="text-zinc-400">Capítulos</span>
              <span className="font-bold text-white">
                {manga.chapters || "?"}
              </span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-4">
              <span className="text-zinc-400">Volumes</span>
              <span className="font-bold text-white">
                {manga.volumes || "?"}
              </span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-4">
              <span className="text-zinc-400">Status</span>
              <span className="font-bold text-white">{manga.status}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-4">
              <span className="text-zinc-400">Autores</span>
              <span className="font-bold text-blue-400">
                {manga.authors?.map((a) => a.name).join(", ") || "Desconhecido"}
              </span>
            </div>
            <div className="space-y-2">
              <span className="text-zinc-400">Gêneros</span>
              <div className="flex flex-wrap gap-2 pt-2">
                {manga.genres?.map((g: AnimeGenre) => (
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
        <div className="border-t border-white/5 pt-12">
          <MangaRow
            title="Sugestões para Você"
            mangas={recommendedMangas}
            isLoading={isRecommendationsLoading}
          />
        </div>
      </div>
    </div>
  );
}
