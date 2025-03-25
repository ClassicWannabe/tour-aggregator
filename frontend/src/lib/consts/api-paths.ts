export const API_PATHS = {
  locations: "/locations",
  tourPhotos: "/tours/photos",
  tours: "/tours",
  tourById: (tourId: string) => `/tours/${tourId}`,
  signIn: "/suppliers/sign-in",
  filters: "/tours/filters",
  supplierMe: "/suppliers/me",
  supplierTourCounts: "/tours/supplier-tours/counts",
  supplierTours: "/tours/supplier-tours",
} as const
