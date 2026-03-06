import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import type { Anime } from "../types/anime";

export function useCarousel(
  animes: Anime[],
  isLoading: boolean,
  error: Error | null,
) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slideRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const nextSlide = useCallback(() => {
    if (animes.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % animes.length);
  }, [animes.length]);

  const prevSlide = useCallback(() => {
    if (animes.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + animes.length) % animes.length);
  }, [animes.length]);

  useEffect(() => {
    if (isPaused || isLoading || error || animes.length === 0) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPaused, isLoading, error, animes.length, nextSlide]);

  useEffect(() => {
    if (!slideRef.current || animes.length === 0) return;

    gsap.to(slideRef.current, {
      xPercent: -currentIndex * 100,
      duration: 0.8,
      ease: "power2.inOut",
    });

    if (textRef.current) {
      const elements = textRef.current.querySelectorAll(".animate-text");
      gsap.fromTo(
        elements,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.3,
        },
      );
    }
  }, [currentIndex, animes.length]);

  return {
    currentIndex,
    setCurrentIndex,
    setIsPaused,
    slideRef,
    textRef,
    nextSlide,
    prevSlide,
  };
}
