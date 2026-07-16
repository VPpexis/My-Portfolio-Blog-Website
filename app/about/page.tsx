import type { Metadata } from "next"
import Link from "next/link"
import {
  Code2,
  Workflow,
  Cloud,
  Terminal,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import siteData from "@/data/metadata.json"
import Image from "next/image"
import { HobbyCarousel, type HobbyImage } from "@/components/HobbyCarousel"

export const metadata: Metadata = {
  title: `About — ${siteData.profile.name}`,
  description: `Learn more about ${siteData.profile.name}, ${siteData.profile.title}.`,
}

const img_carousel: HobbyImage[] = [
  {
    src: '/assets/photo_gallery/1.jpg',
    alt: '1.jpg'
  },
  {
    src: '/assets/photo_gallery/2.jpg',
    alt: '2.jpg'
  },
  {
    src: '/assets/photo_gallery/3.jpg',
    alt: '3.jpg'
  },
  {
    src: '/assets/photo_gallery/4.jpg',
    alt: '4.jpg'
  }
]

const domains = [
  {
    title: "Full-Stack Web Development",
    icon: Code2,
    description:
      "Building modern, type-safe web apps with TypeScript, React, and Next.js — from component systems to fully static, SEO-friendly sites.",
  },
  {
    title: "CI/CD & Automation",
    icon: Workflow,
    description:
      "Designing pipelines with GitHub Actions, linting gates, and pre-commit hooks so quality is enforced by machines, not memory.",
  },
  {
    title: "Cloud & Containers",
    icon: Cloud,
    description:
      "Deploying on AWS and shipping reproducible environments with Docker and Linux — build once, run anywhere.",
  },
  {
    title: "Scripting & Data",
    icon: Terminal,
    description:
      "Using Python for tooling, automation, and data-driven projects like CovidRecon.",
  },
]

export default function AboutPage() {
  return (
    <>
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid items-center gap-12 md:grid-cols-5">
          <div className="md:col-span-3 text-center md:text-left">
            <p className="text-sm font-medium tracking-widest uppercase text-primary mb-4">
              About Me
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl antialiased">
              Engineer by training, builder by habit.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              I&apos;m <strong>Van Philip Panugan</strong>, a software engineer who cares just as much 
              about how software ships as what it does. My work lives at the intersection 
              of full-stack development and cloud infrastructure—building scalable, 
              high-performance web applications, then architecting the automated CI/CD pipelines 
              that keep them fast and resilient. Rooted in a Computer Engineering background, 
              early challenges like developing a COVID data-reconnaissance tool taught me a core 
              principle I still build by today: great engineering is equal parts curiosity, precision, 
              and discipline.
            </p>
          </div>

          <div className="md:col-span-2 flex justify-center">
            <div className="rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 p-1">
              <div className="relative h-64 w-64 overflow-hidden rounded-xl bg-background sm:h-72 sm:w-72">
                <Image
                  src="/assets/personal_photo.jpg"
                  alt="Van"
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>        
        </div>
      </section>

      <section className="border-t py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center antialiased">
            What I Do
          </h2>

          <div className="grid gap-6 sm:grid-cols-2">
            {domains.map((domain) => (
              <Card key={domain.title} className="pt-4">
                <CardHeader>
                  <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                    <domain.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>{domain.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{domain.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t py-20 px-6">
        <div className="max-w-6xl mx-auto grid items-center gap-12 md:grid-cols-2">
          <div className="md:order-2">
            <HobbyCarousel images={img_carousel} />
          </div>

          <div className="text-center md:text-left md:order-1">
            <h2 className="text-3xl font-bold mb-6 antialiased">
              Beyond the Screen
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              When I&apos;m not shipping code, I&apos;m usually staying active.
              My ultimate reset buttons are fast-paced racket and paddle sports—I&apos;m 
              an avid <strong>badminton</strong> and <strong>table tennis</strong> player, and a 
              curious beginner currently learning the ropes in <strong>pickleball</strong>. 
              These courts are my off-screen training ground: they demand split-second decisions, 
              early positioning, and instant recovery when a shot doesn&apos;t land.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              To balance that high-speed agility with steady mental stamina, I also lace up for 
              regular road runs. Running teaches a different kind of engineering discipline: pacing, 
              rhythm, and pushing through long stretches. Whether I&apos;m mid-rally, mid-run, or navigating 
              a new sport from scratch, the focus, resilience, and adaptability I build out there 
              follow me right back to the keyboard.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 antialiased">
            What I&apos;m Exploring Now
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground mb-10">
            Right now I&apos;m deepening this very site — evolving it toward a
            content-driven architecture with <strong>Astro</strong>, sharpening
            my <strong>cloud infrastructure</strong> skills, and building out
            new projects along the way. I treat learning like a pipeline:
            always something in staging.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/projects">
                View Projects
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/contact">Get In Touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
