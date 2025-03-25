"use client"
import { PropsWithChildren } from "react"

export function FormButtonsWrapper({ children }: PropsWithChildren) {
  return <div className="flex gap-2 justify-end">{children}</div>
}
