import { ArrowUpRight, Award, FileText } from "lucide-react"
import metadata from "@/data/metadata.json"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { SectionHeader } from "@/components/ui/section-header"
import { formatDate } from "@/lib/format"

function CredentialRow({
  icon: Icon,
  title,
  subtitle,
  href,
  ariaLabel,
}: {
  icon: React.ElementType
  title: string
  subtitle: string
  href: string
  ariaLabel: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className="group flex items-center gap-4 rounded-xl border bg-card p-4 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:border-primary/30"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted group-hover:bg-primary/10 transition-colors duration-300">
        <Icon
          className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-300"
          aria-hidden="true"
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium leading-snug group-hover:text-primary transition-colors">
          {title}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
      </div>

      <ArrowUpRight
        className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
        aria-hidden="true"
      />
    </a>
  )
}

export function Credentials() {
  const certifications = metadata.certifications ?? []
  const publications = metadata.publications ?? []

  if (certifications.length === 0 && publications.length === 0) return null

  return (
    <Section id="credentials" variant="muted">
      <Container size="small">
        <SectionHeader
          eyebrow="Credentials"
          title="Certifications & Publications"
          description="Credentials that back the work — certifications earned and research published."
        />

        {certifications.length > 0 && (
          <div className="space-y-3 mb-6">
            {certifications.map((cert) => (
              <CredentialRow
                key={cert.name}
                icon={Award}
                title={cert.name}
                subtitle={`${cert.issuer} · ${formatDate(cert.date, {
                  year: "numeric",
                  month: "short",
                })}`}
                href={cert.credentialUrl}
                ariaLabel={`Verify ${cert.name} on Credly`}
              />
            ))}
          </div>
        )}

        {publications.length > 0 && (
          <div className="space-y-3">
            {publications.map((pub) => (
              <CredentialRow
                key={pub.doi}
                icon={FileText}
                title={pub.title}
                subtitle={`${pub.venue} · ${pub.year}`}
                href={pub.doi}
                ariaLabel={`Read ${pub.title} on IEEE Xplore`}
              />
            ))}
          </div>
        )}
      </Container>
    </Section>
  )
}
