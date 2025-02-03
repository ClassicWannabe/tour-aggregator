import { useState } from "react"

const useTourFilter = () => {
  const [open, setOpen] = useState(false)
  const closeDrawer = () => setOpen(false)

  return { open, closeDrawer, setOpen }
}

export default useTourFilter
