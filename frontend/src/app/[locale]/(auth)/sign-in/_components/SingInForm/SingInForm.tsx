import React from "react"
import Input from "@/components/ui/Input"
import Typography from "@/components/ui/Typography"
import Button from "@/components/ui/Button"
import { getTranslations } from "next-intl/server"
import Label from "@/components/ui/Label"

export default async function SingInForm() {
  const sT = await getTranslations("Shared")
  const t = await getTranslations("AuthPage")

  return (
    <div className="flex-col flex gap-3">
      <div className="flex flex-col gap-1">
        <Label htmlFor="email-input">{sT("email")}</Label>
        <Input id="email-input" type="email" placeholder={sT("email")} />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="password-input">{sT("password")}</Label>
        <Input id="password-input" type="password" placeholder={sT("password")} />
      </div>
      <Button className="w-full" type="submit">
        <Typography as="span" variant="body1">
          {t("enterAccountBtn")}
        </Typography>
      </Button>
    </div>
  )
}
