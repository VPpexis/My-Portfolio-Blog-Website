"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const greetings = [
  { lang: "en", text: "Hi" },
  { lang: "zh", text: "你好" },
  { lang: "es", text: "Hola" },
]

export function AnimatedGreeting() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % greetings.length),
      2000
    )
    return () => clearInterval(id)
  }, [])

  return (
    <span
      className="inline-grid justify-items-center align-baseline"
      aria-live="polite"
      aria-atomic="true"
    >
      {greetings.map((greeting, i) => (
        <span
          key={greeting.lang}
          lang={greeting.lang}
          aria-hidden={i !== index}
          className={cn(
            "col-start-1 row-start-1 transition-all duration-500",
            i === index
              ? "visible opacity-100 translate-y-0"
              : "invisible opacity-0 translate-y-2"
          )}
        >
          {greeting.text}
        </span>
      ))}
    </span>
  )
}
