"use client"
import Input from "@/components/ui/Input"
import Button from "@/components/ui/Button"
import React from "react"
import { useRouter } from "@/i18n/routing"
import { useTranslations } from "next-intl"
import { useSearchParams } from "next/navigation"

export default function SearchForm() {
  const router = useRouter()
  const t = useTranslations("TopSection")
  const searchParams = useSearchParams()
  const search = searchParams.get("search") ?? undefined

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const updatedParams = new URLSearchParams(searchParams)
    for (const [key, value] of formData.entries()) {
      if (!value && updatedParams.has(key)) {
        updatedParams.delete(key)
      } else updatedParams.set(key, value.toString())
    }
    router.push(`?${updatedParams.toString()}`, { scroll: false })
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center gap-4 md:gap-2">
      <Input placeholder={t("whereWannaGo")} defaultValue={search} name="search" className="bg-white" />
      <Button type="submit" className="w-full md:w-[120px]">
        {t("find")}
      </Button>
    </form>
  )
}
