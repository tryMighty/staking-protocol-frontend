import { Routes, Route, Navigate } from 'react-router-dom'
import VideoBackground from './components/VideoBackground'
import ConnectWallet from './pages/ConnectWallet'
import Dashboard2 from './pages/Dashboard2'

export default function App() {
  return (
    <>
      {/* Global video background — fixed, behind everything */}
      <VideoBackground />

      {/* All page content sits above the video */}
      <div className="relative min-h-screen">
        <Routes>
          <Route path="/"          element={<ConnectWallet />} />
          <Route path="/dashboard-2" element={<Dashboard2 />} />
          <Route path="*"          element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  )
}
