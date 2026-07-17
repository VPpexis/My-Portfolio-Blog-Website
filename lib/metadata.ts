import type { Metadata } from "next"
import siteData from "@/data/metadata.json"

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")

export const siteConfig = {
  name: siteData.profile.name,
  title: siteData.profile.title,
  description: siteData.profile.description,
  url: baseUrl,
  ogImage: `${baseUrl}/og.png`,
  links: siteData.socials,
} as const

interface PageMetadataOptions {
  title?: string
  description?: string
  path?: string
  ogImage?: string
  type?: "website" | "article"
  publishedTime?: string
  modifiedTime?: string
  tags?: string[]
}

export function createMetadata(options: PageMetadataOptions = {}): Metadata {
  const title = options.title
    ? `${options.title} — ${siteConfig.name}`
    : `${siteConfig.name} — ${siteConfig.title}`

  const description = options.description ?? siteConfig.description
  const url = options.path ? `${siteConfig.url}${options.path}` : siteConfig.url
  const ogImage = options.ogImage ?? siteConfig.ogImage

  return {
    title,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: options.type ?? "website",
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: "en_US",
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : undefined,
      ...(options.publishedTime && {
        publishedTime: options.publishedTime,
      }),
      ...(options.modifiedTime && {
        modifiedTime: options.modifiedTime,
      }),
      ...(options.tags && {
        tags: options.tags,
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  }
}
