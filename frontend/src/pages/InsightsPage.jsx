import PageTransition from '../components/shared/PageTransition'
import SpendingInsightsSection from '../components/features/SpendingInsightsSection'
import BudgetGuardrailsSection from '../components/features/BudgetGuardrailsSection'

export default function InsightsPage() {
  return (
    <PageTransition>
      <div className="ins">
        <h1 className="ins-title">Insights</h1>
        <p className="ins-subtitle">Track spending patterns, category breakdowns, and budget health.</p>

        {/* Reuse existing feature sections — they already have GSAP animations */}
        <div className="ins-section">
          <SpendingInsightsSection />
        </div>
        <div className="ins-section">
          <BudgetGuardrailsSection />
        </div>
      </div>

      <style>{`
        .ins-title {
          font-family: var(--font-heading);
          font-size: 3rem;
          letter-spacing: 0.02em;
          line-height: 1;
          margin-bottom: 0.4rem;
        }
        .ins-subtitle {
          color: var(--text-secondary);
          font-size: 1rem;
          margin-bottom: 1rem;
        }
        .ins-section {
          margin: 0 -2.5rem;
        }
      `}</style>
    </PageTransition>
  )
}
