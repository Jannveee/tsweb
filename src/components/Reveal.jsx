import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Reveal({ children, className, style, delay = 0, as = 'div', margin = '-100px', y = 30 }) {
  const ref = useRef(null)
  const [canObserve, setCanObserve] = useState(false)
  const inView = useInView(ref, { once: true, margin })

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

  const Tag = motion[as]

  return (
    <Tag
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={canObserve && inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
      style={style}
    >
      {children}
    </Tag>
  )
}