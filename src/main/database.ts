import { ipcMain } from 'electron'

export const setupDatabase = (): void => {
  ipcMain.on('teste', () => {
    console.log('Pong')
    return
  })
}
