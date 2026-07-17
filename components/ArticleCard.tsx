import Link from "next/link"
import { Calendar, Clock } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatShortDate } from "@/lib/format"
import { cn } from "@/lib/utils"

const categoryColorMap: Record<string, string> = {
  DevOps: "border-l-cyan-500",
  "Cloud Architecture": "border-l-violet-500",
  Frontend: "border-l-emerald-500",
  Tutorials: "border-l-amber-500",
}

export interface ArticlePost {
  title: string
  slug: string
  description: string
  date: string
  updatedAt?: string
  tags: string[]
  category: string
  readingTime: number
}

interface ArticleCardProps {
  post: ArticlePost
}

export function ArticleCard({ post }: ArticleCardProps) {
  const accent = categoryColorMap[post.category] ?? "border-l-primary/30"

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <Card
        className={cn(
          "h-full transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 border-l-2",
          accent
        )}
      >
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="secondary" className="font-mono text-[10px]">
              {post.category}
            </Badge>
          </div>
          <CardTitle className="text-lg leading-snug group-hover:text-primary transition-colors">
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-sm leading-relaxed line-clamp-2">
            {post.description}
          </CardDescription>
        </CardContent>
        <CardFooter className="flex-col items-start gap-3">
          <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
              {formatShortDate(post.date)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {post.readingTime} min read
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-[10px] px-1.5 py-0 font-mono hover:bg-muted transition-colors"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
