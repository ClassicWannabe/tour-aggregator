import { useState } from "react"

const useMobileFilter = () => {
  const [open, setOpen] = useState(false)
  const closeDrawer = () => setOpen(false)

  return { open, closeDrawer, setOpen }
}

export default useMobileFilter
