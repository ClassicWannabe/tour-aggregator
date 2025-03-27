import { TourStatus } from "@/lib/interfaces/tours"
import Badge from "@/components/ui/Badge"
import { getTranslations } from "next-intl/server"

type TourStatusBadgeProps = {
  tourStatus: TourStatus
}

export default async function TourStatusBadge({ tourStatus }: TourStatusBadgeProps) {
  const t = await getTranslations("TourTable")

  switch (tourStatus) {
    case TourStatus.ACTIVE:
      return <Badge text={t("tourStatus.active")} variant="secondary" />
    case TourStatus.FINISHED:
      return <Badge text={t("tourStatus.finished")} variant="destructive" />
  }
}
