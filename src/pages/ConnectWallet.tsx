import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

/* ── Wallet data ────────────────────────────────────── */
interface Wallet {
  id: string
  name: string
  subtitle: string
  icon: React.ReactNode
  badge?: { label: string; variant: 'recommended' | 'recent' | 'detected' }
  trailing?: React.ReactNode
}

function MetaMaskIcon() {
  return (
    <img
      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmF71UrtqwwZGc67awHfHpjS2IzAfJ_02t1LMb6SOW70Py4RExEBr-gk3HEG3BLF0_gqQnX6qTJ5dTv_O_7RbbLaeLTR4SaLWRvdCFt5azV_fidQPWGL1RAu6NCQE67UrVGKJ527zeFcdD2WD3Jz2clzCYxqjg7i8xqqFmRzusCakZ7IvtducPkAPQyglRONpFwYUC0F454qZVeBt6OzRX2VG5GQ1OIwjP_S0aSpXjQM0qA1I8YEEcGe2zBZEsBl_IuCh5ePfDyYE"
      alt="MetaMask"
      className="w-8 h-8"
    />
  )
}

function PhantomIcon() {
  return (
    <img
      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCU4R7TezTAcx_i2he1lVtltuBOmYcTNbCHuudV10PHM9mfN3x5IejqSdbneMaGf81GYripR9FNrtzKzS-l-gC6k1d0ngBqJRsYUQLXDMM8d6to3kA7oa9IY2x4MCj9a3QBqVVzmZo3Wv4T_kUv4Gc1LWX_wSVYzPVM6NBqDY8u6LlWfZhuNZrcOedjyG7ITYdTS3mvdKzJgm8tUKGeW6IpsL1N0MB1E8nplMOUyV8jSJ80HMOCEeT41GqgyYp7K6CJurGvamyKils"
      alt="Phantom"
      className="w-8 h-8"
    />
  )
}

const wallets: Wallet[] = [
  {
    id: 'metamask',
    name: 'MetaMask',
    subtitle: 'Browser Extension',
    icon: <MetaMaskIcon />,
    badge: { label: 'Recommended', variant: 'recommended' },
  },
  {
    id: 'phantom',
    name: 'Phantom',
    subtitle: 'Solana & Ethereum',
    icon: <PhantomIcon />,
    badge: { label: 'Recent', variant: 'recent' },
  },
  {
    id: 'walletconnect',
    name: 'WalletConnect',
    subtitle: 'Mobile Apps & Scan',
    icon: (
      <span className="material-symbols-outlined text-secondary text-3xl">
        account_balance_wallet
      </span>
    ),
    trailing: (
      <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">
        qr_code_2
      </span>
    ),
  },
  {
    id: 'ledger',
    name: 'Ledger',
    subtitle: 'Hardware Security',
    icon: (
      <span className="material-symbols-outlined text-on-surface text-3xl">
        terminal
      </span>
    ),
    badge: { label: 'Detected', variant: 'detected' },
  },
]

/* ── Badge ─────────────────────────────────────────── */
function Badge({ label, variant }: { label: string; variant: 'recommended' | 'recent' | 'detected' }) {
  if (variant === 'recommended') {
    return (
      <span className="px-3 py-1 bg-primary/10 border border-primary/25 text-primary text-[10px] font-bold uppercase tracking-widest rounded-full">
        {label}
      </span>
    )
  }
  if (variant === 'recent') {
    return (
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-tertiary" />
        <span className="text-[10px] font-bold text-tertiary uppercase tracking-widest">
          {label}
        </span>
      </div>
    )
  }
  // detected
  return (
    <span className="px-3 py-1 bg-primary/5 border border-primary/15 text-on-surface-variant text-[10px] font-bold uppercase tracking-widest rounded-full">
      {label}
    </span>
  )
}

/* ── Wallet card ────────────────────────────────────── */
function WalletCard({ wallet, onClick, isConnecting }: { wallet: Wallet; onClick: () => void; isConnecting: boolean }) {
  return (
    <div className={`relative group cursor-pointer bouncy-tap transition-all duration-300 ${isConnecting ? 'opacity-50 pointer-events-none scale-[0.98]' : ''}`} onClick={onClick}>
      {/* Neon glow — only for MetaMask (recommended) */}
      {wallet.badge?.variant === 'recommended' && !isConnecting && (
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
      <div className={`relative flex items-center justify-between p-5 glass-item rounded-2xl ${isConnecting ? 'animate-pulse border-primary/40' : ''}`}>
        {/* Left: icon + name */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center border border-primary/10">
            {isConnecting ? (
              <span className="material-symbols-outlined animate-spin text-primary">sync</span>
            ) : wallet.icon}
          </div>
          <div>
            <span className="font-headline font-bold text-on-surface block">
              {isConnecting ? 'Connecting...' : wallet.name}
            </span>
            <span className="text-xs text-on-surface-variant font-medium">
              {isConnecting ? 'Establishing celestial link' : wallet.subtitle}
            </span>
          </div>
        </div>
        {/* Right */}
        {!isConnecting && (
          wallet.badge ? (
            <Badge label={wallet.badge.label} variant={wallet.badge.variant} />
          ) : wallet.trailing
        )}
      </div>
    </div>
  )
}

/* ── Page ──────────────────────────────────────────── */
export default function ConnectWallet() {
  const navigate = useNavigate()
  const [connectingId, setConnectingId] = useState<string | null>(null)

  const handleConnect = (id: string) => {
    setConnectingId(id)
    // Artificial delay to show high-end connecting state
    setTimeout(() => {
      navigate('/dashboard')
    }, 1500)
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6 font-body selection:bg-primary/30">

      <div className="relative w-full max-w-md glass-box rounded-[2.5rem] overflow-hidden animate-fade-in noise-bg glass-reflection border-shimmer">

        {/* Subtle inner neon glow at top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        {/* Top bar */}
        <header className="flex justify-between items-center px-8 pt-10 pb-4">
          <div>
            <h1 className="font-headline text-3xl font-extrabold tracking-tight text-on-surface">
              Connect Wallet
            </h1>
            <p className="text-on-surface-variant text-sm mt-1">
              Select your celestial key to access the vault
            </p>
          </div>
          <button
            className="w-10 h-10 flex items-center justify-center rounded-full glass-item text-on-surface-variant hover:text-primary transition-colors bouncy-tap"
            aria-label="Close"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </header>

        {/* Wallet list */}
        <div className="px-8 py-6 space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
          {wallets.map((wallet) => (
            <WalletCard
              key={wallet.id}
              wallet={wallet}
              isConnecting={connectingId === wallet.id}
              onClick={() => handleConnect(wallet.id)}
            />
          ))}
        </div>

        {/* Footer */}
        <footer className="p-8 space-y-6">
          {/* Terms + CTA box */}
          <div className="p-6 rounded-[2rem] glass-item relative overflow-hidden">
            {/* Inner neon line accent */}
            <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            <div className="relative flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 shrink-0 rounded-full bg-secondary/15 flex items-center justify-center mt-0.5">
                  <span
                    className="material-symbols-outlined text-secondary text-[14px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified
                  </span>
                </div>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  By connecting a wallet, you agree to the{' '}
                  <span className="text-primary font-semibold hover:underline cursor-pointer">
                    Terms of Service
                  </span>{' '}
                  and acknowledge our{' '}
                  <span className="text-primary font-semibold hover:underline cursor-pointer">
                    Privacy Policy
                  </span>
                  .
                </p>
              </div>
              {/* Primary CTA — neon green gradient */}
              <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-primary-container text-on-primary-fixed font-bold text-xs tracking-[0.2em] uppercase shadow-[0px_8px_32px_rgba(57,255,106,0.25)] hover:shadow-[0px_12px_48px_rgba(57,255,106,0.45)] transition-all duration-300 bouncy-tap flex items-center justify-center gap-2">
                Learn More
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Help link */}
          <div className="flex justify-center">
            <button className="text-on-surface-variant text-xs hover:text-primary transition-colors font-medium flex items-center gap-1.5 opacity-60 hover:opacity-100">
              <span className="material-symbols-outlined text-[16px]">help</span>
              I don't have a wallet
            </button>
          </div>
        </footer>
      </div>
    </main>
  )
}
