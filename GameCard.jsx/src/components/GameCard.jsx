import { motion } from 'framer-motion'

export default function GameCard({ title, system, image }) {
  // Imagem mock padrão caso esteja sem capa configurada
  const defaultImage = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100 font-size='12' fill='%23333'><rect width='100%25' height='100%25' fill='%231e293b'/><text x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%2364748b'>SEM CAPA</text></svg>"

  return (
    <motion.div
      whileHover={{ scale: 1.04, y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="bg-white/[0.03] rounded-2xl overflow-hidden border border-white/5 hover:border-cyan-500/50 cursor-pointer shadow-xl transition-colors group"
    >
      <div className="w-full h-56 bg-slate-800 overflow-hidden relative">
        <img
          src={image || defaultImage}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => { e.target.src = defaultImage }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
          <span className="text-xs text-cyan-400 font-mono tracking-widest">PRESS START</span>
        </div>
      </div>

      <div className="p-4">
        <h2 className="font-bold text-sm text-white truncate group-hover:text-cyan-400 transition-colors">
          {title}
        </h2>
        <p className="text-gray-500 text-xs mt-1 font-mono uppercase tracking-wider">
          {system}
        </p>
      </div>
    </motion.div>
  )
}
