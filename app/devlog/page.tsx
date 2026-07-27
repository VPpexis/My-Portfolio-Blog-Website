import { DevlogEntry } from "@/components/DevlogEntry"
import { Container } from "@/components/ui/container"
import { PageHeader } from "@/components/ui/page-header"
import { Section } from "@/components/ui/section"
import { createMetadata } from "@/lib/metadata"
import { devlogs } from "#site/content"

export const metadata = createMetadata({
  title: "Devlog",
  description:
    "A developer's journal — quick updates, behind-the-scenes notes, and work-in-progress thoughts.",
  path: "/devlog",
})

export default function DevlogPage() {
  const published =
    process.env.NODE_ENV === "production"
      ? devlogs.filter((d) => !d.isDraft)
      : devlogs

  const sorted = [...published].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  const entryList = sorted.map(
    ({ title, slug, description, date, updatedAt, tags, readingTime }) => ({
      title,
      slug,
      description,
      date,
      updatedAt,
      tags,
      readingTime,
    })
  )

  return (
    <Section>
      <Container size="small">
        <PageHeader
          eyebrow="Devlog"
          title={
            <>
              Dev <span className="text-primary">Diary</span>
            </>
          }
          description="Raw, unfiltered updates from the trenches. What I'm building, breaking, and learning — in real time."
        />

        {entryList.length > 0 ? (
          <div className="mt-10">
            {entryList.map((post, index) => (
              <DevlogEntry
                key={post.slug}
                post={post}
                index={index}
                total={entryList.length}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-16">
            No devlog entries yet. Check back soon.
          </p>
        )}
      </Container>
    </Section>
  )
}
