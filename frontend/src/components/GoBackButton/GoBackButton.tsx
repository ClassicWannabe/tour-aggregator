"use client"
import React from "react"
import { useRouter } from "@/i18n/routing"
import { useTranslations } from "next-intl"
import Typography from "@/components/ui/Typography"
import { ArrowLeft } from "lucide-react"

const GoBackButton = () => {
  const { back } = useRouter()
  const goBack = () => back()
  const t = useTranslations("Shared")

  return (
    <button type="button" onClick={goBack} className="flex items-center gap-1">
      <ArrowLeft className="text-sm" height={14} width={14} />
      <Typography as="span" variant="body2">
        {t("goBackBtnLabel")}
      </Typography>
    </button>
  )
}

export default GoBackButton
