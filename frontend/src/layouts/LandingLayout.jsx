import { Outlet } from 'react-router-dom'
import LandingNavbar from '../components/nav/LandingNavbar'
import useLenisScroll from '../hooks/useLenisScroll'

/**
 * Layout for the marketing / landing page.
 * Includes Lenis smooth scrolling & GSAP ticker — isolated from app pages.
 */
export default function LandingLayout() {
  useLenisScroll()

  return (
    <>
      <LandingNavbar />
      <main>
        <Outlet />
      </main>
    </>
  )
}
