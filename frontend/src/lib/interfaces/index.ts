export interface Tour {
  id: string
  title: string
  thesis: string
  description: string
  transportDescription: string
  pricePerPerson: 10000
  peopleCount: 20
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
