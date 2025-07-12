'use client'


export default function NoHeaderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>  // ✅ Return only fragment or wrapper div
}
