import ToursFilter from "./components/ToursFilter/ToursFilter"

interface SearchParams {
  locale: string
}

export default async function CategoryPage({ params }: { params: Promise<SearchParams> }) {
  return (
    <section className="main-layout-padding-horizontal">
      <ToursFilter />
    </section>
  )
}
