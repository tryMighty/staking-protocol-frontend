import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import VideoBackground from './components/VideoBackground'
import Preloader from './components/Preloader'
import ConnectWallet from './pages/ConnectWallet'
import Dashboard from './pages/Dashboard'

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(20) // Start at 20% for initial script execution

  useEffect(() => {
    const handleLoad = () => {
      // Small artificial boost to 30% when window finishes loading
      setLoadingProgress(prev => Math.max(prev, 30))
    }

    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
      
      // Safety timeout: If the video takes too long (e.g., 5s), force resolve loading
      const safetyTimeout = setTimeout(() => {
        setIsVideoLoaded(true)
        setLoadingProgress(100)
        setIsAppReady(true)
      }, 5000)

      return () => {
        window.removeEventListener('load', handleLoad)
        clearTimeout(safetyTimeout)
      }
    }
  }, [])

  const handleVideoProgress = (percent: number) => {
    // Map 0-100% video progress to 30-100% of the loading bar
    const total = 30 + (percent * 0.7)
    setLoadingProgress(Math.floor(total))
  }

  return (
    <>
      {/* High-end Celestial Preloader */}
      <Preloader isReady={isVideoLoaded} forcedProgress={loadingProgress} />

      {/* Global video background — fixed, behind everything */}
      <VideoBackground 
        onLoaded={() => {
          setIsVideoLoaded(true)
          setLoadingProgress(100)
          setIsAppReady(true)
        }} 
        onProgress={handleVideoProgress}
      />

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
