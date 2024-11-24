"use client"
import { useEffect, useState } from "react"

const useMediaQuery = (query: string, config?: { initialValue?: boolean }) => {
  const [matches, setMatches] = useState<boolean>(
    config?.initialValue ?? window.matchMedia(query).matches ?? false,
  )
  useEffect(() => {
    const media = window.matchMedia(query)

    if (media.matches !== matches) {
      setMatches(media.matches)
    }

    const listener = () => setMatches(media.matches)
    window.addEventListener("resize", listener)

    return () => window.removeEventListener("resize", listener)
  }, [matches, query])

  return matches
}

export default useMediaQuery
