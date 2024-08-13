import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { AddPokemonPage } from './pages/Add-Pokemon-Page'
import { Counter } from './pages/Counter/Counter'
import { useState } from 'react'

export function MainRoutes(): JSX.Element {
  const [id, setId] = useState<string>()

  return (
    <Routes>
      <Route path="/" element={<Home setId={setId} />} />
      <Route path="/pokemon" element={<AddPokemonPage />} />
      <Route path="/counter" element={<Counter id={id} />} />
    </Routes>
  )
}
