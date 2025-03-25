"use client"
import { Plus } from "lucide-react"
import Button from "@/components/ui/Button"
import React, { ComponentProps } from "react"
import { cn } from "@/lib/utils/common"

interface AddButtonProps {
  text?: string
  buttonProps?: ComponentProps<typeof Button>
}

export default function AddButton({ text, buttonProps = {} }: AddButtonProps) {
  const { className, ...restProps } = buttonProps

  return (
    <Button
      variant="dashed"
      color="secondary"
      size="sm"
      className={cn("flex flex-row items-center text-sm gap-1 mt-5", className)}
      type="button"
      {...restProps}
    >
      <Plus className="max-h-3 max-w-3" />
      {text}
    </Button>
  )
}
