"use client"
import Input from "@/components/ui/Input"
import FormCheckboxMultiple, { FormCheckboxMultipleProps } from "@/components/Form/FormCheckboxMultiple"
import Button from "@/components/ui/Button"
import React, { ComponentProps, useRef, useState } from "react"
import { cn } from "@/lib/utils/common"
import AddButton from "@/app/[locale]/(main)/personal-account/(mutate-tour)/_components/AddButton"

export interface FormCheckboxMultipleEditableProps {
  name: string
  initialItems?: string[]
  buttonProps?: ComponentProps<typeof Button> & {
    text?: string
  }
  inputProps?: ComponentProps<typeof Input>
}

export default function FormCheckboxMultipleDynamic({
  name,
  initialItems = [],
  buttonProps = {},
  inputProps = {},
}: FormCheckboxMultipleEditableProps) {
  const { className: inputClassName, ...restInputProps } = inputProps
  const [newItem, setNewItem] = useState("")
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [isNewItemError, setIsNewItemError] = useState(false)
  const [items, setItems] = useState<string[]>(initialItems)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsNewItemError(false)
    setNewItem(e.target.value)
  }
  const handleInputEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddClick()
    }
  }
  const handleAddClick = () => {
    if (!newItem || items.includes(newItem)) {
      setIsNewItemError(true)
      inputRef.current?.focus()
      return
    }
    setItems((prevState) => [...prevState, newItem])
    setNewItem("")
  }

  const checkboxItems: FormCheckboxMultipleProps["items"] = items.map((item) => ({ label: item, value: item }))

  return (
    <>
      <FormCheckboxMultiple name={name} items={checkboxItems} />
      <Input
        ref={inputRef}
        className={cn(
          "ml-4 border-none shadow-none",
          isNewItemError ? "placeholder:text-destructive" : "",
          inputClassName,
        )}
        value={newItem}
        onChange={handleInputChange}
        onKeyDown={handleInputEnter}
        {...restInputProps}
      />
      <AddButton text={buttonProps?.text} buttonProps={{ onClick: handleAddClick, ...buttonProps }} />
    </>
  )
}
