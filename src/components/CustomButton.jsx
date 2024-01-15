import { Button } from '@mui/material'
import React from 'react'

const CustomButton = ({variant, text , styleing,onClick}) => {
  return (
    <Button onClick={onClick} className={styleing} variant={variant}>{text}</Button>
  )
}

export default CustomButton