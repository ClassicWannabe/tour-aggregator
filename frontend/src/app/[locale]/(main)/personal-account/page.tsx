import SupplierPhoto from "@/app/[locale]/(main)/personal-account/_components/SupplierPhoto"
import { Tabs, TabsContent } from "@/components/ui/Tabs/Tabs"
import React from "react"
import { TourCounts } from "@/app/[locale]/(main)/personal-account/_components/TourCounts"
import MyTours from "@/app/[locale]/(main)/personal-account/_components/MyTours"
import { SearchParams } from "next/dist/server/request/search-params"
import { ProfileForm } from "@/app/[locale]/(main)/personal-account/_components/ProfileForm"
import { getSupplierMe } from "@/actions/get-supplier-me"
import PersonalAccountTabsTriggers from "@/app/[locale]/(main)/personal-account/_components/PersonalAccountTabsTriggers"
import MyTourReservations from "@/app/[locale]/(main)/personal-account/_components/MyTourReservations"

export default async function PersonalAccount({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const searchParamsAwaited = await searchParams
  const supplier = await getSupplierMe()
  const { tab = "personalAccount" } = searchParamsAwaited
  const currentTab = tab as string
  return (
    <section className="h-full">
      <div className="my-5">
        <SupplierPhoto />
      </div>
      <Tabs defaultValue="personalAccount" value={currentTab} className="flex w-full flex-col gap-3">
        <PersonalAccountTabsTriggers currentTab={currentTab} />
        <TabsContent value="personalAccount" className="mt-0 flex flex-col gap-3">
          <TourCounts />
          <MyTours searchParams={searchParamsAwaited} />
          <MyTourReservations searchParams={searchParamsAwaited} />
        </TabsContent>
        <TabsContent value="profile" className="mt-0 flex flex-col gap-3">
          <ProfileForm supplier={supplier} />
        </TabsContent>
      </Tabs>
    </section>
  )
}
