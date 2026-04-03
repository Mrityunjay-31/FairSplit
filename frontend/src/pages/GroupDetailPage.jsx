import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/shared/PageTransition'

const groupData = {
  'goa-trip': {
    name: 'Goa Trip 2026',
    members: ['You', 'Priya', 'Rahul', 'Arjun', 'Sneha'],
    expenses: [
      { id: 1, desc: 'Hotel booking', paidBy: 'You', amount: '₹12,000', split: '₹2,400/person', icon: '🏨' },
      { id: 2, desc: 'Dinner at beach shack', paidBy: 'Priya', amount: '₹3,200', split: '₹640/person', icon: '🍽️' },
      { id: 3, desc: 'Scooter rental', paidBy: 'Rahul', amount: '₹1,500', split: '₹300/person', icon: '🛵' },
      { id: 4, desc: 'Watersports', paidBy: 'Sneha', amount: '₹4,000', split: '₹800/person', icon: '🏄' },
    ],
    totalSpent: '₹20,700',
  },
}

const fallback = {
  name: 'Group Details',
  members: ['You', 'Friend 1', 'Friend 2'],
  expenses: [
    { id: 1, desc: 'Sample expense', paidBy: 'You', amount: '₹500', split: '₹250/person', icon: '📝' },
  ],
  totalSpent: '₹500',
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
}

export default function GroupDetailPage() {
  const { id } = useParams()
  const group = groupData[id] || fallback

  return (
    <PageTransition>
      <div className="gd">
        <div className="gd-breadcrumb">
          <Link to="/dashboard" className="gd-back">← Dashboard</Link>
        </div>

        <div className="gd-header">
          <div>
            <h1 className="gd-title">{group.name}</h1>
            <p className="gd-meta">{group.members.length} members · {group.expenses.length} expenses</p>
          </div>
          <Link to="/expense/add" className="btn-primary">+ Add Expense</Link>
        </div>

        {/* Members */}
        <div className="gd-members">
          {group.members.map((m) => (
            <div key={m} className="member-chip glass">
              <span className="member-avatar">{m[0]}</span>
              {m}
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="gd-total glass">
          <span className="gd-total-label">Total Group Spending</span>
          <span className="gd-total-value">{group.totalSpent}</span>
        </div>

        {/* Expenses */}
        <motion.div className="gd-expenses" variants={stagger} initial="hidden" animate="visible">
          <h2 className="gd-section-title">Expenses</h2>
          {group.expenses.map((e) => (
            <motion.div key={e.id} className="expense-card glass" variants={fadeUp}>
              <span className="expense-icon">{e.icon}</span>
              <div className="expense-info">
                <span className="expense-desc">{e.desc}</span>
                <span className="expense-meta">Paid by {e.paidBy} · {e.split}</span>
              </div>
              <span className="expense-amount">{e.amount}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        .gd-breadcrumb { margin-bottom: 1.5rem; }
        .gd-back {
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.85rem;
          transition: color 0.2s;
        }
        .gd-back:hover { color: var(--accent); }
        .gd-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.5rem;
        }
        .gd-title {
          font-family: var(--font-heading);
          font-size: 2.8rem;
          letter-spacing: 0.02em;
          line-height: 1;
          margin-bottom: 0.4rem;
        }
        .gd-meta { color: var(--text-secondary); font-size: 0.9rem; }
        .gd-members {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }
        .member-chip {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.45rem 1rem;
          border-radius: 999px;
          font-size: 0.85rem;
        }
        .member-avatar {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: rgba(201, 151, 74, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--accent);
        }
        .gd-total {
          padding: 1.5rem 2rem;
          border-radius: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2.5rem;
        }
        .gd-total-label {
          font-size: 0.82rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-family: var(--font-mono);
        }
        .gd-total-value {
          font-family: var(--font-heading);
          font-size: 2.5rem;
          color: var(--accent);
        }
        .gd-section-title {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }
        .expense-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.25rem;
          border-radius: 14px;
          margin-bottom: 0.6rem;
          transition: transform 0.2s ease;
        }
        .expense-card:hover { transform: translateX(4px); }
        .expense-icon { font-size: 1.4rem; flex-shrink: 0; }
        .expense-info { flex: 1; display: flex; flex-direction: column; gap: 0.15rem; }
        .expense-desc { font-size: 0.95rem; font-weight: 600; }
        .expense-meta { font-size: 0.75rem; color: var(--text-secondary); }
        .expense-amount {
          font-family: var(--font-mono);
          font-size: 1rem;
          font-weight: 600;
          color: var(--accent);
        }
        @media (max-width: 768px) {
          .gd-header { flex-direction: column; gap: 1rem; }
        }
      `}</style>
    </PageTransition>
  )
}
