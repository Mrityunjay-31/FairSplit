import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/shared/PageTransition'
import { useGroups, calculateDebts, getContributions } from '../context/GroupContext'

const COLORS = ['#C9974A', '#4AC9A0', '#4A8BC9', '#C94A6E', '#9B59B6', '#E67E22', '#1ABC9C', '#E74C3C']

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
  const { groups } = useGroups()

  // Compute stats
  const activeGroups = groups.length
  const totalOwed = groups.reduce((acc, g) => {
    const debts = calculateDebts(g)
    return acc + debts.reduce((a, d) => a + d.amount, 0)
  }, 0)
  const totalSpentAll = groups.reduce(
    (acc, g) => acc + g.expenses.reduce((a, e) => a + e.amount, 0),
    0
  )

  return (
    <PageTransition>
      <div className="dash">
        {/* Header */}
        <div className="dash-header">
          <div>
            <h1 className="dash-title">Dashboard</h1>
            <p className="dash-subtitle">Welcome back! Here's your financial overview.</p>
          </div>
          <Link to="/group/create" className="btn-primary">+ Add Group</Link>
        </div>

        {/* Summary cards */}
        <motion.div className="dash-stats" variants={stagger} initial="hidden" animate="visible">
          {[
            { label: 'Total Spent', value: `₹${totalSpentAll.toLocaleString('en-IN')}`, color: '#4AC9A0' },
            { label: 'Unsettled Debts', value: `₹${totalOwed.toLocaleString('en-IN')}`, color: '#C94A6E' },
            { label: 'Active Groups', value: `${activeGroups}`, color: '#4A8BC9' },
            { label: 'Members Total', value: `${groups.reduce((a, g) => a + g.members.length, 0)}`, color: '#C9974A' },
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
            </div>
            {groups.length === 0 ? (
              <div className="dash-empty glass">
                <span style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>👥</span>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>No groups yet</p>
                <Link to="/group/create" className="btn-primary" style={{ fontSize: '0.82rem', padding: '0.6rem 1.2rem' }}>
                  + Create Your First Group
                </Link>
              </div>
            ) : (
              groups.map((g, i) => {
                const totalSpent = g.expenses.reduce((a, e) => a + e.amount, 0)
                const color = COLORS[i % COLORS.length]
                return (
                  <motion.div key={g.id} variants={fadeUp}>
                    <Link to={`/group/${g.id}`} className="group-card glass">
                      <div className="group-icon" style={{ background: `${color}18`, border: `1px solid ${color}33` }}>
                        <span style={{ color, fontWeight: 700 }}>{g.name[0]}</span>
                      </div>
                      <div className="group-info">
                        <span className="group-name">{g.name}</span>
                        <span className="group-meta">{g.members.length} members · {g.expenses.length} expenses</span>
                      </div>
                      <span className="group-balance" style={{ color }}>
                        ₹{totalSpent.toLocaleString('en-IN')}
                      </span>
                    </Link>
                  </motion.div>
                )
              })
            )}
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
        .dash-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2.5rem 1.5rem;
          border-radius: 16px;
          text-align: center;
        }
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
