import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/shared/PageTransition'

const groups = ['Goa Trip 2026', 'Roommates', 'Office Lunches', 'Birthday Party']
const splitOptions = ['Equal', 'Exact Amounts', 'Percentages']

export default function AddExpensePage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    description: '',
    amount: '',
    group: groups[0],
    splitType: 'Equal',
    paidBy: 'You',
  })

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In real app → API call
    navigate('/dashboard')
  }

  return (
    <PageTransition>
      <div className="ae">
        <div className="ae-breadcrumb">
          <Link to="/dashboard" className="ae-back">← Dashboard</Link>
        </div>

        <h1 className="ae-title">Add Expense</h1>
        <p className="ae-subtitle">Log a shared expense and split it with your group.</p>

        <motion.form
          className="ae-form glass"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="ae-field">
            <label className="ae-label">Description</label>
            <input
              className="ae-input"
              type="text"
              placeholder="e.g. Dinner at beach shack"
              value={form.description}
              onChange={handleChange('description')}
              required
            />
          </div>

          <div className="ae-field">
            <label className="ae-label">Amount (₹)</label>
            <input
              className="ae-input"
              type="number"
              placeholder="0.00"
              value={form.amount}
              onChange={handleChange('amount')}
              required
              min="1"
            />
          </div>

          <div className="ae-row">
            <div className="ae-field">
              <label className="ae-label">Group</label>
              <select className="ae-input" value={form.group} onChange={handleChange('group')}>
                {groups.map((g) => <option key={g}>{g}</option>)}
              </select>
            </div>
            <div className="ae-field">
              <label className="ae-label">Paid By</label>
              <input
                className="ae-input"
                type="text"
                value={form.paidBy}
                onChange={handleChange('paidBy')}
              />
            </div>
          </div>

          <div className="ae-field">
            <label className="ae-label">Split Type</label>
            <div className="ae-split-options">
              {splitOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  className={`ae-split-btn ${form.splitType === opt ? 'active' : ''}`}
                  onClick={() => setForm((prev) => ({ ...prev, splitType: opt }))}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div className="ae-actions">
            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Add Expense
            </button>
          </div>
        </motion.form>
      </div>

      <style>{`
        .ae { max-width: 600px; }
        .ae-breadcrumb { margin-bottom: 1.5rem; }
        .ae-back {
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.85rem;
          transition: color 0.2s;
        }
        .ae-back:hover { color: var(--accent); }
        .ae-title {
          font-family: var(--font-heading);
          font-size: 2.8rem;
          letter-spacing: 0.02em;
          line-height: 1;
          margin-bottom: 0.4rem;
        }
        .ae-subtitle {
          color: var(--text-secondary);
          font-size: 1rem;
          margin-bottom: 2rem;
        }
        .ae-form {
          padding: 2rem;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .ae-field {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          flex: 1;
        }
        .ae-label {
          font-size: 0.78rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-family: var(--font-mono);
        }
        .ae-input {
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--border-subtle);
          border-radius: 10px;
          padding: 0.85rem 1rem;
          color: var(--text-primary);
          font-family: var(--font-body);
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s;
        }
        .ae-input:focus {
          border-color: rgba(201, 151, 74, 0.5);
        }
        .ae-input::placeholder {
          color: rgba(232, 230, 225, 0.25);
        }
        select.ae-input {
          appearance: none;
          cursor: pointer;
        }
        .ae-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .ae-split-options {
          display: flex;
          gap: 0.5rem;
        }
        .ae-split-btn {
          flex: 1;
          padding: 0.65rem;
          border: 1px solid var(--border-subtle);
          border-radius: 10px;
          background: transparent;
          color: var(--text-secondary);
          font-size: 0.82rem;
          font-family: var(--font-body);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .ae-split-btn.active {
          border-color: var(--accent);
          color: var(--accent);
          background: rgba(201, 151, 74, 0.08);
        }
        .ae-split-btn:hover:not(.active) {
          border-color: rgba(232, 230, 225, 0.2);
          color: var(--text-primary);
        }
        .ae-actions { margin-top: 0.5rem; }
        @media (max-width: 520px) {
          .ae-row { grid-template-columns: 1fr; }
          .ae-split-options { flex-direction: column; }
        }
      `}</style>
    </PageTransition>
  )
}
