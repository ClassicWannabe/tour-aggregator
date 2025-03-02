import { useSearchParams } from "next/navigation"

const useQueryWithMultipleParams = () => {
  const searchParams = useSearchParams()

  const query: Record<string, string | string[]> = {}
  searchParams.forEach((value, key) => {
    if (query[key]) {
      query[key] = Array.isArray(query[key]) ? [...query[key], value] : [query[key] as string, value]
    } else {
      query[key] = value
    }
  })

  return query
}

export default useQueryWithMultipleParams
