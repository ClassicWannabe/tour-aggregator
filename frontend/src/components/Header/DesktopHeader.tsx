"use client"
import React from "react"
import Logo from "@/components/Logo"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"
import { Globe } from "lucide-react"
import Button from "@/components/ui/Button"

type Props = {
  background: "none" | "white"
}

const DesktopHeader: React.FC<Props> = ({ background }) => {
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
      <div className="flex items-center gap-6">
        <p className={cn("text-body2", background === "none" ? "text-primaryWhite" : "text-primaryBlack")}>
          {t("toTravellers")}
        </p>
        <p className={cn("text-body2", background === "none" ? "text-primaryWhite" : "text-primaryBlack")}>
          {t("toPartners")}
        </p>
        <p className={cn("text-body2", background === "none" ? "text-primaryWhite" : "text-primaryBlack")}>
          {t("support")}
        </p>
        <Globe color={background === "none" ? "#fff" : "#000"} size={14} />
        <Button variant="outlined" size="sm" color="secondary" className="text-body2" href="/sign-in">
          {t("enterAccount")}
        </Button>
      </div>
    </div>
  )
}

export default DesktopHeader
