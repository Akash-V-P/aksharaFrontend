import { Skeleton } from "@/components/ui/skeleton";

export function VideoGridSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-4 p-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton
          key={i}
          className="aspect-square rounded-md"
        />
      ))}
    </div>
  );
}

export function BookGridSkeleton() {
  return (
    <div className="grid grid-cols-4 gap-4 p-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton
          key={i}
          className="aspect-[3/4] rounded-md"
        />
      ))}
    </div>
  );
}

export function TweetListSkeleton() {
  return (
    <div className="flex flex-col gap-4 p-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="space-y-2 rounded-md border p-4"
        >
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}
