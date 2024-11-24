"use client"

import React from "react"
import useMediaQuery from "@/hooks/useMediaQuery"
import MobileHeader from "@/components/Header/MobileHeader"
import DesktopHeader from "@/components/Header/DesktopHeader"

const Header = () => {
  const isMobileViewport = useMediaQuery("(max-width: 768px)")
  return (
    <header>{isMobileViewport ? <MobileHeader /> : <DesktopHeader />}</header>
  )
}

export default Header
