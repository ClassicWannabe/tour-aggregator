import ProfilePhoto from "@/app/[locale]/(main)/personal-account/_components/ProfilePhoto"
import { getSupplierMe } from "@/actions/get-supplier-me"
import { SupplierType } from "@/lib/interfaces/suppliers"
import { getTranslations } from "next-intl/server"

export default async function SupplierPhoto() {
  const t = await getTranslations("PersonalAccount")
  const supplier = await getSupplierMe()
  const supplierType = supplier.type

  const getSupplierName = () => {
    if (supplier.type === SupplierType.COMPANY_SUPPLIER) {
      return supplier.companySupplier.companyName
    }
    return `${supplier.individualSupplier.firstName} ${supplier.individualSupplier.lastName}`
  }

  const supplierName = getSupplierName()

  return (
    <div className="flex flex-row gap-2">
      <ProfilePhoto photoUrl={supplier.photo?.compressedPreviewStorageLink} />
      <div className="flex flex-col justify-evenly">
        <div className="font-semibold">{supplierName}</div>
        <div className="text-gray">{t(`supplierType.${supplierType}`)}</div>
      </div>
    </div>
  )
}
