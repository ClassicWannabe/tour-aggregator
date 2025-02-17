import { CONFIG } from "@/config-global"

export default function makeFetchUrlPath(apiSlug: string) {
  return CONFIG.api.baseUrl + apiSlug
}
