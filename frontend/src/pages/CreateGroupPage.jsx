import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../components/shared/PageTransition'
import { useGroups } from '../context/GroupContext'

export default function CreateGroupPage() {
  const navigate = useNavigate()
  const { createGroup } = useGroups()
  const [groupName, setGroupName] = useState('')
  const [adminName, setAdminName] = useState('')
  const [memberInput, setMemberInput] = useState('')
  const [members, setMembers] = useState([])
  const [error, setError] = useState('')

  const addMember = () => {
    const name = memberInput.trim()
    if (!name) return
    if (members.includes(name) || name === adminName.trim()) {
      setError('This person is already added')
      return
    }
    setMembers((prev) => [...prev, name])
    setMemberInput('')
    setError('')
  }

  const removeMember = (name) => {
    setMembers((prev) => prev.filter((m) => m !== name))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addMember()
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!groupName.trim() || !adminName.trim()) {
      setError('Group name and your name are required')
      return
    }
    if (members.length === 0) {
      setError('Add at least one member')
      return
    }
    const id = createGroup(groupName.trim(), adminName.trim(), members)
    navigate(`/group/${id}`)
  }

  return (
    <PageTransition>
      <div className="cg">
        <div className="cg-breadcrumb">
          <Link to="/dashboard" className="cg-back">← Dashboard</Link>
        </div>

        <h1 className="cg-title">Create Group</h1>
        <p className="cg-subtitle">Set up a new group and add members to start splitting expenses.</p>

        <motion.form
          className="cg-form glass"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="cg-field">
            <label className="cg-label">Group Name</label>
            <input
              className="cg-input"
              type="text"
              placeholder="e.g. Goa Trip 2026"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              required
            />
          </div>

          <div className="cg-field">
            <label className="cg-label">Your Name (Admin)</label>
            <input
              className="cg-input"
              type="text"
              placeholder="e.g. Rahul"
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
              required
            />
          </div>

          <div className="cg-field">
            <label className="cg-label">Add Members</label>
            <div className="cg-member-input-row">
              <input
                className="cg-input"
                type="text"
                placeholder="Enter member name"
                value={memberInput}
                onChange={(e) => { setMemberInput(e.target.value); setError('') }}
                onKeyDown={handleKeyDown}
              />
              <button type="button" className="cg-add-btn" onClick={addMember}>
                + Add
              </button>
            </div>
          </div>

          <AnimatePresence>
            {error && (
              <motion.p
                className="cg-error"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          {members.length > 0 && (
            <div className="cg-members-list">
              <span className="cg-label" style={{ marginBottom: '0.5rem' }}>
                Members ({members.length + 1} total incl. you)
              </span>
              <div className="cg-chips">
                {/* Admin chip */}
                <div className="cg-chip cg-chip-admin">
                  <span className="cg-chip-avatar">{adminName.trim()[0]?.toUpperCase() || 'A'}</span>
                  {adminName.trim() || 'Admin'}
                  <span className="cg-chip-badge">Admin</span>
                </div>
                {/* Member chips */}
                <AnimatePresence>
                  {members.map((m) => (
                    <motion.div
                      key={m}
                      className="cg-chip"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="cg-chip-avatar">{m[0].toUpperCase()}</span>
                      {m}
                      <button
                        type="button"
                        className="cg-chip-remove"
                        onClick={() => removeMember(m)}
                        title="Remove member"
                      >
                        ×
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}

          <div className="cg-actions">
            <button
              type="submit"
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              🚀 Create Group
            </button>
          </div>
        </motion.form>
      </div>

      <style>{`
        .cg { max-width: 600px; }
        .cg-breadcrumb { margin-bottom: 1.5rem; }
        .cg-back {
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.85rem;
          transition: color 0.2s;
        }
        .cg-back:hover { color: var(--accent); }
        .cg-title {
          font-family: var(--font-heading);
          font-size: 2.8rem;
          letter-spacing: 0.02em;
          line-height: 1;
          margin-bottom: 0.4rem;
        }
        .cg-subtitle {
          color: var(--text-secondary);
          font-size: 1rem;
          margin-bottom: 2rem;
        }
        .cg-form {
          padding: 2rem;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .cg-field {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          flex: 1;
        }
        .cg-label {
          font-size: 0.78rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-family: var(--font-mono);
        }
        .cg-input {
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--border-subtle);
          border-radius: 10px;
          padding: 0.85rem 1rem;
          color: var(--text-primary);
          font-family: var(--font-body);
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s;
          flex: 1;
        }
        .cg-input:focus {
          border-color: rgba(201, 151, 74, 0.5);
        }
        .cg-input::placeholder {
          color: rgba(232, 230, 225, 0.25);
        }
        .cg-member-input-row {
          display: flex;
          gap: 0.6rem;
        }
        .cg-add-btn {
          padding: 0.85rem 1.4rem;
          background: rgba(74, 201, 160, 0.12);
          border: 1px solid rgba(74, 201, 160, 0.3);
          border-radius: 10px;
          color: #4AC9A0;
          font-family: var(--font-body);
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .cg-add-btn:hover {
          background: rgba(74, 201, 160, 0.2);
          border-color: rgba(74, 201, 160, 0.5);
          transform: translateY(-1px);
        }
        .cg-error {
          color: #C94A6E;
          font-size: 0.82rem;
          margin: -0.5rem 0;
        }
        .cg-members-list {
          display: flex;
          flex-direction: column;
        }
        .cg-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .cg-chip {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.45rem 0.9rem;
          border-radius: 999px;
          font-size: 0.85rem;
          background: var(--bg-glass);
          border: 1px solid var(--border-subtle);
          backdrop-filter: blur(8px);
        }
        .cg-chip-admin {
          border-color: rgba(201, 151, 74, 0.3);
          background: rgba(201, 151, 74, 0.08);
        }
        .cg-chip-avatar {
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
        .cg-chip-badge {
          font-size: 0.6rem;
          padding: 0.15rem 0.45rem;
          border-radius: 4px;
          background: rgba(201, 151, 74, 0.2);
          color: var(--accent);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          font-family: var(--font-mono);
        }
        .cg-chip-remove {
          background: none;
          border: none;
          color: var(--text-secondary);
          font-size: 1.1rem;
          cursor: pointer;
          padding: 0 0.15rem;
          line-height: 1;
          transition: color 0.2s;
        }
        .cg-chip-remove:hover { color: #C94A6E; }
        .cg-actions { margin-top: 0.5rem; }
        @media (max-width: 520px) {
          .cg-member-input-row { flex-direction: column; }
        }
      `}</style>
    </PageTransition>
  )
}
