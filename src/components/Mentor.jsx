import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import useCounter from '../hooks/useCounter'
import useIsMobile from '../hooks/useIsMobile'
import useGuardedInView from '../hooks/useGuardedInView'
import { motion, useScroll, useSpring, useTransform, useInView } from 'framer-motion'
import Reveal from './Reveal'


const achievements = [
  { num: '01', title: "National-Level Competition Wins", text: "Recognition across multiple technical and hackathon platforms at the national level." },
  { num: '02', title: "Microsoft Competition Winner", text: "Recognised for performance in a Microsoft-backed competition." },
  { num: '03', title: "AIR 3 at IIT Kharagpur", text: "Secured All India Rank 3 — national-level recognition among peers from across the country." },
  { num: '04', title: "Internship Offer from Europe", text: "Earned an international internship offer while still an undergraduate student." },
  { num: '05', title: "10+ Awards", text: "Across technical, entrepreneurial, and academic domains." },
  { num: '06', title: "50+ Certificates", text: "Earned across multiple domains spanning technology, business, and communication." },
  { num: '07', title: "Top Profile — University Recognition", text: "Held a top profile across the university for consistent, well-rounded achievement." },
  { num: '08', title: "Best Engineer Award", text: "Recognised as the Best Engineer for overall academic and extracurricular excellence." },
  { num: '09', title: "2 World Records", text: "Set two World Records — achieved before graduation." },
]

function BioBlock({ i, className, style, children }) {
  return (
    <Reveal as="p" delay={i * 0.15} className={className} style={style}>
      {children}
    </Reveal>
  )
}

function TimelineCard({ item, isVisible, isMobile }) {
  const [hov, setHov] = useState(false)
  return (
    <motion.div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(0,0,0,0.09)' }}
      style={{
        background: hov ? 'var(--white)' : 'var(--bg-panel)',
        borderRadius: 14,
        border: `1px solid ${hov ? 'var(--brass)' : 'var(--line)'}`,
        padding: isMobile ? '20px' : '26px 30px',
        maxWidth: isMobile ? '100%' : 380,
        width: isMobile ? '100%' : 'auto',
        cursor: 'default',
        transition: 'background 0.2s, border-color 0.2s',
      }}
    >
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        marginBottom: 10, background: 'rgba(162,117,44,0.1)',
        borderRadius: 6, padding: '4px 10px',
      }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--brass)', fontWeight: 700, letterSpacing: '0.06em' }}>
          STEP {item.num}
        </span>
      </div>
      <h3 style={{ fontFamily: 'var(--serif)', fontWeight: 700, fontSize: '1rem', color: 'var(--ink)', margin: '0 0 8px', letterSpacing: '-0.02em' }}>
        {item.title}
      </h3>
      <p style={{ fontFamily: 'var(--sans)', fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.65, margin: 0 }}>
        {item.text}
      </p>
    </motion.div>
  )
}

function TimelineRow({ item, i, isLeft }) {
  const rowRef = useRef(null)
  const isVisible = useInView(rowRef, { margin: '-45% 0px -45% 0px' })

  return (
    <div
      ref={rowRef}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 60px 1fr',
        gap: 0, alignItems: 'center',
        minHeight: 160,
      }}
    >
      <div style={{ padding: '24px 40px 24px 0', display: 'flex', justifyContent: 'flex-end' }}>
        {isLeft && (
          <motion.div
            initial={{ opacity: 0, x: -40, scale: 0.94 }}
            animate={isVisible ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -40, scale: 0.94 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <TimelineCard item={item} isVisible={isVisible} isMobile={false} />
          </motion.div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', zIndex: 2 }}>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
          style={{
            width: 44, height: 44, borderRadius: '50%',
            background: isVisible ? 'var(--brass)' : 'var(--bg)',
            border: `2px solid ${isVisible ? 'var(--brass)' : 'var(--line)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--mono)', fontSize: '0.65rem', fontWeight: 700,
            color: isVisible ? '#fff' : 'var(--text-muted)',
            letterSpacing: '0.04em',
            boxShadow: isVisible
              ? '0 0 0 6px var(--bg), 0 0 20px rgba(162,117,44,0.4)'
              : '0 0 0 6px var(--bg), 0 0 7px var(--line)',
            transition: 'all 0.4s ease',
          }}
        >
          {String(i + 1).padStart(2, '0')}
        </motion.div>
      </div>

      <div style={{ padding: '24px 0 24px 40px' }}>
        {!isLeft && (
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.94 }}
            animate={isVisible ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 40, scale: 0.94 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <TimelineCard item={item} isVisible={isVisible} isMobile={false} />
          </motion.div>
        )}
      </div>
    </div>
  )
}

function AchievementsTimeline() {
  const sectionRef = useRef(null)
  const isMobile = useIsMobile()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.8', 'end 0.4'],
  })
  const lineProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 25 })
  const lineHeightPct = useTransform(lineProgress, [0, 1], ['0%', '100%'])

  return (
    <section
      ref={sectionRef}
      id="achievements"
      className="section section-panel"
      style={{ overflow: 'hidden' }}
    >
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Achievements &amp; Journey</span>
          <h2>The Record, Milestone by Milestone</h2>
        </div>

        {isMobile ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {achievements.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <TimelineCard item={item} isVisible={true} isMobile={true} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute', left: '50%', top: 60, bottom: 60,
              transform: 'translateX(-50%)', width: 2,
              background: 'var(--line)', zIndex: 0,
            }} />
            <motion.div
              style={{
                position: 'absolute', left: '50%', top: 60,
                transform: 'translateX(-50%)', width: 2,
                height: lineHeightPct,
                background: 'linear-gradient(to bottom, var(--brass), var(--brass-light))',
                transformOrigin: 'top', zIndex: 1,
                boxShadow: '0 0 12px var(--brass)',
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {achievements.map((item, i) => (
                <TimelineRow key={i} item={item} i={i} isLeft={i % 2 === 0} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function MentorTreeVideo() {
  const wrapRef = useRef(null)
  const videoRef = useRef(null)
  const inView = useGuardedInView(wrapRef, { margin: '200px' })

  useEffect(() => {
    const vid = videoRef.current
    if (!vid) return
    if (inView) {
      vid.play().catch(() => {})
    } else {
      vid.pause()
    }
  }, [inView])

  return (
    <motion.div
      ref={wrapRef}
      initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, margin: '-100px' }}
      className="mentor-tree-wrap"
    >
      <video
        ref={videoRef}
        src="/Images/1785940441314070.mp4"
        className="mentor-tree-img"
        muted
        loop
        playsInline
        preload="none"
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          objectFit: 'cover'
        }}
      />
    </motion.div>
  )
}

export default function Mentor() {
  const [statRef, statValue] = useCounter(25000)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      {/* MENTOR HEADER */}
      <section className="mentor-header">
        <div className="bg-media">
          <img className="is-active" src="/Images/director.png" alt="Sumit Waghmare" />
        </div>
        <div className="bg-scrim"></div>
        <div className="mentor-header-content">
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="eyebrow hero-eyebrow"
          >
            About the Mentor
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          >
            Sumit Waghmare
          </motion.h1>
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            className="role"
          >
            Head of Team Sumit, India
          </motion.span>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
            className="hero-stat-callout"
          >
            Beloved tutor of <span ref={statRef} className="count">{statValue}</span> engineers across India.
          </motion.p>
        </div>
      </section>

      {/* FULL BIO */}
      <section className="section">
        <div className="wrap bio-grid">
          <div className="bio-block">
            <span className="eyebrow">Full Bio</span>
            <BioBlock i={0} className="lede" style={{ marginTop: 20 }}>
              Sumit is a perfect example of what's actually possible during your engineering years.
            </BioBlock>
            <BioBlock i={1}>
              While still a student, he competed at the national level, won recognition from Microsoft, secured AIR 3 at IIT Kharagpur, and earned an internship offer from Europe. He holds 10+ awards, 50+ certificates across domains, held a top profile across his university, received the Best Engineer Award, and set 2 World Records — all before graduation.
            </BioBlock>
            <BioBlock i={2} className="callout-line">
              "He doesn't just teach. He transforms. He doesn't hand you information — he creates opportunity. He's the one who takes students from the classroom to national and international stages."
            </BioBlock>
            <BioBlock i={3}>
              How you look on paper is how you cooked during your engineering years. This is his vision — the chance is yours to take. Or stay in the crowd of 25 lakh engineers graduating every year, indistinguishable from the rest.
            </BioBlock>
          </div>

          <MentorTreeVideo />
        </div>
      </section>

      {/* ACHIEVEMENTS TIMELINE */}
      <AchievementsTimeline />

      {/* CLOSING BAND */}
      <section className="closing-band section-img-bg">
        <div className="bg-media"><img src="https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=1800&q=75" alt="Laptop with code, symbolising ongoing growth" loading="lazy" /></div>
        <div className="bg-scrim"></div>
        <Reveal className="wrap">
          <p>All of this — before graduation. While still a student. While still figuring it out, just like you are.</p>
        </Reveal>
      </section>

      {/* PORTFOLIO + CTA */}
      <section className="mentor-cta">
        <Reveal className="wrap">
          <span className="eyebrow" style={{ justifyContent: 'center' }}>Next Step</span>
          <h2 style={{ marginTop: 16 }}>Ready to learn directly from this experience?</h2>
          <div className="hero-cta-row" style={{ justifyContent: 'center' }}>
            <a href="https://www.teamsumit.com" target="_blank" rel="noopener" className="btn btn-ghost">Visit Full Portfolio</a>
            <Link to="/#register" className="btn btn-primary">Register for the BootCamp</Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}