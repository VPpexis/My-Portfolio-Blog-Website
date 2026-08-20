import { BlogFilter } from "@/components/BlogFilter"
import { FeaturedPost } from "@/components/FeaturedPost"
import { Container } from "@/components/ui/container"
import { PageHeader } from "@/components/ui/page-header"
import { Section } from "@/components/ui/section"
import { createMetadata } from "@/lib/metadata"
import { getFeaturedPosts } from "@/lib/posts"
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

  const featuredPosts = getFeaturedPosts()

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

        {featuredPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 md:mb-12">
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.slug} post={post} />
            ))}
          </div>
        )}

        <BlogFilter posts={postList} />
      </Container>
    </Section>
  )
}
