import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const set = (newValue) => {
    setValue(newValue)
  }

  return {
    type,
    value,
    onChange,
    set
  }
}

export const inputAttrs = ({ set, ...rest }) => rest