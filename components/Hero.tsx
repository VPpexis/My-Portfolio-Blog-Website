import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatedGreeting } from "./AnimatedGreeting"
import siteData from "@/data/metadata.json"

export function Hero() {
  return (
    <section className="relative flex min-h-[60vh] flex-col items-center justify-center px-4 py-24 sm:px-6 lg:px-8 mb-12">
      <div className="max-w-3xl text-center">
        <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-4">
          {siteData.profile.title}
        </p>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-balance">
          <AnimatedGreeting />
        </h1>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-balance">
          <span className="text-foreground">I&apos;m {siteData.profile.name}</span>
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto text-balance">
          {siteData.profile.description}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/projects">
              View Projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/contact">Get In Touch</Link>
          </Button>
          <Button variant="ghost" size="lg" asChild>
            <Link href="/about">
              Learn More
              <span aria-hidden="true" className="ml-1">
                →
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
