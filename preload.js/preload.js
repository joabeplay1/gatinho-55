const { contextBridge, ipcRenderer } = require('electron')

// Ponte segura de comunicação entre o Frontend (React) e o Backend (Node/Electron)
contextBridge.exposeInMainWorld('electronAPI', {
  scanRoms: (system) => ipcRenderer.invoke('scan-roms', system),
  closeApp: () => ipcRenderer.send('window-controls', 'close'),
  minimizeApp: () => ipcRenderer.send('window-controls', 'minimize')
})
