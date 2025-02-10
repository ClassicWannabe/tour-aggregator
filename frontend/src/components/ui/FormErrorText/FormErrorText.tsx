import React from "react"

const FormErrorText: React.FC<{ text: string | string[] }> = ({ text }) => {
  return <p className="text-errorBase text-caption2">{text}</p>
}

export default FormErrorText
