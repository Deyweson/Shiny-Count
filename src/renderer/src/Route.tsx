import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { AddPokemonPage } from './pages/Add-Pokemon-Page'

export function MainRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pokemon" element={<AddPokemonPage />} />
    </Routes>
  )
}
