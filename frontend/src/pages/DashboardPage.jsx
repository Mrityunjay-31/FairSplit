import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/shared/PageTransition'

const groups = [
  { id: 'goa-trip', name: 'Goa Trip 2026', members: 5, balance: '₹3,420', color: '#C9974A' },
  { id: 'roommates', name: 'Roommates', members: 3, balance: '₹1,280', color: '#4AC9A0' },
  { id: 'office-lunch', name: 'Office Lunches', members: 8, balance: '₹890', color: '#4A8BC9' },
  { id: 'birthday-bash', name: 'Birthday Party', members: 6, balance: '₹5,100', color: '#C94A6E' },
]

const recentActivity = [
  { text: 'Priya added ₹1,200 for "Dinner"', time: '2 hours ago', icon: '🍽️' },
  { text: 'Rahul settled ₹850 with you', time: '5 hours ago', icon: '✅' },
  { text: 'You added ₹340 for "Cab fare"', time: 'Yesterday', icon: '🚕' },
  { text: 'Arjun joined "Office Lunches"', time: '2 days ago', icon: '👤' },
]

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export default function DashboardPage() {
  return (
    <PageTransition>
      <div className="dash">
        {/* Header */}
        <div className="dash-header">
          <div>
            <h1 className="dash-title">Dashboard</h1>
            <p className="dash-subtitle">Welcome back! Here's your financial overview.</p>
          </div>
          <Link to="/expense/add" className="btn-primary">+ Add Expense</Link>
        </div>

        {/* Summary cards */}
        <motion.div className="dash-stats" variants={stagger} initial="hidden" animate="visible">
          {[
            { label: 'Total Owed to You', value: '₹4,830', color: '#4AC9A0' },
            { label: 'You Owe', value: '₹1,760', color: '#C94A6E' },
            { label: 'Active Groups', value: '4', color: '#4A8BC9' },
            { label: 'Trust Score', value: '92', color: '#C9974A' },
          ].map((s) => (
            <motion.div key={s.label} className="dash-stat-card glass" variants={fadeUp}>
              <span className="dash-stat-label">{s.label}</span>
              <span className="dash-stat-value" style={{ color: s.color }}>{s.value}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Content grid */}
        <div className="dash-grid">
          {/* Groups */}
          <motion.div className="dash-section" variants={stagger} initial="hidden" animate="visible">
            <div className="dash-section-header">
              <h2>Your Groups</h2>
              <Link to="/dashboard" className="dash-view-all">View all →</Link>
            </div>
            {groups.map((g) => (
              <motion.div key={g.id} variants={fadeUp}>
                <Link to={`/group/${g.id}`} className="group-card glass">
                  <div className="group-icon" style={{ background: `${g.color}18`, border: `1px solid ${g.color}33` }}>
                    <span style={{ color: g.color, fontWeight: 700 }}>{g.name[0]}</span>
                  </div>
                  <div className="group-info">
                    <span className="group-name">{g.name}</span>
                    <span className="group-meta">{g.members} members</span>
                  </div>
                  <span className="group-balance" style={{ color: g.color }}>{g.balance}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Recent Activity */}
          <motion.div className="dash-section" variants={stagger} initial="hidden" animate="visible">
            <div className="dash-section-header">
              <h2>Recent Activity</h2>
            </div>
            {recentActivity.map((a, i) => (
              <motion.div key={i} className="activity-row glass" variants={fadeUp}>
                <span className="activity-icon">{a.icon}</span>
                <div className="activity-info">
                  <span className="activity-text">{a.text}</span>
                  <span className="activity-time">{a.time}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <style>{`
        .dash-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2rem;
        }
        .dash-title {
          font-family: var(--font-heading);
          font-size: 3rem;
          letter-spacing: 0.02em;
          line-height: 1;
          margin-bottom: 0.5rem;
        }
        .dash-subtitle {
          color: var(--text-secondary);
          font-size: 1rem;
        }
        .dash-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 2.5rem;
        }
        .dash-stat-card {
          padding: 1.5rem;
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .dash-stat-label {
          font-size: 0.78rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-family: var(--font-mono);
        }
        .dash-stat-value {
          font-family: var(--font-heading);
          font-size: 2.2rem;
          line-height: 1;
        }
        .dash-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }
        .dash-section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        .dash-section-header h2 {
          font-size: 1.15rem;
          font-weight: 700;
        }
        .dash-view-all {
          font-size: 0.82rem;
          color: var(--accent);
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .dash-view-all:hover { opacity: 0.8; }
        .group-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.25rem;
          border-radius: 14px;
          margin-bottom: 0.6rem;
          text-decoration: none;
          color: var(--text-primary);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .group-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--glow-accent);
        }
        .group-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          flex-shrink: 0;
        }
        .group-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }
        .group-name { font-size: 0.95rem; font-weight: 600; }
        .group-meta { font-size: 0.75rem; color: var(--text-secondary); }
        .group-balance {
          font-family: var(--font-mono);
          font-size: 0.9rem;
          font-weight: 600;
        }
        .activity-row {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 0.9rem 1.25rem;
          border-radius: 14px;
          margin-bottom: 0.6rem;
        }
        .activity-icon { font-size: 1.3rem; flex-shrink: 0; }
        .activity-info { flex: 1; display: flex; flex-direction: column; gap: 0.15rem; }
        .activity-text { font-size: 0.9rem; }
        .activity-time { font-size: 0.72rem; color: var(--text-secondary); }
        @media (max-width: 768px) {
          .dash-grid { grid-template-columns: 1fr; }
          .dash-header { flex-direction: column; gap: 1rem; }
        }
      `}</style>
    </PageTransition>
  )
}
