"use client"
import React from "react"

import useMediaQuery from "@/lib/hooks/useMediaQuery"
import ToursFilterMobile from "./ToursFilterMobile"
import ToursFilterDesktop from "./ToursFilterDesktop"

const ToursFilter = () => {
  const isMobileViewport = useMediaQuery("(max-width: 768px)")

  return (
    <div className="border  border-lightGray">{isMobileViewport ? <ToursFilterMobile /> : <ToursFilterDesktop />}</div>
  )
}

export default ToursFilter
