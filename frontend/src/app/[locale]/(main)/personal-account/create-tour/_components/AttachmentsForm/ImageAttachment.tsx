import Image from "next/image"
import { Eye, Trash2 } from "lucide-react"
import React from "react"

interface ImageAttachmentProps {
  link: string
  onDeleteClick(): void
}

export default function ImageAttachment({ link, onDeleteClick }: ImageAttachmentProps) {
  return (
    <div className="relative group h-24 w-36">
      <Image className="object-cover border p-1 rounded-lg" src={link} alt="The image selected by the user" fill />
      <div className="absolute w-full h-full group-hover:flex items-center justify-center gap-4 text-primaryWhite z-10 hidden">
        <a href={link} target="_blank">
          <Eye className="h-6 w-6 cursor-pointer" />
        </a>
        <Trash2 className="h-6 w-6 cursor-pointer" onClick={onDeleteClick} />
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-1000 rounded-lg" />
    </div>
  )
}
