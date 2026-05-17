const fs = require('fs')
const path = require('path')

function scanRoms(folder) {
  try {
    if (!fs.existsSync(folder)) return []
    const files = fs.readdirSync(folder)
    return files.filter(file =>
      file.endsWith('.zip') ||
      file.endsWith('.7z')
    )
  } catch (error) {
    console.error("Erro ao escanear ROMs:", error)
    return []
  }
}

module.exports = scanRoms
