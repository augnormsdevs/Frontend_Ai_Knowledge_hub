'use client'

import { useEffect } from 'react'

type ToastProps = {
  message: string
  type: 'success' | 'error'
  onClose: () => void
  duration?: number
}

const Toast = ({ message, type, onClose, duration = 3000 }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <div className={`fixed top-5 right-5 z-50 px-4 py-3 rounded shadow-lg text-white ${
      type === 'success' ? 'bg-green-600' : 'bg-red-600'
    }`}>
      {message}
    </div>
  )
}

export default Toast
