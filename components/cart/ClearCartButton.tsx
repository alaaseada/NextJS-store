'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ClearCartClientComponent() {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      router.push('/orders')
    }, 5000)
  }, [router])

  return null
}
