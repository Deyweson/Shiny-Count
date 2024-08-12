import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer

interface IApi {
  addCounter: (data: {
    id_poke: number
    time: number
    attempts: number
    is_complete: boolean
  }) => Promise<void>
}
const api: IApi = {
  addCounter: (data: { id_poke: number; time: number; attempts: number; is_complete: boolean }) =>
    ipcRenderer.invoke('add-counter', data)
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
