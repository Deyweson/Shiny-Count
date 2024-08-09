import backArrow from './assets/back-arrow.png'
import { useNavigate } from 'react-router-dom'
import { AddPokemonCard } from './components/add-pokemon-card/add-pokemon-card'
import './add-pokemon-page.css'
import { useState } from 'react'

export function AddPokemonPage(): JSX.Element {
  const navigate = useNavigate()
  function nav(): void {
    navigate('/')
  }

  const [search, setSearch] = useState('')
  function handleChange(e): void {
    setSearch(e.target.value)
    console.log(search)
  }

  return (
    <div>
      <header className="pokemon-page-header">
        <img src={backArrow} onClick={() => nav()} />
        <h1>Pokémon</h1>
      </header>
      <input type="text" className="pokemon-page-search" onChange={handleChange} />
      <AddPokemonCard search={search} />
    </div>
  )
}
