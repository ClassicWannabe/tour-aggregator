"use client"
import React from "react"
import { default as RCSlider } from "rc-slider"

const Slider = () => {
  return (
    <RCSlider
      range
      min={0}
      max={100}
      defaultValue={[0, 100]}
      styles={{ track: { background: "#00BE8B" }, handle: { background: "#fff", borderColor: "#00BE8B" } }}
    />
  )
}

export default Slider
