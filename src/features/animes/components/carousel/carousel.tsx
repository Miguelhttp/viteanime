import type { CarouselProps } from "../../types/anime";
import { useCarousel } from "../../hooks/use-carousel";
import { CarouselItem } from "./carousel-item";
import { CarouselControls } from "./carousel-controls";
import { CarouselPagination } from "./carousel-pagination";
import { CarouselSkeleton } from "../skeletons";

export default function Carousel({ animes, isLoading, error }: CarouselProps) {
  const {
    currentIndex,
    setCurrentIndex,
    setIsPaused,
    slideRef,
    textRef,
    nextSlide,
    prevSlide,
  } = useCarousel(animes, isLoading, error);

  if (isLoading) {
    return <CarouselSkeleton />;
  }

  if (error || !animes || animes.length === 0) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-8 text-center text-red-400">
        {error
          ? "Erro ao carregar animes. Tente novamente."
          : "Nenhum anime encontrado."}
      </div>
    );
  }

  return (
    <section
      className="group relative w-full overflow-hidden rounded-2xl bg-zinc-950 shadow-2xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative h-[380px] sm:h-[500px] lg:h-[650px]">
        <div ref={slideRef} className="flex h-full">
          {animes.map((anime, index) => (
            <CarouselItem
              key={anime.mal_id}
              anime={anime}
              isActive={index === currentIndex}
              textRef={textRef}
            />
          ))}
        </div>
      </div>

      <CarouselControls onPrev={prevSlide} onNext={nextSlide} />
      <CarouselPagination
        total={animes.length}
        current={currentIndex}
        onChange={setCurrentIndex}
      />
    </section>
  );
}
