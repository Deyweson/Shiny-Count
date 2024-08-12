import sqlite3 from 'sqlite3'

export function CreateCounterTable(db: sqlite3.Database): void {
  db.run(
    `
    CREATE TABLE IF NOT EXISTS counters (
      id TEXT PRIMARY KEY,
      id_poke INTEGER NOT NULL,
      time INTEGER NOT NULL,
      attempts INTEGER NOT NULL,
      is_complete BOOLEAN NOT NULL
    );
  `,
    (err) => {
      if (err) {
        console.error('Error creating table:', err.message)
      } else {
        console.log('Table created successfully')
      }
    }
  )
}
