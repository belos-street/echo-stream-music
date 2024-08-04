import { message } from 'antd'
import { electronAPI } from '@electron-toolkit/preload'
import { IPCEvent } from '../../main/eunm/ipcEunm'
import { HTTPMethod } from '../../main/request'
import { AxiosRequestConfig } from 'axios'

message.config({
  top: 60,
  maxCount: 3
})

export function apiRequest<T>(
  method: HTTPMethod,
  api: string,
  config?: AxiosRequestConfig
): Promise<T> {
  return new Promise((resolve, reject) => {
    // Send the request to the main process
    electronAPI.ipcRenderer.send(IPCEvent['api:request'], method, api, config)

    // Listen for the response
    electronAPI.ipcRenderer.once(IPCEvent['api:response'], (_event, response) => {
      if (response.error) {
        reject(response)
        message.error(response.message)

        //处理业务code报错
        // if (response.statusCode) {
        // }
      } else {
        resolve(response)
      }
    })
  })
}
