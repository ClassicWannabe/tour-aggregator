"use client"
import React from "react"
import Logo from "@/components/Logo"
import Button from "@/components/ui/Button"
import { useTranslations } from "next-intl"
import { Menu } from "lucide-react"

const MobileHeader = () => {
  const t = useTranslations("Shared")
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white">
      <Menu color="#000000E0" />
      <Logo isMobile />
      <Button variant="outlined" size="sm" color="secondary" className="text-body2">
        {t("enterAccount")}
      </Button>
    </div>
  )
}

export default MobileHeader
