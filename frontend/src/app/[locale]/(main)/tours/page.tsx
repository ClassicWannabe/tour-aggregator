import React from "react"
import ToursBoard from "@/app/[locale]/(main)/_components/ToursBoard"
import ToursFilterWrapper from "@/app/[locale]/(main)/tours/_components/ToursFilter"

export default async function CategoryPage() {
  return (
    <section className="main-layout-padding-horizontal flex flex-col gap-4 md:flex-row md:gap-6">
      <ToursFilterWrapper />
      <ToursBoard />
    </section>
  )
}
