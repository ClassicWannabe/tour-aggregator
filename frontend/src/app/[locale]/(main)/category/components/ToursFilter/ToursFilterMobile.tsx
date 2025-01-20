"use client"
import React from "react"

import useMediaQuery from "@/lib/hooks/useMediaQuery"

export default function ToursFilterMobile() {
  const isMobileViewport = useMediaQuery("(max-width: 768px)")

  return <div className="border  border-lightGray"></div>
}
