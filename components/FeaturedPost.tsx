import Link from "next/link"
import { ArrowRight, Calendar, Clock, Star } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { categoryColorMap, type ArticlePost } from "@/components/ArticleCard"
import { formatShortDate } from "@/lib/format"
import { cn } from "@/lib/utils"

interface FeaturedPostProps {
  post: ArticlePost
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  const accent = categoryColorMap[post.category] ?? "border-l-primary/30"

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block"
      aria-label={`Featured article: ${post.title}`}
    >
      <Card
        className={cn(
          "h-full transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 border-l-2",
          accent
        )}
      >
        <CardHeader className="pb-2">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <Badge className="font-mono text-[10px] gap-1">
              <Star className="h-3 w-3 fill-current" aria-hidden="true" />
              Featured
            </Badge>
            <Badge variant="secondary" className="font-mono text-[10px]">
              {post.category}
            </Badge>
          </div>
          <CardTitle className="text-lg leading-snug line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-sm leading-relaxed line-clamp-2">
            {post.description}
          </CardDescription>
        </CardContent>
        <CardFooter className="items-center justify-between gap-3">
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
          <ArrowRight
            className="h-4 w-4 shrink-0 text-primary transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </CardFooter>
      </Card>
    </Link>
  )
}
