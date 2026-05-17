const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs')

// Inicializadores simulando os serviços de backend locais
const scanRoms = require('./src/services/romScanner')
require('./src/database/initDatabase')

function createWindow() {
  const win = new BrowserWindow({
    width: 1600,
    height: 900,
    frame: false, 
    transparent: false, // Alterado para false para evitar bugs visuais de renderização de hardware no Windows
    backgroundColor: '#0b0f19',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  // Em desenvolvimento usa o servidor do Vite, em produção usaria o build estático
  win.loadURL('http://localhost:5173')
  
  // Remove a barra de menus padrão
  win.setMenu(null)
}

// Handler IPC para Escaneamento de ROMs nativo
ipcMain.handle('scan-roms', async (event, system) => {
  const folderPath = path.join(__dirname, 'roms', system)
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true })
  }
  return scanRoms(folderPath)
})

// Handlers para fechar/minimizar a janela customizada
ipcMain.on('window-controls', (event, action) => {
  const win = BrowserWindow.getFocusedWindow()
  if (!win) return
  if (action === 'close') win.close()
  if (action === 'minimize') win.minimize()
})

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
