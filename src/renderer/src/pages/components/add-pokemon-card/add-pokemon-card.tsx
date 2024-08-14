import { useEffect, useState } from 'react'
import './add-pokemon-card.css'
import { useNavigate } from 'react-router-dom'
import pokemonSprites from '@renderer/pages/assets/get-pokemon-sprites'
import pokemonData from '../../../../../../pokemonData.json'

interface IPokemon {
  id: string
  name: string
}
interface Props {
  search: string
}

export function AddPokemonCard({ search }: Props): JSX.Element {
  const [pokemon, setPokemon] = useState<IPokemon[]>(pokemonData)

  useEffect(() => {
    if (search.trim() !== '') {
      if (search.trim().toLowerCase() === 'unova') {
        const poke = pokemonData.filter((poke) => Number(poke.id) >= 494 && Number(poke.id) <= 649)
        setPokemon(poke)
      } else {
        const poke = pokemonData.filter((poke) =>
          poke.name.toLowerCase().includes(search.trim().toLowerCase())
        )
        setPokemon(poke)
      }
    } else {
      setPokemon(pokemonData)
    }
  }, [search])

  interface AddCounterResponse {
    data: string
  }

  async function sendAddCounter(poke): Promise<void> {
    try {
      const response: AddCounterResponse = await window.api.addCounter(poke)
      console.log('Received response:', response)
    } catch (error) {
      console.error('Failed to get response:', error)
    }
  }
  interface AddCounterData {
    id_poke: number
    time: number
    attempts: number
    is_complete: boolean
  }
  const navigate = useNavigate()

  function handleAddCounter(poke: AddCounterData): void {
    console.log(poke)
    sendAddCounter(poke)
    navigate('/')
  }

  return (
    <div className="poke-card-container">
      {pokemon && pokemon.length > 0 ? (
        pokemon.map((poke) => (
          <div className="new-count-poke-card" key={poke.id}>
            <img src={pokemonSprites[`${poke.id}.png`]} alt={poke.name} />
            <p>{poke.name}</p>
            <button
              onClick={() =>
                handleAddCounter({
                  attempts: 0,
                  id_poke: Number(poke.id),
                  is_complete: false,
                  time: 0
                })
              }
            >
              +
            </button>
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  )
}
