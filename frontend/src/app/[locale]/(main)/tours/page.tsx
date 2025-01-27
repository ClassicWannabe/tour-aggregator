import ToursFilter from "./components/ToursFilter/ToursFilter"

interface SearchParams {
  locale: string
}

export default async function CategoryPage({ params }: { params: Promise<SearchParams> }) {
  return (
    <section className="border-t border-solid border-lightGray">
      <ToursFilter />
    </section>
  )
}
