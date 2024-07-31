import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { IPCEvent } from '../main/eunm/ipcEunm'
import { HTTPMethod } from '../main/request'
import { AxiosRequestConfig } from 'axios'

// Custom APIs for renderer
export const api = {
  request: <T>(method: HTTPMethod, api: string, config?: AxiosRequestConfig): Promise<T> => {
    return new Promise((resolve, reject) => {
      // Send the request to the main process
      electronAPI.ipcRenderer.send(IPCEvent['api:request'], method, api, config)

      // Listen for the response
      electronAPI.ipcRenderer.once(IPCEvent['api:response'], (_event, response) => {
        if (response.error) {
          reject(response)
        } else {
          resolve(response)
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
