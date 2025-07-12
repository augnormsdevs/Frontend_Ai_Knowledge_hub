'use client'

import React, { useRef, useState } from 'react'
import axios from 'axios'
import Toast from './Toast'
import Button from './Button'
import { useRouter } from 'next/navigation'

const UploadForm = () => {
  const [title, setTitle] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const router = useRouter();


  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState<'success' | 'error'>('success')
  const [loading, setLoading] = useState(false)


  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!file || !title) {
      setToastMessage('Both title and file are required.')
      setToastType('error')
      setShowToast(true)
      return
    }

    const formData = new FormData()
    formData.append('title', title)
    formData.append('file', file)
    setLoading(true)
    try {
      const token = localStorage.getItem('accessToken')

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/documents/upload/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      setToastMessage('Document uploaded and embedded successfully.')
      setToastType('success')
      setShowToast(true)

      setTitle('')
      setFile(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }

    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.data) {
        const message = Object.values(err.response.data).flat().join(', ')
        setToastMessage(message)
      } else {
        setToastMessage('Upload failed.')
      }
      setToastType('error')
      setShowToast(true)
    }finally {
        setLoading(false)
      }
  }

  return (
    <div className="bg-white shadow-md rounded px-6 py-4">
      <form onSubmit={handleUpload}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter document title"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">File</label>
          <input
            type="file"
            accept=".txt,.pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full border p-2 rounded-md cursor-pointer"
            required
            ref={fileInputRef}
          />
        </div>

        <Button label="Upload" type="submit" loading={loading} className='bg-[dodgerblue]'/>

        <button onClick={()=>{router.push("/chat")}} className="text-pink-500 hover:underline mt-2 cursor-pointer">
          chat
        </button>
      </form>

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

export default UploadForm
