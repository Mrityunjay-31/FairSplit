import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

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
    // Lenis Smooth Scroll Configuration
    const lenis = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 1.0,
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    // Ensure ScrollTrigger refreshes when DOM layout shifts (e.g. images loading)
    const resizeObserver = new ResizeObserver(() => ScrollTrigger.refresh())
    resizeObserver.observe(document.body)
    
    return () => {
      resizeObserver.disconnect()
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <Navbar />
      <main>
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
      </main>
    </>
  )
}
