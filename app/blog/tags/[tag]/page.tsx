import Link from "next/link"
import { ArrowLeft, FileQuestion } from "lucide-react"
import { ArticleCard } from "@/components/ArticleCard"
import { Container } from "@/components/ui/container"
import { EmptyState } from "@/components/ui/empty-state"
import { Section } from "@/components/ui/section"
import { createMetadata, siteConfig } from "@/lib/metadata"
import { pluralize } from "@/lib/format"
import { posts } from "#site/content"

interface PageProps {
  params: Promise<{ tag: string }>
}

export async function generateStaticParams() {
  const tagSet = new Set<string>()
  posts.forEach((p) => p.tags.forEach((t) => tagSet.add(t)))
  return Array.from(tagSet).map((tag) => ({ tag }))
}

export async function generateMetadata({ params }: PageProps) {
  const { tag } = await params
  return createMetadata({
    title: `#${tag}`,
    description: `Articles tagged with ${tag} on ${siteConfig.name}'s blog.`,
    path: `/blog/tags/${tag}`,
  })
}

export default async function TagArchivePage({ params }: PageProps) {
  const { tag } = await params

  const published =
    process.env.NODE_ENV === "production"
      ? posts.filter((p) => !p.isDraft)
      : posts

  const filtered = published
    .filter((p) => p.tags.includes(tag))
    .map(
      ({ title, slug, description, date, updatedAt, tags, category, readingTime }) => ({
        title,
        slug,
        description,
        date,
        updatedAt,
        tags,
        category,
        readingTime,
      })
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <Section>
      <Container>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to all articles
        </Link>

        <div className="mb-12 text-center">
          <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-4">
            Tag
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl font-mono">
            <span className="text-primary">#</span>
            {tag}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {pluralize(filtered.length, "article")} tagged with &ldquo;{tag}&rdquo;
          </p>
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
            description={`There are no articles tagged with "${tag}".`}
          />
        )}
      </Container>
    </Section>
  )
}
