import HeroSection from '../components/landing/HeroSection'
import ProblemSection from '../components/landing/ProblemSection'
import SmartSettlementSection from '../components/landing/SmartSettlementSection'
import TrustScoreSection from '../components/features/TrustScoreSection'
import SpendingInsightsSection from '../components/features/SpendingInsightsSection'
import BudgetGuardrailsSection from '../components/features/BudgetGuardrailsSection'
import HowItWorksSection from '../components/landing/HowItWorksSection'
import InteractiveDemoSection from '../components/landing/InteractiveDemoSection'
import CTASection from '../components/landing/CTASection'

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <div className="global-bg-wrapper">
        <div className="global-bg-fixed">
          <div className="global-grid" />
          <div className="global-radial" />
          <div className="global-radial-2" />
        </div>
        <ProblemSection />
        <SmartSettlementSection />
        <TrustScoreSection />
        <SpendingInsightsSection />
        <BudgetGuardrailsSection />
        <HowItWorksSection />
        <InteractiveDemoSection />
        <CTASection />
      </div>
    </>
  )
}
