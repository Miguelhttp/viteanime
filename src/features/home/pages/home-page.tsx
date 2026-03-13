import { useCurrentSeasonAnimes } from "../../animes/hooks/use-current-season-animes";
import { useTopAnimes } from "../../animes/hooks/use-top-animes";
import { useUpcomingAnimes } from "../../animes/hooks/use-upcoming-animes";
import { QuickStats } from "../../../shared/components/features/quick-stats";
import Carousel from "../../animes/components/carousel/carousel";
import { AnimeRow } from "../../animes/components/anime-row";
import { SEO } from "@/shared/components/ui/seo";

export default function Home() {
  // Custom Hooks personalizados para cada tipo de requisição
  // Cada hook faz uma requisição diferente para a API
  // trazendo os animes da temporada atual
  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ViteAnime",
    url: "https://vite-anime.vercel.app",
    description: "Descubra, acompanhe e compartilhe seus animes favoritos.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://vite-anime.vercel.app/animes?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const { data: seasonalData, isLoading: isSeasonalLoading } =
    useCurrentSeasonAnimes();

  const { data: topData, isLoading: isTopLoading } = useTopAnimes();

  const { data: upcomingData, isLoading: isUpcomingLoading } =
    useUpcomingAnimes();

  // Recebe os dados das requisições
  // Ele vai verificar se tem dados, se não tiver, vai retornar um array vazio
  const seasonalAnimes = seasonalData?.data || [];
  const topAnimes = topData?.data || [];
  const upcomingAnimes = upcomingData?.data || [];

  return (
    <div className="flex flex-col gap-8 pt-4 pb-12 sm:gap-16 sm:pt-10 sm:pb-16">
      <SEO
        title="Início"
        description="Acompanhe os animes da temporada, veja os mais populares e organize sua lista no ViteAnime."
        schemaData={homeSchema}
      />
      {/* Banner Carrossel */}
      <Carousel
        animes={seasonalAnimes}
        isLoading={isSeasonalLoading}
        error={seasonalData ? null : null} // Inicializando com null pois tratamos os estados no Carousel
      />

      {/* Quick Stats */}
      <QuickStats
        seasonalCount={seasonalAnimes.length}
        topCount={topAnimes.length}
      />

      {/* Section Rows */}
      <div className="flex flex-col gap-16">
        <AnimeRow
          title="Temporada Atual"
          animes={seasonalAnimes}
          isLoading={isSeasonalLoading}
          viewAllHref="/seasonal"
        />

        <AnimeRow
          title="Mais Populares"
          animes={topAnimes}
          isLoading={isTopLoading}
          viewAllHref="/top"
        />

        <AnimeRow
          title="Próximos Lançamentos"
          animes={upcomingAnimes}
          isLoading={isUpcomingLoading}
          viewAllHref="/animes"
        />
      </div>
    </div>
  );
}
