"use client"

import React from "react"
import useMediaQuery from "@/lib/hooks/useMediaQuery"
import MobileHeader from "@/components/Header/MobileHeader"
import DesktopHeader from "@/components/Header/DesktopHeader"
import { usePathname } from "@/i18n/routing"

const Header: React.FC<{ authButton: React.ReactNode }> = ({ authButton }) => {
  const pathname = usePathname()
  const isMobileViewport = useMediaQuery("(max-width: 768px)")
  return (
    <header>
      {isMobileViewport ? (
        <MobileHeader />
      ) : (
        <DesktopHeader background={pathname === "/" ? "none" : "white"}>{authButton}</DesktopHeader>
      )}
    </header>
  )
}

export default Header
