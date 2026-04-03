import { motion } from 'framer-motion'
import ParticleBackground from '../shared/ParticleBackground'
import Footer from '../shared/Footer'

export default function CTASection() {
  return (
    <section id="cta" className="section cta-section">
      <ParticleBackground count={50} color="#C9974A" opacity={0.25} />

      <div className="section-container cta-content">
        <motion.div
          className="cta-inner"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-label">Get Started</span>
          <h2 className="cta-title">
            Start splitting smarter <span className="gradient-text">today</span>
          </h2>
          <p className="cta-subtitle">
            Join thousands of groups who've simplified their shared finances with SplitCredit.
          </p>
          <div className="cta-buttons">
            <button className="btn-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Google
            </button>
            <button className="btn-secondary">Create your first group</button>
          </div>
        </motion.div>
      </div>

      <Footer />

      <style>{`
        .cta-section {
          text-align: center;
          padding-bottom: 0;
        }
        .cta-content {
          position: relative;
          z-index: 2;
        }
        .cta-inner {
          max-width: 640px;
          margin: 0 auto;
        }
        .cta-title {
          font-family: var(--font-heading);
          font-size: clamp(3.5rem, 6vw, 5rem);
          font-weight: 400;
          line-height: 0.95;
          letter-spacing: 0.01em;
          margin-bottom: 1.25rem;
        }
        .cta-subtitle {
          font-size: 1.15rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 2.5rem;
        }
        .cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 4rem;
        }
      `}</style>
    </section>
  )
}
