import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Initialises Lenis smooth scroll and wires it to GSAP ScrollTrigger.
 * Only used on the Landing page to avoid polluting app pages.
 */
export default function useLenisScroll() {
  useEffect(() => {
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

    const resizeObserver = new ResizeObserver(() => ScrollTrigger.refresh())
    resizeObserver.observe(document.body)

    return () => {
      resizeObserver.disconnect()
      lenis.destroy()
    }
  }, [])
}
