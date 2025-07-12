'use client'

import React, { useEffect, useState } from 'react'
import { Paperclip, Send } from 'lucide-react'
import Image from 'next/image'
import useAuthRedirect from '@/hooks/useAuthRedirect'
import Button from '@/components/Button'
import axios from 'axios'
import { Document } from '@/types-interfaces/types'
import { useRouter } from 'next/navigation'

interface Message {
  sender: 'user' | 'ai'
  text: string
  timestamp: string
}

const ChatPage = () => {
  useAuthRedirect()
  const router = useRouter()

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: "Hello! I'm your AI document assistant. Ask me anything about your uploaded documents and I'll help you find the information you need.",
      timestamp: '10:30 AM',
    },
  ])

  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [documents, setDocuments] = useState<Document[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    const userMsg: Message = { sender: 'user', text: query, timestamp }
    setMessages((prev) => [...prev, userMsg])
    setQuery('')
    setLoading(true)

    // Simulate AI response (replace with actual call later)
    setTimeout(() => {
      const aiMsg: Message = {
        sender: 'ai',
        text:
          'Based on your research paper, here are the key findings:\n- Deep learning improved accuracy by 15%\n- Ensemble methods reduced overfitting\n- Transfer learning accelerated training by 40%',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages((prev) => [...prev, aiMsg])
      setLoading(false)
    }, 1500)
  }

  useEffect(() => {
  const fetchDocuments = async () => {
    const token = localStorage.getItem('accessToken')
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/documents/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setDocuments(res.data) // set state with the documents
    } catch  {
      console.error('Failed to fetch documents')
    }
  }

  fetchDocuments()
}, [])


  return (
    <div className="min-h-[90vh] flex bg-gray-50 text-sm">
      {/* Left sidebar */}
      <aside className="w-[300px] border-r bg-white p-4 hidden md:block">
        <h2 className="text-lg font-semibold mb-4">Document Sources</h2>
        <ul className="space-y-2 mb-6">
            {documents.map((doc) => (
                <li key={doc.id} className="flex justify-between items-center px-3 py-2 rounded bg-gray-100">
                📄 {doc.title} <span className="text-xs text-gray-500">{(doc.file_size / 1024).toFixed(1)} KB</span>
                </li>
            ))}
        </ul>

        <Button label="+ Upload More" type="button" onClick={() => router.push('/documents')} className="w-full bg-indigo-600" />
      </aside>

      {/* Chat area */}
      <section className="flex-1 flex flex-col p-4 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold">AI Assistant</span>
            <span className="ml-2 text-green-500 text-xs bg-green-100 px-2 py-0.5 rounded-full">● Online</span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-6">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-lg shadow-sm ${msg.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
                <p className="whitespace-pre-line">{msg.text}</p>
                <span className="block text-xs text-right text-gray-400 mt-1">{msg.timestamp}</span>
              </div>
              {msg.sender === 'user' && (
                <Image
                  src="/avatar.png"
                  alt="User avatar"
                  width={32}
                  height={32}
                  className="ml-2 rounded-full hidden sm:block"
                />
              )}
            </div>
          ))}

          {loading && (
            <div className="text-sm text-gray-500 italic">AI is typing...</div>
          )}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="border-t pt-3 flex items-center gap-3">
          <textarea
            rows={1}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask me anything about your documents..."
            className="flex-1 resize-none border rounded p-3"
            onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSubmit(e)
                }
            }}
          />
          <button type="button" className="text-gray-500 hover:text-gray-700">
            <Paperclip className="w-5 h-5" />
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>

        <div className="flex justify-end mt-2 text-xs text-gray-400 gap-4">
          <button className="hover:underline">Clear Chat</button>
          <button className="hover:underline">Export</button>
        </div>
      </section>
    </div>
  )
}

export default ChatPage
