import sqlite from 'sqlite3'
import { pokemonGen1 } from './pokemon-gen1'

export const InsertPokemon = (db: sqlite.Database): void => {
  const query = `
  INSERT INTO pokemon (ID, NAME) VALUES (?, ?)
  `

  for (const pokemon of pokemonGen1) {
    db.run(query, [pokemon[0], pokemon[1]], (err) => {
      if (err) {
        console.error(err.message)
      }
      // console.log('Inserted a row into Pokémon.')
    })
  }
}
