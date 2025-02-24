"use client"
import Input from "@/components/ui/Input"
import React from "react"
import Button from "@/components/ui/Button"
import Slider from "rc-slider"

export default function ToursFilterForm() {
  return (
    <form action="/tours">
      <div className="flex flex-col gap-4">
        <Slider
          range
          min={0}
          max={100}
          defaultValue={[0, 100]}
          styles={{ track: { background: "#00BE8B" }, handle: { background: "#fff", borderColor: "#00BE8B" } }}
        />
        <div className="flex gap-2">
          <Input name="priceFrom" placeholder="От" />
          <Input name="priceTo" placeholder="До" />
        </div>
        <span className="h-[1px] bg-lightGray" />
        <Button type="submit">Применить</Button>
      </div>
    </form>
  )
}
