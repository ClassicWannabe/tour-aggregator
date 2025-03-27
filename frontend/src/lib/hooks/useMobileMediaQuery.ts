"use client"
import useMediaQuery from "@/lib/hooks/useMediaQuery"

const useMobileMediaQuery = () => {
  return useMediaQuery("(max-width: 768px)")
}

export default useMobileMediaQuery
