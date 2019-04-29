
import React from 'react'
import "../styles/TextInput.sass"

const TextInput = ({ placeholder, value, onChange, type }) => (
  <input 
    placeholder={placeholder}
    className="text-input" 
    type={type ? type : "text"}
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
)

export default TextInput;