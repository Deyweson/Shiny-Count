import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Define a interface para os dados que você espera receber e enviar
interface Counter {
  id: string
  id_poke: number
  time: number
  attempts: number
  is_complete: boolean
}
interface pokemonCounter {
  id: string
  id_poke: number
  time: number
  attempts: number
  is_complete: boolean
  start_date: string
}

interface IApi {
  addCounter: (data: {
    id_poke: number
    time: number
    attempts: number
    is_complete: boolean
  }) => Promise<void>
  getCounters: () => Promise<Counter[]>
  getPokemonCounter: (id: string) => Promise<pokemonCounter>
}

// Implementação das funções expostas
const api: IApi = {
  addCounter: (data: { id_poke: number; time: number; attempts: number; is_complete: boolean }) =>
    ipcRenderer.invoke('add-counter', data),
  getCounters: () => ipcRenderer.invoke('get-counters'),
  getPokemonCounter: (id: string) => ipcRenderer.invoke('get-pokemon-counter', id)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
