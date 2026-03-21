import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const monthlyData = [
  { month: 'Jul', value: 65 },
  { month: 'Aug', value: 80 },
  { month: 'Sep', value: 55 },
  { month: 'Oct', value: 90 },
  { month: 'Nov', value: 70 },
  { month: 'Dec', value: 85 },
]

const categories = [
  { label: 'Food & Dining', pct: 38, color: '#00e89d' },
  { label: 'Travel', pct: 25, color: '#7c3aed' },
  { label: 'Entertainment', pct: 20, color: '#3b82f6' },
  { label: 'Shopping', pct: 17, color: '#f59e0b' },
]

export default function SpendingInsightsSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Bar chart animation
      gsap.from('.bar-fill', {
        scrollTrigger: {
          trigger: '.insights-charts',
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
        scaleY: 0,
        transformOrigin: 'bottom',
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
      })

      // Category bars
      gsap.from('.cat-bar-fill', {
        scrollTrigger: {
          trigger: '.category-chart',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        scaleX: 0,
        transformOrigin: 'left',
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
      })

      // Fade-in
      gsap.from('.insights-text > *', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="insights" className="section" ref={sectionRef}>
      <div className="section-container">
        <div className="insights-text" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="section-label">Analytics</span>
          <h2 className="section-title">
            See where your <span className="gradient-text">money goes</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Get detailed breakdowns of your shared spending — monthly trends, category insights,
            and data-driven suggestions.
          </p>
        </div>

        <div className="insights-charts">
          {/* Monthly bar chart */}
          <div className="chart-card glass">
            <h4 className="chart-title">Monthly Spending</h4>
            <div className="bar-chart">
              {monthlyData.map((d) => (
                <div key={d.month} className="bar-col">
                  <div className="bar-track">
                    <div
                      className="bar-fill"
                      style={{ height: `${d.value}%` }}
                    />
                  </div>
                  <span className="bar-label">{d.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Category breakdown */}
          <div className="chart-card glass category-chart">
            <h4 className="chart-title">Category Breakdown</h4>
            <div className="cat-list">
              {categories.map((c) => (
                <div key={c.label} className="cat-item">
                  <div className="cat-header">
                    <span className="cat-dot" style={{ background: c.color }} />
                    <span className="cat-name">{c.label}</span>
                    <span className="cat-pct">{c.pct}%</span>
                  </div>
                  <div className="cat-bar-track">
                    <div
                      className="cat-bar-fill"
                      style={{ width: `${c.pct}%`, background: c.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .insights-charts {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          max-width: 900px;
          margin: 0 auto;
        }
        .chart-card {
          padding: 2rem;
          border-radius: 20px;
        }
        .chart-title {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }
        /* Bar chart */
        .bar-chart {
          display: flex;
          align-items: flex-end;
          gap: 0.75rem;
          height: 180px;
        }
        .bar-col {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
        }
        .bar-track {
          flex: 1;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }
        .bar-fill {
          width: 100%;
          border-radius: 6px 6px 0 0;
          background: linear-gradient(to top, #7c3aed, #00e89d);
        }
        .bar-label {
          font-size: 0.7rem;
          color: var(--text-secondary);
          margin-top: 0.5rem;
        }
        /* Category chart */
        .cat-list { display: flex; flex-direction: column; gap: 1.25rem; }
        .cat-item { }
        .cat-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.4rem;
        }
        .cat-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .cat-name { font-size: 0.85rem; flex: 1; }
        .cat-pct {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .cat-bar-track {
          width: 100%;
          height: 8px;
          background: rgba(148,163,184,0.08);
          border-radius: 4px;
          overflow: hidden;
        }
        .cat-bar-fill {
          height: 100%;
          border-radius: 4px;
        }
        @media (max-width: 768px) {
          .insights-charts { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
