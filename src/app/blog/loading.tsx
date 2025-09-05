export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-lg border p-4">
            <div className="h-5 w-2/3 bg-muted rounded animate-pulse mb-2" />
            <div className="h-4 w-3/4 bg-muted/70 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}

