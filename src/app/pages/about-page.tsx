// src/app/pages/about-page.tsx
import { useDocumentTitle } from "@/shared/hooks/use-document-title";
import { Github, ExternalLink, Code2, Palette, Zap } from "lucide-react";

export default function AboutPage() {
  useDocumentTitle("Sobre o Projeto");

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-16 px-4 pt-32 pb-20 sm:px-6">
      {/* Hero Section */}
      <section className="space-y-6 text-center">
        <h1 className="bg-linear-to-r from-white via-white to-zinc-400 bg-clip-text text-4xl font-black tracking-tighter text-transparent sm:text-6xl lg:text-7xl">
          VITEANIME
        </h1>
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl">
          Uma plataforma moderna e performática para exploração de animes e
          mangás, construída com as tecnologias mais recentes do ecossistema
          web.
        </p>
      </section>

      {/* Features Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="group rounded-2xl bg-zinc-900/50 p-8 shadow-sm ring-1 ring-zinc-800 transition-all hover:bg-zinc-800/50 hover:ring-blue-500/30">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
            <Zap className="h-6 w-6" />
          </div>
          <h3 className="mb-2 text-xl font-bold text-white">Performance</h3>
          <p className="text-sm leading-relaxed text-zinc-400">
            Utiliza Vite e React para uma experiência de navegação instantânea e
            suave.
          </p>
        </div>

        <div className="group rounded-2xl bg-zinc-900/50 p-8 shadow-sm ring-1 ring-zinc-800 transition-all hover:bg-zinc-800/50 hover:ring-purple-500/30">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-500">
            <Palette className="h-6 w-6" />
          </div>
          <h3 className="mb-2 text-xl font-bold text-white">Design Premium</h3>
          <p className="text-sm leading-relaxed text-zinc-400">
            Interface moderna com foco em estética, tipografia e
            micro-interações.
          </p>
        </div>

        <div className="group rounded-2xl bg-zinc-900/50 p-8 shadow-sm ring-1 ring-zinc-800 transition-all hover:bg-zinc-800/50 hover:ring-green-500/30">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10 text-green-500">
            <Code2 className="h-6 w-6" />
          </div>
          <h3 className="mb-2 text-xl font-bold text-white">Tecnologia</h3>
          <p className="text-sm leading-relaxed text-zinc-400">
            Integrado com a API Jikan (MyAnimeList) para dados em tempo real.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <section className="rounded-3xl bg-linear-to-b from-zinc-900/50 to-transparent p-8 shadow-sm ring-1 ring-zinc-800 sm:p-12">
        <div className="max-w-3xl space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Sobre o Desenvolvimento
            </h2>
            <p className="text-lg leading-relaxed text-zinc-400">
              Este projeto foi desenvolvido como um portfólio para demonstrar
              habilidades avançadas em React, TypeScript e integração de APIs. O
              principal objetivo foi criar uma aplicação que não fosse apenas
              funcional, mas também visualmente impactante.
            </p>
          </div>

          <div className="flex flex-wrap gap-6">
            <a
              href="https://github.com/Miguelhttp/viteanime"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-bold text-zinc-100 transition-colors hover:text-white"
            >
              <Github className="h-5 w-5" />
              GitHub do Projeto
              <ExternalLink className="h-4 w-4 text-zinc-400" />
            </a>
          </div>
        </div>
      </section>

      {/* Credits */}
      <footer className="text-center text-sm text-zinc-600">
        <p>© 2026 ViteAnime Project. Desenvolvido com ❤️ por Miguel.</p>
      </footer>
    </div>
  );
}
