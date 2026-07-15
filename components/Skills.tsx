import * as SiIcons from "react-icons/si"
import * as FaIcons from "react-icons/fa"
import type { IconType } from "react-icons"
import metadata from "@/data/metadata.json"

function resolveIcon(iconName: string): IconType | null {
  if (iconName.startsWith("Si")) {
    return (SiIcons as Record<string, IconType>)[iconName] ?? null
  }
  if (iconName.startsWith("Fa")) {
    return (FaIcons as Record<string, IconType>)[iconName] ?? null
  }
  return null
}

export function Skills() {
  return (
    <section id="skills" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center antialiased">
          Skills &amp; Technologies
        </h2>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-4">
          {metadata.skills.map((skill) => {
            const Icon = resolveIcon(skill.icon)

            return (
              <div
                key={skill.name}
                className="flex flex-col items-center gap-3 p-5 rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-200"
              >
                {Icon ? (
                  <Icon className="h-9 w-9 text-primary" />
                ) : (
                  <div className="h-9 w-9 rounded bg-muted" />
                )}
                <span className="text-xs font-medium text-muted-foreground text-center leading-tight">
                  {skill.name}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
