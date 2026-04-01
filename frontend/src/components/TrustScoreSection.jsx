import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const friends = [
  {
    name: 'Rahul',
    score: 86,
    summary: 'Usually pays within 2 days',
    avatar: 'R',
    color: '#4AC9A0',
  },
  {
    name: 'Priya',
    score: 94,
    summary: 'Always settles immediately',
    avatar: 'P',
    color: '#4A8BC9',
  },
  {
    name: 'Arjun',
    score: 62,
    summary: 'Often delays payments',
    avatar: 'A',
    color: '#C9974A',
  },
]

function CircularScore({ score, color, delay }) {
  const radius = 46
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  return (
    <svg width="120" height="120" viewBox="0 0 120 120" className="score-ring">
      {/* Track */}
      <circle cx="60" cy="60" r={radius} fill="none" stroke="rgba(148,163,184,0.1)" strokeWidth="8" />
      {/* Progress */}
      <motion.circle
        cx="60"
        cy="60"
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        whileInView={{ strokeDashoffset: offset }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.4, delay, ease: [0.22, 1, 0.36, 1] }}
        style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
      />
      {/* Text */}
      <text x="60" y="70" textAnchor="middle" fill="var(--text-primary)" fontSize="34" fontWeight="400" fontFamily="var(--font-heading)">
        {score}
      </text>
    </svg>
  )
}

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      delay: i * 0.15,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

export default function TrustScoreSection() {
  return (
    <section id="trust" className="section">
      <div className="section-container">
        <div className="trust-header">
          <span className="section-label">Trust Scores</span>
          <h2 className="section-title">
            Know who <span className="gradient-text">pays back</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            FairSplit tracks repayment behavior and assigns a Trust Score to each friend,
            so you always know who's reliable.
          </p>
        </div>

        <div className="trust-grid">
          {friends.map((f, i) => (
            <motion.div
              key={f.name}
              className="trust-card glass"
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
            >
              <div className="trust-avatar" style={{ background: `${f.color}22`, color: f.color }}>
                {f.avatar}
              </div>
              <h3 className="trust-name">{f.name}</h3>
              <CircularScore score={f.score} color={f.color} delay={i * 0.2 + 0.3} />
              <p className="trust-summary">{f.summary}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .trust-header { text-align: center; margin-bottom: 4rem; }
        .trust-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 2rem;
          max-width: 900px;
          margin: 0 auto;
        }
        .trust-card {
          padding: 2rem;
          border-radius: 20px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .trust-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--glow-accent);
        }
        .trust-avatar {
          width: 48px;
          height: 48px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          font-weight: 700;
          font-family: var(--font-body);
        }
        .trust-name {
          font-size: 1.15rem;
          font-weight: 700;
        }
        .score-ring { margin: 0.5rem 0; }
        .trust-summary {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }
      `}</style>
    </section>
  )
}
