// src/features/mangas/components/manga-skeletons.tsx
import { Skeleton } from "@/shared/components/ui/skeleton";

export function MangaCardSkeleton() {
  return (
    <div className="group relative w-full overflow-hidden rounded-xl bg-zinc-100 shadow-xl ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-white/10">
      <Skeleton className="aspect-2/3 w-full rounded-none" />
      <div className="absolute right-0 bottom-0 left-0 flex flex-col gap-1.5 p-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  );
}

export function MangaDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-white pb-20 dark:bg-black">
      <div className="relative h-[60vh] w-full bg-zinc-100 sm:h-[70vh] dark:bg-zinc-950">
        <Skeleton className="h-full w-full rounded-none opacity-50" />
        <div className="absolute inset-0 bg-linear-to-t from-white via-white/60 to-transparent dark:from-black dark:via-black/60" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-12 sm:px-6">
          <Skeleton className="mb-8 h-10 w-10 rounded-full sm:h-12 sm:w-12" />
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="w-full max-w-3xl space-y-4">
              <Skeleton className="h-12 w-3/4 sm:h-16 lg:h-20" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-11/12" />
              </div>
              <div className="flex flex-wrap gap-4 pt-4">
                <Skeleton className="h-14 w-48 rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
