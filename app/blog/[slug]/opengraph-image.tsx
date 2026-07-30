import { ImageResponse } from "next/og"
import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { posts } from "#site/content"

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)
  if (!post) return new Response("Not found", { status: 404 })

  const [regularFont, boldFont] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/Inter-Regular.woff")),
    readFile(join(process.cwd(), "assets/fonts/Inter-Bold.woff")),
  ])

  const date = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          backgroundColor: "#09090b",
          padding: 80,
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 48,
          }}
        >
          <div
            style={{
              width: 4,
              height: 32,
              backgroundColor: "#fafafa",
              borderRadius: 2,
            }}
          />
          <span
            style={{
              fontSize: 28,
              fontWeight: 400,
              color: "#a1a1aa",
            }}
          >
            Van Philip Panugan
          </span>
        </div>

        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: "#fafafa",
            lineHeight: 1.2,
            maxWidth: 1000,
          }}
        >
          {post.title}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginTop: 40,
            color: "#71717a",
            fontSize: 24,
          }}
        >
          <span>{date}</span>
          <span>{post.readingTime} min read</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Inter",
          data: regularFont,
          style: "normal",
          weight: 400,
        },
        {
          name: "Inter",
          data: boldFont,
          style: "normal",
          weight: 700,
        },
      ],
    }
  )
}
