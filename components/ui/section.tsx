import { cn } from "@/lib/utils"

interface SectionProps extends React.ComponentProps<"section"> {
  variant?: "default" | "muted" | "border"
}

export function Section({
  className,
  variant = "default",
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "py-16 md:py-24 lg:py-32",
        variant === "muted" && "bg-muted/30",
        variant === "border" && "border-t",
        className
      )}
      {...props}
    />
  )
}
