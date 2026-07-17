import type { MetadataRoute } from "next"
import { posts } from "#site/content"
import { siteConfig } from "@/lib/metadata"

export default function sitemap(): MetadataRoute.Sitemap {
  const published =
    process.env.NODE_ENV === "production"
      ? posts.filter((p) => !p.isDraft)
      : posts

  const routes = ["", "/about", "/contact", "/projects", "/blog"].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }))

  const blogPosts = published.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: post.updatedAt ?? post.date,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  const tagSet = new Set<string>()
  published.forEach((p) => p.tags.forEach((t) => tagSet.add(t)))
  const tags = Array.from(tagSet).map((tag) => ({
    url: `${siteConfig.url}/blog/tags/${tag}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.4,
  }))

  return [...routes, ...blogPosts, ...tags]
}
