export type ToursFilterParams = Partial<{
  limit: number
  offset: number
  search: string
  type: string
  minPricePerPerson: number
  maxPricePerPerson: number
}>

export interface Tour {
  id: string
  title: string
  thesis: string
  description: string
  transportDescription: string
  pricePerPerson: number
  peopleCount: number
  contacts: string[]
  highlights: string[]
  inclusions: string[]
  exclusions: string[]
  startDate: string
  endDate: string
  createdAt: string
  updatedAt: string
  supplierId: string
  photos: string[]
}

export enum TourType {
  WALKING = "WALKING",
  CITY = "CITY",
  FIELD = "FIELD",
}

export interface TourFilters {
  prices: {
    min: number
    max: number
  }
  types: TourType[]
  locations: [
    {
      id: string
      name: string
    },
    {
      id: string
      name: string
    },
  ]
}
