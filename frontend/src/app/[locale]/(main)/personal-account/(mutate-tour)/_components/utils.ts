import { Tour } from "@/lib/interfaces/tours"
import { FormType } from "@/app/[locale]/(main)/personal-account/(mutate-tour)/_components/CreateTourForm/schema"

export const getTourFormDefaultValues = (tour: Tour): FormType => {
  const program: FormType["tourProgram"] = tour.program.map((dayProgram) =>
    dayProgram.map((item) => ({ time: new Date(item.time), description: item.description })),
  )
  const [dateRange, ...restDates] = tour.dates.map((date) => ({
    startDate: new Date(date.startDate),
    endDate: new Date(date.endDate),
  }))
  const recurringDates = restDates.map((date) => date.startDate)
  const images: FormType["images"] = tour.photos.map(
    (photo) => ({ id: photo.id, link: photo.compressedMediumStorageLink }) as FormType["images"][number],
  )

  return {
    images,
    dateRange,
    peopleCount: tour.peopleCount,
    tourProgram: program,
    tourType: tour.type,
    description: tour.description,
    priceInfo: {
      isTourFree: tour.pricePerPerson === 0,
      pricePerPerson: tour.pricePerPerson,
    },
    location: tour.locationId,
    exclusions: tour.exclusions,
    inclusions: tour.inclusions,
    title: tour.title,
    thesis: tour.thesis,
    isTransportIncluded: tour.isTransportIncluded,
    meetingPlace: tour.meetingPlace,
    recurringTour: {
      isRecurringTour: recurringDates.length > 0,
      recurringDates: recurringDates,
    },
  }
}
