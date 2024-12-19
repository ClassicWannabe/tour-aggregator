"use client"
import React from "react"
import Logo from "@/components/Logo"
import Typography from "@/components/ui/Typography"
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
    <div className={cn("px-[60px] lg:px-[120px] py-4 flex items-center justify-between", `bg-${background}`)}>
      <Logo color={background === "none" ? "white" : "#00BE8B"} />
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
        <Globe color="#fff" size={14} />
        <Button variant="outlined" size="md" color="secondary" className="text-body2">
          {t("enterAccount")}
        </Button>
      </div>
    </div>
  )
}

export default DesktopHeader
