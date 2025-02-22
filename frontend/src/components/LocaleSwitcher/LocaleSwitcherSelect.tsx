"use client"

import { useParams } from "next/navigation"
import React, { ChangeEvent, ReactNode, useTransition } from "react"
import { Locale, usePathname, useRouter } from "@/i18n/routing"
import { Globe } from "lucide-react"
import { cn } from "@/lib/utils/common"

type Props = {
  children: ReactNode
  defaultValue: string
  color: "white" | "black"
}

export default function LocaleSwitcherSelect({ children, defaultValue, color }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()
  const params = useParams()

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        { pathname, params },
        { locale: nextLocale },
      )
    })
  }

  return (
    <div className="flex gap-4">
      <label
        className={cn(
          `relative flex gap-2 items-center`,
          isPending && "transition-opacity [&:disabled]:opacity-30",
          color === "white" && "text-primaryWhite",
          color === "black" && "text-primaryBlack",
        )}
      >
        <Globe color={color} size={14} />
        <select
          className="inline-flex appearance-none bg-transparent text-body2"
          defaultValue={defaultValue}
          disabled={isPending}
          onChange={onSelectChange}
        >
          {children}
        </select>
      </label>
    </div>
  )
}
