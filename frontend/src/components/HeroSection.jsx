import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import ParticleBackground from './ParticleBackground'
import NetworkGraph from './NetworkGraph'

const heroNodes = [
  { id: 'A', label: 'Alice', x: -0.6, y: 0.7 },
  { id: 'B', label: 'Bob', x: 0.7, y: 0.6 },
  { id: 'C', label: 'Carol', x: -0.5, y: -0.5 },
  { id: 'D', label: 'Dave', x: 0.6, y: -0.6 },
  { id: 'E', label: 'Eve', x: 0, y: 0.2 },
]

const messyEdges = [
  { from: 'A', to: 'B' }, { from: 'A', to: 'C' }, { from: 'B', to: 'D' },
  { from: 'C', to: 'E' }, { from: 'D', to: 'A' }, { from: 'E', to: 'B' },
  { from: 'C', to: 'D' }, { from: 'B', to: 'E' }, { from: 'A', to: 'E' },
  { from: 'D', to: 'C' },
]

const optimizedEdges = [
  { from: 'A', to: 'E' },
  { from: 'C', to: 'B' },
  { from: 'D', to: 'E' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
  }),
}

const words = ['Split Smarter.', 'Settle Faster.']

export default function HeroSection() {
  const [optimized, setOptimized] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => setOptimized((v) => !v), 3500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="hero" className="hero-section">
      <ParticleBackground count={60} />

      <div className="hero-content section-container">
        <div className="hero-text">
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="section-label"
          >
            Smart Expense Splitting
          </motion.div>

          <h1 className="hero-title">
            {words.map((word, i) => (
              <motion.span
                key={word}
                custom={i + 1}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                style={{ display: 'block' }}
              >
                <span className={i === 1 ? 'gradient-text' : ''}>{word}</span>
              </motion.span>
            ))}
          </h1>

          <motion.p
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="hero-subtitle"
          >
            FairSplit uses intelligent algorithms to minimize transactions,
            track repayment behavior, and give you insights into your shared spending.
          </motion.p>

          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="hero-buttons"
          >
            <button className="btn-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Google
            </button>
            <button className="btn-secondary">Try Demo</button>
          </motion.div>
        </div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="graph-container">
            <NetworkGraph
              nodes={heroNodes}
              edges={messyEdges}
              optimizedEdges={optimizedEdges}
              optimized={optimized}
              width={520}
              height={420}
            />
            <div className="graph-badge">
              {optimized ? '✓ 3 Optimized' : '10 Transactions'}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Gradient fade at bottom */}
      <div className="hero-fade" />

      <style>{`
        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding-top: 5rem;
          overflow: hidden;
        }
        .hero-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          position: relative;
          z-index: 2;
          width: 100%;
        }
        .hero-title {
          font-size: clamp(2.8rem, 6vw, 4.5rem);
          font-weight: 900;
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin-bottom: 1.5rem;
        }
        .hero-subtitle {
          font-size: 1.15rem;
          color: var(--text-secondary);
          line-height: 1.7;
          max-width: 480px;
          margin-bottom: 2.5rem;
        }
        .hero-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .hero-visual {
          display: flex;
          justify-content: center;
        }
        .graph-container {
          position: relative;
          background: rgba(10, 17, 40, 0.5);
          border: 1px solid var(--border-subtle);
          border-radius: 20px;
          padding: 0.5rem;
        }
        .graph-badge {
          position: absolute;
          bottom: 1rem;
          left: 50%;
          transform: translateX(-50%);
          padding: 0.5rem 1.25rem;
          border-radius: 999px;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          background: rgba(0, 232, 157, 0.1);
          border: 1px solid rgba(0, 232, 157, 0.2);
          color: var(--accent);
          transition: all 0.5s ease;
        }
        .hero-fade {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 120px;
          background: linear-gradient(to bottom, transparent, var(--bg-primary));
          z-index: 1;
        }
        @media (max-width: 968px) {
          .hero-content { grid-template-columns: 1fr; text-align: center; }
          .hero-subtitle { margin-left: auto; margin-right: auto; }
          .hero-buttons { justify-content: center; }
          .hero-visual { margin-top: 2rem; }
        }
      `}</style>
    </section>
  )
}
