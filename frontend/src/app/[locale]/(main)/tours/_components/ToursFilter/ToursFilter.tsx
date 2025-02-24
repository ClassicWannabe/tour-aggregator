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
import useMobileFilter from "./useMobileFilter"
import Slider from "rc-slider"
import "rc-slider/assets/index.css"
import Input from "@/components/ui/Input"
import ToursFilterForm from "@/app/[locale]/(main)/tours/_components/ToursFilterForm"

const MobileFilter: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { open, setOpen, closeDrawer } = useMobileFilter()
  const t = useTranslations()

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
            {children}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

const DesktopFilter: React.FC<{ children: ReactNode }> = ({ children }) => {
  const t = useTranslations()

  return (
    <div className="w-[254px] flex flex-col gap-4 p-4 border border-lightGray rounded-[8px]">
      <h2 className="text-headline4">{t("Filter.toFilterBy")}</h2>
      {children}
      <Button size="sm" className="rounded">
        {t("Filter.apply")}
      </Button>
      <Button variant="outlined" color="secondary" size="sm" className="rounded">
        {t("Filter.reset")}
      </Button>
    </div>
  )
}

const ToursFilter: React.FC = () => {
  const isMobileViewport = useMediaQuery("(max-width: 768px)")

  return isMobileViewport ? (
    <MobileFilter>
      <ToursFilterForm />
    </MobileFilter>
  ) : (
    <DesktopFilter>
      <ToursFilterForm />
    </DesktopFilter>
  )
}

export default ToursFilter
