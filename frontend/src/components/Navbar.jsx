import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const navLinks = [
  { label: 'Problem', href: '#problem' },
  { label: 'Algorithm', href: '#settlement' },
  { label: 'Features', href: '#trust' },
  { label: 'Demo', href: '#demo' },
]

export default function Navbar() {
  const navRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        if (window.scrollY > 50) {
          navRef.current.classList.add('nav-scrolled')
        } else {
          navRef.current.classList.remove('nav-scrolled')
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      ref={navRef}
      className="navbar"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="nav-inner">
        <a href="#" className="nav-logo">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="13" stroke="var(--accent)" strokeWidth="2" />
            <path d="M9 14L13 18L19 10" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>FairSplit</span>
        </a>

        <div className="nav-links">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </div>

        <a href="#cta" className="btn-primary nav-cta">
          Get Started
        </a>
      </div>

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          padding: 1rem 2rem;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .nav-scrolled {
          background: rgba(5, 10, 24, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border-subtle);
          padding: 0.7rem 2rem;
        }
        .nav-inner {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          text-decoration: none;
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.02em;
        }
        .nav-links {
          display: flex;
          gap: 2rem;
        }
        .nav-link {
          text-decoration: none;
          color: var(--text-secondary);
          font-size: 0.9rem;
          font-weight: 500;
          transition: color 0.25s;
        }
        .nav-link:hover { color: var(--accent); }
        .nav-cta {
          padding: 0.625rem 1.5rem;
          font-size: 0.875rem;
          text-decoration: none;
        }
        @media (max-width: 768px) {
          .nav-links { display: none; }
        }
      `}</style>
    </motion.nav>
  )
}
