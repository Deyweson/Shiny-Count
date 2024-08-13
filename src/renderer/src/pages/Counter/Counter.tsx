import { useEffect, useState } from 'react'
import pokemonData from '../../../../../pokemonData.json'
import backArrow from '../assets/back-arrow.png'
import './Counter.css'
import { useNavigate } from 'react-router-dom'
import pokemonSprites from '../assets/get-pokemon-sprites'

interface Props {
  id: string | undefined
}

export function Counter({ id }: Props): JSX.Element {
  const [pokemon, setPokemon] = useState<pokemonCounter>()
  const [refresh, setRefresh] = useState<number>(0)

  const navigate = useNavigate()

  interface pokemonCounter {
    id: string
    id_poke: number
    time: number
    attempts: number
    is_complete: boolean
    start_date: string
  }

  async function upCounter(count: number, id: string): Promise<void> {
    try {
      await window.api.upCounter(count, id)
      setRefresh(refresh + 1)
    } catch (error) {
      console.error('Failed to up counter:', error)
    }
  }

  async function downCounter(count: number, id: string): Promise<void> {
    try {
      if (pokemon !== undefined && pokemon?.attempts > 0) {
        await window.api.downCounter(count, id)
        setRefresh(refresh + 1)
      }
    } catch (error) {
      console.error('Failed to up counter:', error)
    }
  }

  async function getPokemonCounter(id: string): Promise<pokemonCounter | void> {
    try {
      const response = await window.api.getPokemonCounter(id)
      setPokemon(response[0])
    } catch (error) {
      console.error('Failed to fetch counters:', error)
    }
  }

  useEffect(() => {
    if (id === undefined) {
      navigate('/')
    } else {
      getPokemonCounter(id)
    }
  }, [refresh])

  return (
    <div className="counter-page-container">
      <img
        className="counter-page-backarrow"
        src={backArrow}
        alt="left arrow"
        onClick={() => navigate('/')}
      />
      {pokemon ? (
        <div className="counter-page">
          <img
            src={pokemonSprites[`${pokemon.id_poke}.png`]}
            alt={pokemonData[pokemon.id_poke - 1].name}
          />
          <h1>{pokemonData[pokemon.id_poke - 1].name}</h1>
          <p>{pokemon?.attempts}</p>

          <div className="buttons">
            <button id="button-red" onClick={() => downCounter(pokemon.attempts - 1, pokemon.id)}>
              -
            </button>
            <button onClick={() => upCounter(pokemon.attempts + 1, pokemon.id)}>+</button>
          </div>
        </div>
      ) : (
        <>
          <h1>Error</h1>
        </>
      )}
    </div>
  )
}
