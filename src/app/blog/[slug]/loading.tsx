export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="space-y-3">
        <div className="h-8 w-2/3 bg-muted rounded animate-pulse" />
        <div className="h-4 w-1/2 bg-muted/70 rounded animate-pulse" />
      </div>
      <div className="mt-6 space-y-3">
        <div className="h-4 w-full bg-muted/70 rounded animate-pulse" />
        <div className="h-4 w-11/12 bg-muted/60 rounded animate-pulse" />
        <div className="h-4 w-10/12 bg-muted/50 rounded animate-pulse" />
      </div>
    </div>
  );
}

