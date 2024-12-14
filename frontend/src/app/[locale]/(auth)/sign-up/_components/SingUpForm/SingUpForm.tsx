"use client"
import React from "react"
import Input from "@/components/ui/Input"
import Typography from "@/components/ui/Typography"
import Button from "@/components/ui/Button"
import Label from "@/components/ui/Label"
import { useTranslations } from "next-intl"

export default function SingUpForm() {
  const sT = useTranslations("Shared")
  const t = useTranslations("AuthPage")

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
