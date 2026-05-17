// src/pages/Library.jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Gamepad2 } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import GameCard from '../components/GameCard'

// Mock de dados temporário (até conectar o SQLite)
const MOCK_GAMES = [
  { id: 1, title: 'The King of Fighters 2002', system: 'Neo Geo', image: '/assets/covers/kof2002.jpg' },
  { id: 2, title: 'Metal Slug 3', system: 'Neo Geo', image: '/assets/covers/metalslug3.jpg' },
  { id: 3, title: 'Cadillacs and Dinosaurs', system: 'MAME', image: '/assets/covers/cadillacs.jpg' },
  { id: 4, title: 'Street Fighter Alpha 3', system: 'MAME', image: '/assets/covers/sfa3.jpg' },
  { id: 5, title: 'Samurai Shodown II', system: 'Neo Geo', image: '/assets/covers/samurai2.jpg' },
  { id: 6, title: 'Marvel vs Capcom', system: 'MAME', image: '/assets/covers/mvc.jpg' },
]

const CATEGORIES = ['Todos', 'Neo Geo', 'MAME', 'Favoritos']

export default function Library() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('Todos')

  // Lógica de filtro e busca
  const filteredGames = MOCK_GAMES.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeCategory === 'Todos' || game.system === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="flex bg-darkBg min-h-screen text-white overflow-hidden">
      <Sidebar />

      {/* Área Principal */}
      <div className="flex-1 p-8 overflow-y-auto relative">
        
        {/* Efeito de luz de fundo (Glow) */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-neonBlue/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

        {/* Cabeçalho da Biblioteca */}
        <header className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-extrabold flex items-center gap-3">
              <Gamepad2 size={36} className="text-neonPurple" />
              Sua Biblioteca
            </h1>
            <p className="text-gray-400 mt-2">
              {filteredGames.length} jogos encontrados
            </p>
          </div>

          {/* Barra de Pesquisa Glassmorphism */}
          <div className="relative w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar jogo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-6 text-white placeholder-gray-500 focus:outline-none focus:border-neonBlue focus:ring-1 focus:ring-neonBlue transition-all backdrop-blur-md"
            />
          </div>
        </header>

        {/* Filtros de Categoria */}
        <div className="flex gap-4 mb-8">
          <div className="flex items-center gap-2 text-gray-400 mr-2">
            <Filter size={20} />
            <span className="font-semibold">Filtrar:</span>
          </div>
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full border transition-all duration-300 font-medium ${
                activeCategory === category
                  ? 'bg-neonPurple/20 border-neonPurple text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]'
                  : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid de Jogos com Animação */}
        {filteredGames.length > 0 ? (
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {filteredGames.map((game) => (
              <GameCard 
                key={game.id}
                title={game.title}
                system={game.system}
                image={game.image}
              />
            ))}
          </motion.div>
        ) : (
          /* Estado Vazio (Nenhum jogo encontrado) */
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <Gamepad2 size={64} className="mb-4 opacity-20" />
            <h3 className="text-2xl font-bold text-gray-400">Nenhum jogo encontrado</h3>
            <p>Tente buscar por outro termo ou mude o filtro.</p>
          </div>
        )}
      </div>
    </div>
  )
}
