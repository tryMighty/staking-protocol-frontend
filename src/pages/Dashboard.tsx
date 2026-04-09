import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function TickingNumber({ value }: { value: string }) {
  const [displayValue, setDisplayValue] = useState('')
  
  useEffect(() => {
    // Extract numbers and non-numbers
    const numericPart = value.replace(/[^0-9.]/g, '')
    const prefix = value.match(/^[^0-9]*/)?.[0] || ''
    const suffix = value.match(/[0-9.]*([^0-9.]*)$/)?.[1] || ''
    
    if (!numericPart) {
      setDisplayValue(value)
      return
    }

    const end = parseFloat(numericPart)
    const duration = 1200 // 1.2 seconds
    const startTimestamp = performance.now()
    
    const animate = (now: number) => {
      const elapsed = now - startTimestamp
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function: easeOutExpo
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      
      const current = end * easedProgress
      
      // Formatting
      let formatted = current.toLocaleString(undefined, {
        minimumFractionDigits: numericPart.includes('.') ? 1 : 0,
        maximumFractionDigits: numericPart.includes('.') ? 1 : 0,
      })
      
      setDisplayValue(`${prefix}${formatted}${suffix}`)
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    requestAnimationFrame(animate)
  }, [value])

  return <span>{displayValue}</span>
}

/* ─────────────────────────────────────────────────────────
 * REUSABLE SUB-COMPONENTS 
 * Application of react-patterns: Split smaller, Props down
 * ───────────────────────────────────────────────────────── */

function SidebarItem({ icon, label, isActive }: { icon: string; label: string; isActive?: boolean }) {
  if (isActive) {
    return (
      <button className="w-full flex items-center gap-3 px-4 py-3.5 text-primary bg-primary/10 rounded-xl transition-all duration-300 font-semibold glow-soft">
        <span className="material-symbols-outlined text-xl">{icon}</span>
        <span className="text-sm">{label}</span>
      </button>
    )
  }
  return (
    <button className="w-full flex items-center gap-3 px-4 py-3.5 text-on-surface-variant hover:text-primary transition-colors duration-300 font-medium group">
      <span className="material-symbols-outlined text-xl group-hover:text-primary">{icon}</span>
      <span className="text-sm">{label}</span>
    </button>
  )
}

function Sidebar() {
  return (
    <aside className="hidden md:flex w-[280px] h-full flex-col p-6 space-y-2 glass-item rounded-[1.75rem] relative overflow-hidden noise-bg">
      <div className="px-2 py-6 mb-8 text-left">
        <h1 className="font-headline text-xl font-black text-on-surface tracking-[0.2em] uppercase">Celestial</h1>
        <p className="text-on-surface-variant text-[10px] mt-1.5 tracking-widest font-semibold uppercase">Private Banking Terminal</p>
      </div>
      <nav className="flex-1 space-y-1.5 flex flex-col">
        <SidebarItem icon="account_balance" label="Stake" isActive />
        <SidebarItem icon="logout" label="Unstake" />
        <SidebarItem icon="payments" label="Claim" />
      </nav>
    </aside>
  )
}

function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-6 left-6 right-6 z-50 glass-item rounded-2xl p-2 flex justify-around items-center noise-bg border-shimmer">
      <button className="flex flex-col items-center p-2 text-primary">
        <span className="material-symbols-outlined text-2xl">account_balance</span>
        <span className="text-[10px] font-bold uppercase tracking-tighter mt-1">Stake</span>
      </button>
      <button className="flex flex-col items-center p-2 text-on-surface-variant">
        <span className="material-symbols-outlined text-2xl">logout</span>
        <span className="text-[10px] font-bold uppercase tracking-tighter mt-1">Unstake</span>
      </button>
      <button className="flex flex-col items-center p-2 text-on-surface-variant">
        <span className="material-symbols-outlined text-2xl">payments</span>
        <span className="text-[10px] font-bold uppercase tracking-tighter mt-1">Claim</span>
      </button>
    </nav>
  )
}

function HeaderBar() {
  return (
    <header className="flex justify-between items-center w-full px-8 py-5 glass-item rounded-2xl mb-4">
      <div className="flex items-center gap-4">
        <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_12px_rgba(57,255,106,0.8)]"></div>
        <span className="font-headline text-base font-bold tracking-tight text-on-surface">Luminous Ledger</span>
      </div>
      <div className="flex items-center">
        <Link to="/" className="glass-item px-5 py-2.5 rounded-full flex items-center gap-3 group hover:border-primary/25 transition-colors bouncy-tap">
          <span className="material-symbols-outlined text-on-surface-variant text-base group-hover:text-primary transition-colors">account_balance_wallet</span>
          <span className="font-mono text-[11px] text-on-surface-variant tracking-widest font-medium group-hover:text-on-surface transition-colors">0x71C...4e2</span>
        </Link>
      </div>
    </header>
  )
}

// Reusable Metric Display
function MetricCard({ 
  title, 
  titleLabel, 
  value, 
  iconElement, 
  subLabel 
}: { 
  title: string; 
  titleLabel: string; 
  value: string | React.ReactNode; 
  iconElement?: React.ReactNode; 
  subLabel?: React.ReactNode; 
}) {
  return (
    <div className="w-full glass-item rounded-[2.5rem] p-6 sm:p-8 lg:p-10 flex flex-col justify-between group transition-all duration-500 relative overflow-hidden noise-bg glass-reflection border-shimmer">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/[0.04] to-transparent pointer-events-none"></div>
      <div className="flex justify-between items-start relative z-10 w-full">
        <div>
          <p className="text-label mb-2">{titleLabel}</p>
          <h2 className="text-xl lg:text-3xl font-headline font-extrabold text-white tracking-tight leading-tight">{title}</h2>
        </div>
        {iconElement && (
          <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 shrink-0 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 transition-colors">
            {iconElement}
          </div>
        )}
      </div>
      <div className="relative z-10 mt-4 sm:mt-6 text-value">
        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-headline font-black tracking-tighter">
          {typeof value === 'string' ? <TickingNumber value={value} /> : value}
        </div>
        <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-3">
          {subLabel}
        </div>
      </div>
    </div>
  )
}

// User Action Component
function ActionPanel() {
  return (
    <div className="w-full glass-item rounded-[2.5rem] p-6 sm:p-8 lg:p-10 flex flex-col justify-between group transition-all duration-500 noise-bg glass-reflection border-shimmer">
      <div>
        <p className="text-label mb-2">Your Position</p>
        <h2 className="text-xl font-headline font-bold text-white tracking-tight">Current Staked</h2>
      </div>
      <div className="my-6">
        <div className="flex items-baseline gap-3 text-value">
          <span className="text-4xl lg:text-5xl font-headline font-black tracking-tight">420.69</span>
          <span className="text-subtitle font-bold text-sm uppercase tracking-widest">Tokens</span>
        </div>
        <p className="text-primary font-medium mt-3 tracking-wide text-sm">≈ $14,284.12 USD Market Value</p>
      </div>
      <div className="flex gap-4 mt-auto">
        <button className="flex-1 py-4 bg-primary/5 rounded-2xl text-[11px] font-black text-primary border border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all uppercase tracking-[0.2em] bouncy-tap">
          Harvest
        </button>
        <button className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-primary to-primary-container text-on-primary-fixed font-bold text-[11px] tracking-[0.2em] uppercase shadow-[0px_8px_32px_rgba(57,255,106,0.25)] hover:shadow-[0px_12px_48px_rgba(57,255,106,0.45)] transition-all duration-300 bouncy-tap">
          Stake More
        </button>
      </div>
    </div>
  )
}

// Inventory Component
function InventoryPanel() {
  return (
    <div className="w-full glass-item rounded-[2.5rem] p-6 sm:p-8 lg:p-10 flex flex-col justify-between group transition-all duration-500 noise-bg glass-reflection border-shimmer">
      <div>
        <p className="text-label mb-2">Wallet Inventory</p>
        <h2 className="text-xl font-headline font-bold text-white tracking-tight">Available Balance</h2>
      </div>
      <div className="flex flex-col mt-6 flex-1">
        <div className="flex items-baseline gap-3 text-value">
          <span className="text-4xl lg:text-5xl font-headline font-black tracking-tight">1,500</span>
          <span className="text-subtitle font-bold text-sm uppercase tracking-widest">Tokens</span>
        </div>
        
        <div className="mt-auto pt-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2.5">
              <div className="w-10 h-10 rounded-full border-2 border-[#132f1a] bg-primary/20 overflow-hidden shadow-sm">
                <img alt="Token" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKUyXeOkUs2b4hHCW1xc2Nxifct9AWD6nPS2vKhQZ17kY28VRazylT8BzygiWdxDXHAEyxuZzaPsu40CIlR-a2qAk6GucwFfsOu6NHgCvUdCC77NVJVKQ3HTntwAvQYTaELB4glxDLob0ip18jdMw5G3aWzxKgEkA8NVjsZRxAcad0xtnmN2AdeGsns2w_N2WANAujLcT6IrMaYflSbkKjuYSsFqjJpLnWplxBBBtKckxmEysP6N3ke8kVDs_pK-y9qAx8JcaA3Gk" />
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-[#132f1a] bg-primary/30 flex items-center justify-center backdrop-blur-md">
                <span className="text-[10px] font-black text-white">+2</span>
              </div>
            </div>
            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] opacity-90">Verified Assets Only</span>
          </div>
        </div>
      </div>
    </div>
  )
}


export default function Dashboard() {
  return (
    <div className="flex items-center justify-center min-h-screen p-6 font-body text-on-surface selection:bg-primary/30">
      
      {/* Visual Accents — Shared subtle neon green overlays */}
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-primary/[0.03] blur-[150px] rounded-full pointer-events-none -translate-x-1/2 translate-y-1/2 z-0"></div>
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-primary/[0.03] blur-[180px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3 z-0"></div>
      
      {/* Orchestrated Application Container */}
      <main className="w-full max-w-7xl h-auto lg:h-[calc(100vh-5rem)] lg:max-h-[880px] flex flex-col md:flex-row gap-4 glass-box rounded-[2.5rem] p-3 md:p-4 shadow-2xl relative z-10 transition-all noise-bg glass-reflection border-shimmer mb-24 md:mb-0">
        
        {/* Subtle inner neon glow at top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent pointer-events-none" />

        <Sidebar />
        <MobileNav />

        <section className="flex-1 flex flex-col h-full overflow-hidden">
          <HeaderBar />

          {/* Grid applying tailwind-patterns container query responsiveness */}
          <div className="grid grid-cols-12 gap-4 flex-1 h-full overflow-y-auto custom-scrollbar pb-2 pr-2">
            
            <div className="col-span-full md:col-span-7 xl:col-span-8 flex animate-fade-in-up delay-100">
              <MetricCard 
                title="Total Staked in Pool"
                titleLabel="Vault Liquidity"
                value="$1,250,000,000"
                iconElement={<span className="material-symbols-outlined text-primary text-3xl">monetization_on</span>}
                subLabel={
                  <>
                    <span className="text-primary font-bold text-sm bg-primary/10 border border-primary/25 px-2 py-0.5 rounded">+2.4%</span>
                    <span className="text-subtitle text-xs font-medium uppercase tracking-widest">past 24h performance</span>
                  </>
                }
              />
            </div>

            <div className="col-span-full md:col-span-5 xl:col-span-4 flex animate-fade-in-up delay-200">
              <MetricCard 
                title="Current APY"
                titleLabel="Performance"
                value={<span className="text-primary glow-soft">12.4%</span>}
                subLabel={
                  <>
                    <span className="px-3 py-1.5 rounded-lg bg-primary/20 text-primary text-[10px] font-black tracking-[0.1em] border border-primary/40 uppercase">Estimated</span>
                    <span className="px-3 py-1.5 rounded-lg bg-primary/10 text-subtitle text-[10px] font-black tracking-[0.1em] border border-primary/20 uppercase">Auto-Compound</span>
                  </>
                }
              />
            </div>
            
            {/* Bottom Row - Aligned with same 8:4 ratio as shown in screenshot pairs */}
            <div className="col-span-full md:col-span-7 xl:col-span-8 flex animate-fade-in-up delay-300">
              <ActionPanel />
            </div>
            <div className="col-span-full md:col-span-5 xl:col-span-4 flex animate-fade-in-up delay-300">
              <InventoryPanel />
            </div>
            
          </div>
        </section>
      </main>
    </div>
  )
}
