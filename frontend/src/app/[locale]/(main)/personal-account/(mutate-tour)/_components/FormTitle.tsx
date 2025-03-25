"use client"
import Typography from "@/components/ui/Typography"

type FormTitleProps = {
  title: string
  subtitle: string
}

export default function FormTitle({ title, subtitle }: FormTitleProps) {
  return (
    <div className="mb-5">
      <Typography variant="headline2">{title}</Typography>
      <Typography variant="caption1" color="black2" className="mt-1">
        {subtitle}
      </Typography>
    </div>
  )
}
