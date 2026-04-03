import { NavLink, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import splitCreditLogo from '../../assets/logo.png'

const appLinks = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Settlements', to: '/settlements' },
  { label: 'Insights', to: '/insights' },
]

const userLinks = [
  { label: 'Profile', to: '/profile' },
]

export default function AppNavbar() {
  return (
    <motion.nav
      className="app-navbar"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="app-nav-inner">
        <Link to="/" className="app-nav-brand">
          <img src={splitCreditLogo} alt="SplitCredit" className="app-nav-logo" />
        </Link>

        <div className="app-nav-links">
          {appLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `app-nav-link ${isActive ? 'active' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="app-nav-right">
          <Link to="/expense/add" className="btn-primary app-nav-add">
            + Add Expense
          </Link>
          {userLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `app-nav-link ${isActive ? 'active' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>

      <style>{`
        .app-navbar {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(6, 8, 16, 0.92);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border-subtle);
          padding: 0 2rem;
        }
        .app-nav-inner {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
        }
        .app-nav-brand {
          display: flex;
          align-items: center;
          text-decoration: none;
          position: relative;
          width: 180px;
          height: 40px;
        }
        .app-nav-logo {
          position: absolute;
          left: -100px;
          top: 50%;
          transform: translateY(-50%) scale(2.8) !important;
          transform-origin: center center !important;
          width: 220px !important;
          max-width: none !important;
          height: 48px !important;
          object-fit: contain !important;
          display: block !important;
        }
        .app-nav-links {
          display: flex;
          gap: 0.25rem;
        }
        .app-nav-link {
          text-decoration: none;
          color: var(--text-secondary);
          font-size: 0.875rem;
          font-weight: 500;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          transition: all 0.2s ease;
        }
        .app-nav-link:hover {
          color: var(--text-primary);
          background: rgba(232, 230, 225, 0.04);
        }
        .app-nav-link.active {
          color: var(--accent);
          background: rgba(201, 151, 74, 0.08);
        }
        .app-nav-right {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .app-nav-add {
          padding: 0.5rem 1.2rem;
          font-size: 0.82rem;
          text-decoration: none;
        }
        @media (max-width: 768px) {
          .app-nav-links { display: none; }
          .app-nav-add { display: none; }
        }
      `}</style>
    </motion.nav>
  )
}
