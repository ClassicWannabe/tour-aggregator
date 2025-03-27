"use client"
import Image from "next/image"
import { Eye, Trash2 } from "lucide-react"
import React from "react"
import { cn } from "@/lib/utils/common"
import { useTranslations } from "next-intl"

export interface ImageAttachmentProps {
  link: string
  onDeleteClick?(): void
  shouldShowOverlay?: boolean
  isMainImage?: boolean
}

export default function ImageAttachment({
  link,
  onDeleteClick,
  shouldShowOverlay = true,
  isMainImage = false,
}: ImageAttachmentProps) {
  const t = useTranslations("AttachmentsForm")
  return (
    <div className="relative group h-24 w-36">
      <Image className="object-cover border p-1 rounded-lg" src={link} alt="The image selected by the user" fill />

      {isMainImage && (
        <div className="absolute w-[calc(100%-0.5rem)] bg-black bg-opacity-40 m-1 h-5 bottom-0 text-primaryWhite text-center text-sm rounded-b">
          {t("mainPhoto")}
        </div>
      )}
      <div
        className={cn(
          "absolute w-full h-full items-center justify-center gap-4 text-primaryWhite z-10 hidden",
          shouldShowOverlay ? "group-hover:flex" : "",
        )}
      >
        <a href={link} target="_blank">
          <Eye className="h-6 w-6 cursor-pointer" />
        </a>
        <Trash2 className="h-6 w-6 cursor-pointer" onClick={onDeleteClick} />
      </div>
      <div
        className={cn(
          "absolute inset-0 bg-black bg-opacity-0  transition-opacity duration-1000 rounded-lg",
          shouldShowOverlay ? "group-hover:bg-opacity-40" : "",
        )}
      />
    </div>
  )
}
