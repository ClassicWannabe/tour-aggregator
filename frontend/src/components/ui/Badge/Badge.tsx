import React from "react"
import { cn } from "@/lib/utils/common"

export default function Badge({ text, variant = "primary" }: { text: string; variant?: "primary" | "secondary" }) {
  return (
    <span
      className={cn(
        "text-xs px-2 py-0 rounded",
        variant === "primary"
          ? "text-[#202020] bg-[#EFEFEF]"
          : "text-primaryGreen bg-accentGreen border-solid border border-primaryGreen",
      )}
    >
      {text}
    </span>
  )
}
