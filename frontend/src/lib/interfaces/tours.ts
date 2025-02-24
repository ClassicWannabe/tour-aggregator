export interface ToursFilter {
  prices: {
    min: number
    max: number
  }
  types: ["WALKING", "CITY", "FIELD"]
  locations: [
    {
      id: "64c9d624-af32-4e14-879e-677bf71fec78"
      name: "Almaty"
    },
    {
      id: "9f1a7f68-1027-48a2-bc44-f16dc3523c10"
      name: "Astana"
    },
  ]
}

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
