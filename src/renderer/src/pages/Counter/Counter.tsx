import { pokemonData } from '../assets/gen1/gen1'
import './Counter.css'

export function Counter(): JSX.Element {
  return (
    <div className="counter-page-container">
      <div className="counter-page">
        <img src={pokemonData[0].image} alt="" />
        <h1>{pokemonData[0].name}</h1>
        <p>Attemps: 1000</p>

        <div className="buttons">
          <button id="button-red">-</button>
          <button>+</button>
        </div>
      </div>
    </div>
  )
}
