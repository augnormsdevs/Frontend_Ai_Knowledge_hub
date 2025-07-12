'use client'

import React from 'react'
import { cn } from '@/lib/utils'


type ButtonProps = {
  label: string
  type?: 'button' | 'submit'
  onClick?: () => void
  className?: string
  loading?: boolean
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  label,
  type = 'button',
  onClick,
  className = '',
  loading = false,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        'w-full text-white py-2 rounded hover:bg-green-700 flex items-center justify-center transition cursor-pointer',
        disabled || loading ? 'opacity-50 cursor-not-allowed' : '',
        className
      )}
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      ) : (
        label
      )}
    </button>
  )
}

export default Button
