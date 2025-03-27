import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table"
import { getTranslations } from "next-intl/server"
import { getSupplierTours } from "@/actions/get-supplier-tours"
import { TourStatus } from "@/lib/interfaces/tours"
import { SearchParams } from "next/dist/server/request/search-params"
import getTourDisplayDate from "@/lib/utils/get-tour-display-date"
import dayjs from "dayjs"
import { DEFAULT_DATE_FORMAT } from "@/lib/consts/dayjs"
import TourStatusBadge from "@/app/[locale]/(main)/personal-account/_components/Table/TourStatusBadge"
import ActionButtons from "@/app/[locale]/(main)/personal-account/_components/Table/TourTable/ActionButtons"
import TablePagination from "@/app/[locale]/(main)/personal-account/_components/Table/TablePagination"
import { MY_TOURS_SEARCH_PARAMS } from "@/lib/consts/personal-account"

type TourTableProps = {
  searchParams: SearchParams
}

const PAGINATION_LIMIT = 10

export async function TourTable({ searchParams }: TourTableProps) {
  const t = await getTranslations("TourTable")
  const { status, page = 1 } = searchParams
  const offset = (+page - 1) * PAGINATION_LIMIT
  const { rows, pagination } = await getSupplierTours({
    status: status as TourStatus,
    limit: PAGINATION_LIMIT,
    offset: offset,
  })

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("headers.name")}</TableHead>
            <TableHead>{t("headers.date")}</TableHead>
            <TableHead>{t("headers.status")}</TableHead>
            <TableHead>{t("headers.action")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.length > 0 ? (
            rows.map((tour) => {
              const displayDate = getTourDisplayDate(tour)
              return (
                <TableRow key={tour.id}>
                  <TableCell className="font-medium">{tour.title}</TableCell>
                  <TableCell>
                    {dayjs(displayDate.startDate).format(DEFAULT_DATE_FORMAT)} -{" "}
                    {dayjs(displayDate.endDate).format(DEFAULT_DATE_FORMAT)}
                  </TableCell>
                  <TableCell>
                    <TourStatusBadge tourStatus={tour.status} />
                  </TableCell>
                  <TableCell>
                    <ActionButtons tourId={tour.id} />
                  </TableCell>
                </TableRow>
              )
            })
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="py-4 text-center text-lg text-gray-400">
                {t("noData")}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination pagination={pagination} searchParams={searchParams} pageKey={MY_TOURS_SEARCH_PARAMS.page} />
    </>
  )
}
