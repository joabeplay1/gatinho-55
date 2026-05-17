// src/components/GameCard.jsx
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'

export default function GameCard({ title, system, image }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="group relative bg-white/5 rounded-2xl overflow-hidden border border-white/10 cursor-pointer backdrop-blur-sm transition-colors hover:border-neonBlue/50"
    >
      {/* Imagem de Capa */}
      <img
        src={image}
        alt={title}
        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
      />

      {/* Overlay com botão de Play (Aparece no Hover) */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <div className="bg-neonBlue/20 p-4 rounded-full text-neonBlue border border-neonBlue/50 backdrop-blur-md">
          <Play size={32} className="ml-1" fill="currentColor" />
        </div>
      </div>

      {/* Informações do Jogo */}
      <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-darkBg via-darkBg/90 to-transparent">
        <h2 className="font-bold text-lg text-white truncate shadow-sm">
          {title}
        </h2>
        <p className="text-neonPurple text-sm font-medium tracking-wide">
          {system}
        </p>
      </div>
    </motion.div>
  )
}
