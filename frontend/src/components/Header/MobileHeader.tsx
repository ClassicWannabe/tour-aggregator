"use client"
import React from "react"
import Logo from "@/components/Logo"
import { Menu } from "lucide-react"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerOverlay,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/Drawer/drawer"
import { cn } from "@/lib/utils/common"
import { useTranslations } from "next-intl"
import LocaleSwitcher from "@/components/LocaleSwitcher"

type Props = {
  children: React.ReactNode
}

const MobileHeader: React.FC<Props> = ({ children }) => {
  const t = useTranslations("Shared")
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white">
      <Drawer direction="left">
        <DrawerTrigger>
          <Menu color="#000000E0" />
        </DrawerTrigger>
        <DrawerOverlay className="fixed inset-0 bg-black/20 mt-11" />
        <DrawerContent
          className="fixed left-0 top-0 rounded-none mt-11 border-none h-fit p-0"
          withoutOverlay
          withoutDrag
        >
          <div className="w-full flex flex-col py-4 gap-4">
            <DrawerDescription className="sr-only">menu drawer</DrawerDescription>
            <DrawerTitle className="sr-only">menu title</DrawerTitle>
            <p className={cn("text-body2 px-4", "text-primaryBlack")}>{t("toTravellers")}</p>
            <p className={cn("text-body2 px-4", "text-primaryBlack")}>{t("toPartners")}</p>
            <div className="pt-4 border-t border-borderColorSecondary flex justify-end px-4">
              <LocaleSwitcher color="black" />
            </div>
          </div>
        </DrawerContent>
      </Drawer>
      <Logo isMobile />
      {children}
    </div>
  )
}

export default MobileHeader
