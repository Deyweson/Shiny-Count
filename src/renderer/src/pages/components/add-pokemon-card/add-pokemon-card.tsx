import { useEffect, useState } from 'react'
import './add-pokemon-card.css'
import pokemonImages from '@renderer/pages/assets/gen1/gen1'
const { ipcRenderer } = require('electron')

interface pokemon {
  ID: string
  NAME: string
}
interface Props {
  search: string
}

export function AddPokemonCard({ search }: Props): JSX.Element {
  const [pokemonBase, setPokemonBase] = useState<pokemon[]>()
  const [pokemon, setPokemon] = useState<pokemon[]>()

  useEffect(() => {
    ipcRenderer.send('pokemon')
    console.log('inicou')
    ipcRenderer.on('pokemon-response', (event, response) => {
      if (response.error) {
        console.error('Error received from main process:', response.error)
      } else {
        console.log('Data received from main process:', response.data)
        setPokemonBase(response.data)
        setPokemon(response.data)
        console.log(pokemonBase, event)
      }
      console.log('terminou')
    })
    ipcRenderer.removeListener('teste', () => {})
  }, [])

  useEffect(() => {
    if (search.trim() !== '') {
      const poke = pokemonBase?.filter((poke) =>
        poke.NAME.toLowerCase().includes(search.trim().toLowerCase())
      )
      setPokemon(poke)
    } else {
      setPokemon(pokemonBase)
    }
  }, [search])

  return (
    <div className="poke-card-container">
      {pokemon && pokemon.length > 0 ? (
        pokemon.map((poke) => (
          <div className="new-count-poke-card" key={poke.ID}>
            <img src={`${pokemonImages[Number(poke.ID) - 1]}`} alt={poke.NAME} />
            <p>{poke.NAME}</p>
            <button>+</button>
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  )
}
