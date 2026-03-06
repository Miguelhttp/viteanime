import { Search, Monitor, Library, Zap } from "lucide-react";

const features = [
  {
    title: "Busca Inteligente",
    description:
      "Encontre seus animes favoritos com nosso sistema de busca avançada e autocomplete.",
    icon: Search,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Streaming Premium",
    description:
      "Assista em alta definição com servidores rápidos e estáveis para a melhor experiência.",
    icon: Monitor,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    title: "Vasta Biblioteca",
    description:
      "Milhares de títulos organizados por temporada, gênero e popularidade.",
    icon: Library,
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    title: "Atualizações Rápidas",
    description:
      "Novos episódios adicionados minutos após o lançamento oficial no Japão.",
    icon: Zap,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
  },
];

export default function Features() {
  return (
    <section className="py-6 sm:py-12">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4 transition-all hover:border-zinc-700 hover:bg-zinc-900 sm:p-8"
          >
            <div
              className={`mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl ${feature.bg} ${feature.color} ring-1 ring-white/10 ring-inset sm:mb-6 sm:h-12 sm:w-12`}
            >
              <feature.icon className="h-4.5 w-4.5 sm:h-6 sm:w-6" />
            </div>
            <h3 className="group-hover:text-primary mb-1.5 text-base font-bold text-white transition-colors sm:mb-3 sm:text-xl">
              {feature.title}
            </h3>
            <p className="text-[11px] leading-relaxed text-zinc-400 sm:text-sm">
              {feature.description}
            </p>

            <div className="absolute -right-4 -bottom-4 h-24 w-24 opacity-0 transition-opacity group-hover:opacity-10">
              <feature.icon className={`h-full w-full ${feature.color}`} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
