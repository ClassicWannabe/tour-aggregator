"use client"
import React, { ReactNode } from "react"
import Logo from "@/components/Logo"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils/common"
import LocaleSwitcher from "@/components/LocaleSwitcher"

type Props = {
  background: "none" | "white"
  children: ReactNode
}

const DesktopHeader: React.FC<Props> = ({ background, children }) => {
  const t = useTranslations("Shared")

  return (
    <div
      className={cn(
        "px-[60px] lg:px-[120px] py-4 flex items-center justify-between relative z-[1]",
        `bg-${background}`,
        background === "none" && "absolute top-0 left-0 w-full",
      )}
    >
      <Logo color={background === "none" ? "white" : "#00BE8B"} />
      <div className="flex items-center gap-6 text-body2">
        <p className={cn("text-body2", background === "none" ? "text-primaryWhite" : "text-primaryBlack")}>
          {t("toTravellers")}
        </p>
        <p className={cn("text-body2", background === "none" ? "text-primaryWhite" : "text-primaryBlack")}>
          {t("toPartners")}
        </p>
        <LocaleSwitcher color={background === "none" ? "white" : "black"} />
        {children}
      </div>
    </div>
  )
}

export default DesktopHeader
