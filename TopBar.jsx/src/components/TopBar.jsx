import { Minus, X, Cpu } from 'lucide-react'

export default function TopBar() {
  const handleMinimize = () => {
    if (window.electronAPI) window.electronAPI.minimizeApp()
  }

  const handleClose = () => {
    if (window.electronAPI) window.electronAPI.closeApp()
  }

  return (
    <div className="h-10 bg-black/60 border-b border-white/5 flex items-center justify-between px-4" style={{ WebkitAppRegion: 'drag' }}>
      <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs">
        <Cpu size={14} className="animate-pulse" />
        <span>ARCADE LAUNCHER PREMIUM // ENGINE SYSTEM ACTIVE</span>
      </div>
      
      <div className="flex items-center gap-1" style={{ WebkitAppRegion: 'no-drag' }}>
        <button onClick={handleMinimize} className="p-1.5 hover:bg-white/10 rounded text-gray-400 hover:text-white transition">
          <Minus size={14} />
        </button>
        <button onClick={handleClose} className="p-1.5 hover:bg-red-500/80 rounded text-gray-400 hover:text-white transition">
          <X size={14} />
        </button>
      </div>
    </div>
  )
}
