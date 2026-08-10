import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import useCounter from '../hooks/useCounter'
import useGuardedInView from '../hooks/useGuardedInView'
import useIsMobile from '../hooks/useIsMobile'
import FaqItem from './FaqItem'
import Marquee from './Marquee'
import RegisterForm from './RegisterForm'
import { motion } from 'framer-motion'
import { fadeUp } from '../utils/motion'
import Reveal from './Reveal'
import { Presentation , Building2 , Ticket , Code2 , Briefcase, GraduationCap } from 'lucide-react'

function useTypewriter(words) {
  const [text, setText] = useState('')
  useEffect(() => {
    let wi = 0, ci = 0, deleting = false, timeout
    const tick = () => {
      const word = words[wi]
      if (!deleting) {
        ci++
        setText(word.slice(0, ci))
        if (ci === word.length) { deleting = true; timeout = setTimeout(tick, 1600); return }
      } else {
        ci--
        setText(word.slice(0, ci))
        if (ci === 0) { deleting = false; wi = (wi + 1) % words.length }
      }
      timeout = setTimeout(tick, deleting ? 45 : 85)
    }
    timeout = setTimeout(tick, 700)
    return () => clearTimeout(timeout)
  }, [words])
  return text
}

function useHeroBgCrossfade(count) {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setActive(prev => (prev + 1) % count), 5500)
    return () => clearInterval(id)
  }, [count])
  return active
}

function RevealLi({ i, className, children }) {
  return (
    <Reveal as="li" delay={i * 0.08} className={className} margin="-80px" y={40}>
      {children}
    </Reveal>
  )
}

const STEP_BASE = 0.3
const STEP_UNIT = 0.55

function StepCard({ step, i, stepsInView }) {
  const Icon = step.icon
  // box i appears at slot 2*i in the alternating box/line sequence
  const baseDelay = STEP_BASE + i * STEP_UNIT * 2

  return (
    <div className="step-node">
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 20 }}
        animate={stepsInView ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: baseDelay, type: 'spring', stiffness: 120 }}
        className="step-icon-badge"
      >
        <Icon size={28} strokeWidth={1.8} />
        <span className="step-icon-num">{step.num}</span>
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 15 }}
        animate={stepsInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: baseDelay + 0.15 }}
      >
        {step.title}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={stepsInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: baseDelay + 0.3 }}
      >
        {step.desc}
      </motion.p>
    </div>
  )
}

const heroImages = [
  { src: '/Images/0f863e919dec4ff3a00cbdd8a6becae4.jpg', alt: 'Engineering students collaborating on a laptop' },
  { src: '/Images/IMG_3105.png', alt: 'Students working together at a study table' },
  { src: '/Images/Commissioner Police - Ngp.jpeg', alt: 'Close up of code on a laptop screen' },
  { src: '/Images/University VC -MH.jpeg', alt: 'Close up of code on a laptop screen' },
  { src: '/Images/Nitin Gadkari Sir.jpeg', alt: 'Close up of code on a laptop screen' },
]

const heroTypeWords = ["Industry-Ready.", "Career-Ready.", "Interview-Ready."]

const faqs = [
  { q: 'Who can join this bootcamp?', a: "Any engineering student, from any branch and any year, who wants a structured, mentor-led path to becoming industry- and career-ready. No prior AI or specialised technical background is required — the program is built to take you from wherever you currently are." },
  { q: 'Is this online or offline?', a: 'The bootcamp runs as a live, mentor-led program delivered Online, so students from any college or city can join the same structured batch without relocating.' },
  { q: 'Will I get a certificate?', a: 'Yes. Every student who completes the 100-day program, including the required project work, receives a certificate of completion from Team Sumit.' },
  { q: 'Do I need prior coding or AI experience?', a: "No. The program is designed to build you up from the fundamentals of AI tools and academic use, through to hands-on building and business applications — prior experience helps but isn't required to join." },
  { q: 'How is this different from free YouTube tutorials or other bootcamps?', a: "Free tutorials give you scattered information. This bootcamp gives you a structured, mentor-led system — built by someone who has personally been through national-level competitions, real industry exposure, and placement processes — with accountability, live feedback, and practice rounds you can't get from a video." },
  { q: 'Will this help with placements specifically?', a: 'Yes — the Career Development & Soft Skills module is built specifically around what placement processes actually test: your profile, your communication, your interview performance, and your ability to present real project work with confidence.' },
  { q: 'Will I get the full syllabus before joining?', a: 'Yes — the complete day-by-day syllabus is shared directly after registration, or on request, so you know exactly what each of the 100 days covers before your batch begins.' },
]

const steps = [
  { num: '01', icon: Presentation, title: 'Seminar & Application', desc: 'Attend the live orientation session and submit your initial form to register your interest.' },
  { num: '02', icon: Building2, title: 'College Approval', desc: 'Coordination with your Training & Placement Cell to formalize and greenlight the batch.' },
  { num: '03', icon: Ticket, title: 'Seat Confirmation', desc: 'Complete your registration and fee placement to lock in your slot for the upcoming cohort.' },
  { num: '04', icon: Code2, title: '100-Day Execution', desc: 'Engage in intensive live sessions, practical AI tools, and hands-on project build sprints.' },
  { num: '05', icon: Briefcase, title: 'Career & Placements', desc: 'Gain access to exclusive internship pipelines, industry projects, and hiring opportunities.' },
  { num: '06', icon: GraduationCap, title: 'Graduation & Certification', desc: 'Showcase your capstone projects, earn your certification, and stand out to employers.' },
]

export default function Home() {
  const typedWord = useTypewriter(heroTypeWords)
  const [statRef, statValue] = useCounter(25000)
  const [statRef2, statValue2] = useCounter(150000, '+')
  const activeHero = useHeroBgCrossfade(heroImages.length)
  const isMobile = useIsMobile()

  const enrollRef = useRef(null)
  const enrollInView = useGuardedInView(enrollRef)

  const curriculumVideoWrapRef = useRef(null)
  const curriculumVideoRef = useRef(null)
  // Smaller/no margin on mobile so the observer actually fires on short viewports
  const curriculumVideoInView = useGuardedInView(curriculumVideoWrapRef, {
    margin: isMobile ? '0px' : '200px',
  })

  useEffect(() => {
    const vid = curriculumVideoRef.current
    if (!vid) return
    if (curriculumVideoInView) {
      vid.play().catch(() => {})
    } else {
      vid.pause()
    }
  }, [curriculumVideoInView])

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg">
          {heroImages.map((img, i) => (
            <img
              key={i}
              className={i === activeHero ? 'is-active' : ''}
              src={img.src}
              alt={img.alt}
              loading={i === 0 ? 'eager' : 'lazy'}
              fetchpriority={i === 0 ? 'high' : 'auto'}
              decoding="async"
            />
          ))}
        </div>
        <div className="hero-scrim"></div>
        <div className="hero-content">
          <motion.span {...fadeUp(0.1)} className="eyebrow hero-eyebrow">A Program by Team Sumit</motion.span>
          <motion.h1 {...fadeUp(0.2)}>Engineering Mastery BootCamp Where Engineers Become <br />
            <span className="type-word">{typedWord}</span><span className="type-cursor">&nbsp;</span>
          </motion.h1>
          <motion.p {...fadeUp(0.3)} className="hero-sub">A hands-on program in AI, Automation, and Career Skills — built to close the gap between what engineering colleges teach and what the industry actually expects.</motion.p>
          <motion.div {...fadeUp(0.4)} className="hero-cta-row">
            <a href="#register" className="btn btn-primary">Register Now</a>
            <a href="#curriculum" className="btn btn-ghost-light">Download Brochure</a>
          </motion.div>
          <motion.p {...fadeUp(0.5)} className="hero-stat-callout">Beloved tutor of <span ref={statRef} className="count">{statValue}</span> engineers, transforming ambition into industry-ready execution.</motion.p>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section" id="about">
        <Reveal className="wrap">
          <div className="split">
            <div className="split-media">
              <img
                src="https://images.unsplash.com/photo-1779358296802-715fc9fbc152?q=80&w=1200&auto=format&fit=crop"
                alt="Group of engineering students studying together with laptops"
                loading="lazy"
                decoding="async"
              />
              <span className="frame-tag">TEAM SUMIT — COHORT SESSION</span>
            </div>
            <div className="split-body">
              <span className="eyebrow">About the Bootcamp</span>
              <h2>A structured system, not another self-paced course.</h2>
              <p>Engineering Mastery BootCamp is a structured, 100-day program designed to close the gap between what engineering colleges teach and what the real world — placements, national competitions, global opportunities — actually demands.</p>
              <p>It combines practical AI, automation, and business skills with the communication, interview, and career-readiness abilities that decide who gets picked and who gets left behind.</p>
              <dl className="about-who">
                <div>
                  <dt>Who It's For</dt>
                  <dd>Engineering students of any branch and any year who want a direct, structured, mentor-led path to becoming industry- and career-ready.</dd>
                </div>
                <div>
                  <dt>Format</dt>
                  <ul className="format-list">
                    <RevealLi i={0}>Structured 100-day cohort</RevealLi>
                    <RevealLi i={1}>Mentor-led, live sessions</RevealLi>
                    <RevealLi i={2}>Hands-on, project-based build sprints</RevealLi>
                    <RevealLi i={3}>Mock interviews and placement prep modules</RevealLi>
                  </ul>
                </div>
              </dl>
            </div>
          </div>
        </Reveal>
      </section>

      {/* CURRICULUM */}
      <section className="section section-panel" id="curriculum">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Your Journey</span>
            <h2>From Zero To One</h2>
          </div>

          <div className="curriculum-screen" ref={curriculumVideoWrapRef}>
            <div className="curriculum-screen-frame">
              <video
                ref={curriculumVideoRef}
                className="curriculum-video"
                src="/Images/curriculum.mp4"
                muted
                loop
                playsInline
                autoPlay
                preload="metadata"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          </div>

          <div className="curriculum-close">
            <p>100 Days. One structured system. From classroom thinking to industry-ready execution.</p>
            <span className="curriculum-note">Full day-by-day syllabus shared after registration</span>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <Marquee />

      {/* MENTOR PREVIEW */}
      <section className="section mentor-preview">
        <Reveal className="wrap">
          <div className="mentor-preview-grid">
            <div className="mentor-photo-wrap">
              <span className="mentor-badge">Head of Team Sumit</span>
              <img src="/Images/Director(mentor).png" alt="Mentor presenting to a room of engineering students" loading="lazy" decoding="async" />
            </div>
            <div className="mentor-preview-body">
              <span className="eyebrow">Your Mentor</span>
              <h2>Taught by someone who's actually done it.</h2>
              <p>Sumit Waghmare leads Team Sumit and personally built this bootcamp around what actually worked for him during his own engineering years — from national-level recognition to real industry exposure, all achieved before graduation. He doesn't just teach the curriculum. He built it from lived experience.</p>
              <Link to="/mentor" className="btn btn-ghost">Read More About Mentor</Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* HOW IT WORKS */}
      <section className="section section-tight" id="how-it-works">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Process</span>
            <h2>How To Enroll</h2>
          </div>
          <div className="steps-grid-wrap" ref={enrollRef}>
            {!isMobile && (
              <div className="steps-line-row">
                {[0, 1, 2, 3, 4].map((_, i) => (
                  <motion.div
                   key={i}
                   initial={{ scaleX: 0 }}
                   animate={enrollInView ? { scaleX: 1 } : {}}
                   transition={{
                    duration: STEP_UNIT,
                    delay: STEP_BASE + (i * 2 + 1) * STEP_UNIT,
                    ease: 'easeInOut',
                   }}
                   style={{ originX: 0 }}
                   className="steps-line-segment"
                  />
                ))}
            </div>
          )}
            <div className="steps">
              {steps.map((step, i) => (
                <StepCard key={i} step={step} i={i} stepsInView={enrollInView} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEES & REGISTRATION */}
      <section className="section section-panel" id="register">
        <Reveal className="wrap">
          <div className="section-head">
            <span className="eyebrow">Fees &amp; Registration</span>
            <h2>Secure Your Seat</h2>
            <p>Seats are limited to keep every batch mentor-led and personal — register your interest below.</p>
          </div>
          <div className="fees-grid">
            <div className="price-card">
              <span className="eyebrow">Program Fee</span>
              <h3>Engineering Mastery BootCamp</h3>
              <p className="price-note">Fee details shared on your confirmation call — pricing depends on the current batch and any active college partnership.</p>
              <ul>
                <RevealLi i={0}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>100-day structured, mentor-led program</RevealLi>
                <RevealLi i={1}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>6 modules across AI, automation &amp; career skills</RevealLi>
                <RevealLi i={2}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>Hands-on projects for your portfolio</RevealLi>
                <RevealLi i={3}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>Interview, GD &amp; presentation practice rounds</RevealLi>
                <RevealLi i={4}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>Certificate of completion</RevealLi>
              </ul>
              <p className="seats-note">LIMITED SEATS PER BATCH — REGISTER EARLY</p>
            </div>
            <RegisterForm />
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="section" id="faq">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">FAQ</span>
            <h2>Questions, Answered</h2>
          </div>
          <div className="faq-list">
            {faqs.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta section-img-bg">
        <div className="bg-media"><img src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=1800&q=75" alt="Engineering students working together in a workshop setting" loading="lazy" decoding="async" /></div>
        <div className="bg-scrim"></div>
        <div className="wrap final-cta-content">
          <span className="eyebrow" style={{ color: 'var(--brass-light)' }}>Team Sumit</span>
          <p className="hero-stat-callout">Transforming <span ref={statRef2} className="count">{statValue2}</span> engineers across India.</p>
          <h2>100 Days Can Change What Your Engineering Degree Alone Won't.</h2>
          <a href="#register" className="btn btn-primary">Register Now</a>
        </div>
      </section>
    </>
  )
}