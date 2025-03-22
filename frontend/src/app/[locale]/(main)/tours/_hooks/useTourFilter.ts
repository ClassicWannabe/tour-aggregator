import React, { useState } from "react"
import { usePathname, useRouter } from "@/i18n/routing"
import { useSearchParams } from "next/navigation"
import { TourFilters } from "@/lib/interfaces/tours"

const getInitialFilters = ({
  minPrice,
  maxPrice,
  filters,
}: {
  minPrice: string | null
  maxPrice: string | null
  filters?: TourFilters | null
}) => {
  if (minPrice && maxPrice) {
    return { minPricePerPerson: Number(minPrice), maxPricePerPerson: Number(maxPrice) }
  }
  if (filters) {
    return { minPricePerPerson: filters.prices.min, maxPricePerPerson: filters.prices.max }
  } else return { minPricePerPerson: 0, maxPricePerPerson: 0 }
}

const useTourFilter = ({ filters }: { filters: TourFilters | null }) => {
  const router = useRouter()
  const pathname = usePathname()

  const searchParams = useSearchParams()
  const types = searchParams.getAll("type")
  const minPrice = searchParams.get("minPricePerPerson")
  const maxPrice = searchParams.get("maxPricePerPerson")
  const [selectedTypes, setSelectedTypes] = useState<string[]>(() => types || ["ALL"])
  const [priceRange, setPriceRange] = useState(getInitialFilters({ minPrice, maxPrice, filters }))
  const [selectedLocation, setSelectedLocation] = useState<string>("ALL")

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

  const changePrices = (priceKey: keyof typeof priceRange, value: number) => {
    if (isNaN(value) || value > 9_999_999) return
    setPriceRange((prevPrices) => {
      return { ...prevPrices, [priceKey]: value }
    })
  }

  const changePriceInSlider = (prices: number[] | number) => {
    if (Array.isArray(prices)) {
      const [min, max] = prices
      setPriceRange({ minPricePerPerson: min, maxPricePerPerson: max })
    }
  }

  const changeLocation = (value: string) => {
    setSelectedLocation(value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const updatedParams = new URLSearchParams()

    const minPricePerPerson = formData.get("minPricePerPerson")
    const maxPricePerPerson = formData.get("maxPricePerPerson")
    if (minPricePerPerson) updatedParams.set("minPricePerPerson", minPricePerPerson as string)
    if (maxPricePerPerson) updatedParams.set("maxPricePerPerson", maxPricePerPerson as string)
    if (Number(minPricePerPerson) > Number(maxPricePerPerson)) {
      updatedParams.set("minPricePerPerson", minPricePerPerson as string)
      updatedParams.set("maxPricePerPerson", minPricePerPerson as string)
    }
    const locationId = formData.get("locationId")
    if (locationId) updatedParams.set("locationId", locationId as string)
    const tourTypes = formData.getAll("type")
    if (tourTypes.length > 0) {
      tourTypes.forEach((type) => updatedParams.append("type", type as string))
    }

    router.push(`?${updatedParams.toString()}`, { scroll: false })
  }

  const resetForm = () => {
    setPriceRange(getInitialFilters({ minPrice: null, maxPrice: null, filters }))
    setSelectedLocation("ALL")
    setSelectedTypes(["ALL"])
    router.push({ pathname, query: undefined }, { scroll: false })
  }

  return {
    handleSubmit,
    resetForm,
    filtersController: {
      handleCheckboxChange,
      selectedTypes,
      setSelectedTypes,
      changePrices,
      priceRange,
      changePriceInSlider,
      changeLocation,
      selectedLocation,
    },
  }
}

export default useTourFilter
