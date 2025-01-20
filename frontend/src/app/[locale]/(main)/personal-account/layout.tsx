import CustomBreadcrumb from "@/app/[locale]/(main)/personal-account/_components/CustomBreadcrumb"

export default async function PersonalAccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="lg:px-40 mx-0 p-10 bg-colorBgLayout">
      <div className="mb-2">
        <CustomBreadcrumb />
      </div>
      {children}
    </div>
  )
}
