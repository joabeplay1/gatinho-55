// Cliente Socket.IO modularizado pronto para integração com servidor externo
import { io } from 'socket.io-client'

let socket = null

export const connectMultiplayer = (serverUrl = 'http://localhost:3001') => {
  try {
    socket = io(serverUrl, { autoConnect: false })
    return socket
  } catch (error) {
    console.error("Falha ao inicializar serviço multiplayer:", error)
    return null
  }
}

export const getSocket = () => socket
