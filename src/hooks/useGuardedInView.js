import { useEffect, useState } from 'react'
import { useInView } from 'framer-motion'

export default function useGuardedInView(ref, options = {}) {
  const [canObserve, setCanObserve] = useState(false)
  const inView = useInView(ref, { once: true, margin: '-100px', ...options })

  useEffect(() => {
    if (window.scrollY > 10) {
      setCanObserve(true)
      return
    }
    const onFirstScroll = () => {
      window.removeEventListener('scroll', onFirstScroll)
      setCanObserve(true)
    }
    window.addEventListener('scroll', onFirstScroll, { passive: true })
    return () => window.removeEventListener('scroll', onFirstScroll)
  }, [])

  return canObserve && inView
}