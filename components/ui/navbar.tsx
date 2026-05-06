import Link from 'next/link'

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center justify-between mx-auto px-4">
                <nav className="flex items-center justify-between w-full">
                    <div className="text-xl font-bold">
                        <Link href="/">My Portfolio</Link>
                    </div>
                    <div className="flex gap-8">
                        <Link href="/projects" className="hover:text-blue-600">Project</Link>
                        <Link href="/blog" className="hover:text-blue-600">Blog</Link>
                        <Link href="/about" className="hover:text-blue-600">About</Link>
                        <Link href="/contact" className="hover:text-blue-600">Contact</Link>
                    </div>
                </nav>
            </div>
        </header>
    )
}