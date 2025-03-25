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
  type: TourType
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
  dates: { startDate: string; endDate: string; id: string; isFull: boolean }[]
  createdAt: string
  updatedAt: string
  supplierId: string
  photos: TourPhoto[]
  program: ITourProgram
}

export type ITourProgram = TourProgramItem[][]

export interface TourProgramItem {
  time: string
  description: string
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
