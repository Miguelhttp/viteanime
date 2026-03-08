import { useState } from "react";

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
  fallbackSrc?: string;
}

export function OptimizedImage({
  src,
  alt,
  className,
  containerClassName,
  fallbackSrc = "https://placehold.co/400x600/18181b/52525b?text=ViteAnime",
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  const imageSrc = error || !src ? fallbackSrc : src;

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      {/* Skeleton / Placeholder */}
      {!isLoaded && !error && (
        <div className="absolute inset-0 animate-pulse bg-zinc-800" />
      )}

      <img
        src={imageSrc}
        alt={alt}
        className={cn(
          "h-full w-full object-cover transition-all duration-700",
          !isLoaded
            ? "scale-105 opacity-0 blur-sm grayscale"
            : "blur-0 scale-100 opacity-100 grayscale-0",
          className,
        )}
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
        loading="lazy"
        {...props}
      />
    </div>
  );
}

// Utility function if not exists
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
