import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { pokemonData } from './assets/gen1/gen1'
import './home.css'

interface Props {
  setId: React.Dispatch<React.SetStateAction<string | undefined>>
}

export function Home({ setId }: Props): JSX.Element {
  interface Counter {
    id: string
    id_poke: number
    time: number
    attempts: number
    is_complete: boolean
  }
  const [counters, setCounters] = useState<Counter[]>([])

  async function getCounters(): Promise<Counter[] | void> {
    try {
      const response = await window.api.getCounters()
      setCounters(response)
      console.log(counters)
    } catch (error) {
      console.error('Failed to fetch counters:', error)
    }
  }

  useEffect(() => {
    getCounters()
    console.log(counters)
  }, [])

  const navigate = useNavigate()

  function nav(path: string, id: string): void {
    setId(id)
    navigate(path)
  }

  return (
    <div>
      <h1>Shiny Count</h1>
      <button onClick={() => nav('/pokemon', '123')}>New Counter</button>
      <div className="counter-container">
        {counters.map((count) => (
          <div className="counter" key={count.id} onClick={() => nav('/counter', count.id)}>
            <img src={pokemonData[count.id_poke - 1].image} alt="" />
            <p>{pokemonData[count.id_poke - 1].name}</p>
            <p>attemps: {count.attempts}</p>
            <p>time: 10m 10s</p>
          </div>
        ))}
      </div>
    </div>
  )
}
