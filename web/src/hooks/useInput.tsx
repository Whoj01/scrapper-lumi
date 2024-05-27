import React from "react"

export const useInput = (inputRef: React.RefObject<HTMLInputElement>) => {
  const [value, setValue] = React.useState<string>("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleClear = () => {
    setValue("")
    inputRef?.current?.focus()
  }

  return {
    value,
    handleChange,
    handleClear,
  }
}