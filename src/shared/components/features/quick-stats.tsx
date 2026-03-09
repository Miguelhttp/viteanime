import { Link } from "react-router";
import { Flame, Trophy, Bookmark, Layers } from "lucide-react";
import { useWatchlist } from "@/shared/hooks/use-watchlist";
import { useGenres } from "@/features/animes/hooks/use-genres";

interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
  color: string;
  bg: string;
  glow: string;
  href: string;
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
  bg,
  glow,
  href,
}: StatCardProps) {
  return (
    <Link
      to={href}
      className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4 transition-all hover:border-zinc-700 hover:bg-zinc-900 sm:p-6"
    >
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${bg} ${color} ring-1 ring-white/10 transition-transform ring-inset group-hover:scale-110`}
      >
        <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
      </div>

      <div className="min-w-0 flex-1">
        <p className={`text-2xl font-black tabular-nums ${color} sm:text-3xl`}>
          {value}
        </p>
        <p className="text-[11px] font-medium tracking-wide text-zinc-500 uppercase sm:text-xs">
          {label}
        </p>
      </div>

      {/* Glow */}
      <div
        className={`absolute -right-6 -bottom-6 h-20 w-20 rounded-full ${glow} opacity-0 blur-2xl transition-opacity group-hover:opacity-100`}
      />
    </Link>
  );
}

interface QuickStatsProps {
  seasonalCount: number;
  topCount: number;
}

export function QuickStats({ seasonalCount, topCount }: QuickStatsProps) {
  const { count: watchlistCount } = useWatchlist();
  const { data: genresData } = useGenres();
  const genreCount = genresData?.data?.length || 0;

  const stats: StatCardProps[] = [
    {
      icon: Flame,
      label: "Na Temporada",
      value: seasonalCount || "—",
      color: "text-orange-400",
      bg: "bg-orange-500/10",
      glow: "bg-orange-500",
      href: "/seasonal",
    },
    {
      icon: Trophy,
      label: "No Ranking",
      value: topCount || "—",
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
      glow: "bg-yellow-500",
      href: "/top",
    },
    {
      icon: Bookmark,
      label: "Na Sua Lista",
      value: watchlistCount,
      color: "text-pink-400",
      bg: "bg-pink-500/10",
      glow: "bg-pink-500",
      href: "/watchlist",
    },
    {
      icon: Layers,
      label: "Gêneros",
      value: genreCount || "—",
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      glow: "bg-blue-500",
      href: "/animes",
    },
  ];

  return (
    <section className="py-2 sm:py-6">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  );
}
