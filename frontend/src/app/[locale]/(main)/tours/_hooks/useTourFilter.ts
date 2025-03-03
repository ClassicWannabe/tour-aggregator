import React from "react"
import { usePathname, useRouter } from "@/i18n/routing"

const useTourFilter = () => {
  const router = useRouter()
  const pathname = usePathname()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const updatedParams = new URLSearchParams()

    const minPricePerPerson = formData.get("minPricePerPerson")
    const maxPricePerPerson = formData.get("maxPricePerPerson")
    const locationId = formData.get("locationId")
    if (minPricePerPerson) updatedParams.set("minPricePerPerson", minPricePerPerson as string)
    if (maxPricePerPerson) updatedParams.set("maxPricePerPerson", maxPricePerPerson as string)
    if (locationId) updatedParams.set("locationId", locationId as string)
    const tourTypes = formData.getAll("type")
    if (tourTypes.length > 0) {
      tourTypes.forEach((type) => updatedParams.append("type", type as string))
    }

    router.push(`?${updatedParams.toString()}`, { scroll: false })
  }

  const resetForm = () => {
    router.push({ pathname, query: undefined }, { scroll: false })
  }

  return { handleSubmit, resetForm }
}

export default useTourFilter
