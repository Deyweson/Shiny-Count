import { useEffect, useState } from 'react'
import './add-pokemon-card.css'
import { pokemonData } from '@renderer/pages/assets/gen1/gen1'

interface IPokemon {
  id: string
  name: string
  image: string
}
interface Props {
  search: string
}

export function AddPokemonCard({ search }: Props): JSX.Element {
  const [pokemon, setPokemon] = useState<IPokemon[]>(pokemonData)

  useEffect(() => {
    if (search.trim() !== '') {
      const poke = pokemonData.filter((poke) =>
        poke.name.toLowerCase().includes(search.trim().toLowerCase())
      )
      setPokemon(poke)
    } else {
      setPokemon(pokemonData)
    }
  }, [search])

  return (
    <div className="poke-card-container">
      {pokemon && pokemon.length > 0 ? (
        pokemon.map((poke) => (
          <div className="new-count-poke-card" key={poke.id}>
            <img src={poke.image} alt={poke.name} />
            <p>{poke.name}</p>
            <button>+</button>
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  )
}
