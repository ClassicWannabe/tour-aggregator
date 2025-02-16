"use client"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form"
import Checkbox from "@/components/ui/CheckBox"
import { ComponentProps } from "react"
import { cn } from "@/lib/utils/common"

export interface FormCheckboxMultipleProps {
  name: string
  items: { label: string; value: string }[]
  label?: string
  row?: boolean
  containerProps?: ComponentProps<typeof FormItem>
}

export default function FormCheckboxMultiple({ name, items, containerProps, label, row }: FormCheckboxMultipleProps) {
  return (
    <FormField
      name={name}
      render={() => {
        return (
          <FormItem {...containerProps}>
            {label && <FormLabel>{label}</FormLabel>}
            <div className={cn(row ? "flex space-y-0 gap-x-3" : "space-y-2")}>
              {items.map((item) => (
                <FormField
                  key={item.value}
                  name={name}
                  render={({ field }) => {
                    return (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.value)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.value])
                                : field.onChange(field.value?.filter((value: string) => value !== item.value))
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">{item.label}</FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
            </div>
            <FormMessage className="relative" />
          </FormItem>
        )
      }}
    />
  )
}
