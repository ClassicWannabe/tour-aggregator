import React from "react"
import Button from "@/components/ui/Button"
import { getTranslations } from "next-intl/server"
import CustomInput from "@/components/CustomInput/CustomInput"

export default async function SingInForm() {
  const t = await getTranslations()

  return (
    <div className="flex-col flex gap-3">
      <CustomInput id="email-input" label={t("Shared.email")} placeholder={t("Shared.email")} type="email" />
      <CustomInput
        id="password-input"
        label={t("Shared.password")}
        placeholder={t("Shared.password")}
        type="password"
      />
      <Button className="w-full text-body1 text-primaryWhite" type="submit">
        {t("AuthPage.enterAccountBtn")}
      </Button>
    </div>
  )
}
