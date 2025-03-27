import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table"
import { getTranslations } from "next-intl/server"
import { TourStatus } from "@/lib/interfaces/tours"
import { SearchParams } from "next/dist/server/request/search-params"
import dayjs from "dayjs"
import { DEFAULT_DATE_FORMAT } from "@/lib/consts/dayjs"
import TourStatusBadge from "@/app/[locale]/(main)/personal-account/_components/Table/TourStatusBadge"
import TablePagination from "@/app/[locale]/(main)/personal-account/_components/Table/TablePagination"
import { getSupplierTourReservations } from "@/actions/get-supplier-tour-reservations"
import { MY_TOUR_RESERVATIONS_SEARCH_PARAMS } from "@/lib/consts/personal-account"

type TourReservationTableProps = {
  searchParams: SearchParams
}

const PAGINATION_LIMIT = 10

export async function TourReservationTable({ searchParams }: TourReservationTableProps) {
  const t = await getTranslations("TourReservationTable")
  const { status, page = 1 } = searchParams
  const offset = (+page - 1) * PAGINATION_LIMIT
  const { rows, pagination } = await getSupplierTourReservations({
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
            <TableHead>{t("headers.email")}</TableHead>
            <TableHead>{t("headers.phoneNumber")}</TableHead>
            <TableHead>{t("headers.date")}</TableHead>
            <TableHead>{t("headers.status")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.length > 0 ? (
            rows.map((reservation) => {
              return (
                <TableRow key={reservation.id}>
                  <TableCell className="font-medium">{reservation.name}</TableCell>
                  <TableCell className="font-medium">{reservation.email}</TableCell>
                  <TableCell className="font-medium">{reservation.phoneNumber}</TableCell>
                  <TableCell>
                    {dayjs(reservation.tourDate.startDate).format(DEFAULT_DATE_FORMAT)} -{" "}
                    {dayjs(reservation.tourDate.endDate).format(DEFAULT_DATE_FORMAT)}
                  </TableCell>
                  <TableCell>
                    <TourStatusBadge tourStatus={reservation.status} />
                  </TableCell>
                </TableRow>
              )
            })
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="py-4 text-center text-lg text-gray-400">
                {t("noData")}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        pagination={pagination}
        searchParams={searchParams}
        pageKey={MY_TOUR_RESERVATIONS_SEARCH_PARAMS.page}
      />
    </>
  )
}
