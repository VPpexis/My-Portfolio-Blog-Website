"use client"

import * as React from "react"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"
import { ImageIcon } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

export interface HobbyImage {
  src: string
  alt: string
}

function Placeholder() {
  return (
    <div className="flex aspect-square w-full flex-col items-center justify-center gap-2 rounded-2xl border bg-muted text-muted-foreground">
      <ImageIcon className="h-8 w-8" aria-hidden="true" />
      <span className="text-xs font-medium">No photos yet</span>
    </div>
  )
}

export function HobbyCarousel({ images }: { images: HobbyImage[] }) {
  const [autoplay] = React.useState(() =>
    Autoplay({ delay: 3000, stopOnInteraction: false })
  )

  if (images.length === 0) {
    return <Placeholder />
  }

  return (
    <Carousel
      opts={{ loop: true }}
      plugins={[autoplay]}
      className="w-full"
      aria-label="Hobby photo carousel"
    >
      <CarouselContent>
        {images.map((image) => (
          <CarouselItem key={image.src}>
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl border bg-muted">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
