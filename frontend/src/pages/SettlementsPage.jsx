import { useState } from 'react'
import { motion } from 'framer-motion'
import PageTransition from '../components/shared/PageTransition'

const settlements = [
  { from: 'You', to: 'Priya', amount: '₹1,200', status: 'pending', color: '#C9974A' },
  { from: 'Arjun', to: 'You', amount: '₹850', status: 'pending', color: '#4A8BC9' },
  { from: 'You', to: 'Rahul', amount: '₹2,100', status: 'settled', color: '#4AC9A0' },
  { from: 'Sneha', to: 'You', amount: '₹640', status: 'settled', color: '#4AC9A0' },
  { from: 'You', to: 'Arjun', amount: '₹340', status: 'pending', color: '#C94A6E' },
]

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
}

export default function SettlementsPage() {
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all'
    ? settlements
    : settlements.filter((s) => s.status === filter)

  return (
    <PageTransition>
      <div className="stl">
        <h1 className="stl-title">Settlements</h1>
        <p className="stl-subtitle">Optimized payments — settle everything in the fewest transactions.</p>

        {/* Summary */}
        <div className="stl-summary">
          <div className="stl-sum-card glass">
            <span className="stl-sum-label">You Owe</span>
            <span className="stl-sum-value" style={{ color: '#C94A6E' }}>₹3,640</span>
          </div>
          <div className="stl-sum-card glass">
            <span className="stl-sum-label">Owed to You</span>
            <span className="stl-sum-value" style={{ color: '#4AC9A0' }}>₹1,490</span>
          </div>
          <div className="stl-sum-card glass">
            <span className="stl-sum-label">Net Balance</span>
            <span className="stl-sum-value" style={{ color: '#C9974A' }}>-₹2,150</span>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="stl-filters">
          {['all', 'pending', 'settled'].map((f) => (
            <button
              key={f}
              className={`stl-filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Settlement list */}
        <motion.div className="stl-list" variants={stagger} initial="hidden" animate="visible" key={filter}>
          {filtered.map((s, i) => (
            <motion.div key={i} className="stl-card glass" variants={fadeUp}>
              <div className="stl-flow">
                <span className="stl-person">{s.from}</span>
                <span className="stl-arrow">→</span>
                <span className="stl-person">{s.to}</span>
              </div>
              <span className="stl-amount" style={{ color: s.color }}>{s.amount}</span>
              <span className={`stl-badge ${s.status}`}>
                {s.status === 'settled' ? '✓ Settled' : '● Pending'}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        .stl-title {
          font-family: var(--font-heading);
          font-size: 3rem;
          letter-spacing: 0.02em;
          line-height: 1;
          margin-bottom: 0.4rem;
        }
        .stl-subtitle {
          color: var(--text-secondary);
          font-size: 1rem;
          margin-bottom: 2rem;
        }
        .stl-summary {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .stl-sum-card {
          padding: 1.5rem;
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .stl-sum-label {
          font-size: 0.78rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-family: var(--font-mono);
        }
        .stl-sum-value {
          font-family: var(--font-heading);
          font-size: 2rem;
          line-height: 1;
        }
        .stl-filters {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }
        .stl-filter-btn {
          padding: 0.5rem 1.25rem;
          border: 1px solid var(--border-subtle);
          border-radius: 999px;
          background: transparent;
          color: var(--text-secondary);
          font-size: 0.82rem;
          font-family: var(--font-body);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .stl-filter-btn.active {
          border-color: var(--accent);
          color: var(--accent);
          background: rgba(201, 151, 74, 0.08);
        }
        .stl-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.5rem;
          border-radius: 14px;
          margin-bottom: 0.6rem;
        }
        .stl-flow {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          flex: 1;
        }
        .stl-person { font-weight: 600; font-size: 0.95rem; }
        .stl-arrow { color: var(--text-secondary); }
        .stl-amount {
          font-family: var(--font-mono);
          font-size: 1rem;
          font-weight: 600;
        }
        .stl-badge {
          font-size: 0.72rem;
          font-weight: 600;
          padding: 0.3rem 0.8rem;
          border-radius: 999px;
          font-family: var(--font-mono);
          letter-spacing: 0.04em;
        }
        .stl-badge.settled {
          background: rgba(74, 201, 160, 0.12);
          color: #4AC9A0;
          border: 1px solid rgba(74, 201, 160, 0.25);
        }
        .stl-badge.pending {
          background: rgba(201, 151, 74, 0.12);
          color: #C9974A;
          border: 1px solid rgba(201, 151, 74, 0.25);
        }
        @media (max-width: 768px) {
          .stl-summary { grid-template-columns: 1fr; }
        }
      `}</style>
    </PageTransition>
  )
}
