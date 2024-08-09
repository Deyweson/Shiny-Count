import { useNavigate } from 'react-router-dom'

export function Home(): JSX.Element {
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
