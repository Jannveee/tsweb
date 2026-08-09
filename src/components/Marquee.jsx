import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const logos = ['canva','claude','claudecode','copilot','gemini','github','linkedin','lovable','notebooklm','notion','openai','perplexity','zapier']
const half = Math.ceil(logos.length / 2)
const topLogos = logos.slice(0, half)
const bottomLogos = logos.slice(half)

export default function Marquee() {
  const headRef = useRef(null)
  const headInView = useInView(headRef, { once: true, margin: '-100px' })

  return (
    <section className="marquee-section">
      <motion.div
        ref={headRef}
        initial={{ opacity: 0, y: 30 }}
        animate={headInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="wrap section-head"
      >
        <span className="eyebrow">Trusted Tools &amp; Tech Stack</span>
        <h2>The Tools You'll Actually Learn to Use</h2>
        <p>Hands-on training with the same AI and automation tools shaping the industry right now — not theory.</p>
      </motion.div>
      <div className="marquee-row">
        <div className="marquee-track">
          {[...topLogos, ...topLogos, ...topLogos, ...topLogos, ...topLogos, ...topLogos, ...topLogos, ...topLogos].map((logo, i) => (
            <span className="marquee-logo" key={i}>
              <img src={`/Images/logos/${logo}.png`} alt={logo} />
            </span>
          ))}
        </div>
      </div>
      <div className="marquee-row">
        <div className="marquee-track reverse">
          {[...bottomLogos, ...bottomLogos, ...bottomLogos, ...bottomLogos, ...bottomLogos, ...bottomLogos, ...bottomLogos, ...bottomLogos].map((logo, i) => (
            <span className="marquee-logo" key={`r-${i}`}>
              <img src={`/Images/logos/${logo}.png`} alt={logo} />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}