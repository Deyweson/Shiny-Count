import sqlite from 'sqlite3'

export const CreatePokemonTable = (db: sqlite.Database): void => {
  const query: string = `
  CREATE TABLE IF NOT EXISTS pokemon (
  ID INT PRIMARY KEY NOT NULL,
  NAME CHAR(50) NOT NULL
  )
  `

  db.run(query, (err) => {
    if (err) {
      return console.error(err.message)
    }
    console.log('Table created or verified.')
  })
}
