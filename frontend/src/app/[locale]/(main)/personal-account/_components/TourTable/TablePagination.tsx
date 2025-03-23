import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/Pagination"
import { Pagination as TPagination } from "@/lib/interfaces/common"
import { getTranslations } from "next-intl/server"
import { SearchParams } from "next/dist/server/request/search-params"
import getQueryFromSearchParams from "@/lib/utils/get-query-from-search-params"

type TablePaginationProps = {
  pagination: TPagination
  searchParams: SearchParams
}

const ELLIPSIS_PLACE = -1

export default async function TablePagination({ pagination, searchParams }: TablePaginationProps) {
  const t = await getTranslations("Shared")
  const currentPage = pagination.offset / pagination.limit + 1
  const maxPage = Math.ceil(pagination.count / pagination.limit)
  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === maxPage

  const getBackHref = () => {
    if (isFirstPage) return ""
    const stringParams = getQueryFromSearchParams(searchParams)
    const currentParams = new URLSearchParams(stringParams)
    currentParams.set("page", `${currentPage - 1}`)

    return `?${currentParams.toString()}`
  }

  const getNextHref = () => {
    if (isLastPage) return ""
    const stringParams = getQueryFromSearchParams(searchParams)
    const currentParams = new URLSearchParams(stringParams)
    currentParams.set("page", `${currentPage + 1}`)

    return `?${currentParams.toString()}`
  }

  const getNewPageHref = (page: number) => {
    const stringParams = getQueryFromSearchParams(searchParams)
    const currentParams = new URLSearchParams(stringParams)
    currentParams.set("page", page.toString())

    return `?${currentParams.toString()}`
  }

  const getPages = () => {
    if (maxPage < 5) {
      return new Array(maxPage).fill(0).map((_, i) => i + 1)
    }
    if (isFirstPage) {
      return [currentPage, currentPage + 1, currentPage + 2, ELLIPSIS_PLACE]
    }
    if (isLastPage) {
      return [ELLIPSIS_PLACE, currentPage - 2, currentPage - 1, currentPage]
    }

    const pages = [currentPage - 1, currentPage, currentPage + 1]

    if (pages[0] > 1) {
      pages.splice(0, 0, ELLIPSIS_PLACE)
    }
    if (pages[pages.length - 1] < maxPage) {
      pages.push(ELLIPSIS_PLACE)
    }

    return pages
  }

  const pages = getPages()

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            isDisabled={isFirstPage}
            scroll={false}
            href={getBackHref()}
            text={t("pagination.back")}
          />
        </PaginationItem>
        {pages.map((page, index) => {
          if (page === ELLIPSIS_PLACE) {
            return (
              <PaginationItem key={index}>
                <PaginationEllipsis />
              </PaginationItem>
            )
          }
          return (
            <PaginationItem key={index}>
              <PaginationLink href={getNewPageHref(page)} isActive={page === currentPage}>
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        })}
        <PaginationItem>
          <PaginationNext isDisabled={isLastPage} scroll={false} href={getNextHref()} text={t("pagination.next")} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
