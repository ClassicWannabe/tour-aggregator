"use client"
import React from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import ImageAttachment, {
  ImageAttachmentProps,
} from "@/app/[locale]/(main)/personal-account/(mutate-tour)/_components/AttachmentsForm/ImageAttachment"

type SortableImageAttachmentProps = {
  id: string
  attachmentProps: ImageAttachmentProps
}

export default function SortableImageAttachment({ attachmentProps, id }: SortableImageAttachmentProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging, transition } = useSortable({
    id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} role="button" aria-label="Drag to reorder">
      <ImageAttachment {...attachmentProps} />
    </div>
  )
}
