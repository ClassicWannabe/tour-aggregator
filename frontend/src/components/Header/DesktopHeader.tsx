"use client"
import React from "react"
import Logo from "@/components/Logo"
import Typography from "@/components/ui/Typography"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"

type Props = {
  background: "none" | "white"
}

const DesktopHeader: React.FC<Props> = ({ background }) => {
  const t = useTranslations("Shared")

  return (
    <div className={cn("px-[120px] py-4 flex items-center justify-between", `bg-${background}`)}>
      <Logo />
      <div className="flex items-center gap-6">
        <Typography variant="body2" color="white" as="p">
          {t("toTravellers")}
        </Typography>
        <Typography variant="body2" color="white" as="p">
          {t("toPartners")}
        </Typography>
        <Typography variant="body2" color="white" as="p">
          {t("support")}
        </Typography>
      </div>
    </div>
  )
}

export default DesktopHeader
