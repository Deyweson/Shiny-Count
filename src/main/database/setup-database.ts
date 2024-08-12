import { app, ipcMain } from 'electron'
import sqlite from 'sqlite3'
import path from 'node:path'
import fs from 'fs'

const dbPath = path.join(app.getPath('userData'), 'database.db')
console.log(dbPath)
console.log(fs.existsSync(dbPath))

export const setup = {
  openConnect: (): sqlite.Database => {
    const db = new sqlite.Database(dbPath, (err) => {
      if (err) {
        return console.error(err.message)
      }
      console.log('Connected to the SQlite database.')
    })
    return db
  },
  closeConnect: (db: sqlite.Database): void => {
    db.close((err) => {
      if (err) {
        console.error(err.message)
      }
      console.log('Close the database connection.')
    })
  }
}

export const setupDatabase = (): void => {
  const db = setup.openConnect()
  db.serialize(() => {})

  ipcMain.on('pokemon', () => {
    console.log('clicou')
  })
}
