"use server"

import { UpdateProfileAgencySchema, UpdateProfileGuideSchema } from "@/lib/consts/schemas"
import makeFetchUrlPath from "@/lib/utils/make-fetch-url-path"
import { API_PATHS } from "@/lib/consts/api-paths"
import { SupplierType } from "@/lib/interfaces/suppliers"
import { fetchWithAuth } from "@/lib/utils/fetch-with-auth"

type UpdateProfileErrors = {
  email?: string[]
  phone?: string[]
  socialLinks?: string[]
  firstName?: string[]
  lastName?: string[]
  companyName?: string[]
  ownerName?: string[]
  aboutMe?: string[]
}

export async function updateProfile(prevState: any, formData: FormData) {
  const data = Object.fromEntries(formData)
  const supplierType = data.companyName ? SupplierType.COMPANY_SUPPLIER : SupplierType.INDIVIDUAL_SUPPLIER

  let result
  if (supplierType === SupplierType.COMPANY_SUPPLIER) {
    result = UpdateProfileAgencySchema.safeParse(data)
  } else {
    result = UpdateProfileGuideSchema.safeParse(data)
  }

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors as UpdateProfileErrors,
      payload: data,
    }
  }

  const { email, aboutMe, socialLinks, phone, firstName, lastName, companyName, ownerName } = data

  const body: Record<string, unknown> = { email, aboutMe, socialLinks, phone }

  if (supplierType === SupplierType.COMPANY_SUPPLIER) {
    body["companySupplier"] = { companyName, ownerName }
  } else {
    body["individualSupplier"] = { firstName, lastName }
  }

  const updateProfileReq = await fetchWithAuth(makeFetchUrlPath(API_PATHS.updateSupplierProfileInfo), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })

  if (!updateProfileReq.ok) {
    return {
      payload: data,
      errors: {
        common: "CommonErrors.serverError",
      } as UpdateProfileErrors,
    }
  }

  return {
    payload: data,
  }
}
