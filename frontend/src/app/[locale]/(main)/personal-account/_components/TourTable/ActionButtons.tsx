"use client"
import { SquarePen, Trash } from "lucide-react"
import { deleteTour } from "@/actions/delete-tour"
import { useRouter } from "@/i18n/routing"

type ActionButtonsProps = {
  tourId: string
}
export default function ActionButtons({ tourId }: ActionButtonsProps) {
  const router = useRouter()
  const handleEdit = () => {}
  const handleDelete = async () => {
    await deleteTour(tourId)
    router.refresh()
  }
  return (
    <div className="flex flex-row gap-2">
      <SquarePen className="h-8 w-8 cursor-pointer border rounded-lg p-1.5" />
      <Trash className="h-8 w-8 cursor-pointer border rounded-lg p-1.5" onClick={handleDelete} />
    </div>
  )
}
