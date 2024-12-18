import React from "react"
import Image from "next/image"

const TopSection = () => {
  return (
    <article className="relative md:absolute top-0 left-0 w-full h-fit z-10">
      <div className="relative h-[464px] md:h-[600px] w-full">
        <Image src="/static/images/top-section-bg.jpeg" alt="Dead lake image" layout="fill" objectFit="cover" />
        <div className="w-full h-full bg-[#000000A6] absolute z-10" />
      </div>
    </article>
  )
}

export default TopSection
