'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import useAuthRedirect from '@/hooks/useAuthRedirect'
import axios from 'axios'
import Button from '@/components/Button'
import { User, Document } from '@/types-interfaces/types'

const DashboardPage = () => {
  const checkingAuth = useAuthRedirect()//protected route

  const [user, setUser] = useState<User | null>(null)
  const [documents, setDocuments] = useState<Document[]>([])

  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken')
        const profileRes = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        const docsRes = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/documents/`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        console.log(docsRes.data)
        setUser(profileRes.data)
        setDocuments(docsRes.data)
      } catch {
        console.error('Failed to fetch dashboard data')
      }
    }

    if (!checkingAuth) fetchData()
  }, [checkingAuth])

  if (checkingAuth) return null

  return (
    <div className="min-h-screen bg-gray-200 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Welcome */}
        <div className="bg-white p-6 rounded shadow flex justify-center items-center">
          <div>
            <h1 className="text-2xl font-semibold">
              Welcome back, {user?.username || 'User'} 👋
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Here’s a snapshot of your recent activity
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded shadow text-center">
            <p className="text-sm text-gray-600">Total Documents</p>
            <p className="text-2xl font-bold">{documents.length}</p>
          </div>
          <div className="bg-white p-4 rounded shadow text-center">
            <p className="text-sm text-gray-600">Last Uploaded</p>
            <p className="text-lg font-medium">
              {documents[0]?.title || 'No documents'}
            </p>
          </div>
          <div className="bg-white p-4 rounded shadow text-center">
            <p className="text-sm text-gray-600">Search Now</p>
            <Button label="Search" type="button" onClick={() => router.push('/search')} className='bg-[dodgerblue]'/>
          </div>
        </div>

        {/* Recent Uploads */}
        <div className="max-h-[350px] overflow-auto bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Recent Uploads</h2>
          <ul className="space-y-2">
            {documents.map((doc) => (
              <li key={doc?.id} className="border p-3 rounded text-sm text-gray-700">
                📄 <strong>{doc?.title}</strong> – uploaded on{' '}
                {new Date(doc?.uploaded_at).toLocaleDateString()}
              </li>
            ))}
            {documents.length === 0 && (
              <li className="text-gray-500">You haven’t uploaded any documents yet.</li>
            )}
          </ul>
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-4">
          <Button label="Upload New Document" type="button" onClick={() => router.push('/documents')} className='bg-[deeppink]'/>
          <Button label="Ask a Question" type="button" onClick={() => router.push('/chat')} className='bg-[dodgerblue]'/>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
