'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Button from './Button'
import axios from 'axios'

export default function ClientHeader() {
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('accessToken')
      if (!token) return
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setUserEmail(res.data.email)
      } catch {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
      }
    }
    fetchProfile()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    router.push('/login')
  }

  return (
    <header className="bg-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6">
        <h1 className="text-2xl font-bold cursor-pointer" onClick={() => router.push('/')}>
          AI Knowledge Hub
        </h1>
        
        <div className="flex items-center space-x-4">
          <Button label="dashboard" type="button" onClick={() => router.push('/dashboard')} className="bg-gray-300 hover:bg-red-700 w-auto px-3 py-1 text-sm" />
          {userEmail && (
            <>
              <span className="text-gray-700 text-sm">{userEmail}</span>
              <Button label="Logout" type="button" onClick={handleLogout} className="bg-red-600 hover:bg-red-700 w-auto px-3 py-1 text-sm" />
            </>
          )}
        </div>
      </div>
    </header>
  )
}
