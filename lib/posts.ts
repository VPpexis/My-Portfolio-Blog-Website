import { posts } from "#site/content"
import type { ArticlePost } from "@/components/ArticleCard"

type Post = (typeof posts)[number]

function toArticlePost(post: Post): ArticlePost {
  return {
    title: post.title,
    slug: post.slug,
    description: post.description,
    date: post.date,
    updatedAt: post.updatedAt,
    tags: post.tags,
    category: post.category,
    readingTime: post.readingTime,
  }
}

/**
 * Returns featured posts (newest first), capped at `limit`.
 * Falls back to the latest post when none are flagged as featured.
 */
export function getFeaturedPosts(limit = 3): ArticlePost[] {
  const published =
    process.env.NODE_ENV === "production"
      ? posts.filter((p) => !p.isDraft)
      : posts

  const sorted = [...published].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  const featured = sorted.filter((p) => p.featured).slice(0, limit)
  const selected = featured.length > 0 ? featured : sorted.slice(0, 1)

  return selected.map(toArticlePost)
}
