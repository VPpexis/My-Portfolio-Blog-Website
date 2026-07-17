import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { SectionHeader } from "@/components/ui/section-header"
import { socialLinks } from "@/lib/socials"

export function Contact() {
  return (
    <Section id="contact">
      <Container size="small">
        <SectionHeader
          title="Get In Touch"
          description="I'm always open to new opportunities, collaborations, or just a friendly chat. Reach out through any of the channels below."
        />

        <div className="flex flex-wrap items-center justify-center gap-3">
          {socialLinks.map(({ platform, label, href, external, icon: Icon }) => (
            <Button key={platform} variant="outline" size="lg" asChild>
              <Link
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
                <span>{label}</span>
                {external && (
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                )}
              </Link>
            </Button>
          ))}
        </div>
      </Container>
    </Section>
  )
}
