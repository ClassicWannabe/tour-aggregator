"use client"

import React from "react"
import useMediaQuery from "@/hooks/useMediaQuery"
import MobileHeader from "@/components/Header/MobileHeader"
import DesktopHeader from "@/components/Header/DesktopHeader"
import { usePathname } from "@/i18n/routing"

const Header = () => {
  const pathname = usePathname()
  const isMobileViewport = useMediaQuery("(max-width: 768px)")
  return (
    <header>
      {isMobileViewport ? <MobileHeader /> : <DesktopHeader background={pathname === "/" ? "none" : "white"} />}
    </header>
  )
}

export default Header
