import { ArrowRight, FolderGit } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { EmptyState } from "@/components/ui/empty-state"
import { ProjectCard, type Project } from "@/components/ui/project-card"
import { Section } from "@/components/ui/section"
import { SectionHeader } from "@/components/ui/section-header"
import siteData from "@/data/metadata.json"

function getProjects(): Project[] {
  return siteData.projects.map((p) => ({
    title: p.title,
    description: p.description,
    tags: p.tags,
    link: p.link,
    github:
      "github" in p && typeof p.github === "string" ? p.github : undefined,
    image:
      "image" in p && typeof p.image === "string" && p.image.length > 0
        ? p.image
        : undefined,
    featured: "featured" in p && p.featured === true,
  }))
}

export function Projects() {
  const projects = getProjects()

  if (projects.length === 0) {
    return (
      <Section id="projects">
        <Container>
          <EmptyState
            icon={<FolderGit className="h-6 w-6" />}
            title="Featured Projects"
            description="Projects coming soon. In the meantime, check out my GitHub for works in progress."
            action={
              <Button variant="outline" asChild>
                <Link
                  href={siteData.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit GitHub
                </Link>
              </Button>
            }
          />
        </Container>
      </Section>
    )
  }

  return (
    <Section id="projects">
      <Container>
        <SectionHeader
          eyebrow="Portfolio"
          title="Featured Projects"
          description=""
          action={
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="hidden sm:inline-flex"
            >
              <Link href="/projects">
                View all
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.link} project={project} />
          ))}
        </div>
      </Container>
    </Section>
  )
}
