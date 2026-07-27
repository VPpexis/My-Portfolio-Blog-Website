import type { MetadataRoute } from "next"
import { posts, devlogs } from "#site/content"
import { siteConfig } from "@/lib/metadata"

export default function sitemap(): MetadataRoute.Sitemap {
  const publishedPosts =
    process.env.NODE_ENV === "production"
      ? posts.filter((p) => !p.isDraft)
      : posts

  const publishedDevlogs =
    process.env.NODE_ENV === "production"
      ? devlogs.filter((d) => !d.isDraft)
      : devlogs

  const routes = ["", "/about", "/contact", "/projects", "/blog", "/devlog"].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }))

  const blogPosts = publishedPosts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: post.updatedAt ?? post.date,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  const tagSet = new Set<string>()
  publishedPosts.forEach((p) => p.tags.forEach((t) => tagSet.add(t)))
  const tags = Array.from(tagSet).map((tag) => ({
    url: `${siteConfig.url}/blog/tags/${tag}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.4,
  }))

  const devlogEntries = publishedDevlogs.map((entry) => ({
    url: `${siteConfig.url}/devlog/${entry.slug}`,
    lastModified: entry.updatedAt ?? entry.date,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }))

  return [...routes, ...blogPosts, ...tags, ...devlogEntries]
}
