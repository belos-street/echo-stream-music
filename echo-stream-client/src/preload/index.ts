import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
export const api = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  request: <T>(url: string, options?: any): Promise<T> => {
    return new Promise((resolve, reject) => {
      // Send the request to the main process
      electronAPI.ipcRenderer.send('api:request', url, options)

      // Listen for the response
      electronAPI.ipcRenderer.once('api:response', (_event, response) => {
        if (response.error) {
          reject(response.error)
        } else {
          resolve(response.data)
        }
      })
    })
  }
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
