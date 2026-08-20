import type { IconType } from "react-icons"
import {
  SiDocker,
  SiGo,
  SiJavascript,
  SiLinux,
  SiNextdotjs,
  SiPython,
  SiTypescript,
} from "react-icons/si"
import { FaAws } from "react-icons/fa"
import metadata from "@/data/metadata.json"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { SectionHeader } from "@/components/ui/section-header"
import { cn } from "@/lib/utils"

const iconMap: Record<string, IconType> = {
  SiTypescript,
  SiJavascript,
  SiPython,
  SiGo,
  SiNextdotjs,
  FaAws,
  SiDocker,
  SiLinux,
}

function resolveIcon(iconName: string): IconType | null {
  return iconMap[iconName] ?? null
}

export function Skills() {
  return (
    <Section id="skills" variant="muted">
      <Container>
        <SectionHeader
          eyebrow="Toolkit"
          title="Skills & Technologies"
          description="Languages, frameworks, and platforms I use to design, build, and ship reliable software."
        />

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-4">
          {metadata.skills.map((skill) => {
            const Icon = resolveIcon(skill.icon)

            return (
              <div
                key={skill.name}
                className={cn(
                  "group flex flex-col items-center gap-3 rounded-xl border bg-card p-4 text-card-foreground",
                  "transition-all duration-200 hover:shadow-md hover:border-primary/30 hover:-translate-y-0.5"
                )}
              >
                {Icon ? (
                  <Icon
                    className="h-8 w-8 text-primary transition-transform duration-200 group-hover:scale-110"
                    aria-hidden="true"
                  />
                ) : (
                  <div className="h-8 w-8 rounded bg-muted" aria-hidden="true" />
                )}
                <span className="text-xs font-medium text-muted-foreground text-center leading-tight">
                  {skill.name}
                </span>
              </div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
