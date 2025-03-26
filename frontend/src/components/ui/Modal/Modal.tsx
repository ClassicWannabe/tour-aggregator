"use client"
import React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/Dialog"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/Drawer/drawer"
import useMobileMediaQuery from "@/lib/hooks/useMobileMediaQuery"

interface Props {
  children: React.ReactNode
  title?: string
  trigger: React.ReactNode
  isOpen?: boolean
}

export const Modal: React.FC<Props> = ({ children, ...props }) => {
  const isMobileViewport = useMobileMediaQuery()
  return isMobileViewport ? (
    <MobileBottomDrawer {...props}>{children}</MobileBottomDrawer>
  ) : (
    <DesktopModal {...props}>{children}</DesktopModal>
  )
}

type ModalCloseProps = React.PropsWithChildren &
  React.ComponentProps<typeof DrawerClose> &
  React.ComponentProps<typeof DialogClose>

export const ModalClose: React.FC<ModalCloseProps> = ({ children, ...props }) => {
  const isMobileViewport = useMobileMediaQuery()
  return isMobileViewport ? (
    <DrawerClose {...props}>{children}</DrawerClose>
  ) : (
    <DialogClose {...props}>{children}</DialogClose>
  )
}

export const DesktopModal: React.FC<Props> = ({ children, trigger, title, isOpen }) => {
  return (
    <Dialog open={isOpen}>
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

export const MobileBottomDrawer: React.FC<Props> = ({ children, trigger, title, isOpen }) => {
  return (
    <Drawer direction="bottom" open={isOpen}>
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
