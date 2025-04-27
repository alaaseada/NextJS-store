'use client'

import { useEffect } from 'react'
import { redirect, useRouter } from 'next/navigation'

export default function ClearCartClientComponent() {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      redirect('/Orders')
    }, 5000)
  }, [router])

  return null
}
