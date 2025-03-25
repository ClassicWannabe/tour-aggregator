import { SquarePen, Trash } from "lucide-react"

type ActionButtonsProps = {
  tourId: string
}
export default function ActionButtons({ tourId }: ActionButtonsProps) {
  const handleEdit = () => {}
  const handleDelete = () => {}
  return (
    <div className="flex flex-row gap-2">
      <SquarePen className="h-8 w-8 cursor-pointer border rounded-lg p-1.5" />
      <Trash className="h-8 w-8 cursor-pointer border rounded-lg p-1.5" />
    </div>
  )
}
