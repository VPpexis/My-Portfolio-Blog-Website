import { cn } from "@/lib/utils"

interface SectionHeaderProps
  extends Omit<React.ComponentProps<"div">, "title"> {
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  align?: "left" | "center"
  action?: React.ReactNode
}

export function SectionHeader({
  className,
  eyebrow,
  title,
  description,
  align = "center",
  action,
  ...props
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-10 md:mb-12",
        align === "center" && "text-center",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "flex items-end gap-4",
          align === "center" && "justify-center"
        )}
      >
        <div>
          {eyebrow && (
            <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">
              {eyebrow}
            </p>
          )}
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-balance">
            {title}
          </h2>
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      {description && (
        <p
          className={cn(
            "mt-4 text-muted-foreground max-w-2xl text-balance",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
