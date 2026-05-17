const sqlite3 = require('sqlite3').verbose()
const path = require('path')
const fs = require('fs')

const dbDir = path.join(__dirname, '..', '..', 'database')
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true })
}

const dbPath = path.join(dbDir, 'database.db')
const db = new sqlite3.Database(dbPath)

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS games (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT EXISTS,
      genre TEXT,
      emulator TEXT,
      favorite INTEGER DEFAULT 0,
      rom_path TEXT
    )
  `)
})

module.exports = db
