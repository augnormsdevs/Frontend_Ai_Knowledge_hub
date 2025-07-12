'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import InputField from '@/components/InputField'
import Toast from '@/components/Toast'
import Button from '@/components/Button'

const LoginPage = () => {
  const router = useRouter()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [loading, setLoading] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState<'success' | 'error'>('success')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login/`, formData)

      const { access, refresh } = response.data
      localStorage.setItem('accessToken', access)
      localStorage.setItem('refreshToken', refresh)

      setToastMessage('Login successful! Redirecting...')
      setToastType('success')
      setShowToast(true)

      setTimeout(() => {
        router.push('/dashboard') // or /search depending on flow
      }, 2000)
    } catch {
      setToastMessage('Login failed. Please check your credentials.')
      setToastType('error')
      setShowToast(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      {/* Left illustration or welcome text */}
            <div className="lg:w-1/2 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md bg-white p-8 rounded-md shadow-md">
          <h1 className="text-2xl font-semibold mb-6 text-center">Login to Your Account</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            <InputField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />

            <Button label="Login" type="submit" loading={loading} className="w-full bg-[dodgerblue]" />
          </form>

          <p className="text-sm text-center mt-4">
            Don&#39;t have an account?{' '}
            <button onClick={() => router.push('/register')} className="text-blue-600 hover:underline cursor-pointer mr-2">
              Register here
            </button>

            <button onClick={() => router.push('/')} className="text-pink-500 hover:underline cursor-pointer">
              Back home
            </button>
          </p>
        </div>
      </div>


      {/* Right login form */}
      <div className="lg:w-1/2 flex items-center justify-center bg-blue-600 text-white px-10 py-20">
        <div className="max-w-md text-center space-y-4">
          <h2 className="text-4xl font-bold">Welcome Back</h2>
          <p className="text-lg">Sign in to access your documents and continue chatting with your AI assistant.</p>
        </div>
      </div>

      {/* Toast */}
      {showToast && (
        <Toast message={toastMessage} type={toastType} onClose={() => setShowToast(false)} />
      )}
    </div>
  )
}

export default LoginPage
