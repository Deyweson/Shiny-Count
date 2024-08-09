import { useEffect, useState } from 'react'

const { ipcRenderer } = require('electron')

function App(): JSX.Element {
  interface pokemon {
    ID: string
    NAME: string
  }
  const [dados, setDados] = useState<pokemon[]>()

  useEffect(() => {
    ipcRenderer.send('teste')
    ipcRenderer.on('teste-response', (event, response) => {
      if (response.error) {
        console.error('Error received from main process:', response.error)
      } else {
        console.log('Data received from main process:', response.data)
        setDados(response.data)
        console.log(dados, event)
      }
    })
    ipcRenderer.removeListener('teste', () => {})
  }, [])

  return (
    <>
      <h1>Hello</h1>
      <button onClick={() => console.log(dados)}>Clique aqui</button>
      {dados === undefined ? <></> : dados.map((poke) => <p key={poke.ID}>{poke.NAME}</p>)}
    </>
  )
}

export default App
