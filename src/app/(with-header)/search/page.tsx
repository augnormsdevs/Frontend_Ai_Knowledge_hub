'use client'

import React, { useState } from 'react'
import axios from 'axios'
import Toast from '@/components/Toast'
import Button from '@/components/Button'
import useAuthRedirect from '@/hooks/useAuthRedirect'
import { useRouter } from 'next/navigation'


const SearchPage = () => {
  const checkingAuth = useAuthRedirect()
  
    
  const [query, setQuery] = useState('')
  const [answer, setAnswer] = useState('')
  const [sources, setSources] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState<'success' | 'error'>('success')

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!query.trim()) {
      setToastMessage('Query is required.')
      setToastType('error')
      setShowToast(true)
      return
    }

    setLoading(true)
    setAnswer('')
    setSources([])

    try {
      const token = localStorage.getItem('accessToken')

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/documents/search/`,
        { query },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )

      setAnswer(response.data.answer)
      setSources(response.data.sources)

    } catch {
      setToastMessage('Failed to fetch answer.')
      setToastType('error')
      setShowToast(true)
    } finally {
      setLoading(false)
    }
  }

  if (checkingAuth) {
    return null // Or a spinner/loading placeholder
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-semibold mb-4">Ask the AI Knowledge Hub</h1>

      <form onSubmit={handleSearch} className="mb-6">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border rounded p-3 h-24"
          placeholder="Ask a question based on your uploaded documents..."
        />

        <div className="mt-4">
          <Button label="Search" type="submit" loading={loading} className='bg-[dodgerblue]'/>
        </div>
        <div className='mt-4'>
          <button onClick={() => router.push('/dashboard')} className="text-pink-500 hover:underline cursor-pointer">
              Back home
            </button>
        </div>
      </form>

      {answer && (
        <div className="bg-green-50 p-4 rounded border border-green-200 mb-4">
          <h2 className="font-semibold text-green-800 mb-1">Answer:</h2>
          <p>{answer}</p>
        </div>
      )}

      {sources.length > 0 && (
        <div className="bg-gray-50 p-4 rounded border border-gray-200">
          <h2 className="font-semibold text-gray-700 mb-2">Sources:</h2>
          <ul className="list-disc pl-5 text-sm text-gray-600">
            {sources.map((src, index) => (
              <li key={index} className="mb-1">{src}</li>
            ))}
          </ul>
        </div>
      )}

      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  )
}

export default SearchPage
