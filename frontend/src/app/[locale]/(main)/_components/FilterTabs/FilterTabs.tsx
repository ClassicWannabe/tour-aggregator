import React from "react"
import { getTranslations } from "next-intl/server"

export default async function FilterTabs() {
  const t = await getTranslations("Shared")
  return (
    <form action="" className="flex mt-auto">
      <span role="button">{t("allTours")}</span>
    </form>
  )
}
