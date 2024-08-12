import { app, ipcMain } from 'electron'
import sqlite from 'sqlite3'

import path from 'node:path'
import { CreateCounterTable } from './create-counter-table'
import { insertCounter } from './insert-counter'

const dbPath = path.join(app.getPath('userData'), 'database.db')
console.log(dbPath)

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
interface AddCounterData {
  id_poke: number
  time: number
  attempts: number
  is_complete: boolean
}

export const setupDatabase = (): void => {
  const db = setup.openConnect()
  db.serialize(() => {
    CreateCounterTable(db)
  })
  ipcMain.handle('add-counter', async (_event, data: AddCounterData) => {
    insertCounter(db, data)
    return { data: 'add' }
  })
  ipcMain.handle('get-counters', async () => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM counters', [], (err, rows) => {
        if (err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  })
}
