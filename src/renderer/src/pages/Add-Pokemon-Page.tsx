import backArrow from './assets/back-arrow.png'
import { useNavigate } from 'react-router-dom'
import { AddPokemonCard } from './components/add-pokemon-card/add-pokemon-card'
import './add-pokemon-page.css'

export function AddPokemonPage(): JSX.Element {
  const navigate = useNavigate()
  function nav(): void {
    navigate('/')
  }

  return (
    <div>
      <header className="pokemon-page-header">
        <img src={backArrow} onClick={() => nav()} />
        <h1>Pokémon</h1>
      </header>
      <AddPokemonCard />
    </div>
  )
}
