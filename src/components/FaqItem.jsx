import { useState, useRef } from 'react'

export default function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  const innerRef = useRef(null)

  return (
    <div className={`faq-item ${open ? 'is-open' : ''}`}>
      <button className="faq-q" onClick={() => setOpen(!open)}>
        <span>{q}</span><span className="plus"></span>
      </button>
      <div className="faq-a" style={{ maxHeight: open ? innerRef.current?.scrollHeight + 'px' : '0' }}>
        <div className="faq-a-inner" ref={innerRef}>{a}</div>
      </div>
    </div>
  )
}