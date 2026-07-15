import type { ComponentType } from "react"
import { Mail } from "lucide-react"
import { SiGithub } from "react-icons/si"
import { LinkedInIcon } from "@/components/icons"
import metadata from "@/data/metadata.json"

export type SocialPlatform = keyof typeof metadata.socials

export interface SocialLink {
  platform: SocialPlatform
  label: string
  href: string
  external: boolean
  icon: ComponentType<{ className?: string }>
}

const socialIcons = {
  github: SiGithub,
  linkedin: LinkedInIcon,
  email: Mail,
} as const

const socialLabels: Record<SocialPlatform, string> = {
  github: "GitHub",
  linkedin: "LinkedIn",
  email: "Send an email",
}

export const socialLinks: SocialLink[] = (
  Object.entries(metadata.socials) as [SocialPlatform, string][]
).map(([platform, url]) => ({
  platform,
  label: socialLabels[platform] ?? platform,
  href: platform === "email" ? `mailto:${url}` : url,
  external: platform !== "email",
  icon: socialIcons[platform] ?? Mail,
}))
