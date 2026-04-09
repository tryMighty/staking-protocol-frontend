import { useState, useEffect } from 'react'

export default function Preloader({ isReady, forcedProgress }: { isReady: boolean, forcedProgress?: number }) {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // If a forced progress is provided (real network data), use it
    if (forcedProgress !== undefined) {
      setProgress(forcedProgress)
      return
    }

    // Fallback artificial progress if no network tracking is active
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        // Random incremental steps for "authentic" feel
        return prev + Math.floor(Math.random() * 15) + 1
      })
    }, 150)

    // Complete loader ONLY when progress is 100 AND the video signal is received
    if (progress === 100 && isReady) {
      setTimeout(() => {
        setIsVisible(false)
      }, 500)
    }

    return () => clearInterval(interval)
  }, [progress, isReady, forcedProgress])

  if (!isVisible) return null

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#070e08] transition-opacity duration-1000 ${(progress === 100 && isReady) ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      {/* Background elements to match theme */}
      <div className="absolute inset-0 tech-grid opacity-20">
        <div className="scanner-line" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo / Title */}
        <div className="mb-8 sm:mb-12 text-center animate-pulse px-4">
          <h1 className="font-headline text-3xl sm:text-5xl font-black text-white tracking-[0.2em] sm:tracking-[0.3em] uppercase drop-shadow-[0_0_20px_rgba(57,255,106,0.5)] whitespace-nowrap">
            Celestial
          </h1>
          <p className="text-primary text-[9px] sm:text-xs mt-3 sm:mt-4 tracking-[0.3em] sm:tracking-[0.5em] uppercase font-bold opacity-80 whitespace-nowrap">
            Initializing Secure Terminal
          </p>
        </div>

        {/* Progress Container */}
        <div className="w-48 sm:w-64 h-1 bg-white/5 rounded-full overflow-hidden relative glass-item p-0 border-none">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300 ease-out shadow-[0_0_15px_rgba(57,255,106,0.6)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Status Text */}
        <div className="mt-6 flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 sm:gap-3 px-4 text-center">
            <span className="w-1.2 sm:w-1.5 h-1.2 sm:h-1.5 rounded-full bg-primary animate-ping shrink-0" />
            <span className="text-[8px] sm:text-[10px] font-mono text-primary/70 uppercase tracking-widest whitespace-nowrap">
              {progress < 30 && "Decrypting visual matrix..."}
              {progress >= 30 && progress < 60 && "Establishing uplink..."}
              {progress >= 60 && progress < 90 && "Calibrating terminal aesthetics..."}
              {progress >= 90 && !isReady && "Optimizing bandwidth for video stream..."}
              {progress >= 90 && isReady && "System ready. Transmitting..."}
            </span>
          </div>
          <span className="font-mono text-[8px] sm:text-[10px] text-white/40">{progress}% COMPLETE</span>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-12 text-on-surface-variant/30 text-[9px] uppercase tracking-[0.4em] font-bold">
        Celestial Protocol &copy; 2026
      </div>
    </div>
  )
}
