import { ipcMain } from 'electron'
import sqlite from 'sqlite3'
import path from 'node:path'

const db = new sqlite.Database(path.join(__dirname, 'database.db'), (err) => {
  if (err) {
    return console.error(err.message)
  }
  console.log(path.join(__dirname, 'database.db'))
  console.log('Connected to the SQlite database.')
})

export const setupDatabase = (): void => {
  ipcMain.on('teste', () => {
    console.log('Pong')
    return
  })
}

db.close((err) => {
  if (err) {
    console.error(err.message)
  }
  console.log('Close the database connection.')
})
