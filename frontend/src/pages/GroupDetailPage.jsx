import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../components/shared/PageTransition'
import { useGroups, calculateDebts, getContributions } from '../context/GroupContext'

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
}

const COLORS = ['#C9974A', '#4AC9A0', '#4A8BC9', '#C94A6E', '#9B59B6', '#E67E22', '#1ABC9C', '#E74C3C']

export default function GroupDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { groups, addExpense, deleteGroup } = useGroups()
  const group = groups.find((g) => g.id === id)

  const [expenseForm, setExpenseForm] = useState({ description: '', amount: '', paidBy: '' })
  const [showForm, setShowForm] = useState(false)
  const [formError, setFormError] = useState('')

  if (!group) {
    return (
      <PageTransition>
        <div className="gd">
          <div className="gd-breadcrumb">
            <Link to="/dashboard" className="gd-back">← Dashboard</Link>
          </div>
          <div className="gd-empty glass">
            <span style={{ fontSize: '3rem' }}>🔍</span>
            <h2>Group not found</h2>
            <p style={{ color: 'var(--text-secondary)' }}>This group may have been deleted.</p>
            <Link to="/dashboard" className="btn-primary" style={{ marginTop: '1rem' }}>Go to Dashboard</Link>
          </div>
        </div>
        <style>{gdStyles}</style>
      </PageTransition>
    )
  }

  const contributions = getContributions(group)
  const debts = calculateDebts(group)
  const totalSpent = group.expenses.reduce((a, e) => a + e.amount, 0)

  const handleAddExpense = (e) => {
    e.preventDefault()
    const desc = expenseForm.description.trim()
    const amount = parseFloat(expenseForm.amount)
    const paidBy = expenseForm.paidBy

    if (!desc || !amount || amount <= 0 || !paidBy) {
      setFormError('Please fill all fields with valid data')
      return
    }

    addExpense(id, { description: desc, amount, paidBy })
    setExpenseForm({ description: '', amount: '', paidBy: '' })
    setShowForm(false)
    setFormError('')
  }

  const handleDelete = () => {
    if (window.confirm(`Delete group "${group.name}"? This cannot be undone.`)) {
      deleteGroup(id)
      navigate('/dashboard')
    }
  }

  return (
    <PageTransition>
      <div className="gd">
        <div className="gd-breadcrumb">
          <Link to="/dashboard" className="gd-back">← Dashboard</Link>
        </div>

        {/* Header */}
        <div className="gd-header">
          <div>
            <h1 className="gd-title">{group.name}</h1>
            <p className="gd-meta">{group.members.length} members · {group.expenses.length} expenses</p>
          </div>
          <div className="gd-header-actions">
            <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
              {showForm ? '✕ Cancel' : '+ Add Expense'}
            </button>
            <button className="gd-delete-btn" onClick={handleDelete} title="Delete group">🗑️</button>
          </div>
        </div>

        {/* Members Section */}
        <div className="gd-members">
          {group.members.map((m, i) => (
            <div key={m} className="member-chip glass" style={{ borderColor: `${COLORS[i % COLORS.length]}33` }}>
              <span className="member-avatar" style={{ background: `${COLORS[i % COLORS.length]}22`, color: COLORS[i % COLORS.length] }}>
                {m[0].toUpperCase()}
              </span>
              {m}
              {m === group.admin && <span className="member-admin-badge">Admin</span>}
            </div>
          ))}
        </div>

        {/* Total Spending */}
        <div className="gd-total glass">
          <span className="gd-total-label">Total Group Spending</span>
          <span className="gd-total-value">₹{totalSpent.toLocaleString('en-IN')}</span>
        </div>

        {/* Add Expense Form */}
        <AnimatePresence>
          {showForm && (
            <motion.form
              className="gd-expense-form glass"
              onSubmit={handleAddExpense}
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: 'auto', marginBottom: '2rem' }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="gd-form-title">Add New Expense</h3>
              <div className="gd-form-grid">
                <div className="gd-form-field">
                  <label className="gd-form-label">Description</label>
                  <input
                    className="gd-form-input"
                    type="text"
                    placeholder="e.g. Dinner at beach shack"
                    value={expenseForm.description}
                    onChange={(e) => setExpenseForm((p) => ({ ...p, description: e.target.value }))}
                    required
                  />
                </div>
                <div className="gd-form-field">
                  <label className="gd-form-label">Amount (₹)</label>
                  <input
                    className="gd-form-input"
                    type="number"
                    placeholder="0"
                    value={expenseForm.amount}
                    onChange={(e) => setExpenseForm((p) => ({ ...p, amount: e.target.value }))}
                    required
                    min="1"
                  />
                </div>
                <div className="gd-form-field">
                  <label className="gd-form-label">Paid By</label>
                  <select
                    className="gd-form-input"
                    value={expenseForm.paidBy}
                    onChange={(e) => setExpenseForm((p) => ({ ...p, paidBy: e.target.value }))}
                    required
                  >
                    <option value="">Select person</option>
                    {group.members.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
              </div>
              {formError && <p className="gd-form-error">{formError}</p>}
              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}>
                Add Expense
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Content Grid */}
        <div className="gd-grid">
          {/* Left: Expenses */}
          <motion.div className="gd-section" variants={stagger} initial="hidden" animate="visible">
            <h2 className="gd-section-title">💳 Expenses</h2>
            {group.expenses.length === 0 ? (
              <div className="gd-empty-msg glass">
                <p>No expenses yet. Add one above!</p>
              </div>
            ) : (
              group.expenses.map((e) => (
                <motion.div key={e.id} className="expense-card glass" variants={fadeUp}>
                  <div className="expense-info">
                    <span className="expense-desc">{e.description}</span>
                    <span className="expense-meta">Paid by {e.paidBy}</span>
                  </div>
                  <span className="expense-amount">₹{e.amount.toLocaleString('en-IN')}</span>
                </motion.div>
              ))
            )}
          </motion.div>

          {/* Right: Contributions + Debts */}
          <div className="gd-right-col">
            {/* Contributions */}
            <motion.div className="gd-section" variants={stagger} initial="hidden" animate="visible">
              <h2 className="gd-section-title">📊 Contributions</h2>
              {group.members.map((m, i) => {
                const amt = contributions[m] || 0
                const pct = totalSpent > 0 ? (amt / totalSpent) * 100 : 0
                return (
                  <motion.div key={m} className="contrib-row glass" variants={fadeUp}>
                    <div className="contrib-info">
                      <span className="contrib-name" style={{ color: COLORS[i % COLORS.length] }}>{m}</span>
                      <div className="contrib-bar-bg">
                        <motion.div
                          className="contrib-bar"
                          style={{ background: COLORS[i % COLORS.length] }}
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.8, delay: i * 0.1 }}
                        />
                      </div>
                    </div>
                    <span className="contrib-amount">₹{amt.toLocaleString('en-IN')}</span>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* Debts */}
            <motion.div className="gd-section" variants={stagger} initial="hidden" animate="visible">
              <h2 className="gd-section-title">💰 Settlement</h2>
              {debts.length === 0 ? (
                <div className="gd-empty-msg glass">
                  <p>{group.expenses.length === 0 ? 'Add expenses to see settlements' : 'All settled up! 🎉'}</p>
                </div>
              ) : (
                debts.map((d, i) => (
                  <motion.div key={i} className="debt-card glass" variants={fadeUp}>
                    <div className="debt-flow">
                      <span className="debt-person debt-from">{d.from}</span>
                      <span className="debt-arrow">→ pays →</span>
                      <span className="debt-person debt-to">{d.to}</span>
                    </div>
                    <span className="debt-amount">₹{d.amount.toLocaleString('en-IN')}</span>
                  </motion.div>
                ))
              )}
            </motion.div>
          </div>
        </div>
      </div>

      <style>{gdStyles}</style>
    </PageTransition>
  )
}

const gdStyles = `
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
  .gd-header-actions {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }
  .gd-delete-btn {
    background: rgba(201, 74, 110, 0.1);
    border: 1px solid rgba(201, 74, 110, 0.2);
    border-radius: 8px;
    padding: 0.6rem 0.8rem;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.2s;
  }
  .gd-delete-btn:hover {
    background: rgba(201, 74, 110, 0.2);
    border-color: rgba(201, 74, 110, 0.4);
    transform: translateY(-1px);
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
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    font-weight: 700;
  }
  .member-admin-badge {
    font-size: 0.58rem;
    padding: 0.12rem 0.4rem;
    border-radius: 4px;
    background: rgba(201, 151, 74, 0.2);
    color: var(--accent);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    font-family: var(--font-mono);
  }
  .gd-total {
    padding: 1.5rem 2rem;
    border-radius: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
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

  /* Expense form */
  .gd-expense-form {
    padding: 1.5rem 2rem;
    border-radius: 16px;
    overflow: hidden;
    border-color: rgba(74, 201, 160, 0.2);
  }
  .gd-form-title {
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: #4AC9A0;
  }
  .gd-form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
  }
  .gd-form-field {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }
  .gd-form-label {
    font-size: 0.72rem;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    font-family: var(--font-mono);
  }
  .gd-form-input {
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid var(--border-subtle);
    border-radius: 8px;
    padding: 0.7rem 0.8rem;
    color: var(--text-primary);
    font-family: var(--font-body);
    font-size: 0.88rem;
    outline: none;
    transition: border-color 0.2s;
  }
  .gd-form-input:focus { border-color: rgba(74, 201, 160, 0.5); }
  .gd-form-input::placeholder { color: rgba(232, 230, 225, 0.25); }
  select.gd-form-input { appearance: none; cursor: pointer; }
  .gd-form-error { color: #C94A6E; font-size: 0.8rem; margin-top: 0.3rem; }

  /* Content grid */
  .gd-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  .gd-right-col {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  .gd-section-title {
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }
  .gd-empty { text-align: center; padding: 3rem 2rem; border-radius: 20px; }
  .gd-empty-msg {
    padding: 1.5rem;
    border-radius: 12px;
    text-align: center;
    color: var(--text-secondary);
    font-size: 0.9rem;
  }

  /* Expense cards */
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
  .expense-info { flex: 1; display: flex; flex-direction: column; gap: 0.15rem; }
  .expense-desc { font-size: 0.95rem; font-weight: 600; }
  .expense-meta { font-size: 0.75rem; color: var(--text-secondary); }
  .expense-amount {
    font-family: var(--font-mono);
    font-size: 1rem;
    font-weight: 600;
    color: var(--accent);
  }

  /* Contributions */
  .contrib-row {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.9rem 1.25rem;
    border-radius: 12px;
    margin-bottom: 0.5rem;
  }
  .contrib-info { flex: 1; display: flex; flex-direction: column; gap: 0.4rem; }
  .contrib-name { font-size: 0.88rem; font-weight: 600; }
  .contrib-bar-bg {
    width: 100%;
    height: 6px;
    border-radius: 3px;
    background: rgba(232, 230, 225, 0.06);
    overflow: hidden;
  }
  .contrib-bar {
    height: 100%;
    border-radius: 3px;
  }
  .contrib-amount {
    font-family: var(--font-mono);
    font-size: 0.88rem;
    font-weight: 600;
    color: var(--text-primary);
    white-space: nowrap;
  }

  /* Debts */
  .debt-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.25rem;
    border-radius: 12px;
    margin-bottom: 0.5rem;
    border-color: rgba(201, 74, 110, 0.15);
  }
  .debt-flow {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
  .debt-person {
    font-weight: 600;
    font-size: 0.9rem;
  }
  .debt-from { color: #C94A6E; }
  .debt-to { color: #4AC9A0; }
  .debt-arrow {
    font-size: 0.72rem;
    color: var(--text-secondary);
    font-family: var(--font-mono);
  }
  .debt-amount {
    font-family: var(--font-mono);
    font-size: 1rem;
    font-weight: 700;
    color: #C94A6E;
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    .gd-header { flex-direction: column; gap: 1rem; }
    .gd-grid { grid-template-columns: 1fr; }
    .gd-form-grid { grid-template-columns: 1fr; }
  }
`
