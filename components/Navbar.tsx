"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./ModeToggle"

const navItems = [
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center mx-auto px-4 sm:px-8">
        <Link
          href="/"
          className="mr-8 flex items-center"
          onClick={() => setOpen(false)}
        >
          <span className="text-xl font-bold tracking-tight antialiased">
            VPpexis
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium flex-1">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href)

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "transition-colors hover:text-primary",
                  active ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="ml-auto flex items-center space-x-2">
          <ModeToggle />

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="md:hidden border-t px-4 pb-4 pt-2 sm:px-8"
        >
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href)

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-primary",
                      active ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {item.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      )}
    </header>
  )
}
