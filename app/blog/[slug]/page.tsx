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
import { posts } from "#site/content"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)

  if (!post) return {}

  return createMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.updatedAt ?? post.date,
    tags: post.tags,
  })
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)

  if (!post) notFound()
  if (process.env.NODE_ENV === "production" && post.isDraft) notFound()

  return (
    <Section>
      <Container size="small">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to all articles
        </Link>

        <article>
          <header className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary" className="font-mono text-[10px]">
                {post.category}
              </Badge>
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance mb-4">
              {post.title}
            </h1>

            <p className="text-lg text-muted-foreground mb-6">
              {post.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-mono">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" aria-hidden="true" />
                {formatDate(post.date)}
              </span>
              {post.updatedAt && (
                <span className="inline-flex items-center gap-1.5">
                  <Pencil className="h-4 w-4" aria-hidden="true" />
                  Updated {formatDate(post.updatedAt)}
                </span>
              )}
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" aria-hidden="true" />
                {post.readingTime} min read
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-4">
              {post.tags.map((tag) => (
                <Link key={tag} href={`/blog/tags/${tag}`}>
                  <Badge
                    variant="outline"
                    className="text-[10px] px-1.5 py-0 font-mono hover:bg-muted transition-colors"
                  >
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>
          </header>

          <div className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-semibold prose-a:text-primary prose-code:text-primary prose-code:before:content-none prose-code:after:content-none">
            {"rawContent" in post && typeof post.rawContent === "string" ? (
              <MDXRemote
                source={post.rawContent as string}
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
