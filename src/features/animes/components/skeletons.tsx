import { Skeleton } from "@/shared/components/ui/skeleton";

// Skeleton para o Cartão Individual de Animes (Mesmo design e Aspect-Ratio)
export function AnimeCardSkeleton() {
  return (
    <div className="group relative w-full overflow-hidden rounded-xl bg-zinc-900 shadow-xl ring-1 ring-white/10">
      {/* Poster Aspect Ratio */}
      <Skeleton className="aspect-2/3 w-full rounded-none" />
      {/* Footer Info Overlay */}
      <div className="absolute right-0 bottom-0 left-0 flex flex-col gap-1.5 p-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  );
}

// Skeleton para o Banner Carousel da HomePage
export function CarouselSkeleton() {
  return (
    <section className="group relative w-full overflow-hidden rounded-2xl bg-zinc-950 shadow-2xl">
      <Skeleton className="h-[380px] w-full rounded-none sm:h-[500px] lg:h-[650px]">
        <div className="absolute inset-0 bg-linear-to-r from-zinc-950/90 via-zinc-950/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex h-full flex-col justify-end p-6 sm:p-12 lg:w-2/3 lg:p-24">
          <Skeleton className="mb-4 h-6 w-24 rounded-full sm:h-8" />
          <Skeleton className="mb-4 h-10 w-3/4 sm:h-14 lg:h-20" />
          <div className="mb-6 flex gap-3">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-16" />
          </div>
          <div className="mb-8 hidden space-y-2 md:block">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
          <div className="flex gap-4">
            <Skeleton className="h-12 w-32 rounded-xl sm:h-14 sm:w-40" />
            <Skeleton className="h-12 w-32 rounded-xl sm:h-14 sm:w-40" />
          </div>
        </div>
      </Skeleton>
    </section>
  );
}

// Skeleton Complexo para a Página de Detalhes Completa
export function AnimeDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-black pb-20">
      {/* Hero Skeleton */}
      <div className="relative h-[60vh] w-full bg-zinc-950 sm:h-[70vh]">
        <Skeleton className="h-full w-full rounded-none opacity-50" />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-12 sm:px-6">
          <Skeleton className="mb-8 h-10 w-10 rounded-full sm:h-12 sm:w-12" />
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="w-full max-w-3xl space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <Skeleton className="h-6 w-12 rounded-md" />
                <Skeleton className="h-6 w-16 rounded-md" />
                <Skeleton className="h-6 w-10 rounded-md" />
              </div>
              <Skeleton className="h-12 w-3/4 sm:h-16 lg:h-20" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-11/12" />
                <Skeleton className="h-4 w-4/5" />
              </div>
              <div className="flex flex-wrap gap-4 pt-4">
                <Skeleton className="h-14 w-48 rounded-xl" />
                <Skeleton className="h-14 w-40 rounded-xl" />
                <Skeleton className="h-14 w-40 rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Sidebar / Main Info Sections... */}
      <div className="mx-auto mt-12 grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-3">
        {/* Left Col (Poster / Stats) */}
        <div className="space-y-6 border-r border-white/5 pr-4 lg:col-span-1">
          <Skeleton className="mx-auto aspect-2/3 w-full max-w-xs rounded-2xl shadow-2xl" />
          <div className="space-y-4 pt-4">
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-5/6" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-4/5" />
          </div>
        </div>

        {/* Mian Col (Tabs) */}
        <div className="space-y-8 lg:col-span-2">
          <Skeleton className="h-12 w-full rounded-2xl" />
          <div className="space-y-6">
            <Skeleton className="h-32 w-full rounded-2xl" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-12 w-full rounded-xl" />
              <Skeleton className="h-12 w-full rounded-xl" />
              <Skeleton className="h-12 w-full rounded-xl" />
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
