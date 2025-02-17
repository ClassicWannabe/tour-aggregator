import { useTranslations } from "next-intl"

const useFormErrorsTranslation = () => {
  const t = useTranslations()

  return (errorNamespace?: string | string[]) => {
    if (!errorNamespace) return ""
    if (Array.isArray(errorNamespace) && !!errorNamespace.length) {
      return t(errorNamespace[0])
    } else if (typeof errorNamespace === "string") return t(errorNamespace)
    return ""
  }
}

export default useFormErrorsTranslation
