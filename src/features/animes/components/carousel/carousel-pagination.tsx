interface CarouselPaginationProps {
  total: number;
  current: number;
  onChange: (index: number) => void;
}

export const CarouselPagination = ({
  total,
  current,
  onChange,
}: CarouselPaginationProps) => (
  <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-3">
    {Array.from({ length: total }).map((_, index) => (
      <button
        key={index}
        onClick={() => onChange(index)}
        aria-label={`Ir para o slide ${index + 1}`}
        className={`h-1.5 rounded-full transition-all duration-300 ${
          index === current
            ? "w-8 bg-white"
            : "w-2 bg-white/30 hover:bg-white/50"
        }`}
      />
    ))}
  </div>
);
