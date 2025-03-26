"use client"
import { SquarePen, Trash } from "lucide-react"
import { deleteTour } from "@/actions/delete-tour"
import { useRouter } from "@/i18n/routing"
import RouteNames from "@/lib/consts/route-names"
import { Modal, ModalClose } from "@/components/ui/Modal"
import Button from "@/components/ui/Button"
import { useTranslations } from "next-intl"

type ActionButtonsProps = {
  tourId: string
}
export default function ActionButtons({ tourId }: ActionButtonsProps) {
  const t = useTranslations("TourTable")
  const router = useRouter()
  const handleEdit = () => {
    router.push(RouteNames.EditTour + "/" + tourId)
  }
  const handleDelete = async () => {
    await deleteTour(tourId)
    router.refresh()
  }
  return (
    <div className="flex flex-row gap-2">
      <SquarePen className="h-8 w-8 cursor-pointer rounded-lg border p-1.5" onClick={handleEdit} />
      <Modal
        trigger={<Trash className="h-8 w-8 cursor-pointer rounded-lg border p-1.5" />}
        title={t("deleteTour.title")}
      >
        <ModalClose asChild>
          <Button color="secondary" variant="outlined">
            {t("deleteTour.cancelButton")}
          </Button>
        </ModalClose>
        <Button color="destructive" onClick={handleDelete}>
          {t("deleteTour.confirmDeleteButton")}
        </Button>
      </Modal>
    </div>
  )
}
