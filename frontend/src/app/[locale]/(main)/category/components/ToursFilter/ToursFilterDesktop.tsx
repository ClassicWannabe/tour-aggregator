"use client"
import React from "react"

import useMediaQuery from "@/lib/hooks/useMediaQuery"

export default function ToursFilterDesktop() {
  const isMobileViewport = useMediaQuery("(max-width: 768px)")

  return <div className="border border-solid border-lightGray"></div>
}
