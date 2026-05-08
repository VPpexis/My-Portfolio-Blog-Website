import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-6">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-6xl antialiased">404 - Page Not Found</h2>
            <p className="mt-4 text-lg text-muted-foreground">Sorry, the page you are looking for does not exist.</p>
            <Link href="/" className="mt-6 inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
                Go Back Home
            </Link>
        </div>
    )
}