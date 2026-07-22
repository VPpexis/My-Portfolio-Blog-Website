import { defineConfig, defineCollection, s, context } from "velite"
import remarkGfm from "remark-gfm"
import rehypeSlug from "rehype-slug"

const posts = defineCollection({
  name: "Post",
  pattern: "posts/**/*.mdx",
  schema: s
    .object({
      title: s.string().max(100),
      slug: s.slug("posts"),
      description: s.string(),
      date: s.isodate(),
      updatedAt: s.isodate().optional(),
      tags: s.array(s.string()),
      category: s.enum([
        "DevOps",
        "Cloud Architecture",
        "Cybersecurity",
        "Frontend",
        "Tutorials",
      ]),
      isDraft: s.boolean().default(false),
      content: s.mdx(),
    })
    .transform((data) => {
      const rawContent = context().file.data.content as string
      const wordCount = rawContent.trim().split(/\s+/).length
      return {
        ...data,
        rawContent,
        readingTime: Math.max(1, Math.ceil(wordCount / 200)),
      }
    }),
})

export default defineConfig({
  collections: { posts },
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
  },
})
