import React from "react"
import Typography from "@/components/ui/Typography"
import Button from "@/components/ui/Button"
import { getTranslations } from "next-intl/server"
import CustomInput from "@/components/CustomInput/CustomInput"

export default async function SingInForm() {
  const sT = await getTranslations("Shared")
  const t = await getTranslations("AuthPage")

  return (
    <div className="flex-col flex gap-3">
      <CustomInput id="email-input" label={sT("email")} placeholder={sT("email")} type="email" />
      <CustomInput id="password-input" label={sT("password")} placeholder={sT("password")} type="password" />
      <Button className="w-full" type="submit">
        <Typography as="span" variant="body1">
          {t("enterAccountBtn")}
        </Typography>
      </Button>
    </div>
  )
}
