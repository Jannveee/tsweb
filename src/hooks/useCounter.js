import { useEffect, useRef, useState } from 'react'

export default function useCounter(target, suffix = '') {
  const ref = useRef(null)
  const [value, setValue] = useState('0' + suffix)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const duration = 2000
        const start = performance.now()
        const frame = (now) => {
          const progress = Math.min((now - start) / duration, 1)
          const eased = progress * (2 - progress)
          setValue(Math.round(target * eased).toLocaleString('en-IN') + suffix)
          if (progress < 1) requestAnimationFrame(frame)
          else setValue(target.toLocaleString('en-IN') + suffix)
        }
        requestAnimationFrame(frame)
        observer.unobserve(el)
      }
    }, { threshold: 0.4 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, suffix])

  return [ref, value]
}