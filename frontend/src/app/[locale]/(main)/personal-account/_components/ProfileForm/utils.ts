import { Supplier, SupplierType } from "@/lib/interfaces/suppliers"

const ProfileFormInitial = {
  payload: {
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    companyName: "",
    ownerName: "",
    aboutMe: "",
  },
  errors: {},
}

export const getProfileFormInitial = (supplier: Supplier) => {
  const supplierTypePayload: Partial<(typeof ProfileFormInitial)["payload"]> = {}
  if (supplier.type === SupplierType.COMPANY_SUPPLIER) {
    supplierTypePayload.companyName = supplier.companySupplier.companyName
    supplierTypePayload.ownerName = supplier.companySupplier.ownerName
  } else {
    supplierTypePayload.firstName = supplier.individualSupplier.firstName
    supplierTypePayload.lastName = supplier.individualSupplier.lastName
  }

  return {
    ...ProfileFormInitial,
    payload: {
      ...ProfileFormInitial.payload,
      ...supplierTypePayload,
      email: supplier.email,
      phone: supplier.phone,
      aboutMe: supplier.aboutMe,
    },
  }
}
