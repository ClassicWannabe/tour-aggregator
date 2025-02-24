import React from "react"
import { Tour } from "@/lib/interfaces/tours"
import TourCard from "@/app/[locale]/(main)/_components/TourCard"

const mockTours: Tour[] = [
  {
    id: "05683314-bec8-4bac-9ca0-82437258c89d",
    title: "My Tour Title",
    thesis: "My tour summary",
    description: "Some tour description",
    transportDescription: "Some transport description",
    pricePerPerson: 10000,
    peopleCount: 20,
    contacts: ["7778883412", "7778883412"],
    highlights: ["Best view in the city", "Super experience and many more"],
    inclusions: ["Food"],
    exclusions: ["Clothing"],
    startDate: "2024-10-01T12:34:56.789Z",
    endDate: "2024-10-02T12:34:56.789Z",
    createdAt: "2024-12-04T19:45:58.059Z",
    updatedAt: "2024-12-04T19:45:58.059Z",
    supplierId: "e6e4fd6e-09ad-475f-b2a2-68c0231964be",
    photos: ["/static/images/top-section-bg.jpeg"],
  },
  {
    id: "05683314-bec8-4bac-9ca0-82437258c89d",
    title: "My Tour Title My Tour Title My Tour Title My Tour Title My Tour Title",
    thesis: "My tour summary",
    description: "Some tour description",
    transportDescription: "Some transport description",
    pricePerPerson: 10000,
    peopleCount: 20,
    contacts: ["7778883412", "7778883412"],
    highlights: ["Best view in the city", "Super experience and many more"],
    inclusions: ["Food"],
    exclusions: ["Clothing"],
    startDate: "2024-10-01T12:34:56.789Z",
    endDate: "2024-10-02T12:34:56.789Z",
    createdAt: "2024-12-04T19:45:58.059Z",
    updatedAt: "2024-12-04T19:45:58.059Z",
    supplierId: "e6e4fd6e-09ad-475f-b2a2-68c0231964be",
    photos: ["/static/images/top-section-bg.jpeg"],
  },
  {
    id: "05683314-bec8-4bac-9ca0-82437258c89d",
    title: "My Tour Title",
    thesis: "My tour summary",
    description:
      "Some tour description Some tour description Some tour description Some tour description Some tour description Some tour description",
    transportDescription: "Some transport description",
    pricePerPerson: 10000,
    peopleCount: 20,
    contacts: ["7778883412", "7778883412"],
    highlights: ["Best view in the city", "Super experience and many more"],
    inclusions: ["Food"],
    exclusions: ["Clothing"],
    startDate: "2024-10-01T12:34:56.789Z",
    endDate: "2024-10-02T12:34:56.789Z",
    createdAt: "2024-12-04T19:45:58.059Z",
    updatedAt: "2024-12-04T19:45:58.059Z",
    supplierId: "e6e4fd6e-09ad-475f-b2a2-68c0231964be",
    photos: ["/static/images/top-section-bg.jpeg"],
  },
  {
    id: "05683314-bec8-4bac-9ca0-82437258c89d",
    title: "My Tour Title",
    thesis: "My tour summary",
    description:
      "Some tour description Some tour description Some tour description Some tour description Some tour description Some tour description",
    transportDescription: "Some transport description",
    pricePerPerson: 10000,
    peopleCount: 20,
    contacts: ["7778883412", "7778883412"],
    highlights: ["Best view in the city", "Super experience and many more"],
    inclusions: ["Food"],
    exclusions: ["Clothing"],
    startDate: "2024-10-01T12:34:56.789Z",
    endDate: "2024-10-02T12:34:56.789Z",
    createdAt: "2024-12-04T19:45:58.059Z",
    updatedAt: "2024-12-04T19:45:58.059Z",
    supplierId: "e6e4fd6e-09ad-475f-b2a2-68c0231964be",
    photos: ["/static/images/top-section-bg.jpeg"],
  },
]

export default async function ToursBoard() {
  return (
    <section className="grid gap-4 justify-center md:gap-8 xl:gap-12 grid-cols-[repeat(auto-fit,_340px)]">
      {mockTours.map((tour) => (
        <TourCard key={tour.id} tour={tour} />
      ))}
    </section>
  )
}
