"use client"
import { useRouter } from "@/i18n/routing"
import ProfilePhoto from "@/app/[locale]/(main)/personal-account/_components/ProfilePhoto"
import Button from "@/components/ui/Button"
import { Trash, Upload } from "lucide-react"
import React, { ChangeEvent, useRef } from "react"
import { useTranslations } from "next-intl"
import { uploadSupplierProfilePhoto } from "@/actions/upload-supplier-profile-photo"
import Input from "@/components/ui/Input"
import { Supplier } from "@/lib/interfaces/suppliers"
import { deleteSupplierProfilePhoto } from "@/actions/delete-supplier-profile-photo"
import { Modal, ModalClose } from "@/components/ui/Modal"

const imageMimeTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"]

type SupplierPhotoFormProps = {
  photo?: Supplier["photo"]
}

export default function SupplierPhotoForm({ photo }: SupplierPhotoFormProps) {
  const t = useTranslations()
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleUploadProfilePhoto = async () => {
    inputRef.current?.click()
  }

  const handleDeleteProfilePhoto = async () => {
    if (!photo?.id) {
      return
    }
    await deleteSupplierProfilePhoto(photo.id)
    router.refresh()
  }

  const handleInputImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }
    await uploadSupplierProfilePhoto(file)

    router.refresh()
  }

  return (
    <div className="flex flex-row items-center gap-10">
      <ProfilePhoto photoUrl={photo?.compressedPreviewStorageLink} />
      <Input
        type="file"
        className="hidden"
        ref={inputRef}
        onChange={handleInputImageChange}
        accept={imageMimeTypes.join(", ")}
      />
      <Button
        onClick={handleUploadProfilePhoto}
        type="button"
        color="secondary"
        variant="outlined"
        className="flex flex-row items-center justify-evenly gap-2"
      >
        <Upload className="h-4 w-4" />
        {t("ProfileForm.mainInformation.uploadPhotoButton")}
      </Button>
      <Modal
        trigger={
          <Button
            type="button"
            disabled={!photo?.id}
            color="secondary"
            variant="outlined"
            className="flex flex-row items-center justify-evenly gap-2"
          >
            <Trash className="h-4 w-4" />
            {t("ProfileForm.mainInformation.deletePhotoModal.triggerButton")}
          </Button>
        }
        title={t("ProfileForm.mainInformation.deletePhotoModal.title")}
      >
        <ModalClose asChild>
          <Button color="secondary" variant="outlined">
            {t("ProfileForm.mainInformation.deletePhotoModal.cancelButton")}
          </Button>
        </ModalClose>
        <ModalClose asChild>
          <Button color="destructive" onClick={handleDeleteProfilePhoto}>
            {t("ProfileForm.mainInformation.deletePhotoModal.confirmDeleteButton")}
          </Button>
        </ModalClose>
      </Modal>
    </div>
  )
}
