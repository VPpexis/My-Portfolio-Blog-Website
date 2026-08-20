"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Fuse from "fuse.js"
import { ArrowUpDown, FileQuestion, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { EmptyState } from "@/components/ui/empty-state"
import { ArticleCard, type ArticlePost } from "@/components/ArticleCard"
import { cn } from "@/lib/utils"

interface BlogFilterProps {
  posts: ArticlePost[]
}

interface TagEntry {
  label: string
  count: number
}

function TagButton({
  label,
  count,
  active,
  onClick,
}: {
  label: string
  count?: number
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex h-8 shrink-0 items-center gap-1.5 rounded-4xl border px-3 font-mono text-xs transition-colors",
        "focus-visible:outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
        active
          ? "border-transparent bg-primary text-primary-foreground"
          : "border-border bg-background text-muted-foreground hover:border-ring/40 hover:text-foreground"
      )}
    >
      {label}
      {count !== undefined && (
        <span
          className={cn(
            "tabular-nums",
            active ? "text-primary-foreground/70" : "text-muted-foreground/60"
          )}
        >
          {count}
        </span>
      )}
    </button>
  )
}

export function BlogFilter({ posts }: BlogFilterProps) {
  const [query, setQuery] = useState("")
  const [activeTag, setActiveTag] = useState("All")
  const [sortNewest, setSortNewest] = useState(true)
  const railRef = useRef<HTMLDivElement>(null)
  const [railOverflow, setRailOverflow] = useState({ start: false, end: false })

  const tagEntries = useMemo(() => {
    const counts = new Map<string, TagEntry>()
    posts.forEach((post) => {
      const seen = new Set<string>()
      post.tags.forEach((tag) => {
        const key = tag.toLowerCase()
        if (seen.has(key)) return
        seen.add(key)
        const entry = counts.get(key)
        if (entry) entry.count += 1
        else counts.set(key, { label: tag, count: 1 })
      })
    })
    return Array.from(counts.values()).sort(
      (a, b) => b.count - a.count || a.label.localeCompare(b.label)
    )
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
      result = result.filter((post) =>
        post.tags.some((tag) => tag.toLowerCase() === activeTag.toLowerCase())
      )
    }

    return [...result].sort((a, b) => {
      const cmp = new Date(b.date).getTime() - new Date(a.date).getTime()
      return sortNewest ? cmp : -cmp
    })
  }, [posts, query, activeTag, sortNewest, fuse])

  useEffect(() => {
    const el = railRef.current
    if (!el) return

    const update = () =>
      setRailOverflow({
        start: el.scrollLeft > 0,
        end: el.scrollLeft + el.clientWidth < el.scrollWidth - 1,
      })

    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    el.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      observer.disconnect()
      el.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [tagEntries])

  const isFiltering = query.trim() !== "" || activeTag !== "All"

  const clearFilters = () => {
    setQuery("")
    setActiveTag("All")
  }

  const selectTag = (label: string) =>
    setActiveTag((current) =>
      current.toLowerCase() === label.toLowerCase() ? "All" : label
    )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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

      <div className="relative" role="group" aria-label="Filter by tag">
        <div
          ref={railRef}
          className="no-scrollbar flex items-center gap-1.5 overflow-x-auto py-1 -my-1"
        >
          <TagButton
            label="All"
            count={posts.length}
            active={activeTag === "All"}
            onClick={() => setActiveTag("All")}
          />
          {tagEntries.map(({ label, count }) => (
            <TagButton
              key={label}
              label={label}
              count={count}
              active={activeTag.toLowerCase() === label.toLowerCase()}
              onClick={() => selectTag(label)}
            />
          ))}
        </div>
        {railOverflow.start && (
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-background to-transparent"
            aria-hidden="true"
          />
        )}
        {railOverflow.end && (
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-background to-transparent"
            aria-hidden="true"
          />
        )}
      </div>

      <div className="flex items-center justify-between font-mono text-xs text-muted-foreground">
        <span>
          {filtered.length} of {posts.length} articles
          {activeTag !== "All" && (
            <>
              {" "}
              · <span className="text-foreground">#{activeTag}</span>
            </>
          )}
          {query.trim() && (
            <>
              {" "}
              · <span className="text-foreground">&ldquo;{query.trim()}&rdquo;</span>
            </>
          )}
        </span>
        {isFiltering && (
          <Button
            variant="ghost"
            size="xs"
            onClick={clearFilters}
            className="gap-1 font-mono text-muted-foreground"
          >
            <X className="size-3" aria-hidden="true" />
            Clear
          </Button>
        )}
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
