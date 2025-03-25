"use client"
import React from "react"
import { DragOverlay, useDndContext } from "@dnd-kit/core"
import ImageAttachment from "@/app/[locale]/(main)/personal-account/(mutate-tour)/_components/AttachmentsForm/ImageAttachment"
import { AttachmentsFormType } from "@/app/[locale]/(main)/personal-account/(mutate-tour)/_components/AttachmentsForm/schema"

interface OverlayImageAttachmentProps {
  images: AttachmentsFormType["images"]
}

export default function OverlayImageAttachment({ images }: OverlayImageAttachmentProps) {
  const { active } = useDndContext()
  const activeId = active?.id
  const image = images.find(({ id }) => id === activeId)

  return (
    <DragOverlay>{image?.link ? <ImageAttachment link={image.link} shouldShowOverlay={false} /> : null}</DragOverlay>
  )
}
