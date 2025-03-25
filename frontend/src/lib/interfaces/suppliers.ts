export enum SupplierType {
  COMPANY_SUPPLIER = "COMPANY_SUPPLIER",
  INDIVIDUAL_SUPPLIER = "INDIVIDUAL_SUPPLIER",
}

type SupplierBase = {
  id: string
  email: string
  phone: string
  aboutMe: string
  photo?: {
    compressedMediumStorageLink: string
    compressedPreviewStorageLink: string
  }
}

export interface CompanySupplier extends SupplierBase {
  type: SupplierType.COMPANY_SUPPLIER
  companySupplier: {
    ownerName: string
    companyName: string
  }
}

export interface IndividualSupplier extends SupplierBase {
  type: SupplierType.INDIVIDUAL_SUPPLIER
  individualSupplier: {
    firstName: string
    lastName: string
  }
}

export type Supplier = CompanySupplier | IndividualSupplier
