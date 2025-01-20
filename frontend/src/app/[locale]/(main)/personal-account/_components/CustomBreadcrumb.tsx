"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/Breadcrumb"
import { useTranslations } from "next-intl"
import { Home } from "lucide-react"
import { Fragment } from "react"

export default function CustomBreadcrumb() {
  const pathname = usePathname()
  const t = useTranslations("Breadcrumb")

  const pathSegments = pathname.split("/").filter(Boolean)

  const [locale, ...restSegments] = pathSegments

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {restSegments.map((segment, index) => {
          const isFirstSegment = index === 0
          const isLastSegment = index === restSegments.length - 1
          const href = `/${locale}/${restSegments.slice(0, index + 1).join("/")}`
          const icon = isFirstSegment && <Home className="max-h-4" />

          if (isLastSegment) {
            return (
              <BreadcrumbItem key={href}>
                <BreadcrumbPage className="flex flex-row items-center">
                  {icon}
                  {t(segment)}
                </BreadcrumbPage>
              </BreadcrumbItem>
            )
          }

          return (
            <Fragment key={href}>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={href} className="flex flex-row items-center">
                    {icon}
                    {t(segment)}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
