"use client"
import React, { useRef } from "react"
import { TourPhoto } from "@/lib/interfaces/tours"
import ReactImageGallery, { ReactImageGalleryItem } from "react-image-gallery"
import "react-image-gallery/styles/css/image-gallery.css"
import "./custom-gallery-style.css"

type Props = {
  images: TourPhoto[]
}

const TourGallery: React.FC<Props> = ({ images }) => {
  const galleryRef = useRef<ReactImageGallery | null>(null)

  const handleImageClick = () => {
    if (galleryRef.current) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      galleryRef.current.toggleFullScreen()
    }
  }
  const filteredImages: ReactImageGalleryItem[] = images.map((image) => ({
    original: image.originalStorageLink,
    thumbnail: image.compressedPreviewStorageLink,
    originalAlt: "tour card item original item",
    thumbnailAlt: "tour card thumbnail item",
  }))
  return (
    <ReactImageGallery
      ref={galleryRef}
      items={filteredImages}
      showPlayButton={false}
      showFullscreenButton={false}
      lazyLoad
      showNav={false}
      onClick={handleImageClick}
    />
  )
}

export default TourGallery
