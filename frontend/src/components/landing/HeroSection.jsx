import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import splitCreditLogo from '../../assets/logo.png'
 
/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const transactions = [
  { id: 1, from: 'Alice',  to: 'Bob',   amount: '₹1,200', label: 'Dinner',       icon: '🍽️',  color: '#C9974A' },
  { id: 2, from: 'Carol',  to: 'Dave',  amount: '₹850',   label: 'Hotel split',  icon: '🏨',  color: '#4AC9A0' },
  { id: 3, from: 'Eve',    to: 'Alice', amount: '₹340',   label: 'Cab fare',     icon: '🚕',  color: '#4A8BC9' },
  { id: 4, from: 'Bob',    to: 'Carol', amount: '₹2,100', label: 'Airfare',      icon: '✈️',  color: '#C94A6E' },
]
 
const stats = [
  { value: 73, suffix: '%', label: 'Fewer transactions' },
  { value: 50,  suffix: 'K+', label: 'Groups settled' },
  { value: 4.9, suffix: '★', label: 'User rating', isDecimal: true },
]
 
/* ─────────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────────── */
function Counter({ to, suffix, isDecimal }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
 
  useEffect(() => {
    if (!inView) return
    const duration = 1800
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(isDecimal ? +(eased * to).toFixed(1) : Math.floor(eased * to))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, to, isDecimal])
 
  return (
    <span ref={ref} className="stat-number">
      {count}{suffix}
    </span>
  )
}
 
/* ─────────────────────────────────────────────
   FLOATING TRANSACTION CARD
───────────────────────────────────────────── */
function TxCard({ tx, index, scrollY }) {
  const yOffset = useTransform(scrollY, [0, 600], [0, (index % 2 === 0 ? -1 : 1) * (30 + index * 12)])
  const rotate  = useTransform(scrollY, [0, 600], [index * 3 - 4, index * 5 - 8])
  const opacity = useTransform(scrollY, [0, 400], [1, 0.4])
 
  return (
    <motion.div
      className="tx-card"
      style={{ y: yOffset, rotate, opacity }}
      initial={{ opacity: 0, y: 40, rotate: index * 3 - 4 }}
      animate={{ opacity: 1, y: 0, rotate: index * 3 - 4 }}
      transition={{ duration: 0.9, delay: 0.4 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.04, rotate: 0, transition: { duration: 0.25 } }}
    >
      <div className="tx-icon" style={{ background: tx.color + '22', border: `1px solid ${tx.color}44` }}>
        {tx.icon}
      </div>
      <div className="tx-info">
        <span className="tx-label">{tx.label}</span>
        <span className="tx-route">{tx.from} → {tx.to}</span>
      </div>
      <span className="tx-amount" style={{ color: tx.color }}>{tx.amount}</span>
    </motion.div>
  )
}
 
/* ─────────────────────────────────────────────
   3D VAULT VISUAL
───────────────────────────────────────────── */
function VaultVisual({ scrollY }) {
  const rotateX = useTransform(scrollY, [0, 700], [8, -12])
  const rotateY = useTransform(scrollY, [0, 700], [-6, 14])
  const scale   = useTransform(scrollY, [0, 500], [1, 0.88])
 
  const springX = useSpring(rotateX, { stiffness: 60, damping: 20 })
  const springY = useSpring(rotateY, { stiffness: 60, damping: 20 })
 
  const [optimized, setOptimized] = useState(false)
  useEffect(() => {
    const id = setInterval(() => setOptimized(v => !v), 3200)
    return () => clearInterval(id)
  }, [])
 
  return (
    <motion.div className="vault-perspective" style={{ scale }}>
      <motion.div
        className="vault-card"
        style={{ rotateX: springX, rotateY: springY }}
      >
        {/* Header bar */}
        <div className="vault-header">
          <div className="vault-logo-mark">
            <img src={splitCreditLogo} alt="SplitCredit" className="vault-logo-img" />
          </div>
          <span className="vault-title">Settlement<br/>Engine</span>
          <div className={`vault-status ${optimized ? 'optimized' : 'raw'}`}>
            {optimized ? '✓ Optimized' : '● Processing'}
          </div>
        </div>
 
        {/* Main metric */}
        <div className="vault-metric">
          <div className="metric-row">
            <span className="metric-label">Transactions Required</span>
          </div>
          <div className="metric-display">
            <motion.span
              key={optimized ? 'opt' : 'raw'}
              className="metric-value"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              style={{ color: optimized ? '#4AC9A0' : '#C9974A' }}
            >
              {optimized ? '3' : '10'}
            </motion.span>
            <span className="metric-sub">of 5 members</span>
          </div>
          <div className="metric-bar-track">
            <motion.div
              className="metric-bar-fill"
              animate={{ width: optimized ? '30%' : '100%' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{ background: optimized ? '#4AC9A0' : '#C9974A' }}
            />
          </div>
        </div>
 
        {/* Node graph simplified */}
        <div className="vault-nodes">
          {['Alice','Bob','Carol','Dave','Eve'].map((name, i) => (
            <div key={name} className="vault-node-item">
              <div className="node-dot" style={{
                background: optimized
                  ? (i < 3 ? '#4AC9A0' : '#1a2235')
                  : '#C9974A',
                boxShadow: optimized && i < 3
                  ? '0 0 12px rgba(74,201,160,0.6)'
                  : 'none'
              }} />
              <span className="node-name">{name}</span>
            </div>
          ))}
        </div>
 
        {/* Trust scores */}
        <div className="vault-trust">
          <span className="trust-label">Friend Trust Scores</span>
          <div className="trust-bars">
            {[
              { name: 'Bob',   score: 92, color: '#4AC9A0' },
              { name: 'Carol', score: 74, color: '#C9974A' },
              { name: 'Dave',  score: 61, color: '#4A8BC9' },
            ].map(({ name, score, color }) => (
              <div key={name} className="trust-row">
                <span className="trust-name">{name}</span>
                <div className="trust-track">
                  <motion.div
                    className="trust-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${score}%` }}
                    transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    style={{ background: color }}
                  />
                </div>
                <span className="trust-score" style={{ color }}>{score}</span>
              </div>
            ))}
          </div>
        </div>
 
        {/* Bottom row */}
        <div className="vault-footer">
          <span className="vault-algo">Greedy Min-Cash-Flow  •  O(n log n)</span>
          <span className="vault-savings" style={{ color: '#4AC9A0' }}>
            {optimized ? '70% fewer payments' : 'Calculating...'}
          </span>
        </div>
 
        {/* 3D shine overlay */}
        <div className="vault-shine" />
        <div className="vault-grid-overlay" />
      </motion.div>
    </motion.div>
  )
}
 
/* ─────────────────────────────────────────────
   MAIN HERO
───────────────────────────────────────────── */
export default function HeroSection() {
  const containerRef = useRef(null)
  const { scrollY } = useScroll()
 
  const heroY   = useTransform(scrollY, [0, 600], [0, -80])
  const heroOp  = useTransform(scrollY, [0, 500], [1, 0])
  const bgScale = useTransform(scrollY, [0, 600], [1, 1.08])
 
  return (
    <section ref={containerRef} id="hero" className="hero-root">
 
      {/* ── Animated background grid ── */}
      <motion.div className="bg-grid" style={{ scale: bgScale }} />
      <div className="bg-radial" />
      <div className="bg-radial-2" />
 
      {/* ── Floating ticker tape ── */}
      <div className="ticker-wrap" aria-hidden="true">
        <div className="ticker-inner">
          {[...Array(3)].flatMap(() => [
            'SPLITCREDIT', '₹2,340 SETTLED', 'TRUST SCORE: 94', 'GROUPS: 12',
            '70% FEWER TXN', 'MIN CASH FLOW', '₹18,500 CLEARED', 'ALGO: GREEDY',
          ]).map((t, i) => (
            <span key={i} className="ticker-item">{t}</span>
          ))}
        </div>
      </div>
 
      {/* ── Main content ── */}
      <motion.div className="hero-inner" style={{ y: heroY, opacity: heroOp }}>
 
        <div className="hero-left">
          {/* Tag */}
          <motion.div
            className="hero-tag"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="tag-dot" />
            Finance Project · Smart Splitting
          </motion.div>
 
          {/* Headline */}
          <h1 className="hero-headline">
            {['Less', 'Debt.', 'More', 'Trust.'].map((word, i) => (
              <motion.span
                key={word}
                className={`headline-word ${i % 2 === 1 ? 'gold' : ''}`}
                initial={{ opacity: 0, y: 60, skewY: 4 }}
                animate={{ opacity: 1, y: 0, skewY: 0 }}
                transition={{ duration: 0.9, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                {word}{i === 1 || i === 3 ? <br /> : ' '}
              </motion.span>
            ))}
          </h1>
 
          <motion.p
            className="hero-body"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            SplitCredit's graph-based settlement engine eliminates redundant
            transactions. See who owes what, build trust scores, and settle
            with your group in the fewest payments possible.
          </motion.p>
 
          {/* CTA */}
          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <button className="cta-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57C23.36 18.34 24 15.4 24 12.25z" opacity=".9"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" opacity=".8"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" opacity=".7"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" opacity=".85"/>
              </svg>
              Sign in with Google
            </button>
            <button className="cta-ghost">Live Demo →</button>
          </motion.div>
 
          {/* Stats */}
          <motion.div
            className="stats-row"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            {stats.map(({ value, suffix, label, isDecimal }) => (
              <div key={label} className="stat-item">
                <Counter to={value} suffix={suffix} isDecimal={isDecimal} />
                <span className="stat-label">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
 
        {/* ── Right: 3D card + floating transactions ── */}
        <div className="hero-right">
          <VaultVisual scrollY={scrollY} />
          <div className="tx-stack">
            {transactions.map((tx, i) => (
              <TxCard key={tx.id} tx={tx} index={i} scrollY={scrollY} />
            ))}
          </div>
        </div>
      </motion.div>
 
 
      {/* Bottom fade */}
      <div className="hero-floor-fade" />

      <style>{`
        .hero-root {
          position: relative;
          min-height: 100vh;
          background: var(--bg-primary);
          color: var(--text-primary);
          font-family: var(--font-body);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: stretch;
        }
 
        .bg-grid {
          position: absolute;
          inset: -20%;
          background-image:
            linear-gradient(rgba(201,151,74,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,151,74,0.06) 1px, transparent 1px);
          background-size: 48px 48px;
          transform-origin: center;
          pointer-events: none;
        }
        .bg-radial {
          position: absolute;
          top: -20%; left: -10%;
          width: 70%; height: 80%;
          background: radial-gradient(ellipse, rgba(201,151,74,0.08) 0%, transparent 65%);
          pointer-events: none;
        }
        .bg-radial-2 {
          position: absolute;
          bottom: -10%; right: -5%;
          width: 55%; height: 70%;
          background: radial-gradient(ellipse, rgba(74,139,201,0.07) 0%, transparent 65%);
          pointer-events: none;
        }
 
        .ticker-wrap {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 32px;
          background: rgba(201,151,74,0.08);
          border-bottom: 1px solid rgba(201,151,74,0.15);
          overflow: hidden;
          z-index: 10;
          display: flex;
          align-items: center;
        }
        .ticker-inner {
          display: flex;
          animation: ticker-scroll 28s linear infinite;
          white-space: nowrap;
        }
        .ticker-item {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem;
          font-weight: 600;
          color: rgba(201,151,74,0.7);
          letter-spacing: 0.12em;
          padding: 0 2.5rem;
        }
        .ticker-item::after {
          content: '◆';
          margin-left: 2.5rem;
          opacity: 0.4;
        }
        @keyframes ticker-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
 
        .hero-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
          width: 100%;
          max-width: 1300px;
          margin: 0 auto;
          padding: 8rem 2.5rem 5rem;
          position: relative;
          z-index: 5;
        }
 
        .hero-left { display: flex; flex-direction: column; }
 
        .hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.72rem;
          color: rgba(201,151,74,0.8);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 1.4rem;
        }
        .tag-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #C9974A;
          box-shadow: 0 0 8px rgba(201,151,74,0.8);
          animation: pulse-dot 2s ease-in-out infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(1.4); }
        }
 
        .hero-headline {
          font-family: var(--font-heading);
          font-size: clamp(4rem, 7.5vw, 7rem);
          line-height: 0.95;
          letter-spacing: 0.01em;
          color: #E8E6E1;
          margin: 0 0 1.8rem;
        }
        .headline-word { display: inline; }
        .headline-word.gold { color: #C9974A; }
 
        .hero-body {
          font-size: 1.05rem;
          line-height: 1.75;
          color: rgba(232,230,225,0.55);
          max-width: 440px;
          margin: 0 0 2.2rem;
          font-weight: 300;
        }
 
        .hero-cta { display: flex; gap: 0.85rem; flex-wrap: wrap; margin-bottom: 2.8rem; }
 
        .cta-primary {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: #C9974A;
          color: #060810;
          border: none;
          padding: 0.85rem 1.8rem;
          border-radius: 4px;
          font-family: var(--font-body);
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .cta-primary:hover {
          background: #E0AA5A;
          transform: translateY(-1px);
          box-shadow: 0 8px 32px rgba(201,151,74,0.35);
        }
        .cta-ghost {
          background: transparent;
          color: rgba(232,230,225,0.7);
          border: 1px solid rgba(232,230,225,0.15);
          padding: 0.85rem 1.6rem;
          border-radius: 4px;
          font-family: var(--font-body);
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .cta-ghost:hover {
          border-color: rgba(201,151,74,0.5);
          color: #C9974A;
          background: rgba(201,151,74,0.04);
        }
 
        .stats-row {
          display: flex;
          gap: 2.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(232,230,225,0.07);
        }
        .stat-item { display: flex; flex-direction: column; gap: 0.2rem; }
        .stat-number {
          font-family: var(--font-heading);
          font-size: 2.2rem;
          color: #C9974A;
          letter-spacing: 0.02em;
          line-height: 1;
        }
        .stat-label {
          font-size: 0.72rem;
          color: rgba(232,230,225,0.4);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-family: 'JetBrains Mono', monospace;
        }
 
        .hero-right {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 520px;
        }
 
        .vault-perspective { perspective: 1000px; transform-style: preserve-3d; }
        .vault-card {
          width: 340px;
          background: linear-gradient(145deg, #0E1525 0%, #0A0F1E 60%, #06090F 100%);
          border: 1px solid rgba(201,151,74,0.2);
          border-radius: 16px;
          padding: 1.25rem 1.0rem;
          transform-style: preserve-3d;
          box-shadow:
            0 40px 80px rgba(0,0,0,0.6),
            0 0 0 1px rgba(201,151,74,0.08),
            inset 0 1px 0 rgba(201,151,74,0.12);
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .vault-grid-overlay {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(201,151,74,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,151,74,0.03) 1px, transparent 1px);
          background-size: 24px 24px;
          border-radius: 16px;
          pointer-events: none;
        }
        .vault-shine {
          position: absolute; inset: 0;
          background: linear-gradient(135deg,
            rgba(201,151,74,0.07) 0%, transparent 40%,
            transparent 60%, rgba(74,139,201,0.04) 100%);
          border-radius: 16px;
          pointer-events: none;
        }
 
        .vault-header {
          display: flex; align-items: center; gap: 0.25rem;
          margin-bottom: 1.4rem; position: relative; z-index: 1;
        }
        .vault-logo-mark {
          width: 70px; height: 40px;
          background: transparent; border-radius: 6px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          margin-right: 120px;
          margin-left: -60px;
        }
        .vault-logo-img {
          width: 100%; height: 100%;
          object-fit: contain;
          transform: scale(3.5);
          transform-origin: left center;
        }
        .vault-title {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.6rem; color: rgba(232,230,225,0.5);
          letter-spacing: 0.04em; flex: 1; text-transform: uppercase;
          line-height: 1.2;
          text-align: center;
        }
        .vault-status {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem; padding: 0.22rem 0.65rem;
          border-radius: 999px; font-weight: 600;
          letter-spacing: 0.05em; transition: all 0.4s ease;
          flex-shrink: 0;
        }
        .vault-status.optimized {
          background: rgba(74,201,160,0.12);
          border: 1px solid rgba(74,201,160,0.3); color: #4AC9A0;
        }
        .vault-status.raw {
          background: rgba(201,151,74,0.12);
          border: 1px solid rgba(201,151,74,0.3); color: #C9974A;
        }
 
        .vault-metric {
          background: rgba(0,0,0,0.3);
          border: 1px solid rgba(232,230,225,0.06);
          border-radius: 10px; padding: 1rem 1.1rem;
          margin-bottom: 1.1rem; position: relative; z-index: 1;
        }
        .metric-row { margin-bottom: 0.4rem; }
        .metric-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.62rem; color: rgba(232,230,225,0.35);
          text-transform: uppercase; letter-spacing: 0.08em;
        }
        .metric-display {
          display: flex; align-items: baseline;
          gap: 0.5rem; margin-bottom: 0.8rem;
        }
        .metric-value {
          font-family: var(--font-heading);
          font-size: 3.2rem; line-height: 1; transition: color 0.4s ease;
        }
        .metric-sub { font-size: 0.75rem; color: rgba(232,230,225,0.3); font-weight: 300; }
        .metric-bar-track {
          height: 3px; background: rgba(232,230,225,0.07);
          border-radius: 2px; overflow: hidden;
        }
        .metric-bar-fill { height: 100%; border-radius: 2px; transition: background 0.5s ease; }
 
        .vault-nodes {
          display: flex; justify-content: space-between;
          padding: 0.75rem 0;
          border-bottom: 1px solid rgba(232,230,225,0.06);
          margin-bottom: 1rem; position: relative; z-index: 1;
        }
        .vault-node-item { display: flex; flex-direction: column; align-items: center; gap: 0.35rem; }
        .node-dot { width: 10px; height: 10px; border-radius: 50%; transition: all 0.5s ease; }
        .node-name {
          font-size: 0.6rem; color: rgba(232,230,225,0.35);
          font-family: 'JetBrains Mono', monospace;
        }
 
        .vault-trust { position: relative; z-index: 1; margin-bottom: 1rem; }
        .trust-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.62rem; color: rgba(232,230,225,0.35);
          text-transform: uppercase; letter-spacing: 0.08em;
          display: block; margin-bottom: 0.65rem;
        }
        .trust-bars { display: flex; flex-direction: column; gap: 0.5rem; }
        .trust-row { display: flex; align-items: center; gap: 0.6rem; }
        .trust-name { font-size: 0.72rem; color: rgba(232,230,225,0.5); width: 36px; font-weight: 300; }
        .trust-track { flex: 1; height: 4px; background: rgba(232,230,225,0.06); border-radius: 2px; overflow: hidden; }
        .trust-fill { height: 100%; border-radius: 2px; }
        .trust-score {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.68rem; font-weight: 600; width: 24px; text-align: right;
        }
 
        .vault-footer {
          display: flex; justify-content: space-between; align-items: center;
          padding-top: 0.75rem;
          border-top: 1px solid rgba(232,230,225,0.06);
          position: relative; z-index: 1;
        }
        .vault-algo {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.58rem; color: rgba(232,230,225,0.2); letter-spacing: 0.05em;
        }
        .vault-savings {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem; font-weight: 600; letter-spacing: 0.04em;
        }
 
        .tx-stack {
          position: absolute; right: -30px; top: 50%;
          transform: translateY(-50%);
          display: flex; flex-direction: column; gap: 0.6rem;
        }
        .tx-card {
          display: flex; align-items: center; gap: 0.65rem;
          background: rgba(10, 17, 40, 0.85);
          border: 1px solid rgba(232,230,225,0.08);
          border-radius: 10px; padding: 0.6rem 0.85rem;
          width: 210px; backdrop-filter: blur(12px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.4);
          cursor: default;
        }
        .tx-icon {
          width: 30px; height: 30px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.85rem; flex-shrink: 0;
        }
        .tx-info { flex: 1; display: flex; flex-direction: column; gap: 0.1rem; overflow: hidden; }
        .tx-label { font-size: 0.75rem; color: rgba(232,230,225,0.85); font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .tx-route { font-family: 'JetBrains Mono', monospace; font-size: 0.58rem; color: rgba(232,230,225,0.3); white-space: nowrap; }
        .tx-amount { font-family: 'JetBrains Mono', monospace; font-size: 0.78rem; font-weight: 600; flex-shrink: 0; }

        .hero-floor-fade {
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 160px;
          background: linear-gradient(to bottom, transparent, var(--bg-primary));
          z-index: 4; pointer-events: none;
        }

        @media (max-width: 1024px) {
          .hero-inner { grid-template-columns: 1fr; text-align: center; padding: 7rem 1.5rem 4rem; }
          .hero-body { margin-left: auto; margin-right: auto; }
          .hero-cta { justify-content: center; }
          .stats-row { justify-content: center; }
          .hero-right { margin-top: 2.5rem; }
          .tx-stack { display: none; }
          .vault-card { width: 320px; }
        }
        @media (max-width: 520px) {
          .hero-headline { font-size: 3.5rem; }
          .vault-card { width: 300px; }
          .stats-row { gap: 1.5rem; flex-wrap: wrap; }
        }
      `}</style>
    </section>
  )
}
