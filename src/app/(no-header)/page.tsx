'use client'

import { useRouter } from 'next/navigation'
import Button from '@/components/Button'
import Image from 'next/image'

export default function Home() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="bg-white py-6">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-2xl font-bold text-[dodgerblue">AI Knowledge Hub</h1>
          <nav className="hidden md:flex space-x-8">
            <button onClick={() => router.push('/')} className="text-[dodgerblue] hover:text-blue-600 cursor-pointer">Home</button>
            <button onClick={() => router.push('/register')} className="text-[dodgerblue] hover:text-blue-600 cursor-pointer">Register</button>
            <button onClick={() => router.push('/login')} className="text-[dodgerblue] hover:text-blue-600 cursor-pointer">Login</button>
            <button onClick={() => router.push('/search')} className="text-[dodgerblue] hover:text-blue-600 cursor-pointer">Search</button>
          </nav>
          <button className="bg-[dodgerblue] text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors">
            AI Hub
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-[#f5f8ff] py-16 md:py-28">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-12 px-6">
        {/* Left: Headline & Content */}
        <div className="flex-1 max-w-xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Your AI-Powered<br />
            <span className="text-blue-600">Document<br />Assistant</span>
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Upload, analyze, and query your documents with advanced AI. Get intelligent answers from your knowledge base with semantic search.
          </p>
          <div className="flex gap-4 mt-6">
            <Button
              label="Get Started"
              type="button"
              className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 text-base font-semibold rounded-md shadow transition"
              onClick={() => router.push('/register')}
            />

            <Button
              label="Learn More"
              type="button"
              className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 text-base font-semibold rounded-md shadow transition"
              onClick={() => router.push('/learn-more')}
            />
          </div>
        </div>
        
        {/* Right: Illustration */}
        <div className="flex-1 flex items-center justify-end">
          <div className="rounded-2xl shadow-xl overflow-hidden bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 p-2">
            <Image
              src="/right-image.png"
              alt="left icon"
              width={400}
              height={400}
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
        </div>
      </div>    
    </section>

    <div className=" container grid grid-cols-3 gap-8 max-w-10xl p-2 mx-auto">
      {/* Smart Upload */}
      <div className="bg-gray-50 rounded-xl shadow-md p-8 flex flex-col items-start hover:shadow-lg transition">
        <div className="text-blue-600 text-3xl mb-4">
          <svg>...</svg>
        </div>
        <h3 className="text-xl font-semibold mb-2">Smart Upload</h3>
        <p className="text-gray-600">
          Upload PDFs and text files with automatic processing and embedding generation for intelligent search.
        </p>
      </div>
      {/* Semantic Search */}
      <div className="bg-gray-50 rounded-xl shadow-md p-8 flex flex-col items-start hover:shadow-lg transition">
        <div className="text-blue-600 text-3xl mb-4">
          <svg>...</svg>
        </div>
        <h3 className="text-xl font-semibold mb-2">Semantic Search</h3>
        <p className="text-gray-600">
          Find relevant information using natural language queries with advanced vector search technology.
        </p>
      </div>
      {/* AI Answers */}
      <div className="bg-gray-50 rounded-xl shadow-md p-8 flex flex-col items-start hover:shadow-lg transition">
        <div className="text-blue-600 text-3xl mb-4">
          <svg>...</svg>
        </div>
        <h3 className="text-xl font-semibold mb-2">AI Answers</h3>
        <p className="text-gray-600">
          Get intelligent answers from your documents with source citations and relevant snippets.
        </p>
      </div>
    </div>

    <section className="bg-blue-600 py-20 flex items-center justify-center">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to Transform Your Document Workflow?
        </h2>
        <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
          Join thousands of users who are already using AI Knowledge Hub to unlock insights from their documents.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button
            className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-md shadow hover:bg-blue-50 transition"
            onClick={() => {/* handle free trial */}}
          >
            Start Free Trial
          </button>
          <button
            className="bg-transparent border border-white text-white font-semibold px-8 py-3 rounded-md hover:bg-white hover:text-blue-600 transition"
            onClick={() => {/* handle demo scheduling */}}
          >
            Schedule Demo
          </button>
        </div>
      </div>
    </section>
    <footer className="bg-black text-white p-8">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4">AI Knowledge Hub</h1>
        <p className="mb-8">Transform your documents into intelligent knowledge with AI-powered search and analysis.</p>
        
        <div className="grid grid-cols-3 gap-4 text-left mb-8">
          <div>
            <h2 className="font-bold mb-2">Features</h2>
            <p>Document Upload</p>
            <p>Semantic Search</p>
            <p>AI Answers</p>
          </div>
          <div>
            <h2 className="font-bold mb-2">Support</h2>
            <p>Help Center</p>
            <p>Contact Us</p>
            <p>Privacy Policy</p>
          </div>
          <div>
            <h2 className="font-bold mb-2">Connect</h2>
            {/* Social icons would go here */}
          </div>
        </div>
        
        <p className="text-sm text-gray-400">© 2024 AI Knowledge Hub. All rights reserved.</p>
      </div>
    </footer>
   </div>
  )
}