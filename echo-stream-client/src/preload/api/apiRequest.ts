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
    electronAPI.ipcRenderer.once(IPCEvent['api:response'], (_event, res) => {
      if (res.error) {
        const error = res.error
        if (error.response === 'Bad Request') {
          //说明请求已经发出但没有收到响应 或 设置请求时发生了错误
          console.error('No response received or Error setting up request')
          message.error('Request failed')
          reject(res)
        } else {
          //说明请求已经发出并且收到了响应，但是响应的状态码不在200-299之间
          message.error(`${error.statusCode} - ${error.message}`)
          reject(res)
          //处理业务code报错
          // if (.statusCode) {
          // }
        }
      } else {
        //success
        resolve(res.data)
      }
    })
  })
}
