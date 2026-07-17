import { Container } from "@/components/ui/container"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <section className="py-16 md:py-24 lg:py-32">
      <Container>
        <Skeleton className="h-9 w-64 mx-auto mb-10" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border bg-card p-4 space-y-4"
            >
              <Skeleton className="h-6 w-3/4" />
              <div className="flex gap-2">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-12 rounded-full" />
                <Skeleton className="h-5 w-14 rounded-full" />
              </div>
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-9 w-full rounded-lg" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
