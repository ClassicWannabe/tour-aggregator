type TourCountItemProps = {
  text: string
  count: number
}

export default function TourCountItem({ text, count }: TourCountItemProps) {
  return (
    <div className="flex flex-col justify-center items-center gap-1">
      <div className="text-lg text-gray-500">{text}</div>
      <div className="font-bold text-3xl">{count}</div>
    </div>
  )
}
