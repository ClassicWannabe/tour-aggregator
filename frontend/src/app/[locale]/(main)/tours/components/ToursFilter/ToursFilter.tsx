"use client"
import React, { useMemo, useState } from "react"
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
import { useTranslations } from "next-intl"
import { PlusSquareIcon, X } from "lucide-react"
import useTourFilter from "./useTourFilter"

const ToursFilter = () => {
  const t = useTranslations()
  const { open, setOpen, closeDrawer } = useTourFilter()
  const isMobileViewport = useMediaQuery("(max-width: 768px)")

  const CommonContent = <div>Common</div>

  const FilterWrapper = useMemo(() => {
    if (isMobileViewport)
      return (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button variant="outlined" color="secondary" size="sm" className="flex items-center gap-2 w-fit">
              <PlusSquareIcon size={14} /> {t("Filter.filtersTitle")}
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="w-full flex flex-col">
              <div className="flex flex-wrap gap-3 items-center">
                <DrawerClose>
                  <X size={16} />
                </DrawerClose>
                <DrawerTitle>Фильтр</DrawerTitle>
                <div className="flex gap-2 ml-auto">
                  <Button variant="outlined" color="secondary" size="sm" onClick={closeDrawer}>
                    {t("Filter.reset")}
                  </Button>
                  <Button size="sm">{t("Filter.apply")}</Button>
                </div>
              </div>
              <DrawerDescription>{t("Filter.toFilterBy")}</DrawerDescription>
              {CommonContent}
            </div>
          </DrawerContent>
        </Drawer>
      )
    return (
      <div className="w-254">
        {CommonContent}
        <Button variant="outlined" color="secondary" size="sm" onClick={closeDrawer}>
          {t("Filter.reset")}
        </Button>
        <Button size="sm">{t("Filter.resetAll")}</Button>
      </div>
    )
  }, [isMobileViewport])

  return (
    <div className="flex flex-col gap-4 md:border md:border-solid md:border-lightGray">
      <h2 className="text-headline4">{t("Filter.toFilterBy")}</h2>
      {FilterWrapper}
    </div>
  )
}

export default ToursFilter
