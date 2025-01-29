"use client"
import React, { useMemo } from "react"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/Drawer/drawer"

import useMediaQuery from "@/lib/hooks/useMediaQuery"
import Button from "@/components/ui/Button"
import { CloseIcon } from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon"
import { useTranslations } from "next-intl"

const ToursFilter = () => {
  const t = useTranslations()
  const isMobileViewport = useMediaQuery("(max-width: 768px)")

  const CommonContent = useMemo(() => <div>Common</div>, [isMobileViewport])

  return (
    <div className="border border-lightGray">
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outlined" color="secondary" size="sm">
            {t("Shared.choose")}
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="w-full max-w-sm flex flex-col">
            <div className="flex gap-4">
              <DrawerClose>
                <CloseIcon />
              </DrawerClose>
              <DrawerTitle>Фильтр</DrawerTitle>
            </div>
            <DrawerDescription>{t("Filter.toFilterBy")}</DrawerDescription>
            {CommonContent}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default ToursFilter
