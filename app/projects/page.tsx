"use client"

import { useState, useMemo } from "react"
import { FolderGit } from "lucide-react"
import { SiGithub } from "react-icons/si"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { EmptyState } from "@/components/ui/empty-state"
import { PageHeader } from "@/components/ui/page-header"
import { ProjectCard, type Project } from "@/components/ui/project-card"
import { Section } from "@/components/ui/section"
import siteData from "@/data/metadata.json"

const filters = [
  "All",
  "Personal",
  "Professional",
]

function normalizeFilter(filter: string): string {
  return filter.toLowerCase().replace(/\s+/g, "")
}

function getProjects(): Project[] {
  return siteData.projects.map((p) => ({
    title: p.title,
    description: p.description,
    tags: p.tags,
    link: p.link,
    github: "github" in p && typeof p.github === "string" ? p.github : undefined,
    image: "image" in p && typeof p.image === "string" && p.image.length > 0 ? p.image : undefined,
    featured: "featured" in p && p.featured === true,
    role: "role" in p && typeof p.role === "string" ? p.role : undefined,
    duration: "duration" in p && typeof p.duration === "string" ? p.duration : undefined,
    technologies:
      "technologies" in p && Array.isArray(p.technologies)
        ? p.technologies
        : undefined,
    challenges:
      "challenges" in p && typeof p.challenges === "string"
        ? p.challenges
        : undefined,
    solutions:
      "solutions" in p && typeof p.solutions === "string" ? p.solutions : undefined,
    results: "results" in p && typeof p.results === "string" ? p.results : undefined,
  }))
}

function matchesFilter(project: Project, filter: string): boolean {
  if (filter === "All") return true

  const normalizedFilter = normalizeFilter(filter)
  const normalizedCategory =
    "category" in project && typeof project.category === "string"
      ? normalizeFilter(project.category)
      : ""
  const normalizedType =
    "type" in project && typeof project.type === "string"
      ? normalizeFilter(project.type)
      : ""

  if (normalizedCategory === normalizedFilter || normalizedType === normalizedFilter)
    return true

  // Map generic filters to tags/categories
  const tagMap: Record<string, string[]> = {
    frontend: ["next.js", "react", "tailwind css", "web dev", "frontend"],
    backend: ["python", "docker", "aws", "backend"],
    fullstack: ["full stack", "fullstack"],
    mobile: ["mobile", "react native", "flutter"],
    ai: ["ai", "machine learning", "data science"],
    opensource: ["open source"],
    personal: ["personal"],
    professional: ["professional"],
  }

  const mappedTerms = tagMap[normalizedFilter] ?? [normalizedFilter]
  const searchSpace = [
    ...project.tags.map((t) => t.toLowerCase()),
    normalizedCategory,
    normalizedType,
  ]

  return mappedTerms.some((term) =>
    searchSpace.some((space) => space.includes(term))
  )
}

export default function ProjectsPage() {
  const projects = useMemo(() => getProjects(), [])
  const [activeFilter, setActiveFilter] = useState("All")

  const filtered = useMemo(
    () => projects.filter((p) => matchesFilter(p, activeFilter)),
    [projects, activeFilter]
  )

  const featuredCount = projects.filter((p) => p.featured).length

  return (
    <Section>
      <Container>
        <PageHeader
          eyebrow="Projects"
          title="Selected Work"
          description="A collection of projects that demonstrate my approach to building scalable, performant, and user-focused software."
        />

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-12">
          <div className="rounded-xl border bg-card p-4 text-center">
            <p className="text-2xl font-bold">{projects.length}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              Projects
            </p>
          </div>
          <div className="rounded-xl border bg-card p-4 text-center">
            <p className="text-2xl font-bold">{featuredCount}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              Featured
            </p>
          </div>
          <div className="rounded-xl border bg-card p-4 text-center col-span-2 sm:col-span-1">
            <p className="text-2xl font-bold">{filters.length - 1}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              Categories
            </p>
          </div>
        </div>

        {/* Filters */}
        <div
          className="flex flex-wrap justify-center gap-2 mb-10"
          role="group"
          aria-label="Filter projects by category"
        >
          {filters.map((filter) => (
            <Badge
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              className="cursor-pointer h-9 px-4 text-xs font-medium transition-all"
              onClick={() => setActiveFilter(filter)}
              aria-pressed={activeFilter === filter}
            >
              {filter}
            </Badge>
          ))}
        </div>

        {/* Project grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project) => (
              <ProjectCard key={project.link} project={project} detailed />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<FolderGit className="h-6 w-6" />}
            title="No projects found"
            description={`There are no projects matching the "${activeFilter}" filter.`}
            action={
              <Button variant="outline" asChild>
                <a
                  href={siteData.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SiGithub className="h-4 w-4" aria-hidden="true" />
                  View GitHub
                </a>
              </Button>
            }
          />
        )}
      </Container>
    </Section>
  )
}
