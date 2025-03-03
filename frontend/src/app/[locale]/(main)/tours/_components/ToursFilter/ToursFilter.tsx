"use client"
import React, { ReactNode } from "react"
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
import useMobileFilter from "../../_hooks/useMobileFilter"
import "rc-slider/assets/index.css"
import ToursFilterForm from "@/app/[locale]/(main)/tours/_components/ToursFilterCommon"
import { TourFilters } from "@/lib/interfaces/tours"
import useTourFilter from "@/app/[locale]/(main)/tours/_hooks/useTourFilter"

const MobileFilter: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { open, setOpen, closeDrawer } = useMobileFilter()
  const t = useTranslations()
  const { handleSubmit, resetForm } = useTourFilter()

  const onDrawerClose = () => {
    resetForm()
    closeDrawer()
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-headline4">{t("Filter.toFilterBy")}</h2>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant="outlined" color="secondary" size="sm" className="flex items-center gap-2 w-fit">
            <PlusSquareIcon size={14} /> {t("Filter.filtersTitle")}
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <form onSubmit={handleSubmit}>
            <div className="w-full flex flex-col">
              <div className="flex flex-wrap gap-3 items-center">
                <DrawerClose>
                  <X size={16} />
                </DrawerClose>
                <DrawerTitle>Фильтр</DrawerTitle>
                <div className="flex gap-2 ml-auto">
                  <Button variant="outlined" color="secondary" size="sm" onClick={resetForm} type="reset">
                    {t("Filter.reset")}
                  </Button>
                  <Button size="sm" type="submit" onClick={onDrawerClose}>
                    {t("Filter.apply")}
                  </Button>
                </div>
              </div>
              <DrawerDescription>{t("Filter.toFilterBy")}</DrawerDescription>
              {children}
            </div>
          </form>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

const DesktopFilter: React.FC<{ children: ReactNode }> = ({ children }) => {
  const t = useTranslations()
  const { handleSubmit, resetForm } = useTourFilter()

  return (
    <div className="w-[254px] border border-lightGray rounded-[8px]">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 ">
        <h2 className="text-headline4">{t("Filter.toFilterBy")}</h2>
        {children}
        <Button size="sm" className="rounded" type="submit">
          {t("Filter.apply")}
        </Button>
        <Button variant="outlined" color="secondary" size="sm" className="rounded" onClick={resetForm} type="reset">
          {t("Filter.reset")}
        </Button>
      </form>
    </div>
  )
}

type ToursFilterProps = {
  filters: TourFilters | null
}

const ToursFilter: React.FC<ToursFilterProps> = ({ filters }) => {
  const isMobileViewport = useMediaQuery("(max-width: 768px)")

  return isMobileViewport ? (
    <MobileFilter>
      <ToursFilterForm filters={filters} />
    </MobileFilter>
  ) : (
    <DesktopFilter>
      <ToursFilterForm filters={filters} />
    </DesktopFilter>
  )
}

export default ToursFilter
