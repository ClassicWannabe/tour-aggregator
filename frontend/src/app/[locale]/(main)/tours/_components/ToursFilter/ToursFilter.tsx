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

const ToursFilter = () => {
  const isMobileViewport = useMediaQuery("(max-width: 768px)")

  const CommonContent = (
    <div className="flex flex-col gap-4">
      <Slider
        range
        min={0}
        max={100}
        defaultValue={[0, 100]}
        styles={{ track: { background: "#00BE8B" }, handle: { background: "#fff", borderColor: "#00BE8B" } }}
      />
      <div className="flex gap-2">
        <Input name="priceFrom" placeholder="От" />
        <Input name="priceTo" placeholder="До" />
      </div>
      <span className="h-[1px] bg-lightGray" />
    </div>
  )

  return isMobileViewport ? (
    <MobileFilter>{CommonContent}</MobileFilter>
  ) : (
    <DesktopFilter>{CommonContent}</DesktopFilter>
  )
}

export default ToursFilter
