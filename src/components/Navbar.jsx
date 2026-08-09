import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setOpen(false)

  return (
    <header className={`navbar ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="navbar-inner">
        <Link to="/" className="nav-logo">
          <img
            src={scrolled ? '/Images/team sumit logo (wo bg).png' : '/Images/white ts logo(wo bg).png'}
            alt="Team Sumit logo"
            className="nav-logo-mark"
          />
        </Link>
        <nav className={`nav-links ${open ? 'is-open' : ''}`}>
          <a href="/#about" onClick={close}>About</a>
          <a href="/#curriculum" onClick={close}>Curriculum</a>
          <Link to="/mentor" onClick={close}>Mentor</Link>
          <a href="/#register" onClick={close}>Register</a>
          <a href="/#contact" onClick={close}>Contact</a>
          <a href="/#register" className="btn btn-primary nav-cta" onClick={close}>Register Now</a>
        </nav>
        <button className="nav-toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  )
}