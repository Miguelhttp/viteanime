import { useState } from "react";
import { Menu, Search, Bell, X } from "lucide-react";

import { useNavigation } from "@/shared/hooks/use-navigation";
import { TypeaheadSearch } from "@/shared/components/ui/typeahead-search";

export function Topbar() {
  const { toggleSidebarMobile } = useNavigation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-white/5 bg-zinc-950/50 px-4 backdrop-blur-2xl transition-all sm:h-20 sm:px-8 lg:border-none lg:bg-transparent">
      {/* Mobile Search Overlay */}
      {isSearchOpen && (
        <div className="absolute inset-0 z-50 flex items-center bg-zinc-950 px-4 md:hidden">
          <TypeaheadSearch
            placeholder="Encontre seu anime..."
            className="flex-1"
            inputClassName="h-12 rounded-2xl bg-white/5 pr-12 pl-12 text-sm text-white placeholder-zinc-500 ring-1 ring-white/10 focus:ring-white/20 focus:outline-none"
            onSelect={() => setIsSearchOpen(false)}
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="ml-3 shrink-0 rounded-full p-2 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}

      <div
        className={`flex items-center gap-4 lg:w-64 ${isSearchOpen ? "opacity-0" : "opacity-100"}`}
      >
        <button
          onClick={toggleSidebarMobile}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-zinc-400 transition-all hover:bg-white/10 hover:text-white lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="hidden text-sm font-medium text-zinc-400 lg:block">
          Bem-vindo, <span className="text-white">Visitante</span>
        </div>
      </div>

      {/* Logo Mobile */}
      <div className={`lg:hidden ${isSearchOpen ? "hidden" : "block"}`}>
        <span className="bg-linear-to-r from-white to-zinc-500 bg-clip-text text-lg font-black tracking-tighter text-transparent sm:text-xl">
          VITEANIME
        </span>
      </div>

      {/* Busca - Desktop/Tablet (Typeahead) */}
      <div className="hidden flex-1 items-center justify-center px-4 md:flex">
        <TypeaheadSearch
          placeholder="Encontre seu anime favorito..."
          className="w-full max-w-md"
        />
      </div>

      <div
        className={`flex items-center justify-end gap-2 sm:gap-4 lg:w-64 ${isSearchOpen ? "opacity-0" : "opacity-100"}`}
      >
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="rounded-xl p-2.5 text-zinc-400 transition-all hover:bg-white/5 hover:text-white md:hidden"
            title="Buscar"
          >
            <Search className="h-5 w-5" />
          </button>

          <button
            className="hidden rounded-xl p-2.5 text-zinc-400 transition-all hover:bg-white/5 hover:text-white sm:flex"
            title="Notificações"
          >
            <Bell className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
