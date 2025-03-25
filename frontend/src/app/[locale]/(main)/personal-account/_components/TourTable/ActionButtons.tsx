"use client"
import { SquarePen, Trash } from "lucide-react"
import { deleteTour } from "@/actions/delete-tour"
import { useRouter } from "@/i18n/routing"
import RouteNames from "@/lib/consts/route-names";

type ActionButtonsProps = {
  tourId: string
}
export default function ActionButtons({ tourId }: ActionButtonsProps) {
  const router = useRouter()
  const handleEdit = () => {
    router.push(RouteNames.EditTour + '/' + tourId)
  }
  const handleDelete = async () => {
    await deleteTour(tourId)
    router.refresh()
  }
  return (
    <div className="flex flex-row gap-2">
      <SquarePen className="h-8 w-8 cursor-pointer border rounded-lg p-1.5" onClick={handleEdit} />
      <Trash className="h-8 w-8 cursor-pointer border rounded-lg p-1.5" onClick={handleDelete} />
    </div>
  )
}
