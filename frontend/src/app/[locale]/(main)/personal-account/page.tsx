import { getTranslations } from "next-intl/server"
import SupplierPhoto from "@/app/[locale]/(main)/personal-account/_components/SupplierPhoto"
import { TabsList, TabsTrigger, Tabs, TabsContent } from "@/components/ui/Tabs/Tabs"
import React from "react"
import { TourCounts } from "@/app/[locale]/(main)/personal-account/_components/TourCounts"
import MyTours from "@/app/[locale]/(main)/personal-account/_components/MyTours"
import { SearchParams } from "next/dist/server/request/search-params"

export default async function PersonalAccount({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const t = await getTranslations("PersonalAccount")
  const searchParamsAwaited = await searchParams
  return (
    <section className="h-full">
      <div className="my-5">
        <SupplierPhoto />
      </div>
      <Tabs defaultValue="personalAccount" className="w-full flex flex-col gap-3">
        <TabsList className="max-w-80">
          <TabsTrigger value="personalAccount">{t("tabs.personalAccount")}</TabsTrigger>
          <TabsTrigger value="profile">{t("tabs.profile")}</TabsTrigger>
        </TabsList>
        <TabsContent value="personalAccount" className="flex flex-col gap-3 mt-0">
          <TourCounts />
          <MyTours searchParams={searchParamsAwaited} />
        </TabsContent>
      </Tabs>
    </section>
  )
}
