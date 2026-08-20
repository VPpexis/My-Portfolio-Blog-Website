import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { SectionHeader } from "@/components/ui/section-header"
import { FeaturedPost } from "@/components/FeaturedPost"
import { getFeaturedPosts } from "@/lib/posts"

export function FeaturedBlog() {
  const featured = getFeaturedPosts()

  if (featured.length === 0) return null

  return (
    <Section id="featured-blog" variant="muted">
      <Container>
        <SectionHeader
          eyebrow="From the Blog"
          title="Featured Articles"
          action={
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="hidden sm:inline-flex"
            >
              <Link href="/blog">
                View all
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((post) => (
            <FeaturedPost key={post.slug} post={post} />
          ))}
        </div>
      </Container>
    </Section>
  )
}
