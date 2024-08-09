import path from 'node:path'
import fs from 'fs'

const dbPath = path.join(__dirname, 'database.db')
console.log(fs.existsSync(dbPath))
