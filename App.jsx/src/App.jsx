import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import TopBar from './components/TopBar'

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen overflow-hidden bg-[#0b0f19]">
        {/* Barra de controle superior (Fechar/Minimizar/Arrastar Janela) */}
        <TopBar />
        
        <div className="flex flex-1 overflow-hidden">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Outras rotas mapeadas futuramente aqui */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}
