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
  photos: TourPhoto[]
}

export interface TourPhoto {
  id: string
  originalStorageLink: string
  compressedMediumStorageLink: string
  compressedPreviewStorageLink: string
  originalStorageKey: string
  compressedMediumStorageKey: string
  compressedPreviewStorageKey: string
  order: number
  tourId: string
  supplierId: string
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
