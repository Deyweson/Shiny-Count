import { app, ipcMain } from 'electron'
import sqlite from 'sqlite3'

import { CreateCounterTable } from './create-counter-table'
import { insertCounter } from './insert-counter'
import path from 'path'
const dbPath = path.join(app.getPath('userData'), 'database.db') // path to dev
// const dbPath = path.join(__dirname, '..', '..', '..', '..', 'database.db') Path to prod
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
      db.all(
        'SELECT * FROM counters where is_complete = false order by start_date DESC',
        [],
        (err, rows) => {
          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
        }
      )
    })
  })
  ipcMain.handle('get-pokemon-counter', async (__event, id: string) => {
    return new Promise((resolve, reject) => {
      db.all('select * from counters where id = ?', [id], (err, rows) => {
        if (err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  })
}
