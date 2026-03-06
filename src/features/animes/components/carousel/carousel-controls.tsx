import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselControlsProps {
  onPrev: () => void;
  onNext: () => void;
}

export const CarouselControls = ({ onPrev, onNext }: CarouselControlsProps) => (
  <div className="absolute top-1/2 hidden w-full -translate-y-1/2 justify-between px-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:flex">
    <button
      onClick={onPrev}
      aria-label="Anime anterior"
      className="rounded-full bg-white/10 p-3 text-white backdrop-blur-md transition-all hover:bg-white/20 active:scale-90"
    >
      <ChevronLeft className="h-8 w-8" />
    </button>
    <button
      onClick={onNext}
      aria-label="Próximo anime"
      className="rounded-full bg-white/10 p-3 text-white backdrop-blur-md transition-all hover:bg-white/20 active:scale-90"
    >
      <ChevronRight className="h-8 w-8" />
    </button>
  </div>
);
