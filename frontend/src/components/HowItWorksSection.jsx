import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    num: '01',
    title: 'Create a Group',
    desc: 'Invite friends, roommates, or travel buddies to a shared group in seconds.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="12" fill="rgba(0,232,157,0.1)" />
        <path d="M20 14V26M14 20H26" stroke="#00e89d" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Add Expenses',
    desc: 'Log shared bills — dinners, rent, trips. FairSplit handles the math.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="12" fill="rgba(124,58,237,0.1)" />
        <path d="M14 26L20 14L26 26" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 22H24" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Settle Smart',
    desc: 'The algorithm minimizes transactions. Pay once, settle everything.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="12" fill="rgba(59,130,246,0.1)" />
        <path d="M14 20L18 24L26 16" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

export default function HowItWorksSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.step-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          toggleActions: 'play none none none',
        },
        y: 70,
        opacity: 0,
        stagger: 0.2,
        duration: 0.9,
        ease: 'power3.out',
      })

      gsap.from('.step-connector', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          toggleActions: 'play none none none',
        },
        scaleX: 0,
        transformOrigin: 'left',
        stagger: 0.2,
        delay: 0.4,
        duration: 0.8,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="section" ref={sectionRef}>
      <div className="section-container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="section-label">How It Works</span>
          <h2 className="section-title">
            Three steps to <span className="gradient-text">fair splitting</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Getting started takes less than a minute.
          </p>
        </div>

        <div className="steps-grid">
          {steps.map((s, i) => (
            <div className="step-wrapper" key={s.num}>
              <div className="step-card glass">
                <span className="step-num">{s.num}</span>
                <div className="step-icon">{s.icon}</div>
                <h3 className="step-title">{s.title}</h3>
                <p className="step-desc">{s.desc}</p>
              </div>
              {i < steps.length - 1 && <div className="step-connector" />}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .steps-grid {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          gap: 0;
          max-width: 960px;
          margin: 0 auto;
        }
        .step-wrapper {
          display: flex;
          align-items: center;
          flex: 1;
        }
        .step-card {
          padding: 2rem;
          border-radius: 20px;
          text-align: center;
          flex: 1;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .step-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--glow-accent);
        }
        .step-num {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--accent);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          display: block;
          margin-bottom: 1rem;
        }
        .step-icon { margin-bottom: 1rem; display: flex; justify-content: center; }
        .step-title {
          font-size: 1.15rem;
          font-weight: 700;
          margin-bottom: 0.6rem;
        }
        .step-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }
        .step-connector {
          width: 48px;
          height: 2px;
          background: linear-gradient(to right, var(--accent), var(--accent-secondary));
          flex-shrink: 0;
          margin: 0 -0.5rem;
          border-radius: 1px;
        }
        @media (max-width: 768px) {
          .steps-grid { flex-direction: column; align-items: center; gap: 1.5rem; }
          .step-connector { width: 2px; height: 32px; margin: 0; }
          .step-wrapper { flex-direction: column; }
        }
      `}</style>
    </section>
  )
}
