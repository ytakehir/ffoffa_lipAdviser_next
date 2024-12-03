'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export const useLayout = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsClient(true)
  }, [])

  const pageJump = () => {
    if (isClient) {
      router.push('/', { scroll: true })
    }
  }

  useEffect(() => {
    if (isClient) {
      window.scrollTo(0, 0)

      const toggleVisibility = () => {
        // スクロール量が 300px を超えたら表示
        if (window.scrollY > 300) {
          setIsVisible(true)
        } else {
          setIsVisible(false)
        }
      }

      window.addEventListener('scroll', toggleVisibility)
      return () => window.removeEventListener('scroll', toggleVisibility)
    }
  }, [isClient])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return {
    isVisible,
    pageJump,
    scrollToTop,
  }
}
