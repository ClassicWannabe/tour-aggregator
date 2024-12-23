import React from "react"
import { getTranslations } from "next-intl/server"

export default async function FilterTabs() {
  const t = await getTranslations("Shared")
  return (
    <form action="" className="flex mt-auto px-4 md:px-[60px] lg:px-[120px] justify-center">
      <FilterTab title={t("allTours")} />
      <FilterTab title={t("fieldTrips")} />
      <FilterTab title={t("walkingTours")} />
      <FilterTab title={t("cityTours")} />
    </form>
  )
}

type FilterTabProps = {
  title: string
}

function FilterTab({ title }: FilterTabProps) {
  return (
    <span role="button" className="text-body1 text-primaryWhite flex items-center justify-center flex-1 px-4 py-2">
      {title}
    </span>
  )
}
