import { motion } from 'framer-motion'
import PageTransition from '../components/shared/PageTransition'
import TrustScoreSection from '../components/features/TrustScoreSection'

const userData = {
  name: 'Mrityunjay',
  email: 'mrityunjay@splitcredit.com',
  trustScore: 92,
  memberSince: 'March 2026',
  groupsJoined: 4,
  totalSettled: '₹48,200',
  avgSettleTime: '1.8 days',
}

const trustHistory = [
  { month: 'Jan', score: 78 },
  { month: 'Feb', score: 82 },
  { month: 'Mar', score: 88 },
  { month: 'Apr', score: 92 },
]

export default function ProfilePage() {
  const radius = 62
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (userData.trustScore / 100) * circumference

  return (
    <PageTransition>
      <div className="prof">
        <h1 className="prof-title">Profile</h1>

        {/* Profile card */}
        <div className="prof-card glass">
          <div className="prof-left">
            <div className="prof-avatar">
              <span>{userData.name[0]}</span>
            </div>
            <div className="prof-info">
              <h2 className="prof-name">{userData.name}</h2>
              <p className="prof-email">{userData.email}</p>
              <span className="prof-since">Member since {userData.memberSince}</span>
            </div>
          </div>

          <div className="prof-right">
            <svg width="160" height="160" viewBox="0 0 160 160">
              <circle cx="80" cy="80" r={radius} fill="none" stroke="rgba(148,163,184,0.1)" strokeWidth="10" />
              <motion.circle
                cx="80" cy="80" r={radius} fill="none"
                stroke="#4AC9A0" strokeWidth="10" strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
              />
              <text x="80" y="92" textAnchor="middle" fill="var(--text-primary)" fontSize="42" fontWeight="400" fontFamily="var(--font-heading)">
                {userData.trustScore}
              </text>
            </svg>
            <span className="prof-trust-label">Trust Score</span>
          </div>
        </div>

        {/* Stats */}
        <div className="prof-stats">
          {[
            { label: 'Groups Joined', value: userData.groupsJoined, color: '#4A8BC9' },
            { label: 'Total Settled', value: userData.totalSettled, color: '#4AC9A0' },
            { label: 'Avg. Settle Time', value: userData.avgSettleTime, color: '#C9974A' },
          ].map((s) => (
            <div key={s.label} className="prof-stat glass">
              <span className="prof-stat-label">{s.label}</span>
              <span className="prof-stat-value" style={{ color: s.color }}>{s.value}</span>
            </div>
          ))}
        </div>

        {/* Trust history chart */}
        <div className="prof-history glass">
          <h3 className="prof-history-title">Trust Score History</h3>
          <div className="prof-chart">
            {trustHistory.map((h) => (
              <div key={h.month} className="prof-bar-col">
                <div className="prof-bar-track">
                  <motion.div
                    className="prof-bar-fill"
                    initial={{ height: 0 }}
                    animate={{ height: `${h.score}%` }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
                <span className="prof-bar-label">{h.month}</span>
                <span className="prof-bar-value">{h.score}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reuse TrustScoreSection from features for the friends list */}
        <div className="prof-friends-section">
          <TrustScoreSection />
        </div>
      </div>

      <style>{`
        .prof-title {
          font-family: var(--font-heading);
          font-size: 3rem;
          letter-spacing: 0.02em;
          line-height: 1;
          margin-bottom: 2rem;
        }
        .prof-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2rem 2.5rem;
          border-radius: 20px;
          margin-bottom: 2rem;
        }
        .prof-left {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .prof-avatar {
          width: 72px;
          height: 72px;
          border-radius: 16px;
          background: rgba(201, 151, 74, 0.12);
          border: 1px solid rgba(201, 151, 74, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--accent);
          font-family: var(--font-heading);
        }
        .prof-name {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.15rem;
        }
        .prof-email {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 0.3rem;
        }
        .prof-since {
          font-size: 0.75rem;
          color: var(--text-secondary);
          font-family: var(--font-mono);
          letter-spacing: 0.04em;
        }
        .prof-right {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.3rem;
        }
        .prof-trust-label {
          font-size: 0.78rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-family: var(--font-mono);
        }
        .prof-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .prof-stat {
          padding: 1.25rem 1.5rem;
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .prof-stat-label {
          font-size: 0.75rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-family: var(--font-mono);
        }
        .prof-stat-value {
          font-family: var(--font-heading);
          font-size: 1.8rem;
          line-height: 1;
        }
        .prof-history {
          padding: 2rem;
          border-radius: 20px;
          margin-bottom: 3rem;
        }
        .prof-history-title {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }
        .prof-chart {
          display: flex;
          align-items: flex-end;
          gap: 2rem;
          height: 180px;
          justify-content: center;
        }
        .prof-bar-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
          gap: 0.4rem;
          width: 48px;
        }
        .prof-bar-track {
          flex: 1;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }
        .prof-bar-fill {
          width: 100%;
          border-radius: 6px 6px 0 0;
          background: linear-gradient(to top, #4AC9A0, var(--accent));
        }
        .prof-bar-label {
          font-size: 0.72rem;
          color: var(--text-secondary);
        }
        .prof-bar-value {
          font-size: 0.7rem;
          font-family: var(--font-mono);
          color: var(--accent);
          font-weight: 600;
        }
        .prof-friends-section {
          margin: 0 -2.5rem;
        }
        @media (max-width: 768px) {
          .prof-card { flex-direction: column; gap: 2rem; text-align: center; }
          .prof-left { flex-direction: column; }
          .prof-stats { grid-template-columns: 1fr; }
        }
      `}</style>
    </PageTransition>
  )
}
