"use client"

import { TabsList, TabsTrigger } from "@/components/ui/Tabs/Tabs"
import React from "react"
import { useTranslations } from "next-intl"
import { useRouter } from "@/i18n/routing"

type PersonalAccountTabsTriggersProps = {
  currentTab: string
}

export default function PersonalAccountTabsTriggers({ currentTab }: PersonalAccountTabsTriggersProps) {
  const t = useTranslations("PersonalAccount")
  const router = useRouter()

  const handleClick = (tab: string) => {
    if (currentTab === tab) return
    const currentParams = new URLSearchParams()
    currentParams.set("tab", tab)

    router.replace(`?${currentParams.toString()}`)
  }

  return (
    <TabsList className="max-w-80">
      <TabsTrigger value="personalAccount" onClick={() => handleClick("personalAccount")}>
        {t("tabs.personalAccount")}
      </TabsTrigger>
      <TabsTrigger value="profile" onClick={() => handleClick("profile")}>
        {t("tabs.profile")}
      </TabsTrigger>
    </TabsList>
  )
}
