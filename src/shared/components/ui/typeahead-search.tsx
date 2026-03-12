import { useState, useRef, useEffect, type KeyboardEvent } from "react";
import { useNavigate } from "react-router";
import { useTypeaheadSearch } from "@/features/animes/hooks/use-typeahead-search";
import { Search, Loader2, Star } from "lucide-react";
import type { Anime } from "@/features/animes/types/anime";

interface TypeaheadSearchProps {
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  onSelect?: () => void; // callback extra (ex: fechar overlay mobile)
}

export function TypeaheadSearch({
  placeholder = "Encontre seu anime...",
  className = "",
  inputClassName = "",
  onSelect,
}: TypeaheadSearchProps) {
  const navigate = useNavigate();
  const { inputValue, setInputValue, results, isSearching, hasQuery, clear } =
    useTypeaheadSearch();

  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Abre dropdown quando tem resultados
  useEffect(() => {
    const shouldBeOpen = hasQuery && (results.length > 0 || isSearching);
    const timer = setTimeout(() => {
      if (shouldBeOpen !== isOpen) {
        setIsOpen(shouldBeOpen);
      }
      setActiveIndex(-1);
    }, 0);
    return () => clearTimeout(timer);
  }, [results, hasQuery, isSearching, isOpen]);

  // Fecha ao clicar fora
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (anime: Anime) => {
    clear();
    setIsOpen(false);
    navigate(`/anime/${anime.mal_id}`);
    onSelect?.();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || results.length === 0) {
      if (e.key === "Escape") {
        setIsOpen(false);
        inputRef.current?.blur();
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
        break;
      case "Enter":
        e.preventDefault();
        if (activeIndex >= 0 && activeIndex < results.length) {
          handleSelect(results[activeIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Input */}
      <div className="group relative">
        <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-zinc-500 transition-colors group-focus-within:text-white" />
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => hasQuery && results.length > 0 && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoComplete="off"
          className={`h-11 w-full rounded-2xl bg-white/5 pr-10 pl-12 text-sm text-white placeholder-zinc-500 ring-1 ring-white/10 transition-all focus:bg-zinc-900/80 focus:ring-white/20 focus:outline-none ${inputClassName}`}
        />
        {isSearching && (
          <Loader2 className="absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 animate-spin text-zinc-400" />
        )}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full right-0 left-0 z-100 mt-2 max-h-[400px] overflow-y-auto rounded-2xl border border-white/10 bg-zinc-900/95 shadow-2xl shadow-black/50 backdrop-blur-xl">
          {isSearching && results.length === 0 ? (
            <div className="flex items-center justify-center gap-2 px-4 py-8 text-sm text-zinc-400">
              <Loader2 className="h-4 w-4 animate-spin" />
              Buscando...
            </div>
          ) : results.length === 0 && hasQuery ? (
            <div className="px-4 py-8 text-center text-sm text-zinc-500">
              Nenhum resultado encontrado
            </div>
          ) : (
            <ul className="py-2">
              {results.map((anime: Anime, index: number) => (
                <li key={anime.mal_id}>
                  <button
                    onClick={() => handleSelect(anime)}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors ${
                      index === activeIndex
                        ? "bg-white/10 text-white"
                        : "text-zinc-300 hover:bg-white/5"
                    }`}
                  >
                    {/* Poster Mini */}
                    <img
                      src={
                        anime.images?.webp?.small_image_url ||
                        anime.images?.jpg?.small_image_url ||
                        ""
                      }
                      alt={anime.title}
                      className="h-14 w-10 shrink-0 rounded-lg object-cover"
                    />

                    {/* Info */}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">
                        {anime.title}
                      </p>
                      <div className="mt-0.5 flex items-center gap-2 text-[11px] text-zinc-400">
                        <span className="rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] font-bold uppercase">
                          {anime.type || "TV"}
                        </span>
                        {anime.score && (
                          <span className="flex items-center gap-0.5 text-yellow-500">
                            <Star className="h-3 w-3 fill-current" />
                            {anime.score.toFixed(1)}
                          </span>
                        )}
                        {anime.year && <span>{anime.year}</span>}
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
