import { randomUUID } from 'node:crypto'
import sqlite3 from 'sqlite3'

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

  db.run(sql, [randomUUID(), id_poke, time, attempts, is_complete], (err) => {
    if (err) {
      console.error('Error inserting data:', err.message)
    } else {
      console.log('Data inserted successfully')
    }
  })
}
