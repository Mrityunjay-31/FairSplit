import { Outlet } from 'react-router-dom'
import AppNavbar from '../components/nav/AppNavbar'
import Footer from '../components/shared/Footer'

/**
 * Layout for authenticated app pages (dashboard, groups, etc.).
 * Uses native browser scroll — no Lenis, no GSAP ScrollTrigger.
 */
export default function AppLayout() {
  return (
    <div className="app-layout">
      <AppNavbar />
      <main className="app-main">
        <Outlet />
      </main>
      <Footer />

      <style>{`
        .app-layout {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        .app-main {
          flex: 1;
          max-width: 1280px;
          width: 100%;
          margin: 0 auto;
          padding: 2rem 2.5rem;
        }
      `}</style>
    </div>
  )
}
