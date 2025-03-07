import React, { useEffect, useState } from "react"
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

const useToursFilterForm = (filters: TourFilters | null) => {
  const searchParams = useSearchParams()
  const types = searchParams.getAll("type")
  const minPrice = searchParams.get("minPricePerPerson")
  const maxPrice = searchParams.get("maxPricePerPerson")
  const [selectedTypes, setSelectedTypes] = useState<string[]>(() => types || [])
  const [priceRange, setPriceRange] = useState(getInitialFilters({ minPrice, maxPrice, filters }))

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
      // const { minPricePerPerson, maxPricePerPerson } = prevPrices
      //
      // if (
      //   (priceKey === "minPricePerPerson" && value > maxPricePerPerson) ||
      //   (priceKey === "maxPricePerPerson" && value < minPricePerPerson)
      // ) {
      //   return prevPrices
      // }

      return { ...prevPrices, [priceKey]: value }
    })
  }

  const changePriceInSlider = (prices: number[] | number) => {
    if (Array.isArray(prices)) {
      const [min, max] = prices
      setPriceRange({ minPricePerPerson: min, maxPricePerPerson: max })
    }
  }

  // useEffect(() => {
  //   getInitialFilters({ minPrice, maxPrice, filters })
  // }, [minPrice, maxPrice])

  return {
    handleCheckboxChange,
    selectedTypes,
    setSelectedTypes,
    changePrices,
    priceRange,
    changePriceInSlider,
  }
}

export default useToursFilterForm
