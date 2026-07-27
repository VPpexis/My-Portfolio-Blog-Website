import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Pencil } from "lucide-react"
import remarkGfm from "remark-gfm"
import rehypeSlug from "rehype-slug"
import rehypePrettyCode from "rehype-pretty-code"
import { Badge } from "@/components/ui/badge"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { createMetadata } from "@/lib/metadata"
import { formatDate } from "@/lib/format"
import { devlogs } from "#site/content"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return devlogs.map((entry) => ({ slug: entry.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const entry = devlogs.find((d) => d.slug === slug)

  if (!entry) return {}

  return createMetadata({
    title: entry.title,
    description: entry.description,
    path: `/devlog/${entry.slug}`,
    type: "article",
    publishedTime: entry.date,
    modifiedTime: entry.updatedAt ?? entry.date,
    tags: entry.tags,
  })
}

export default async function DevlogEntryPage({ params }: PageProps) {
  const { slug } = await params
  const entry = devlogs.find((d) => d.slug === slug)

  if (!entry) notFound()
  if (process.env.NODE_ENV === "production" && entry.isDraft) notFound()

  return (
    <Section>
      <Container size="small">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/devlog"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to devlog
          </Link>
          <span className="text-xs text-muted-foreground font-mono px-2 py-0.5 rounded-md border border-border/60">
            Entry
          </span>
        </div>

        <article>
          <header className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance mb-4">
              {entry.title}
            </h1>

            <p className="text-lg text-muted-foreground mb-6">
              {entry.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-mono">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" aria-hidden="true" />
                {formatDate(entry.date)}
              </span>
              {entry.updatedAt && (
                <span className="inline-flex items-center gap-1.5">
                  <Pencil className="h-4 w-4" aria-hidden="true" />
                  Updated {formatDate(entry.updatedAt)}
                </span>
              )}
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" aria-hidden="true" />
                {entry.readingTime} min read
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-4">
              {entry.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-[10px] px-1.5 py-0 font-mono"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </header>

          <div className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-semibold prose-a:text-primary prose-code:text-primary prose-code:before:content-none prose-code:after:content-none">
            {"rawContent" in entry && typeof entry.rawContent === "string" ? (
              <MDXRemote
                source={entry.rawContent as string}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [
                      rehypeSlug,
                      [
                        rehypePrettyCode,
                        {
                          theme: "github-dark",
                          keepBackground: false,
                        },
                      ],
                    ],
                  },
                }}
              />
            ) : (
              <p className="text-muted-foreground italic">Content unavailable.</p>
            )}
          </div>
        </article>
      </Container>
    </Section>
  )
}
