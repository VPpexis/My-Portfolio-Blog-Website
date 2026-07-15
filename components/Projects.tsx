import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ImageIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import metadata from "@/data/metadata.json"

interface Project {
  title: string
  description: string
  tags: string[]
  link: string
  image: string | null
}

function getProjects(): Project[] {
  return metadata.projects.map((p) => ({
    title: p.title,
    description: p.description,
    tags: p.tags,
    link: p.link,
    image:
      "image" in p && typeof p.image === "string" && p.image.length > 0
        ? p.image
        : null,
  }))
}

function EmptyState() {
  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 antialiased">
          Featured Projects
        </h2>
        <p className="text-muted-foreground">
          Projects coming soon. In the meantime, check out my{" "}
          <a
            href={metadata.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            GitHub
          </a>
          !
        </p>
      </div>
    </section>
  )
}

function ProjectPreview({ project }: { project: Project }) {
  return (
    <div className="relative aspect-video w-full overflow-hidden border-b bg-muted">
      {project.image ? (
        <Image
          src={project.image}
          alt={`Preview of ${project.title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground">
          <ImageIcon className="h-8 w-8" aria-hidden="true" />
          <span className="text-xs font-medium">No preview available</span>
        </div>
      )}
    </div>
  )
}

export function Projects() {
  const projects = getProjects()

  if (projects.length === 0) return <EmptyState />

  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center antialiased">
          Featured Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.link} className="flex flex-col pt-0">
              <ProjectPreview project={project} />

              <CardHeader>
                <CardTitle>{project.title}</CardTitle>

                {project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardHeader>

              <CardContent className="flex-grow">
                <CardDescription className="text-base">
                  {project.description}
                </CardDescription>
              </CardContent>

              <CardFooter className="justify-end">
                <Button variant="outline" size="sm" asChild>
                  <Link
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Project
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}