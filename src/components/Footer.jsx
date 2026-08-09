import { Link } from 'react-router-dom'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer" id="contact">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="nav-logo">Team <span style={{ color: 'var(--brass-light)' }}>Sumit</span></Link>
            <p>Engineering Mastery BootCamp — a structured, mentor-led program in AI, automation, and career readiness.</p>
            <div className="footer-social">
              <a href="https://www.instagram.com/team_.sumit/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" /></svg></a>
              <a href="https://www.linkedin.com/in/sumit-ceo/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7 10v6M7 7v.01M12 16v-6M12 16v-3.5A2.5 2.5 0 0 1 14.5 10c1.5 0 2.5 1 2.5 2.5V16" /></svg></a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/#about">About</a></li>
              <li><a href="/#curriculum">Curriculum</a></li>
              <li><Link to="/mentor">Mentor</Link></li>
              <li><a href="/#register">Register</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:sumitwaghmare645@gmail.com">sumitwaghmare645@gmail.com</a></li>
              <li><a href="https://www.teamsumit.com" target="_blank" rel="noopener">www.teamsumit.com</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; {year} Team Sumit. All rights reserved.</span>
          <span>Engineering Mastery BootCamp</span>
        </div>
      </div>
    </footer>
  )
}