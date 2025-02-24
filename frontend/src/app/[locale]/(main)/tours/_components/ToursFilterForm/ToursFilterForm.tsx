"use server"
import Input from "@/components/ui/Input"
import React from "react"
import Form from "next/form"
import Button from "@/components/ui/Button"
import Slider from "@/components/ui/Slider"

export default async function ToursFilterForm() {
  return (
    <Form action="/tours">
      <div className="flex flex-col gap-4">
        <Slider />
        <div className="flex gap-2">
          <Input name="priceFrom" placeholder="От" />
          <Input name="priceTo" placeholder="До" />
        </div>
        <span className="h-[1px] bg-lightGray" />
        <Button type="submit">Применить</Button>
      </div>
    </Form>
  )
}
