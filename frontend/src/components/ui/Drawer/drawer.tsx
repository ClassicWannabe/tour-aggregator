"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"
import { cn } from "@/lib/utils/common"

const Drawer = ({ shouldScaleBackground = true, ...props }: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} {...props} />
)

const DrawerTrigger = DrawerPrimitive.Trigger
const DrawerPortal = DrawerPrimitive.Portal
const DrawerClose = DrawerPrimitive.Close

const DrawerOverlay = (props: React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>) => {
  return <DrawerPrimitive.Overlay className={cn("fixed inset-0 z-50 bg-black/80", props.className)} {...props} />
}

const DrawerContent = (
  {
    className,
    children,
    withoutOverlay,
    withoutDrag,
    ...props
  }: React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> & {
    withoutOverlay?: boolean
    withoutDrag?: boolean
  },
  drawerPortal: React.JSX.Element = (
    <>
      <DrawerPortal>
        {!withoutOverlay && <DrawerOverlay />}
        <DrawerPrimitive.Content
          className={cn(
            "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background px-6 pb-4 pt-2",
            className,
          )}
          {...props}
        >
          {!withoutDrag && <div className="mx-auto mb-3 h-2 w-[100px] rounded-full bg-muted" />}
          {children}
        </DrawerPrimitive.Content>
      </DrawerPortal>
    </>
  ),
) => {
  return drawerPortal
}

const DrawerHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("grid gap-1.5 pb-2 text-center sm:text-left", className)} {...props} />
)

const DrawerFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mt-auto flex flex-col gap-2 p-4", className)} {...props} />
)

const DrawerTitle = (props: React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>) => {
  return (
    <DrawerPrimitive.Title
      className={cn("text-lg font-semibold leading-none tracking-tight", props.className)}
      {...props}
    />
  )
}

const DrawerDescription = (props: React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>) => {
  return <DrawerPrimitive.Description className={cn("text-sm text-muted-foreground", props.className)} {...props} />
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
