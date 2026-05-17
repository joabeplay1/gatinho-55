import { Home, Gamepad2, Settings, Users, Star } from 'lucide-react'

export default function Sidebar() {
  return (
    <div className="w-64 bg-black/20 backdrop-blur-2xl border-r border-white/5 p-6 flex flex-col justify-between h-full">
      <div>
        <div className="mb-10">
          <h1 className="text-2xl font-black tracking-wider bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            ARCADE<span className="text-white font-light text-sm block tracking-widest text-right">PREMIUM</span>
          </h1>
        </div>

        <nav className="space-y-2">
          <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500/10 to-transparent border-l-2 border-cyan-400 text-cyan-400 font-medium text-sm transition-all">
            <Home size={18} /> Início
          </button>

          <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 font-medium text-sm transition-all">
            <Gamepad2 size={18} /> Biblioteca
          </button>

          <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 font-medium text-sm transition-all">
            <Users size={18} /> Multiplayer
          </button>

          <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 font-medium text-sm transition-all">
            <Star size={18} /> Favoritos
          </button>
        </nav>
      </div>

      <div className="border-t border-white/5 pt-4">
        <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 font-medium text-sm transition-all">
          <Settings size={18} /> Configurações
        </button>
      </div>
    </div>
  )
}
