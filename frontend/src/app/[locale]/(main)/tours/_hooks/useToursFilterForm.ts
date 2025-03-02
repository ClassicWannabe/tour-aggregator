import { useRouter } from "@/i18n/routing"
import React, { useState } from "react"
import RouteNames from "@/lib/consts/route-names"
import { useSearchParams } from "next/navigation"

const useToursFilterForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialTypes = searchParams.getAll("type") || []
  const [selectedTypes, setSelectedTypes] = useState(initialTypes)
  const [priceRange, setPriceRange] = useState({ minPricePerPerson: 0, maxPricePerPerson: 100 })

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target
    if (value === "ALL") {
      setSelectedTypes(checked ? ["ALL"] : [])
    } else {
      const updatedTypes = checked
        ? [...selectedTypes.filter((t) => t !== "ALL"), value]
        : selectedTypes.filter((t) => t !== value)

      setSelectedTypes(updatedTypes)
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const updatedParams = new URLSearchParams()

    const minPricePerPerson = formData.get("minPricePerPerson")
    const maxPricePerPerson = formData.get("maxPricePerPerson")
    if (minPricePerPerson) updatedParams.set("minPricePerPerson", minPricePerPerson as string)
    if (maxPricePerPerson) updatedParams.set("maxPricePerPerson", maxPricePerPerson as string)
    const tourTypes = formData.getAll("type")
    if (tourTypes.length > 0) {
      tourTypes.forEach((type) => updatedParams.append("type", type as string))
    }

    router.push(`?${updatedParams.toString()}`, { scroll: false })
  }

  const resetForm = () => {
    router.push(RouteNames.Category)
  }

  const changePrices = (values: Partial<typeof priceRange>) => {
    setPriceRange((prevPrices) => ({ ...prevPrices, ...values }))
  }

  const changePriceInSlider = (prices: number[] | number) => {
    if (Array.isArray(prices)) {
      const [min, max] = prices
      changePrices({ minPricePerPerson: min, maxPricePerPerson: max })
    }
  }

  return {
    handleSubmit,
    resetForm,
    handleCheckboxChange,
    selectedTypes,
    setSelectedTypes,
    changePrices,
    priceRange,
    changePriceInSlider,
  }
}

export default useToursFilterForm
