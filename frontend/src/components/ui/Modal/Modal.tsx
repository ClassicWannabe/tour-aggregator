"use client"
import React from "react"
import useMediaQuery from "@/lib/hooks/useMediaQuery"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/Drawer/drawer"

interface Props {
  children: React.ReactNode
  title?: string
  trigger: React.ReactNode
}

export const Modal: React.FC<Props> = ({ children, ...props }) => {
  const isMobileViewport = useMediaQuery("(max-width: 768px)")
  return isMobileViewport ? (
    <MobileBottomDrawer {...props}>{children}</MobileBottomDrawer>
  ) : (
    <DesktopModal {...props}>{children}</DesktopModal>
  )
}

export const DesktopModal: React.FC<Props> = ({ children, trigger, title }) => {
  return (
    <Dialog >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="sr-only" />
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export const MobileBottomDrawer: React.FC<Props> = ({ children, trigger, title }) => {
  return (
    <Drawer direction="bottom">
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
        </DrawerHeader>
        {children}
      </DrawerContent>
    </Drawer>
  )
}
