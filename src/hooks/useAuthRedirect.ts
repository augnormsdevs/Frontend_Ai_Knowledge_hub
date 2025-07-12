'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { isTokenExpired } from '@/utils/token'

const useAuthRedirect = () => {
  const router = useRouter()
  const [checkingAuth, setCheckingAuth] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (!token || isTokenExpired(token)) {
      localStorage.removeItem('accessToken')  // Clean up
      router.replace('/login')
    } else {
      setCheckingAuth(false)
    }
  }, [router])

  return checkingAuth
}

export default useAuthRedirect
