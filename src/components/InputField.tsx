'use client'

import React from 'react'

type InputFieldProps = {
  label: string
  type?: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder
}) => {
  return (
    <div className="mb-4">
      <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
      />
    </div>
  )
}

export default InputField
