import { useEffect, useState } from 'react'
import './add-pokemon-card.css'
const { ipcRenderer } = require('electron')

interface pokemon {
  ID: string
  NAME: string
}

export function AddPokemonCard(): JSX.Element {
  const [pokemon, setPokemon] = useState<pokemon[]>()

  useEffect(() => {
    ipcRenderer.send('pokemon')
    console.log('inicou')
    ipcRenderer.on('pokemon-response', (event, response) => {
      if (response.error) {
        console.error('Error received from main process:', response.error)
      } else {
        console.log('Data received from main process:', response.data)
        setPokemon(response.data)
        console.log(pokemon, event)
      }
      console.log('terminou')
    })
    ipcRenderer.removeListener('teste', () => {})
  }, [])

  return (
    <div className="poke-card-container">
      {pokemon && pokemon.length > 0 ? (
        pokemon.map((poke) => (
          <div className="new-count-poke-card" key={poke.ID}>
            <img src="/src/pages/assets/image.png" alt={poke.NAME} />
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
