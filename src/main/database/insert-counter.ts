import sqlite3 from 'sqlite3'
import { nanoid } from 'nanoid'

export function insertCounter(
  db: sqlite3.Database,
  counter: {
    id_poke: number
    time: number
    attempts: number
    is_complete: boolean
  }
): void {
  const { id_poke, time, attempts, is_complete } = counter

  const sql = `
    INSERT INTO counters (id, id_poke, time, attempts, is_complete)
    VALUES (?, ?, ?, ?, ?)
  `

  db.run(sql, [nanoid(10), id_poke, time, attempts, is_complete], (err) => {
    if (err) {
      console.error('Error inserting data:', err.message)
    } else {
      console.log('Data inserted successfully')
    }
  })
}
