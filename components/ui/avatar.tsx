import * as React from "react"
import { cn } from "@/lib/utils"

type Size = "sm" | "md" | "lg"

const sizeMap: Record<Size, string> = {
  sm: "size-8 text-sm",
  md: "size-10 text-base",
  lg: "size-12 text-lg",
}

function initials(name?: string) {
  if (!name) return "?"
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase()
  const first = parts[0].slice(0, 1)
  const last = parts[parts.length - 1].slice(0, 1)
  return (first + last).toUpperCase()
}

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string
  size?: Size
}

export function Avatar({ name, size = "md", className, ...props }: AvatarProps) {
  return (
    <div
      data-slot="avatar"
      className={cn(
        "inline-flex select-none items-center justify-center rounded-full bg-primary text-primary-foreground font-medium",
        sizeMap[size],
        className
      )}
      aria-label={name}
      {...props}
    >
      {initials(name)}
    </div>
  )
}

