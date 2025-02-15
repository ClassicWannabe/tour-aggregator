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
import ImageAttachment from "@/app/[locale]/(main)/personal-account/create-tour/_components/AttachmentsForm/ImageAttachment"
import { uploadPhoto } from "@/actions/upload-photo"

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
    const images = await Promise.all(
      [...files].map(async (file) => {
        const response = await uploadPhoto(file)

        return { id: response.id, file, link: response.compressedMediumStorageLink }
      }),
    )

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
        {images.length > 0 &&
          images.map((image) => (
            <ImageAttachment
              key={image.id}
              link={image.link}
              onDeleteClick={() => handleImageDeletionClick(image.link)}
            />
          ))}

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
