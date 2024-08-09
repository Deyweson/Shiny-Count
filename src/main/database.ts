import { ipcMain } from 'electron'
import sqlite from 'sqlite3'
import path from 'node:path'
import fs from 'fs'

const dbPath = path.join(__dirname, 'database.db')
const db = CreateDatabase()

console.log(fs.existsSync(dbPath))

export const setupDatabase = (): void => {
  CreateDatabase()
  CreateTable()
}

ipcMain.on('teste', () => {
  db.run('INSERT INTO lorem (info) VALUES (?)', ['Teste de dados'], (err) => {
    if (err) {
      console.error(err.message)
    }
    console.log('Inserted a row into lorem.')
  })

  db.all('SELECT * FROM lorem', (err, rows) => {
    if (err) {
      return console.error('Select error:', err.message)
    }
    if (rows.length === 0) {
      console.log('No rows found.')
    } else {
      console.log('Retrieved Rows:')
      console.log(rows)
      return rows
    }
  })
})

// TODO FUNCTIONS
// TODO: Create Database
export function CreateDatabase(): sqlite.Database {
  const db = new sqlite.Database(':memory:', (err) => {
    if (err) {
      return console.error(err.message)
    }
    console.log('Connected to the SQlite database.')
  })
  return db
}
//TODO: Create Table
function CreateTable(): void {
  db.run('CREATE TABLE IF NOT EXISTS lorem (info TEXT)', (err) => {
    if (err) {
      return console.error(err.message)
    }
    console.log('Table created or verified.')
  })
}
// TODO: Close Database
export function CloseDatabase(): void {
  db.close((err) => {
    if (err) {
      console.error(err.message)
    }
    console.log('Close the database connection.')
  })
}
