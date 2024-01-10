import React from 'react'

const Image = ({source, alt, style}) => {
  return (
    <img className={style} src={source} alt={alt}/>
  )
}

export default Image