import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { AddPokemonPage } from './pages/Add-Pokemon-Page'
import { Counter } from './pages/Counter/Counter'

export function MainRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pokemon" element={<AddPokemonPage />} />
      <Route path="/counter" element={<Counter />} />
    </Routes>
  )
}
