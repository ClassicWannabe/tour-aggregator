import React from "react"
import Input from "@/components/ui/Input"
import Typography from "@/components/ui/Typography"
import Button from "@/components/ui/Button"
import { getTranslations } from "next-intl/server"

export default async function SingInForm() {
  const t = await getTranslations("AuthPage")
  return (
    <div className="flex-col flex gap-3">
      <Input />
      <Button className="w-full">
        <Typography as="span" variant="body1">
          {t("enterAccountBtn")}
        </Typography>
      </Button>
    </div>
  )
}
