"use client"

import React from "react"
import useMediaQuery from "@/lib/hooks/useMediaQuery"
import MobileFooter from "./MobileFooter"
import DesktopFooter from "./DesktopFooter"

const Footer = () => {
  const isMobileViewport = useMediaQuery("(max-width: 768px)")
  return (
    <footer className="mt-auto border-t border-solid border-[#0000001A]">
      {isMobileViewport ? <MobileFooter /> : <DesktopFooter />}
    </footer>
  )
}

export default Footer
