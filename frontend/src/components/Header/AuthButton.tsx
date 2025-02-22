"use server"
import { verifySession } from "@/lib/utils/session"
import UserAvatar from "@/components/UserAvatar/UserAvatar"
import React from "react"
import { getTranslations } from "next-intl/server"
import Button from "@/components/ui/Button"

export default async function AuthButton() {
  const isAuthenticated = await verifySession()
  const t = await getTranslations("Shared")
  return isAuthenticated ? (
    <UserAvatar />
  ) : (
    <Button variant="outlined" size="sm" color="secondary" className="text-body2" href="/sign-in">
      {t("enterAccount")}
    </Button>
  )
}
