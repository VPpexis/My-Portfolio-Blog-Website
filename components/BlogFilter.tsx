"use client"

import { useMemo, useState } from "react"
import Fuse from "fuse.js"
import { FileQuestion, Search, SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { EmptyState } from "@/components/ui/empty-state"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ArticleCard, type ArticlePost } from "@/components/ArticleCard"
import { cn } from "@/lib/utils"

interface BlogFilterProps {
  posts: ArticlePost[]
}

interface FilterEntry {
  label: string
  count: number
}

function Chip({
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

function countEntries(posts: ArticlePost[], key: "tags" | "category") {
  const counts = new Map<string, FilterEntry>()
  posts.forEach((post) => {
    const values = key === "tags" ? post.tags : [post.category]
    const seen = new Set<string>()
    values.forEach((value) => {
      const normalized = value.toLowerCase()
      if (seen.has(normalized)) return
      seen.add(normalized)
      const entry = counts.get(normalized)
      if (entry) entry.count += 1
      else counts.set(normalized, { label: value, count: 1 })
    })
  })
  return Array.from(counts.values()).sort(
    (a, b) => b.count - a.count || a.label.localeCompare(b.label)
  )
}

function toggle(list: string[], label: string) {
  return list.some((item) => item.toLowerCase() === label.toLowerCase())
    ? list.filter((item) => item.toLowerCase() !== label.toLowerCase())
    : [...list, label]
}

export function BlogFilter({ posts }: BlogFilterProps) {
  const [query, setQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [sortNewest, setSortNewest] = useState(true)
  const [open, setOpen] = useState(false)

  const tagEntries = useMemo(() => countEntries(posts, "tags"), [posts])
  const categoryEntries = useMemo(() => countEntries(posts, "category"), [posts])

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

    if (selectedCategories.length > 0) {
      result = result.filter((post) =>
        selectedCategories.some(
          (c) => c.toLowerCase() === post.category.toLowerCase()
        )
      )
    }

    if (selectedTags.length > 0) {
      result = result.filter((post) =>
        selectedTags.some((selected) =>
          post.tags.some((tag) => tag.toLowerCase() === selected.toLowerCase())
        )
      )
    }

    return [...result].sort((a, b) => {
      const cmp = new Date(b.date).getTime() - new Date(a.date).getTime()
      return sortNewest ? cmp : -cmp
    })
  }, [posts, query, selectedCategories, selectedTags, sortNewest, fuse])

  const activeFilterCount =
    selectedTags.length + selectedCategories.length + (sortNewest ? 0 : 1)
  const isFiltering = query.trim() !== "" || activeFilterCount > 0

  const clearFilters = () => {
    setQuery("")
    setSelectedTags([])
    setSelectedCategories([])
    setSortNewest(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
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

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="h-11 shrink-0 gap-2 px-4 font-mono text-xs"
              aria-label={`Open filters${activeFilterCount > 0 ? `, ${activeFilterCount} active` : ""}`}
            >
              <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
              Filters
              {activeFilterCount > 0 && (
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-semibold text-primary-foreground tabular-nums">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Filter articles</DialogTitle>
              <DialogDescription>
                Refine by category, tags, and sort order.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-5">
              <div className="space-y-2">
                <p className="font-mono text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                  Sort by
                </p>
                <div className="flex gap-1.5">
                  <Chip
                    label="Newest first"
                    active={sortNewest}
                    onClick={() => setSortNewest(true)}
                  />
                  <Chip
                    label="Oldest first"
                    active={!sortNewest}
                    onClick={() => setSortNewest(false)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <p className="font-mono text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                  Category
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {categoryEntries.map(({ label, count }) => (
                    <Chip
                      key={label}
                      label={label}
                      count={count}
                      active={selectedCategories.some(
                        (c) => c.toLowerCase() === label.toLowerCase()
                      )}
                      onClick={() =>
                        setSelectedCategories((current) =>
                          toggle(current, label)
                        )
                      }
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <p className="font-mono text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                  Tags
                </p>
                <div className="flex max-h-40 flex-wrap content-start gap-1.5 overflow-y-auto py-1 -my-1">
                  {tagEntries.map(({ label, count }) => (
                    <Chip
                      key={label}
                      label={label}
                      count={count}
                      active={selectedTags.some(
                        (t) => t.toLowerCase() === label.toLowerCase()
                      )}
                      onClick={() =>
                        setSelectedTags((current) => toggle(current, label))
                      }
                    />
                  ))}
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="ghost"
                onClick={clearFilters}
                disabled={!isFiltering}
                className="gap-1 font-mono text-xs text-muted-foreground"
              >
                <X className="size-3" aria-hidden="true" />
                Clear all
              </Button>
              <Button onClick={() => setOpen(false)} className="font-mono text-xs">
                Show {filtered.length}{" "}
                {filtered.length === 1 ? "article" : "articles"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center justify-between font-mono text-xs text-muted-foreground">
        <span>
          {filtered.length} of {posts.length} articles
          {activeFilterCount > 0 && (
            <>
              {" "}
              ·{" "}
              <span className="text-foreground">
                {activeFilterCount}{" "}
                {activeFilterCount === 1 ? "filter" : "filters"} active
              </span>
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
            query.trim() ? (
              <span>
                No results for <strong>&ldquo;{query.trim()}&rdquo;</strong> with
                the current filters.
              </span>
            ) : (
              <span>No articles match the current filters.</span>
            )
          }
        />
      )}
    </div>
  )
}
