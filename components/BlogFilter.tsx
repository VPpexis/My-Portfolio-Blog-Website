"use client"

import { useState, useMemo } from "react"
import Fuse from "fuse.js"
import { Search, ArrowUpDown, FileQuestion } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { EmptyState } from "@/components/ui/empty-state"
import { ArticleCard, type ArticlePost } from "@/components/ArticleCard"

interface BlogFilterProps {
  posts: ArticlePost[]
}

export function BlogFilter({ posts }: BlogFilterProps) {
  const [query, setQuery] = useState("")
  const [activeTag, setActiveTag] = useState("All")
  const [sortNewest, setSortNewest] = useState(true)

  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    posts.forEach((p) => p.tags.forEach((t) => tagSet.add(t)))
    return Array.from(tagSet).sort()
  }, [posts])

  const fuse = useMemo(
    () =>
      new Fuse(posts, {
        keys: ["title", "description", "tags"],
        threshold: 0.3,
      }),
    [posts]
  )

  const filtered = useMemo(() => {
    let result = posts

    if (query.trim()) {
      result = fuse.search(query.trim()).map((r) => r.item)
    }

    if (activeTag !== "All") {
      result = result.filter((p) => p.tags.includes(activeTag))
    }

    return [...result].sort((a, b) => {
      const cmp = new Date(b.date).getTime() - new Date(a.date).getTime()
      return sortNewest ? cmp : -cmp
    })
  }, [posts, query, activeTag, sortNewest, fuse])

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none"
            aria-hidden="true"
          />
          <Input
            type="search"
            placeholder="Search articles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
            aria-label="Search articles"
          />
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setSortNewest((p) => !p)}
          className="h-11 px-4 shrink-0 gap-2 font-mono text-xs"
        >
          <ArrowUpDown className="h-4 w-4" aria-hidden="true" />
          {sortNewest ? "Newest First" : "Oldest First"}
        </Button>
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by tag">
        <Badge
          variant={activeTag === "All" ? "default" : "outline"}
          className="cursor-pointer h-8 px-3 text-xs font-mono transition-all"
          onClick={() => setActiveTag("All")}
          aria-pressed={activeTag === "All"}
        >
          All
        </Badge>
        {allTags.map((tag) => (
          <Badge
            key={tag}
            variant={activeTag === tag ? "default" : "outline"}
            className="cursor-pointer h-8 px-3 text-xs font-mono transition-all"
            onClick={() => setActiveTag(tag)}
            aria-pressed={activeTag === tag}
          >
            {tag}
          </Badge>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<FileQuestion className="h-6 w-6" />}
          title="No articles found"
          description={
            <>
              {query && (
                <span>
                  No results for <strong>&ldquo;{query}&rdquo;</strong>
                  {activeTag !== "All" && (
                    <span>
                      {" "}
                      in <strong>#{activeTag}</strong>
                    </span>
                  )}
                  .
                </span>
              )}
              {!query && activeTag !== "All" && (
                <span>
                  No articles tagged with <strong>#{activeTag}</strong>.
                </span>
              )}
              {!query && activeTag === "All" && (
                <span>There are no articles to display right now.</span>
              )}
            </>
          }
        />
      )}
    </div>
  )
}
