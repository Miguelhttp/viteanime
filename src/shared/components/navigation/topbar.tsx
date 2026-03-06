import { useState } from "react";
import { Menu, Search, Github, Bell, X } from "lucide-react";
import { useNavigation } from "@/shared/hooks/use-navigation";
import { useTheme } from "@/shared/hooks/use-theme";

export function Topbar() {
  const { toggleSidebarMobile } = useNavigation();
  const { toggleTheme } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-white/5 bg-zinc-950/50 px-4 backdrop-blur-2xl transition-all sm:h-20 sm:px-8 lg:border-none lg:bg-transparent">
      {/* Mobile Search Overlay */}
      {isSearchOpen && (
        <div className="absolute inset-0 z-50 flex items-center bg-zinc-950 px-4 md:hidden">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <input
              autoFocus
              type="text"
              placeholder="Encontre seu anime..."
              className="h-12 w-full rounded-2xl bg-white/5 pr-12 pl-12 text-sm text-white placeholder-zinc-500 ring-1 ring-white/10 focus:ring-white/20 focus:outline-none"
            />
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-1/2 right-4 -translate-y-1/2 text-zinc-500 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
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

      {/* Busca - Desktop/Tablet */}
      <div className="hidden flex-1 items-center justify-center px-4 md:flex">
        <div className="group relative w-full max-w-md transition-all">
          <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-zinc-500 transition-colors group-focus-within:text-white" />
          <input
            type="text"
            placeholder="Encontre seu anime favorito..."
            className="h-11 w-full rounded-2xl bg-white/5 pr-4 pl-12 text-sm text-white placeholder-zinc-500 ring-1 ring-white/10 transition-all focus:bg-zinc-900/80 focus:ring-white/20 focus:outline-none"
          />
        </div>
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

          <button
            onClick={toggleTheme}
            className="rounded-xl p-2.5 text-zinc-400 transition-all hover:bg-white/5 hover:text-white"
            title="Github"
          >
            <Github className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
