import React from "react"
import { cn } from "@/lib/utils"
import { Link } from "@/i18n/routing"

type Variants = "filled" | "outlined" | "text" | "dashed"
type Colors = "primary" | "secondary"
type Sizes = "sm" | "md" | "lg"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variants
  className?: string
  size?: Sizes
  color?: Colors
  href?: string
}

const variants: Record<Variants, string> = {
  filled: "border-none rounded-lg",
  outlined: "border rounded-lg",
  dashed: "border border-dashed rounded-lg",
  text: "bg-none border-none",
}

const colors: Record<Colors, string> = {
  primary: "bg-primaryGreen text-primaryWhite border-accentGreen",
  secondary: "bg-primaryWhite text-primaryBlack border-borderColorSecondary",
}

const sizes: Record<Sizes, string> = {
  sm: "px-2 py-1",
  md: "px-4 py-2",
  lg: "px-5 py-3",
}

const BaseStyles = "hover:opacity-90 transition-opacity font-normal"

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "filled",
  color = "primary",
  size = "md",
  className,
  href,
  ...rest
}) => {
  return (
    <button className={cn(BaseStyles, variants[variant], colors[color], sizes[size], className ?? "")} {...rest}>
      {href ? <Link href={href}>{children}</Link> : children}
    </button>
  )
}

export default Button
