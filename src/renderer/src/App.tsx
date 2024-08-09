const { ipcRenderer } = require('electron')

export const Database = {
  teste: (): void => {
    ipcRenderer.send('teste')
  }
}

function App(): JSX.Element {
  return (
    <>
      <h1>Hello</h1>
      <button onClick={() => Database.teste()}>Clique aqui</button>
    </>
  )
}

export default App
