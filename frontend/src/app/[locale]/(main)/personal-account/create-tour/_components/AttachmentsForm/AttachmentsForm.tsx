"use client"
import { useTranslations } from "next-intl"
import FormTitle from "@/app/[locale]/(main)/personal-account/create-tour/_components/FormTitle"
import { Alert, AlertDescription } from "@/components/ui/Alert"
import { AlertCircle, Plus } from "lucide-react"
import FormInput from "@/components/Form/FormInput"
import React, { ChangeEvent, useRef } from "react"
import Button from "@/components/ui/Button"
import { useFormContext } from "react-hook-form"
import {
  AttachmentsFormType,
  imageMimeTypes,
} from "@/app/[locale]/(main)/personal-account/create-tour/_components/AttachmentsForm/schema"
import { uploadPhoto } from "@/actions/upload-photo"
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import { SortableContext, arrayMove } from "@dnd-kit/sortable"
import OverlayImageAttachment from "@/app/[locale]/(main)/personal-account/create-tour/_components/AttachmentsForm/OverlayImageAttachment"
import SortableImageAttachment from "@/app/[locale]/(main)/personal-account/create-tour/_components/AttachmentsForm/SortableImageAttachment"

export function AttachmentsForm() {
  const t = useTranslations("AttachmentsForm")
  const imagesInputName = "images"
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { setValue, getValues, watch, trigger, getFieldState } = useFormContext()
  const handleAddImageClick = () => {
    inputRef.current?.click()
  }
  const images: AttachmentsFormType["images"] = watch(imagesInputName)

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) {
      return
    }
    const imageResults = await Promise.allSettled(
      [...files].map(async (file) => {
        const response = await uploadPhoto(file)

        return { id: response.id, file, link: response.compressedMediumStorageLink }
      }),
    )
    const images = imageResults
      .filter((imageResult) => imageResult.status === "fulfilled")
      .map((imageResult) => imageResult.value)
    const prevImages = getValues(imagesInputName)
    setValue(imagesInputName, [...prevImages, ...images])
    const fieldState = getFieldState(imagesInputName)
    if (fieldState.invalid) {
      await trigger(imagesInputName)
    }
  }

  const handleImageDeletionClick = (link: string) => {
    const prevImages: AttachmentsFormType["images"] = getValues(imagesInputName)
    const filteredImages = prevImages.filter((image) => {
      return image.link !== link
    })
    setValue(imagesInputName, filteredImages)
  }

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor),
  )

  const handleImageDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const currentImages = [...images]
    const activeImageIdx = currentImages.findIndex((img) => img.id === active.id)
    const overImageIdx = currentImages.findIndex((img) => img.id === over.id)

    setValue(imagesInputName, arrayMove(currentImages, activeImageIdx, overImageIdx))
  }

  return (
    <>
      <FormTitle title={t("title")} subtitle={t("subtitle")} />
      <Alert
        variant="info"
        className="[&>svg]:unset [&>svg]:relative [&>svg+div]:translate-y-0 [&>svg~*]:pl-0 [&>svg]:left-0 [&>svg]:top-0 flex gap-2 my-10"
      >
        <AlertCircle className="h-5 w-5" />
        <AlertDescription>{t("infoAlert")}</AlertDescription>
      </Alert>

      <FormInput
        name={imagesInputName}
        label={t("input.image.label")}
        inputProps={{
          type: "file",
          ref: inputRef,
          className: "hidden",
          accept: imageMimeTypes.join(", "),
          onChange: handleImageChange,
          value: "",
          multiple: true,
        }}
      />
      <div className="flex flex-wrap gap-1.5 mt-8">
        <DndContext sensors={sensors} onDragEnd={handleImageDragEnd}>
          <SortableContext items={images}>
            {images.length > 0 &&
              images.map((image, index) => {
                return (
                  <SortableImageAttachment
                    key={image.id}
                    id={image.id}
                    attachmentProps={{
                      link: image.link,
                      onDeleteClick: () => handleImageDeletionClick(image.link),
                      isMainImage: index === 0,
                    }}
                  />
                )
              })}
          </SortableContext>
          <OverlayImageAttachment images={images} />
        </DndContext>

        <Button
          variant="dashed"
          type="button"
          className="h-24 w-36 flex flex-col items-center justify-center bg-colorBgLayout border-gray-500 text-gray-500 text-sm px-1 gap-1"
          onClick={handleAddImageClick}
        >
          <Plus className="h-6 w-6 border-2 border-gray-500 rounded-sm" />
          <span>{t("input.image.addButton")}</span>
        </Button>
      </div>
    </>
  )
}
