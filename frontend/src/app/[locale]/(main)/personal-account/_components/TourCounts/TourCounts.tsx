import { getTranslations } from "next-intl/server"
import TourCountItem from "@/app/[locale]/(main)/personal-account/_components/TourCounts/TourCountItem"
import { getSupplierTourCounts } from "@/actions/get-supplier-tour-counts"

export async function TourCounts() {
  const tourCounts = await getSupplierTourCounts()
  const t = await getTranslations("TourCounts")
  return (
    <div className="w-full bg-colorBgLayout flex flex-row justify-evenly py-8">
      <TourCountItem text={t("all")} count={tourCounts.all} />
      <TourCountItem text={t("active")} count={tourCounts.active} />
      <TourCountItem text={t("finished")} count={tourCounts.finished} />
    </div>
  )
}
