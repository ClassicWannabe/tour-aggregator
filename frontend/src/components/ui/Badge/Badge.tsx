import React from "react"
import { cn } from "@/lib/utils/common"

export default function Badge({
  text,
  className,
  variant = "primary",
}: {
  text: string
  variant?: "primary" | "secondary" | "destructive"
  className?: string
}) {
  return (
    <span
      className={cn(
        "text-xs px-2 py-0.5 rounded h-fit",
        variant === "primary"
          ? "text-[#202020] bg-[#EFEFEF]"
          : variant === "destructive"
            ? "text-destructive bg-red-100 border-solid border border-destructive"
            : "text-primaryGreen bg-accentGreen border-solid border border-primaryGreen",
        className,
      )}
    >
      {text}
    </span>
  )
}
