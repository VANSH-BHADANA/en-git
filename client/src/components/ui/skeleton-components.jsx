import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function ProfileSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="h-20 w-20 rounded-full bg-muted animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-6 w-48 bg-muted animate-pulse rounded" />
            <div className="h-4 w-32 bg-muted animate-pulse rounded" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="h-4 w-full bg-muted animate-pulse rounded" />
          <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
          <div className="flex gap-2 mt-4">
            <div className="h-8 w-24 bg-muted animate-pulse rounded" />
            <div className="h-8 w-24 bg-muted animate-pulse rounded" />
            <div className="h-8 w-24 bg-muted animate-pulse rounded" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ChartSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="h-6 w-48 bg-muted animate-pulse rounded" />
        <div className="h-4 w-64 bg-muted animate-pulse rounded mt-2" />
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full bg-muted animate-pulse rounded" />
      </CardContent>
    </Card>
  );
}

export function ListSkeleton({ rows = 3 }) {
  return (
    <Card>
      <CardHeader>
        <div className="h-6 w-48 bg-muted animate-pulse rounded" />
        <div className="h-4 w-64 bg-muted animate-pulse rounded mt-2" />
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {Array.from({ length: rows }).map((_, i) => (
            <div key={i} className="p-3 border rounded space-y-2">
              <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
              <div className="h-3 w-full bg-muted animate-pulse rounded" />
              <div className="flex gap-2">
                <div className="h-6 w-16 bg-muted animate-pulse rounded" />
                <div className="h-6 w-16 bg-muted animate-pulse rounded" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function InsightsLoadingSkeleton() {
  return (
    <>
      <ProfileSkeleton />
      <div className="grid md:grid-cols-2 gap-6">
        <ChartSkeleton />
        <ChartSkeleton />
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <ChartSkeleton />
        <ChartSkeleton />
      </div>
      <ChartSkeleton />
      <ListSkeleton rows={5} />
    </>
  );
}
