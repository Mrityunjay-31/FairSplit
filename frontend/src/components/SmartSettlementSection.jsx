import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import NetworkGraph from './NetworkGraph'

gsap.registerPlugin(ScrollTrigger)

const nodes = [
  { id: '1', label: 'A', x: -0.8, y: 0.8 },
  { id: '2', label: 'B', x: 0, y: 0.9 },
  { id: '3', label: 'C', x: 0.8, y: 0.7 },
  { id: '4', label: 'D', x: -0.7, y: 0 },
  { id: '5', label: 'E', x: 0.1, y: 0.05 },
  { id: '6', label: 'F', x: 0.75, y: -0.1 },
  { id: '7', label: 'G', x: -0.4, y: -0.8 },
  { id: '8', label: 'H', x: 0.5, y: -0.8 },
]

const allEdges = [
  { from: '1', to: '2' }, { from: '1', to: '4' }, { from: '2', to: '3' },
  { from: '2', to: '5' }, { from: '3', to: '6' }, { from: '4', to: '5' },
  { from: '4', to: '7' }, { from: '5', to: '6' }, { from: '5', to: '8' },
  { from: '6', to: '3' }, { from: '7', to: '8' }, { from: '8', to: '6' },
]

const optEdges = [
  { from: '1', to: '5' },
  { from: '7', to: '3' },
  { from: '4', to: '6' },
]

export default function SmartSettlementSection() {
  const sectionRef = useRef(null)
  const [optimized, setOptimized] = useState(false)
  const [count, setCount] = useState(12)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade-in text
      gsap.from('.settlement-text > *', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
        y: 50,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
      })

      // Trigger optimisation on scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 40%',
        onEnter: () => {
          setOptimized(true)
          gsap.to({ val: 12 }, {
            val: 3,
            duration: 1.5,
            ease: 'power2.out',
            onUpdate: function () {
              setCount(Math.round(this.targets()[0].val))
            },
          })
        },
        onLeaveBack: () => {
          setOptimized(false)
          setCount(12)
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="settlement" className="section" ref={sectionRef}>
      <div className="section-container settlement-layout">
        <div className="settlement-text">
          <span className="section-label">Smart Algorithm</span>
          <h2 className="section-title">
            Minimum Cash Flow <span className="gradient-text">Optimization</span>
          </h2>
          <p className="section-subtitle">
            FairSplit reduces the number of transactions required to settle all debts using a
            graph-based minimum cash flow algorithm — turning chaos into clarity.
          </p>

          <div className="settlement-counter">
            <div className="counter-box">
              <span className="counter-value">{count}</span>
              <span className="counter-label">Transactions</span>
            </div>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="counter-arrow">
              <path d="M8 16H24M24 16L18 10M24 16L18 22" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="counter-box counter-box-accent">
              <span className="counter-value">3</span>
              <span className="counter-label">Optimized</span>
            </div>
          </div>
        </div>

        <div className="settlement-visual">
          <NetworkGraph
            nodes={nodes}
            edges={allEdges}
            optimizedEdges={optEdges}
            optimized={optimized}
            width={550}
            height={450}
          />
        </div>
      </div>

      <style>{`
        .settlement-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        .settlement-counter {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-top: 2.5rem;
        }
        .counter-box {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 16px;
          padding: 1.25rem 2rem;
          text-align: center;
          min-width: 120px;
        }
        .counter-box-accent {
          border-color: rgba(0, 232, 157, 0.3);
          box-shadow: var(--glow-accent);
        }
        .counter-value {
          display: block;
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--accent);
          line-height: 1;
        }
        .counter-label {
          display: block;
          font-size: 0.8rem;
          color: var(--text-secondary);
          margin-top: 0.4rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .counter-arrow {
          flex-shrink: 0;
        }
        .settlement-visual {
          display: flex;
          justify-content: center;
        }
        @media (max-width: 968px) {
          .settlement-layout { grid-template-columns: 1fr; text-align: center; }
          .settlement-counter { justify-content: center; }
          .settlement-visual { margin-top: 2rem; }
        }
      `}</style>
    </section>
  )
}
