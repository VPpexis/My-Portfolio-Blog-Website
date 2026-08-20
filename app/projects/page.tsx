import { PageHeader } from "@/components/ui/page-header"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { createMetadata } from "@/lib/metadata"
import siteData from "@/data/metadata.json"
import { ProjectsGrid } from "./ProjectsGrid"

export const metadata = createMetadata({
  title: "Projects",
  description: `Selected projects by ${siteData.profile.name} — scalable, performant, and user-focused software.`,
  path: "/projects",
})

export default function ProjectsPage() {
  return (
    <Section>
      <Container>
        <PageHeader
          eyebrow="Projects"
          title="Selected Work"
          description="A collection of projects that demonstrate my approach to building scalable, performant, and user-focused software."
        />

        <ProjectsGrid />
      </Container>
    </Section>
  )
}
