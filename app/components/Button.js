import React from 'react'

const Button = ({ children, type, handleClick }) => {
  return (
    <button type={type} onClick={handleClick} className="border-2 border-white text-white rounded-xl py-1 px-2 bg-green-600">{children}</button>
  )
}

export default Button