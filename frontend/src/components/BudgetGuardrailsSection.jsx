import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, useInView } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

export default function BudgetGuardrailsSection() {
  const sectionRef = useRef(null)
  const gaugeRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Gauge needle animation
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 60%',
        onEnter: () => {
          gsap.to('.gauge-needle', {
            rotation: 108, // 60% of 180deg
            duration: 1.5,
            ease: 'elastic.out(1, 0.6)',
            transformOrigin: '50% 100%',
          })
          setTimeout(() => setShowToast(true), 1200)
        },
      })

      gsap.from('.guardrails-text > *', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="section" ref={sectionRef}>
      <div className="section-container guardrails-layout">
        <div className="guardrails-visual">
          <div className="gauge-wrapper glass" ref={gaugeRef}>
            <svg viewBox="0 0 200 120" className="gauge-svg">
              {/* Background arc */}
              <path
                d="M 20 110 A 80 80 0 0 1 180 110"
                fill="none"
                stroke="rgba(148,163,184,0.1)"
                strokeWidth="14"
                strokeLinecap="round"
              />
              {/* Green zone */}
              <path
                d="M 20 110 A 80 80 0 0 1 100 30"
                fill="none"
                stroke="#00e89d"
                strokeWidth="14"
                strokeLinecap="round"
                opacity="0.3"
              />
              {/* Yellow zone */}
              <path
                d="M 100 30 A 80 80 0 0 1 155 55"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="14"
                strokeLinecap="round"
                opacity="0.3"
              />
              {/* Red zone */}
              <path
                d="M 155 55 A 80 80 0 0 1 180 110"
                fill="none"
                stroke="#ef4444"
                strokeWidth="14"
                strokeLinecap="round"
                opacity="0.3"
              />
              {/* Needle */}
              <line
                className="gauge-needle"
                x1="100"
                y1="110"
                x2="100"
                y2="40"
                stroke="var(--text-primary)"
                strokeWidth="3"
                strokeLinecap="round"
                style={{ transform: 'rotate(0deg)', transformOrigin: '100px 110px' }}
              />
              {/* Center dot */}
              <circle cx="100" cy="110" r="6" fill="var(--accent)" />
            </svg>

            <div className="gauge-labels">
              <span>Safe</span>
              <span>Over</span>
            </div>
          </div>

          {/* Warning toast */}
          <motion.div
            className="budget-toast"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={showToast ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="toast-icon">⚠️</span>
            <div>
              <strong>Budget Alert</strong>
              <p>This expense may exceed your social spending budget.</p>
            </div>
          </motion.div>
        </div>

        <div className="guardrails-text">
          <span className="section-label">Budget Guardrails</span>
          <h2 className="section-title">
            Stay within <span className="gradient-text">your limits</span>
          </h2>
          <p className="section-subtitle">
            FairSplit warns you before you overspend. Set monthly budgets by category and get
            real-time alerts when a new expense pushes you past your comfort zone.
          </p>
          <div className="guardrails-features">
            <div className="guardrail-feat">
              <span className="feat-dot" style={{ background: '#00e89d' }} />
              Category-level budgets
            </div>
            <div className="guardrail-feat">
              <span className="feat-dot" style={{ background: '#7c3aed' }} />
              Real-time spending alerts
            </div>
            <div className="guardrail-feat">
              <span className="feat-dot" style={{ background: '#3b82f6' }} />
              Weekly spending summaries
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .guardrails-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        .guardrails-visual {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }
        .gauge-wrapper {
          padding: 2rem;
          border-radius: 20px;
          width: 100%;
          max-width: 360px;
        }
        .gauge-svg { width: 100%; height: auto; }
        .gauge-labels {
          display: flex;
          justify-content: space-between;
          padding: 0 0.5rem;
          margin-top: 0.5rem;
          font-size: 0.75rem;
          color: var(--text-secondary);
        }
        .budget-toast {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 1rem 1.5rem;
          background: rgba(245, 158, 11, 0.08);
          border: 1px solid rgba(245, 158, 11, 0.2);
          border-radius: 14px;
          max-width: 360px;
        }
        .toast-icon { font-size: 1.3rem; flex-shrink: 0; margin-top: 2px; }
        .budget-toast strong {
          font-size: 0.9rem;
          display: block;
          margin-bottom: 0.2rem;
          color: #f59e0b;
        }
        .budget-toast p {
          font-size: 0.825rem;
          color: var(--text-secondary);
          margin: 0;
        }
        .guardrails-features {
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
          margin-top: 2rem;
        }
        .guardrail-feat {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.95rem;
          color: var(--text-secondary);
        }
        .feat-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        @media (max-width: 968px) {
          .guardrails-layout { grid-template-columns: 1fr; text-align: center; }
          .guardrails-visual { order: -1; }
          .guardrails-features { align-items: center; }
        }
      `}</style>
    </section>
  )
}
