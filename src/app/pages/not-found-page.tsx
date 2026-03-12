import { Link } from "react-router";
import { useDocumentTitle } from "@/shared/hooks/use-document-title";
import { Ghost, Home, ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  useDocumentTitle("Página não encontrada");

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center p-4 text-center">
      <div className="relative mb-8">
        <Ghost
          className="h-32 w-32 animate-bounce text-zinc-300 dark:text-zinc-800"
          strokeWidth={1}
        />
        <div className="absolute -bottom-4 left-1/2 h-4 w-24 -translate-x-1/2 rounded-[100%] bg-black/5 blur-md dark:bg-black/20" />
      </div>

      <h1 className="mb-4 text-4xl font-black tracking-tight text-balance text-zinc-900 sm:text-6xl dark:text-white">
        Ops! Perdeu o<br className="hidden sm:block" /> caminho ninja?
      </h1>

      <p className="mb-8 max-w-md text-lg text-zinc-600 dark:text-zinc-400">
        A página que você está procurando não existe ou foi movida para outra
        dimensão.
      </p>

      <div className="flex flex-col gap-4 sm:flex-row">
        <button
          onClick={() => window.history.back()}
          className="flex items-center justify-center gap-2 rounded-xl bg-zinc-100 px-6 py-3 font-medium text-zinc-950 ring-1 ring-zinc-200 transition-colors hover:bg-zinc-200 hover:ring-zinc-300 dark:bg-zinc-900 dark:text-white dark:ring-white/10 dark:hover:bg-zinc-800 dark:hover:ring-white/20"
        >
          <ArrowLeft className="h-5 w-5" />
          Voltar
        </button>
        <Link
          to="/"
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-500 hover:shadow-blue-500/30"
        >
          <Home className="h-5 w-5" />
          Página Inicial
        </Link>
      </div>
    </div>
  );
}
