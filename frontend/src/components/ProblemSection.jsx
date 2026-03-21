import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const problems = [
  {
    icon: '🔄',
    title: 'Too Many Transactions',
    desc: 'Traditional apps create a payment for every single debt — resulting in a tangled web of transfers nobody wants to track.',
  },
  {
    icon: '⚠️',
    title: 'No Repayment Accountability',
    desc: 'There\u2019s no way to know who reliably pays back and who always "forgets." Trust is guesswork.',
  },
  {
    icon: '📊',
    title: 'No Spending Insights',
    desc: 'You split bills but never learn where your money actually goes — no category breakdowns, no trends.',
  },
]

export default function ProblemSection() {
  const sectionRef = useRef(null)
  const leftRef = useRef(null)
  const rightRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate problem cards
      gsap.from('.problem-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
      })

      // Animate comparison graphic
      gsap.from(leftRef.current, {
        scrollTrigger: {
          trigger: '.comparison-area',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        x: -80,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      })

      gsap.from(rightRef.current, {
        scrollTrigger: {
          trigger: '.comparison-area',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        x: 80,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="problem" className="section" ref={sectionRef}>
      <div className="section-container">
        <div className="problem-header">
          <span className="section-label">The Problem</span>
          <h2 className="section-title">
            Splitting expenses shouldn't be <span className="gradient-text">this painful</span>
          </h2>
          <p className="section-subtitle">
            Current apps create more confusion than clarity. Here's what's broken.
          </p>
        </div>

        <div className="problem-grid">
          {problems.map((p, i) => (
            <div className="problem-card glass" key={i}>
              <span className="problem-icon">{p.icon}</span>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="comparison-area">
          <div className="comparison-side" ref={leftRef}>
            <div className="comparison-label comparison-label-bad">Before: Traditional</div>
            <svg viewBox="0 0 250 200" className="comparison-svg">
              {/* Messy graph */}
              {[
                [40, 40], [200, 30], [120, 100], [50, 170], [210, 160], [130, 50]
              ].map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r="14" fill="#7c3aed" opacity="0.7" />
              ))}
              {[
                [40,40,200,30], [40,40,120,100], [200,30,120,100],
                [120,100,50,170], [120,100,210,160], [50,170,210,160],
                [40,40,50,170], [200,30,210,160], [130,50,50,170],
                [130,50,210,160], [40,40,210,160],
              ].map(([x1,y1,x2,y2], i) => (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#ef4444" strokeWidth="1.5" opacity="0.5" />
              ))}
            </svg>
          </div>

          <div className="comparison-arrow">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path d="M12 24H36M36 24L26 14M36 24L26 34" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div className="comparison-side" ref={rightRef}>
            <div className="comparison-label comparison-label-good">After: FairSplit</div>
            <svg viewBox="0 0 250 200" className="comparison-svg">
              {[
                [40, 40], [200, 30], [120, 100], [50, 170], [210, 160], [130, 50]
              ].map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r="14" fill="#00e89d" opacity="0.8" />
              ))}
              {[
                [40,40,120,100], [120,100,210,160], [130,50,50,170],
              ].map(([x1,y1,x2,y2], i) => (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#00e89d" strokeWidth="2.5" opacity="0.7" />
              ))}
            </svg>
          </div>
        </div>
      </div>

      <style>{`
        .problem-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        .problem-header .section-subtitle {
          margin: 0 auto;
        }
        .problem-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-bottom: 5rem;
        }
        .problem-card {
          padding: 2rem;
          border-radius: 16px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .problem-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--glow-purple);
        }
        .problem-icon {
          font-size: 2rem;
          display: block;
          margin-bottom: 1rem;
        }
        .problem-card h3 {
          font-size: 1.15rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
        }
        .problem-card p {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.6;
        }
        .comparison-area {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2rem;
        }
        .comparison-side {
          flex: 1;
          max-width: 320px;
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 16px;
          padding: 1.5rem;
        }
        .comparison-svg { width: 100%; height: auto; }
        .comparison-label {
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 1rem;
          padding: 0.25rem 0.75rem;
          border-radius: 999px;
          display: inline-block;
        }
        .comparison-label-bad {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        }
        .comparison-label-good {
          background: rgba(0, 232, 157, 0.1);
          color: var(--accent);
        }
        .comparison-arrow {
          flex-shrink: 0;
        }
        @media (max-width: 768px) {
          .comparison-area { flex-direction: column; }
          .comparison-arrow { transform: rotate(90deg); }
        }
      `}</style>
    </section>
  )
}
