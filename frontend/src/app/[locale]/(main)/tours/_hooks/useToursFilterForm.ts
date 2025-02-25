import { useRouter } from "@/i18n/routing"
import { useSearchParams } from "next/navigation"
import React from "react"

const useToursFilterForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const search = searchParams.get("search") ?? undefined

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const updatedParams = new URLSearchParams(searchParams)
    for (const [key, value] of formData.entries()) {
      updatedParams.set(key, value.toString())
    }
    router.push(`?${updatedParams.toString()}`, { scroll: false })
  }

  return { search, handleSubmit }
}

export default useToursFilterForm
