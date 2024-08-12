import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function Home(): JSX.Element {
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
    } catch (error) {
      console.error('Failed to fetch counters:', error)
    }
  }

  useEffect(() => {
    getCounters()
    console.log(counters)
  }, [])

  const navigate = useNavigate()

  function nav(): void {
    navigate('/pokemon')
  }

  return (
    <div>
      <h1>Shiny Count</h1>
      <button onClick={() => nav()}>New Counter</button>
    </div>
  )
}
