import Link from "next/link"
import { Mail, ArrowRight } from "lucide-react"
import { LinkedInIcon } from "@/components/icons"
import { Container } from "@/components/ui/container"
import { PageHeader } from "@/components/ui/page-header"
import { Section } from "@/components/ui/section"
import { createMetadata } from "@/lib/metadata"
import siteData from "@/data/metadata.json"
import { ContactForm } from "./ContactForm"
import { CopyEmailButton } from "./CopyEmailButton"

export const metadata = createMetadata({
  title: "Contact",
  description: `Get in touch with ${siteData.profile.name} for opportunities, collaborations, or questions.`,
  path: "/contact",
})

const contactMethods = [
  {
    label: "Email",
    value: siteData.socials.email,
    href: `mailto:${siteData.socials.email}`,
    icon: Mail,
  },
  {
    label: "LinkedIn",
    value: "vanpanugan",
    href: siteData.socials.linkedin,
    icon: LinkedInIcon,
  },
]

export default function ContactPage() {
  return (
    <Section>
      <Container>
        <PageHeader
          eyebrow="Get In Touch"
          title={
            <>
              Let&apos;s build something{" "}
              <span className="text-primary">great together</span>
            </>
          }
          description="Whether you have a project idea, a question, or just want to say hi — my inbox is always open."
        />

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left — contact cards */}
          <div className="lg:col-span-2 space-y-4">
            {contactMethods.map((method) => {
              const Icon = method.icon
              const external = method.label !== "Email"

              return (
                <Link
                  key={method.label}
                  href={method.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="group relative flex items-center gap-4 rounded-xl border bg-card p-5 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:border-primary/30"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-muted group-hover:bg-primary/10 transition-colors duration-300">
                    <Icon
                      className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-300"
                      aria-hidden="true"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-medium text-muted-foreground">
                      {method.label}
                    </p>
                    <p className="text-sm truncate">{method.value}</p>
                  </div>

                  <ArrowRight
                    className="ml-auto h-4 w-4 shrink-0 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                    aria-hidden="true"
                  />
                </Link>
              )
            })}

            {/* Quick copy email */}
            <div className="rounded-xl border bg-card/50 p-5 backdrop-blur">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Quick copy
              </p>
              <CopyEmailButton email={siteData.socials.email} />
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </Container>
    </Section>
  )
}
