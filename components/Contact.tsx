import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { socialLinks } from "@/lib/socials"

export function Contact() {
  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 antialiased">Get In Touch</h2>

        <p className="text-muted-foreground text-lg leading-relaxed mb-10">
          I&apos;m always open to new opportunities, collaborations, or just a
          friendly chat. Feel free to reach out through any of the channels
          below.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          {socialLinks.map(({ platform, label, href, external, icon: Icon }) => (
            <Button key={platform} variant="outline" size="lg" asChild>
              <Link
                href={href}
                target={external ? "_blank" : "_self"}
                rel="noopener noreferrer"
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
                {external && (
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
                )}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </section>
  )
}
