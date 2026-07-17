import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] py-24 text-center">
      <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-4">
        404 Error
      </p>
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-balance">
        Page not found
      </h1>
      <p className="mt-4 text-lg text-muted-foreground max-w-md">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <Button asChild className="mt-8" size="lg">
        <Link href="/">Go Back Home</Link>
      </Button>
    </Container>
  )
}
