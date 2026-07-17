import { cn } from "@/lib/utils"

interface PageHeaderProps extends Omit<React.ComponentProps<"header">, "title"> {
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  align?: "left" | "center"
}

export function PageHeader({
  className,
  eyebrow,
  title,
  description,
  align = "center",
  ...props
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center",
        className
      )}
      {...props}
    >
      {eyebrow && (
        <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-4">
          {eyebrow}
        </p>
      )}
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-balance">
        {title}
      </h1>
      {description && (
        <p
          className={cn(
            "mt-4 text-lg text-muted-foreground max-w-2xl text-balance",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </header>
  )
}
