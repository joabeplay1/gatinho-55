import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Banner from '../components/Banner'
import GameCard from '../components/GameCard'

export default function Home() {
  const [games, setGames] = useState([
    { id: 1, title: "The King of Fighters 2002", system: "Neo Geo" },
    { id: 2, title: "Metal Slug X", system: "Neo Geo" },
    { id: 3, title: "Cadillacs and Dinosaurs", system: "MAME" },
    { id: 4, title: "Garou: Mark of the Wolves", system: "Neo Geo" },
    { id: 5, title: "Street Fighter II Turbo", system: "MAME" }
  ])

  useEffect(() => {
    // Exemplo de chamada nativa segura ao carregar a home para atualizar a lista
    if (window.electronAPI) {
      window.electronAPI.scanRoms('neogeo').then(roms => {
        console.log("Roms de NeoGeo localizadas fisicamente:", roms)
      })
    }
  }, [])

  return (
    <div className="flex flex-1 bg-[#0b0f19] text-white overflow-hidden h-full">
      <Sidebar />

      <div className="flex-1 p-8 overflow-y-auto h-full">
        <Banner />

        <div className="mt-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
              <span className="w-2 h-6 bg-cyan-400 rounded-full inline-block"></span>
              JOGOS DISPONÍVEIS
            </h2>
            <span className="text-xs font-mono text-gray-500">{games.length} JOGOS CARREGADOS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {games.map(game => (
              <GameCard 
                key={game.id} 
                title={game.title} 
                system={game.system} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
