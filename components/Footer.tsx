import { ArrowUp } from "lucide-react"
import metadata from "@/data/metadata.json"
import { socialLinks } from "@/lib/socials"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t bg-background">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="text-sm text-muted-foreground text-center sm:text-left">
          &copy; {year} {metadata.profile.name}. All rights reserved.
        </p>

        <div className="flex items-center gap-4">
          {socialLinks.map(({ platform, href, external, icon: Icon }) => (
            <a
              key={platform}
              href={href}
              target={external ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label={platform}
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>

        <a
          href="#"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Back to top
          <ArrowUp className="h-3.5 w-3.5" />
        </a>
      </div>
    </footer>
  )
}
