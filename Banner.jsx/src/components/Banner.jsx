import { Play } from 'lucide-react'

export default function Banner() {
  return (
    <div className="relative h-80 rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-r from-purple-900 to-black dynamic-banner">
      <div className="absolute inset-0 bg-black/40 z-10" />
      
      {/* Fallback de background futurista caso não encontre imagem */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/20 via-purple-500/10 to-transparent" />

      <div className="absolute bottom-0 left-0 p-10 z-20 max-w-xl">
        <span className="bg-cyan-500 text-black text-xs font-black px-3 py-1 rounded-md uppercase tracking-widest">
          DESTAQUE DA SEMANA
        </span>
        <h1 className="text-4xl font-black mt-3 text-white tracking-tight drop-shadow-md">
          The King of Fighters 2002
        </h1>
        <p className="text-gray-300 mt-2 text-sm leading-relaxed">
          O auge das lutas em equipe 3v3 está de volta. Escolha seu time e domine o modo arcade clássico com baixa latência.
        </p>
        
        <button className="mt-5 bg-white text-black font-bold px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-cyan-400 hover:text-black transition-all transform hover:scale-105 active:scale-95 shadow-lg">
          <Play fill="black" size={16} /> JOGAR AGORA
        </button>
      </div>
    </div>
  )
}
