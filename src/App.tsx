import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import VideoBackground from './components/VideoBackground'
import Preloader from './components/Preloader'
import ConnectWallet from './pages/ConnectWallet'
import Dashboard from './pages/Dashboard'

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  useEffect(() => {
    // Listen for the global window load event
    const handleLoad = () => {
      // Small artificial delay to ensure the preloader animation finishes smoothly
      setTimeout(() => {
        setIsAppReady(true)
      }, 500)
    }

    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
      return () => window.removeEventListener('load', handleLoad)
    }
  }, [])

  return (
    <>
      {/* High-end Celestial Preloader */}
      <Preloader isReady={isVideoLoaded} />

      {/* Global video background — fixed, behind everything */}
      <VideoBackground onLoaded={() => setIsVideoLoaded(true)} />

      {/* Main page content container */}
      <div 
        className={`relative min-h-screen transition-opacity duration-1000 ${isAppReady ? 'opacity-100' : 'opacity-0'}`}
      >
        <Routes>
          <Route path="/" element={<ConnectWallet />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  )
}
