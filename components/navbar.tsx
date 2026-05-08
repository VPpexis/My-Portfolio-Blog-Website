"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ModeToggle } from "./ModeToggle"

const navItems = [
    {name: "Projects", href: "/projects" },
    {name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    {name: "Contact", href: "/contact" },
]

export function Navbar() {
    const pathname = usePathname()

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center mx-auto px-4 sm:px-8">
                <div className="mr-8 hidden md:flex">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-xl font-bold tracking-tight antialiased">
                            VPpexis
                        </span>
                    </Link>
                </div>
                <nav className="flex items-center space-x-6 text-sm font-medium flex-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn("transition-colors hover:text-primary",
                                pathname == item.href
                                    ? "text-foreground"
                                    : "text-muted-foreground"
                            )}
                        >{item.name}</Link>
                    ))}
                </nav>

                <div className="flex items-center justify-end space-x-4">
                    <ModeToggle />
                </div>
            </div>
        </header>
    )
}