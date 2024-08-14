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
  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setSearch(e.target.value)
    console.log(search)
  }

  return (
    <div className="pokemon-add-page">
      <header className="pokemon-page-header">
        <img src={backArrow} onClick={() => nav()} className="pokemon-add-page-backarrow" />
        <h1>Pokémon</h1>
      </header>

      <input type="text" className="pokemon-page-search" value={search} onChange={handleChange} />

      <AddPokemonCard search={search} />
    </div>
  )
}
