
'use client'

import UploadForm from '@/components/UploadForm'
import useAuthRedirect from '@/hooks/useAuthRedirect'

const DocumentsPage = () => {
  const checkingAuth = useAuthRedirect()

  if (checkingAuth) {
    return null // Or a spinner/loading placeholder
  }

  return (
    <div className="max-w-xl mx-auto mt-20">
      <h1 className="text-2xl font-semibold mb-6 text-center">Upload a Document</h1>
      <UploadForm />
    </div>
  )
}

export default DocumentsPage
