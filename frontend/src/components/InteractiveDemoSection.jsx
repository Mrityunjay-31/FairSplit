import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import NetworkGraph from './NetworkGraph'

const initialDebts = [
  { from: 'Alice', to: 'Bob', amount: 200 },
  { from: 'Bob', to: 'Carol', amount: 300 },
  { from: 'Carol', to: 'Alice', amount: 100 },
]

const demoNodes = [
  { id: 'Alice', label: 'Alice', x: -0.6, y: 0.5 },
  { id: 'Bob', label: 'Bob', x: 0.6, y: 0.5 },
  { id: 'Carol', label: 'Carol', x: 0, y: -0.5 },
]

const messyEdges = [
  { from: 'Alice', to: 'Bob' },
  { from: 'Bob', to: 'Carol' },
  { from: 'Carol', to: 'Alice' },
]

const optimizedResult = [
  { from: 'Alice', to: 'Bob', amount: 100 },
  { from: 'Bob', to: 'Carol', amount: 200 },
]

const optEdges = [
  { from: 'Alice', to: 'Bob' },
  { from: 'Bob', to: 'Carol' },
]

export default function InteractiveDemoSection() {
  const [optimized, setOptimized] = useState(false)

  const handleOptimize = useCallback(() => {
    setOptimized(true)
  }, [])

  const handleReset = useCallback(() => {
    setOptimized(false)
  }, [])

  return (
    <section id="demo" className="section">
      <div className="section-container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-label">Live Demo</span>
          <h2 className="section-title">
            See the algorithm <span className="gradient-text">in action</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Watch how FairSplit optimizes debts between three people.
          </p>
        </div>

        <div className="demo-layout">
          {/* Debts panel */}
          <div className="demo-panel glass">
            <h4 className="demo-panel-title">
              {optimized ? '✓ Optimized Settlement' : 'Input Debts'}
            </h4>

            <AnimatePresence mode="wait">
              {!optimized ? (
                <motion.div
                  key="input"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  {initialDebts.map((d, i) => (
                    <div key={i} className="debt-row">
                      <span className="debt-from">{d.from}</span>
                      <span className="debt-arrow">→</span>
                      <span className="debt-to">{d.to}</span>
                      <span className="debt-amount">₹{d.amount}</span>
                    </div>
                  ))}
                  <p className="debt-total">3 transactions needed</p>
                </motion.div>
              ) : (
                <motion.div
                  key="output"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  {optimizedResult.map((d, i) => (
                    <div key={i} className="debt-row debt-row-opt">
                      <span className="debt-from">{d.from}</span>
                      <span className="debt-arrow">→</span>
                      <span className="debt-to">{d.to}</span>
                      <span className="debt-amount">₹{d.amount}</span>
                    </div>
                  ))}
                  <p className="debt-total debt-total-opt">
                    Only 2 transactions! <span className="savings-badge">33% saved</span>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="demo-buttons">
              {!optimized ? (
                <button className="btn-primary" onClick={handleOptimize}>
                  ⚡ Optimize
                </button>
              ) : (
                <button className="btn-secondary" onClick={handleReset}>
                  ↺ Reset
                </button>
              )}
            </div>
          </div>

          {/* Graph */}
          <div className="demo-graph">
            <NetworkGraph
              nodes={demoNodes}
              edges={messyEdges}
              optimizedEdges={optEdges}
              optimized={optimized}
              width={480}
              height={380}
            />
          </div>
        </div>
      </div>

      <style>{`
        .demo-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
          max-width: 1000px;
          margin: 0 auto;
        }
        .demo-panel {
          padding: 2rem;
          border-radius: 20px;
        }
        .demo-panel-title {
          font-size: 1.05rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: var(--accent);
        }
        .debt-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.8rem 1rem;
          margin-bottom: 0.5rem;
          background: rgba(148,163,184,0.04);
          border: 1px solid var(--border-subtle);
          border-radius: 12px;
          font-size: 0.9rem;
        }
        .debt-row-opt {
          border-color: rgba(74,201,160,0.3);
          background: rgba(74,201,160,0.06);
        }
        .debt-from {
          font-family: var(--font-body);
          font-weight: 600;
          color: var(--accent-secondary);
          min-width: 50px;
        }
        .debt-arrow {
          color: var(--text-secondary);
        }
        .debt-to {
          font-weight: 600;
          flex: 1;
        }
        .debt-amount {
          font-family: var(--font-mono);
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .debt-total {
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-top: 1rem;
        }
        .debt-total-opt {
          color: var(--accent-secondary);
        }
        .savings-badge {
          display: inline-block;
          padding: 0.2rem 0.65rem;
          background: rgba(74,201,160,0.15);
          border: 1px solid rgba(74,201,160,0.3);
          border-radius: 999px;
          font-size: 0.65rem;
          font-family: var(--font-mono);
          font-weight: 600;
          letter-spacing: 0.05em;
          margin-left: 0.5rem;
          color: var(--accent-secondary);
        }
        .demo-buttons {
          margin-top: 1.5rem;
        }
        .demo-graph {
          display: flex;
          justify-content: center;
        }
        @media (max-width: 868px) {
          .demo-layout { grid-template-columns: 1fr; }
          .demo-graph { margin-top: 1rem; }
        }
      `}</style>
    </section>
  )
}
