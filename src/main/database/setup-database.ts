import { app, ipcMain } from 'electron'
import { CreatePokemonTable } from './create-pokemon-table'
import { InsertPokemon } from './insert-pokemon-on-table'
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
  db.serialize(() => {
    CreatePokemonTable(db)
    InsertPokemon(db)
  })

  ipcMain.on('pokemon', (event) => {
    db.all('SELECT * FROM pokemon', (err, rows) => {
      if (err) {
        return console.error('Select error:', err.message)
      }
      if (rows.length === 0) {
        console.log('No rows found.')
        event.sender.send('pokemon-response', { data: [] })
      } else {
        console.log('Retrieved Rows:')
        console.log(rows)
        event.sender.send('pokemon-response', { data: rows })
      }
    })
    db.run(
      'INSERT INTO pokemon (ID, NAME) VALUES (?, ?)',
      [Math.floor(Math.floor(Math.random() * (250 - 152) + 152)), 'teste'],
      (err) => {
        if (err) {
          console.error(err.message)
        }
        // console.log('Inserted a row into Pokémon.')
      }
    )
  })
}
