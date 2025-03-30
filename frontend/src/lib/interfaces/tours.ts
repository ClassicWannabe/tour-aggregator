import { Pagination } from "@/lib/interfaces/common"

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
  isTransportIncluded: boolean
  pricePerPerson: number
  peopleCount: number
  locationId: string
  inclusions: string[]
  exclusions: string[]
  dates: { startDate: string; endDate: string; id: string }[]
  createdAt: string
  updatedAt: string
  supplierId: string
  photos: TourPhoto[]
  program: ITourProgram
  meetingPlace: string
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

export enum TourStatus {
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
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

export type SupplierTourCounts = { all: number; active: number; finished: number }

export type SupplierTour = {
  id: string
  title: string
  status: TourStatus
  dates: { startDate: string; endDate: string }[]
}

export type SupplierTourReservation = {
  id: string
  name: string
  email: string
  phoneNumber: string
  status: TourStatus
  tourDate: { startDate: string; endDate: string; tourId: string }
}

export type SupplierTourResponse = {
  rows: SupplierTour[]
  pagination: Pagination
}

export type SupplierTourReservationResponse = {
  rows: SupplierTourReservation[]
  pagination: Pagination
}
