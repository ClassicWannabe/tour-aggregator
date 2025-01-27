"use client"

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
import { Link, usePathname } from "@/i18n/routing"

export default function CustomBreadcrumb() {
  const pathname = usePathname()
  const t = useTranslations("Breadcrumb")

  const pathSegments = pathname.split("/").filter(Boolean)

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathSegments.map((segment, index) => {
          const isFirstSegment = index === 0
          const isLastSegment = index === pathSegments.length - 1
          const href = `/${pathSegments.slice(0, index + 1).join("/")}`
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
