import React from "react"
import s from "./spinner-styles.module.css"

type Props = {
  color?: string
  strokeWidth?: number
  radius?: string
  width?: number
}

const Spinner: React.FC<Props> = ({ color = "#ffffff", strokeWidth = 3, radius = "20", width = 30 }) => {
  return (
    <svg viewBox="25 25 50 50" className={s.wrapper} stroke={color} strokeWidth={strokeWidth} width={width}>
      <circle r={radius} cy="50" cx="50" className={s.circle}></circle>
    </svg>
  )
}

export default Spinner
