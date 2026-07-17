import { BlogFilter } from "@/components/BlogFilter"
import { Container } from "@/components/ui/container"
import { PageHeader } from "@/components/ui/page-header"
import { Section } from "@/components/ui/section"
import { createMetadata } from "@/lib/metadata"
import { posts } from "#site/content"

export const metadata = createMetadata({
  title: "Blog",
  description:
    "Technical writing and architecture notes on DevOps, cloud infrastructure, and full-stack development.",
  path: "/blog",
})

export default function BlogPage() {
  const published =
    process.env.NODE_ENV === "production"
      ? posts.filter((p) => !p.isDraft)
      : posts

  const sorted = [...published].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  const postList = sorted.map(
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

  return (
    <Section>
      <Container>
        <PageHeader
          eyebrow="Blog"
          title={
            <>
              Written between <span className="text-primary">Builds</span>
            </>
          }
          description="Thoughts on DevOps, cloud architecture, software engineering, and everything in between."
        />

        <BlogFilter posts={postList} />
      </Container>
    </Section>
  )
}
