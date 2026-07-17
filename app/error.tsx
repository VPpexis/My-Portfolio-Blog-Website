"use client"

import { useEffect } from "react"
import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <Container className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] py-24 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <AlertTriangle className="h-6 w-6" aria-hidden="true" />
      </div>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
        Something went wrong
      </h1>
      <p className="mt-4 text-lg text-muted-foreground max-w-md">
        An unexpected error occurred. Please try again or refresh the page.
      </p>
      <div className="mt-8 flex gap-3">
        <Button onClick={() => reset()} size="lg">
          Try Again
        </Button>
        <Button variant="outline" size="lg" onClick={() => window.location.reload()}>
          Refresh Page
        </Button>
      </div>
    </Container>
  )
}
