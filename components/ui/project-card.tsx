"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ExternalLink,
  ImageIcon,
  Star,
  ChevronDown,
  Briefcase,
  Calendar,
  Lightbulb,
  CheckCircle2,
  TrendingUp,
} from "lucide-react"
import { SiGithub } from "react-icons/si"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export interface Project {
  title: string
  description: string
  tags: string[]
  link: string
  github?: string
  image?: string
  featured?: boolean
  role?: string
  duration?: string
  technologies?: string[]
  challenges?: string
  solutions?: string
  results?: string
}

interface ProjectCardProps {
  project: Project
  className?: string
  detailed?: boolean
}

function ProjectPreview({ project }: { project: Project }) {
  return (
    <div className="relative aspect-video w-full overflow-hidden bg-muted">
      {project.image ? (
        <Image
          src={project.image}
          alt={`Preview of ${project.title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover/card:scale-105"
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

function DetailItem({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
        {label}
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{children}</p>
    </div>
  )
}

export function ProjectCard({
  project,
  className,
  detailed = false,
}: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false)
  const hasDetails =
    detailed &&
    (project.role ||
      project.duration ||
      project.challenges ||
      project.solutions ||
      project.results)

  return (
    <Card
      className={cn(
        "group/card flex flex-col overflow-hidden pt-0 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5",
        className
      )}
    >
      <ProjectPreview project={project} />

      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-lg leading-snug">{project.title}</CardTitle>
          {project.featured && (
            <Badge
              variant="secondary"
              className="shrink-0 gap-1 text-[10px] uppercase tracking-wider"
            >
              <Star className="h-3 w-3 fill-current" aria-hidden="true" />
              Featured
            </Badge>
          )}
        </div>

        {(project.technologies ?? project.tags).length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {(project.technologies ?? project.tags).map((tech) => (
              <Badge
                key={tech}
                variant="outline"
                className="text-[10px] font-mono"
              >
                {tech}
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>

      <CardContent className="flex-1">
        <CardDescription className="text-sm leading-relaxed line-clamp-3">
          {project.description}
        </CardDescription>

        {hasDetails && expanded && (
          <div className="mt-6 pt-6 border-t space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
            {project.role && (
              <DetailItem icon={Briefcase} label="Role">
                {project.role}
              </DetailItem>
            )}
            {project.duration && (
              <DetailItem icon={Calendar} label="Duration">
                {project.duration}
              </DetailItem>
            )}
            {project.challenges && (
              <DetailItem icon={Lightbulb} label="Challenges">
                {project.challenges}
              </DetailItem>
            )}
            {project.solutions && (
              <DetailItem icon={CheckCircle2} label="Solutions">
                {project.solutions}
              </DetailItem>
            )}
            {project.results && (
              <DetailItem icon={TrendingUp} label="Results">
                {project.results}
              </DetailItem>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="justify-end gap-2">
        {hasDetails && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded((prev) => !prev)}
            aria-expanded={expanded}
          >
            {expanded ? "Less details" : "More details"}
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform duration-200",
                expanded && "rotate-180"
              )}
              aria-hidden="true"
            />
          </Button>
        )}
        {project.github && (
          <Button variant="outline" size="sm" asChild>
            <Link
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <SiGithub className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only sm:not-sr-only">GitHub</span>
            </Link>
          </Button>
        )}
        <Button variant="default" size="sm" asChild>
          <Link href={project.link} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only sm:not-sr-only">Live Demo</span>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
