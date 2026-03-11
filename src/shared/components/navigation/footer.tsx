import { Link } from "react-router";
import { Github, Heart, Linkedin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-zinc-800/50 bg-zinc-950/50 pt-12 pb-8 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 sm:px-6 md:flex-row lg:px-8">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <Link
            to="/"
            className="bg-linear-to-r from-blue-500 to-purple-600 bg-clip-text text-2xl font-black text-transparent transition-opacity hover:opacity-80"
          >
            ViteAnime
          </Link>
          <p className="text-sm text-zinc-400">
            Descubra, acompanhe e compartilhe seus animes favoritos.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/Miguelhttp"
            target="_blank"
            rel="noreferrer"
            className="rounded-full p-2 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/miguel-braga-48a339234/"
            target="_blank"
            rel="noreferrer"
            className="rounded-full p-2 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </a>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between border-t border-zinc-800/50 pt-8 text-sm text-zinc-500 md:flex-row">
          <p>© {currentYear} ViteAnime. Todos os direitos reservados.</p>
          <p className="mt-2 flex items-center gap-1 md:mt-0">
            Feito com <Heart className="h-4 w-4 text-red-500" /> para fãs de
            anime
          </p>
        </div>
      </div>
    </footer>
  );
}
