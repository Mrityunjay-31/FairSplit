import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { GroupProvider } from './context/GroupContext'

import LandingLayout from './layouts/LandingLayout'
import AppLayout from './layouts/AppLayout'

/* ── Lazy-loaded pages ── */
const LandingPage     = lazy(() => import('./pages/LandingPage'))
const DashboardPage   = lazy(() => import('./pages/DashboardPage'))
const GroupDetailPage  = lazy(() => import('./pages/GroupDetailPage'))
const CreateGroupPage  = lazy(() => import('./pages/CreateGroupPage'))
const SettlementsPage  = lazy(() => import('./pages/SettlementsPage'))
const ProfilePage     = lazy(() => import('./pages/ProfilePage'))
const InsightsPage    = lazy(() => import('./pages/InsightsPage'))

/* ── Loading fallback ── */
function PageLoader() {
  return (
    <div className="page-loader">
      <div className="loader-spinner" />
      <style>{`
        .page-loader {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 60vh;
        }
        .loader-spinner {
          width: 36px;
          height: 36px;
          border: 3px solid rgba(232, 230, 225, 0.08);
          border-top-color: var(--accent);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default function App() {
  return (
    <GroupProvider>
      <AnimatePresence mode="wait">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* ── Marketing / Landing ── */}
            <Route element={<LandingLayout />}>
              <Route path="/" element={<LandingPage />} />
            </Route>

            {/* ── App Pages ── */}
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/group/create" element={<CreateGroupPage />} />
              <Route path="/group/:id" element={<GroupDetailPage />} />
              <Route path="/settlements" element={<SettlementsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/insights" element={<InsightsPage />} />
            </Route>
          </Routes>
        </Suspense>
      </AnimatePresence>
    </GroupProvider>
  )
}
