import { TourStatus } from "@/lib/interfaces/tours"

export type GetTourDisplayDateParams = {
  status: TourStatus
  dates: { startDate: string; endDate: string }[]
}

export default function getTourDisplayDate({ status, dates }: GetTourDisplayDateParams) {
  const now = new Date()
  switch (status) {
    case TourStatus.ACTIVE:
      return dates.reduce((result, date) => {
        if (new Date(date.startDate) > now && new Date(date.startDate) < new Date(result.startDate)) {
          return date
        }
        return result
      }, dates[0])
    case TourStatus.FINISHED:
      return dates.reduce((result, date) => {
        if (new Date(date.startDate) > new Date(result.startDate)) {
          return date
        }
        return result
      }, dates[0])
    default:
      return dates[0]
  }
}
