import React from "react"
import Typography from "@/components/ui/Typography"
import { getTranslations } from "next-intl/server"

export default async function ToursBoard() {
  const t = await getTranslations("TopSection")

  return (
    <section className="py-8 px- md:py-12 md:px-[120px] flex flex-col">
      <Typography variant="headline1" as="h2"></Typography>
    </section>
  )
}
