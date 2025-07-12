'use client'
import ClientHeader from '@/components/ClientHeader'

export default function WithHeaderLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ClientHeader />
      <main>{children}</main>
    </>
  )
}
