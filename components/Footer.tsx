"use client"

import Link from "next/link"
import { ArrowUp } from "lucide-react"
import metadata from "@/data/metadata.json"
import { socialLinks } from "@/lib/socials"
import { Container } from "@/components/ui/container"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t bg-background">
      <Container>
        <div className="py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            &copy; {year} {metadata.profile.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {socialLinks.map(({ platform, href, external, icon: Icon }) => (
              <a
                key={platform}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="text-muted-foreground hover:text-foreground transition-colors rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
                aria-label={platform}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </a>
            ))}
          </div>

          <Link
            href="#"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </footer>
  )
}
