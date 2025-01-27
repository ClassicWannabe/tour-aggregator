"use client"
import React, { useMemo } from "react"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/Drawer/drawer"

import useMediaQuery from "@/lib/hooks/useMediaQuery"
import Button from "@/components/ui/Button"

const ToursFilter = () => {
  const isMobileViewport = useMediaQuery("(max-width: 768px)")

  const CommonContent = useMemo(() => <div></div>, [isMobileViewport])

  return (
    <div className="border border-lightGray">
      {CommonContent}
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outlined">Open Drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Move Goal</DrawerTitle>
              <DrawerDescription>Set your daily activity goal.</DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-0">123</div>
            <DrawerFooter>
              <Button>Submit</Button>
              <DrawerClose asChild>
                <Button variant="outlined">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default ToursFilter
