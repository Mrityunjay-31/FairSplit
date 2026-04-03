export default function Footer() {
  return (
    <footer className="footer">
      <div className="section-container footer-inner">
        <p className="footer-brand">
          <svg width="20" height="20" viewBox="0 0 28 28" fill="none" style={{ verticalAlign: 'middle', marginRight: '0.4rem' }}>
            <circle cx="14" cy="14" r="13" stroke="var(--accent)" strokeWidth="2" />
            <path d="M9 14L13 18L19 10" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          SplitCredit
        </p>
        <p className="footer-copy">© 2026 SplitCredit. Split smarter, settle faster.</p>
      </div>

      <style>{`
        .footer {
          padding: 2rem 0;
          border-top: 1px solid var(--border-subtle);
        }
        .footer-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .footer-brand {
          font-weight: 700;
          font-size: 1rem;
        }
        .footer-copy {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }
        @media (max-width: 600px) {
          .footer-inner { flex-direction: column; gap: 0.5rem; text-align: center; }
        }
      `}</style>
    </footer>
  )
}
