// Monitor global para detecção de Gamepads nativos via API HTML5
if (typeof window !== 'undefined') {
  window.addEventListener('gamepadconnected', (e) => {
    console.log(`%c [Gamepad] Conectado: ${e.gamepad.id} | Slot: ${e.gamepad.index}`, "color: #00ccff; font-weight: bold;")
  })

  window.addEventListener('gamepaddisconnected', (e) => {
    console.log(`%c [Gamepad] Desconectado do slot: ${e.gamepad.index}`, "color: #ff3366; font-weight: bold;")
  })
}
