import Link from "next/link"
import { Calendar, Clock, Hash } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { formatShortDate } from "@/lib/format"
import { cn } from "@/lib/utils"

export interface DevlogPost {
  title: string
  slug: string
  description: string
  date: string
  updatedAt?: string
  tags: string[]
  readingTime: number
}

interface DevlogEntryProps {
  post: DevlogPost
  index: number
  total: number
}

export function DevlogEntry({ post, index, total }: DevlogEntryProps) {
  const isLast = index === total - 1
  const entryNumber = total - index

  return (
    <div className={cn("relative pl-14 sm:pl-16", !isLast && "pb-10")}>
      <div
        className={cn(
          "absolute left-[11px] sm:left-[13px] w-px bg-border",
          isLast ? "top-0 h-6" : "top-0 bottom-0"
        )}
        aria-hidden="true"
      />

      <div
        className="absolute left-0 top-0 flex h-6 w-6 sm:h-[26px] sm:w-[26px] items-center justify-center rounded-full border-2 border-border bg-background"
        aria-hidden="true"
      >
        <div className="h-2 w-2 rounded-full bg-primary/40" />
      </div>

      <Link href={`/devlog/${post.slug}`} className="group block">
        <div className="group rounded-xl border border-border/60 bg-card/50 p-5 sm:p-6 transition-all duration-200 hover:border-border hover:bg-card hover:shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
              <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
              {formatShortDate(post.date)}
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono">
              <span className="inline-flex items-center gap-1">
                <Hash className="h-3 w-3" aria-hidden="true" />
                {entryNumber}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3 w-3" aria-hidden="true" />
                {post.readingTime} min read
              </span>
            </div>
          </div>

          <h2 className="text-lg font-semibold leading-snug group-hover:text-primary transition-colors mb-1.5">
            {post.title}
          </h2>

          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-3">
            {post.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-[10px] px-1.5 py-0 font-mono"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </Link>
    </div>
  )
}
