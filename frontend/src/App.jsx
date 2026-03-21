import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import ProblemSection from './components/ProblemSection'
import SmartSettlementSection from './components/SmartSettlementSection'
import TrustScoreSection from './components/TrustScoreSection'
import SpendingInsightsSection from './components/SpendingInsightsSection'
import BudgetGuardrailsSection from './components/BudgetGuardrailsSection'
import HowItWorksSection from './components/HowItWorksSection'
import InteractiveDemoSection from './components/InteractiveDemoSection'
import CTASection from './components/CTASection'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    // Refresh ScrollTrigger after all sections mount
    const timeout = setTimeout(() => ScrollTrigger.refresh(), 500)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <SmartSettlementSection />
        <TrustScoreSection />
        <SpendingInsightsSection />
        <BudgetGuardrailsSection />
        <HowItWorksSection />
        <InteractiveDemoSection />
        <CTASection />
      </main>
    </>
  )
}
